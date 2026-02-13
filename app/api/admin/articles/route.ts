import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const articleSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional(),
  content: z.string().min(1),
  cover: z.string().optional(),
  category: z.string().default('未分类'),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  status: z.enum(['published', 'draft']).default('published'),
})

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: '未登录' }, { status: 401 })
  }

  const articles = await prisma.article.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(articles)
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: '未登录' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const validatedData = articleSchema.parse(body)

    const article = await prisma.article.create({
      data: validatedData,
    })

    return NextResponse.json(article, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: '创建失败' }, { status: 500 })
  }
}
