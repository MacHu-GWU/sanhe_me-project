"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, X } from "lucide-react"
import { projectData, ProjectSection } from "./data"

// Simple markdown-to-HTML converter for basic formatting
function parseMarkdown(text: string): string {
  let html = text
    // Headers (process in order: h3, h2, h1)
    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold text-primary mb-3 mt-6">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold text-primary mb-4 mt-8">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold text-primary mb-4 mt-6">$1</h1>')
    // Bold and italic
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-text-primary">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    // Code blocks (basic)
    .replace(/`([^`]+)`/g, '<code class="bg-primary/10 text-primary px-2 py-1 rounded text-sm">$1</code>')

  // Handle lists
  const lines = html.split('\n')
  let processedLines: string[] = []
  let inList = false
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const isListItem = line.match(/^- (.+)$/)
    
    if (isListItem) {
      if (!inList) {
        processedLines.push('<ul class="list-disc list-inside space-y-1 mb-4 ml-4">')
        inList = true
      }
      processedLines.push(`<li class="mb-1 text-text-secondary">${isListItem[1]}</li>`)
    } else {
      if (inList) {
        processedLines.push('</ul>')
        inList = false
      }
      processedLines.push(line)
    }
  }
  
  if (inList) {
    processedLines.push('</ul>')
  }
  
  // Rejoin and handle paragraphs
  return processedLines
    .join('\n')
    .split('\n\n')
    .map(paragraph => {
      paragraph = paragraph.trim()
      if (!paragraph) return ''
      if (paragraph.startsWith('<h') || paragraph.startsWith('<ul') || paragraph.startsWith('<li')) {
        return paragraph
      }
      return `<p class="text-text-secondary leading-relaxed mb-4">${paragraph}</p>`
    })
    .filter(p => p)
    .join('\n')
}

export default function VoiceAIChallengePage() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null)

  const openModal = (id: string) => {
    setSelectedCard(id)
  }

  const closeModal = () => {
    setSelectedCard(null)
  }

  const selectedSection = projectData.find(section => section.id === selectedCard)

  // Handle escape key for modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedCard) {
        closeModal()
      }
    }
    
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [selectedCard])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedCard) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedCard])

  return (
    <div className="min-h-screen bg-background text-text-primary font-inter relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[600px] h-[400px] bg-gradient-radial from-primary/8 via-primary/4 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-gradient-radial from-secondary/6 via-secondary/3 to-transparent rounded-full blur-2xl"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-primary/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-16">
            <div className="flex space-x-8">
              <Link href="/" className="text-text-secondary hover:text-primary transition-colors duration-200">
                Home
              </Link>
              <Link href="/projects" className="text-text-secondary hover:text-primary transition-colors duration-200">
                Projects
              </Link>
              <span className="text-primary font-medium">Voice AI Challenge</span>
            </div>
          </div>
        </div>
      </nav>

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
            30-Day Voice AI Solution Challenge
          </h1>
          <p className="text-xl text-text-secondary mb-8">
            Join developers worldwide in building the future of{" "}
            <span className="text-secondary">voice AI technology</span>
          </p>
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
            {projectData.map((section, index) => {
              const isEven = index % 2 === 0
              const IconComponent = section.icon

              return (
                <div
                  key={section.id}
                  className={`relative ${isEven ? 'lg:pr-8 lg:text-right' : 'lg:pl-8 lg:text-left'}`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background z-10 hidden lg:block">
                    <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-20"></div>
                  </div>

                  {/* Card */}
                  <div
                    className={`bg-regular-button/80 backdrop-blur-sm border border-primary/30 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02] ${isEven ? 'lg:mr-12' : 'lg:ml-12'}`}
                  >
                    {/* Card Header */}
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                            <IconComponent size={24} className="text-primary" />
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-semibold text-primary mb-2">
                            {section.title}
                          </h3>
                          <p className="text-text-secondary leading-relaxed mb-4">
                            {section.description}
                          </p>
                          
                          <button
                            onClick={() => openModal(section.id)}
                            className="bg-primary/20 hover:bg-primary/30 text-primary px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
                          >
                            More Details
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-regular-button/10 to-background"></div>
        <div className="max-w-4xl mx-auto text-center relative">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-text-primary via-primary to-highlight bg-clip-text text-transparent">
            Ready to Shape the Future of Voice AI?
          </h2>
          <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
            Join hundreds of developers in this groundbreaking challenge. Applications are open for the next cohort.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://linkedin.com/in/sanhehu"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-cta-button to-primary hover:from-primary hover:to-highlight text-text-primary font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cta-button/40"
            >
              Connect on LinkedIn
            </a>
            <a
              href="https://github.com/MacHu-GWU"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent border-2 border-secondary text-secondary hover:bg-secondary hover:text-background font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-secondary/30"
            >
              View My Work
            </a>
          </div>
        </div>
      </section>

      {/* Modal Overlay */}
      {selectedCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closeModal}
          />
          
          {/* Modal Content */}
          <div className="relative bg-regular-button/95 backdrop-blur-md border border-primary/30 rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden shadow-2xl shadow-primary/20">
            {/* Modal Header */}
            <div className="flex items-start justify-between p-6 border-b border-primary/20">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                    {selectedSection && <selectedSection.icon size={24} className="text-primary" />}
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-primary mb-2">
                    {selectedSection?.title}
                  </h2>
                  <p className="text-text-secondary">
                    {selectedSection?.description}
                  </p>
                </div>
              </div>
              
              <button
                onClick={closeModal}
                className="text-text-secondary hover:text-primary transition-colors duration-200 p-2 hover:bg-primary/10 rounded-lg"
              >
                <X size={24} />
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="overflow-y-auto max-h-[60vh] p-6">
              {selectedSection && (
                <div 
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ 
                    __html: parseMarkdown(selectedSection.content) 
                  }}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer Spacing */}
      <div className="h-16"></div>
    </div>
  )
}