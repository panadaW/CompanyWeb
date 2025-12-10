'use client'

import { Shield, Zap, Users, Award } from 'lucide-react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const features = [
  {
    name: '专业可靠',
    description: '拥有多年的行业经验，为客户提供专业可靠的服务',
    icon: Shield,
  },
  {
    name: '高效快速',
    description: '采用先进的技术方案，确保项目高效快速交付',
    icon: Zap,
  },
  {
    name: '团队协作',
    description: '专业的团队，紧密协作，确保项目质量',
    icon: Users,
  },
  {
    name: '品质保证',
    description: '严格的质量控制体系，确保产品和服务品质',
    icon: Award,
  },
]

export default function FeaturesSection() {
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
            我们的优势
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            为什么选择我们？因为我们专注于为客户创造价值
          </p>
        </motion.div>

        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-lg bg-primary-600">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-gray-900">
                  {feature.name}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}





