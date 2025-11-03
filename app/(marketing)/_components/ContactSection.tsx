"use client"

import { Mail, MessageCircle } from "lucide-react"
import { FaLinkedin } from "react-icons/fa"

export default function ContactSection() {
  return (
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
  )
}
