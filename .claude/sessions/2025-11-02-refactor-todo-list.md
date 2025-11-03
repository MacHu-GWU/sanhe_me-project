# 前端代码重构任务清单

**生成时间:** 2025-11-02
**项目:** sanhe_me-project
**目标:** 消除代码重复、提升可维护性、优化代码组织

---

## 📊 重构概览

### 代码质量评分
- **当前评分:** ⭐⭐⭐ (3/5)
- **目标评分:** ⭐⭐⭐⭐ (4/5)
- **预计减少代码:** ~500 行重复代码
- **预计工作量:** 2-3 周

### 主要问题
1. ✅ **导航组件重复 3 次** (~180 行重复代码)
2. ✅ **SEO 配置重复 4 次** (~320 行重复代码)
3. ✅ **Hooks 完全重复 2 次** (~140 行重复代码)
4. ⚠️ **组件过大** (最大 763 行)
5. ⚠️ **数据与 UI 耦合**
6. ⚠️ **缺少共享布局**

---

## 🎯 优先级 1: 消除重复代码 (高优先级)

### 任务 1.1: 删除重复的 use-mobile Hook

**问题描述:**
- `/hooks/use-mobile.tsx` (19行)
- `/components/ui/use-mobile.tsx` (19行)
- 两个文件内容完全相同

**影响范围:**
- `components/ui/sidebar.tsx` 导入了 `@/components/ui/use-mobile`
- 可能其他文件也使用了这个 hook

**修改方案:**

**方案 A (推荐): 保留 hooks 目录版本**
1. 删除 `/components/ui/use-mobile.tsx`
2. 查找所有导入 `@/components/ui/use-mobile` 的文件
3. 替换为 `@/hooks/use-mobile`
4. 测试移动端响应式功能

**优点:**
- hooks 目录是存放自定义 hooks 的标准位置
- 符合 React 社区最佳实践

**缺点:**
- 需要更新导入路径

**方案 B: 保留 components/ui 目录版本**
1. 删除 `/hooks/use-mobile.tsx`
2. 其他文件无需修改

**优点:**
- 无需修改导入路径

**缺点:**
- 不符合 React 项目标准结构
- components/ui 应该只包含 UI 组件，不应包含 hooks

**推荐:** ✅ **方案 A**

**验证步骤:**
- [ ] 运行 `npm run dev`
- [ ] 测试桌面端和移动端导航菜单
- [ ] 测试侧边栏在移动端的显示

**预计时间:** 15 分钟

---

### 任务 1.2: 删除重复的 use-toast Hook

**问题描述:**
- `/hooks/use-toast.ts` (116行)
- `/components/ui/use-toast.ts` (116行)
- 两个文件内容完全相同

**影响范围:**
- 可能多个组件使用了 toast 功能

**修改方案:**

**方案 A (推荐): 保留 components/ui 版本**
1. 删除 `/hooks/use-toast.ts`
2. 查找所有导入 `@/hooks/use-toast` 的文件
3. 替换为 `@/components/ui/use-toast`
4. 测试 toast 通知功能

**优点:**
- use-toast 通常与 UI 组件库 (shadcn/ui) 绑定
- shadcn/ui 的标准位置是 components/ui/use-toast
- 与 Toaster 组件在同一目录

**缺点:**
- 需要更新导入路径

**方案 B: 保留 hooks 目录版本**
1. 删除 `/components/ui/use-toast.ts`
2. 更新所有导入路径

**优点:**
- hooks 集中管理

**缺点:**
- 不符合 shadcn/ui 的默认结构
- 可能与未来的 shadcn/ui 更新冲突

**推荐:** ✅ **方案 A**

**验证步骤:**
- [ ] 运行 `npm run dev`
- [ ] 触发 toast 通知
- [ ] 确认 toast 样式和功能正常

**预计时间:** 15 分钟

---

### 任务 1.3: 创建统一的 Navigation 组件

**问题描述:**
导航栏代码在 3 个文件中重复:
1. `app/HomePageContent.tsx` (行 84-134, ~50行)
2. `app/projects/projects-client.tsx` (行 31-72, ~42行)
3. `app/projects/30-voice-ai-solution-challenge/VoiceAIChallengeContent.tsx` (行 58-72, ~15行，简化版)

总计约 ~100-120 行重复代码

**修改方案:**

**方案 A (推荐): 创建独立的 Navigation 组件 + 使用路由组共享布局**
1. 创建 `/app/_components/layouts/Navigation.tsx`
2. 抽象导航逻辑和状态管理
3. 支持配置化导航项和当前路由高亮
4. 创建路由组 `app/(marketing)/layout.tsx`
5. 在布局中使用 Navigation 组件
6. 移除各页面中的重复导航代码

**文件结构:**
```
app/
├── _components/
│   └── layouts/
│       └── Navigation.tsx         # 新建: 统一导航组件
├── (marketing)/                   # 新建: 路由组
│   ├── layout.tsx                 # 新建: 共享布局 (包含 Navigation)
│   ├── page.tsx                   # 移动: 从 app/page.tsx
│   └── projects/                  # 移动: 从 app/projects/
│       ├── page.tsx
│       └── [slug]/
│           └── page.tsx
└── chat/                          # 保持: 不使用 marketing 布局
    └── page.tsx
```

