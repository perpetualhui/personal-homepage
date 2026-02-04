// lib/articles.ts
import fs from 'fs';
import path from 'path';
import { Article } from '@/types/article';
import { parseMarkdown, calculateReadingTime } from './markdown';

const articlesDirectory = path.join(process.cwd(), 'content/articles');

export function getAllLocalArticles(): Article[] {
  // 检查目录是否存在
  if (!fs.existsSync(articlesDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(articlesDirectory);
  const allArticlesData = fileNames
    .filter(fileName => fileName.endsWith('.md') && !fileName.startsWith('_'))
    .map(fileName => {
      const fullPath = path.join(articlesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // 提取文章ID（去掉日期和.md）
      const id = fileName.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');

      // 解析Frontmatter和内容
      const matterResult = require('gray-matter').default(fileContents);
      const { data, content } = matterResult;

      return {
        id,
        title: data.title || '',
        date: data.date || '',
        category: data.category || '未分类',
        tags: data.tags || [],
        description: data.description || '',
        cover: data.cover,
        author: data.author || '你的名字',
        content,
        featured: data.featured || false,
        status: data.status || 'published',
        source: 'local' as const,
        readingTime: calculateReadingTime(content)
      } as Article;
    });

  // 按日期排序（最新的在前）
  return allArticlesData.sort((a, b) => {
    if (a.date < b.date) return 1;
    return -1;
  });
}

export function getFeaturedArticles(): Article[] {
  const allArticles = getAllLocalArticles();
  return allArticles.filter(article => article.featured && article.status === 'published');
}

export function getPublishedArticles(): Article[] {
  const allArticles = getAllLocalArticles();
  return allArticles.filter(article => article.status === 'published');
}

export function getArticleById(id: string): Article | undefined {
  const allArticles = getAllLocalArticles();
  return allArticles.find(article => article.id === id);
}
