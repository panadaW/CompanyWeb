import { NextResponse } from 'next/server'

// 模拟数据
const mockProducts = [
  {
    id: 'prod-001',
    name: '产品服务一',
    slug: 'product-service-1',
    description: '专业的解决方案，帮助企业提升效率。我们提供全方位的服务支持，确保项目成功交付。',
    shortDescription: '专业的解决方案',
    category: {
      id: 'cat-001',
      name: '解决方案',
    },
    categoryId: 'cat-001',
    images: ['/images/product-1.jpg', '/images/product-1-2.jpg'],
    features: ['特性1：高效快速', '特性2：专业可靠', '特性3：全面支持'],
    specifications: {
      '适用规模': '中小型企业',
      '部署方式': '云端/本地',
      '技术支持': '7x24小时',
    },
    price: 9999,
    priceUnit: '元',
    status: 'active' as const,
    tags: ['标签1', '标签2'],
    relatedProducts: [
      {
        id: 'prod-002',
        name: '产品服务二',
        slug: 'product-service-2',
      },
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'prod-002',
    name: '产品服务二',
    slug: 'product-service-2',
    description: '创新的技术方案，助力企业数字化转型',
    shortDescription: '创新的技术方案',
    category: {
      id: 'cat-002',
      name: '技术服务',
    },
    categoryId: 'cat-002',
    images: ['/images/product-2.jpg'],
    features: ['特性1', '特性2'],
    status: 'active' as const,
    tags: ['标签1'],
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z',
  },
]

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    // 查找产品（支持 ID 或 slug）
    const product = mockProducts.find(
      (p) => p.id === id || p.slug === id
    )

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: '产品不存在',
          },
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: product,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: '获取产品详情失败',
        },
      },
      { status: 500 }
    )
  }
}


