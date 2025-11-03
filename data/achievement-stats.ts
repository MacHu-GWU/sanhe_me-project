import { FaGithub, FaPython } from "react-icons/fa"
import { Download, PenTool, GitCommit, Building2 } from "lucide-react"
import { AchievementStat } from "@/types"

export const achievementStats: AchievementStat[] = [
  {
    number: "150+",
    description: "Open Source Python Libraries",
    color: "text-primary",
    borderColor: "border-primary",
    glowColor: "shadow-primary/20",
    icon: FaPython,
    href: "https://pypi.org/user/machugwu/",
  },
  {
    number: "10M+",
    description: "Monthly Downloads",
    color: "text-primary",
    borderColor: "border-primary",
    glowColor: "shadow-primary/20",
    icon: Download,
    href: "https://github.com/MacHu-GWU",
  },
  {
    number: "600+",
    description: "Open Source Solutions",
    color: "text-primary",
    borderColor: "border-primary",
    glowColor: "shadow-primary/20",
    icon: FaGithub,
    href: "https://github.com/MacHu-GWU?tab=repositories",
  },
  {
    number: "2000+",
    description: "Tech Blogs",
    color: "text-secondary",
    borderColor: "border-secondary",
    glowColor: "shadow-secondary/20",
    icon: PenTool,
    href: "",
  },
  {
    number: "3000+",
    description: "Git Commits per Year",
    color: "text-secondary",
    borderColor: "border-secondary",
    glowColor: "shadow-secondary/20",
    icon: GitCommit,
    href: "https://github.com/MacHu-GWU",
  },
  {
    number: "40+",
    description: "Enterprise Clients as Solution Architect",
    color: "text-highlight",
    borderColor: "border-highlight",
    glowColor: "shadow-highlight/20",
    icon: Building2,
    href: "",
  },
]
