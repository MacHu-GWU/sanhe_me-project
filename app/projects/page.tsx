"use client"

import Link from "next/link"
import { ArrowLeft, Globe, BookOpen, Video, FileText, Eye, ArrowRight } from "lucide-react"
import { FaGithub } from "react-icons/fa"

// Project data array - Easy to manage and extend
const projects = [
  {
    enabled: true,
    title: "The 30 Voice, 30 AI Solutions for Professionals Challenge",
    description: "A build-in-public challenge: interviewing 30 professional leaders and co-creating 30 AI solutions together.",
    links: [
      { type: "details", url: "/projects/30-voice-ai-solution-challenge", icon: Eye, internal: true },
      // { type: "github", url: "https://github.com/MacHu-GWU/aws-cdk-example", icon: FaGithub },
      // { type: "docs", url: "https://docs.example.com", icon: BookOpen },
    ],
    tags: ["Build in Public", "AI Products", "Innovation"]
  },
  // {
  //   enabled: true,
  //   title: "Data Pipeline Framework",
  //   description: "High-performance ETL framework for processing large-scale data. Features parallel processing, error handling, data validation, and real-time monitoring. Designed for enterprise environments with support for various data sources and destinations.",
  //   links: [
  //     { type: "github", url: "https://github.com/MacHu-GWU/data-pipeline", icon: FaGithub },
  //     { type: "demo", url: "https://pipeline-demo.com", icon: Globe },
  //     { type: "video", url: "https://youtube.com/watch?v=example", icon: Video },
  //   ],
  //   tags: ["Python", "Apache Spark", "Data Engineering", "ETL", "Big Data"]
  // },
  // {
  //   enabled: true,
  //   title: "Microservices API Gateway",
  //   description: "Production-ready API gateway built with FastAPI and Docker. Includes rate limiting, authentication, load balancing, service discovery, and comprehensive logging. Deployed on Kubernetes with horizontal scaling capabilities.",
  //   links: [
  //     { type: "github", url: "https://github.com/MacHu-GWU/api-gateway", icon: FaGithub },
  //     { type: "demo", url: "https://api.example.com", icon: Globe },
  //     { type: "docs", url: "https://api-docs.example.com", icon: FileText },
  //   ],
  //   tags: ["Python", "FastAPI", "Docker", "Kubernetes", "Microservices"]
  // },
  // {
  //   enabled: true,
  //   title: "Machine Learning Platform",
  //   description: "End-to-end ML platform for model training, deployment, and monitoring. Features automated model versioning, A/B testing, performance tracking, and seamless integration with popular ML frameworks. Supports both batch and real-time inference.",
  //   links: [
  //     { type: "github", url: "https://github.com/MacHu-GWU/ml-platform", icon: FaGithub },
  //     { type: "demo", url: "https://ml-demo.example.com", icon: Globe },
  //     { type: "docs", url: "https://ml-docs.example.com", icon: BookOpen },
  //   ],
  //   tags: ["Python", "TensorFlow", "PyTorch", "MLOps", "AI/ML"]
  // },
  // {
  //   enabled: true,
  //   title: "Real-time Analytics Dashboard",
  //   description: "Interactive dashboard for real-time business intelligence. Built with React and D3.js, featuring customizable widgets, drill-down capabilities, and live data streaming. Integrates with multiple data sources and provides role-based access control.",
  //   links: [
  //     { type: "github", url: "https://github.com/MacHu-GWU/analytics-dashboard", icon: FaGithub },
  //     { type: "demo", url: "https://dashboard-demo.example.com", icon: Globe },
  //     { type: "video", url: "https://youtube.com/watch?v=dashboard-demo", icon: Video },
  //   ],
  //   tags: ["React", "TypeScript", "D3.js", "Analytics", "Dashboard"]
  // },
  // {
  //   enabled: true,
  //   title: "Distributed Cache System",
  //   description: "High-performance distributed caching solution with Redis clustering. Implements consistent hashing, automatic failover, data replication, and memory optimization. Provides client libraries for multiple programming languages with built-in monitoring.",
  //   links: [
  //     { type: "github", url: "https://github.com/MacHu-GWU/distributed-cache", icon: FaGithub },
  //     { type: "docs", url: "https://cache-docs.example.com", icon: FileText },
  //     { type: "demo", url: "https://cache-demo.example.com", icon: Globe },
  //   ],
  //   tags: ["Redis", "Go", "Distributed Systems", "Caching", "Performance"]
  // },
  // Add more projects here, or comment out projects to disable them
  // {
  //   enabled: false, // This project will not be displayed
  //   title: "Disabled Project",
  //   description: "This project is commented out and won't appear",
  //   links: [],
  //   tags: []
  // },
]

export default function ProjectsPage() {
  // Filter only enabled projects
  const enabledProjects = projects.filter(project => project.enabled)
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
            {enabledProjects.map((project, index) => (
              <div
                key={index}
                className="bg-regular-button/80 backdrop-blur-sm border border-primary/30 rounded-xl p-6 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:bg-regular-button/90 group"
              >
                {/* Project Header with Title and Links */}
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-primary group-hover:text-highlight transition-colors duration-300 flex-1 mr-4">
                    {project.title}
                  </h3>
                  <div className="flex gap-2 flex-shrink-0">
                    {project.links.map((link, linkIndex) => {
                      const IconComponent = link.icon
                      const isFirstLink = linkIndex === 0
                      const isInternal = link.internal || link.url.startsWith('/')
                      
                      if (isFirstLink) {
                        // Special "View Details" button for first link
                        return (
                          <Link
                            key={linkIndex}
                            href={link.url}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-primary to-secondary text-background text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-primary/30 group"
                            title="View Project Details"
                          >
                            <IconComponent size={16} className="group-hover:scale-110 transition-transform duration-200" />
                            <span className="hidden sm:inline">View</span>
                          </Link>
                        )
                      } else {
                        // Regular icon links for other links
                        const baseStyles = "transition-all duration-200 hover:scale-110 p-1.5 rounded-lg text-text-secondary hover:text-primary hover:bg-primary/5"
                        
                        if (isInternal) {
                          return (
                            <Link
                              key={linkIndex}
                              href={link.url}
                              className={baseStyles}
                              title={link.type}
                            >
                              <IconComponent size={18} />
                            </Link>
                          )
                        } else {
                          return (
                            <a
                              key={linkIndex}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={baseStyles}
                              title={link.type}
                            >
                              <IconComponent size={18} />
                            </a>
                          )
                        }
                      }
                    })}
                  </div>
                </div>
                
                {/* Project Description */}
                <p className="text-text-secondary mb-4 group-hover:text-text-primary transition-colors duration-300 leading-relaxed">
                  {project.description}
                </p>
                
                {/* Project Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => {
                    // Cycle through theme colors for tags
                    const colorClasses = [
                      "bg-primary/20 text-primary border-primary/30",
                      "bg-secondary/20 text-secondary border-secondary/30", 
                      "bg-highlight/20 text-highlight border-highlight/30"
                    ]
                    const colorClass = colorClasses[tagIndex % colorClasses.length]
                    
                    return (
                      <span
                        key={tagIndex}
                        className={`px-2 py-1 text-xs rounded-full border ${colorClass} transition-colors duration-200 hover:opacity-80`}
                      >
                        {tag}
                      </span>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
