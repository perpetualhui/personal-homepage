import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "灰灰的个人主页",
  description: "AI爱好者 / Vibe Coding学习者",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
