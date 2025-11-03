"use client"

import { ProjectSection } from "../data"

interface SolutionCardProps {
  section: ProjectSection
  index: number
  onCardClick: (id: string) => void
}

export default function SolutionCard({ section, index, onCardClick }: SolutionCardProps) {
  const isEven = index % 2 === 0
  const IconComponent = section.icon

  return (
    <div className={`relative ${isEven ? 'lg:pr-8' : 'lg:pl-8'}`}>
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
                onClick={() => onCardClick(section.id)}
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
}
