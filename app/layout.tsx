import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "Sanhe Hu - Solution Architect & Builder",
  description:
    "Personal portfolio of Sanhe Hu, a Data/AI Architect specializing in open source solutions and enterprise architecture.",
  keywords: ["Solution Architect", "Data Architect", "AI Architect", "Open Source", "Python", "Enterprise"],
  authors: [{ name: "Sanhe Hu" }],
  generator: 'v0.dev',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
