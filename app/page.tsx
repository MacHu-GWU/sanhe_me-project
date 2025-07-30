"use client"

import { useState, useEffect } from "react"
import { Github, Linkedin, BookOpen, Menu, X, Calendar, MessageCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const achievementStats = [
    {
      number: "160+",
      description: "Open Source Python Libraries",
      color: "text-primary",
      borderColor: "border-primary",
      glowColor: "shadow-primary/20",
    },
    {
      number: "10M+",
      description: "Monthly Downloads",
      color: "text-primary",
      borderColor: "border-primary",
      glowColor: "shadow-primary/20",
    },
    {
      number: "600+",
      description: "Open Source Solutions",
      color: "text-primary",
      borderColor: "border-primary",
      glowColor: "shadow-primary/20",
    },
    {
      number: "2000+",
      description: "Tech Blogs",
      color: "text-secondary",
      borderColor: "border-secondary",
      glowColor: "shadow-secondary/20",
    },
    {
      number: "3000+",
      description: "Git Commits per Year",
      color: "text-secondary",
      borderColor: "border-secondary",
      glowColor: "shadow-secondary/20",
    },
    {
      number: "40+",
      description: "Enterprise Clients as Solution Architect",
      color: "text-highlight",
      borderColor: "border-highlight",
      glowColor: "shadow-highlight/20",
    },
  ]

  return (
    <div className="min-h-screen bg-background text-text-primary font-inter relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Main radial gradient */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[600px] bg-gradient-radial from-primary/10 via-primary/5 to-transparent rounded-full blur-3xl"></div>

        {/* Secondary gradient */}
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-gradient-radial from-secondary/8 via-secondary/4 to-transparent rounded-full blur-2xl"></div>

        {/* Accent gradient */}
        <div className="absolute bottom-0 left-0 w-[500px] h-[300px] bg-gradient-radial from-highlight/6 via-highlight/3 to-transparent rounded-full blur-2xl"></div>

        {/* Scattered particles */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full opacity-60 animate-pulse"></div>
        <div
          className="absolute top-40 right-20 w-1 h-1 bg-secondary rounded-full opacity-40 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-60 left-1/4 w-1.5 h-1.5 bg-highlight rounded-full opacity-50 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-40 right-1/4 w-2 h-2 bg-contrast rounded-full opacity-30 animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute bottom-20 left-16 w-1 h-1 bg-primary rounded-full opacity-50 animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute top-1/2 right-10 w-1 h-1 bg-secondary rounded-full opacity-40 animate-pulse"
          style={{ animationDelay: "2.5s" }}
        ></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-primary/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-16">
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <Link
                href="/"
                className="text-primary font-medium hover:text-highlight transition-colors duration-200 hover:glow-primary"
              >
                Home
              </Link>
              <Link href="/projects" className="text-text-secondary hover:text-primary transition-colors duration-200">
                Projects
              </Link>
            </div>

            {/* Mobile Navigation Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-text-primary hover:text-primary transition-colors duration-200"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-primary/20">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link
                  href="/"
                  className="block px-3 py-2 text-primary font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/projects"
                  className="block px-3 py-2 text-text-secondary hover:text-primary transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Projects
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            {/* Profile Image */}
            <div className="mb-8">
              {/* 
                Container div that defines the actual rendered size:
                - w-32 h-32 = 128px × 128px on mobile (Tailwind: 1 unit = 4px, so 32 × 4 = 128px)
                - sm:w-40 sm:h-40 = 160px × 160px on desktop (40 × 4 = 160px) 
                - mx-auto = margin-left: auto; margin-right: auto; (centers horizontally)
                - rounded-full = border-radius: 50%; (makes it circular)
                - border-2 = 2px solid border
                - border-primary = uses CSS custom property --primary color
                - shadow-lg = large drop shadow
                - shadow-primary/30 = shadow color is primary at 30% opacity
                - hover:shadow-primary/50 = on hover, shadow becomes 50% opacity
                - transition-all duration-300 = smooth 300ms animation for all property changes
                - overflow-hidden = clips content that exceeds the circular boundary
              */}
              <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto rounded-full border-2 border-primary shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 overflow-hidden">
                <Image
                  src="/2025-07-30-Sanhe-Profile-Photo-1920x1920.webp"
                  alt="Sanhe Hu Profile Photo"
                  // Next.js Image optimization dimensions in PIXELS (not Tailwind units):
                  // - width={160} = tells Next.js the intended display width is 160 pixels
                  // - height={160} = tells Next.js the intended display height is 160 pixels
                  // These values are used by Next.js for:
                  // 1. Automatic image optimization and resizing
                  // 2. Generating responsive srcSet for different screen densities
                  // 3. Preventing Cumulative Layout Shift (CLS) by reserving space
                  // 4. Should match the largest container size (desktop: 160px)
                  width={160}
                  height={160}
                  // Tailwind classes for responsive behavior:
                  // - w-full = width: 100%; (fills container width: 128px mobile, 160px desktop)
                  // - h-full = height: 100%; (fills container height: 128px mobile, 160px desktop)  
                  // - object-cover = object-fit: cover; (maintains aspect ratio, crops if needed)
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Name and Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-text-primary via-primary to-highlight bg-clip-text text-transparent drop-shadow-2xl">
              Sanhe Hu
            </h1>
            <p className="text-xl sm:text-2xl text-text-secondary mb-8 font-medium">
              <span className="text-secondary">Solution Architect</span>,{" "}
              <span className="text-highlight">Builder</span>
            </p>

            {/* Social Icons */}
            <div className="flex justify-center space-x-6">
              <a
                href="#"
                className="w-8 h-8 text-text-secondary hover:text-primary transition-all duration-300 hover:scale-110 hover:drop-shadow-lg hover:shadow-primary/50"
                aria-label="GitHub"
              >
                <Github size={32} className="hover:fill-current filter hover:drop-shadow-lg" />
              </a>
              <a
                href="#"
                className="w-8 h-8 text-text-secondary hover:text-primary transition-all duration-300 hover:scale-110 hover:drop-shadow-lg hover:shadow-primary/50"
                aria-label="LinkedIn"
              >
                <Linkedin size={32} className="hover:fill-current filter hover:drop-shadow-lg" />
              </a>
              <a
                href="#"
                className="w-8 h-8 text-text-secondary hover:text-primary transition-all duration-300 hover:scale-110 hover:drop-shadow-lg hover:shadow-primary/50"
                aria-label="Blog"
              >
                <BookOpen size={32} className="hover:fill-current filter hover:drop-shadow-lg" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Achievement Stats Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievementStats.map((stat, index) => (
              <div
                key={index}
                className={`bg-regular-button/80 backdrop-blur-sm ${stat.borderColor} border-2 rounded-xl p-6 text-center hover:scale-105 transition-all duration-300 hover:shadow-lg ${stat.glowColor} hover:bg-regular-button/90 group`}
              >
                <div
                  className={`text-3xl sm:text-4xl font-bold mb-2 ${stat.color} drop-shadow-lg group-hover:drop-shadow-xl transition-all duration-300`}
                >
                  {stat.number}
                </div>
                <div className="text-text-secondary text-sm sm:text-base group-hover:text-text-primary transition-colors duration-300">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-regular-button/10 to-background"></div>
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-gradient-to-r from-cta-button to-primary hover:from-primary hover:to-highlight text-text-primary font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cta-button/40 flex items-center gap-2 border border-primary/20">
              <Calendar size={20} />
              Schedule a Meeting
            </button>
            <button className="bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-background font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30 flex items-center gap-2">
              <MessageCircle size={20} />
              Join Discord Community
            </button>
          </div>
        </div>
      </section>

      {/* Footer Spacing */}
      <div className="h-16"></div>
    </div>
  )
}
