# API 接口设计文档

## 1. 概述

本文档定义了公司网站前端所需的所有 API 接口规范。所有接口遵循 RESTful 设计原则，使用 JSON 格式进行数据交换。

### 1.1 基础信息

- **Base URL**: `https://api.yourcompany.com/v1` (生产环境)
- **Base URL**: `http://localhost:3000/api` (开发环境)
- **Content-Type**: `application/json`
- **字符编码**: UTF-8

### 1.2 通用响应格式

#### 成功响应
```json
{
  "success": true,
  "data": {},
  "message": "操作成功"
}
```

#### 错误响应
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "错误描述",
    "details": {}
  }
}
```

### 1.3 HTTP 状态码

- `200` - 请求成功
- `201` - 创建成功
- `400` - 请求参数错误
- `401` - 未授权
- `403` - 禁止访问
- `404` - 资源不存在
- `500` - 服务器内部错误

### 1.4 分页参数

所有列表接口支持分页：

**请求参数**:
- `page` (number, 可选): 页码，默认 1
- `limit` (number, 可选): 每页数量，默认 10，最大 100
- `sort` (string, 可选): 排序字段，格式: `field:asc|desc`
- `order` (string, 可选): 排序方向，`asc` 或 `desc`

**响应格式**:
```json
{
  "success": true,
  "data": {
    "items": [],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100,
      "totalPages": 10,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

## 2. 数据模型定义

### 2.1 产品模型 (Product)

```typescript
interface Product {
  id: string                    // 产品ID
  name: string                  // 产品名称
  slug: string                  // URL友好标识
  description: string           // 产品描述
  shortDescription?: string     // 简短描述
  category: string              // 产品分类
  categoryId: string            // 分类ID
  images: string[]              // 产品图片URL数组
  features: string[]            // 产品特性列表
  specifications?: {            // 技术规格
    [key: string]: string
  }
  price?: number                // 价格（如适用）
  priceUnit?: string            // 价格单位
  status: 'active' | 'inactive' // 状态
  tags: string[]                // 标签
  relatedProducts?: string[]    // 相关产品ID数组
  createdAt: string             // 创建时间 (ISO 8601)
  updatedAt: string             // 更新时间 (ISO 8601)
}
```

### 2.2 新闻模型 (News)

```typescript
interface News {
  id: string                    // 新闻ID
  title: string                 // 标题
  slug: string                  // URL友好标识
  excerpt: string               // 摘要
  content: string               // 正文内容（Markdown/HTML）
  coverImage?: string           // 封面图片URL
  images?: string[]             // 图片数组
  category: string              // 分类
  categoryId: string            // 分类ID
  author: string                // 作者
  authorId: string              // 作者ID
  tags: string[]                // 标签
  views: number                 // 浏览次数
  publishedAt: string           // 发布时间 (ISO 8601)
  createdAt: string             // 创建时间 (ISO 8601)
  updatedAt: string             // 更新时间 (ISO 8601)
  relatedNews?: string[]        // 相关新闻ID数组
}
```

### 2.3 案例模型 (Case)

```typescript
interface Case {
  id: string                    // 案例ID
  title: string                 // 标题
  slug: string                  // URL友好标识
  description: string            // 描述
  content: string               // 详细内容
  coverImage: string            // 封面图片
  images: string[]              // 图片数组
  industry: string              // 行业
  industryId: string            // 行业ID
  client: string                // 客户名称
  clientLogo?: string           // 客户Logo
  results: string[]             // 成果列表
  challenges: string[]          // 挑战
  solutions: string[]           // 解决方案
  testimonial?: {               // 客户评价
    content: string
    author: string
    position: string
  }
  tags: string[]                // 标签
  status: 'published' | 'draft' // 状态
  publishedAt: string           // 发布时间 (ISO 8601)
  createdAt: string             // 创建时间 (ISO 8601)
  updatedAt: string             // 更新时间 (ISO 8601)
}
```

### 2.4 联系表单模型 (Contact)

```typescript
interface Contact {
  id: string                    // 联系记录ID
  name: string                  // 姓名
  email: string                 // 邮箱
  phone?: string                // 电话
  company?: string              // 公司
  subject?: string               // 主题
  message: string               // 留言内容
  status: 'pending' | 'replied' | 'archived' // 状态
  createdAt: string             // 创建时间 (ISO 8601)
  updatedAt: string             // 更新时间 (ISO 8601)
}
```

### 2.5 分类模型 (Category)

```typescript
interface Category {
  id: string                    // 分类ID
  name: string                  // 分类名称
  slug: string                  // URL友好标识
  description?: string          // 描述
  parentId?: string             // 父分类ID（支持多级分类）
  type: 'product' | 'news' | 'case' // 分类类型
  order: number                 // 排序
  createdAt: string             // 创建时间
  updatedAt: string             // 更新时间
}
```

## 3. 产品相关接口

### 3.1 获取产品列表

**接口**: `GET /products`

**描述**: 获取产品列表，支持分页、筛选和排序

**请求参数**:
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| page | number | 否 | 页码，默认 1 |
| limit | number | 否 | 每页数量，默认 10 |
| category | string | 否 | 分类ID或slug |
| categoryId | string | 否 | 分类ID |
| tags | string | 否 | 标签，多个用逗号分隔 |
| search | string | 否 | 搜索关键词 |
| sort | string | 否 | 排序字段，如 `createdAt:desc` |
| status | string | 否 | 状态筛选，`active` 或 `inactive` |

**响应示例**:
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "prod-001",
        "name": "产品服务一",
        "slug": "product-service-1",
        "description": "专业的解决方案...",
        "shortDescription": "专业的解决方案",
        "category": "解决方案",
        "categoryId": "cat-001",
        "images": ["https://example.com/image1.jpg"],
        "features": ["特性1", "特性2"],
        "price": 9999,
        "priceUnit": "元",
        "status": "active",
        "tags": ["标签1", "标签2"],
        "createdAt": "2024-01-01T00:00:00Z",
        "updatedAt": "2024-01-15T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 50,
      "totalPages": 5,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

### 3.2 获取产品详情

**接口**: `GET /products/:id`

**描述**: 根据ID或slug获取产品详细信息

**路径参数**:
- `id` (string): 产品ID或slug

**查询参数**:
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| include | string | 否 | 包含关联数据，如 `relatedProducts,category` |

**响应示例**:
```json
{
  "success": true,
  "data": {
    "id": "prod-001",
    "name": "产品服务一",
    "slug": "product-service-1",
    "description": "详细的产品描述...",
    "category": {
      "id": "cat-001",
      "name": "解决方案"
    },
    "images": ["https://example.com/image1.jpg"],
    "features": ["特性1", "特性2", "特性3"],
    "specifications": {
      "规格1": "值1",
      "规格2": "值2"
    },
    "relatedProducts": [
      {
        "id": "prod-002",
        "name": "相关产品",
        "slug": "related-product"
      }
    ],
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-15T00:00:00Z"
  }
}
```

### 3.3 获取产品分类列表

**接口**: `GET /products/categories`

**描述**: 获取产品分类列表

**请求参数**:
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| parentId | string | 否 | 父分类ID，用于获取子分类 |
| includeProducts | boolean | 否 | 是否包含产品数量 |

**响应示例**:
```json
{
  "success": true,
  "data": [
    {
      "id": "cat-001",
      "name": "解决方案",
      "slug": "solutions",
      "description": "各类解决方案",
      "order": 1,
      "productCount": 10,
      "children": [
        {
          "id": "cat-002",
          "name": "企业解决方案",
          "slug": "enterprise-solutions",
          "order": 1
        }
      ]
    }
  ]
}
```

## 4. 新闻动态相关接口

### 4.1 获取新闻列表

**接口**: `GET /news`

**描述**: 获取新闻列表，支持分页、筛选和搜索

**请求参数**:
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| page | number | 否 | 页码 |
| limit | number | 否 | 每页数量 |
| category | string | 否 | 分类ID或slug |
| tags | string | 否 | 标签 |
| search | string | 否 | 搜索关键词 |
| sort | string | 否 | 排序，默认 `publishedAt:desc` |
| year | number | 否 | 年份筛选 |
| month | number | 否 | 月份筛选 |

**响应示例**:
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "news-001",
        "title": "公司最新动态标题一",
        "slug": "company-news-1",
        "excerpt": "这里是新闻摘要内容...",
        "coverImage": "https://example.com/cover.jpg",
        "category": "公司新闻",
        "categoryId": "cat-news-001",
        "author": "张三",
        "tags": ["公司动态", "行业资讯"],
        "views": 1234,
        "publishedAt": "2024-01-15T10:00:00Z",
        "createdAt": "2024-01-15T09:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100,
      "totalPages": 10,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

### 4.2 获取新闻详情

**接口**: `GET /news/:id`

**描述**: 根据ID或slug获取新闻详细信息

**路径参数**:
- `id` (string): 新闻ID或slug

**查询参数**:
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| incrementViews | boolean | 否 | 是否增加浏览次数，默认 true |

**响应示例**:
```json
{
  "success": true,
  "data": {
    "id": "news-001",
    "title": "公司最新动态标题一",
    "slug": "company-news-1",
    "excerpt": "这里是新闻摘要内容...",
    "content": "# 新闻标题\n\n这里是新闻正文内容...",
    "coverImage": "https://example.com/cover.jpg",
    "images": ["https://example.com/image1.jpg"],
    "category": {
      "id": "cat-news-001",
      "name": "公司新闻"
    },
    "author": {
      "id": "author-001",
      "name": "张三",
      "avatar": "https://example.com/avatar.jpg"
    },
    "tags": ["公司动态", "行业资讯"],
    "views": 1235,
    "publishedAt": "2024-01-15T10:00:00Z",
    "relatedNews": [
      {
        "id": "news-002",
        "title": "相关新闻",
        "slug": "related-news"
      }
    ],
    "createdAt": "2024-01-15T09:00:00Z",
    "updatedAt": "2024-01-15T10:00:00Z"
  }
}
```

### 4.3 获取新闻分类列表

**接口**: `GET /news/categories`

**描述**: 获取新闻分类列表

**响应示例**:
```json
{
  "success": true,
  "data": [
    {
      "id": "cat-news-001",
      "name": "公司新闻",
      "slug": "company-news",
      "description": "公司相关新闻",
      "newsCount": 25
    },
    {
      "id": "cat-news-002",
      "name": "行业资讯",
      "slug": "industry-news",
      "description": "行业相关资讯",
      "newsCount": 15
    }
  ]
}
```

### 4.4 获取热门新闻

**接口**: `GET /news/popular`

**描述**: 获取热门新闻（按浏览次数或发布时间）

**请求参数**:
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| limit | number | 否 | 返回数量，默认 5 |
| period | string | 否 | 时间范围，`day` | `week` | `month` | `all` |

**响应示例**:
```json
{
  "success": true,
  "data": [
    {
      "id": "news-001",
      "title": "热门新闻标题",
      "slug": "popular-news",
      "excerpt": "摘要...",
      "coverImage": "https://example.com/cover.jpg",
      "views": 5000,
      "publishedAt": "2024-01-15T10:00:00Z"
    }
  ]
}
```

## 5. 案例展示相关接口

### 5.1 获取案例列表

**接口**: `GET /cases`

**描述**: 获取案例列表，支持分页和筛选

**请求参数**:
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| page | number | 否 | 页码 |
| limit | number | 否 | 每页数量 |
| industry | string | 否 | 行业ID或名称 |
| tags | string | 否 | 标签 |
| search | string | 否 | 搜索关键词 |
| sort | string | 否 | 排序 |

**响应示例**:
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "case-001",
        "title": "成功案例一",
        "slug": "success-case-1",
        "description": "为客户提供专业的解决方案...",
        "coverImage": "https://example.com/case-cover.jpg",
        "industry": "金融行业",
        "industryId": "ind-001",
        "client": "XX银行",
        "results": ["提升效率30%", "降低成本20%"],
        "tags": ["金融", "数字化转型"],
        "publishedAt": "2024-01-10T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 30,
      "totalPages": 3,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

### 5.2 获取案例详情

**接口**: `GET /cases/:id`

**描述**: 根据ID或slug获取案例详细信息

**路径参数**:
- `id` (string): 案例ID或slug

**响应示例**:
```json
{
  "success": true,
  "data": {
    "id": "case-001",
    "title": "成功案例一",
    "slug": "success-case-1",
    "description": "为客户提供专业的解决方案...",
    "content": "# 案例详情\n\n详细内容...",
    "coverImage": "https://example.com/case-cover.jpg",
    "images": ["https://example.com/image1.jpg"],
    "industry": {
      "id": "ind-001",
      "name": "金融行业"
    },
    "client": "XX银行",
    "clientLogo": "https://example.com/client-logo.png",
    "results": ["提升效率30%", "降低成本20%", "客户满意度95%"],
    "challenges": ["挑战1", "挑战2"],
    "solutions": ["解决方案1", "解决方案2"],
    "testimonial": {
      "content": "非常满意这次合作...",
      "author": "李总",
      "position": "XX银行CTO"
    },
    "tags": ["金融", "数字化转型"],
    "publishedAt": "2024-01-10T00:00:00Z",
    "createdAt": "2024-01-10T00:00:00Z",
    "updatedAt": "2024-01-15T00:00:00Z"
  }
}
```

### 5.3 获取行业列表

**接口**: `GET /cases/industries`

**描述**: 获取案例涉及的行业列表

**响应示例**:
```json
{
  "success": true,
  "data": [
    {
      "id": "ind-001",
      "name": "金融行业",
      "slug": "finance",
      "caseCount": 10
    },
    {
      "id": "ind-002",
      "name": "制造业",
      "slug": "manufacturing",
      "caseCount": 8
    }
  ]
}
```

## 6. 联系表单相关接口

### 6.1 提交联系表单

**接口**: `POST /contact`

**描述**: 提交联系表单

**请求体**:
```json
{
  "name": "张三",
  "email": "zhangsan@example.com",
  "phone": "138-0013-8000",
  "company": "XX公司",
  "subject": "咨询产品",
  "message": "我想了解更多关于产品的信息..."
}
```

**请求参数验证**:
- `name` (string, 必填): 姓名，2-50字符
- `email` (string, 必填): 邮箱，有效邮箱格式
- `phone` (string, 可选): 电话
- `company` (string, 可选): 公司名称
- `subject` (string, 可选): 主题
- `message` (string, 必填): 留言内容，10-2000字符

**响应示例**:
```json
{
  "success": true,
  "data": {
    "id": "contact-001",
    "message": "感谢您的留言，我们会尽快与您联系！"
  }
}
```

### 6.2 订阅 Newsletter

**接口**: `POST /newsletter/subscribe`

**描述**: 订阅邮件通知

**请求体**:
```json
{
  "email": "user@example.com",
  "name": "张三",
  "interests": ["产品更新", "行业资讯"]
}
```

**响应示例**:
```json
{
  "success": true,
  "data": {
    "message": "订阅成功！"
  }
}
```

## 7. 搜索相关接口

### 7.1 全局搜索

**接口**: `GET /search`

**描述**: 全局搜索，支持搜索产品、新闻、案例

**请求参数**:
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| q | string | 是 | 搜索关键词 |
| type | string | 否 | 搜索类型，`product` | `news` | `case` | `all` |
| page | number | 否 | 页码 |
| limit | number | 否 | 每页数量 |

**响应示例**:
```json
{
  "success": true,
  "data": {
    "query": "解决方案",
    "results": {
      "products": {
        "items": [],
        "total": 5
      },
      "news": {
        "items": [],
        "total": 3
      },
      "cases": {
        "items": [],
        "total": 2
      }
    },
    "total": 10
  }
}
```

### 7.2 搜索建议

**接口**: `GET /search/suggestions`

**描述**: 获取搜索建议（自动完成）

**请求参数**:
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| q | string | 是 | 搜索关键词 |
| limit | number | 否 | 返回数量，默认 5 |

**响应示例**:
```json
{
  "success": true,
  "data": [
    "解决方案",
    "解决方案提供商",
    "企业解决方案"
  ]
}
```

## 8. 关于我们相关接口

### 8.1 获取公司信息

**接口**: `GET /about`

**描述**: 获取公司简介、发展历程等信息

**响应示例**:
```json
{
  "success": true,
  "data": {
    "company": {
      "name": "公司名称",
      "description": "公司简介...",
      "foundedYear": 2010,
      "employees": 100,
      "address": "北京市朝阳区xxx街道xxx号",
      "phone": "138-0013-8000",
      "email": "contact@company.com",
      "website": "https://yourcompany.com"
    },
    "milestones": [
      {
        "year": 2010,
        "title": "公司成立",
        "description": "公司正式成立..."
      }
    ],
    "values": [
      {
        "title": "专业",
        "description": "专业的服务..."
      }
    ],
    "team": [
      {
        "id": "team-001",
        "name": "张三",
        "position": "CEO",
        "avatar": "https://example.com/avatar.jpg",
        "bio": "简介..."
      }
    ],
    "awards": [
      {
        "title": "行业奖项",
        "year": 2023,
        "description": "获得XX奖项"
      }
    ]
  }
}
```

### 8.2 获取团队信息

**接口**: `GET /about/team`

**描述**: 获取团队成员列表

**请求参数**:
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| department | string | 否 | 部门筛选 |

**响应示例**:
```json
{
  "success": true,
  "data": [
    {
      "id": "team-001",
      "name": "张三",
      "position": "CEO",
      "department": "管理层",
      "avatar": "https://example.com/avatar.jpg",
      "bio": "简介...",
      "email": "zhangsan@company.com",
      "linkedin": "https://linkedin.com/in/zhangsan"
    }
  ]
}
```

## 9. 统计相关接口

### 9.1 获取网站统计

**接口**: `GET /stats`

**描述**: 获取网站统计数据（可选，用于展示）

**响应示例**:
```json
{
  "success": true,
  "data": {
    "products": {
      "total": 50,
      "categories": 10
    },
    "news": {
      "total": 100,
      "thisMonth": 5
    },
    "cases": {
      "total": 30,
      "industries": 8
    },
    "clients": {
      "total": 200
    }
  }
}
```

## 10. 文件上传接口（可选）

### 10.1 上传图片

**接口**: `POST /upload/image`

**描述**: 上传图片文件

**请求**: `multipart/form-data`
- `file` (File): 图片文件
- `type` (string): 类型，`product` | `news` | `case` | `avatar`

**响应示例**:
```json
{
  "success": true,
  "data": {
    "url": "https://example.com/uploads/image.jpg",
    "filename": "image.jpg",
    "size": 102400,
    "width": 1920,
    "height": 1080
  }
}
```

## 11. 错误码定义

| 错误码 | HTTP状态码 | 说明 |
|--------|-----------|------|
| INVALID_PARAMS | 400 | 请求参数错误 |
| UNAUTHORIZED | 401 | 未授权 |
| FORBIDDEN | 403 | 禁止访问 |
| NOT_FOUND | 404 | 资源不存在 |
| VALIDATION_ERROR | 400 | 数据验证失败 |
| RATE_LIMIT_EXCEEDED | 429 | 请求频率过高 |
| INTERNAL_ERROR | 500 | 服务器内部错误 |
| SERVICE_UNAVAILABLE | 503 | 服务不可用 |

## 12. 接口实现建议

### 12.1 Next.js API Routes 实现

在 `app/api/` 目录下创建对应的路由文件：

```
app/api/
├── products/
│   ├── route.ts              # GET /api/products, POST /api/products
│   └── [id]/
│       └── route.ts          # GET /api/products/:id
├── news/
│   ├── route.ts
│   ├── [id]/
│   │   └── route.ts
│   ├── categories/
│   │   └── route.ts
│   └── popular/
│       └── route.ts
├── cases/
│   ├── route.ts
│   └── [id]/
│       └── route.ts
├── contact/
│   └── route.ts
├── newsletter/
│   └── subscribe/
│       └── route.ts
└── search/
    └── route.ts
```

### 12.2 数据存储方案

**开发阶段**:
- 使用 JSON 文件存储数据
- 使用内存数据库（如 lowdb）

**生产环境**:
- 数据库: PostgreSQL / MongoDB
- ORM: Prisma / TypeORM
- 文件存储: AWS S3 / 阿里云OSS / 本地存储

### 12.3 缓存策略

- 使用 Next.js 的缓存机制
- 静态数据使用 ISR (Incremental Static Regeneration)
- 动态数据使用 SWR 或 React Query 进行客户端缓存

### 12.4 安全措施

- 输入验证和清理
- 防止 SQL 注入
- 防止 XSS 攻击
- 防止 CSRF 攻击
- 请求频率限制
- API 认证（如需要）

## 13. 接口调用示例

### 13.1 使用 fetch

```typescript
// 获取产品列表
async function getProducts(params?: {
  page?: number
  limit?: number
  category?: string
}) {
  const queryParams = new URLSearchParams()
  if (params?.page) queryParams.append('page', params.page.toString())
  if (params?.limit) queryParams.append('limit', params.limit.toString())
  if (params?.category) queryParams.append('category', params.category)

  const response = await fetch(`/api/products?${queryParams}`)
  const data = await response.json()
  return data
}
```

### 13.2 使用 SWR

```typescript
import useSWR from 'swr'

function useProducts(params?: { category?: string }) {
  const { data, error, isLoading } = useSWR(
    ['/api/products', params],
    ([url, params]) => {
      const queryParams = new URLSearchParams(params)
      return fetch(`${url}?${queryParams}`).then(res => res.json())
    }
  )

  return {
    products: data?.data?.items,
    pagination: data?.data?.pagination,
    isLoading,
    isError: error
  }
}
```

### 13.3 提交表单

```typescript
async function submitContactForm(formData: {
  name: string
  email: string
  message: string
}) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })

  const data = await response.json()
  return data
}
```

---

**文档版本**: v1.0  
**创建日期**: 2024  
**最后更新**: 2024







