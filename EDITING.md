# ✏️ 内容编辑指南

本文档详细说明如何编辑个人主页的内容。

## 📂 数据文件位置

所有内容都在 `data/` 文件夹中：

```
data/
├── profile.ts    # 个人信息
├── tools.ts      # AI工具列表
└── articles.ts   # 文章列表
```

修改这些文件后，刷新页面即可看到效果！

## 👤 编辑个人信息

**文件**: `data/profile.ts`

### 基本信息修改

```typescript
export const profile: Profile = {
  name: '灰灰',                          // 修改成你的名字
  tagline: 'AI爱好者 / Vibe Coding学习者', // 修改成你的介绍
  avatar: '/avatar.jpg',                 // 头像路径（需要添加到 public/）
```

### 添加/修改特色标签

```typescript
features: [
  '🚀 技术热情',      // 修改或添加标签
  '💡 创新思维',
  '🎯 目标导向',
  '🤝 团队协作'
]
```

可用的 Emoji 图标：
- 🚀 火箭/技术
- 💡 灯泡/创意
- 🎯 目标/专注
- 🤝 握手/合作
- ⚡ 闪电/快速
- 🎨 调色板/设计
- 📚 书本/学习
- 🔧 工具/开发
- 🌟 星星/优秀
- 💪 肌肉/坚持

### 编辑背景故事

```typescript
story: {
  title: '关于我的故事',  // 可以修改标题
  content: [
    '第一段：介绍你的背景...',
    '第二段：你的经历...',
    '第三段：你的热情和目标...',
    // 可以添加更多段落
  ]
}
```

### 设置社交链接

```typescript
social: {
  github: 'https://github.com/perpetualhui',  // 修改成你的 GitHub
  twitter: 'https://twitter.com/yourname',    // 可选
  email: 'mailto:yourname@example.com'        // 修改成你的邮箱
}
```

支持的所有社交链接：
- `github` - GitHub
- `twitter` - Twitter/X
- `email` - 邮箱（使用 `mailto:` 前缀）
- `linkedin` - LinkedIn
- `blog` - 个人博客

## 🤖 编辑AI工具列表

**文件**: `data/tools.ts`

### 添加新工具

```typescript
{
  id: '7',                    // 唯一ID（数字递增）
  icon: '🎨',                // 工具图标（Emoji）
  name: 'Figma',             // 工具名称
  description: '强大的协作设计工具，支持AI辅助设计功能',  // 工具描述
  tags: ['设计', '协作', 'AI']  // 标签数组
}
```

### 修改现有工具

找到对应的工具对象，修改内容：

```typescript
{
  id: '1',
  icon: '🤖',
  name: 'ChatGPT',
  description: '修改后的描述...',  // 修改这里
  tags: ['对话', '写作', '编程', '分析']  // 添加/删除标签
}
```

### 删除工具

直接删除整个工具对象即可。

### 推荐的 AI 工具

你可以添加这些热门工具：

```typescript
// Stable Diffusion
{
  id: '7',
  icon: '🖼️',
  name: 'Stable Diffusion',
  description: '开源的AI图像生成模型，可在本地部署，完全免费',
  tags: ['图像生成', '开源', '本地部署']
}

// Notion AI
{
  id: '8',
  icon: '📝',
  name: 'Notion AI',
  description: '集成在Notion中的AI助手，帮助写作、总结和翻译',
  tags: ['笔记', '写作', '生产力']
}

// GitHub Copilot
{
  id: '9',
  icon: '👨‍💻',
  name: 'GitHub Copilot',
  description: 'AI编程助手，实时提供代码建议和补全',
  tags: ['编程', '开发', 'AI']
}
```

## 📄 编辑文章列表

**文件**: `data/articles.ts`

### 添加新文章

```typescript
{
  id: '5',                                    // 唯一ID
  date: '2024年2月1日',                       // 发布日期
  category: '编程技巧',                        // 文章分类
  title: '如何高效使用TypeScript',             // 文章标题
  excerpt: '分享我在使用TypeScript过程中的技巧...', // 文章摘要
  link: 'https://yourblog.com/post-url'       // 文章链接
}
```

### 文章分类建议

常用分类：
- `AI技术` - AI相关技术
- `工具使用` - 工具使用心得
- `编程技巧` - 编程技巧
- `思考随笔` - 个人思考
- `行业观察` - 行业分析
- `学习笔记` - 学习笔记

### 设置文章链接

#### 1. 外部博客链接

```typescript
link: 'https://yourblog.com/article/2024/how-to-use-typescript'
```

#### 2. GitHub Issue/Discussion

```typescript
link: 'https://github.com/yourusername/blog/discussions/1'
```

#### 3. GitHub Gist

```typescript
link: 'https://gist.github.com/yourusername/gist-id'
```