**Navigation.tsx 接口设计:**
```tsx
interface NavItem {
  label: string
  href: string
}

interface NavigationProps {
  items?: NavItem[]  // 可选，默认为 Home + Projects
  currentPath?: string  // 用于高亮当前页面
}
```

**优点:**
- 完全消除导航代码重复
- 使用 Next.js 路由组实现布局共享
- 修改导航只需一处更新
- 支持配置化，灵活性高

**缺点:**
- 需要创建新的目录结构（路由组）
- 需要移动现有页面文件
- 改动范围较大

**方案 B: 仅创建 Navigation 组件，各页面手动导入**
1. 创建 `/components/layouts/Navigation.tsx`
2. 在 `HomePageContent.tsx`, `projects-client.tsx`, `VoiceAIChallengeContent.tsx` 中手动导入

**优点:**
- 无需移动文件
- 改动范围较小

**缺点:**
- 每个页面仍需手动导入
- 无法统一管理布局
- 未充分利用 Next.js 的路由组功能

**方案 C: 使用 app/layout.tsx 作为全局布局**
1. 在 `app/layout.tsx` 中添加 Navigation
2. 所有页面自动包含导航

**优点:**
- 最简单的实现

**缺点:**
- 聊天页面可能不需要导航
- 灵活性差

**推荐:** ✅ **方案 A** (功能最完整，符合 Next.js 最佳实践)

**如果希望快速完成:** 🔸 **方案 B** (改动小，风险低)

**详细实施步骤 (方案 A):**

**步骤 1: 创建 Navigation 组件**
```bash
mkdir -p app/_components/layouts
```

