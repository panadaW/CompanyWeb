import { NextResponse } from 'next/server'

// 模拟数据（实际应该从数据库获取）
const mockProducts = [
  {
    id: 'prod-001',
    name: '产品服务一',
    slug: 'product-service-1',
    description: '专业的解决方案，帮助企业提升效率',
    shortDescription: '专业的解决方案',
    category: '解决方案',
    categoryId: 'cat-001',
    images: ['/images/product-1.jpg'],
    features: ['特性1', '特性2', '特性3'],
    specifications: {
      '规格1': '值1',
      '规格2': '值2',
    },
    price: 9999,
    priceUnit: '元',
    status: 'active' as const,
    tags: ['标签1', '标签2'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'prod-002',
    name: '产品服务二',
    slug: 'product-service-2',
    description: '创新的技术方案，助力企业数字化转型',
    shortDescription: '创新的技术方案',
    category: '技术服务',
    categoryId: 'cat-002',
    images: ['/images/product-2.jpg'],
    features: ['特性1', '特性2'],
    status: 'active' as const,
    tags: ['标签1'],
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z',
  },
  {
    id: 'prod-003',
    name: '产品服务三',
    slug: 'product-service-3',
    description: '全面的服务支持，确保项目成功交付',
    shortDescription: '全面的服务支持',
    category: '服务支持',
    categoryId: 'cat-003',
    images: ['/images/product-3.jpg'],
    features: ['特性1', '特性2', '特性3', '特性4'],
    status: 'active' as const,
    tags: ['标签1', '标签2', '标签3'],
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-12T00:00:00Z',
  },
]

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const category = searchParams.get('category')
    const categoryId = searchParams.get('categoryId')
    const search = searchParams.get('search')
    const tags = searchParams.get('tags')
    const status = searchParams.get('status') || 'active'
    const sort = searchParams.get('sort') || 'createdAt:desc'

    // 过滤产品
    let filteredProducts = [...mockProducts]

    // 按状态筛选
    if (status) {
      filteredProducts = filteredProducts.filter(
        (p) => p.status === status
      )
    }

    // 按分类筛选
    if (categoryId) {
      filteredProducts = filteredProducts.filter(
        (p) => p.categoryId === categoryId
      )
    } else if (category) {
      filteredProducts = filteredProducts.filter(
        (p) => p.category === category || p.slug === category
      )
    }

    // 搜索
    if (search) {
      const searchLower = search.toLowerCase()
      filteredProducts = filteredProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower) ||
          p.tags.some((tag) => tag.toLowerCase().includes(searchLower))
      )
    }

    // 按标签筛选
    if (tags) {
      const tagList = tags.split(',').map((t) => t.trim())
      filteredProducts = filteredProducts.filter((p) =>
        tagList.some((tag) => p.tags.includes(tag))
      )
    }

    // 排序
    const [sortField, sortOrder] = sort.split(':')
    filteredProducts.sort((a, b) => {
      const aValue = a[sortField as keyof typeof a]
      const bValue = b[sortField as keyof typeof b]
      
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1
      return 0
    })

    // 分页
    const total = filteredProducts.length
    const totalPages = Math.ceil(total / limit)
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const items = filteredProducts.slice(startIndex, endIndex)

    return NextResponse.json({
      success: true,
      data: {
        items,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: '获取产品列表失败',
        },
      },
      { status: 500 }
    )
  }
}


