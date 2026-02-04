// data/projects.ts
import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    id: 'weibo-blacklist-manager',
    title: '微博黑名单管理工具',
    description: '强大的微博黑名单管理工具，支持导出黑名单、一键拉黑和批量拉黑功能，帮助你轻松管理社交环境。',
    icon: '🛡️',
    tags: ['Python', 'Selenium', '自动化', '社交媒体'],
    links: {
      github: 'https://github.com/yourusername/weibo-blacklist-manager',
      docs: '/docs/weibo-tool.md'
    },
    featured: true,
    status: 'active'
  },
  {
    id: 'bilibili-comment-analyzer',
    title: 'B站评论区热词分析工具',
    description: '自动抓取B站视频评论，进行关键词统计、情感分析，并生成可视化HTML报告。',
    icon: '📊',
    tags: ['Python', 'Jieba', 'SnowNLP', '数据分析', 'NLP'],
    links: {
      github: 'https://github.com/yourusername/bilibili-comment-analyzer',
      demo: './demo/bilibili-analysis.html'
    },
    featured: true,
    status: 'active'
  },
  {
    id: 'bilibili-monitor',
    title: 'B站UP主和热门榜单监控',
    description: '自动监控你关注的B站UP主和热门榜单，通过飞书机器人和邮件第一时间接收更新通知。',
    icon: '📡',
    tags: ['Python', 'Requests', '飞书机器人', '监控'],
    links: {
      github: 'https://github.com/yourusername/bilibili-monitor',
      docs: '/docs/bilibili-monitor.md'
    },
    featured: true,
    status: 'active'
  }
];
