import { NextResponse } from 'next/server'

// 模拟数据
const mockProducts = [
  {
    id: 'prod-001',
    name: '产品服务一',
    slug: 'product-service-1',
    description: '专业的解决方案',
    category: '解决方案',
    tags: ['标签1', '标签2'],
  },
]

const mockNews = [
  {
    id: 'news-001',
    title: '公司最新动态标题一',
    slug: 'company-news-1',
    excerpt: '这里是新闻摘要内容',
    category: '公司新闻',
    tags: ['公司动态'],
  },
]

const mockCases = [
  {
    id: 'case-001',
    title: '成功案例一',
    slug: 'success-case-1',
    description: '为客户提供专业的解决方案',
    industry: '金融行业',
    tags: ['金融'],
  },
]

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    const q = searchParams.get('q')
    const type = searchParams.get('type') || 'all'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    if (!q || q.trim() === '') {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_PARAMS',
            message: '搜索关键词不能为空',
          },
        },
        { status: 400 }
      )
    }

    const query = q.toLowerCase().trim()
    const results: {
      products: { items: unknown[]; total: number }
      news: { items: unknown[]; total: number }
      cases: { items: unknown[]; total: number }
    } = {
      products: { items: [], total: 0 },
      news: { items: [], total: 0 },
      cases: { items: [], total: 0 },
    }

    // 搜索产品
    if (type === 'all' || type === 'product') {
      const productResults = mockProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.tags.some((tag) => tag.toLowerCase().includes(query))
      )
      results.products = {
        items: productResults.slice((page - 1) * limit, page * limit),
        total: productResults.length,
      }
    }

    // 搜索新闻
    if (type === 'all' || type === 'news') {
      const newsResults = mockNews.filter(
        (n) =>
          n.title.toLowerCase().includes(query) ||
          n.excerpt.toLowerCase().includes(query) ||
          n.tags.some((tag) => tag.toLowerCase().includes(query))
      )
      results.news = {
        items: newsResults.slice((page - 1) * limit, page * limit),
        total: newsResults.length,
      }
    }

    // 搜索案例
    if (type === 'all' || type === 'case') {
      const caseResults = mockCases.filter(
        (c) =>
          c.title.toLowerCase().includes(query) ||
          c.description.toLowerCase().includes(query) ||
          c.tags.some((tag) => tag.toLowerCase().includes(query))
      )
      results.cases = {
        items: caseResults.slice((page - 1) * limit, page * limit),
        total: caseResults.length,
      }
    }

    const total =
      results.products.total + results.news.total + results.cases.total

    return NextResponse.json({
      success: true,
      data: {
        query: q,
        results,
        total,
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: '搜索失败',
        },
      },
      { status: 500 }
    )
  }
}


