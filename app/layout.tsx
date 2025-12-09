import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: {
    default: '公司官网 | 专业的企业服务提供商',
    template: '%s | 公司官网',
  },
  description: '专业的公司官网，展示我们的产品、服务、案例和最新动态',
  keywords: ['公司官网', '企业服务', '产品展示', '案例'],
  authors: [{ name: 'Company Name' }],
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://yourcompany.com',
    siteName: '公司官网',
    title: '公司官网 | 专业的企业服务提供商',
    description: '专业的公司官网，展示我们的产品、服务、案例和最新动态',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className={inter.variable}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}


