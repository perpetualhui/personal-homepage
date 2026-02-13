'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkHtml from 'remark-html'

interface ArticlePreviewProps {
  content: string
  title: string
  cover?: string
  description?: string
  tags?: string[]
  category?: string
}

export default function ArticlePreview({
  content,
  title,
  cover,
  description,
  tags = [],
  category = '未分类',
}: ArticlePreviewProps) {
  const [html, setHtml] = useState('')
  const [loading, setLoading] = useState(true)

  // Markdown 转 HTML
  useEffect(() => {
    const render = async () => {
      setLoading(true)
      try {
        const result = await unified()
          .use(remarkParse)
          .use(remarkHtml, { sanitize: false })
          .process(content)

        setHtml(String(result))
      } catch (error) {
        console.error('Preview render error:', error)
      }
      setLoading(false)
    }

    const timer = setTimeout(render, 300) // 防抖 300ms
    return () => clearTimeout(timer)
  }, [content])

  if (loading && !html) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="flex items-center gap-3 text-gray-500">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
          <span>加载预览...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto max-w-3xl px-8 py-6">
        {/* 封面图 */}
        {cover && (
          <div className="mb-6 overflow-hidden rounded-lg">
            <Image
              src={cover}
              alt={title}
              width={1200}
              height={630}
              className="w-full object-cover"
            />
          </div>
        )}

        {/* 文章头部 */}
        <div className="mb-8 border-b pb-6">
          {/* 分类 */}
          <div className="mb-3">
            <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
              {category}
            </span>
          </div>

          {/* 标题 */}
          <h1 className="mb-4 text-3xl font-bold text-gray-900">{title}</h1>

          {/* 描述 */}
          {description && (
            <p className="mb-4 text-lg text-gray-600">{description}</p>
          )}

          {/* 标签 */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* 文章正文 */}
        <div
          className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900 prose-code:text-pink-600 prose-pre:bg-gray-100 prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:text-gray-700"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {/* 底部提示 */}
        <div className="mt-12 border-t pt-6 text-center text-sm text-gray-500">
          此为预览模式，发布后将以实际样式展示
        </div>
      </div>
    </div>
  )
}
