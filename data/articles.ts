export interface Article {
  id: string
  date: string
  category: string
  title: string
  excerpt: string
  link: string
}

export const articles: Article[] = [
  {
    id: '1',
    date: '2024年1月15日',
    category: 'AI技术',
    title: 'AI时代：程序员如何保持竞争力',
    excerpt: '探讨在AI快速发展的时代，程序员应该如何调整自己的技能树，保持技术竞争力。',
    link: '#'
  },
  {
    id: '2',
    date: '2024年1月10日',
    category: '工具使用',
    title: '我的AI工具使用心得',
    excerpt: '分享我在日常工作和学习中使用各种AI工具的经验和技巧，以及如何提高效率。',
    link: '#'
  },
  {
    id: '3',
    date: '2024年1月5日',
    category: '思考随笔',
    title: '技术之外：关于成长的思考',
    excerpt: '技术只是手段，成长才是目的。在这篇文章中，我想分享一些关于个人成长的思考。',
    link: '#'
  },
  {
    id: '4',
    date: '2023年12月28日',
    category: '行业观察',
    title: '2024年AI发展趋势预测',
    excerpt: '基于当前的技术发展态势，我对2024年AI领域的发展趋势做一些个人预测。',
    link: '#'
  }
]
