# 更新日志

## [2.5.0] - 2025-02-05

### 🎉 重大更新

本次更新将项目从 v2.0 升级到 v2.5，新增了完整的文章系统、项目展示侧栏和多平台内容聚合功能。

---

### ✨ 新增功能

#### 📝 完整的文章系统

- **Markdown文章支持**
  - 在 `content/articles/` 目录下创建 Markdown 文件即可发布文章
  - 支持 Frontmatter 元数据（标题、日期、分类、标签等）
  - 自动生成文章数据到 JSON 文件

- **博客系统**
  - `/blog` - 博客列表页
  - `/blog/[slug]` - 博客详情页
  - 文章卡片展示（支持封面、摘要、标签等）
  - 阅读时间自动计算
  - 响应式设计

- **文章管理**
  - 文章模板（`_template.md`）
  - 文章状态管理（发布/草稿）
  - 精选文章设置
  - 自动生成命令：`npm run generate:articles`

#### 🛠️ 项目展示侧栏

- 在首页右侧添加项目展示侧栏
- 支持展示多个开源项目
- 项目卡片包含：图标、标题、描述、标签、链接
- 响应式布局（移动端侧栏移到底部）

#### 📡 RSS集成

- 支持微信公众号文章聚合（通过 RSSHub）
- 支持掘金、知乎等平台
- 支持任何标准RSS源
- 自动合并本地文章和RSS文章
- 按日期统一排序

#### 📚 完整的文档

- **WRITING.md** - 文章创作完整指南
  - 文章创建流程
  - Frontmatter 元数据说明
  - Markdown 编写规范
  - 文章模板
  - 最佳实践

- **RSS_SETUP.md** - RSS配置完整指南
  - 微信公众号RSS配置（RSSHub/WeRSS）
  - 掘金、知乎等平台配置
  - 多源配置
  - 常见问题解答

- **README.md** - 更新为 v2.5 版本
  - 新功能说明
  - 完整的使用指南
  - 快速开始教程

---

### 🔧 改进优化

#### 页面布局调整

**旧布局（v2.0）：**
```
Hero → AI工具 → 文章
```

**新布局（v2.5）：**
```
Hero → 文章 → AI工具 → 项目侧栏
```

- 文章区域提升，成为重点展示内容
- AI工具区域下移，作为次要内容
- 双栏布局：主内容70% + 侧栏30%

#### 构建流程优化

- 自动生成文章数据
- 构建前自动运行 `generate:articles`
- 同时生成到 `data/` 和 `public/data/` 目录
- 添加文章统计信息生成

#### 命令增强

新增命令：
```bash
npm run generate:articles  # 生成文章数据
```

增强命令：
```bash
npm run build  # 构建前自动生成文章数据
```

---

### 📦 技术更新

#### 依赖更新

- 无新增依赖（所有RSS和Markdown相关依赖已在v2.0中安装）

#### 新增文件

**文档：**
- `WRITING.md` - 文章创作指南
- `RSS_SETUP.md` - RSS配置指南
- `CHANGELOG.md` - 更新日志

**代码：**
- `app/api/articles/route.ts` - 文章API路由
- `app/blog/page.tsx` - 博客列表页
- `app/blog/[slug]/page.tsx` - 博客详情页
- `components/articles/` - 文章相关组件
- `components/projects/` - 项目相关组件
- `components/ui/` - UI组件
- `lib/articles.ts` - 文章读取工具
- `lib/markdown.ts` - Markdown解析工具
- `lib/rss.ts` - RSS解析工具
- `types/article.ts` - 文章类型定义
- `types/project.ts` - 项目类型定义
- `types/rss.ts` - RSS类型定义
- `config/site.ts` - 站点配置
- `data/projects.ts` - 项目数据
- `data/rss-sources.ts` - RSS源配置
- `scripts/generate-articles-data.js` - 文章数据生成脚本

**内容：**
- `content/articles/_template.md` - 文章模板
- `content/articles/2025-02-04-weibo-blacklist-tool.md` - 示例文章1
- `content/articles/2025-02-05-bilibili-comment-analyzer.md` - 示例文章2

#### 修改的文件

- `package.json`
  - 版本更新：2.0.0 → 2.5.0
  - 新增 `generate:articles` 命令
  - 新增 `postbuild` 钩子
  - 修改 `build` 命令自动生成文章数据

- `app/page.tsx`
  - 调整布局为双栏结构
  - 重新排序内容区域
  - 添加项目侧栏
  - 添加统计信息卡片

---

### 🎯 功能对比

| 功能 | v2.0 | v2.5 |
|------|------|------|
| 文章系统 | 手动维护 | Markdown + 自动生成 ✨ |
| 博客页面 | 无 | `/blog` 和 `/blog/[slug]` ✨ |
| 项目展示 | 无 | 侧栏展示 ✨ |
| RSS集成 | 无 | 支持多平台RSS ✨ |
| 布局结构 | 单栏 | 双栏（70% + 30%） ✨ |
| 文档 | 基础 | 完整的创作和配置指南 ✨ |
| 文章模板 | 无 | `_template.md` ✨ |
| 构建优化 | 基础 | 自动生成文章数据 ✨ |

---

### 📝 使用指南

#### 创建第一篇文章

1. 复制模板：
   ```bash
   cp content/articles/_template.md content/articles/2025-02-05-my-article.md
   ```

2. 编辑文章内容

3. 生成数据：
   ```bash
   npm run generate:articles
   ```

4. 查看效果：
   ```bash
   npm run dev
   ```

#### 配置RSS（可选）

1. 编辑 `data/rss-sources.ts`
2. 启用 `config/site.ts` 中的 `rssIntegration`
3. 重新构建

---

### 🐛 已知问题

- RSS功能默认禁用，需要手动配置后启用
- 微信公众号RSS需要第三方服务（RSSHub或WeRSS）

---

### 🔮 未来计划

- [ ] 添加文章搜索功能
- [ ] 支持文章评论系统
- [ ] 添加文章分享功能
- [ ] 支持更多RSS平台
- [ ] 添加文章访问统计

---

### 🙏 致谢

感谢所有为本项目提供反馈和建议的用户！

---

**完整文档：**
- [README.md](./README.md) - 项目总览
- [WRITING.md](./WRITING.md) - 文章创作指南
- [RSS_SETUP.md](./RSS_SETUP.md) - RSS配置指南
