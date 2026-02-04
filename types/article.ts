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

export interface ArticleFrontmatter {
  title: string;
  date: string;
  category: string;
  tags: string[];
  description: string;
  cover?: string;
  author?: string;
  featured?: boolean;
  status?: 'published' | 'draft';
}
