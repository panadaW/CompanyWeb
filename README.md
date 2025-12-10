# 公司网站

基于 Next.js 14 构建的现代化公司官网。

## 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **动画**: Framer Motion
- **图标**: Lucide React
- **表单**: React Hook Form + Zod
- **状态管理**: React Context API

## 功能特性

- ✅ 响应式设计（支持移动端、平板、桌面）
- ✅ SEO 优化
- ✅ 现代化 UI 设计
- ✅ 流畅的动画效果
- ✅ 表单验证
- ✅ TypeScript 类型安全

## 页面结构

- `/` - 首页
- `/about` - 关于我们
- `/products` - 产品服务
- `/news` - 新闻动态
- `/cases` - 案例展示
- `/contact` - 联系我们

## 开始使用

### 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 开发模式

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看网站。

### 构建生产版本

```bash
npm run build
npm run start
```

## 项目结构

```
├── app/                    # Next.js App Router 页面
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 首页
│   ├── about/             # 关于我们
│   ├── products/          # 产品服务
│   ├── news/              # 新闻动态
│   ├── cases/             # 案例展示
│   ├── contact/           # 联系我们
│   └── api/               # API 路由
├── components/            # React 组件
│   ├── layout/           # 布局组件
│   ├── sections/         # 页面区块
│   └── common/           # 通用组件
├── lib/                  # 工具函数
└── public/               # 静态资源
```

## 环境变量

创建 `.env.local` 文件（参考 `.env.example`）：

```env
# 网站配置
NEXT_PUBLIC_SITE_URL=https://yourcompany.com
```

## 部署

推荐使用 [Vercel](https://vercel.com) 部署：

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 自动部署完成

## 开发规范

- 使用 TypeScript 进行类型检查
- 遵循 ESLint 代码规范
- 使用 Prettier 格式化代码
- 组件使用函数式组件和 Hooks
- 样式使用 Tailwind CSS

## 许可证

MIT







