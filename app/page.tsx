'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { profile } from '@/data/profile';
import { tools } from '@/data/tools';
import { projects } from '@/data/projects';
import { Article } from '@/types/article';
import ArticleGrid from '@/components/articles/ArticleGrid';
import ProjectSidebar from '@/components/projects/ProjectSidebar';
import StatsCard from '@/components/ui/StatsCard';
import SectionTitle from '@/components/ui/SectionTitle';

// 导入静态生成的文章数据
import articlesData from '@/data/articles.json';

export default function Home() {
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
  const [articles, setArticles] = useState<Article[]>(articlesData as Article[]);
  const featuredArticles = articles.slice(0, 6);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setVisibleElements((prev) => new Set(prev).add(id));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-observe]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* 导航栏 - 毛玻璃效果 */}
      <nav className="navbar">
        <div className="nav-container">
          <Link href="/" className="nav-logo">
            我的主页
          </Link>
          <ul className="nav-menu">
            <li><a href="#about">关于我</a></li>
            <li><a href="#articles">文章</a></li>
            <li><a href="#ai-tools">AI工具</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero区域 - 关于我 */}
      <section id="about" className="hero-section">
        <div className="hero-content">
          <div className="avatar-wrapper">
            <div className="avatar">
              <img src={profile.avatar} alt={profile.name} />
            </div>
          </div>
          <h1 className="hero-title">
            你好，我是 <span className="gradient-text">{profile.name}</span>
          </h1>
          <p className="hero-subtitle">{profile.tagline}</p>

          <div className="hero-features">
            {profile.features.map((feature, index) => (
              <div
                key={index}
                className="feature-badge fade-on-scroll"
                data-observe
                id={`feature-${index}`}
              >
                {feature}
              </div>
            ))}
          </div>
        </div>

        <div className="hero-story">
          <div className="story-container">
            <h2 className="story-title">{profile.story.title}</h2>
            <div className="story-content">
              {profile.story.content.map((paragraph, index) => (
                <p key={index} className="story-text">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 双栏布局 */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* 左侧主内容区 (70%) */}
          <main className="lg:w-[70%] space-y-20">
            {/* 📰 文章发布区 - 新增，重点展示 */}
            <section id="articles" data-observe>
              <SectionTitle
                title="最新发布"
                subtitle="分享我的思考与实践"
              />

              {featuredArticles.length > 0 ? (
                <>
                  <ArticleGrid articles={featuredArticles} columns={3} />

                  <div className="mt-12 text-center">
                    <Link
                      href="/blog"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-all duration-200 hover:scale-105"
                    >
                      查看全部文章
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </>
              ) : (
                <div className="text-center py-12 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
                  <p className="text-white/60 mb-4">还没有发布文章</p>
                  <p className="text-white/40 text-sm">
                    在 <code className="bg-white/10 px-2 py-1 rounded">content/articles/</code> 目录下添加 Markdown 文件即可
                  </p>
                </div>
              )}
            </section>

            {/* 🤖 AI 工具推荐区 - 下移，次要位置 */}
            <section id="ai-tools" data-observe>
              <SectionTitle
                title="AI 工具推荐"
                subtitle="提升效率的 AI 工具集合"
              />

              <div className="tools-grid">
                {tools.map((tool, index) => (
                  <div
                    key={tool.id}
                    className={`tool-card fade-on-scroll ${visibleElements.has(`tool-${index}`) ? 'fade-in' : ''}`}
                    data-observe
                    id={`tool-${index}`}
                  >
                    <div className="tool-icon">{tool.icon}</div>
                    <h3>{tool.name}</h3>
                    <p className="tool-description">{tool.description}</p>
                    <div className="tool-tags">
                      {tool.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </main>

          {/* 右侧侧栏 (30%) */}
          <aside className="lg:w-[30%] space-y-8">
            {/* 🛠️ 我的项目 */}
            <div data-observe>
              <ProjectSidebar
                projects={projects}
                title="🛠️ 我的项目"
                subtitle="展示我的开源项目"
              />
            </div>

            {/* 📊 统计信息 */}
            <div className="hidden lg:block" data-observe>
              <StatsCard
                articleCount={articles.length}
                projectCount={projects.length}
                toolCount={tools.length}
                publishedThisYear={articles.filter(a => {
                  const year = new Date(a.date).getFullYear();
                  return year === new Date().getFullYear();
                }).length}
              />
            </div>

            {/* 🔗 快速链接 */}
            <div className="hidden lg:block bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10" data-observe>
              <h3 className="text-lg font-bold text-white mb-4">🔗 快速链接</h3>
              <div className="space-y-2">
                {profile.social.github && (
                  <a
                    href={profile.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    GitHub
                  </a>
                )}
                {profile.social.twitter && (
                  <a
                    href={profile.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    Twitter
                  </a>
                )}
                {profile.social.email && (
                  <a
                    href={profile.social.email}
                    className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    邮箱
                  </a>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* 页脚 */}
      <footer className="footer">
        <div className="footer-content">
          <p className="copyright">© {new Date().getFullYear()} {profile.name}的个人主页. 保留所有权利.</p>
          <div className="social-links">
            {profile.social.github && (
              <>
                <a href={profile.social.github} className="social-link" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
                <span className="separator">·</span>
              </>
            )}
            {profile.social.twitter && (
              <>
                <a href={profile.social.twitter} className="social-link" target="_blank" rel="noopener noreferrer">
                  Twitter
                </a>
                <span className="separator">·</span>
              </>
            )}
            {profile.social.email && (
              <a href={profile.social.email} className="social-link">
                邮箱
              </a>
            )}
          </div>
        </div>
      </footer>
    </>
  );
}
