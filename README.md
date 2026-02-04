# 个人主页 v2.5 - Next.js版本

基于 Next.js 15 + TypeScript + Tailwind CSS 构建的现代化个人主页，采用苹果官网设计风格。

## ✨ 特性

- 🎨 **苹果官网设计风格** - 毛玻璃导航栏、流畅动画、精致排版
- 📝 **完整文章系统** - Markdown写作、Frontmatter元数据、自动生成
- 🛠️ **项目展示侧栏** - 展示你的开源项目作品
- 📡 **多平台内容聚合** - 支持RSS集成（微信公众号、掘金、知乎等）
- 📱 **完全响应式** - 完美适配手机、平板、电脑
- ⚡ **Next.js 15** - 使用最新的App Router和React 19
- 🔒 **TypeScript** - 类型安全，代码更可靠
- 🚀 **一键部署** - 完美支持 Vercel 部署
- 🔄 **ISR缓存** - 增量静态再生成，性能优异

## 📁 项目结构

```
personal-homepage-v2-nextjs/
├── app/                    # Next.js App Router
│   ├── blog/              # 博客系统
│   │   ├── page.tsx      # 博客列表页
│   │   └── [slug]/       # 博客详情页
│   │       └── page.tsx
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 主页面（双栏布局）
│
├── content/               # 文章内容目录 ✨ 新增
│   └── articles/         # Markdown文章
│       ├── _template.md   # 文章模板
│       └── *.md          # 你的文章
│
├── components/            # React组件
│   ├── articles/         # 文章相关组件
│   ├── projects/         # 项目相关组件
│   └── ui/               # UI组件
│
├── data/                 # 内容数据
│   ├── profile.ts        # 个人信息
│   ├── tools.ts          # AI工具列表
│   ├── projects.ts       # 项目数据 ✨ 新增
│   ├── rss-sources.ts    # RSS源配置 ✨ 新增
│   └── articles.json     # 自动生成，无需编辑
│
├── lib/                  # 工具函数
│   ├── articles.ts       # 文章读取工具
│   ├── markdown.ts       # Markdown解析
│   └── rss.ts            # RSS解析
│
├── types/                # TypeScript类型定义
│   ├── article.ts
│   ├── project.ts
│   └── rss.ts
│
├── config/               # 配置文件
│   └── site.ts           # 站点配置
│
├── scripts/              # 脚本
│   └── generate-articles-data.js
│
├── public/               # 静态资源
│   └── avatar.jpg        # 你的头像
│
└── docs/                 # 文档
    ├── WRITING.md        # 文章创作指南 ✨ 新增
    └── RSS_SETUP.md      # RSS配置指南 ✨ 新增
```

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 添加头像

将你的头像图片命名为 `avatar.jpg`，放到 `public/` 文件夹中。

### 3. 修改个人信息

编辑 `data/profile.ts`，修改你的名字、介绍、故事等。

```typescript
export const profile = {
  name: '你的名字',
  tagline: '你的介绍',
  avatar: '/avatar.jpg',
  // ...
}
```

### 4. 添加项目

编辑 `data/projects.ts`，添加你的开源项目：

```typescript
export const projects = [
  {
    id: 'my-project',
    title: '项目名称',
    description: '项目描述...',
    tags: ['Python', 'React'],
    links: {
      github: 'https://github.com/xxx/project'
    }
  }
]
```

### 5. 创建文章

在 `content/articles/` 目录下创建 Markdown 文件：

```bash
# 复制模板
cp content/articles/_template.md content/articles/2025-02-05-my-article.md

# 编辑文章
vim content/articles/2025-02-05-my-article.md
```

### 6. 运行开发服务器

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看效果。

---

## 📝 文章系统使用指南

### 创建文章

1. **创建文件**：在 `content/articles/` 创建文件，命名格式 `YYYY-MM-DD-title.md`

2. **添加元数据**：

```markdown
---
title: '文章标题'
date: 2025-02-05
category: '技术教程'
tags:
  - Python
  - 自动化
description: '文章摘要'
author: '你的名字'
featured: true
status: 'published'
---

# 文章标题

这里是文章内容...
```

