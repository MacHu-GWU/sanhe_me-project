import { Metadata } from "next"
import HomePageContent from "./HomePageContent"

// =====================================
// SEO 配置区域 - 方便修改 SEO 信息
// =====================================
const SEO_CONFIG = {
  // 页面标题 - 显示在浏览器标签和搜索结果中
  title: "Sanhe Hu - Solution Architect & Builder",
  // 页面描述 - 显示在搜索结果摘要中，影响点击率
  description: "Solution Architect and Open Source Developer with 150+ Python libraries, 10M+ monthly downloads, and 600+ repositories. Specialized in cloud architecture, AI, and enterprise solutions.",
  // 关键词数组 - 帮助搜索引擎理解页面内容
  keywords: ["Sanhe Hu", "Solution Architect", "Open Source Developer", "Python Libraries", "Cloud Architecture", "AWS", "Enterprise Solutions", "Automation", "Software Engineering", "Tech Leadership"],
  // 作者信息 - 标识内容创作者
  author: { name: "Sanhe Hu", url: "https://sanhe.me" },
  // 内容创建者 - 用于搜索引擎识别
  creator: "Sanhe Hu",
  // 网站完整 URL - 用于社交分享和规范链接
  url: "https://sanhe.me",
  // 网站名称 - 在社交分享中显示
  siteName: "Sanhe Hu Portfolio",
  // OpenGraph 标题 - 社交平台分享时显示的标题
  ogTitle: "Sanhe Hu - Solution Architect & Open Source Builder",
  // OpenGraph 描述 - 社交平台分享时显示的描述
  ogDescription: "Experienced Solution Architect and prolific Open Source Developer. Creator of 160+ Python libraries with 10M+ monthly downloads. Specialized in cloud architecture, automation, and enterprise solutions.",
  // 社交分享图片 - 分享到社交平台时显示的图片
  image: "https://sh-img-cdn.sanhe.me/projects/sanhe-me/2025-07-30-Sanhe-Profile-Photo-1920x1920-v01.webp",
  // 图片尺寸 - 帮助社交平台正确显示图片
  imageWidth: 1920,
  imageHeight: 1920,
  // 图片 alt 文本 - 图片的描述文字，提升无障碍体验
  imageAlt: "Sanhe Hu Profile Photo - Solution Architect & BUilder",
  // Twitter 卡片标题 - Twitter 分享时的专用标题
  twitterTitle: "Sanhe Hu - Solution Architect & Builder",
  // Twitter 卡片描述 - Twitter 分享时的专用描述
  twitterDescription: "Solution Architect and Open Source Developer with 160+ Python libraries, 10M+ monthly downloads, and 600+ repositories. Specialized in cloud architecture, AI, and enterprise solutions.",
  // 页面语言和地区 - 帮助搜索引擎理解内容语言
  locale: "en_US"
}

// =====================================
// 生成 SEO 元数据
// =====================================
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: SEO_CONFIG.title,
    description: SEO_CONFIG.description,
    keywords: SEO_CONFIG.keywords,
    authors: [SEO_CONFIG.author],
    creator: SEO_CONFIG.creator,
    openGraph: {
      title: SEO_CONFIG.ogTitle,
      description: SEO_CONFIG.ogDescription,
      url: SEO_CONFIG.url,
      siteName: SEO_CONFIG.siteName,
      images: [
        {
          url: SEO_CONFIG.image,
          width: SEO_CONFIG.imageWidth,
          height: SEO_CONFIG.imageHeight,
          alt: SEO_CONFIG.imageAlt,
        }
      ],
      locale: SEO_CONFIG.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: SEO_CONFIG.twitterTitle,
      description: SEO_CONFIG.twitterDescription,
      images: [SEO_CONFIG.image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  }
}

// =====================================
// 首页服务器组件
// =====================================
export default function HomePage() {
  return <HomePageContent />
}