**步骤 2: 编写 Navigation.tsx**
```tsx
// app/_components/layouts/Navigation.tsx
"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

interface NavItem {
  label: string
  href: string
}

interface NavigationProps {
  items?: NavItem[]
}

const DEFAULT_NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
]

export default function Navigation({ items = DEFAULT_NAV_ITEMS }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-primary/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-16">
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {items.map((item) => {
              const isActive = pathname === item.href ||
                              (item.href !== "/" && pathname.startsWith(item.href))

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    px-3 py-2 rounded-md text-sm font-medium
                    transition-all duration-200
                    ${isActive
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                    }
                  `}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-primary hover:text-primary/80 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              {items.map((item) => {
                const isActive = pathname === item.href ||
                                (item.href !== "/" && pathname.startsWith(item.href))

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      px-3 py-2 rounded-md text-sm font-medium
                      transition-all duration-200
                      ${isActive
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                      }
                    `}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
```

**步骤 3: 创建路由组布局**
```bash
mkdir -p app/(marketing)
```

```tsx
// app/(marketing)/layout.tsx
import Navigation from "@/app/_components/layouts/Navigation"

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        {children}
      </main>
    </>
  )
}
```

**步骤 4: 移动页面到路由组**
```bash
# 移动首页
mv app/page.tsx app/(marketing)/page.tsx
mv app/HomePageContent.tsx app/(marketing)/HomePageContent.tsx

# 移动 projects 页面
mv app/projects app/(marketing)/projects
```

**步骤 5: 从各页面删除导航代码**
- 删除 `HomePageContent.tsx` 中的行 84-134
- 删除 `projects-client.tsx` 中的行 31-72
- 删除 `VoiceAIChallengeContent.tsx` 中的行 58-72
- 删除各文件中的 `isMenuOpen` 状态和 `Menu`, `X` 图标导入

**步骤 6: 调整页面容器样式**
因为导航栏是 fixed，需要给页面内容添加 `pt-16` (top padding)

```tsx
// HomePageContent.tsx, projects-client.tsx, VoiceAIChallengeContent.tsx
// 修改前:
<div className="min-h-screen bg-background...">

// 修改后:
<div className="min-h-screen bg-background pt-16 ...">
```

**验证步骤:**
- [ ] `npm run dev`
- [ ] 访问 `/` - 导航显示，Home 高亮
- [ ] 访问 `/projects` - 导航显示，Projects 高亮
- [ ] 访问 `/projects/30-voice-ai-solution-challenge` - 导航显示，Projects 高亮
- [ ] 测试移动端菜单打开/关闭
- [ ] 测试移动端点击链接后菜单自动关闭
- [ ] 访问 `/chat` - 导航不显示（chat 不在路由组内）

**预计时间:** 1-2 小时

**注意事项:**
- ⚠️ 移动文件会改变 git 历史，建议使用 `git mv` 保留文件历史
- ⚠️ 确保所有导入路径正确更新
- ⚠️ 测试所有页面的响应式布局

---

### 任务 1.4: 创建统一的 SEO 元数据生成函数

**问题描述:**
SEO 配置和 `generateMetadata` 函数在 4 个文件中重复:
1. `app/page.tsx` (行 7-85, ~79行)
2. `app/projects/page.tsx` (行 7-85, ~79行)
3. `app/projects/30-voice-ai-solution-challenge/page.tsx` (行 7-85, ~79行)
4. `app/layout.tsx` (行 8-23, ~16行，部分重复)

总计约 ~250-300 行重复代码

**修改方案:**

**方案 A (推荐): 创建 SEO 配置工厂函数**
1. 创建 `/lib/seo/generateMetadata.ts`
2. 定义 SEO 配置接口和默认值
3. 创建 `generateSEOMetadata()` 工厂函数
4. 各页面调用工厂函数生成元数据

**文件结构:**
```
lib/
├── seo/
│   ├── generateMetadata.ts    # 新建: SEO 生成函数
│   ├── config.ts              # 新建: SEO 默认配置
│   └── types.ts               # 新建: SEO 类型定义
└── utils.ts
```

**优点:**
- SEO 配置集中管理
- 修改 SEO 策略只需一处更新
- 类型安全，自动补全
- 支持页面级自定义

**缺点:**
- 需要理解工厂函数模式

**方案 B: 创建 SEO 配置对象**
1. 创建 `/lib/seo-config.ts`
2. 导出不同页面的 SEO 配置对象
3. 各页面直接使用配置对象

**优点:**
- 简单直观

**缺点:**
- 仍有重复的 `generateMetadata` 函数逻辑
- 配置和生成逻辑分离

**推荐:** ✅ **方案 A**

**详细实施步骤 (方案 A):**

**步骤 1: 创建 SEO 类型定义**
```bash
mkdir -p lib/seo
```

```typescript
// lib/seo/types.ts
export interface SEOConfig {
  // 基础信息
  title: string
  description: string
  keywords?: string[]

  // URL 和站点信息
  url?: string
  siteName?: string

  // 图片
  image?: string
  imageWidth?: number
  imageHeight?: number
  imageAlt?: string

  // 作者和创建者
  author?: {
    name: string
    url: string
  }
  creator?: string

  // Open Graph 自定义
  ogTitle?: string
  ogDescription?: string

  // Twitter 自定义
  twitterTitle?: string
  twitterDescription?: string

  // 其他
  locale?: string
  type?: "website" | "article"

  // 索引控制
  noIndex?: boolean
  noFollow?: boolean
}
```

**步骤 2: 创建默认配置**
```typescript
// lib/seo/config.ts
import { SEOConfig } from "./types"

export const DEFAULT_SEO_CONFIG = {
  siteName: "Sanhe Hu Portfolio",
  author: {
    name: "Sanhe Hu",
    url: "https://sanhe.me",
  },
  creator: "Sanhe Hu",
  locale: "en_US",
  image: "https://sh-img-cdn.sanhe.me/projects/sanhe-me/2025-07-30-Sanhe-Profile-Photo-1920x1920-v01.webp",
  imageWidth: 1920,
  imageHeight: 1920,
  type: "website" as const,
}

export const COMMON_KEYWORDS = [
  "Sanhe Hu",
  "Solution Architect",
  "Full Stack Developer",
  "AWS",
  "Python",
  "TypeScript",
  "Next.js",
  "System Design",
]
```

**步骤 3: 创建元数据生成函数**
```typescript
// lib/seo/generateMetadata.ts
import { Metadata } from "next"
import { SEOConfig } from "./types"
import { DEFAULT_SEO_CONFIG, COMMON_KEYWORDS } from "./config"

export function generateSEOMetadata(config: SEOConfig): Metadata {
  // 合并默认配置和页面配置
  const mergedConfig = {
    ...DEFAULT_SEO_CONFIG,
    ...config,
    keywords: config.keywords
      ? [...new Set([...COMMON_KEYWORDS, ...config.keywords])]
      : COMMON_KEYWORDS,
  }

  const {
    title,
    description,
    keywords,
    url,
    siteName,
    image,
    imageWidth,
    imageHeight,
    imageAlt,
    author,
    creator,
    ogTitle,
    ogDescription,
    twitterTitle,
    twitterDescription,
    locale,
    type,
    noIndex,
    noFollow,
  } = mergedConfig

  return {
    title,
    description,
    keywords,
    authors: author ? [author] : undefined,
    creator,

    openGraph: {
      title: ogTitle || title,
      description: ogDescription || description,
      url: url || author?.url,
      siteName,
      images: image
        ? [{
            url: image,
            width: imageWidth,
            height: imageHeight,
            alt: imageAlt || title,
          }]
        : undefined,
      locale,
      type,
    },

    twitter: {
      card: "summary_large_image",
      title: twitterTitle || title,
      description: twitterDescription || description,
      images: image ? [image] : undefined,
    },

    robots: {
      index: !noIndex,
      follow: !noFollow,
      googleBot: {
        index: !noIndex,
        follow: !noFollow,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  }
}
```

**步骤 4: 更新首页 SEO**
```typescript
// app/page.tsx (或 app/(marketing)/page.tsx 如果完成了任务 1.3)
import { Metadata } from "next"
import { generateSEOMetadata } from "@/lib/seo/generateMetadata"
import HomePageContent from "./HomePageContent"

export async function generateMetadata(): Promise<Metadata> {
  return generateSEOMetadata({
    title: "Sanhe Hu - Solution Architect & Builder",
    description: "Solution Architect and Builder specializing in AWS cloud solutions, system design, and full-stack development. Experienced in Python, TypeScript, and scalable architectures.",
    keywords: [
      "Cloud Architecture",
      "Serverless",
      "Infrastructure as Code",
      "Data Engineering",
    ],
    url: "https://sanhe.me",
    imageAlt: "Sanhe Hu - Solution Architect & Full Stack Developer",
  })
}

export default function HomePage() {
  return <HomePageContent />
}
```

**步骤 5: 更新 Projects 页面 SEO**
```typescript
// app/projects/page.tsx
import { Metadata } from "next"
import { generateSEOMetadata } from "@/lib/seo/generateMetadata"
import ProjectsClient from "./projects-client"

export async function generateMetadata(): Promise<Metadata> {
  return generateSEOMetadata({
    title: "Projects - Sanhe Hu",
    description: "Explore innovative projects and solutions built by Sanhe Hu, including AI applications, cloud architectures, and developer tools.",
    keywords: [
      "Portfolio Projects",
      "Open Source",
      "AI Applications",
      "Cloud Solutions",
    ],
    url: "https://sanhe.me/projects",
    ogTitle: "Innovative Projects by Sanhe Hu",
    imageAlt: "Sanhe Hu's Project Portfolio",
  })
}

export default function ProjectsPage() {
  return <ProjectsClient />
}
```

**步骤 6: 更新项目详情页 SEO**
```typescript
// app/projects/30-voice-ai-solution-challenge/page.tsx
import { Metadata } from "next"
import { generateSEOMetadata } from "@/lib/seo/generateMetadata"
import VoiceAIChallengeContent from "./VoiceAIChallengeContent"

export async function generateMetadata(): Promise<Metadata> {
  return generateSEOMetadata({
    title: "30 Voice AI Solutions Challenge - Sanhe Hu",
    description: "A comprehensive exploration of 30 AI-powered voice solutions designed to enhance professional productivity across various industries.",
    keywords: [
      "AI Voice Solutions",
      "Productivity Tools",
      "Voice AI",
      "Professional Automation",
    ],
    url: "https://sanhe.me/projects/30-voice-ai-solution-challenge",
    ogTitle: "30 Voice AI Solutions for Professionals",
    imageAlt: "30 Voice AI Solutions Challenge Project",
    type: "article",
  })
}

export default function VoiceAIChallengePage() {
  return <VoiceAIChallengeContent />
}
```

**步骤 7: 简化 app/layout.tsx**
```typescript
// app/layout.tsx
import { Metadata } from "next"
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"
import { generateSEOMetadata } from "@/lib/seo/generateMetadata"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" })

// 根布局的默认元数据（会被页面级元数据覆盖）
export const metadata: Metadata = generateSEOMetadata({
  title: "Sanhe Hu - Solution Architect & Builder",
  description: "Solution Architect and Builder specializing in AWS cloud solutions.",
  url: "https://sanhe.me",
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

**验证步骤:**
- [ ] `npm run build` - 确认无错误
- [ ] 访问每个页面，查看浏览器标签标题
- [ ] 使用浏览器开发者工具检查 `<head>` 中的 meta 标签
- [ ] 使用 [Open Graph Debugger](https://www.opengraph.xyz/) 验证 OG 标签
- [ ] 使用 [Twitter Card Validator](https://cards-dev.twitter.com/validator) 验证 Twitter 卡片

**预计时间:** 1-1.5 小时

**削减代码量:** ~250 行

---

### 任务 1.5: 抽象背景特效组件

**问题描述:**
背景特效在 3 个文件中以不同形式重复:
1. `HomePageContent.tsx` (行 76-82) - 使用 Spotlight 组件
2. `projects-client.tsx` (行 25-29) - 渐变背景
3. `VoiceAIChallengeContent.tsx` (行 52-55) - 渐变背景

**修改方案:**

**方案 A (推荐): 创建统一的 BackgroundEffects 组件**
1. 创建 `/app/_components/layouts/BackgroundEffects.tsx`
2. 支持不同的特效类型（spotlight, gradient, particles）
3. 在路由组布局中使用（如果完成了任务 1.3）

**优点:**
- 背景特效统一管理
- 支持多种特效类型
- 易于全局修改

**缺点:**
- 需要配置不同的特效参数

**方案 B: 保持现状，因为特效较简单**

**优点:**
- 无需额外工作

**缺点:**
- 修改背景需要多处更新

**推荐:** ✅ **方案 A** (如果计划长期维护)，🔸 **方案 B** (如果背景特效很少改动)

**详细实施步骤 (方案 A):**

**步骤 1: 创建 BackgroundEffects 组件**
```tsx
// app/_components/layouts/BackgroundEffects.tsx
interface BackgroundEffectsProps {
  variant?: "default" | "minimal" | "spotlight"
}

export default function BackgroundEffects({ variant = "default" }: BackgroundEffectsProps) {
  if (variant === "minimal") {
    return null
  }

  if (variant === "spotlight") {
    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Spotlight implementation */}
      </div>
    )
  }

  // Default gradient
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[600px] h-[400px] bg-gradient-radial from-primary/8 via-primary/4 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-gradient-radial from-secondary/6 via-secondary/3 to-transparent rounded-full blur-2xl" />
    </div>
  )
}
```

**步骤 2: 在布局中使用**
```tsx
// app/(marketing)/layout.tsx
import Navigation from "@/app/_components/layouts/Navigation"
import BackgroundEffects from "@/app/_components/layouts/BackgroundEffects"

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      <BackgroundEffects variant="default" />
      <main className="min-h-screen bg-background">
        {children}
      </main>
    </>
  )
}
```

**步骤 3: 从各页面删除背景代码**
- 删除 `HomePageContent.tsx` 中的行 76-82
- 删除 `projects-client.tsx` 中的行 25-29
- 删除 `VoiceAIChallengeContent.tsx` 中的行 52-55

**验证步骤:**
- [ ] `npm run dev`
- [ ] 访问所有页面，确认背景特效显示正常
- [ ] 测试不同屏幕尺寸下的背景效果

**预计时间:** 30 分钟

**削减代码量:** ~40 行

---

## 🎯 优先级 2: 组件拆分和重构 (中优先级)

### 任务 2.1: 拆分 HomePageContent.tsx (444行 → 3个组件)

**问题描述:**
`HomePageContent.tsx` 包含 444 行代码，包含多个逻辑区块:
- Hero 区域 (行 136-240)
- 成就统计区域 (行 314-371)
- 联系/CTA 区域 (行 373-439)

**修改方案:**

**方案 A (推荐): 拆分成 3 个独立组件**
1. 创建 `app/(marketing)/_components/Hero.tsx` (~120行)
2. 创建 `app/(marketing)/_components/StatsSection.tsx` (~80行)
3. 创建 `app/(marketing)/_components/ContactSection.tsx` (~80行)
4. `HomePageContent.tsx` 简化为组合这 3 个组件 (~30行)

**文件结构:**
```
app/(marketing)/
├── _components/
│   ├── Hero.tsx           # 新建
│   ├── StatsSection.tsx   # 新建
│   └── ContactSection.tsx # 新建
├── HomePageContent.tsx    # 简化
└── page.tsx
```

**优点:**
- 每个组件职责单一
- 易于测试和维护
- 可以在其他页面复用

**缺点:**
- 文件数量增加
- 需要移动数据定义

**方案 B: 仅抽象统计卡片和 CTA**
1. 创建 `app/_components/sections/StatsCard.tsx`
2. 创建 `app/_components/sections/CTASection.tsx`
3. `HomePageContent.tsx` 仍然包含 Hero

**优点:**
- 改动较小
- 复用最频繁的部分

**缺点:**
- `HomePageContent.tsx` 仍然较大

**推荐:** ✅ **方案 A** (彻底重构)，🔸 **方案 B** (快速优化)

**详细实施步骤 (方案 A):**

**步骤 1: 移动统计数据到独立文件**
```bash
mkdir -p data
```

```typescript
// data/achievement-stats.ts
import { IconType } from "react-icons"
import { FaGithub, FaDownload, FaMedal, FaProjectDiagram, FaCode, FaUsers } from "react-icons/fa"

