"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import dynamic from "next/dynamic"
import { ArrowLeft } from "lucide-react"
import { projectData } from "./data"
import SolutionCard from "./_components/SolutionCard"
import ProjectCTA from "./_components/ProjectCTA"

// 动态导入 MarkdownModal - 只在用户点击卡片时才加载此组件
const MarkdownModal = dynamic(() => import("@/app/_components/common/MarkdownModal"), {
  ssr: false, // Modal 是交互式组件，无需服务端渲染
})

export default function VoiceAIChallengeContent() {
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null)

  const selectedSection = projectData.find(section => section.id === selectedCardId)

  return (
    <div className="min-h-screen bg-background text-text-primary font-inter relative overflow-hidden pt-16">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[600px] h-[400px] bg-gradient-radial from-primary/8 via-primary/4 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-gradient-radial from-secondary/6 via-secondary/3 to-transparent rounded-full blur-2xl"></div>
      </div>

      {/* Header Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-primary transition-colors duration-200 mb-6"
          >
            <ArrowLeft size={20} />
            Back to Projects
          </Link>

          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-text-primary via-primary to-highlight bg-clip-text text-transparent">
            The 30 Voice, 30 AI Solutions for Professionals Challenge
          </h1>
          <p className="text-xl text-text-secondary mb-8">
            A build-in-public challenge: interviewing <span className="text-secondary">30 professional leaders</span> and co-creating <span className="text-secondary">30 AI solutions</span> together.
          </p>
        </div>
      </section>

      {/* Project Cover Image */}
      <section className="pb-8 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden border border-primary/20 shadow-lg shadow-primary/10 bg-gradient-to-br from-regular-button/60 to-regular-button/40 backdrop-blur-sm">
            <Image
              src="https://sh-img-cdn.sanhe.me/projects/sanhe-me/projects/The-30-Voice-30-AI-Solutions-for-Professionals-Challenge-Cover-Image-v01.webp"
              alt="The 30 Voice, 30 AI Solutions for Professionals Challenge - Visual Overview"
              width={1200}
              height={600}
              className="w-full h-auto object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent pointer-events-none"></div>
          </div>
        </div>
      </section>

      {/* Cards Timeline */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto relative">
          {/* Curved Path SVG */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 pointer-events-none hidden lg:block">
            <svg
              className="w-full h-full"
              viewBox="0 0 2 100"
              preserveAspectRatio="none"
              fill="none"
            >
              <path
                d="M1 0 Q1.5 25 0.5 50 Q-0.5 75 1 100"
                stroke="url(#gradient)"
                strokeWidth="0.1"
                fill="none"
                className="opacity-30"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="var(--primary)" />
                  <stop offset="50%" stopColor="var(--secondary)" />
                  <stop offset="100%" stopColor="var(--highlight)" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Cards */}
          <div className="space-y-8">
            {projectData.map((section, index) => (
              <SolutionCard
                key={section.id}
                section={section}
                index={index}
                onCardClick={setSelectedCardId}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <ProjectCTA />

      {/* Markdown Modal */}
      <MarkdownModal
        isOpen={!!selectedCardId}
        onClose={() => setSelectedCardId(null)}
        title={selectedSection?.title || ""}
        description={selectedSection?.description}
        content={selectedSection?.content || ""}
        icon={selectedSection?.icon}
      />

      {/* Footer Spacing */}
      <div className="h-16"></div>
    </div>
  )
}
