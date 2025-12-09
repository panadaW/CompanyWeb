import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '新闻动态',
  description: '了解我们的最新动态和行业资讯',
}

import Link from 'next/link'
import { ArrowRight, Calendar, Tag } from 'lucide-react'
import { newsItems } from '@/data/news'
import { formatDate } from '@/lib/utils'

export default function NewsPage() {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            新闻动态
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            了解我们的最新动态和行业资讯
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-6">
          {newsItems.map((item) => (
            <article
              key={item.id}
              className="flex flex-col rounded-lg border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <span className="inline-flex items-center gap-1 rounded-full bg-primary-50 px-3 py-1 text-primary-700">
                  <Tag className="h-4 w-4" />
                  {item.category}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(item.date)}
                </span>
                <span className="text-gray-400">·</span>
                <span>{item.author}</span>
              </div>

              <Link href={`/news/${item.slug}`} className="mt-3">
                <h2 className="text-2xl font-semibold text-gray-900 transition hover:text-primary-600">
                  {item.title}
                </h2>
              </Link>

              <p className="mt-3 text-gray-600">{item.excerpt}</p>

              <div className="mt-4">
                <Link
                  href={`/news/${item.slug}`}
                  className="inline-flex items-center text-sm font-semibold text-primary-600 hover:text-primary-700"
                >
                  阅读详情
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

