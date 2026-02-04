// components/articles/ArticleList.tsx
'use client';

import React from 'react';
import { Article } from '@/types/article';
import ArticleCard from './ArticleCard';

interface ArticleListProps {
  articles: Article[];
}

export default function ArticleList({ articles }: ArticleListProps) {
  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-white/60">暂无文章</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {articles.map((article, index) => (
        <div
          key={article.id}
          className="opacity-0 animate-fade-in-up"
          style={{
            animationDelay: `${index * 50}ms`,
            animationFillMode: 'forwards'
          }}
        >
          <ArticleCard article={article} index={index} />
        </div>
      ))}
    </div>
  );
}
