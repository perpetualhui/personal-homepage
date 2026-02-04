// config/site.ts
export const siteConfig = {
  version: '2.5.0',
  name: 'Personal Homepage',
  description: '我的个人主页 - 分享技术、思考和创造',

  features: {
    sidebar: true,
    articleSystem: true,
    rssIntegration: false, // RSS功能暂时禁用，配置完成后再启用
  },

  layout: {
    hero: true,
    articles: true,
    tools: true,
    sidebar: true,
  },

  articles: {
    postsPerPage: 10,
    featuredCount: 6,
    readingTime: true,
  },

  author: {
    name: '你的名字',
    avatar: '/avatar.jpg',
    bio: 'AI 爱好者 | 全栈开发者 | 工具创造者',
  }
};
