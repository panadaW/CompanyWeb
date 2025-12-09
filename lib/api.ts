/**
 * API 客户端工具函数
 * 封装常用的 API 调用方法
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api'

interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
    details?: unknown
  }
  message?: string
}

interface PaginationParams {
  page?: number
  limit?: number
  sort?: string
}

interface PaginatedResponse<T> {
  items: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

/**
 * 通用 API 请求函数
 */
async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error?.message || '请求失败')
    }

    return data
  } catch (error) {
    return {
      success: false,
      error: {
        code: 'NETWORK_ERROR',
        message: error instanceof Error ? error.message : '网络错误',
      },
    }
  }
}

/**
 * GET 请求
 */
export async function get<T>(
  endpoint: string,
  params?: Record<string, string | number | undefined>
): Promise<ApiResponse<T>> {
  const queryParams = new URLSearchParams()
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, String(value))
      }
    })
  }

  const url = queryParams.toString()
    ? `${endpoint}?${queryParams.toString()}`
    : endpoint

  return apiRequest<T>(url, { method: 'GET' })
}

/**
 * POST 请求
 */
export async function post<T>(
  endpoint: string,
  body?: unknown
): Promise<ApiResponse<T>> {
  return apiRequest<T>(endpoint, {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

/**
 * PUT 请求
 */
export async function put<T>(
  endpoint: string,
  body?: unknown
): Promise<ApiResponse<T>> {
  return apiRequest<T>(endpoint, {
    method: 'PUT',
    body: JSON.stringify(body),
  })
}

/**
 * DELETE 请求
 */
export async function del<T>(
  endpoint: string
): Promise<ApiResponse<T>> {
  return apiRequest<T>(endpoint, { method: 'DELETE' })
}

// ==================== 产品相关 API ====================

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  shortDescription?: string
  category: string
  categoryId: string
  images: string[]
  features: string[]
  specifications?: Record<string, string>
  price?: number
  priceUnit?: string
  status: 'active' | 'inactive'
  tags: string[]
  relatedProducts?: string[]
  createdAt: string
  updatedAt: string
}

export interface ProductListParams extends PaginationParams {
  category?: string
  categoryId?: string
  tags?: string
  search?: string
  status?: 'active' | 'inactive'
}

/**
 * 获取产品列表
 */
export async function getProducts(
  params?: ProductListParams
): Promise<ApiResponse<PaginatedResponse<Product>>> {
  const query: Record<string, string | number | undefined> | undefined = params
    ? {
        page: params.page,
        limit: params.limit,
        sort: params.sort,
        category: params.category,
        categoryId: params.categoryId,
        tags: params.tags,
        search: params.search,
        status: params.status,
      }
    : undefined

  return get<PaginatedResponse<Product>>('/products', query)
}

/**
 * 获取产品详情
 */
export async function getProduct(
  id: string,
  include?: string
): Promise<ApiResponse<Product>> {
  const params = include ? { include } : undefined
  return get<Product>(`/products/${id}`, params)
}

/**
 * 获取产品分类列表
 */
export async function getProductCategories(params?: {
  parentId?: string
  includeProducts?: boolean
}): Promise<ApiResponse<unknown[]>> {
  const query: Record<string, string | number | undefined> | undefined = params
    ? {
        parentId: params.parentId,
        includeProducts:
          params.includeProducts !== undefined
            ? params.includeProducts ? 'true' : 'false'
            : undefined,
      }
    : undefined

  return get<unknown[]>('/products/categories', query)
}

// ==================== 新闻相关 API ====================

export interface News {
  id: string
  title: string
  slug: string
  excerpt: string
  content?: string
  coverImage?: string
  images?: string[]
  category: string
  categoryId: string
  author: string
  authorId?: string
  tags: string[]
  views: number
  publishedAt: string
  createdAt: string
  updatedAt: string
  relatedNews?: News[]
}

export interface NewsListParams extends PaginationParams {
  category?: string
  tags?: string
  search?: string
  year?: number
  month?: number
}

/**
 * 获取新闻列表
 */
export async function getNews(
  params?: NewsListParams
): Promise<ApiResponse<PaginatedResponse<News>>> {
  const query: Record<string, string | number | undefined> | undefined = params
    ? {
        page: params.page,
        limit: params.limit,
        sort: params.sort,
        category: params.category,
        tags: params.tags,
        search: params.search,
        year: params.year,
        month: params.month,
      }
    : undefined

  return get<PaginatedResponse<News>>('/news', query)
}

/**
 * 获取新闻详情
 */
export async function getNewsItem(
  id: string,
  incrementViews = true
): Promise<ApiResponse<News>> {
  return get<News>(`/news/${id}`, { incrementViews: incrementViews.toString() })
}

/**
 * 获取新闻分类列表
 */
export async function getNewsCategories(): Promise<ApiResponse<unknown[]>> {
  return get<unknown[]>('/news/categories')
}

/**
 * 获取热门新闻
 */
export async function getPopularNews(params?: {
  limit?: number
  period?: 'day' | 'week' | 'month' | 'all'
}): Promise<ApiResponse<News[]>> {
  const query: Record<string, string | number | undefined> | undefined = params
    ? {
        limit: params.limit,
        period: params.period,
      }
    : undefined

  return get<News[]>('/news/popular', query)
}

// ==================== 案例相关 API ====================

export interface Case {
  id: string
  title: string
  slug: string
  description: string
  content?: string
  coverImage: string
  images?: string[]
  industry: string
  industryId: string
  client: string
  clientLogo?: string
  results: string[]
  challenges?: string[]
  solutions?: string[]
  testimonial?: {
    content: string
    author: string
    position: string
  }
  tags: string[]
  status: 'published' | 'draft'
  publishedAt: string
  createdAt: string
  updatedAt: string
}

export interface CaseListParams extends PaginationParams {
  industry?: string
  tags?: string
  search?: string
}

/**
 * 获取案例列表
 */
export async function getCases(
  params?: CaseListParams
): Promise<ApiResponse<PaginatedResponse<Case>>> {
  const query: Record<string, string | number | undefined> | undefined = params
    ? {
        page: params.page,
        limit: params.limit,
        sort: params.sort,
        industry: params.industry,
        tags: params.tags,
        search: params.search,
      }
    : undefined

  return get<PaginatedResponse<Case>>('/cases', query)
}

/**
 * 获取案例详情
 */
export async function getCase(id: string): Promise<ApiResponse<Case>> {
  return get<Case>(`/cases/${id}`)
}

/**
 * 获取行业列表
 */
export async function getIndustries(): Promise<ApiResponse<unknown[]>> {
  return get<unknown[]>('/cases/industries')
}

// ==================== 联系表单相关 API ====================

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  company?: string
  subject?: string
  message: string
}

/**
 * 提交联系表单
 */
export async function submitContact(
  data: ContactFormData
): Promise<ApiResponse<{ id: string; message: string }>> {
  return post<{ id: string; message: string }>('/contact', data)
}

// ==================== 搜索相关 API ====================

export interface SearchParams extends PaginationParams {
  q: string
  type?: 'product' | 'news' | 'case' | 'all'
}

export interface SearchResult {
  query: string
  results: {
    products: {
      items: Product[]
      total: number
    }
    news: {
      items: News[]
      total: number
    }
    cases: {
      items: Case[]
      total: number
    }
  }
  total: number
}

/**
 * 全局搜索
 */
export async function search(
  params: SearchParams
): Promise<ApiResponse<SearchResult>> {
  const query: Record<string, string | number | undefined> = {
    q: params.q,
    type: params.type,
    page: params.page,
    limit: params.limit,
    sort: params.sort,
  }

  return get<SearchResult>('/search', query)
}

/**
 * 获取搜索建议
 */
export async function getSearchSuggestions(
  q: string,
  limit = 5
): Promise<ApiResponse<string[]>> {
  return get<string[]>('/search/suggestions', { q, limit })
}

// ==================== 关于我们相关 API ====================

/**
 * 获取公司信息
 */
export async function getAboutInfo(): Promise<ApiResponse<unknown>> {
  return get<unknown>('/about')
}

/**
 * 获取团队信息
 */
export async function getTeam(params?: {
  department?: string
}): Promise<ApiResponse<unknown[]>> {
  const query: Record<string, string | number | undefined> | undefined = params
    ? {
        department: params.department,
      }
    : undefined

  return get<unknown[]>('/about/team', query)
}

// ==================== Newsletter 相关 API ====================

export interface NewsletterSubscribeData {
  email: string
  name?: string
  interests?: string[]
}

/**
 * 订阅 Newsletter
 */
export async function subscribeNewsletter(
  data: NewsletterSubscribeData
): Promise<ApiResponse<{ message: string }>> {
  return post<{ message: string }>('/newsletter/subscribe', data)
}