export interface AchievementStat {
  number: string
  description: string
  color: string
  borderColor: string
  glowColor: string
  icon: IconType
  href: string
}

export const achievementStats: AchievementStat[] = [
  {
    number: "150+",
    description: "Open Source Python Libraries",
    color: "text-blue-400",
    borderColor: "border-blue-400/30",
    glowColor: "shadow-[0_0_20px_rgba(96,165,250,0.3)]",
    icon: FaGithub,
    href: "https://github.com/MacHu-GWU?tab=repositories",
  },
  // ... 其他统计项
]
```

**步骤 2: 创建 Hero 组件**
```tsx
// app/(marketing)/_components/Hero.tsx
"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl"
      >
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient-x">
          Sanhe Hu
        </h1>

        <p className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground mb-8">
          Solution Architect & Builder
        </p>

        <p className="text-base sm:text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          Passionate about building scalable solutions with AWS, Python, and modern web technologies.
          Specializing in system design, infrastructure as code, and full-stack development.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/projects"
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
          >
            View Projects
          </Link>

          <Link
            href="/chat"
            className="px-8 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-all duration-200 font-medium"
          >
            Chat with AI Assistant
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
```

**步骤 3: 创建 StatsSection 组件**
```tsx
// app/(marketing)/_components/StatsSection.tsx
"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { achievementStats } from "@/data/achievement-stats"

