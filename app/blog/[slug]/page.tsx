// app/blog/[slug]/page.tsx
import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import Tag from '@/components/ui/Tag';
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';

// 直接导入文章列表数据
import articlesData from '@/data/articles.json';

export async function generateStaticParams() {
  // 使用 JSON 数据生成静态参数
  return articlesData.map((article: any) => ({
    slug: article.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = (articlesData as any[]).find(a => a.id === slug);

  if (!article) {
    return {
      title: '文章未找到',
    };
  }

  return {
    title: `${article.title} - 我的主页`,
    description: article.description,
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // 读取文章内容
  const articlesDirectory = path.join(process.cwd(), 'content/articles');
  const fullPath = path.join(articlesDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    notFound();
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  // 处理 Markdown 内容
  const processedContent = await remark()
    .use(remarkHtml)
    .process(content);

  const contentHtml = processedContent.toString();

  const article = {
    title: data.title || '',
    date: data.date || '',
    description: data.description || '',
    author: data.author || '你的名字',
    tags: data.tags || [],
    readingTime: Math.ceil(content.split(/\s+/).length / 200),
  };

  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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
            <li><Link href="/blog">博客</Link></li>
            <li><Link href="/#ai-tools">AI工具</Link></li>
          </ul>
        </div>
      </nav>

      {/* 返回链接 */}
      <div className="container mx-auto px-4 pt-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回博客列表
        </Link>
      </div>

      {/* 文章内容 */}
      <article className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* 文章头部 */}
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Tag variant="blue">原创文章</Tag>
              <time className="text-white/40 text-sm">{formatDate(article.date)}</time>
              <span className="text-white/40 text-sm">
                {article.readingTime} 分钟阅读
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {article.title}
            </h1>

            <p className="text-xl text-white/80 mb-6">
              {article.description}
            </p>

            {/* 作者信息 */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-red-400 flex items-center justify-center text-white font-bold">
                {article.author.charAt(0)}
              </div>
              <div>
                <div className="text-white font-medium">{article.author}</div>
                <div className="text-white/40 text-sm">发布于 {formatDate(article.date)}</div>
              </div>
            </div>

            {/* 标签 */}
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {article.tags.map((tag: string) => (
                  <Tag key={tag} variant="default">
                    {tag}
                  </Tag>
                ))}
              </div>
            )}
          </header>

          {/* 文章正文 */}
          <div
            className="prose prose-invert prose-lg max-w-none
              prose-headings:text-white
              prose-h1:text-3xl prose-h1:text-white prose-h1:font-bold prose-h1:mb-4
              prose-h2:text-2xl prose-h2:text-white prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4
              prose-h3:text-xl prose-h3:text-white prose-h3:font-bold prose-h3:mt-6 prose-h3:mb-3
              prose-p:text-white/80 prose-p:leading-relaxed
              prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300
              prose-strong:text-white prose-strong:font-semibold
              prose-code:text-blue-400 prose-code:bg-white/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10
              prose-blockquote:border-l-4 prose-blockquote:border-blue-400 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-white/60
              prose-ul:text-white/80
              prose-ol:text-white/80
              prose-li:text-white/80
              prose-hr:border-white/10
            "
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          {/* 文章底部 */}
          <footer className="mt-16 pt-8 border-t border-white/10">
            <div className="flex items-center justify-between">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                返回博客列表
              </Link>
            </div>
          </footer>
        </div>
      </article>

      {/* 页脚 */}
      <footer className="footer mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-white/60">
            <p>© {new Date().getFullYear()} 我的主页. Made with ❤️ and Next.js</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
