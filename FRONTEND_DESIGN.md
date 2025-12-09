# 公司网站前端技术设计文档

## 1. 技术栈

### 1.1 核心框架
- **Next.js 14+** (App Router)
  - 服务端渲染 (SSR)
  - 静态站点生成 (SSG)
  - 路由系统
  - API Routes

### 1.2 开发语言
- **TypeScript** - 类型安全
- **JavaScript (ES6+)** - 现代语法

### 1.3 样式方案
- **Tailwind CSS** - 实用优先的CSS框架
- **CSS Modules** - 组件级样式（如需要）
- **PostCSS** - CSS处理

### 1.4 UI组件库
- **shadcn/ui** - 基于Radix UI的高质量组件
- **Lucide React** - 图标库
- **Framer Motion** - 动画库

### 1.5 状态管理
- **React Context API** - 全局状态（主题、语言等）
- **Zustand** - 轻量级状态管理（如需要）

### 1.6 数据获取
- **SWR** / **React Query** - 数据获取和缓存
- **Axios** - HTTP客户端

### 1.7 表单处理
- **React Hook Form** - 表单管理
- **Zod** - 表单验证

### 1.8 工具库
- **clsx** / **class-variance-authority** - 条件类名
- **date-fns** - 日期处理
- **react-intersection-observer** - 滚动观察

## 2. 项目结构

```
company-website/
├── public/                      # 静态资源
│   ├── images/                 # 图片资源
│   │   ├── hero/               # 首页大图
│   │   ├── products/           # 产品图片
│   │   ├── cases/              # 案例图片
│   │   └── team/               # 团队照片
│   ├── icons/                  # 图标文件
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # 根布局
│   │   ├── page.tsx            # 首页
│   │   ├── loading.tsx         # 加载状态
│   │   ├── error.tsx           # 错误页面
│   │   ├── not-found.tsx       # 404页面
│   │   ├── about/              # 关于我们
│   │   │   ├── page.tsx
│   │   │   └── layout.tsx
│   │   ├── products/           # 产品/服务
│   │   │   ├── page.tsx        # 产品列表
│   │   │   ├── [id]/           # 产品详情
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── news/               # 新闻动态
│   │   │   ├── page.tsx        # 新闻列表
│   │   │   ├── [slug]/         # 新闻详情
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── cases/              # 案例展示
│   │   │   ├── page.tsx
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── contact/            # 联系我们
│   │   │   ├── page.tsx
│   │   │   └── layout.tsx
│   │   └── api/                # API路由
│   │       ├── contact/
│   │       │   └── route.ts    # 联系表单提交
│   │       └── newsletter/
│   │           └── route.ts    # 订阅功能
│   ├── components/             # React组件
│   │   ├── ui/                 # shadcn/ui组件
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── select.tsx
│   │   │   ├── dialog.tsx
│   │   │   └── ...
│   │   ├── layout/             # 布局组件
│   │   │   ├── Header.tsx      # 顶部导航
│   │   │   ├── Footer.tsx      # 页脚
│   │   │   ├── MobileNav.tsx   # 移动端导航
│   │   │   └── Sidebar.tsx     # 侧边栏（如需要）
│   │   ├── sections/           # 页面区块
│   │   │   ├── HeroSection.tsx # 首页Hero
│   │   │   ├── FeaturesSection.tsx
│   │   │   ├── ProductsSection.tsx
│   │   │   ├── NewsSection.tsx
│   │   │   ├── CasesSection.tsx
│   │   │   ├── ContactSection.tsx
│   │   │   └── TestimonialsSection.tsx
│   │   └── common/             # 通用组件
│   │       ├── Logo.tsx
│   │       ├── NavLink.tsx
│   │       ├── ImageGallery.tsx
│   │       ├── Timeline.tsx
│   │       ├── TeamCard.tsx
│   │       ├── ProductCard.tsx
│   │       ├── NewsCard.tsx
│   │       ├── CaseCard.tsx
│   │       ├── ContactForm.tsx
│   │       ├── NewsletterForm.tsx
│   │       └── ScrollToTop.tsx
│   ├── lib/                    # 工具函数
│   │   ├── utils.ts            # 通用工具
│   │   ├── cn.ts               # 类名合并
│   │   ├── api.ts              # API调用
│   │   ├── constants.ts        # 常量定义
│   │   └── validations.ts      # 表单验证规则
│   ├── hooks/                  # 自定义Hooks
│   │   ├── useScroll.ts        # 滚动监听
│   │   ├── useMediaQuery.ts    # 媒体查询
│   │   ├── useDebounce.ts      # 防抖
│   │   └── useIntersectionObserver.ts
│   ├── types/                  # TypeScript类型
│   │   ├── index.ts            # 通用类型
│   │   ├── product.ts          # 产品类型
│   │   ├── news.ts             # 新闻类型
│   │   └── case.ts             # 案例类型
│   ├── styles/                 # 样式文件
│   │   └── globals.css         # 全局样式
│   └── data/                   # 静态数据（开发阶段）
│       ├── products.ts
│       ├── news.ts
│       ├── cases.ts
│       └── team.ts
├── .env.local                  # 环境变量
├── .env.example                # 环境变量示例
├── .gitignore
├── next.config.js              # Next.js配置
├── tailwind.config.ts          # Tailwind配置
├── tsconfig.json               # TypeScript配置
├── postcss.config.js           # PostCSS配置
├── components.json             # shadcn/ui配置
└── package.json
```

