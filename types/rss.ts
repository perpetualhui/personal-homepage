// types/rss.ts
export interface RssSource {
  name: string;
  url: string;
  type: 'wechat' | 'juejin' | 'zhihu' | 'other';
  enabled: boolean;
  updateInterval?: number; // 分钟
}

export interface RssArticle {
  title: string;
  link: string;
  pubDate: string;
  content: string;
  contentSnippet: string;
  guid: string;
}
