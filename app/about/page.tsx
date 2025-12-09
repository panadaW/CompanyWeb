import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '关于我们',
  description: '了解我们的公司简介、发展历程、企业文化和团队',
}

export default function AboutPage() {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            关于我们
          </h1>
          <div className="mt-8 space-y-6 text-lg text-gray-600">
            <p>
              我们是一家专业的公司，致力于为客户提供优质的产品和服务。
              自成立以来，我们始终坚持以客户为中心，不断创新，追求卓越。
            </p>
            <p>
              我们的团队由经验丰富的专业人士组成，拥有深厚的行业知识和
              技术实力。我们相信，通过专业、创新和协作，可以为客户创造
              更大的价值。
            </p>
            <p>
              未来，我们将继续秉承"专业、创新、协作、共赢"的理念，与客户
              共同成长，共创美好未来。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}