3. **生成数据**：

```bash
npm run generate:articles
```

或者直接构建（会自动生成）：

```bash
npm run build
```

### 文章相关命令

```bash
# 生成文章数据
npm run generate:articles

# 构建项目（会自动生成文章数据）
npm run build

# 开发模式
npm run dev
```

**详细文档：** 查看 [WRITING.md](./WRITING.md) 了解完整的文章创作指南。

---

## 📡 RSS集成配置

### 支持的平台

- ✅ 微信公众号（通过RSSHub）
- ✅ 掘金专栏
- ✅ 知乎专栏
- ✅ 任何标准RSS源

### 快速配置

1. **编辑RSS源配置**：`data/rss-sources.ts`

```typescript
export const rssSources = [
  {
    name: '我的微信公众号',
    url: 'https://rsshub.app/weixin/mp/YOUR_ACCOUNT_ID',
    type: 'wechat',
    enabled: true,
    updateInterval: 60
  }
];
```

2. **启用RSS功能**：编辑 `config/site.ts`

```typescript
export const siteConfig = {
  features: {
    rssIntegration: true,  // 改为 true
  }
};
```

**详细文档：** 查看 [RSS_SETUP.md](./RSS_SETUP.md) 了解完整的RSS配置指南。

---

## 🎨 内容编辑指南

### 修改个人信息

文件位置：`data/profile.ts`

```typescript
export const profile = {
  name: '灰灰',                          // 你的名字
  tagline: 'AI爱好者 / 全栈开发者',      // 一句话介绍
  avatar: '/avatar.jpg',                 // 头像路径
  features: [                            // 特色标签
    '🚀 技术热情',
    '💡 创新思维',
    '🎯 目标导向',
    '🤝 团队协作'
  ],
  story: {                               // 背景故事
    title: '关于我的故事',
    content: [
      '第一段内容...',
      '第二段内容...',
      '第三段内容...'
    ]
  },
  social: {                              // 社交链接
    github: 'https://github.com/yourusername',
    twitter: 'https://twitter.com/yourusername',
    email: 'mailto:yourname@example.com'
  }
}
```

### 添加项目

文件位置：`data/projects.ts`

```typescript
{
  id: 'unique-id',
  title: '项目名称',
  description: '项目描述...',
  icon: '🚀',              // 可选：emoji图标
  tags: ['Python', 'React'],
  links: {
    github: 'https://github.com/xxx/project',
    demo: 'https://demo.example.com',
    docs: 'https://docs.example.com'
  },
  featured: true,
  status: 'active'
}
```

### 编辑AI工具列表

文件位置：`data/tools.ts`

```typescript
{
  id: 'unique-id',
  icon: '🤖',                    // Emoji图标
  name: '工具名称',
  description: '工具描述...',
  tags: ['标签1', '标签2', '标签3']
}
```

---

## 🌐 部署到 Vercel

### 方法一：通过 Vercel CLI（推荐）

1. **安装 Vercel CLI**

```bash
npm install -g vercel
```

2. **登录 Vercel**

```bash
vercel login
```

3. **部署项目**

```bash
cd personal-homepage-v2-nextjs
vercel
```

按照提示操作，几分钟后你的网站就会上线！

### 方法二：通过 Vercel 网站

1. 将代码推送到 GitHub

