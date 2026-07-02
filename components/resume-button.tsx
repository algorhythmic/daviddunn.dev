"use client"

import type { CSSProperties } from "react"
import { useEffect, useState } from "react"
import { FileText } from "lucide-react"
import { ResumeDocument } from "@/components/resume-document"

// Grow ~2% for every 100px of cumulative mouse movement, capped at 10x.
const GROWTH_PER_PX = 0.0002 // 2% / 100px
const MAX_SCALE = 10

export function ResumeButton() {
  const [open, setOpen] = useState(false)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    let last: { x: number; y: number } | null = null
    let total = 0
    let raf = 0
    let pending = 1

    const onMove = (e: MouseEvent) => {
      if (last) total += Math.hypot(e.clientX - last.x, e.clientY - last.y)
      last = { x: e.clientX, y: e.clientY }
      pending = Math.min(1 + total * GROWTH_PER_PX, MAX_SCALE)
      if (!raf) {
        raf = requestAnimationFrame(() => {
          raf = 0
          setScale(pending)
        })
      }
    }

    window.addEventListener("mousemove", onMove)
    return () => {
      window.removeEventListener("mousemove", onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  // Glow + vibration intensify as it grows
  const t = scale - 1
  const active = scale > 1.02
  const buttonStyle = (active
    ? {
        "--vib": `${Math.min(t * 0.6, 4)}px`,
        animationDuration: `${Math.max(0.06, 0.2 - t * 0.02)}s`,
        boxShadow: `0 0 ${t * 12}px ${t * 4}px rgba(59,130,246,0.5), 0 0 ${t * 22}px rgba(236,72,153,0.35)`,
      }
    : {}) as CSSProperties

  return (
    <>
      <span
        className="inline-block will-change-transform"
        style={{ transform: `scale(${scale})` }}
      >
        <button
          onClick={() => setOpen(true)}
          style={buttonStyle}
          className={`inline-flex items-center gap-1.5 rounded-full border border-foreground/15 px-4 py-2 text-sm font-medium hover:bg-foreground/5 transition-colors will-change-transform ${
            active ? "animate-resume-vibrate" : ""
          }`}
        >
          <FileText className="w-4 h-4" />
          Résumé
        </button>
      </span>
      <ResumeDocument open={open} onClose={() => setOpen(false)} />
    </>
  )
}
