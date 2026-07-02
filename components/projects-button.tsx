"use client"

import type { CSSProperties } from "react"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"

// Neobrutalist button sitting in a small field of animated grid + moving glowing
// nodes that fades out around it. The button fill is translucent so the single
// grid shows through it. It also *flees* the cursor: when the pointer gets close,
// it dodges away, so it can never actually be clicked.

const NODE_COLORS = ["#3b82f6", "#ec4899", "#10b981", "#8b5cf6"]
const glow = (c: string) => `0 0 4px ${c}, 0 0 9px ${c}, 0 0 14px ${c}aa`

const H_NODES = [
  { top: "38%", rev: false, color: NODE_COLORS[0], dur: "6s", delay: "0s" },
  { top: "62%", rev: true, color: NODE_COLORS[1], dur: "7s", delay: "1.4s" },
]
const V_NODES = [
  { left: "28%", rev: false, color: NODE_COLORS[2], dur: "5s", delay: "0.7s" },
  { left: "50%", rev: true, color: NODE_COLORS[3], dur: "5.6s", delay: "2s" },
  { left: "72%", rev: false, color: NODE_COLORS[0], dur: "6.2s", delay: "0.4s" },
]

const fieldFadeMask: CSSProperties = {
  WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 72%)",
  maskImage: "radial-gradient(ellipse at center, black 30%, transparent 72%)",
}

const FLEE_RADIUS = 150 // start reacting when the cursor is this close (px)
const STEP = 0.6 // portion of the cursor overlap to move per event
const MAX_STEP = 48 // cap on how far it darts in a single event (px)

export function ProjectsButton() {
  const ref = useRef<HTMLAnchorElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const offsetRef = useRef(offset)
  offsetRef.current = offset

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const dist = Math.hypot(cx - e.clientX, cy - e.clientY)

      // Cursor is far — leave the button where it fled to.
      if (dist >= FLEE_RADIUS) return

      // Home center = current center minus the transform we've already applied
      const homeX = cx - offsetRef.current.x
      const homeY = cy - offsetRef.current.y

      // On-screen bounds for the button's center
      const margin = 8
      const halfW = r.width / 2
      const halfH = r.height / 2
      const minX = margin + halfW
      const maxX = window.innerWidth - margin - halfW
      const minY = margin + halfH
      const maxY = window.innerHeight - margin - halfH
      const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi)

      // Direction away from the cursor (fall back to heading inward if the cursor
      // is right on top of the button)
      let ax: number
      let ay: number
      if (dist < 1) {
        ax = (minX + maxX) / 2 - cx
        ay = (minY + maxY) / 2 - cy
        const l = Math.hypot(ax, ay) || 1
        ax /= l
        ay /= l
      } else {
        ax = (cx - e.clientX) / dist
        ay = (cy - e.clientY) / dist
      }

      // Nudge proportional to how deep the cursor is inside the radius — small when
      // barely near, larger up close, but capped so it never darts far.
      const push = Math.min((FLEE_RADIUS - dist) * STEP, MAX_STEP)

      let tx = clamp(cx + ax * push, minX, maxX)
      let ty = clamp(cy + ay * push, minY, maxY)

      // If a wall/corner ate most of the move, slip sideways along the wall (toward
      // the more open side) instead of staying pinned.
      if (Math.hypot(tx - cx, ty - cy) < push * 0.5) {
        let tanX = -ay
        let tanY = ax
        if (tanX * ((minX + maxX) / 2 - cx) + tanY * ((minY + maxY) / 2 - cy) < 0) {
          tanX = -tanX
          tanY = -tanY
        }
        tx = clamp(cx + tanX * push, minX, maxX)
        ty = clamp(cy + tanY * push, minY, maxY)
      }

      setOffset({ x: tx - homeX, y: ty - homeY })
    }
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  return (
    <Link
      ref={ref}
      href="/projects"
      aria-label="David's Projects"
      className="group relative inline-block transition-transform duration-100 ease-out will-change-transform"
      style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
    >
      {/* Small field of grid + nodes around the button, fading out at the edges */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-12 z-0 overflow-hidden"
        style={fieldFadeMask}
      >
        <span className="neo-grid-bg absolute inset-0 opacity-70 dark:opacity-60" />
        {H_NODES.map((n, i) => (
          <span
            key={`h-${i}`}
            className={`absolute w-2 h-2 rounded-full opacity-0 ${
              n.rev ? "animate-dot-traverse-h-rev" : "animate-dot-traverse-h"
            }`}
            style={
              {
                top: n.top,
                [n.rev ? "right" : "left"]: 0,
                marginTop: "-4px",
                backgroundColor: n.color,
                boxShadow: glow(n.color),
                "--traverse-x": n.rev ? "-320px" : "320px",
                "--dot-duration": n.dur,
                animationDelay: n.delay,
              } as CSSProperties
            }
          />
        ))}
        {V_NODES.map((n, i) => (
          <span
            key={`v-${i}`}
            className={`absolute w-2 h-2 rounded-full opacity-0 ${
              n.rev ? "animate-dot-traverse-v-rev" : "animate-dot-traverse-v"
            }`}
            style={
              {
                left: n.left,
                [n.rev ? "bottom" : "top"]: 0,
                marginLeft: "-4px",
                backgroundColor: n.color,
                boxShadow: glow(n.color),
                "--traverse-y": n.rev ? "-150px" : "150px",
                "--dot-duration": n.dur,
                animationDelay: n.delay,
              } as CSSProperties
            }
          />
        ))}
      </span>

      {/* Button face */}
      <span className="relative z-10 block border-4 border-black dark:border-neo-blue-500 bg-neo-yellow-light/55 dark:bg-slate-800/55 px-3 py-2 md:px-4 text-sm md:text-base font-black uppercase tracking-tight text-black dark:text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-150 group-hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-[3px] group-hover:translate-y-[3px] group-active:shadow-none group-active:translate-x-[6px] group-active:translate-y-[6px]">
        David&apos;s Projects
      </span>
    </Link>
  )
}
