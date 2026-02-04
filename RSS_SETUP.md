# 📡 RSS 配置指南

> 如何配置微信公众号和其他平台的RSS源，自动聚合文章到个人主页

---

## 📋 目录

1. [什么是RSS](#什么是rss)
2. [支持的平台](#支持的平台)
3. [快速开始](#快速开始)
4. [配置微信公众号RSS](#配置微信公众号rss)
5. [配置其他平台RSS](#配置其他平台rss)
6. [高级配置](#高级配置)
7. [常见问题](#常见问题)

---

## 什么是RSS

RSS（Really Simple Syndication）是一种基于XML的标准，用于订阅网站内容的更新。

**使用RSS的好处：**
- 自动同步其他平台的文章
- 无需手动复制粘贴
- 保持内容更新

---

## 支持的平台

### ✅ 已支持

| 平台 | 状态 | 说明 |
|------|------|------|
| **微信公众号** | ✅ 支持 | 通过RSSHub或WeRSS |
| **掘金** | ✅ 支持 | 原生RSS |
| **知乎** | ✅ 支持 | 通过RSSHub |
| **个人博客** | ✅ 支持 | 标准RSS |

### 🚧 可扩展

- GitHub Releases
- Reddit
- Twitter/X
- 任何提供RSS的网站

---

## 快速开始

### 步骤 1：获取RSS链接

根据平台获取RSS源链接（详见下文）

### 步骤 2：配置RSS源

编辑 `data/rss-sources.ts`：

```typescript
export const rssSources: RssSource[] = [
  {
    name: '我的微信公众号',
    url: 'https://rsshub.app/weixin/mp/YOUR_ACCOUNT_ID',
    type: 'wechat',
    enabled: true,  // 改为 true
    updateInterval: 60
  }
];
```

### 步骤 3：启用RSS功能

编辑 `config/site.ts`：

```typescript
export const siteConfig = {
  features: {
    rssIntegration: true,  // 改为 true
  }
};
```

### 步骤 4：重新构建

```bash
npm run build
```

---

## 配置微信公众号RSS

微信公众号本身不提供公开的RSS，需要使用第三方服务。

### 方案一：使用 RSSHub（推荐）

#### 1. 什么是 RSSHub？

RSSHub 是一个开源的RSS生成器，支持微信公众号、微博、知乎等平台。

**优点：**
- 开源免费
- 支持多平台
- 社区活跃

#### 2. 获取微信公众号账号ID

**方法1：通过新榜查询**
1. 访问 [新榜](https://www.newrank.cn/)
2. 搜索公众号名称
3. 查看账号ID（通常是一串数字）

**方法2：通过微信搜一搜**
1. 在微信中搜索公众号
2. 查看公众号详情页
3. URL中可能包含账号ID

**方法3：通过已关注公众号**
1. 在电脑端微信打开公众号
2. 查看链接中的 `__biz` 参数
3. `__biz` 值就是账号ID

#### 3. 生成RSS链接

RSSHub的微信公众号路由格式：

```
https://rsshub.app/weixin/mp/{账号ID}
```

**示例：**
```
https://rsshub.app/weixin/mp/MzIwNDM2NjkwMw==
```

#### 4. 配置到项目

编辑 `data/rss-sources.ts`：

```typescript
export const rssSources: RssSource[] = [
  {
    name: '我的微信公众号',
    url: 'https://rsshub.app/weixin/mp/MzIwNDM2NjkwMw==',
    type: 'wechat',
    enabled: true,
    updateInterval: 60  // 每60分钟检查一次
  }
];
```

#### 5. 测试RSS链接

在浏览器中访问RSS链接，应该能看到XML格式的数据。

---

### 方案二：使用 WeRSS

#### 1. 注册 WeRSS

访问 [WeRSS](https://werss.app/) 并注册账号。

#### 2. 添加微信公众号

1. 登录后进入控制台
2. 点击"添加公众号"
3. 输入公众号名称或ID
4. 等待验证

#### 3. 获取RSS链接

在WeRSS控制台中，找到添加的公众号，复制RSS链接。

**格式：**
```
https://werss.app/rss/{RSS_ID}
```

#### 4. 配置到项目

```typescript
export const rssSources: RssSource[] = [
  {
    name: '我的微信公众号',
    url: 'https://werss.app/rss/xxx',
    type: 'wechat',
    enabled: true,
    updateInterval: 60
  }
];
```

---

### 方案三：自建 RSSHub（高级）

如果你有服务器，可以自己部署RSSHub：

#### 1. 部署 RSSHub

使用 Docker 部署：

```bash
docker run -d --name rsshub -p 1200:1200 diygod/rsshub
```

#### 2. 访问你的RSSHub

```
http://your-server:1200
```

#### 3. 配置项目

```typescript
export const rssSources = [
  {
    name: '我的微信公众号',
    url: 'http://your-server:1200/weixin/mp/YOUR_ACCOUNT_ID',
    type: 'wechat',
    enabled: true
  }
];
```

---

## 配置其他平台RSS

### 掘金专栏

#### 获取RSS链接

掘金提供原生RSS支持：

```
https://juejin.cn/rss/user/{用户ID}
```

#### 获取用户ID

1. 访问你的掘金主页
2. URL格式：`https://juejin.cn/user/{用户ID}`
3. 复制用户ID

#### 配置示例

```typescript
export const rssSources = [
  {
    name: '我的掘金专栏',
    url: 'https://juejin.cn/rss/user/1234567890',
    type: 'juejin',
    enabled: true,
    updateInterval: 120
  }
];
```

---

### 知乎专栏

#### 通过 RSSHub

```
https://rsshub.app/zhihu/people/{用户ID}/articles
```

#### 获取用户ID

1. 访问知乎个人主页
2. URL格式：`https://www.zhihu.com/people/{用户ID}`
3. 复制用户ID

#### 配置示例

```typescript
export const rssSources = [
  {
    name: '我的知乎专栏',
    url: 'https://rsshub.app/zhihu/people/zhang-san/articles',
    type: 'zhihu',
    enabled: true,
    updateInterval: 120
  }
];
```

---

### 个人博客（标准RSS）

如果你的博客提供RSS（大部分博客系统都支持）：

#### WordPress

```
https://your-blog.com/feed
```

#### Hexo

```
https://your-blog.com/atom.xml
```

#### Hugo

```
https://your-blog.com/index.xml
```

#### 配置示例

```typescript
export const rssSources = [
  {
    name: '我的个人博客',
    url: 'https://your-blog.com/feed',
    type: 'other',
    enabled: true,
    updateInterval: 60
  }
];
```

---

## 高级配置

### 多RSS源配置

可以同时配置多个RSS源：

```typescript
export const rssSources: RssSource[] = [
  {
    name: '我的微信公众号',
    url: 'https://rsshub.app/weixin/mp/xxx',
    type: 'wechat',
    enabled: true,
    updateInterval: 60
  },
  {
    name: '我的掘金专栏',
    url: 'https://juejin.cn/rss/user/xxx',
    type: 'juejin',
    enabled: true,
    updateInterval: 120
  },
  {
    name: '我的知乎专栏',
    url: 'https://rsshub.app/zhihu/people/xxx/articles',
    type: 'zhihu',
    enabled: true,
    updateInterval: 120
  }
];
```

### 更新频率

根据平台更新频率调整 `updateInterval`（分钟）：

| 平台 | 建议频率 |
|------|----------|
| 微信公众号 | 60-120分钟 |
| 掘金 | 30-60分钟 |
| 知乎 | 60-120分钟 |
| 个人博客 | 30-60分钟 |

### 禁用某个源

无需删除配置，只需设置 `enabled: false`：

```typescript
{
  name: '暂时不用的源',
  url: '...',
  enabled: false  // 禁用
}
```

### 自定义文章处理

编辑 `lib/rss.ts` 来自定义RSS文章的处理方式：

```typescript
export async function fetchRssArticles(source: RssSource): Promise<Article[]> {
  const feed = await parser.parseURL(source.url);

  return feed.items.map(item => ({
    // 自定义字段映射
    id: item.guid || item.link || '',
    title: item.title || '',
    // ...
  }));
}
```

---

## 常见问题

### Q1: RSS链接无法访问？

**A:** 检查以下几点：
1. RSS链接是否正确
2. 网络是否正常（部分RSSHub实例可能在国外）
3. 尝试使用自建的RSSHub

### Q2: 文章没有同步过来？

**A:** 可能的原因：
1. RSS源配置错误（`enabled: false`）
2. RSS链接无效
3. 网络问题
4. RSS服务暂时不可用

**解决方法：**
```typescript
// 1. 检查配置
console.log(rssSources);

// 2. 测试RSS链接
// 在浏览器中访问RSS链接

// 3. 查看控制台日志
// 重新构建项目，查看错误信息
```

### Q3: 微信公众号文章显示乱码？

**A:** 通常是编码问题。检查 `lib/rss.ts` 中的字符集设置：

```typescript
const parser = new Parser({
  customFields: {
    item: ['description']
  }
});
```

### Q4: 如何只同步最新N篇文章？

**A:** 修改 `lib/rss.ts`：

```typescript
export async function fetchRssArticles(source: RssSource): Promise<Article[]> {
  const feed = await parser.parseURL(source.url);

  return feed.items
    .slice(0, 10)  // 只取前10篇
    .map(item => ({
      // ...
    }));
}
```

### Q5: RSS更新不及时？

**A:** 可能的原因：
1. `updateInterval` 设置太长
2. RSSHub服务延迟
3. 源平台本身更新慢

**解决方法：**
1. 缩短 `updateInterval`
2. 使用更稳定的RSS实例
3. 使用Next.js的ISR功能：

```typescript
// app/blog/page.tsx
export const revalidate = 3600; // 每小时重新生成
```

### Q6: 如何过滤某些文章？

**A:** 在 `lib/rss.ts` 中添加过滤逻辑：

```typescript
export async function fetchRssArticles(source: RssSource): Promise<Article[]> {
  const feed = await parser.parseURL(source.url);

  return feed.items
    .filter(item => {
      // 过滤掉包含特定关键词的文章
      return !item.title?.includes('广告');
    })
    .map(item => ({
      // ...
    }));
}
```

### Q7: RSS文章和本地文章如何排序？

**A:** 目前按日期排序（最新在前）。修改排序逻辑：

```typescript
// lib/rss.ts
export async function getAllArticles(sources: RssSource[] = []): Promise<Article[]> {
  const localArticles = getPublishedArticles();
  const rssArticles = await getAllRssArticles(sources);

  const allArticles = [...localArticles, ...rssArticles];

  // 按日期排序（最新的在前）
  return allArticles.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}
```

### Q8: 如何设置文章来源标识？

**A:** 文章会自动添加来源标识：

- **本地文章**：蓝色"原创文章"标签
- **微信文章**：绿色"微信公众号"标签
- **其他文章**：灰色"外部文章"标签

自定义样式：

```tsx
{/* components/articles/ArticleCard.tsx */}
{article.source === 'wechat' && (
  <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">
    微信公众号
  </span>
)}
```

---

## 📚 相关资源

- [RSSHub 官方文档](https://docs.rsshub.app/)
- [WeRSS 官网](https://werss.app/)
- [rss-parser 文档](https://www.npmjs.com/package/rss-parser)
- [RSS 规范](https://www.rssboard.org/rss-specification)

---

## 🔧 调试技巧

### 测试RSS链接

```bash
# 使用curl测试
curl "https://rsshub.app/weixin/mp/YOUR_ACCOUNT_ID"

# 或在浏览器中访问
```

### 查看解析结果

```typescript
// lib/rss.ts
export async function fetchRssArticles(source: RssSource) {
  const feed = await parser.parseURL(source.url);

  console.log('RSS Feed:', feed);
  console.log('Items:', feed.items);

  // ...
}
```

### 本地测试RSS集成

```bash
# 1. 生成文章数据
npm run generate:articles

# 2. 启动开发服务器
npm run dev

# 3. 访问 /blog 查看效果
```

---

**祝你配置顺利！** 🎉