export default function StatsSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
        >
          Achievements & Impact
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievementStats.map((stat, index) => {
            const IconComponent = stat.icon
            const isClickable = stat.href && stat.href.trim() !== ""

            const cardContent = (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`
                  bg-card/50 backdrop-blur-sm p-8 rounded-xl border-2
                  ${stat.borderColor} ${stat.glowColor}
                  transition-all duration-300 h-full flex flex-col
                  ${isClickable ? 'cursor-pointer hover:shadow-2xl' : ''}
                `}
              >
                <div className="flex items-center justify-center mb-4">
                  <IconComponent className={`${stat.color} text-4xl`} />
                </div>

                <h3 className={`text-4xl font-bold mb-2 text-center ${stat.color}`}>
                  {stat.number}
                </h3>

                <p className="text-muted-foreground text-center text-sm leading-relaxed">
                  {stat.description}
                </p>
              </motion.div>
            )

            if (isClickable) {
              return (
                <Link
                  key={index}
                  href={stat.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  {cardContent}
                </Link>
              )
            }

            return <div key={index}>{cardContent}</div>
          })}
        </div>
      </div>
    </section>
  )
}
```

**步骤 4: 创建 ContactSection 组件**
```tsx
// app/(marketing)/_components/ContactSection.tsx
"use client"

import { motion } from "framer-motion"
import { Mail, MessageSquare } from "lucide-react"

