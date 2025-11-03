import { Metadata } from "next"
import { generateSEOMetadata } from "@/lib/seo/generateMetadata"
import VoiceAIChallengeContent from "./VoiceAIChallengeContent"

export async function generateMetadata(): Promise<Metadata> {
  return generateSEOMetadata({
    title: "The 30 Voice, 30 AI Solutions for Professionals Challenge - Sanhe Hu | Innovation in AI Solutions",
    description: "The 30 Voice, 30 AI Solutions for Professionals Challenge - A build-in-public journey interviewing 30 professional leaders and co-creating 30 AI solutions together. Follow this innovative project by Sanhe Hu.",
    keywords: [
      "30 Voice AI Challenge",
      "AI Solutions",
      "Build in Public",
      "Voice AI",
      "Professional Leaders",
      "Innovation",
      "AI Products",
      "Technology Challenge",
      "Collaborative AI",
    ],
    url: "https://sanhe.me/projects/30-voice-ai-solution-challenge",
    image: "https://sh-img-cdn.sanhe.me/projects/sanhe-me/projects/The-30-Voice-30-AI-Solutions-for-Professionals-Challenge-Cover-Image-v01.webp",
    imageWidth: 1200,
    imageHeight: 600,
    imageAlt: "30 Voice AI Challenge - Visual Overview of the Build-in-Public AI Solutions Project",
    ogTitle: "30 Voice AI Challenge - Building AI Solutions with Industry Leaders",
    ogDescription: "Join the journey of interviewing 30 professional leaders and co-creating 30 AI solutions. A unique build-in-public challenge showcasing innovation in AI technology and collaborative problem-solving.",
    twitterTitle: "30 Voice AI Challenge - Building AI with Industry Leaders",
    twitterDescription: "Follow the build-in-public journey: 30 interviews with professional leaders, 30 AI solutions created together. Innovation in action!",
    type: "article",
  })
}

export default function VoiceAIChallengePage() {
  return <VoiceAIChallengeContent />
}
