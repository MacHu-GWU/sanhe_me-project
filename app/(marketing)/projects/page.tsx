import type { Metadata } from "next"
import { generateSEOMetadata } from "@/lib/seo/generateMetadata"
import ProjectsClient from "./projects-client"

export async function generateMetadata(): Promise<Metadata> {
  return generateSEOMetadata({
    title: "Projects - Sanhe Hu | Open Source & Enterprise Solutions",
    description: "Explore Sanhe Hu's portfolio of innovative projects including the 30 Voice AI Solutions Challenge, open source Python libraries, enterprise architectures, and cutting-edge technical solutions.",
    keywords: [
      "AI Solutions",
      "Voice AI Challenge",
      "Open Source Projects",
      "Python Libraries",
      "Enterprise Architecture",
      "Technical Solutions",
      "Build in Public",
    ],
    url: "https://sanhe.me/projects",
    ogTitle: "Projects - Sanhe Hu | Innovation in AI & Open Source",
    ogDescription: "Discover innovative projects from solution architect Sanhe Hu, including the ambitious 30 Voice AI Solutions Challenge and enterprise-grade technical solutions.",
    imageAlt: "Sanhe Hu Projects Portfolio",
    twitterTitle: "Projects - Sanhe Hu | AI & Open Source Innovation",
    twitterDescription: "Explore cutting-edge projects including the 30 Voice AI Solutions Challenge and enterprise technical solutions.",
  })
}

export default function ProjectsPage() {
  return <ProjectsClient />
}
