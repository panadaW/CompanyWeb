import { NextResponse } from 'next/server'

// 模拟数据
const mockNews = [
  {
    id: 'news-001',
    title: '公司最新动态标题一',
    slug: 'company-news-1',
    excerpt: '这里是新闻摘要内容，展示最新的公司动态和行业资讯...',
    coverImage: '/images/news-1.jpg',
    category: '公司新闻',
    categoryId: 'cat-news-001',
    author: '张三',
    authorId: 'author-001',
    tags: ['公司动态', '行业资讯'],
    views: 1234,
    publishedAt: '2024-01-15T10:00:00Z',
    createdAt: '2024-01-15T09:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'news-002',
    title: '公司最新动态标题二',
    slug: 'company-news-2',
    excerpt: '这里是新闻摘要内容，展示最新的公司动态和行业资讯...',
    coverImage: '/images/news-2.jpg',
    category: '行业资讯',
    categoryId: 'cat-news-002',
    author: '李四',
    authorId: 'author-002',
    tags: ['行业资讯', '技术趋势'],
    views: 856,
    publishedAt: '2024-01-10T10:00:00Z',
    createdAt: '2024-01-10T09:00:00Z',
    updatedAt: '2024-01-10T10:00:00Z',
  },
  {
    id: 'news-003',
    title: '公司最新动态标题三',
    slug: 'company-news-3',
    excerpt: '这里是新闻摘要内容，展示最新的公司动态和行业资讯...',
    coverImage: '/images/news-3.jpg',
    category: '产品更新',
    categoryId: 'cat-news-003',
    author: '王五',
    authorId: 'author-003',
    tags: ['产品更新', '新功能'],
    views: 567,
    publishedAt: '2024-01-05T10:00:00Z',
    createdAt: '2024-01-05T09:00:00Z',
    updatedAt: '2024-01-05T10:00:00Z',
  },
]

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const category = searchParams.get('category')
    const tags = searchParams.get('tags')
    const search = searchParams.get('search')
    const year = searchParams.get('year')
    const month = searchParams.get('month')
    const sort = searchParams.get('sort') || 'publishedAt:desc'

    // 过滤新闻
    let filteredNews = [...mockNews]

    // 按分类筛选
    if (category) {
      filteredNews = filteredNews.filter(
        (n) => n.category === category || n.categoryId === category
      )
    }

    // 搜索
    if (search) {
      const searchLower = search.toLowerCase()
      filteredNews = filteredNews.filter(
        (n) =>
          n.title.toLowerCase().includes(searchLower) ||
          n.excerpt.toLowerCase().includes(searchLower) ||
          n.tags.some((tag) => tag.toLowerCase().includes(searchLower))
      )
    }

    // 按标签筛选
    if (tags) {
      const tagList = tags.split(',').map((t) => t.trim())
      filteredNews = filteredNews.filter((n) =>
        tagList.some((tag) => n.tags.includes(tag))
      )
    }

    // 按年份筛选
    if (year) {
      filteredNews = filteredNews.filter((n) => {
        const date = new Date(n.publishedAt)
        return date.getFullYear() === parseInt(year)
      })
    }

    // 按月份筛选
    if (month) {
      filteredNews = filteredNews.filter((n) => {
        const date = new Date(n.publishedAt)
        return date.getMonth() + 1 === parseInt(month)
      })
    }

    // 排序
    const [sortField, sortOrder] = sort.split(':')
    filteredNews.sort((a, b) => {
      const aValue = a[sortField as keyof typeof a]
      const bValue = b[sortField as keyof typeof b]

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1
      return 0
    })

    // 分页
    const total = filteredNews.length
    const totalPages = Math.ceil(total / limit)
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const items = filteredNews.slice(startIndex, endIndex)

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
          message: '获取新闻列表失败',
        },
      },
      { status: 500 }
    )
  }
}







