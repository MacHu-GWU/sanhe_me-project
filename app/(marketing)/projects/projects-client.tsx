"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Sparkles } from "lucide-react"

export default function ProjectsClient() {
  const projects = [
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
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-text-primary via-primary to-highlight bg-clip-text text-transparent">
            My Projects
          </h1>
          <p className="text-xl sm:text-2xl text-text-secondary mb-8">
            Building innovative solutions and sharing the journey
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={project.href}
                className="group block bg-regular-button/80 backdrop-blur-sm border border-primary/30 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02]"
              >
                {/* Project Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary/20 backdrop-blur-sm text-primary px-3 py-1 rounded-full text-sm font-medium border border-primary/30">
                      <Sparkles size={16} className="inline mr-1" />
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-primary mb-3 group-hover:text-highlight transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed mb-4">
                    {project.description}
                  </p>
                  
                  <div className="flex items-center text-primary group-hover:text-highlight transition-colors duration-200">
                    <span className="text-sm font-medium">Learn More</span>
                    <ArrowRight size={16} className="ml-2 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-regular-button/10 to-background"></div>
        <div className="max-w-4xl mx-auto text-center relative">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-text-primary via-primary to-highlight bg-clip-text text-transparent">
            More Projects Coming Soon
          </h2>
          <p className="text-lg text-text-secondary mb-8">
            I'm constantly working on new projects and experiments. Follow my journey to see what's next!
          </p>
          
          <Link
            href="/"
            className="bg-gradient-to-r from-cta-button to-primary hover:from-primary hover:to-highlight text-text-primary font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cta-button/40 inline-flex items-center gap-2"
          >
            Back to Home
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Footer Spacing */}
      <div className="h-16"></div>
    </div>
  )
}