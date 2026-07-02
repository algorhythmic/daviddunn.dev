"use client"

import type { CSSProperties } from "react"
import { useEffect, useState } from "react"
import { FileText } from "lucide-react"
import { ResumeDocument } from "@/components/resume-document"
import { Flames } from "@/components/flames"

// Grow ~2% for every 100px of cumulative mouse movement, +5% per click/tap,
// capped at 10x.
const GROWTH_PER_PX = 0.0002 // 2% / 100px
const CLICK_GROWTH = 0.05 // +5% per click/tap
const FIRE_GROWTH = 2.0 // +200% when the projects button is caught
const MAX_SCALE = 10

export function ResumeButton() {
  const [open, setOpen] = useState(false)
  const [scale, setScale] = useState(1)
  const [onFire, setOnFire] = useState(false)

  useEffect(() => {
    let last: { x: number; y: number } | null = null
    let grow = 0 // accumulated fractional growth
    let raf = 0

    const schedule = () => {
      if (!raf) {
        raf = requestAnimationFrame(() => {
          raf = 0
          setScale(Math.min(1 + grow, MAX_SCALE))
        })
      }
    }
    const onMove = (e: MouseEvent) => {
      if (last) grow += Math.hypot(e.clientX - last.x, e.clientY - last.y) * GROWTH_PER_PX
      last = { x: e.clientX, y: e.clientY }
      schedule()
    }
    const onClick = () => {
      grow += CLICK_GROWTH
      schedule()
    }
    // Caught the projects button: grow by 200% and catch fire
    const ignite = () => {
      grow += FIRE_GROWTH
      setOnFire(true)
      schedule()
    }

    window.addEventListener("mousemove", onMove)
    window.addEventListener("click", onClick)
    window.addEventListener("resume-fire", ignite)
    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("click", onClick)
      window.removeEventListener("resume-fire", ignite)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  // Glow + vibration intensify as it grows
  const t = scale - 1
  const active = scale > 1.02
  const buttonStyle = (
    active || onFire
      ? {
          "--vib": `${Math.min(t * 0.6, 4)}px`,
          animationDuration: `${Math.max(0.06, 0.2 - t * 0.02)}s`,
          boxShadow: onFire
            ? "0 0 18px 4px rgba(249,115,22,0.85), 0 0 42px 12px rgba(239,68,68,0.5)"
            : `0 0 ${t * 12}px ${t * 4}px rgba(59,130,246,0.5), 0 0 ${t * 22}px rgba(236,72,153,0.35)`,
        }
      : {}
  ) as CSSProperties

  return (
    <>
      <span
        className="inline-block will-change-transform"
        style={{ transform: `scale(${scale})` }}
      >
        <span className="relative inline-block">
          {onFire && <Flames />}
          <button
            onClick={() => setOpen(true)}
            style={buttonStyle}
            className={`relative z-10 inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors will-change-transform ${
              onFire
                ? "border-orange-500 bg-orange-50 text-orange-900"
                : "border-foreground/15 hover:bg-foreground/5"
            } ${active || onFire ? "animate-resume-vibrate" : ""}`}
          >
            <FileText className="w-4 h-4" />
            Résumé
          </button>
        </span>
      </span>
      <ResumeDocument open={open} onClose={() => setOpen(false)} />
    </>
  )
}
