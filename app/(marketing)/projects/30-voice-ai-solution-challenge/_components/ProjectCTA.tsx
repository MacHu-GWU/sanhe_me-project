"use client"

export default function ProjectCTA() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-background via-regular-button/10 to-background"></div>
      <div className="max-w-4xl mx-auto text-center relative">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-text-primary via-primary to-highlight bg-clip-text text-transparent">
          What's Next?
        </h2>
        <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
          Ready to get involved? Choose your path and join this exciting journey.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {/* FAQ Button - Highlighted */}
          <a
            href="https://sanhehu.atlassian.net/wiki/spaces/SHPB/pages/530251781/30+Voices+30+AI+Products+Challenge+-+FAQ"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-highlight text-background font-semibold py-4 px-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/40 text-center group"
          >
            <div className="text-lg font-bold mb-1">FAQ</div>
            <div className="text-sm opacity-90">Get Answers</div>
          </a>

          {/* Topic List Button */}
          <a
            href="https://docs.google.com/spreadsheets/d/1vIl5MCGvksAMShWFTbFCZIHjOuZAOsauXQNFuAxSeuE/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-background font-semibold py-4 px-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30 text-center group"
          >
            <div className="text-base font-bold mb-1">Topic List</div>
            <div className="text-sm opacity-80">Browse Domains</div>
          </a>

          {/* Apply Button */}
          <a
            href="https://forms.gle/iPWreajqos52gXpo8"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-transparent border-2 border-secondary text-secondary hover:bg-secondary hover:text-background font-semibold py-4 px-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-secondary/30 text-center group"
          >
            <div className="text-base font-bold mb-1">Apply</div>
            <div className="text-sm opacity-80">Join as Guest</div>
          </a>

          {/* AI Gallery Button */}
          <a
            href="https://sanhehu.atlassian.net/wiki/spaces/SHPB/pages/530120707/30+Voices+30+AI+Products+Challenge+-+AI+Solutions+Gallery"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-transparent border-2 border-secondary text-secondary hover:bg-secondary hover:text-background font-semibold py-4 px-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-secondary/30 text-center group"
          >
            <div className="text-base font-bold mb-1">AI Gallery</div>
            <div className="text-sm opacity-80">Get Inspired</div>
          </a>
        </div>
      </div>
    </section>
  )
}
