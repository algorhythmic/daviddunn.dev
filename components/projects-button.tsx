import type { CSSProperties } from "react"
import Link from "next/link"

// Neobrutalist button linking to /projects, sitting in a small field of animated
// grid + moving glowing nodes that fades out around it, with a translucent fill
// so the grid shows through.

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

export function ProjectsButton() {
  return (
    <Link
      href="/projects"
      aria-label="David's Projects"
      className="group relative inline-block scale-[0.8] origin-left outline-none rounded-sm focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-neo-pink-light"
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
