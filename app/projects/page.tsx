"use client"

import Link from "next/link"
import { ArrowLeft, Github, ExternalLink } from "lucide-react"

export default function ProjectsPage() {
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
              <Link
                href="/projects"
                className="text-primary font-medium hover:text-highlight transition-colors duration-200"
              >
                Projects
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Projects Content */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-text-secondary hover:text-primary transition-colors duration-200 mb-6"
            >
              <ArrowLeft size={20} />
              Back to Home
            </Link>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-text-primary via-primary to-highlight bg-clip-text text-transparent">
              Projects
            </h1>
            <p className="text-xl text-text-secondary">
              A showcase of my <span className="text-secondary">open source contributions</span> and{" "}
              <span className="text-highlight">enterprise solutions</span>
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((project) => (
              <div
                key={project}
                className="bg-regular-button/80 backdrop-blur-sm border border-primary/30 rounded-xl p-6 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:bg-regular-button/90 group"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-primary group-hover:text-highlight transition-colors duration-300">
                    Project {project}
                  </h3>
                  <div className="flex gap-2">
                    <a href="#" className="text-text-secondary hover:text-primary transition-colors duration-200">
                      <Github size={20} />
                    </a>
                    <a href="#" className="text-text-secondary hover:text-secondary transition-colors duration-200">
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>
                <p className="text-text-secondary mb-4 group-hover:text-text-primary transition-colors duration-300">
                  Description of the project and its key features. This is a placeholder for actual project content.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full border border-primary/30">
                    Python
                  </span>
                  <span className="px-2 py-1 bg-secondary/20 text-secondary text-xs rounded-full border border-secondary/30">
                    TypeScript
                  </span>
                  <span className="px-2 py-1 bg-highlight/20 text-highlight text-xs rounded-full border border-highlight/30">
                    React
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
