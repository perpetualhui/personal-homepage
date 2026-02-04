# PRD: 个人主页完整功能文档

**项目名称**: personal-homepage-v2-nextjs 完整功能规划
**版本**: v2.5.0
**文档日期**: 2025-02-04
**作者**: Claude & 用户协作

---

## 📋 目录

1. [项目背景](#1-项目背景)
2. [功能概览](#2-功能概览)
3. [模块一：项目侧栏展示](#3-模块一项目侧栏展示)
4. [模块二：文章创作与发布系统](#4-模块二文章创作与发布系统)
5. [模块三：微信公众号RSS集成](#5-模块三微信公众号rss集成)
6. [模块四：内容版本管理](#6-模块四内容版本管理)
7. [模块五：页面布局调整（v2.5）](#7-模块五页面布局调整v25)
8. [技术方案](#8-技术方案)
9. [数据结构](#9-数据结构)
10. [实施计划](#10-实施计划)
11. [验收标准](#11-验收标准)

---

## 1. 项目背景

### 1.1 现状分析

当前 `personal-homepage-v2-nextjs` 项目是一个现代化的个人主页，采用苹果官网设计风格，主要包含：
- Hero 区域（个人介绍）
- AI 工具推荐列表
- 文章展示列表

### 1.2 新增需求

用户希望在现有基础上增加以下功能：
1. **展示个人项目**：在侧栏展示三个 Python 脚本工具项目
2. **文章创作系统**：提供文章编写、同步到网站的完整流程
3. **多平台聚合**：集成微信公众号文章（通过 RSS）
4. **内容管理**：建立版本化的内容迭代管理机制
5. **布局优化**：调整页面内容顺序，突出发布内容

### 1.3 展示的三个项目

| 项目名称 | 项目类型 | 核心功能 | 技术栈 |
|---------|---------|---------|--------|
| **微博黑名单管理工具** | Python 脚本 | 导出/批量拉黑微博黑名单 | Selenium, JSON/CSV/TXT |
| **B站评论区热词分析工具** | Python 脚本 | 评论抓取、关键词分析、情感分析 | Requests, Jieba, SnowNLP |
| **B站UP主和热门榜单监控** | Python 脚本 | UP主更新监控、热门榜单变化检测 | Requests, 飞书机器人, SMTP |

---

## 2. 功能概览

### 2.1 功能模块图

```
personal-homepage-v2.5
│
├── 🏠 首页布局
│   ├── Hero 区域（个人介绍）
│   ├── 📰 文章发布区（新增，重点）
│   ├── 🤖 AI 工具推荐区（下移）
│   ├── 🛠️ 项目展示区（侧栏）
│   └── Footer
│
├── 📝 文章管理系统
│   ├── Markdown 文章编辑
│   ├── 文章元数据管理
│   ├── 自动生成文章列表
│   └── 文章分类与标签
│
├── 📡 多平台聚合
│   ├── 本地文章
│   ├── 微信公众号（RSS）
│   ├── 掘金/知乎（扩展）
│   └── 统一展示界面
│
└── 🔄 内容版本管理
    ├── v2.0 当前版本
    ├── v2.5 新版本规划
    └── 版本切换机制
```

### 2.2 版本对比

| 功能模块 | v2.0（当前） | v2.5（目标） |
|---------|------------|------------|
| **页面布局** | Hero → AI工具 → 文章 | Hero → 文章 → AI工具 → 项目侧栏 |
| **文章来源** | 手动维护 | 本地 + 微信公众号RSS |
| **项目管理** | 无 | 侧栏展示三个项目 |
| **内容管理** | 无版本控制 | 版本化迭代管理 |
| **创作流程** | 无文档 | 完整的创作指南 |

---

## 3. 模块一：项目侧栏展示

### 3.1 功能描述

在首页右侧添加侧栏，展示三个实用工具项目卡片。

### 3.2 侧栏布局

**桌面端布局**：
```
┌────────────────────────────────────────────────────────┐
│  主内容区域 (70%)         │  项目侧栏 (30%)            │
│                          │                            │
│  ┌────────────────────┐  │  ┌──────────────────────┐ │
│  │  Hero 区域         │  │  │  🛠️ 我的项目         │ │
│  └────────────────────┘  │  ├──────────────────────┤ │
│                          │  │  [项目卡片1]          │ │
│  ┌────────────────────┐  │  │  [项目卡片2]          │ │
│  │  文章发布区        │  │  │  [项目卡片3]          │ │
│  └────────────────────┘  │  └──────────────────────┘ │
│                          │                            │
│  ┌────────────────────┐  │  ┌──────────────────────┐ │
│  │  AI 工具推荐       │  │  │  📊 统计信息         │ │
│  └────────────────────┘  │  │  - 文章数：XX         │ │
│                          │  │  - 项目数：3          │ │
└──────────────────────────┘  └──────────────────────┘ │
```

**响应式规则**：
- 桌面端（>1024px）：右侧固定侧栏，宽度 320px
- 平板端（768-1024px）：可折叠侧栏
- 移动端（<768px）：项目卡片移到页面底部

### 3.3 项目卡片设计

每个卡片包含：
```typescript
{
  id: 'weibo-blacklist-manager',
  title: '微博黑名单管理工具',
  description: '强大的微博黑名单管理工具，支持导出、批量拉黑',
  icon: '🛡️',
  tags: ['Python', 'Selenium', '自动化'],
  links: {
    github: 'https://...',
    demo: 'https://...'
  },
  featured: true
}
```

---

## 4. 模块二：文章创作与发布系统

### 4.1 文章创作流程

#### 完整工作流

```
1. 📝 文章创作
   ↓
2. ✍️ Markdown 编写
   ↓
3. 🏷️ 添加元数据（标题、日期、分类、标签、摘要）
   ↓
4. 📁 保存到 content/articles/ 目录
   ↓
5. 🔄 构建时自动读取并生成页面
   ↓
6. 🚀 部署到网站
```

### 4.2 文件组织结构

```
personal-homepage-v2-nextjs/
├── content/                    # 新增：文章内容目录
│   ├── articles/              # 文章 Markdown 文件
│   │   ├── 2025-02-04-my-first-article.md
│   │   ├── 2025-02-05-how-to-use-ai-tools.md
│   │   └── 2025-02-06-weibo-blacklist-tool.md
│   └── authors/               # 作者信息（可选）
│       └── default.json
│
├── app/
│   ├── blog/                  # 新增：博客路由
│   │   ├── page.tsx          # 文章列表页
│   │   └── [slug]/           # 动态路由
│   │       └── page.tsx      # 文章详情页
│   └── page.tsx               # 首页（展示最新文章）
│
└── lib/                       # 新增：工具函数
    ├── markdown.ts            # Markdown 解析
    ├── articles.ts            # 文章读取和排序
    └── rss.ts                 # RSS 解析
```

### 4.3 文章元数据格式

每个 Markdown 文件顶部需要包含 Frontmatter：

```markdown
---
title: '如何使用微博黑名单管理工具'
date: 2025-02-04
category: '工具使用'
tags:
  - Python
  - 社交媒体
  - 自动化
description: '详细介绍如何使用微博黑名单管理工具，包括安装、配置和使用方法'
cover: '/images/article-covers/weibo-tool.jpg'
author: '你的名字'
featured: true  # 是否在首页展示
status: 'published'  # published | draft
---

# 文章标题

这里是文章内容...
```

### 4.4 文章类型定义

```typescript
// types/article.ts
export interface Article {
  id: string;              // 文件名（不含扩展名）
  title: string;           // 标题
  date: string;            // 发布日期
  category: string;        // 分类
  tags: string[];          // 标签数组
  description: string;     // 摘要
  cover?: string;          // 封面图 URL
  author: string;          // 作者
  content: string;         // Markdown 内容（渲染后为 HTML）
  featured: boolean;       // 是否精选
  status: 'published' | 'draft';  // 状态
  source: 'local' | 'wechat' | 'other';  // 来源
  sourceUrl?: string;      // 外部链接（如微信文章链接）
  readingTime: number;     // 预估阅读时间（分钟）
}
```

### 4.5 Markdown 编写指南

#### 推荐的工具

1. **VS Code** + 插件
   - Markdown Preview Enhanced
   - Markdown All in One

2. **Typora**（付费但体验极佳）
3. **Obsidian**（免费，知识管理工具）
4. **Mark Text**（免费开源）

#### 文章模板

创建 `content/articles/_template.md`：

```markdown
---
title: '文章标题'
date: YYYY-MM-DD
category: '技术教程'
tags:
  - 标签1
  - 标签2
description: '简短描述（1-2句话，用于SEO和分享）'
cover: '/images/article-covers/cover.jpg'
author: '你的名字'
featured: false
status: 'published'
---

# 文章标题

## 引言

简短的引言，吸引读者继续阅读...

## 正文

### 小节1

内容...

### 小节2

内容...

## 代码示例

\`\`\`python
def hello_world():
    print("Hello, World!")
\`\`\`

## 总结

总结要点...

## 参考资料

- [参考资料1](url)
- [参考资料2](url)
```

### 4.6 文章自动读取

创建 `lib/articles.ts`：

```typescript
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const articlesDirectory = path.join(process.cwd(), 'content/articles');

export function getAllArticles(): Article[] {
  // 读取所有文章文件
  const fileNames = fs.readdirSync(articlesDirectory);

  const allArticlesData = fileNames.map(fileName => {
    // 读取 Markdown 文件
    const fullPath = path.join(articlesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // 解析 Frontmatter
    const { data, content } = matter(fileContents);

    return {
      id: fileName.replace(/\.md$/, ''),
      ...data,
      content,
      source: 'local' as const,
    } as Article;
  });

  // 按日期排序（最新的在前）
  return allArticlesData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getFeaturedArticles(): Article[] {
  const allArticles = getAllArticles();
  return allArticles.filter(article => article.featured);
}
```

### 4.7 首页文章展示

修改 `app/page.tsx`，在 Hero 区域后添加文章列表：

```typescript
import { getFeaturedArticles } from '@/lib/articles';

export default function HomePage() {
  const featuredArticles = getFeaturedArticles().slice(0, 3);

  return (
    <>
      {/* Hero 区域 */}
      <section id="hero">...</section>

      {/* 📰 文章发布区 - 新增 */}
      <section id="articles" className="py-20">
        <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent">
          最新文章
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredArticles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/blog" className="text-blue-400 hover:text-blue-300">
            查看全部文章 →
          </Link>
        </div>
      </section>

      {/* 🤖 AI 工具推荐区 - 原有，下移 */}
      <section id="tools">...</section>
    </>
  );
}
```

---

## 5. 模块三：微信公众号RSS集成

### 5.1 技术方案

由于**微信公众号本身不提供公开的 RSS 源**，需要使用第三方服务。

#### 推荐的RSS服务

| 服务 | 优点 | 缺点 | 费用 |
|-----|------|------|------|
| **WeRSS** | 专门针对微信，更新快 | 需要注册 | 免费/付费 |
| **RSSHub** | 开源，支持多平台 | 需要自己部署或使用公共实例 | 免费 |
| **Feed43** | 自定义抓取 | 配置复杂 | 免费 |
| **FiveFilters** | 功能强大 | 需要技术能力 | 免费/付费 |

### 5.2 方案一：使用 RSSHub（推荐）

#### 步骤 1：获取微信公众号文章 RSS

RSSHub 提供微信公众号的路由：

```
https://rsshub.app/weixin/mp/{账号ID}
```

获取账号ID：
1. 访问微信公众号主页
2. 查看URL或使用微信搜一搜
3. 使用工具查询账号ID（如：新榜）

#### 步骤 2：创建 RSS 读取工具

创建 `lib/rss.ts`：

```typescript
import Parser from 'rss-parser';

const parser = new Parser();

export interface WeChatArticle {
  title: string;
  link: string;
  pubDate: string;
  content: string;
  contentSnippet: string;
  guid: string;
}

export async function fetchWeChatArticles(
  rssUrl: string
): Promise<WeChatArticle[]> {
  try {
    const feed = await parser.parseURL(rssUrl);

    return feed.items.map(item => ({
      title: item.title || '',
      link: item.link || '',
      pubDate: item.pubDate || '',
      content: item.content || '',
      contentSnippet: item.contentSnippet || '',
      guid: item.guid || '',
    }));
  } catch (error) {
    console.error('Failed to fetch WeChat articles:', error);
    return [];
  }
}
```

#### 步骤 3：配置 RSS 源

创建 `data/rss-sources.ts`：

```typescript
export const rssSources = [
  {
    name: '我的微信公众号',
    url: 'https://rsshub.app/weixin/mp/你的账号ID',
    type: 'wechat',
    enabled: true,
  },
  // 未来可以添加更多源
  // {
  //   name: '掘金专栏',
  //   url: 'https://juejin.cn/rss/user/xxx',
  //   type: 'juejin',
  //   enabled: true,
  // },
];
```

### 5.3 方案二：使用 WeRSS

#### 注册和配置

1. 访问 [WeRSS](https://werss.app/)
2. 注册账号
3. 添加要监控的微信公众号
4. 获取 RSS 链接

#### 使用方式

与 RSSHub 类似，只需替换 URL：

```typescript
export const rssSources = [
  {
    name: '我的微信公众号',
    url: 'https://werss.app/rss/你的RSS_ID',
    type: 'wechat',
    enabled: true,
  },
];
```

### 5.4 数据集成

#### 合并本地文章和RSS文章

修改 `lib/articles.ts`：

```typescript
import { getAllLocalArticles } from './local-articles';
import { fetchWeChatArticles } from './rss';
import { rssSources } from '@/data/rss-sources';

export async function getAllArticles(): Promise<Article[]> {
  // 1. 获取本地文章
  const localArticles = getAllLocalArticles();

  // 2. 获取微信文章
  let wechatArticles: Article[] = [];

  for (const source of rssSources) {
    if (source.enabled && source.type === 'wechat') {
      const items = await fetchWeChatArticles(source.url);

      wechatArticles = items.map(item => ({
        id: item.guid,
        title: item.title,
        date: new Date(item.pubDate).toISOString().split('T')[0],
        category: '微信公众号',
        tags: [],
        description: item.contentSnippet,
        content: item.content,
        author: '微信公众号',
        featured: false,
        status: 'published' as const,
        source: 'wechat' as const,
        sourceUrl: item.link,
        readingTime: Math.ceil(item.contentSnippet.length / 400),
      }));
    }
  }

  // 3. 合并并排序
  const allArticles = [...localArticles, ...wechatArticles];

  return allArticles.sort((a, b) => {
    if (a.date < b.date) return 1;
    return -1;
  });
}
```

### 5.5 显示文章来源

在文章卡片上显示来源标识：

```typescript
<ArticleCard article={article}>
  {article.source === 'wechat' && (
    <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">
      微信公众号
    </span>
  )}
  {article.source === 'local' && (
    <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs">
      原创文章
    </span>
  )}
</ArticleCard>
```

### 5.6 性能优化

由于 RSS 请求是异步的，需要考虑性能：

#### 方案 1：构建时获取（推荐）

使用 Next.js 的 `generateStaticParams` 在构建时获取：

```typescript
// app/blog/page.tsx
export const revalidate = 3600; // 每小时重新验证一次

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map(article => ({
    slug: article.id,
  }));
}
```

#### 方案 2：增量静态再生成（ISR）

```typescript
export const revalidate = 3600; // 3600秒 = 1小时

export default async function BlogPage() {
  const articles = await getAllArticles();
  // ...
}
```

#### 方案 3：客户端定时刷新

```typescript
'use client';

import { useEffect, useState } from 'useState';

export function ArticleList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // 初始加载
    fetchArticles();

    // 每小时刷新一次
    const interval = setInterval(fetchArticles, 3600000);

    return () => clearInterval(interval);
  }, []);

  async function fetchArticles() {
    const res = await fetch('/api/articles');
    const data = await res.json();
    setArticles(data);
  }

  // ...
}
```

---

## 6. 模块四：内容版本管理

### 6.1 版本管理策略

#### 版本命名规则

```
v{主版本}.{次版本}.{修订版}

示例：
- v2.0.0 - 初始版本
- v2.1.0 - 添加项目侧栏
- v2.5.0 - 重新布局，添加文章系统
- v2.5.1 - 修复文章排序bug
```

#### 版本切换机制

使用环境变量或配置文件控制版本：

```typescript
// config/site.ts
export const siteConfig = {
  version: '2.5.0',
  layout: {
    hero: true,
    articles: true,
    tools: true,
    sidebar: true,
  },
  features: {
    rssIntegration: true,
    wechatIntegration: true,
    articleSystem: true,
  },
};
```

### 6.2 内容迁移策略

#### 数据版本控制

```
data/
├── v2.0/           # 旧版本数据备份
│   ├── articles.ts
│   ├── tools.ts
│   └── profile.ts
│
├── v2.5/           # 新版本数据
│   ├── projects.ts
│   ├── articles/   # 从 articles.ts 迁移到 Markdown 文件
│   └── rss-sources.ts
│
└── current -> v2.5 # 符号链接指向当前版本
```

#### 迁移脚本

创建 `scripts/migrate-v2-to-v2.5.ts`：

```typescript
import fs from 'fs';
import path from 'path';

// 读取旧版本文章数据
const oldArticles = require('../data/v2.0/articles.ts');

// 转换为 Markdown 文件
oldArticles.forEach(article => {
  const markdown = `---
title: '${article.title}'
date: '${article.date}'
category: '${article.category}'
tags: ${JSON.stringify(article.tags)}
description: '${article.description}'
author: '${article.author}'
featured: ${article.featured || false}
status: 'published'
---

${article.content}
`;

  const fileName = `${article.date}-${article.slug}.md`;
  const filePath = path.join(__dirname, '../content/articles', fileName);

  fs.writeFileSync(filePath, markdown);
});

console.log('迁移完成！');
```

### 6.3 Git 版本控制

#### 分支策略

```
main (生产环境)
├── v2.0 (旧版本，打 tag)
└── v2.5 (新版本，开发中)

develop (开发环境)
└── feature/article-system (功能分支)
└── feature/rss-integration (功能分支)
```

#### 发布流程

```bash
# 1. 创建功能分支
git checkout -b feature/article-system

# 2. 开发功能
git add .
git commit -m "feat: 添加文章系统"

# 3. 合并到 develop
git checkout develop
git merge feature/article-system

# 4. 测试通过后，合并到 main
git checkout main
git merge develop

# 5. 打版本标签
git tag -a v2.5.0 -m "发布 v2.5.0"
git push origin v2.5.0

# 6. 部署到生产环境
vercel --prod
```

### 6.4 配置文件管理

#### 环境变量

创建 `.env.local`：

```bash
# RSS 配置
NEXT_PUBLIC_RSS_ENABLED=true
NEXT_PUBLIC_WECHAT_RSS_URL=https://rsshub.app/weixin/mp/xxx

# 功能开关
NEXT_PUBLIC_ARTICLE_SYSTEM_ENABLED=true
NEXT_PUBLIC_SIDEBAR_ENABLED=true
NEXT_PUBLIC_RSS_INTEGRATION_ENABLED=true

# 版本控制
NEXT_PUBLIC_SITE_VERSION=2.5.0
```

#### 使用环境变量

```typescript
const config = {
  rssEnabled: process.env.NEXT_PUBLIC_RSS_ENABLED === 'true',
  wechatRssUrl: process.env.NEXT_PUBLIC_WECHAT_RSS_URL,
  version: process.env.NEXT_PUBLIC_SITE_VERSION,
};
```

### 6.5 A/B 测试（可选）

如果需要同时运行两个版本：

```typescript
'use client';

import { useEffect, useState } from 'react';

export function useVersionControl() {
  const [version, setVersion] = useState('2.5.0');

  useEffect(() => {
    // 随机分配版本（50% v2.0, 50% v2.5）
    const random = Math.random();
    if (random > 0.5) {
      setVersion('2.5.0');
    } else {
      setVersion('2.0.0');
    }
  }, []);

  return version;
}
```

---

## 7. 模块五：页面布局调整（v2.5）

### 7.1 新布局结构

#### v2.0 布局（旧）

```
首页
├── 导航栏
├── Hero 区域（个人介绍）
├── AI 工具推荐（6个工具卡片）
├── 文章列表（3篇文章）
└── Footer
```

#### v2.5 布局（新）

```
首页（桌面端）
├── 导航栏
├── Hero 区域（个人介绍）
├── 主内容区 (70%)
│   ├── 📰 文章发布区（重点，6篇文章）
│   └── 🤖 AI 工具推荐（下移，次要）
└── 侧栏 (30%)
    ├── 🛠️ 我的项目（3个工具项目）
    └── 📊 统计信息
└── Footer
```

### 7.2 详细布局设计

```typescript
// app/page.tsx
export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* 导航栏 */}
      <Navbar />

      {/* Hero 区域 */}
      <section id="hero">
        {/* 保持不变 */}
      </section>

      {/* 双栏布局 */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* 左侧主内容区 (70%) */}
          <main className="lg:w-[70%] space-y-20">

            {/* 📰 文章发布区 - 提升，重点展示 */}
            <section id="articles">
              <SectionTitle
                title="最新发布"
                subtitle="分享我的思考与实践"
              />
              <ArticleGrid articles={featuredArticles} />
              <ViewAllLink href="/blog" />
            </section>

            {/* 🤖 AI 工具推荐 - 下移，次要位置 */}
            <section id="tools">
              <SectionTitle
                title="AI 工具推荐"
                subtitle="提升效率的AI工具"
              />
              <ToolGrid tools={aiTools} />
            </section>

          </main>

          {/* 右侧侧栏 (30%) */}
          <aside className="lg:w-[30%] space-y-8">

            {/* 🛠️ 我的项目 */}
            <ProjectSidebar projects={myProjects} />

            {/* 📊 统计信息 */}
            <StatsCard />

            {/* 🔗 快速链接 */}
            <QuickLinks />

          </aside>

        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
```

### 7.3 响应式布局

#### 移动端（<768px）

```
┌─────────────────────────┐
│  Hero                   │
├─────────────────────────┤
│  📰 最新发布（重点）     │
│  [文章1]                │
│  [文章2]                │
│  [文章3]                │
├─────────────────────────┤
│  🛠️ 我的项目            │
│  [项目1]                │
│  [项目2]                │
│  [项目3]                │
├─────────────────────────┤
│  🤖 AI 工具推荐         │
│  [工具1-6]              │
└─────────────────────────┘
```

#### 平板端（768-1024px）

```
┌─────────────────────────────────────┐
│  Hero                               │
├──────────────────┬──────────────────┤
│  主内容 (65%)     │  侧栏 (35%)      │
│                  │                  │
│  📰 文章         │  🛠️ 项目        │
│  [文章1-4]       │  [项目1]         │
│                  │  [项目2]         │
│  🤖 AI工具       │  [项目3]         │
│  [工具1-6]       │                  │
│                  │  📊 统计         │
└──────────────────┴──────────────────┘
```

#### 桌面端（>1024px）

```
┌──────────────────────────────────────────────────────────┐
│  Hero                                                     │
├─────────────────────────────────┬────────────────────────┤
│  主内容 (70%)                   │  侧栏 (30%)            │
│                                 │                        │
│  📰 最新发布（重点）            │  🛠️ 我的项目           │
│  ┌─────────┬─────────┬─────────┐ │  ┌──────────────────┐ │
│  │文章1    │文章2    │文章3    │ │  │[项目1]           │ │
│  ├─────────┼─────────┼─────────┤ │  │[项目2]           │ │
│  │文章4    │文章5    │文章6    │ │  │[项目3]           │ │
│  └─────────┴─────────┴─────────┘ │  └──────────────────┘ │
│                                 │                        │
│  🤖 AI 工具推荐（次要）          │  📊 统计信息          │
│  ┌─────┬─────┬─────┬─────┐     │  ┌──────────────────┐ │
│  │工具1│工具2│工具3│工具4│     │  │文章数：XX        │ │
│  ├─────┼─────┼─────┼─────┤     │  │项目数：3         │ │
│  │工具5│工具6│     │     │     │  │工具数：6         │ │
│  └─────┴─────┴─────┴─────┘     │  └──────────────────┘ │
└─────────────────────────────────┴────────────────────────┘
```

### 7.4 视觉层次设计

#### 区块重要性排序

1. **Hero 区域** - 最高优先级（全宽，渐变背景）
2. **文章发布区** - 高优先级（3列网格，大卡片）
3. **我的项目（侧栏）** - 中高优先级（侧栏顶部）
4. **AI 工具推荐** - 中等优先级（主内容底部）
5. **统计信息** - 低优先级（侧栏底部）

#### 视觉引导

```css
/* 使用大小、颜色、位置引导视线 */

/* Hero - 最醒目 */
#hero {
  font-size: 3rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* 文章区 - 次醒目 */
#articles {
  margin-top: 4rem;
}

.article-card {
  min-height: 300px;  /* 大卡片 */
}

/* AI工具区 - 较低调 */
#tools {
  margin-top: 6rem;  /* 更大的间距 */
}

.tool-card {
  min-height: 200px;  /* 小卡片 */
}
```

---

## 8. 技术方案

### 8.1 技术栈

```
核心框架
├── Next.js 15 (App Router)
├── React 19
└── TypeScript

样式方案
├── Tailwind CSS 3.4
└── PostCSS

数据处理
├── gray-matter        # Frontmatter 解析
├── remark             # Markdown 解析
├── rehype             # HTML 处理
└── rss-parser         # RSS 解析

内容管理
├── Markdown 文件      # 本地文章
└── RSS/JSON           # 外部源

部署平台
└── Vercel             # 自动部署 + ISR
```

### 8.2 依赖安装

```bash
# 核心依赖
npm install gray-matter remark rehype rss-parser

# 类型定义
npm install -D @types/node

# 可选：代码高亮
npm install rehype-prism-plus

# 可选：图片优化
npm install next/image
```

### 8.3 文件结构

```
personal-homepage-v2-nextjs/
├── app/
│   ├── page.tsx                    # 首页（新布局）
│   ├── layout.tsx
│   ├── globals.css
│   ├── blog/                       # 新增：博客路由
│   │   ├── page.tsx               # 文章列表页
│   │   └── [slug]/
│   │       └── page.tsx           # 文章详情页
│   └── api/                       # 新增：API路由
│       └── articles/
│           └── route.ts           # 文章API
│
├── components/                     # 新增：组件
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── Sidebar.tsx            # 侧栏容器
│   ├── articles/
│   │   ├── ArticleCard.tsx        # 文章卡片
│   │   ├── ArticleGrid.tsx        # 文章网格
│   │   └── ArticleList.tsx        # 文章列表
│   ├── projects/
│   │   ├── ProjectCard.tsx        # 项目卡片
│   │   └── ProjectSidebar.tsx     # 项目侧栏
│   ├── tools/
│   │   ├── ToolCard.tsx
│   │   └── ToolGrid.tsx
│   └── ui/
│       ├── SectionTitle.tsx
│       ├── StatsCard.tsx
│       └── Tag.tsx
│
├── content/                        # 新增：内容目录
│   └── articles/                  # Markdown 文章
│       ├── _template.md           # 文章模板
│       ├── 2025-02-04-example.md
│       └── ...
│
├── data/                          # 数据文件
│   ├── profile.ts
│   ├── tools.ts
│   ├── projects.ts                # 新增：项目数据
│   └── rss-sources.ts             # 新增：RSS 源配置
│
├── lib/                           # 工具函数
│   ├── markdown.ts                # 新增：Markdown 解析
│   ├── articles.ts                # 新增：文章读取
│   ├── rss.ts                     # 新增：RSS 读取
│   └── utils.ts
│
├── types/                         # 类型定义
│   ├── article.ts                 # 新增：文章类型
│   ├── project.ts                 # 新增：项目类型
│   └── tool.ts
│
├── config/                        # 配置文件
│   ├── site.ts                    # 站点配置
│   └── articles.ts                # 文章配置
│
└── scripts/                       # 脚本
    ├── migrate-v2-to-v2.5.ts      # 迁移脚本
    └── sync-rss.ts                # RSS 同步脚本
```

---

## 9. 数据结构

### 9.1 类型定义

#### Article 类型

```typescript
// types/article.ts
export interface Article {
  id: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  description: string;
  cover?: string;
  author: string;
  content: string;
  featured: boolean;
  status: 'published' | 'draft';
  source: 'local' | 'wechat' | 'other';
  sourceUrl?: string;
  readingTime: number;
}
```

#### Project 类型

```typescript
// types/project.ts
export interface Project {
  id: string;
  title: string;
  description: string;
  icon?: string;
  cover?: string;
  tags: string[];
  links: {
    github?: string;
    demo?: string;
    docs?: string;
  };
  featured?: boolean;
  status?: 'active' | 'maintenance' | 'archived';
}
```

### 9.2 数据文件示例

#### projects.ts

```typescript
// data/projects.ts
import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    id: 'weibo-blacklist-manager',
    title: '微博黑名单管理工具',
    description: '强大的微博黑名单管理工具，支持导出黑名单、一键拉黑和批量拉黑功能',
    tags: ['Python', 'Selenium', '自动化'],
    links: {
      github: 'https://github.com/xxx/weibo-blacklist-manager',
      docs: '/docs/weibo-tool.md'
    },
    featured: true,
    status: 'active'
  },
  // ... 其他项目
];
```

#### rss-sources.ts

```typescript
// data/rss-sources.ts
export interface RssSource {
  name: string;
  url: string;
  type: 'wechat' | 'juejin' | 'zhihu' | 'other';
  enabled: boolean;
  updateInterval?: number; // 分钟
}

export const rssSources: RssSource[] = [
  {
    name: '我的微信公众号',
    url: 'https://rsshub.app/weixin/mp/xxx',
    type: 'wechat',
    enabled: true,
    updateInterval: 60
  }
];
```

---

## 10. 实施计划

### 10.1 分阶段实施

#### 阶段 1: 基础设施搭建（1-2天）

**任务清单**：
- [ ] 安装依赖（gray-matter, remark, rss-parser）
- [ ] 创建目录结构（content/, lib/, types/）
- [ ] 配置 TypeScript 类型定义
- [ ] 设置环境变量

**交付物**：
- 完整的项目结构
- 类型定义文件

---

#### 阶段 2: 项目侧栏开发（半天）

**任务清单**：
- [ ] 创建 `types/project.ts`
- [ ] 创建 `data/projects.ts`
- [ ] 创建 `components/Sidebar.tsx`
- [ ] 创建 `components/ProjectCard.tsx`
- [ ] 集成到首页

**交付物**：
- 功能完整的侧栏
- 三个项目展示

---

#### 阶段 3: 文章系统开发（2-3天）

**任务清单**：
- [ ] 创建文章类型定义
- [ ] 创建 Markdown 解析工具
- [ ] 创建文章读取函数
- [ ] 创建文章组件（ArticleCard, ArticleGrid）
- [ ] 创建博客页面（/blog, /blog/[slug]）
- [ ] 编写第一篇示例文章

**交付物**：
- 完整的文章系统
- 博客列表页
- 文章详情页

---

#### 阶段 4: RSS 集成（1-2天）

**任务清单**：
- [ ] 选择 RSS 服务（RSSHub 或 WeRSS）
- [ ] 创建 RSS 读取工具
- [ ] 创建 RSS 源配置文件
- [ ] 实现数据合并逻辑
- [ ] 添加来源标识显示
- [ ] 配置 ISR 缓存策略

**交付物**：
- RSS 集成功能
- 微信公众号文章展示

---

#### 阶段 5: 布局调整（半天）

**任务清单**：
- [ ] 修改首页布局结构
- [ ] 调整内容区域顺序
- [ ] 实现双栏布局
- [ ] 响应式调试
- [ ] 视觉层次优化

**交付物**：
- 新版首页布局
- 响应式适配

---

#### 阶段 6: 文档和测试（1天）

**任务清单**：
- [ ] 编写文章创作指南
- [ ] 编写 RSS 配置指南
- [ ] 跨浏览器测试
- [ ] 移动端测试
- [ ] 性能优化

**交付物**：
- 完整的使用文档
- 测试报告

---

### 10.2 时间线

```
Week 1:
├── Day 1-2: 阶段1（基础设施）
├── Day 3: 阶段2（项目侧栏）
└── Day 4-6: 阶段3（文章系统）

Week 2:
├── Day 1-2: 阶段4（RSS集成）
├── Day 3: 阶段5（布局调整）
└── Day 4-5: 阶段6（文档和测试）

总计：10-12天
```

### 10.3 优先级

| 模块 | 优先级 | 预计时间 | 依赖 |
|-----|-------|---------|------|
| 基础设施 | P0 | 1-2天 | 无 |
| 项目侧栏 | P0 | 0.5天 | 基础设施 |
| 文章系统 | P0 | 2-3天 | 基础设施 |
| RSS集成 | P1 | 1-2天 | 文章系统 |
| 布局调整 | P0 | 0.5天 | 所有模块 |
| 文档测试 | P1 | 1天 | 所有模块 |

---

## 11. 验收标准

### 11.1 功能验收

#### 项目侧栏

- [ ] 侧栏在桌面端显示在右侧
- [ ] 展示三个项目卡片
- [ ] 卡片包含完整信息（标题、描述、标签、链接）
- [ ] 移动端侧栏正确调整位置
- [ ] 悬停和点击交互流畅

#### 文章系统

- [ ] 可以创建 Markdown 文章
- [ ] Frontmatter 正确解析
- [ ] 首页展示最新文章
- [ ] /blog 页面展示所有文章
- [ ] /blog/[slug] 页面正确渲染文章
- [ ] 代码高亮正常工作
- [ ] 文章卡片样式一致

#### RSS集成

- [ ] 正确获取微信公众号文章
- [ ] RSS文章和本地文章正确合并
- [ ] 按日期正确排序
- [ ] 显示文章来源标识
- [ ] 缓存策略正常工作（ISR）

#### 布局调整

- [ ] 文章区域在 AI 工具区域上方
- [ ] 双栏布局在桌面端正确显示
- [ ] 移动端、平板端、桌面端布局正确切换
- [ ] 视觉层次清晰

### 11.2 性能验收

- [ ] 首页加载时间 < 2s
- [ ] 文章页面加载时间 < 1s
- [ ] Lighthouse 性能分数 > 90
- [ ] 无明显布局抖动（CLS < 0.1）
- [ ] RSS 缓存正常工作

### 11.3 兼容性验收

#### 浏览器测试

- [ ] Chrome 最新版
- [ ] Safari 最新版
- [ ] Firefox 最新版
- [ ] Edge 最新版

#### 移动端测试

- [ ] iOS Safari 13+
- [ ] Android Chrome 80+
- [ ] 横屏和竖屏
- [ ] 触摸交互

### 11.4 文档验收

- [ ] 文章创作指南完整
- [ ] RSS 配置指南清晰
- [ ] 代码注释充分
- [ ] README 更新

---

## 12. 附录

### 12.1 文章创作快速指南

#### 步骤 1：创建文章文件

```bash
# 在 content/articles/ 目录下创建文件
# 命名格式：YYYY-MM-DD-title.md
touch content/articles/2025-02-04-my-article.md
```

#### 步骤 2：编写 Frontmatter

```markdown
---
title: '文章标题'
date: 2025-02-04
category: '技术教程'
tags: ['React', 'Next.js']
description: '简短描述'
author: '你的名字'
featured: true
status: 'published'
---
```

#### 步骤 3：编写内容

```markdown
## 引言

内容...

## 正文

### 小节

更多内容...

## 代码示例

\`\`\`javascript
console.log('Hello');
\`\`\`
```

#### 步骤 4：保存并部署

```bash
# 提交代码
git add .
git commit -m "feat: 添加新文章"

# 推送到远程
git push

# Vercel 会自动部署
```

### 12.2 微信公众号 RSS 配置指南

#### 方式 1：使用 RSSHub（推荐）

1. **获取公众号账号ID**
   - 访问微信公众号主页
   - 使用新榜等工具查询账号ID

2. **生成 RSS 链接**
   ```
   https://rsshub.app/weixin/mp/{账号ID}
   ```

3. **配置到项目**
   ```typescript
   // data/rss-sources.ts
   export const rssSources = [
     {
       name: '我的公众号',
       url: 'https://rsshub.app/weixin/mp/xxx',
       type: 'wechat',
       enabled: true
     }
   ];
   ```

#### 方式 2：使用 WeRSS

1. **注册 WeRSS**
   - 访问 https://werss.app/
   - 注册账号

2. **添加公众号**
   - 在 WeRSS 中添加公众号
   - 获取 RSS 链接

3. **配置到项目**
   ```typescript
   // data/rss-sources.ts
   export const rssSources = [
     {
       name: '我的公众号',
       url: 'https://werss.app/rss/xxx',
       type: 'wechat',
       enabled: true
     }
   ];
   ```

### 12.3 常见问题

#### Q1: RSS 更新不及时？

A: 检查以下几点：
- RSS 源是否正常工作
- ISR 缓存时间设置（默认1小时）
- 可以手动触发重新部署

#### Q2: 文章样式不一致？

A: 检查：
- Markdown 语法是否正确
- Tailwind CSS 类名是否冲突
- 使用统一的 CSS reset

#### Q3: 移动端侧栏不显示？

A: 这是预期行为：
- 移动端侧栏会移动到页面底部
- 可以调整为可折叠菜单

### 12.4 参考资料

- [Next.js 15 文档](https://nextjs.org/docs)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [gray-matter 文档](https://github.com/jonschlinkert/gray-matter)
- [RSSHub 文档](https://docs.rsshub.app/)
- [remark 文档](https://github.com/remarkjs/remark)

---

## 📝 变更记录

| 版本 | 日期 | 变更内容 | 作者 |
|-----|------|---------|------|
| v1.0.0 | 2025-02-04 | 初始版本，项目侧栏 PRD | Claude & 用户 |
| v2.0.0 | 2025-02-04 | 增加文章系统、RSS集成、内容管理 | Claude & 用户 |
| v2.5.0 | 2025-02-04 | 完整功能文档，包含所有模块 | Claude & 用户 |

---

<div align="center">

**[⬆ 回到顶部](#prd-个人主页完整功能文档)**

Made with ❤️ for personal-homepage-v2-nextjs v2.5

</div>
