import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function AdminDashboard() {
  const [articleCount, projectCount, publishedCount, draftCount] = await Promise.all([
    prisma.article.count(),
    prisma.project.count(),
    prisma.article.count({ where: { status: 'published' } }),
    prisma.article.count({ where: { status: 'draft' } }),
  ])

  const stats = [
    { label: '文章总数', value: articleCount, icon: '📝', color: 'bg-blue-500' },
    { label: '已发布', value: publishedCount, icon: '✅', color: 'bg-green-500' },
    { label: '草稿', value: draftCount, icon: '📋', color: 'bg-yellow-500' },
    { label: '项目数', value: projectCount, icon: '🛠️', color: 'bg-purple-500' },
  ]

  const quickActions = [
    { label: '新建文章', href: '/admin/articles/new', icon: '➕' },
    { label: '管理项目', href: '/admin/projects', icon: '📂' },
    { label: '编辑简介', href: '/admin/profile', icon: '👤' },
    { label: '查看网站', href: '/', icon: '🌐' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">仪表盘</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <span className="text-2xl">{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-lg font-semibold text-gray-900 mb-4">快捷操作</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="flex items-center justify-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <span className="text-2xl mr-2">{action.icon}</span>
            <span className="text-gray-700 font-medium">{action.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
