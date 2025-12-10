'use client'

import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const cases = [
  {
    id: '1',
    title: '成功案例一',
    description: '为客户提供专业的解决方案，取得了显著的成果',
    industry: '金融行业',
    results: ['提升效率30%', '降低成本20%', '客户满意度95%'],
  },
  {
    id: '2',
    title: '成功案例二',
    description: '创新的技术方案，助力客户实现数字化转型',
    industry: '制造业',
    results: ['数字化转型完成', '生产效率提升40%', '获得行业认可'],
  },
  {
    id: '3',
    title: '成功案例三',
    description: '全面的服务支持，确保项目成功交付',
    industry: '零售行业',
    results: ['销售额增长50%', '用户体验提升', '市场占有率扩大'],
  },
]

export default function CasesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} className="py-20 bg-secondary-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            成功案例
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            我们为各行业客户提供专业的解决方案，取得了卓越的成果
          </p>
        </motion.div>

        <div className="mx-auto mt-16 max-w-6xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {cases.map((caseItem, index) => (
              <motion.div
                key={caseItem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex flex-col overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-xl"
              >
                <div className="aspect-video w-full overflow-hidden bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">
                    {caseItem.title}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-2">
                    <span className="rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-800">
                      {caseItem.industry}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {caseItem.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    {caseItem.description}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {caseItem.results.map((result, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="mr-2 h-4 w-4 text-primary-600" />
                        {result}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/cases/${caseItem.id}`}
                    className="mt-6 inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    查看详情
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <Link
              href="/cases"
              className="inline-flex items-center rounded-md bg-primary-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary-700 transition-colors"
            >
              查看更多案例
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}