## 3. 组件设计规范

### 3.1 组件分类

#### 3.1.1 UI基础组件 (components/ui/)
基于shadcn/ui，包括：
- Button - 按钮
- Card - 卡片
- Input - 输入框
- Textarea - 文本域
- Select - 下拉选择
- Dialog - 对话框
- Tabs - 标签页
- Accordion - 手风琴
- Badge - 徽章
- Avatar - 头像
- Separator - 分隔线

#### 3.1.2 布局组件 (components/layout/)
- **Header**: 
  - Logo
  - 导航菜单
  - 移动端汉堡菜单
  - CTA按钮
- **Footer**:
  - 公司信息
  - 快速链接
  - 社交媒体
  - 版权信息

#### 3.1.3 页面区块组件 (components/sections/)
- HeroSection - 首页大图区域
- FeaturesSection - 特色功能展示
- ProductsSection - 产品展示
- NewsSection - 新闻动态
- CasesSection - 案例展示
- ContactSection - 联系表单
- TestimonialsSection - 客户评价

#### 3.1.4 通用业务组件 (components/common/)
- ProductCard - 产品卡片
- NewsCard - 新闻卡片
- CaseCard - 案例卡片
- TeamCard - 团队成员卡片
- ContactForm - 联系表单
- ImageGallery - 图片画廊

### 3.2 组件设计原则
- **单一职责**: 每个组件只做一件事
- **可复用性**: 通过props实现灵活配置
- **类型安全**: 使用TypeScript定义props类型
- **可访问性**: 遵循WCAG标准
- **响应式**: 移动端优先设计

## 4. 样式系统设计

### 4.1 Tailwind配置

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          // ... 主色调
          900: '#0c4a6e',
        },
        secondary: {
          // 辅助色
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-poppins)', 'sans-serif'],
      },
      spacing: {
        // 自定义间距
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
      },
    },
  },
}
```

### 4.2 设计Token

```typescript
// lib/constants.ts
export const designTokens = {
  colors: {
    primary: '#0066cc',
    secondary: '#00a8e8',
    accent: '#ff6b6b',
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      // ...
      900: '#171717',
    },
  },
  spacing: {
    xs: '0.5rem',    // 8px
    sm: '0.75rem',   // 12px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
    '3xl': '4rem',   // 64px
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  typography: {
    fontSizes: {
      xs: '0.75rem',   // 12px
      sm: '0.875rem',  // 14px
      base: '1rem',    // 16px
      lg: '1.125rem',  // 18px
      xl: '1.25rem',   // 20px
      '2xl': '1.5rem', // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
      '5xl': '3rem',     // 48px
    },
  },
}
```

## 5. 页面路由设计

### 5.1 路由结构

```
/                          # 首页
/about                     # 关于我们
/products                  # 产品列表
/products/[id]             # 产品详情
/news                      # 新闻列表
/news/[slug]               # 新闻详情
/cases                     # 案例列表
/cases/[id]                # 案例详情
/contact                   # 联系我们
```

### 5.2 路由元数据

每个页面使用Next.js Metadata API：

```typescript
// app/about/page.tsx
export const metadata: Metadata = {
  title: '关于我们 | 公司名称',
  description: '公司简介、发展历程、企业文化',
  openGraph: {
    title: '关于我们',
    description: '...',
    images: ['/images/og-about.jpg'],
  },
}
```

## 6. 数据管理

### 6.1 静态数据（开发阶段）

```typescript
// data/products.ts
export interface Product {
  id: string
  name: string
  description: string
  image: string
  category: string
  features: string[]
  price?: number
}

