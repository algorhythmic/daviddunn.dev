"use client"

import { useState } from "react"
import { FileText } from "lucide-react"
import { ResumeDocument } from "@/components/resume-document"

export function ResumeButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-full border border-foreground/15 px-4 py-2 text-sm font-medium hover:bg-foreground/5 transition-colors"
      >
        <FileText className="w-4 h-4" />
        Résumé
      </button>
      <ResumeDocument open={open} onClose={() => setOpen(false)} />
    </>
  )
}
