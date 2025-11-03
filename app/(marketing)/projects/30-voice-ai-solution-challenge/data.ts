import { HelpCircle, Lightbulb, HandHeart, Calendar, Search, Code, ArrowRight } from "lucide-react"
import { ProjectSection } from "@/types"

export const projectData: ProjectSection[] = [
  {
    id: "whats-this-challenge-about",
    title: "What's This Challenge About?",
    description: "30 professionals, 30 custom AI tools, 18 months of transparent development - my most ambitious build-in-public project yet.",
    icon: Lightbulb,
    content: `
**12-18 months. $30K budget. 30 industry professionals. 30 free AI tools.**

I'm launching the most ambitious build-in-public challenge of my career, and I need your help to make it happen.

I'm going to select 30 workplace professionals from my LinkedIn network—spanning every industry I can reach—for deep-dive interviews about how AI could actually transform their daily work. Not surface-level conversations, but real exploration into the challenges that keep you up at night and the bottlenecks that eat your time.

**Here's my promise to each participant:** I'll build you a custom AI tool, completely free to use, based on exactly what you need. Then we'll co-author a blog post about the entire journey—your insights, my development process, everything transparent.

**The bigger picture?** I want to prove that AI can solve real problems for real people, not just impress other technologists.
    `
  },
  {
    id: "why-am-i-taking-on-this-challenge",
    title: "Why Am I Taking On This Challenge?",
    description: "From building AI tools only techies can use to creating solutions that actually help real professionals solve real problems.",
    icon: HelpCircle,
    content: `
As a solutions architect, I've been building AI tools since before ChatGPT made headlines. I've created hundreds of personal automation tools that make my life easier. But here's the problem I keep running into:

When I show these tools to friends and colleagues, I consistently hear:

- "Amazing for you, but way too complex for me"
- "I wouldn't even know where to start"
- "Cool demo, but how does this help *my* actual job?"

**That's my wake-up call.** Technical people build for technical people. I need to step outside my comfort zone and truly understand how non-technical professionals work, think, and solve problems.

We're living in an era where the "**Build in Public**" philosophy is flourishing, and I want to embrace this movement through my challenge. I believe in the power of transparent development - sharing not just the final products, but the entire journey: the struggles, the breakthroughs, the failed experiments, and the lessons learned. By making every aspect of this development process completely open and accessible, I hope to contribute to the growing community of builders who believe that openness leads to better solutions and stronger connections.
    `
  },
  {
    id: "whats-in-it-for-participants",
    title: "What's In It For Participants?",
    description: "Get a free custom AI tool built for your specific needs, plus potential commercial benefits and co-authoring opportunities.",
    icon: HandHeart,
    content: `
I deeply understand that time is every professional's most precious resource, so I need to ensure this interview is not only valuable for me, but also provides tangible returns for each participant. I believe true collaboration should be mutually beneficial, not one-sided information extraction. This challenge is designed from the ground up to create unique and lasting value for every guest.

- 🎯 **Custom AI Tool:** Each person will receive a personalized AI web application, specifically designed to solve their daily work challenges. I'll provide each user with $20 monthly free AI service credits to ensure they can use it long-term without burden.
- 💰 **Commercial Product Benefits:** If a commercial product is incubated based on a guest's ideas and industry knowledge, that guest will receive three years of free usage rights - a substantial return on their contribution.
- 📝 **Co-creation Opportunities:** With the guest's consent, we'll co-author blog posts sharing our creativity, industry insights, and development process, helping more people understand AI's application potential in their field.

These commitments ensure every collaboration is truly win-win, where participants not only contribute valuable industry insights but also receive practical technical solutions and brand exposure opportunities.
    `
  },
  {
    id: "my-specific-goals-and-timeline",
    title: "My Specific Goals & Timeline",
    description: "$30K investment, 12-18 month timeline, and a clear roadmap from interviews to commercial product validation.",
    icon: Calendar,
    content: `
This challenge isn't a spontaneous idea, but a strategic personal investment I've carefully planned. Through these 30 in-depth interviews, I hope to not only expand my understanding of different industries, but more importantly, validate AI technology's practical application potential across various fields. This is an important step in my transformation from pure technical expert to product innovator - each goal is carefully designed to ensure the entire process is both challenging and executable.

- 📅 **Timeline:**
  - Complete **30** in-depth **interviews** within **12-18 months**
  - Build and deliver **30** customized AI **products**
  - Select valuable solutions for continued optimization and iteration
- 💡 **Product Development Exploration:** Each custom tool will be evaluated for its commercialization potential. I'll attempt to develop the most valuable solutions into commercial tools for the public.
- 💰 **Resource Investment:** I've allocated a **$30,000** budget for this project to cover all technical costs and service fees throughout the process.

This investment scale reflects my serious commitment to this challenge while ensuring I have sufficient resources to provide high-quality solutions for each participant.
    `
  },
  {
    id: "how-ill-find-my-guests",
    title: "How I'll Find My Guests",
    description: "30 targeted industries, open applications, network recruitment, and complete transparency in the selection process.",
    icon: Search,
    content: `
Finding the right guests is crucial for this challenge's success. Rather than random interviews, I want to ensure coverage of as many industry sectors and professional roles as possible to gain the most comprehensive market insights. I've carefully developed a detailed list of 30 different professional domains, covering a broad range from traditional industries to emerging fields. I hope this systematic approach will help me build a truly diverse knowledge system.

- 🎯 [**30 Professional Domains List**](https://docs.google.com/spreadsheets/d/1vIl5MCGvksAMShWFTbFCZIHjOuZAOsauXQNFuAxSeuE/edit?usp=sharing)**:** I've preset 30 different professional domains, including but not limited to financial services, healthcare, education & training, manufacturing, retail & e-commerce, legal services, human resources, marketing, and other key industries.
- 🌐 **Open Participation Mechanism:** Anyone can view my public list and [actively apply to participate](https://forms.gle/iPWreajqos52gXpo8) or recommend suitable candidates. I believe in the power of crowdsourcing to help me find the most suitable guests.
- 🤝 **Network-Driven Recruitment:** I'll actively seek professionals within my LinkedIn network or ask friends to recommend industry experts they know.
- 📊 **Transparent Tracking System:** Real-time updates on which domains have completed interviews, which are in progress, and which are still seeking suitable candidates, making the entire process completely transparent.

This structured yet open selection mechanism ensures both breadth of coverage and finding truly representative figures for each field.
    `
  },
  {
    id: "building-in-public-strategy",
    title: "Building In Public Strategy",
    description: "Every line of code, every decision, every setback shared openly - true transparency from start to finish.",
    icon: Code,
    content: `
My understanding of the "Build in Public" philosophy goes far beyond simply sharing final results. I believe truly valuable sharing should include the entire thought process, decision logic, difficulties encountered, and problem-solving approaches. This deep transparency not only helps other technical professionals learn, but more importantly, builds genuine trust relationships. Through this approach, I hope everyone following this challenge can gain inspiration, whether they're technical experts or industry practitioners.

- 🌐 **Dedicated Website:** Create an independent website to publish all related documentation, guest lists, project progress, and blog posts, allowing anyone to track the entire challenge's development.
- 💻 **Full Open Source:**
  - 30 custom AI applications will be deployed as independent web applications
  - Each project corresponds to a public GitHub repository
  - All code, technical architecture, and development process completely open source
- 🧠 **Transparent Thinking Process:** Regularly share my decision-making logic, technical choice reasoning, setbacks encountered, and solution iteration processes, allowing readers to follow my thought patterns.
- 📝 **Continuous Insight Sharing:** Beyond technical details, I'll share business insights learned from various industries, user needs analysis, and cutting-edge AI application thinking.

This comprehensive open development approach not only makes the entire process more educational but also provides valuable reference cases for AI technology applications across industries.
    `
  },
  {
    id: "whats-next",
    title: "What's Next",
    description: "Ready to join, refer someone, or just follow along? Here's exactly how to get involved in this journey.",
    icon: ArrowRight,
    content: `
Ready to get involved? Here are your next steps:

- [FAQ](https://sanhehu.atlassian.net/wiki/spaces/SHPB/pages/530251781/30+Voices+30+AI+Products+Challenge+-+FAQ): Get answers to common questions about participation, timeline, and requirements
- [View Topic List](https://docs.google.com/spreadsheets/d/1vIl5MCGvksAMShWFTbFCZIHjOuZAOsauXQNFuAxSeuE/edit?usp=sharing): Browse our spreadsheet of 30 professional domains we're targeting
- [Apply to Participate](https://forms.gle/iPWreajqos52gXpo8): Fill out the application form to become a guest interview participant
- [AI Solution Gallery](https://sanhehu.atlassian.net/wiki/spaces/SHPB/pages/530120707/30+Voices+30+AI+Products+Challenge+-+AI+Solutions+Gallery): Explore the custom AI tools we've already built for previous participants

This is your chance to be part of something bigger - join the community of professionals helping shape AI's practical applications across industries.
    `
  }
]