#### 4. 暂无链接

```typescript
link: '#'  // 点击不会跳转
```

### 文章示例

```typescript
{
  id: '5',
  date: '2024年2月1日',
  category: 'AI技术',
  title: '深入理解Transformer架构',
  excerpt: '从零开始理解Transformer的工作原理，包括自注意力机制、编码器-解码器结构等核心概念。',
  link: 'https://github.com/perpetualhui/blog/discussions/1'
}
```

## 🖼️ 添加头像

### 步骤：

1. 准备你的头像图片（建议正方形，至少 400x400px）
2. 将图片命名为 `avatar.jpg` 或 `avatar.png`
3. 放到 `public/` 文件夹

**位置**: `public/avatar.jpg`

### 修改头像路径

如果使用其他文件名：

```typescript
// data/profile.ts
avatar: '/my-photo.jpg'  // 文件名要和 public/ 中的一致
```

## 🎨 调整样式

虽然所有样式都预配置好了，但如果你想修改：

### 修改主题色

**文件**: `app/globals.css`

找到第 10-17 行：

```css
:root {
  --color-primary: #0071e3;      /* 主题色（苹果蓝） */
  --color-text: #1d1d1f;         /* 文字颜色 */
  --color-text-secondary: #6e6e73;  /* 次要文字颜色 */
}
```

修改这些颜色值即可。

### 修改渐变色

找到 `.gradient-text` 样式：

```css
.gradient-text {
  background: linear-gradient(90deg, #0071e3 0%, #c92a2a 100%);
  /* 可以改成其他渐变色，比如： */
  /* background: linear-gradient(90deg, #10b981 0%, #3b82f6 100%); */
}
```

### 调整字体大小

修改标题大小：

```css
.hero-title {
  font-size: 56px;  /* 改成其他值，如 48px 或 64px */
}
```

## 🔄 修改后查看效果

### 开发模式

```bash
npm run dev
```

修改文件后，刷新浏览器即可看到效果（支持热重载）。

### 生产构建测试

```bash
npm run build
npm start
```

## ✅ 编辑检查清单

修改完内容后，检查：

- [ ] 个人信息已正确填写
- [ ] 头像已添加到 `public/avatar.jpg`
- [ ] AI工具列表已更新
- [ ] 文章列表已添加
- [ ] 所有链接都有效
- [ ] 本地运行 `npm run dev` 查看效果
- [ ] 运行 `npm run build` 确保没有错误

## 💡 编辑技巧

### 1. 保持简洁

- 标题不要太长
- 描述要简明扼要
- 标签 3-5 个为宜

### 2. 使用 Markdown 编辑器

推荐使用支持 TypeScript 的编辑器：
- VS Code
- WebStorm
- Cursor

### 3. 备份原文件

修改前先备份：

```bash
cp data/profile.ts data/profile.ts.backup
```

### 4. 版本控制

```bash
git add data/
git commit -m "更新个人信息和工具列表"
```

## 🆘 常见问题

### Q: 修改后页面没变化？

**A:**
1. 确保保存了文件
2. 刷新浏览器（Ctrl+F5）
3. 如果是开发模式，重启 `npm run dev`

### Q: TypeScript 报错？

**A:**
1. 检查语法是否正确
2. 确保字符串用单引号或双引号
3. 数组和对象用逗号分隔

### Q: 如何添加更多文章？

**A:** 复制一个文章对象，修改内容，确保 `id` 唯一。

### Q: 可以添加其他社交链接吗？

**A:** 可以！在 `data/profile.ts` 的 `social` 中添加，然后在 `app/page.tsx` 中显示。

## 📝 编辑示例

### 完整的个人信息示例

```typescript
export const profile: Profile = {
  name: '张三',
  tagline: '全栈开发者 / AI爱好者 / 开源贡献者',
  avatar: '/avatar.jpg',
  features: [
    '⚡ 全栈开发',
    '🤖 AI研究',
    '🌍 开源社区',
    '📖 技术写作'
  ],
  story: {
    title: '我的技术之路',
    content: [
      '我是一名拥有5年经验的全栈开发者，专注于Web开发和AI应用。',
      '大学期间开始接触编程，从Python到JavaScript，从前端到后端，不断探索和学习。',
      '现在主要从事AI工具化的工作，致力于让AI更好地服务人类。',
      '业余时间我喜欢写技术博客、参与开源项目，欢迎交流！'
    ]
  },
  social: {
    github: 'https://github.com/zhangsan',
    twitter: 'https://twitter.com/zhangsan',
    email: 'mailto:zhangsan@example.com'
  }
}
```

---

**祝编辑愉快！** ✨

修改完成后，记得运行 `npm run build` 测试构建，然后就可以部署了！
