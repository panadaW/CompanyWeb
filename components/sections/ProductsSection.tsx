'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const products = [
  {
    id: '1',
    name: '产品服务一',
    description: '专业的解决方案，帮助企业提升效率',
    image: '/images/product-1.jpg',
  },
  {
    id: '2',
    name: '产品服务二',
    description: '创新的技术方案，助力企业数字化转型',
    image: '/images/product-2.jpg',
  },
  {
    id: '3',
    name: '产品服务三',
    description: '全面的服务支持，确保项目成功交付',
    image: '/images/product-3.jpg',
  },
]

export default function ProductsSection() {
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
            产品与服务
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            我们提供全方位的产品和服务，满足不同客户的需求
          </p>
        </motion.div>

        <div className="mx-auto mt-16 max-w-6xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-xl"
              >
                <div className="aspect-video w-full overflow-hidden bg-gray-200">
                  <div className="h-full w-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">
                      {product.name}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    {product.description}
                  </p>
                  <Link
                    href={`/products/${product.id}`}
                    className="mt-4 inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    了解更多
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
              href="/products"
              className="inline-flex items-center rounded-md bg-primary-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary-700 transition-colors"
            >
              查看所有产品
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}


