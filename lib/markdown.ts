// lib/markdown.ts
import { ArticleFrontmatter } from '@/types/article';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

export async function parseMarkdown(content: string) {
  const { data, content: markdownContent } = matter(content);

  const processedContent = await remark()
    .use(remarkHtml)
    .process(markdownContent);

  return {
    frontmatter: data as ArticleFrontmatter,
    content: processedContent.toString()
  };
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}
