// app/api/articles/route.ts
import { NextResponse } from 'next/server';
import { getAllArticles } from '@/lib/articles';
import { getAllRssArticles } from '@/lib/rss';
import { rssSources } from '@/data/rss-sources';
import { siteConfig } from '@/config/site';

export async function GET() {
  try {
    let articles = getAllArticles();

    // 如果启用了RSS集成，则获取RSS文章
    if (siteConfig.features.rssIntegration) {
      const rssArticles = await getAllRssArticles(rssSources);

      // 合并本地文章和RSS文章
      articles = [...articles, ...rssArticles].sort((a, b) => {
        if (a.date < b.date) return 1;
        return -1;
      });
    }

    // 只返回已发布的文章
    const publishedArticles = articles.filter(article => article.status === 'published');

    return NextResponse.json(publishedArticles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}

// 配置ISR缓存策略
export const revalidate = 3600; // 每小时重新验证一次
