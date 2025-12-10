'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold text-gray-900">出错了</h1>
      <p className="mt-4 text-gray-600">
        抱歉，发生了意外错误。
      </p>
      <div className="mt-8 flex space-x-4">
        <button
          onClick={reset}
          className="rounded-md bg-primary-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary-700 transition-colors"
        >
          重试
        </button>
        <Link
          href="/"
          className="rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
        >
          返回首页
        </Link>
      </div>
    </div>
  )
}







