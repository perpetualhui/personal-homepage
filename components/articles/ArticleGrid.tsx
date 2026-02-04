// components/articles/ArticleGrid.tsx
'use client';

import React from 'react';
import { Article } from '@/types/article';
import ArticleCard from './ArticleCard';

interface ArticleGridProps {
  articles: Article[];
  columns?: 1 | 2 | 3;
}

export default function ArticleGrid({ articles, columns = 3 }: ArticleGridProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-6`}>
      {articles.map((article, index) => (
        <div
          key={article.id}
          className="opacity-0 animate-fade-in-up"
          style={{
            animationDelay: `${index * 100}ms`,
            animationFillMode: 'forwards'
          }}
        >
          <ArticleCard article={article} index={index} />
        </div>
      ))}
    </div>
  );
}
