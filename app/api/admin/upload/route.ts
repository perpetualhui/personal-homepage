import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import { put } from '@vercel/blob'

// 允许的文件类型
const ALLOWED_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

// 最大文件大小（10MB）
const MAX_SIZE = 10 * 1024 * 1024

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: '未登录' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const folder = formData.get('folder') as string || 'root'
    const articleId = formData.get('articleId') as string | null

    if (!file) {
      return NextResponse.json({ error: '未找到文件' }, { status: 400 })
    }

    // 验证文件类型
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: `不支持的文件类型：${file.type}` },
        { status: 400 }
      )
    }

    // 验证文件大小
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: `文件过大（最大 10MB）：${(file.size / 1024 / 1024).toFixed(2)}MB` },
        { status: 400 }
      )
    }

    // 读取文件内容
    const fileBuffer = Buffer.from(await file.arrayBuffer())

    // 提取图片尺寸（如果是图片）
    let width: number | undefined
    let height: number | undefined
    if (file.type.startsWith('image/')) {
      try {
        // 简单的尺寸检测（对于生产环境，建议使用 sharp）
        // 这里暂时返回 undefined，后续可以集成 sharp
      } catch (error) {
        console.error('Failed to extract image dimensions:', error)
      }
    }

    // 上传到 Vercel Blob
    const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
    const blob = await put(filename, fileBuffer, {
      access: 'public',
    })

    // 保存到数据库
    const media = await prisma.media.create({
      data: {
        filename,
        originalName: file.name,
        mimeType: file.type,
        size: file.size,
        width,
        height,
        url: blob.url,
        blobUrl: blob.url,
        category: file.type.split('/')[0] || 'other',
        folder,
        articleId: articleId || undefined,
      },
    })

    return NextResponse.json(media, { status: 201 })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '上传失败' },
      { status: 500 }
    )
  }
}
