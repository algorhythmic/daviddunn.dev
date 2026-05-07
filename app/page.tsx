"use client"

import { useState } from "react"
import { Hero } from "@/components/hero"
import { Portfolio } from "@/components/portfolio"
import { About } from "@/components/about"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { ResumeTerminal } from "@/components/resume-terminal"

export default function Home() {
  const [resumeOpen, setResumeOpen] = useState(false)
  const openResume = () => setResumeOpen(true)

  return (
    <div>
      <Navigation />
      <main>
        <Hero onOpenResume={openResume} />
        <Portfolio />
        <About onOpenResume={openResume} />
      </main>
      <Footer />
      <ResumeTerminal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </div>
  )
}
