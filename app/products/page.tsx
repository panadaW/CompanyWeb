import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '产品服务',
  description: '了解我们的产品和服务，找到适合您的解决方案',
}

export default function ProductsPage() {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            产品与服务
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            我们提供全方位的产品和服务，满足不同客户的需求
          </p>
        </div>
      </div>
    </div>
  )
}