2. 访问 [vercel.com](https://vercel.com)

3. 点击 "Add New..." → "Project"

4. 导入你的 GitHub 仓库

5. 点击 "Deploy"

6. 等待部署完成！

### 方法三：通过 GitHub + Vercel 自动部署

1. **初始化 Git 仓库**

```bash
cd personal-homepage-v2-nextjs
git init
git add .
git commit -m "Initial commit"
```

2. **推送到 GitHub**

```bash
# 创建新的 GitHub 仓库后
git remote add origin https://github.com/yourusername/personal-homepage-v2-nextjs.git
git branch -M main
git push -u origin main
```

3. **在 Vercel 导入项目**

- 登录 [vercel.com](https://vercel.com)
- 点击 "Add New Project"
- 选择你的 GitHub 仓库
- 点击 "Deploy"

4. **自动部署设置**

之后每次你推送代码到 GitHub，Vercel 会自动重新部署！

---

## 🎨 自定义样式

所有样式都在 `app/globals.css` 中。

### 修改颜色主题

找到 `:root` 变量：

```css
:root {
  --color-primary: #0071e3;      /* 主题色 */
  --color-text: #1d1d1f;         /* 文字颜色 */
  --color-bg-gray: #f5f5f7;      /* 背景色 */
  /* ... */
}
```

### 修改渐变色

找到 `.gradient-text`：

```css
.gradient-text {
  background: linear-gradient(90deg, #0071e3 0%, #c92a2a 100%);
  /* 修改这两个颜色值 */
}
```

---

## 📱 响应式设计

项目已包含完整的响应式设计：

- **桌面端**：> 1024px（双栏布局：主内容70% + 侧栏30%）
- **平板端**：768px - 1024px（双栏布局：主内容65% + 侧栏35%）
- **手机端**：< 768px（单栏布局，侧栏移到底部）

所有断点都在 `globals.css` 的 `@media` 查询中。

---

## 🔧 常用命令

```bash
# 开发模式
npm run dev

# 生成文章数据
npm run generate:articles

# 构建生产版本
npm run build

# 启动生产服务器
npm start

# 代码检查
npm run lint
```

---

## 📦 技术栈

- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS + 自定义CSS
- **React**: React 19
- **Markdown**: gray-matter + remark + rehype
- **RSS**: rss-parser

---

## 🆚 与 v2.0 的区别

| 特性 | v2.0 | v2.5 |
|------|------|------|
| 文章系统 | 手动维护 | Markdown + 自动生成 |
| 项目展示 | 无 | 侧栏展示3个项目 |
| 内容聚合 | 本地 | 本地 + RSS多平台 |
| 布局结构 | 单栏 | 双栏（主内容 + 侧栏） |
| 内容顺序 | Hero → AI工具 → 文章 | Hero → 文章 → AI工具 → 项目 |
| 文档 | 基础 | 完整的创作和配置指南 |

---

## 🎯 下一步

### 基础设置

1. ✅ 添加你的头像到 `public/avatar.jpg`
2. ✅ 修改 `data/profile.ts` 中的个人信息
3. ✅ 编辑 `data/projects.ts` 添加你的项目
4. ✅ 编辑 `data/tools.ts` 添加你喜欢的AI工具

### 文章系统

5. ✅ 阅读 [WRITING.md](./WRITING.md) 了解文章创作
6. ✅ 在 `content/articles/` 创建你的第一篇文章
7. ✅ 运行 `npm run generate:articles` 生成数据

### RSS集成（可选）

8. ✅ 阅读 [RSS_SETUP.md](./RSS_SETUP.md) 了解RSS配置
9. ✅ 配置 `data/rss-sources.ts` 添加你的RSS源
10. ✅ 启用 `config/site.ts` 中的RSS功能

### 部署上线

11. ✅ 运行 `npm run build` 确保构建成功
12. ✅ 部署到 Vercel
13. ✅ 分享你的网站链接！

---

## 💡 提示

- 修改 `data/` 文件夹中的内容后，刷新页面即可看到效果
- 添加或修改文章后，运行 `npm run generate:articles`
- 生产部署前运行 `npm run build` 确保没有错误
- Vercel 会自动优化图片、压缩代码、配置CDN
- 完全免费托管（Vercel 免费计划）

---

## 📚 文档

- [文章创作指南](./WRITING.md) - 如何创建和管理文章
- [RSS配置指南](./RSS_SETUP.md) - 如何配置多平台RSS源
- [部署指南](./DEPLOY.md) - 详细的部署说明
- [编辑指南](./EDITING.md) - 如何编辑内容

---

## 📄 许可证

MIT License - 自由使用和修改

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

**祝你创建出完美的个人主页！** 🎉
