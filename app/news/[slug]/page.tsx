import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, Tag, User } from 'lucide-react'
import { newsItems } from '@/data/news'
import { formatDate } from '@/lib/utils'

type Params = {
  params: { slug: string }
}

export function generateMetadata({ params }: Params): Metadata {
  const news = newsItems.find((item) => item.slug === params.slug)

  if (!news) {
    return {
      title: '新闻未找到',
    }
  }

  return {
    title: `${news.title} | 新闻动态`,
    description: news.excerpt,
  }
}

// 静态导出需要预生成所有可用的 slug
export function generateStaticParams() {
  return newsItems.map((item) => ({ slug: item.slug }))
}

export default function NewsDetailPage({ params }: Params) {
  const news = newsItems.find((item) => item.slug === params.slug)

  if (!news) {
    return notFound()
  }

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <Link
          href="/news"
          className="inline-flex items-center text-sm text-primary-600 hover:text-primary-700"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          返回新闻列表
        </Link>

        <article className="mx-auto mt-6 max-w-4xl rounded-lg border bg-white p-8 shadow-sm">
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
            <span className="inline-flex items-center gap-1 rounded-full bg-primary-50 px-3 py-1 text-primary-700">
              <Tag className="h-4 w-4" />
              {news.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formatDate(news.date)}
            </span>
            <span className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {news.author}
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            {news.title}
          </h1>

          <p className="mt-4 text-lg text-gray-700">{news.excerpt}</p>

          <div className="prose prose-lg mt-8 max-w-none text-gray-800">
            <p>{news.content}</p>
          </div>
        </article>
      </div>
    </div>
  )
}


