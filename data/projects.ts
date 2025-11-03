export interface Project {
  id: string
  title: string
  description: string
  status: string
  image: string
  href: string
  color: string
}

export const projects: Project[] = [
  {
    id: "the-30-voice-30-ai-solutions-for-professionals-challenge",
    title: "The 30 Voice, 30 AI Solutions for Professionals Challenge",
    description: "A build-in-public challenge: interviewing 30 professional leaders and co-creating 30 AI solutions together.",
    status: "Active",
    image: "https://sh-img-cdn.sanhe.me/projects/sanhe-me/projects/The-30-Voice-30-AI-Solutions-for-Professionals-Challenge-Cover-Image-v01.webp",
    href: "/projects/30-voice-ai-solution-challenge",
    color: "primary"
  },
]
