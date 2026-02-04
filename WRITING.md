# 📝 文章创作指南

> 如何在个人主页上创建和发布文章

---

## 📋 目录

1. [快速开始](#快速开始)
2. [文章文件结构](#文章文件结构)
3. [Frontmatter 元数据](#frontmatter-元数据)
4. [Markdown 编写规范](#markdown-编写规范)
5. [文章模板](#文章模板)
6. [生成和发布](#生成和发布)
7. [最佳实践](#最佳实践)
8. [常见问题](#常见问题)

---

## 快速开始

### 步骤 1：创建文章文件

在 `content/articles/` 目录下创建 Markdown 文件，文件命名格式：

```
YYYY-MM-DD-title.md
```

示例：
```
2025-02-05-my-first-article.md
2025-02-06-how-to-use-python-tools.md
```

### 步骤 2：编写文章

使用以下模板创建文章：

```markdown
---
title: '文章标题'
date: 2025-02-05
category: '技术教程'
tags:
  - Python
  - 自动化
description: '简短描述（1-2句话，用于SEO和分享）'
author: '你的名字'
featured: true
status: 'published'
---

# 文章标题

这里是文章内容...
```

### 步骤 3：生成文章数据

运行命令生成文章数据：

```bash
npm run generate:articles
```

或者直接构建（会自动生成）：

```bash
npm run build
```

### 步骤 4：查看效果

启动开发服务器：

```bash
npm run dev
```

访问 http://localhost:3000 查看首页，http://localhost:3000/blog 查看博客列表。

---

## 文章文件结构

### 目录结构

```
personal-homepage-v2-nextjs/
├── content/
│   └── articles/              # 所有文章存放于此
│       ├── _template.md       # 文章模板
│       ├── 2025-02-04-weibo-blacklist-tool.md
│       ├── 2025-02-05-bilibili-comment-analyzer.md
│       └── YYYY-MM-DD-your-article.md
├── data/
│   └── articles.json          # 自动生成，无需手动编辑
└── scripts/
    └── generate-articles-data.js  # 生成脚本
```

### 文件命名规范

**格式：** `YYYY-MM-DD-title.md`

- **YYYY**：4位年份（如：2025）
- **MM**：2位月份（如：02）
- **DD**：2位日期（如：05）
- **title**：文章标题的英文形式，用连字符分隔

**示例：**
```
✅ 2025-02-05-how-to-use-python.md
✅ 2025-02-05-weibo-blacklist-tool.md
❌ my-article.md
❌ article-2025.md
```

---

## Frontmatter 元数据

每篇文章顶部必须包含 Frontmatter（YAML格式的元数据）：

### 完整示例

```yaml
---
title: '如何使用微博黑名单管理工具'
date: 2025-02-05
category: '工具使用'
tags:
  - Python
  - 社交媒体
  - 自动化
description: '详细介绍如何使用微博黑名单管理工具，包括安装、配置和使用方法'
cover: '/images/article-covers/weibo-tool.jpg'
author: '你的名字'
featured: true
status: 'published'
---
```

### 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| **title** | string | ✅ | 文章标题 |
| **date** | string | ✅ | 发布日期（YYYY-MM-DD） |
| **category** | string | ✅ | 文章分类 |
| **tags** | array | ✅ | 标签列表（至少一个） |
| **description** | string | ✅ | 文章摘要（用于SEO和卡片显示） |
| **cover** | string | ❌ | 封面图片URL |
| **author** | string | ❌ | 作者名称（默认：你的名字） |
| **featured** | boolean | ❌ | 是否在首页展示（默认：false） |
| **status** | string | ❌ | 发布状态：published/draft（默认：published） |

### status 字段详解

- **published**：已发布，会在首页和博客页显示
- **draft**：草稿，不会显示在页面上（但会被生成）

**示例：**
```yaml
---
# 发布文章
status: 'published'

# 草稿文章
status: 'draft'
---
```

### featured 字段详解

设置为 `true` 的文章会优先在首页展示：

```yaml
---
# 在首页展示
featured: true

# 不在首页展示
featured: false
---
```

首页最多显示 6 篇 featured 文章（可在 `config/site.ts` 中修改）。

---

## Markdown 编写规范

### 推荐的编辑工具

1. **VS Code** + 插件（推荐）
   - Markdown Preview Enhanced
   - Markdown All in One

2. **Typora**（付费但体验极佳）

3. **Obsidian**（免费，知识管理工具）

4. **Mark Text**（免费开源）

### 标题层级

```markdown
# 一级标题（文章标题，通常在Frontmatter中定义）

## 二级标题（章节）

### 三级标题（小节）

#### 四级标题（很少使用）
```

### 文本格式

```markdown
**粗体文本**
*斜体文本*
***粗斜体文本***
~~删除线~~
`行内代码`
```

### 列表

**无序列表：**
```markdown
- 项目1
- 项目2
  - 子项目2.1
  - 子项目2.2
- 项目3
```

**有序列表：**
```markdown
1. 第一步
2. 第二步
3. 第三步
```

### 链接和图片

```markdown
[链接文本](https://example.com)

![图片描述](/images/article-covers/example.jpg)
```

### 代码块

**行内代码：**
```markdown
使用 `npm install` 命令安装依赖
```

**代码块（带语法高亮）：**
````markdown
```python
def hello_world():
    print("Hello, World!")
```
````

**支持的语法：**
- python
- javascript / js
- typescript / ts
- bash / shell
- css
- html
- json
- markdown
- 等等...

### 引用

```markdown
> 这是一段引用文本
>
> 可以有多行
```

### 表格

```markdown
| 列1 | 列2 | 列3 |
|-----|-----|-----|
| 内容1 | 内容2 | 内容3 |
| 内容4 | 内容5 | 内容6 |
```

### 分隔线

```markdown
---
```

---

## 文章模板

### 完整文章模板

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

- [参考资料1](https://example.com)
- [参考资料2](https://example.com)
```

### 技术教程模板

```markdown
---
title: '如何使用XXX工具'
date: 2025-02-05
category: '工具使用'
tags:
  - Python
  - 工具
description: '详细介绍XXX工具的使用方法，包括安装、配置和实践案例'
featured: true
status: 'published'
---

# 如何使用XXX工具

## 简介

XXX工具是一个强大的...（简要介绍工具的用途和特点）

## 安装

### 前置要求

- Python 3.8+
- pip

### 安装步骤

\`\`\`bash
pip install xxx-tool
\`\`\`

## 配置

创建配置文件：

\`\`\`bash
xxx-tool init
\`\`\`

编辑配置文件 `config.yaml`：

\`\`\`yaml
option1: value1
option2: value2
\`\`\`

## 使用方法

### 基本用法

\`\`\`bash
xxx-tool run
\`\`\`

### 高级用法

\`\`\`bash
xxx-tool run --option value
\`\`\`

## 实践案例

### 案例1：描述案例

步骤：
1. 第一步
2. 第二步
3. 完成

结果：

\`\`\`
输出结果...
\`\`\`

## 常见问题

### Q: 出现XXX错误怎么办？

A: 解决方案...

### Q: 如何配置XXX？

A: 配置方法...

## 总结

XXX工具是一个强大的工具，通过本文的学习，你应该掌握了...
```

### 项目展示模板

```markdown
---
title: 'XXX项目介绍'
date: 2025-02-05
category: '项目展示'
tags:
  - Python
  - 开源
description: '介绍我开发的XXX项目，包括功能、技术栈和使用方法'
featured: true
status: 'published'
---

# XXX项目介绍

## 项目背景

为什么要开发这个项目...（描述项目背景和动机）

## 功能特性

- 功能1：描述
- 功能2：描述
- 功能3：描述

## 技术栈

- **语言**：Python 3.9
- **框架**：Flask
- **数据库**：SQLite
- **其他**：Requests, BeautifulSoup

## 项目结构

\`\`\`
project/
├── src/
│   ├── main.py
│   └── utils.py
├── tests/
└── README.md
\`\`\`

## 使用方法

### 安装

\`\`\`bash
git clone https://github.com/xxx/project.git
cd project
pip install -r requirements.txt
\`\`\`

### 运行

\`\`\`bash
python src/main.py
\`\`\`

## 演示

（截图或GIF动图展示）

## 未来计划

- [ ] 功能1
- [ ] 功能2
- [ ] 功能3

## 相关链接

- GitHub仓库：[链接]
- 在线演示：[链接]
- 使用文档：[链接]
```

---

## 生成和发布

### 开发环境预览

```bash
# 1. 生成文章数据
npm run generate:articles

# 2. 启动开发服务器
npm run dev
```

访问 http://localhost:3000 预览效果。

### 生产构建

```bash
# 构建会自动生成文章数据
npm run build
```

构建完成后：
- 文章数据生成到 `data/articles.json`
- 静态页面生成到 `.next/` 目录
- 可以部署到 Vercel 等平台

### 部署到 Vercel

```bash
# 安装 Vercel CLI
npm install -g vercel

# 登录
vercel login

# 部署
vercel --prod
```

---

## 最佳实践

### 1. 文章标题

✅ **好的标题：**
- "如何使用Python进行数据分析"
- "微博黑名单管理工具完整教程"
- "2025年前端开发趋势"

❌ **不好的标题：**
- "一篇文章"
- "test"
- "关于XXX的笔记"

### 2. 文章摘要

- 长度控制在 50-150 字
- 包含文章的关键词
- 清晰表达文章的核心内容

**示例：**
```yaml
description: '详细介绍微博黑名单管理工具的安装、配置和使用方法，包括导出黑名单、批量拉黑等实用功能'
```

### 3. 文章分类

建议的分类：
- 技术教程
- 工具使用
- 项目展示
- 学习笔记
- 经验分享
- 思考总结

### 4. 标签使用

- 每篇文章 3-5 个标签
- 标签要具体，不要过于宽泛
- 使用已有的标签，保持一致性

**常用标签：**
```yaml
tags:
  - Python
  - JavaScript
  - React
  - Next.js
  - 自动化
  - 数据分析
  - 工具
  - 教程
```

### 5. 文章结构

- 标题层级清晰
- 段落不宜过长
- 适当使用列表和代码块
- 添加必要的插图

### 6. SEO优化

- 标题包含关键词
- 摘要包含关键词
- 使用语义化的标题
- 图片添加 alt 文本

### 7. 代码示例

- 所有代码都要指定语言
- 代码要有注释
- 提供完整的可运行示例
- 说明依赖和前置条件

---

## 常见问题

### Q1: 修改文章后页面没有更新？

**A:** 需要重新生成文章数据：

```bash
npm run generate:articles
npm run dev
```

### Q2: Frontmatter 格式错误？

**A:** 检查以下几点：
- 前后各有三个连字符 `---`
- 冒号后面要有空格
- 字符串用单引号包裹
- 数组用 `-` 开头

**正确示例：**
```yaml
---
title: '标题'
tags:
  - 标签1
  - 标签2
---
```

### Q3: 图片如何添加？

**A:** 两种方式：

1. **放在 public 目录（推荐）：**
   ```
   public/
   └── images/
       └── article-covers/
           └── weibo-tool.jpg
   ```

   引用：
   ```markdown
   ![图片描述](/images/article-covers/weibo-tool.jpg)
   ```

2. **使用外部链接：**
   ```markdown
   ![图片描述](https://example.com/image.jpg)
   ```

### Q4: 如何设置文章为草稿？

**A:** 在 Frontmatter 中设置：

```yaml
status: 'draft'
```

草稿文章不会显示在页面上，但会被生成到数据文件中。

### Q5: 如何让文章在首页展示？

**A:** 设置 `featured: true`：

```yaml
featured: true
```

首页最多展示 6 篇精选文章。

### Q6: 代码高亮不工作？

**A:** 确保代码块指定了语言：

````markdown
\`\`\`python
def hello():
    print("Hello")
\`\`\`
````

### Q7: 文章日期格式错误？

**A:** 使用 YYYY-MM-DD 格式：

```yaml
# ✅ 正确
date: 2025-02-05

# ❌ 错误
date: 2025/02/05
date: Feb 5, 2025
```

### Q8: 如何删除文章？

**A:** 两种方式：

1. **删除文件：**
   ```bash
   rm content/articles/2025-02-05-article.md
   npm run generate:articles
   ```

2. **设为草稿（推荐）：**
   ```yaml
   status: 'draft'
   ```

---

## 📚 扩展阅读

- [Markdown 基础语法](https://www.markdownguide.org/basic-syntax/)
- [Front Matter 规范](https://jekyllrb.com/docs/front-matter/)
- [Next.js 文档](https://nextjs.org/docs)
- [gray-matter 文档](https://github.com/jonschlinkert/gray-matter)

---

**祝你创作愉快！** 🎉
