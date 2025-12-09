import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '案例展示',
  description: '查看我们的成功案例和客户成果',
}

export default function CasesPage() {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            案例展示
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            我们为各行业客户提供专业的解决方案，取得了卓越的成果
          </p>
        </div>
      </div>
    </div>
  )
}


