import Link from 'next/link'
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react'
import { navItems, siteConfig } from '@/lib/constants'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-secondary-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded bg-primary-600"></div>
              <span className="text-xl font-bold">公司名称</span>
            </div>
            <p className="text-sm text-secondary-600">
              专业的公司官网，展示我们的产品、服务、案例和最新动态
            </p>
            <div className="flex space-x-4">
              <a
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-600 hover:text-primary-600 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-600 hover:text-primary-600 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-600 hover:text-primary-600 transition-colors"
                aria-label="GitHub"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">快速链接</h3>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-secondary-600 hover:text-primary-600 transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">产品服务</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/products"
                  className="text-sm text-secondary-600 hover:text-primary-600 transition-colors"
                >
                  产品列表
                </Link>
              </li>
              <li>
                <Link
                  href="/cases"
                  className="text-sm text-secondary-600 hover:text-primary-600 transition-colors"
                >
                  成功案例
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="text-sm text-secondary-600 hover:text-primary-600 transition-colors"
                >
                  最新动态
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">联系方式</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-secondary-600 mt-0.5" />
                <span className="text-sm text-secondary-600">
                  北京市朝阳区xxx街道xxx号
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-secondary-600" />
                <a
                  href="tel:+8613800138000"
                  className="text-sm text-secondary-600 hover:text-primary-600 transition-colors"
                >
                  138-0013-8000
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-secondary-600" />
                <a
                  href="mailto:contact@company.com"
                  className="text-sm text-secondary-600 hover:text-primary-600 transition-colors"
                >
                  contact@company.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-secondary-600">
          <p>© {currentYear} 公司名称. 保留所有权利.</p>
        </div>
      </div>
    </footer>
  )
}


