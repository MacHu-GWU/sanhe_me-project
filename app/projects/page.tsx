import type { Metadata } from "next"
import ProjectsClient from "./projects-client"

export const metadata: Metadata = {
  title: "Projects - Sanhe Hu | Open Source & Enterprise Solutions",
  description: "Explore Sanhe Hu's portfolio of innovative projects including the 30 Voice AI Solutions Challenge, open source Python libraries, enterprise architectures, and cutting-edge technical solutions.",
  keywords: ["Sanhe Hu projects", "AI Solutions", "Voice AI Challenge", "Open Source Projects", "Python Libraries", "Enterprise Architecture", "Technical Solutions", "Build in Public"],
  authors: [{ name: "Sanhe Hu", url: "https://sanhe.me" }],
  creator: "Sanhe Hu",
  openGraph: {
    title: "Projects - Sanhe Hu | Innovation in AI & Open Source",
    description: "Discover innovative projects from solution architect Sanhe Hu, including the ambitious 30 Voice AI Solutions Challenge and enterprise-grade technical solutions.",
    url: "https://sanhe.me/projects",
    siteName: "Sanhe Hu Portfolio",
    images: [
      {
        url: "/2025-07-30-Sanhe-Profile-Photo-1920x1920.webp",
        width: 1920,
        height: 1920,
        alt: "Sanhe Hu Projects Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects - Sanhe Hu | AI & Open Source Innovation",
    description: "Explore cutting-edge projects including the 30 Voice AI Solutions Challenge and enterprise technical solutions.",
    images: ["/2025-07-30-Sanhe-Profile-Photo-1920x1920.webp"],
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

export default function ProjectsPage() {
  return <ProjectsClient />
}