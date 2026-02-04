// app/blog/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Article } from '@/types/article';
import ArticleList from '@/components/articles/ArticleList';
import SectionTitle from '@/components/ui/SectionTitle';

// 导入静态生成的文章数据
import articlesData from '@/data/articles.json';

export default function BlogPage() {
  const articles = articlesData as unknown as Article[];

  return (
    <div className="min-h-screen">
      {/* 导航栏 */}
      <nav className="navbar">
        <div className="nav-container">
          <Link href="/" className="nav-logo">
            我的主页
          </Link>
          <ul className="nav-menu">
            <li><Link href="/#about">关于我</Link></li>
            <li><Link href="/#articles">文章</Link></li>
            <li><Link href="/#ai-tools">AI工具</Link></li>
          </ul>
        </div>
      </nav>

      {/* 主内容 */}
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <SectionTitle
            title="📝 全部文章"
            subtitle="分享我的技术思考与实践"
          />

          <div className="mb-8">
            <p className="text-white/60">
              共 {articles.length} 篇文章
            </p>
          </div>

          <ArticleList articles={articles} />
        </div>
      </main>

      {/* 页脚 */}
      <footer className="footer">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-white/60">
            <p>© {new Date().getFullYear()} 我的主页. Made with ❤️ and Next.js</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
