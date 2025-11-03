import { Metadata } from "next"
import VoiceAIChallengeContent from "./VoiceAIChallengeContent"

// =====================================
// SEO 配置区域 - 方便修改 SEO 信息
// =====================================
const SEO_CONFIG = {
  // 页面标题 - 显示在浏览器标签和搜索结果中
  title: "The 30 Voice, 30 AI Solutions for Professionals Challenge - Sanhe Hu | Innovation in AI Solutions",
  // 页面描述 - 显示在搜索结果摘要中，影响点击率
  description: "The 30 Voice, 30 AI Solutions for Professionals Challenge - A build-in-public journey interviewing 30 professional leaders and co-creating 30 AI solutions together. Follow this innovative project by Sanhe Hu.",
  // 关键词数组 - 帮助搜索引擎理解页面内容
  keywords: ["30 Voice AI Challenge", "AI Solutions", "Build in Public", "Voice AI", "Professional Leaders", "Innovation", "Sanhe Hu", "AI Products", "Technology Challenge", "Collaborative AI"],
  // 作者信息 - 标识内容创作者
  author: { name: "Sanhe Hu", url: "https://sanhe.me" },
  // 内容创建者 - 用于搜索引擎识别
  creator: "Sanhe Hu",
  // 网站完整 URL - 用于社交分享和规范链接
  url: "https://sanhe.me/projects/30-voice-ai-solution-challenge",
  // 网站名称 - 在社交分享中显示
  siteName: "Sanhe Hu Portfolio",
  // OpenGraph 标题 - 社交平台分享时显示的标题
  ogTitle: "30 Voice AI Challenge - Building AI Solutions with Industry Leaders",
  // OpenGraph 描述 - 社交平台分享时显示的描述
  ogDescription: "Join the journey of interviewing 30 professional leaders and co-creating 30 AI solutions. A unique build-in-public challenge showcasing innovation in AI technology and collaborative problem-solving.",
  // 社交分享图片 - 分享到社交平台时显示的图片
  image: "https://sh-img-cdn.sanhe.me/projects/sanhe-me/projects/The-30-Voice-30-AI-Solutions-for-Professionals-Challenge-Cover-Image-v01.webp",
  // 图片尺寸 - 帮助社交平台正确显示图片
  imageWidth: 1200,
  imageHeight: 600,
  // 图片 alt 文本 - 图片的描述文字，提升无障碍体验
  imageAlt: "30 Voice AI Challenge - Visual Overview of the Build-in-Public AI Solutions Project",
  // Twitter 卡片标题 - Twitter 分享时的专用标题
  twitterTitle: "30 Voice AI Challenge - Building AI with Industry Leaders",
  // Twitter 卡片描述 - Twitter 分享时的专用描述
  twitterDescription: "Follow the build-in-public journey: 30 interviews with professional leaders, 30 AI solutions created together. Innovation in action!",
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
// Voice AI Challenge 页面服务器组件
// =====================================
export default function VoiceAIChallengePage() {
  return <VoiceAIChallengeContent />
}