// lib/rss.ts
import Parser from 'rss-parser';
import { RssArticle, RssSource } from '@/types/rss';
import { Article } from '@/types/article';
import { calculateReadingTime } from './markdown';

const parser = new Parser();

export async function fetchRssArticles(source: RssSource): Promise<Article[]> {
  if (!source.enabled) {
    return [];
  }

  try {
    const feed = await parser.parseURL(source.url);

    return feed.items.map(item => ({
      id: item.guid || item.link || '',
      title: item.title || '',
      date: item.pubDate ? new Date(item.pubDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      category: source.type === 'wechat' ? '微信公众号' : '外部文章',
      tags: [],
      description: item.contentSnippet || '',
      content: item.content || item.contentSnippet || '',
      author: source.name,
      featured: false,
      status: 'published' as const,
      source: source.type as 'local' | 'wechat' | 'other',
      sourceUrl: item.link,
      readingTime: calculateReadingTime(item.contentSnippet || '')
    }));
  } catch (error) {
    console.error(`Failed to fetch RSS articles from ${source.name}:`, error);
    return [];
  }
}

export async function getAllRssArticles(sources: RssSource[]): Promise<Article[]> {
  const allArticles: Article[] = [];

  for (const source of sources) {
    if (source.enabled) {
      const articles = await fetchRssArticles(source);
      allArticles.push(...articles);
    }
  }

  return allArticles;
}

export async function getAllArticles(sources: RssSource[] = []): Promise<Article[]> {
  // 获取本地文章
  const { getPublishedArticles } = require('./articles');
  const localArticles = getPublishedArticles();

  // 获取RSS文章
  const rssArticles = await getAllRssArticles(sources);

  // 合并并排序
  const allArticles = [...localArticles, ...rssArticles];

  return allArticles.sort((a, b) => {
    if (a.date < b.date) return 1;
    return -1;
  });
}
