import type { Metadata } from 'next'
import ContactForm from '@/components/common/ContactForm'

export const metadata: Metadata = {
  title: '联系我们',
  description: '联系我们，获取更多信息和服务支持',
}

export default function ContactPage() {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              联系我们
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              有任何问题或需求？欢迎与我们联系
            </p>
          </div>
          <div className="mt-12">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}