export default function ContactSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 relative mb-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center"
      >
        <div className="bg-card/30 backdrop-blur-sm border-2 border-primary/20 rounded-2xl p-8 sm:p-12 shadow-[0_0_30px_rgba(var(--primary),0.1)]">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Let's Build Something Great
          </h2>

          <p className="text-muted-foreground mb-8 text-lg">
            Have a project in mind? Let's discuss how we can work together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:contact@sanhe.me"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
            >
              <Mail className="w-5 h-5" />
              Email Me
            </a>

            <a
              href="/chat"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-all duration-200 font-medium"
            >
              <MessageSquare className="w-5 h-5" />
              Start a Chat
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
```

**步骤 5: 简化 HomePageContent.tsx**
```tsx
// app/(marketing)/HomePageContent.tsx
"use client"

import Hero from "./_components/Hero"
import StatsSection from "./_components/StatsSection"
import ContactSection from "./_components/ContactSection"

export default function HomePageContent() {
  return (
    <div className="min-h-screen bg-background pt-16">
      <Hero />
      <StatsSection />
      <ContactSection />
    </div>
  )
}
```

**验证步骤:**
- [ ] `npm run dev`
- [ ] 访问首页，确认所有区域正常显示
- [ ] 测试统计卡片悬停效果
- [ ] 测试链接跳转
- [ ] 测试移动端响应式布局
- [ ] 测试动画效果

**预计时间:** 2-3 小时

**文件变化:**
- 新增 3 个组件文件
- 新增 1 个数据文件
- 简化 1 个主文件 (444行 → 30行)

---

### 任务 2.2: 拆分 VoiceAIChallengeContent.tsx (304行 → 多个组件)

**问题描述:**
`VoiceAIChallengeContent.tsx` 包含 304 行代码，包含:
- 卡片渲染逻辑 (行 74-194)
- CTA 区域 (行 196-252)
- 模态框 (行 254-299)

**修改方案:**

**方案 A (推荐): 拆分成独立组件**
1. 创建 `SolutionCard.tsx` - 单个解决方案卡片
2. 创建 `SolutionGrid.tsx` - 卡片网格
3. 创建 `SolutionModal.tsx` - 解决方案详情模态框
4. 使用 shadcn/ui 的 Dialog 组件替代自定义模态框

**优点:**
- 组件可复用
- 使用标准 UI 组件库
- 代码更清晰

**缺点:**
- 需要理解 Dialog 组件 API

**方案 B: 仅抽象卡片组件**
1. 创建 `SolutionCard.tsx`
2. 保留模态框在主文件中

**优点:**
- 改动较小

**缺点:**
- 主文件仍然较大

**推荐:** ✅ **方案 A**

**详细实施步骤 (方案 A):**

**步骤 1: 创建 SolutionCard 组件**
```tsx
// app/projects/30-voice-ai-solution-challenge/_components/SolutionCard.tsx
"use client"

import { motion } from "framer-motion"
import { SolutionItem } from "../data"

interface SolutionCardProps {
  solution: SolutionItem
  index: number
  onClick: () => void
}

export default function SolutionCard({ solution, index, onClick }: SolutionCardProps) {
  const Icon = solution.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, scale: 1.02 }}
      onClick={onClick}
      className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 cursor-pointer hover:shadow-xl h-full flex flex-col"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-foreground mb-1 line-clamp-2">
            {solution.title}
          </h3>
          <span className="text-sm text-primary font-medium">
            {solution.category}
          </span>
        </div>
      </div>

      <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
        {solution.shortDescription}
      </p>

      <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
        <span>{solution.difficulty}</span>
        <span>Click for details →</span>
      </div>
    </motion.div>
  )
}
```

**步骤 2: 创建 SolutionModal 组件**
```bash
# 如果还没安装 shadcn/ui Dialog
npx shadcn-ui@latest add dialog
```

```tsx
// app/projects/30-voice-ai-solution-challenge/_components/SolutionModal.tsx
"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { SolutionItem } from "../data"

