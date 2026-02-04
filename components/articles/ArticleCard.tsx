// components/articles/ArticleCard.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Article } from '@/types/article';
import Tag from '@/components/ui/Tag';

interface ArticleCardProps {
  article: Article;
  index?: number;
}

export default function ArticleCard({ article, index = 0 }: ArticleCardProps) {
  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // 根据来源显示不同标签
  const getSourceTag = () => {
    if (article.source === 'wechat') {
      return <Tag variant="green">微信公众号</Tag>;
    }
    return <Tag variant="blue">原创文章</Tag>;
  };

  return (
    <Link
      href={article.source === 'local' ? `/blog/${article.id}` : article.sourceUrl || '#'}
      target={article.source !== 'local' ? '_blank' : undefined}
      rel={article.source !== 'local' ? 'noopener noreferrer' : undefined}
      className="block group"
    >
      <article className="article-card bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10">
        {/* 来源标签和日期 */}
        <div className="flex items-center justify-between mb-3">
          {getSourceTag()}
          <time className="text-white/40 text-sm">{formatDate(article.date)}</time>
        </div>

        {/* 标题 */}
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
          {article.title}
        </h3>

        {/* 描述 */}
        <p className="text-white/60 text-sm mb-4 line-clamp-3">
          {article.description}
        </p>

        {/* 标签 */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.slice(0, 3).map((tag) => (
              <Tag key={tag} variant="default" className="text-xs">
                {tag}
              </Tag>
            ))}
          </div>
        )}

        {/* 元信息 */}
        <div className="flex items-center justify-between text-sm text-white/40">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {article.readingTime} 分钟
            </span>
            <span>·</span>
            <span>{article.category}</span>
          </div>

          {article.source === 'local' && (
            <span className="text-blue-400 group-hover:text-blue-300 transition-colors flex items-center gap-1">
              阅读更多
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          )}
        </div>

        {/* 外部链接提示 */}
        {article.source !== 'local' && article.sourceUrl && (
          <div className="mt-3 text-xs text-white/40 flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            外部链接
          </div>
        )}
      </article>
    </Link>
  );
}
