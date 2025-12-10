'use client'

import Link from 'next/link'
import { Calendar, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { formatDate } from '@/lib/utils'

const news = [
  {
    id: '1',
    title: '公司最新动态标题一',
    excerpt: '这里是新闻摘要内容，展示最新的公司动态和行业资讯...',
    date: new Date('2024-01-15'),
    category: '公司新闻',
  },
  {
    id: '2',
    title: '公司最新动态标题二',
    excerpt: '这里是新闻摘要内容，展示最新的公司动态和行业资讯...',
    date: new Date('2024-01-10'),
    category: '行业资讯',
  },
  {
    id: '3',
    title: '公司最新动态标题三',
    excerpt: '这里是新闻摘要内容，展示最新的公司动态和行业资讯...',
    date: new Date('2024-01-05'),
    category: '产品更新',
  },
]

export default function NewsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            最新动态
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            了解我们的最新动态和行业资讯
          </p>
        </motion.div>

        <div className="mx-auto mt-16 max-w-6xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {news.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex flex-col overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-xl"
              >
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span className="rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-800">
                      {item.category}
                    </span>
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      {formatDate(item.date)}
                    </div>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-gray-600">
                    {item.excerpt}
                  </p>
                  <Link
                    href={`/news/${item.id}`}
                    className="mt-4 inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    阅读更多
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <Link
              href="/news"
              className="inline-flex items-center rounded-md bg-primary-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary-700 transition-colors"
            >
              查看更多动态
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}







