'use client'

import { useState, useEffect, useCallback } from 'react'
import { Editor } from 'novel'
import MediaLibrary from '@/components/admin/MediaLibrary'

interface NovelEditorProps {
  initialContent?: string
  onChange?: (content: string) => void
  onSave?: (content: string) => void
  onAutoSave?: (content: string) => void
  articleId?: string
  readonly?: boolean
  editorRef?: React.RefObject<any>
}

export default function NovelEditor({
  initialContent = '',
  onChange,
  onSave,
  onAutoSave,
  articleId,
  readonly = false,
  editorRef,
}: NovelEditorProps) {
  const [content, setContent] = useState(initialContent)
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved')
  const [showMediaLibrary, setShowMediaLibrary] = useState(false)
  const [editorInstance, setEditorInstance] = useState<any>(null)

  // 自动保存逻辑（2秒防抖）
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (content !== initialContent && content !== '') {
        setSaveStatus('saving')
        try {
          await onAutoSave?.(content)
          setSaveStatus('saved')
        } catch (error) {
          console.error('Auto-save failed:', error)
          setSaveStatus('unsaved')
        }
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [content, initialContent, onAutoSave])

  // 本地存储备份
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('article-draft', content)
    }
  }, [content])

  // 加载本地备份
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const draft = localStorage.getItem('article-draft')
      if (draft && draft !== initialContent && !content) {
        const shouldRestore = confirm('检测到未保存的草稿，是否恢复？')
        if (shouldRestore) {
          setContent(draft)
        } else {
          localStorage.removeItem('article-draft')
        }
      }
    }
  }, [])

  // 图片上传处理
  const handleImageUpload = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    if (articleId) {
      formData.append('articleId', articleId)
    }

    const response = await fetch('/api/admin/upload', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || '上传失败')
    }

    const media = await response.json()
    return media.url
  }

  // 手动保存
  const handleSave = async () => {
    setSaveStatus('saving')
    try {
      await onSave?.(content)
      setSaveStatus('saved')
      // 清除本地备份
      if (typeof window !== 'undefined') {
        localStorage.removeItem('article-draft')
      }
    } catch (error) {
      console.error('Save failed:', error)
      setSaveStatus('unsaved')
    }
  }

  // 快捷键支持
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + S 保存
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        handleSave()
      }
      // Ctrl/Cmd + M 媒体库
      if ((e.ctrlKey || e.metaKey) && e.key === 'm') {
        e.preventDefault()
        setShowMediaLibrary(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [content])

  // 暴露编辑器实例
  useEffect(() => {
    if (editorRef && typeof editorRef === 'object' && 'current' in editorRef) {
      ;(editorRef as any).current = editorInstance
    }
  }, [editorInstance, editorRef])

  return (
    <div className="relative">
      {/* 顶部工具栏 */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white/95 px-4 py-2 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">编辑器</span>
          <button
            onClick={() => setShowMediaLibrary(true)}
            disabled={readonly}
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            title="打开媒体库"
          >
            🖼️ 图片
          </button>
        </div>

        <div className="flex items-center gap-3">
          {/* 保存状态指示器 */}
          <span
            className={`text-sm ${
              saveStatus === 'saved'
                ? 'text-green-600'
                : saveStatus === 'saving'
                ? 'text-yellow-600'
                : 'text-gray-600'
            }`}
          >
            {saveStatus === 'saved' ? '✓ 已保存' : saveStatus === 'saving' ? '保存中...' : '未保存'}
          </span>

          {/* 手动保存按钮 */}
          <button
            onClick={handleSave}
            disabled={readonly}
            className="rounded-md bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            保存
          </button>
        </div>
      </div>

      {/* Novel 编辑器 */}
      <div className="prose prose-sm max-w-none">
        <Editor
          defaultValue={content}
          disabled={readonly}
          onCreateEditor={(editor) => {
            setEditorInstance(editor)
          }}
          onUpdate={(editor) => {
            const newContent = editor?.getHTML() || ''
            setContent(newContent)
            onChange?.(newContent)
          }}
          slug="article-editor"
          editorProps={{
            attributes: {
              class: 'prose prose-sm max-w-none focus:outline-none min-h-[500px] px-8 py-6',
            },
          }}
          // 图片上传（Novel 会自动处理拖拽和粘贴）
          uploadImage={handleImageUpload}
        />
      </div>

      {/* 快捷键提示 */}
      <div className="border-t px-4 py-2 text-xs text-gray-500">
        <span className="font-medium">快捷键：</span>
        <kbd className="rounded border px-1">Ctrl</kbd> + <kbd className="rounded border px-1">S</kbd>
        {' '}保存
        {' · '}
        <kbd className="rounded border px-1">Ctrl</kbd> + <kbd className="rounded border px-1">M</kbd>
        {' '}媒体库
        {' · '}图片可直接拖拽或粘贴上传
      </div>

      {/* 媒体库弹窗 */}
      {showMediaLibrary && (
        <MediaLibrary
          onClose={() => setShowMediaLibrary(false)}
          onSelect={(media) => {
            // 插入图片到编辑器
            if (editorInstance) {
              const { fromHTML } = require('@tiptap/core')
              editorInstance
                .chain()
                .focus()
                .insertContent([
                  {
                    type: 'image',
                    attrs: {
                      src: media.url,
                      alt: media.originalName || '',
                    },
                  },
                ])
                .run()
            }
            setShowMediaLibrary(false)
          }}
        />
      )}
    </div>
  )
}