export const products: Product[] = [
  // ...
]
```

### 6.2 API调用

```typescript
// lib/api.ts
export async function getProducts(): Promise<Product[]> {
  // 从API或CMS获取数据
}

export async function getProductById(id: string): Promise<Product> {
  // ...
}
```

### 6.3 数据获取策略

- **静态生成 (SSG)**: 产品列表、关于我们等不常变化的内容
- **增量静态再生 (ISR)**: 新闻列表、案例展示
- **服务端渲染 (SSR)**: 需要实时数据的内容
- **客户端获取 (CSR)**: 用户交互相关数据

## 7. 性能优化策略

### 7.1 图片优化
- 使用 `next/image` 组件
- 图片格式：WebP/AVIF
- 懒加载
- 响应式图片尺寸

### 7.2 代码分割
- 路由级代码分割（自动）
- 组件级懒加载
- 第三方库按需加载

### 7.3 缓存策略
- Next.js自动缓存
- SWR/React Query客户端缓存
- 静态资源CDN缓存

### 7.4 性能指标目标
- First Contentful Paint (FCP) < 1.8s
- Largest Contentful Paint (LCP) < 2.5s
- Cumulative Layout Shift (CLS) < 0.1
- Time to Interactive (TTI) < 3.8s

## 8. SEO优化

### 8.1 元数据
- 每个页面设置title和description
- Open Graph标签
- Twitter Card标签
- 结构化数据 (JSON-LD)

### 8.2 技术SEO
- 语义化HTML
- 合理的标题层级 (H1-H6)
- Alt文本（图片）
- 内部链接优化
- sitemap.xml
- robots.txt

### 8.3 内容SEO
- 关键词优化
- 内容质量
- 移动端友好
- 页面加载速度

## 9. 响应式设计

### 9.1 断点策略
- Mobile First设计
- 断点：sm(640px), md(768px), lg(1024px), xl(1280px)

### 9.2 布局适配
- 导航：桌面端横向，移动端汉堡菜单
- 网格：桌面端多列，移动端单列
- 字体：响应式字号
- 间距：响应式padding/margin

## 10. 动画与交互

### 10.1 动画库
- **Framer Motion** - 复杂动画
- **CSS Transitions** - 简单过渡
- **Intersection Observer** - 滚动触发动画

### 10.2 动画原则
- 性能优先（使用transform和opacity）
- 适度的动画时长（200-500ms）
- 一致的缓动函数
- 减少动画（移动端）

### 10.3 交互反馈
- 按钮悬停效果
- 表单验证提示
- 加载状态
- 成功/错误消息

## 11. 可访问性 (A11y)

### 11.1 标准
- WCAG 2.1 Level AA
- 语义化HTML
- ARIA标签
- 键盘导航支持

### 11.2 实践
- 颜色对比度 ≥ 4.5:1
- 焦点可见
- 屏幕阅读器支持
- 替代文本

## 12. 错误处理

### 12.1 错误边界
- React Error Boundary
- Next.js error.tsx
- 全局错误处理

### 12.2 错误页面
- 404页面 (not-found.tsx)
- 500错误页面 (error.tsx)
- 友好的错误提示

## 13. 测试策略

### 13.1 测试类型
- **单元测试**: Jest + React Testing Library
- **E2E测试**: Playwright / Cypress
- **视觉回归**: Chromatic / Percy

### 13.2 测试覆盖
- 关键组件
- 用户流程
- API调用
- 表单验证

## 14. 开发工作流

### 14.1 代码规范
- ESLint配置
- Prettier格式化
- Husky Git Hooks
- Commitlint

### 14.2 开发工具
- VS Code扩展推荐
- 调试配置
- 热重载

### 14.3 构建与部署
- 本地开发：`npm run dev`
- 构建：`npm run build`
- 预览：`npm run start`
- 部署：Vercel（推荐）

## 15. 依赖包清单

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^3.3.0",
    "framer-motion": "^10.16.0",
    "lucide-react": "^0.294.0",
    "react-hook-form": "^7.48.0",
    "zod": "^3.22.0",
    "swr": "^2.2.0",
    "axios": "^1.6.0",
    "clsx": "^2.0.0",
    "class-variance-authority": "^0.7.0",
    "date-fns": "^2.30.0",
    "react-intersection-observer": "^9.5.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "eslint": "^8.54.0",
    "eslint-config-next": "^14.0.0",
    "prettier": "^3.1.0",
    "@tailwindcss/typography": "^0.5.10"
  }
}
```

---

**文档版本**: v1.0  
**创建日期**: 2024  
**技术栈**: Next.js 14 + TypeScript + Tailwind CSS


