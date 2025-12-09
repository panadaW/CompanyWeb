import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <h1 className="text-6xl font-bold text-gray-900">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-gray-700">页面未找到</h2>
      <p className="mt-2 text-gray-600">
        抱歉，您访问的页面不存在。
      </p>
      <Link
        href="/"
        className="mt-8 rounded-md bg-primary-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary-700 transition-colors"
      >
        返回首页
      </Link>
    </div>
  )
}