interface SolutionModalProps {
  solution: SolutionItem | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function SolutionModal({ solution, open, onOpenChange }: SolutionModalProps) {
  if (!solution) return null

  const Icon = solution.icon

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon className="w-8 h-8 text-primary" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-2xl mb-2">
                {solution.title}
              </DialogTitle>
              <div className="flex gap-2 text-sm text-muted-foreground">
                <span className="text-primary font-medium">{solution.category}</span>
                <span>•</span>
                <span>{solution.difficulty}</span>
              </div>
            </div>
          </div>
        </DialogHeader>

        <DialogDescription className="text-base text-foreground space-y-4">
          <div>
            <h4 className="font-semibold text-lg mb-2">Overview</h4>
            <p>{solution.detailedDescription}</p>
          </div>

          {solution.features && solution.features.length > 0 && (
            <div>
              <h4 className="font-semibold text-lg mb-2">Key Features</h4>
              <ul className="list-disc list-inside space-y-1">
                {solution.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {solution.technicalDetails && (
            <div>
              <h4 className="font-semibold text-lg mb-2">Technical Details</h4>
              <p>{solution.technicalDetails}</p>
            </div>
          )}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
```

**步骤 3: 简化 VoiceAIChallengeContent.tsx**
```tsx
// app/projects/30-voice-ai-solution-challenge/VoiceAIChallengeContent.tsx
"use client"

import { useState } from "react"
import { solutions, SolutionItem } from "./data"
import SolutionCard from "./_components/SolutionCard"
import SolutionModal from "./_components/SolutionModal"

export default function VoiceAIChallengeContent() {
  const [selectedSolution, setSelectedSolution] = useState<SolutionItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCardClick = (solution: SolutionItem) => {
    setSelectedSolution(solution)
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            30 Voice AI Solutions for Professionals
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A comprehensive collection of AI-powered voice solutions designed to enhance productivity across various professional domains.
          </p>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((solution, index) => (
              <SolutionCard
                key={solution.id}
                solution={solution}
                index={index}
                onClick={() => handleCardClick(solution)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-card/30 backdrop-blur-sm border-2 border-primary/20 rounded-2xl p-8 sm:p-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Interested in Implementing These Solutions?
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Let's discuss how these AI voice solutions can transform your workflow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:contact@sanhe.me"
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all"
              >
                Contact Me
              </a>
              <a
                href="/chat"
                className="px-8 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-all"
              >
                Chat with AI
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <SolutionModal
        solution={selectedSolution}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </div>
  )
}
```

**验证步骤:**
- [ ] `npm run dev`
- [ ] 访问项目详情页
- [ ] 点击卡片，确认模态框打开
- [ ] 测试模态框关闭（点击背景、ESC 键、关闭按钮）
- [ ] 测试移动端模态框滚动

**预计时间:** 1.5-2 小时

**削减代码量:** 主文件从 304行 → ~150行

---

### 任务 2.3: 从 MultimodalInput.tsx 拆分 SuggestedActions 组件

**问题描述:**
`components/chat/multimodal-input.tsx` 包含 203 行代码，其中建议问题的渲染逻辑可以独立成组件

**修改方案:**

**方案 A (推荐): 创建独立的 SuggestedActions 组件**
1. 创建 `components/chat/SuggestedActions.tsx`
2. 移动建议问题的状态和渲染逻辑
3. 通过 props 传递 `onSuggestionClick` 回调

**优点:**
- 职责分离
- 易于测试
- 可以在其他地方复用建议问题

**缺点:**
- 文件数量增加

**方案 B: 保持现状**

**优点:**
- 无需额外工作

**缺点:**
- 组件稍大

**推荐:** ✅ **方案 A** (如果计划扩展聊天功能)

**预计时间:** 30 分钟

---

## 🎯 优先级 3: 数据分离和类型安全 (中优先级)

### 任务 3.1: 迁移项目数据到独立文件

**问题描述:**
项目数据硬编码在 `projects-client.tsx` 中

**修改方案:**

**方案 A (推荐): 创建 data/projects.ts**
1. 创建 `/data/projects.ts`
2. 定义 Project 类型
3. 导出项目数据数组
4. 更新 `projects-client.tsx` 导入数据

**优点:**
- 数据与 UI 分离
- 易于添加新项目
- 可以从 CMS 或 API 加载数据

**缺点:**
- 需要额外的导入

**推荐:** ✅ **方案 A**

**详细实施步骤:**

```typescript
// data/projects.ts
export interface Project {
  id: string
  title: string
  description: string
  status: "Active" | "Completed" | "Planning"
  image: string
  href: string
  color: "primary" | "secondary" | "accent"
}

export const projects: Project[] = [
  {
    id: "the-30-voice-30-ai-solutions-for-professionals-challenge",
    title: "The 30 Voice, 30 AI Solutions for Professionals Challenge",
    description: "A comprehensive exploration of 30 AI-powered voice solutions...",
    status: "Active",
    image: "https://sh-img-cdn.sanhe.me/projects/sanhe-me/...",
    href: "/projects/30-voice-ai-solution-challenge",
    color: "primary",
  },
  // 未来可以添加更多项目
]
```

**预计时间:** 15 分钟

---

### 任务 3.2: 创建全局类型定义文件

**问题描述:**
类型定义分散在各个文件中

**修改方案:**

**方案 A (推荐): 创建 types/index.ts**
1. 创建 `/types/index.ts`
2. 定义所有共享类型
3. 从各文件导入类型

**优点:**
- 类型集中管理
- 易于查找和复用
- 提升类型安全

**缺点:**
- 需要更新导入路径

**推荐:** ✅ **方案 A**

**详细实施步骤:**

```typescript
// types/index.ts
import { IconType } from "react-icons"

// 项目相关类型
export interface Project {
  id: string
  title: string
  description: string
  status: "Active" | "Completed" | "Planning"
  image: string
  href: string
  color: "primary" | "secondary" | "accent"
}

// 统计数据类型
export interface AchievementStat {
  number: string
  description: string
  color: string
  borderColor: string
  glowColor: string
  icon: IconType
  href: string
}

// SEO 类型
export interface SEOConfig {
  title: string
  description: string
  keywords?: string[]
  url?: string
  image?: string
  imageAlt?: string
  // ... 其他字段
}

// 导航类型
export interface NavItem {
  label: string
  href: string
}

// 聊天消息类型
export interface Message {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  createdAt?: Date
}
```

**预计时间:** 30 分钟

---

## 🎯 优先级 4: 长期优化 (低优先级)

### 任务 4.1: 评估并删除未使用的 UI 组件

**问题描述:**
`components/ui/` 包含 52 个 shadcn/ui 组件，可能有未使用的组件

**修改方案:**

**方案 A (推荐): 使用工具检测未使用的组件**
1. 使用 `npx depcheck` 检测未使用的依赖
2. 手动检查各组件的使用情况
3. 删除未使用的组件

**优点:**
- 减少包大小
- 简化项目结构

**缺点:**
- 可能误删未来需要的组件

**推荐:** ✅ 暂时保留所有组件，仅在确认不需要时删除

**预计时间:** 1 小时

---

### 任务 4.2: 拆分 sidebar.tsx (763行)

**问题描述:**
`components/ui/sidebar.tsx` 包含 763 行代码，是项目中最大的文件

**修改方案:**

**方案 A: 拆分成多个子组件**
1. 分析 sidebar.tsx 的结构
2. 拆分成独立的子组件文件

**方案 B: 保持现状（这是 shadcn/ui 的标准组件）**

**推荐:** ✅ **方案 B** - sidebar.tsx 是 shadcn/ui 的标准组件，建议保持原样

**预计时间:** N/A

---

### 任务 4.3: 性能优化

**优化方向:**
1. 图片懒加载
2. 代码分割和动态导入
3. 使用 React.memo 优化重渲染
4. 添加 loading 状态

**预计时间:** 3-5 小时

---

## 📋 执行计划建议

### 第一阶段: 快速优化 (1-2 天)
**目标:** 消除最明显的重复代码
- [ ] 任务 1.1: 删除重复的 use-mobile Hook (15分钟)
- [ ] 任务 1.2: 删除重复的 use-toast Hook (15分钟)
- [ ] 任务 1.5: 抽象背景特效组件 (30分钟)
- [ ] 任务 3.1: 迁移项目数据到独立文件 (15分钟)

**预计时间:** 1.5 小时
**削减代码:** ~150 行

---

### 第二阶段: 核心重构 (3-5 天)
**目标:** 抽象导航和 SEO，建立共享布局
- [ ] 任务 1.3: 创建统一的 Navigation 组件 + 路由组 (1-2小时)
- [ ] 任务 1.4: 创建统一的 SEO 元数据生成函数 (1-1.5小时)
- [ ] 任务 2.1: 拆分 HomePageContent.tsx (2-3小时)

**预计时间:** 4-6.5 小时
**削减代码:** ~400 行

---

### 第三阶段: 深度优化 (1 周)
**目标:** 完善组件拆分和类型定义
- [ ] 任务 2.2: 拆分 VoiceAIChallengeContent.tsx (1.5-2小时)
- [ ] 任务 2.3: 从 MultimodalInput 拆分 SuggestedActions (30分钟)
- [ ] 任务 3.2: 创建全局类型定义文件 (30分钟)

**预计时间:** 2.5-3 小时

---

### 第四阶段: 长期维护 (持续)
**目标:** 性能优化和代码质量提升
- [ ] 任务 4.1: 评估未使用的组件 (1小时)
- [ ] 任务 4.3: 性能优化 (3-5小时)

**预计时间:** 4-6 小时

---

## 📊 预期成果

### 代码行数对比
| 类别 | 重构前 | 重构后 | 减少 |
|------|--------|--------|------|
| 导航代码 | ~180行 (重复3次) | ~80行 (1个组件) | **-100行** |
| SEO 配置 | ~320行 (重复4次) | ~120行 (1个函数+配置) | **-200行** |
| Hooks 重复 | ~140行 (重复2次) | ~70行 | **-70行** |
| 背景特效 | ~60行 (重复3次) | ~30行 | **-30行** |
| 大组件拆分 | ~750行 (2个大组件) | ~450行 (多个小组件) | **-300行** |
| **总计** | | | **~700行** |

### 文件结构对比
| 指标 | 重构前 | 重构后 |
|------|--------|--------|
| 最大文件行数 | 763行 (sidebar.tsx, 第三方) | ~200行 |
| 组件平均行数 | ~150行 | ~80行 |
| 代码重复度 | 高 (多处重复) | 低 (单一来源) |
| 可维护性 | ⭐⭐⭐ (3/5) | ⭐⭐⭐⭐ (4/5) |

---

## ⚠️ 注意事项

### 测试清单
每次重构后必须测试:
- [ ] `npm run dev` 成功启动
- [ ] `npm run build` 成功构建
- [ ] 所有页面正常显示
- [ ] 导航链接正确跳转
- [ ] 移动端响应式布局正常
- [ ] SEO meta 标签正确
- [ ] 动画效果正常
- [ ] 无控制台错误

### Git 最佳实践
- ✅ 每个任务创建独立的 commit
- ✅ 使用描述性的 commit 信息
- ✅ 重大重构前创建备份分支
- ✅ 使用 `git mv` 移动文件以保留历史

### 回滚计划
如果重构出现问题:
1. `git log` 查看最近的提交
2. `git revert <commit-hash>` 回滚特定提交
3. `git reset --hard <commit-hash>` 硬重置到某个版本 (谨慎使用)

---

## 🎯 总结

### 最高优先级任务 (必做)
1. ✅ 删除重复的 Hooks (15分钟 × 2)
2. ✅ 创建统一的 Navigation 组件 (1-2小时)
3. ✅ 创建统一的 SEO 配置 (1-1.5小时)

**预计时间:** 3-4 小时
**预计收益:** 削减 ~400 行重复代码，大幅提升可维护性

### 推荐执行顺序
1. 快速优化 (第一阶段) - 立即执行
2. 核心重构 (第二阶段) - 本周内完成
3. 深度优化 (第三阶段) - 下周完成
4. 长期维护 (第四阶段) - 持续进行

---

**生成时间:** 2025-11-02
**下次更新:** 完成第一阶段后更新此文档
