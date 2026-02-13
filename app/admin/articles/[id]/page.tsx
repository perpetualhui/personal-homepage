'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import NovelEditor from '@/components/editor/NovelEditor'
import ArticlePreview from '@/components/admin/ArticlePreview'

interface ArticleFormData {
  title: string
  slug: string
  description: string
  content: string
  cover: string
  category: string
  tags: string
  featured: boolean
  status: 'published' | 'draft'
}

export default function ArticleEditPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState<ArticleFormData>({
    title: '',
    slug: '',
    description: '',
    content: '',
    cover: '',
    category: '未分类',
    tags: '',
    featured: false,
    status: 'draft',
  })
  const [previewMode, setPreviewMode] = useState<'split' | 'editor' | 'preview'>('split')

  // 加载文章数据
  useEffect(() => {
    fetch(`/api/admin/articles/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          ...data,
          tags: data.tags?.join(', ') || '',
        })
        setLoading(false)
      })
      .catch(() => {
        alert('加载失败')
        router.push('/admin/articles')
      })
  }, [id, router])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleContentChange = (content: string) => {
    setFormData((prev) => ({
      ...prev,
      content,
    }))
  }

  const handleSave = async () => {
    setSaving(true)

    const data = {
      ...formData,
      tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean),
    }

    const res = await fetch(`/api/admin/articles/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (res.ok) {
      router.push('/admin/articles')
    } else {
      alert('保存失败')
    }

    setSaving(false)
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex items-center gap-3 text-gray-500">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
          <span>加载中...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen overflow-hidden bg-gray-50">
      {/* 顶部导航栏 */}
      <div className="border-b bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">编辑文章</h1>
            <p className="text-sm text-gray-500">ID: {id}</p>
          </div>

          {/* 视图切换 */}
          <div className="flex items-center gap-2 rounded-lg border p-1">
            <button
              onClick={() => setPreviewMode('split')}
              className={`rounded px-3 py-1.5 text-sm font-medium ${
                previewMode === 'split'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              分屏
            </button>
            <button
              onClick={() => setPreviewMode('editor')}
              className={`rounded px-3 py-1.5 text-sm font-medium ${
                previewMode === 'editor'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              编辑
            </button>
            <button
              onClick={() => setPreviewMode('preview')}
              className={`rounded px-3 py-1.5 text-sm font-medium ${
                previewMode === 'preview'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              预览
            </button>
          </div>

          {/* 操作按钮 */}
          <div className="flex gap-3">
            <button
              onClick={() => router.back()}
              className="rounded-lg border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              取消
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? '保存中...' : '保存修改'}
            </button>
          </div>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="flex h-[calc(100vh-73px)] overflow-hidden">
        {/* 左侧：表单和编辑器 */}
        <div
          className={`overflow-y-auto border-r bg-white ${
            previewMode === 'preview' ? 'hidden' : previewMode === 'split' ? 'w-1/2' : 'w-full'
          }`}
        >
          <div className="p-6">
            {/* 基础信息表单 */}
            <div className="mb-6 space-y-4 rounded-lg border p-6">
              <h2 className="text-lg font-semibold text-gray-900">文章信息</h2>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  标题 *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Slug *
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  描述
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={2}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    分类
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    标签 (逗号分隔)
                  </label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="React, Next.js, TypeScript"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    封面图 URL
                  </label>
                  <input
                    type="url"
                    name="cover"
                    value={formData.cover}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    状态
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="draft">草稿</option>
                    <option value="published">已发布</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  id="featured"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="featured" className="ml-2 text-sm text-gray-700">
                  设为精选文章
                </label>
              </div>
            </div>

            {/* Novel 编辑器 */}
            <NovelEditor
              initialContent={formData.content}
              onChange={handleContentChange}
              onSave={handleSave}
              onAutoSave={async (content) => {
                // 自动保存到 localStorage
                console.log('Auto-saved:', content.substring(0, 50) + '...')
              }}
              articleId={id}
            />
          </div>
        </div>

        {/* 右侧：实时预览 */}
        <div
          className={`bg-gray-100 ${
            previewMode === 'editor' ? 'hidden' : previewMode === 'split' ? 'w-1/2' : 'w-full'
          }`}
        >
          <ArticlePreview
            content={formData.content}
            title={formData.title || '文章标题'}
            cover={formData.cover}
            description={formData.description}
            tags={formData.tags.split(',').map((t) => t.trim()).filter(Boolean)}
            category={formData.category}
          />
        </div>
      </div>
    </div>
  )
}
