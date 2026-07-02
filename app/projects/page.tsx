"use client"

import { useState } from "react"
import { Hero } from "@/components/hero"
import { Portfolio } from "@/components/portfolio"
import { About } from "@/components/about"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { ResumeTerminal } from "@/components/resume-terminal"
import { ResumeDocument } from "@/components/resume-document"

export default function Projects() {
  // Hero opens the PDF document viewer (same as the landing page);
  // About keeps the terminal viewer.
  const [docOpen, setDocOpen] = useState(false)
  const [termOpen, setTermOpen] = useState(false)

  return (
    <div>
      <Navigation />
      <main>
        <Hero onOpenResume={() => setDocOpen(true)} />
        <Portfolio />
        <About onOpenResume={() => setTermOpen(true)} />
      </main>
      <Footer />
      <ResumeDocument open={docOpen} onClose={() => setDocOpen(false)} />
      <ResumeTerminal open={termOpen} onClose={() => setTermOpen(false)} />
    </div>
  )
}
