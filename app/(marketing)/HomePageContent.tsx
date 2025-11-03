"use client"

import { useState, useEffect } from "react"
import { BookOpen, Calendar, MessageCircle, Download, PenTool, GitCommit, Building2, Mail } from "lucide-react"
import { FaGithub, FaLinkedin, FaPython } from "react-icons/fa"
import Link from "next/link"
import Image from "next/image"
import { Spotlight } from "@/components/ui/spotlight"

export default function HomePageContent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const achievementStats = [
    {
      number: "150+",
      description: "Open Source Python Libraries",
      color: "text-primary",
      borderColor: "border-primary",
      glowColor: "shadow-primary/20",
      icon: FaPython,
      href: "https://pypi.org/user/machugwu/",
    },
    {
      number: "10M+",
      description: "Monthly Downloads",
      color: "text-primary",
      borderColor: "border-primary",
      glowColor: "shadow-primary/20",
      icon: Download,
      href: "https://github.com/MacHu-GWU",
    },
    {
      number: "600+",
      description: "Open Source Solutions",
      color: "text-primary",
      borderColor: "border-primary",
      glowColor: "shadow-primary/20",
      icon: FaGithub,
      href: "https://github.com/MacHu-GWU?tab=repositories",
    },
    {
      number: "2000+",
      description: "Tech Blogs",
      color: "text-secondary",
      borderColor: "border-secondary",
      glowColor: "shadow-secondary/20",
      icon: PenTool,
      href: "",
    },
    {
      number: "3000+",
      description: "Git Commits per Year",
      color: "text-secondary",
      borderColor: "border-secondary",
      glowColor: "shadow-secondary/20",
      icon: GitCommit,
      href: "https://github.com/MacHu-GWU",
    },
    {
      number: "40+",
      description: "Enterprise Clients as Solution Architect",
      color: "text-highlight",
      borderColor: "border-highlight",
      glowColor: "shadow-highlight/20",
      icon: Building2,
      href: "",
    },
  ]

  return (
    <div className="min-h-screen bg-background text-text-primary font-inter relative overflow-hidden pt-16">
      {/* Spotlight Background Effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
        <Spotlight className="top-10 left-full h-[80vh] w-[50vw]" fill="#00bfff" />
        <Spotlight className="top-28 left-80 h-[80vh] w-[50vw]" fill="#87ceeb" />
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} flex flex-col lg:flex-row gap-8 lg:gap-12 items-start`}
          >
            {/* Left Column - Profile */}
            <div className="w-full lg:w-1/3 flex-shrink-0">
              {/* Profile Image */}
              <div className="mb-6 flex justify-center">
                <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full border-2 border-primary shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 overflow-hidden">
                  <Image
                    src="https://sh-img-cdn.sanhe.me/projects/sanhe-me/2025-07-30-Sanhe-Profile-Photo-1920x1920-v01.webp"
                    alt="Sanhe Hu Profile Photo"
                    width={192}
                    height={192}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Name and Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-text-primary via-primary to-highlight bg-clip-text text-transparent drop-shadow-2xl text-center">
                Sanhe Hu
              </h1>
              <p className="text-lg sm:text-xl text-text-secondary mb-6 font-medium text-center">
                <span className="text-secondary">Builder</span>,{" "}
                <span className="text-highlight">Solution Architect</span>,{" "}
                <span className="text-primary">Open Source</span>
              </p>

              {/* Social Icons */}
              <div className="flex justify-center space-x-6 mb-8">
                <a
                  href="https://github.com/MacHu-GWU"
                  className="w-8 h-8 text-text-secondary hover:text-primary transition-all duration-300 hover:scale-110 hover:drop-shadow-lg hover:shadow-primary/50"
                  aria-label="GitHub"
                >
                  <FaGithub size={32} className="hover:fill-current filter hover:drop-shadow-lg" />
                </a>
                <a
                  href="https://www.linkedin.com/in/sanhehu/"
                  className="w-8 h-8 text-text-secondary hover:text-primary transition-all duration-300 hover:scale-110 hover:drop-shadow-lg hover:shadow-primary/50"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={32} className="hover:fill-current filter hover:drop-shadow-lg" />
                </a>
                <a
                  href="https://sanhehu.atlassian.net/wiki/spaces/SHPB/overview"
                  className="w-8 h-8 text-text-secondary hover:text-primary transition-all duration-300 hover:scale-110 hover:drop-shadow-lg hover:shadow-primary/50"
                  aria-label="Blog"
                >
                  <BookOpen size={32} className="hover:fill-current filter hover:drop-shadow-lg" />
                </a>
              </div>

              {/* Code Block with Syntax Highlighting */}
              <div className="bg-[#0d1117] border border-primary/30 rounded-lg p-4 font-mono text-xs sm:text-sm overflow-x-auto shadow-lg">
                <pre className="text-left">
                  <code>
                    <span className="text-[#ff7b72]">class</span>{" "}
                    <span className="text-[#d2a8ff]">SanheHu</span>
                    <span className="text-text-primary">:</span>
                    {"\n    "}
                    <span className="text-text-primary">roles</span>{" "}
                    <span className="text-[#ff7b72]">=</span>{" "}
                    <span className="text-text-primary">[</span>
                    {"\n        "}
                    <span className="text-[#a5d6ff]">"AI Solution Architect"</span>
                    <span className="text-text-primary">,</span>{" "}
                    <span className="text-[#8b949e]"># Design systems and product</span>
                    {"\n        "}
                    <span className="text-[#a5d6ff]">"Full Stack Developer"</span>
                    <span className="text-text-primary">,</span>{" "}
                    <span className="text-[#8b949e]"># Backend and Frontend</span>
                    {"\n        "}
                    <span className="text-[#a5d6ff]">"Designer"</span>
                    <span className="text-text-primary">,</span>{" "}
                    <span className="text-[#8b949e]"># UX, Visual Design</span>
                    {"\n        "}
                    <span className="text-[#a5d6ff]">"DevOps Specialist"</span>
                    <span className="text-text-primary">,</span>{" "}
                    <span className="text-[#8b949e]"># Build infrastructure</span>
                    {"\n        "}
                    <span className="text-[#a5d6ff]">"Data Engineer"</span>
                    <span className="text-text-primary">,</span>{" "}
                    <span className="text-[#8b949e]"># Create pipelines</span>
                    {"\n        "}
                    <span className="text-[#a5d6ff]">"ML Engineer"</span>
                    <span className="text-text-primary">,</span>{" "}
                    <span className="text-[#8b949e]"># AI / ML integration</span>
                    {"\n        "}
                    <span className="text-[#a5d6ff]">"Open Source Maintainer"</span>
                    <span className="text-text-primary">,</span>{" "}
                    <span className="text-[#8b949e]"># Share knowledge</span>
                    {"\n    "}
                    <span className="text-text-primary">]</span>
                    {"\n\n    "}
                    <span className="text-[#ff7b72]">def</span>{" "}
                    <span className="text-[#d2a8ff]">deliver_project</span>
                    <span className="text-text-primary">(</span>
                    <span className="text-[#ffa657]">self</span>
                    <span className="text-text-primary">):</span>
                    {"\n        "}
                    <span className="text-[#8b949e]"># No meetings, no handoffs, no delays</span>
                    {"\n        "}
                    <span className="text-[#ff7b72]">return</span>{" "}
                    <span className="text-[#a5d6ff]">"Production-ready AI in weeks, not months"</span>
                  </code>
                </pre>
              </div>
            </div>

            {/* Right Column - About Me */}
            <div className="w-full lg:w-2/3 lg:pl-8">
              {/* About Me Heading */}
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-highlight bg-clip-text text-transparent">
                About Me
              </h2>

              {/* Intro */}
              <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                I'm a full-stack AI solution architect who eliminates the bottleneck by doing it all - from design to deployment, with no meetings, no handoffs, and no delays.
              </p>

              {/* Real Impact */}
              <h3 className="text-2xl font-bold text-primary mb-4">Real Impact:</h3>
              <ul className="space-y-3 mb-8 text-text-secondary">
                <li className="flex items-start">
                  <span className="text-xl mr-3">🏗️</span>
                  <span><strong className="text-text-primary">Multi-Agent Architecture:</strong> Built Multi-Agent platform serving 500M+ monthly requests</span>
                </li>
                <li className="flex items-start">
                  <span className="text-xl mr-3">📚</span>
                  <span><strong className="text-text-primary">Enterprise RAG:</strong> Deployed 100+ RAG systems processing 20K daily queries</span>
                </li>
                <li className="flex items-start">
                  <span className="text-xl mr-3">🔍</span>
                  <span><strong className="text-text-primary">AI Observability:</strong> Architected platform capturing 500K monthly AI inference call</span>
                </li>
                <li className="flex items-start">
                  <span className="text-xl mr-3">🌐</span>
                  <span><strong className="text-text-primary">Open Source:</strong> 150+ projects with 10M+ monthly downloads</span>
                </li>
              </ul>

              {/* What Sets Me Apart */}
              <h3 className="text-2xl font-bold text-secondary mb-4">What Sets Me Apart:</h3>
              <ul className="space-y-3 mb-8 text-text-secondary">
                <li className="flex items-start">
                  <span className="mr-3 text-primary">•</span>
                  <span><strong className="text-text-primary">Hands-On Architect:</strong> I write the code I design</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-primary">•</span>
                  <span><strong className="text-text-primary">Speed to Market:</strong> Ship production systems in 3 weeks (vs typical 3 months)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-primary">•</span>
                  <span><strong className="text-text-primary">Innovation Leader:</strong> Early MCP adopter - built it 6 months before official release</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-primary">•</span>
                  <span><strong className="text-text-primary">AWS Mastery:</strong> Expert across entire AWS stack - AI/ML, Data, Infrastructure, Security, DevOps</span>
                </li>
              </ul>

              {/* CTA */}
              <Link
                href="/chat"
                className="mt-8 p-5 bg-gradient-to-r from-highlight/20 via-primary/20 to-secondary/20 border-2 border-highlight rounded-lg block hover:from-highlight/30 hover:via-primary/30 hover:to-secondary/30 hover:border-highlight hover:scale-[1.03] transition-all duration-300 shadow-lg shadow-highlight/30 hover:shadow-xl hover:shadow-highlight/50 cursor-pointer group relative overflow-hidden"
              >
                {/* Animated background shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                <div className="relative z-10 text-center">
                  <p className="text-2xl text-highlight font-bold group-hover:text-primary transition-colors duration-300 drop-shadow-lg mb-2">
                    ✨ Chat with Virtual Sanhe
                    <span className="inline-block group-hover:translate-x-1 transition-transform duration-300 ml-2">→</span>
                  </p>
                  <p className="text-base text-text-primary/90 font-medium group-hover:text-text-primary transition-colors duration-300">
                    Explore my experience, projects, and discover what makes me different
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Achievement Stats Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievementStats.map((stat, index) => {
              const IconComponent = stat.icon
              const isClickable = stat.href && stat.href.trim() !== ""
              
              const cardContent = (
                <>
                  {/* Icon */}
                  <div className="flex justify-center mb-3">
                    <IconComponent 
                      size={24} 
                      className={`${stat.color} group-hover:scale-110 transition-all duration-300`}
                    />
                  </div>
                  
                  {/* Number */}
                  <div
                    className={`text-3xl sm:text-4xl font-bold mb-2 ${stat.color} drop-shadow-lg group-hover:drop-shadow-xl transition-all duration-300`}
                  >
                    {stat.number}
                  </div>
                  
                  {/* Description */}
                  <div className="text-text-secondary text-sm sm:text-base group-hover:text-text-primary transition-colors duration-300">
                    {stat.description}
                  </div>
                </>
              )

              if (isClickable) {
                return (
                  <Link
                    key={index}
                    href={stat.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block bg-regular-button/80 backdrop-blur-sm ${stat.borderColor} border-2 rounded-xl p-6 text-center hover:scale-105 transition-all duration-300 hover:shadow-lg ${stat.glowColor} hover:bg-regular-button/90 group cursor-pointer`}
                  >
                    {cardContent}
                  </Link>
                )
              } else {
                return (
                  <div
                    key={index}
                    className={`bg-regular-button/80 backdrop-blur-sm ${stat.borderColor} border-2 rounded-xl p-6 text-center transition-all duration-300 ${stat.glowColor} group`}
                  >
                    {cardContent}
                  </div>
                )
              }
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-regular-button/10 to-background"></div>
        <div className="max-w-4xl mx-auto text-center relative">
          {/* Section Title and Subtitle */}
          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-text-primary via-primary to-highlight bg-clip-text text-transparent">
              Let's Connect
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Ready to collaborate or discuss opportunities? Feel free to{" "}
              <a 
                href="mailto:sanhe@sanhe.me"
                className="text-secondary font-medium hover:text-secondary/80 transition-colors duration-200 underline decoration-secondary/50 hover:decoration-secondary/80"
              >
                send me an email
              </a>,{" "}
              <a 
                href="https://linkedin.com/in/sanhehu"
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary font-medium hover:text-primary/80 transition-colors duration-200 underline decoration-primary/50 hover:decoration-primary/80"
              >
                connect on LinkedIn
              </a>, or{" "}
              <a 
                href="https://discord.gg/PsRp27cpfB"
                target="_blank" 
                rel="noopener noreferrer"
                className="text-highlight font-medium hover:text-highlight/80 transition-colors duration-200 underline decoration-highlight/50 hover:decoration-highlight/80"
              >
                join my Discord community
              </a>{" "}
              for direct messages and real-time conversations.
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="mailto:sanhe@sanhe.me"
              className="bg-gradient-to-r from-cta-button to-primary hover:from-primary hover:to-highlight text-text-primary font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cta-button/40 flex items-center gap-2 border border-primary/20"
            >
              <Mail size={20} />
              Send me Email
            </a>
            <a
              href="https://linkedin.com/in/sanhehu"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent border-2 border-secondary text-secondary hover:bg-secondary hover:text-background font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-secondary/30 flex items-center gap-2"
            >
              <FaLinkedin size={20} />
              Connect on LinkedIn
            </a>
            <a
              href="https://discord.gg/PsRp27cpfB"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-background font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30 flex items-center gap-2"
            >
              <MessageCircle size={20} />
              Join Discord Community
            </a>
          </div>
        </div>
      </section>

      {/* Footer Spacing */}
      <div className="h-16"></div>
    </div>
  )
}