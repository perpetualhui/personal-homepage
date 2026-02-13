'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

interface Media {
  id: string
  filename: string
  originalName: string
  mimeType: string
  size: number
  width?: number
  height?: number
  url: string
  category: string
  folder: string
  createdAt: string
}

interface MediaLibraryProps {
  onSelect?: (media: Media) => void
  multiple?: boolean
  onClose?: () => void
}

export default function MediaLibrary({ onSelect, multiple = false, onClose }: MediaLibraryProps) {
  const [medias, setMedias] = useState<Media[]>([])
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // 加载媒体列表
  const loadMedias = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        ...(categoryFilter !== 'all' && { category: categoryFilter }),
        ...(searchQuery && { search: searchQuery }),
      })

      const response = await fetch(`/api/admin/media?${params}`)
      if (!response.ok) throw new Error('获取媒体列表失败')

      const data = await response.json()
      setMedias(data.medias)
      setTotalPages(data.pagination.totalPages)
    } catch (error) {
      console.error('Failed to load medias:', error)
      alert('获取媒体列表失败')
    } finally {
      setLoading(false)
    }
  }, [page, categoryFilter, searchQuery])

  useEffect(() => {
    loadMedias()
  }, [loadMedias])

  // 文件上传
  const handleUpload = async (files: FileList) => {
    setUploading(true)

    try {
      for (const file of Array.from(files)) {
        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.error || '上传失败')
        }

        const media = await response.json()
        setMedias((prev) => [media, ...prev])
      }
    } catch (error) {
      console.error('Upload failed:', error)
      alert(error instanceof Error ? error.message : '上传失败')
    } finally {
      setUploading(false)
    }
  }

  // 拖拽处理
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await handleUpload(e.dataTransfer.files)
    }
  }

  // 删除媒体
  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这个文件吗？')) return

    try {
      const response = await fetch(`/api/admin/media?id=${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('删除失败')

      setMedias((prev) => prev.filter((m) => m.id !== id))
      selected.delete(id)
    } catch (error) {
      console.error('Delete failed:', error)
      alert('删除失败')
    }
  }

  // 选择媒体
  const handleSelect = (media: Media) => {
    if (multiple) {
      const newSelected = new Set(selected)
      if (newSelected.has(media.id)) {
        newSelected.delete(media.id)
      } else {
        newSelected.add(media.id)
      }
      setSelected(newSelected)
    } else {
      onSelect?.(media)
      onClose?.()
    }
  }

  // 格式化文件大小
  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / 1024 / 1024).toFixed(1) + ' MB'
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="flex h-[80vh] w-full max-w-6xl flex-col rounded-xl bg-white shadow-2xl">
        {/* 头部 */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-900">媒体库</h3>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* 侧边栏 */}
          <div className="w-64 border-r p-4">
            {/* 上传区域 */}
            <div
              className={`mb-6 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors ${
                dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <input
                id="file-upload"
                type="file"
                multiple
                accept="image/*,.pdf,.doc,.docx"
                className="hidden"
                onChange={(e) => e.target.files && handleUpload(e.target.files)}
              />
              <div className="text-4xl mb-2">📁</div>
              <p className="text-center text-sm text-gray-600">
                拖拽文件到这里
                <br />
                或点击上传
              </p>
            </div>

            {/* 分类筛选 */}
            <div>
              <h4 className="mb-2 text-sm font-medium text-gray-900">分类</h4>
              <div className="space-y-1">
                {['全部', '图片', '视频', '文档'].map((cat) => {
                  const value = cat === '全部' ? 'all' : cat === '图片' ? 'image' : cat === '视频' ? 'video' : 'document'
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        setCategoryFilter(value)
                        setPage(1)
                      }}
                      className={`block w-full rounded px-3 py-2 text-left text-sm transition-colors ${
                        categoryFilter === value
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {cat}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 搜索 */}
            <div className="mt-4">
              <input
                type="text"
                placeholder="搜索文件..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setPage(1)
                }}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* 媒体网格 */}
          <div className="flex-1 overflow-y-auto p-6">
            {loading ? (
              <div className="flex h-full items-center justify-center">
                <div className="flex items-center gap-3 text-gray-500">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
                  <span>加载中...</span>
                </div>
              </div>
            ) : medias.length === 0 ? (
              <div className="flex h-full items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="text-6xl mb-4">📭</div>
                  <p className="text-lg font-medium">暂无媒体文件</p>
                  <p className="text-sm">拖拽文件到左侧区域开始上传</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-4">
                {medias.map((media) => (
                  <div
                    key={media.id}
                    className={`group relative cursor-pointer overflow-hidden rounded-lg border-2 transition-all ${
                      selected.has(media.id) ? 'border-blue-500' : 'border-transparent'
                    }`}
                    onClick={() => handleSelect(media)}
                  >
                    {/* 预览图 */}
                    {media.category === 'image' ? (
                      <Image
                        src={media.url}
                        alt={media.originalName}
                        width={200}
                        height={200}
                        className="h-40 w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-40 w-full items-center justify-center bg-gray-100">
                        <span className="text-4xl">
                          {media.category === 'video' ? '🎬' : '📄'}
                        </span>
                      </div>
                    )}

                    {/* 悬停操作 */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center gap-2">
                      <button
                        className="rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-gray-900 hover:bg-gray-100"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleSelect(media)
                        }}
                      >
                        选择
                      </button>
                      <button
                        className="rounded-lg bg-red-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-600"
                        onClick={async (e) => {
                          e.stopPropagation()
                          await handleDelete(media.id)
                        }}
                      >
                        删除
                      </button>
                    </div>

                    {/* 文件信息 */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                      <p className=" truncate text-xs font-medium text-white">{media.originalName}</p>
                      <p className="text-xs text-gray-300">{formatSize(media.size)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 分页 */}
            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="rounded-lg border px-3 py-1 text-sm disabled:opacity-50"
                >
                  上一页
                </button>
                <span className="text-sm text-gray-600">
                  第 {page} / {totalPages} 页
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="rounded-lg border px-3 py-1 text-sm disabled:opacity-50"
                >
                  下一页
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 上传进度 */}
        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="flex items-center gap-3 rounded-lg bg-white px-6 py-4">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
              <span>上传中...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
