"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { BookOpen } from "lucide-react"
import { FaGithub, FaLinkedin } from "react-icons/fa"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
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
  )
}
