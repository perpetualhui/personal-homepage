# 🚀 快速开始

5分钟让你的个人主页上线！

## 📦 前置要求

- Node.js 18+ 已安装
- GitHub 账号
- Vercel 账号（可用 GitHub 登录）

## ⚡ 快速启动

### 步骤 1：安装依赖（1分钟）

```bash
cd personal-homepage-v2-nextjs
npm install
```

### 步骤 2：添加头像（30秒）

将你的头像照片命名为 `avatar.jpg`，放到 `public/` 文件夹。

### 步骤 3：修改个人信息（2分钟）

编辑 `data/profile.ts`：

```typescript
export const profile: Profile = {
  name: '你的名字',
  tagline: '你的介绍',
  // ...
}
```

### 步骤 4：本地预览（30秒）

```bash
npm run dev
```

打开 http://localhost:3000 查看效果！

### 步骤 5：部署到 Vercel（1分钟）

```bash
# 安装 Vercel CLI
npm install -g vercel

# 登录并部署
vercel login
vercel
```

完成！你的网站已经上线了 🎉

## 🎨 编辑内容

所有内容都在 `data/` 文件夹中：

- `profile.ts` - 个人信息
- `tools.ts` - AI工具列表
- `articles.ts` - 文章列表

修改后刷新页面即可看到效果。

## 📚 详细文档

- **README.md** - 项目介绍和技术栈
- **EDITING.md** - 详细编辑指南
- **DEPLOY.md** - 完整部署教程

## 💡 常用命令

```bash
npm run dev      # 开发模式
npm run build    # 构建生产版本
vercel           # 部署到 Vercel
```

## 🆘 需要帮助？

查看详细文档或提交 Issue！

---

**祝你使用愉快！** ✨
