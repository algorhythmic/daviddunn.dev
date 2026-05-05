"use client"

import { useEffect, useRef, useState } from "react"
import type { ReactNode } from "react"
import { ChevronDown, Terminal, Calendar, Layers, Github } from "lucide-react"
import { AnimatedBackground } from "@/components/hero-background"

const roles = ["AI Systems Builder", "Applied AI Engineer", "Data Automation Developer"]
const TYPE_SPEED = 80
const DELETE_SPEED = 50
const PAUSE_AFTER_TYPE = 2000
const PAUSE_AFTER_DELETE = 400

function useTypewriter(words: string[]) {
  const [display, setDisplay] = useState("")
  const [wordIndex, setWordIndex] = useState(0)
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting" | "waiting">("typing")
  const randRef = useRef(0)

  useEffect(() => {
    const word = words[wordIndex]
    let timeout: ReturnType<typeof setTimeout>

    switch (phase) {
      case "typing":
        if (display.length < word.length) {
          randRef.current = Math.random() * 40
          timeout = setTimeout(() => {
            setDisplay(word.slice(0, display.length + 1))
          }, TYPE_SPEED + randRef.current)
        } else {
          setPhase("pausing")
        }
        break
      case "pausing":
        timeout = setTimeout(() => setPhase("deleting"), PAUSE_AFTER_TYPE)
        break
      case "deleting":
        if (display.length > 0) {
          timeout = setTimeout(() => {
            setDisplay(display.slice(0, -1))
          }, DELETE_SPEED)
        } else {
          setPhase("waiting")
        }
        break
      case "waiting":
        timeout = setTimeout(() => {
          setWordIndex((prev) => (prev + 1) % words.length)
          setPhase("typing")
        }, PAUSE_AFTER_DELETE)
        break
    }

    return () => clearTimeout(timeout)
  }, [display, phase, wordIndex, words])

  return display
}

// Counts up from 1 → `to` over `duration` ms with ease-out cubic.
// Larger values increment faster (same total duration). Honors prefers-reduced-motion.
function CountUp({ to, duration = 3000, delay = 0 }: { to: number; duration?: number; delay?: number }) {
  const [value, setValue] = useState(to <= 1 ? to : 1)

  useEffect(() => {
    if (to <= 1) return
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(to)
      return
    }

    let raf = 0
    let start = 0
    const tick = (now: number) => {
      if (!start) start = now
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3) // easeOutCubic
      setValue(Math.max(1, Math.round(1 + (to - 1) * eased)))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    const startTimer = setTimeout(() => {
      raf = requestAnimationFrame(tick)
    }, delay)

    return () => {
      clearTimeout(startTimer)
      cancelAnimationFrame(raf)
    }
  }, [to, duration, delay])

  return <>{value}</>
}

// Translates child group toward cursor (max ±maxOffset px). No-op on touch / reduced-motion.
function MagneticWrapper({
  children,
  strength = 0.28,
  maxOffset = 6,
  className = "",
}: {
  children: ReactNode
  strength?: number
  maxOffset?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof window === "undefined") return
    if (window.matchMedia("(pointer: coarse)").matches) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = Math.max(-maxOffset, Math.min(maxOffset, (e.clientX - cx) * strength))
      const dy = Math.max(-maxOffset, Math.min(maxOffset, (e.clientY - cy) * strength))
      el.style.transform = `translate(${dx}px, ${dy}px)`
    }
    const onLeave = () => {
      el.style.transform = ""
    }

    el.addEventListener("mousemove", onMove)
    el.addEventListener("mouseleave", onLeave)
    return () => {
      el.removeEventListener("mousemove", onMove)
      el.removeEventListener("mouseleave", onLeave)
    }
  }, [strength, maxOffset])

  return (
    <div ref={ref} className={`transition-transform duration-200 ease-out will-change-transform ${className}`}>
      {children}
    </div>
  )
}

type HeroProps = {
  onOpenResume: () => void
}

export function Hero({ onOpenResume }: HeroProps) {
  const typedRole = useTypewriter(roles)
  const [heroHeight, setHeroHeight] = useState<number | null>(null)

  // Capture viewport height once on mount — immune to address bar changes
  useEffect(() => {
    setHeroHeight(window.innerHeight)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="hero"
      className="bg-neo-yellow-light dark:bg-slate-900 flex items-center justify-center py-10 md:py-16 relative overflow-hidden"
      style={{ height: heroHeight ? `${heroHeight}px` : "100svh" }}
    >
      <AnimatedBackground boost dimGlow />
      <div className="relative z-10 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 text-center">
        <div className="hero-card bg-white dark:bg-slate-800 border-[3px] md:border-4 border-black dark:border-neo-blue-500 px-5 py-6 md:px-10 md:py-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:dark:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] w-full max-w-sm sm:max-w-md md:max-w-3xl mx-auto">
          {/* Status pill */}
          <div className="hero-stagger flex justify-center mb-4 md:mb-3" style={{ animationDelay: "200ms" }}>
            <div className="hero-glow-sm inline-flex items-center gap-1.5 md:gap-2 bg-neo-purple-light dark:bg-neo-purple-dark border md:border-2 border-black dark:border-neo-purple-light px-2 py-0.5 md:px-3 md:py-1 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] md:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <span className="relative flex w-1.5 h-1.5 md:w-2.5 md:h-2.5">
                <span className="absolute inset-0 rounded-full bg-emerald-300 animate-status-ping" />
                <span className="relative rounded-full w-full h-full bg-emerald-300" />
              </span>
              <span className="font-mono font-bold text-[8px] md:text-xs tracking-[0.12em] text-white">
                CURRENTLY BUILDING{" "}
                <a
                  href="https://github.com/algorhythmic/saga"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="saga-link"
                >
                  SAGA
                </a>
              </span>
            </div>
          </div>

          <h1
            className="hero-stagger hero-name text-4xl md:text-6xl font-black mb-2 md:mb-4 text-black dark:text-white"
            style={{ animationDelay: "300ms" }}
          >
            DAVID DUNN
          </h1>
          <div
            className="hero-stagger h-8 md:h-14 mb-4 md:mb-5 flex items-center justify-center"
            style={{ animationDelay: "420ms" }}
          >
            <h2 className="text-base md:text-3xl font-bold text-neo-blue-500 dark:text-neo-blue-400 dark:neo-text-glow min-w-0 text-center font-mono">
              {typedRole}
              <span className="inline-block w-[2px] md:w-[3px] h-[1em] bg-neo-blue-500 dark:bg-neo-blue-400 ml-0.5 align-middle animate-cursor-blink" />
            </h2>
          </div>

          {/* Stat strip (replaces tagline) */}
          <div
            className="hero-stagger mb-5 md:mb-6 flex items-center justify-center flex-wrap gap-2 md:gap-3"
            style={{ animationDelay: "540ms" }}
            aria-label="Quick stats"
          >
            <button
              type="button"
              onClick={() => scrollTo("about")}
              aria-label="6 plus years of experience — go to About"
              className="stat-btn hero-glow-sm inline-flex items-center gap-1.5 md:gap-1.5 bg-neo-blue-500 dark:bg-neo-blue-600 text-white font-black px-3 py-2 md:px-3 md:py-1.5 border-2 md:border-4 border-black dark:border-neo-blue-400 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all duration-150 hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[3px] active:translate-y-[3px]"
            >
              <Calendar size={14} className="md:w-4 md:h-4 shrink-0" strokeWidth={2.5} />
              <span className="font-mono tabular-nums text-base md:text-lg leading-none">
                <CountUp to={6} duration={5000} delay={600} />+
              </span>
              <span className="text-[11px] md:text-xs tracking-[0.1em] leading-none">YEARS</span>
            </button>
            <button
              type="button"
              onClick={() => scrollTo("portfolio")}
              aria-label="3 case studies — go to Case Studies"
              className="stat-btn hero-glow-sm inline-flex items-center gap-1.5 md:gap-1.5 bg-neo-pink-light dark:bg-pink-500 text-white font-black px-3 py-2 md:px-3 md:py-1.5 border-2 md:border-4 border-black dark:border-neo-blue-400 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all duration-150 hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[3px] active:translate-y-[3px]"
            >
              <Layers size={14} className="md:w-4 md:h-4 shrink-0" strokeWidth={2.5} />
              <span className="font-mono tabular-nums text-base md:text-lg leading-none">
                <CountUp to={3} duration={5000} delay={600} />
              </span>
              <span className="text-[11px] md:text-xs tracking-[0.1em] leading-none">
                <span className="md:hidden">STUDIES</span>
                <span className="hidden md:inline">CASE STUDIES</span>
              </span>
            </button>
            <a
              href="https://github.com/algorhythmic"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="19 GitHub repositories — open GitHub in new tab"
              className="stat-btn hero-glow-sm inline-flex items-center gap-1.5 md:gap-1.5 bg-neo-green-light dark:bg-emerald-500 text-white font-black px-3 py-2 md:px-3 md:py-1.5 border-2 md:border-4 border-black dark:border-neo-blue-400 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all duration-150 hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[3px] active:translate-y-[3px]"
            >
              <Github size={14} className="md:w-4 md:h-4 shrink-0" strokeWidth={2.5} />
              <span className="font-mono tabular-nums text-base md:text-lg leading-none">
                <CountUp to={19} duration={5000} delay={600} />
              </span>
              <span className="text-[11px] md:text-xs tracking-[0.1em] leading-none">REPOS</span>
            </a>
          </div>

          <div
            className="hero-stagger flex justify-center"
            style={{ animationDelay: "780ms" }}
          >
            <MagneticWrapper>
              <button
                onClick={onOpenResume}
                className="hero-glow-sm inline-flex items-center justify-center gap-2 md:gap-2 bg-zinc-800 hover:bg-zinc-700 dark:bg-slate-900 dark:hover:bg-slate-800 text-emerald-300 font-black px-6 py-3 md:px-6 md:py-3 border-[3px] md:border-4 border-emerald-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all duration-150 text-base md:text-base hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[3px] active:translate-y-[3px]"
              >
                <Terminal size={18} className="md:w-[18px] md:h-[18px]" />
                VIEW RESUME
              </button>
            </MagneticWrapper>
          </div>
        </div>

        <button
          onClick={() => scrollTo("portfolio")}
          className="hero-stagger mt-4 md:mt-8 cursor-pointer bg-transparent border-none"
          style={{ animationDelay: "1050ms" }}
          aria-label="Scroll to case studies"
        >
          <span className="block animate-bounce">
            <ChevronDown size={36} className="mx-auto text-black dark:text-neo-blue-400 dark:neo-text-glow" />
          </span>
        </button>
      </div>

      <style jsx>{`
        @keyframes statusPing {
          0% { transform: scale(1); opacity: 0.75; }
          75%, 100% { transform: scale(2.4); opacity: 0; }
        }
        @keyframes sagaPulse {
          0%, 100% {
            color: #fbbf24;
            text-shadow: 0 0 4px rgba(251, 191, 36, 0.55);
          }
          50% {
            color: #fde68a;
            text-shadow:
              0 0 10px rgba(251, 191, 36, 0.95),
              0 0 22px rgba(251, 191, 36, 0.55);
          }
        }
        :global(.saga-link) {
          color: #fbbf24;
          text-decoration: none;
          animation: sagaPulse 1.8s ease-in-out infinite;
          transition: text-decoration 150ms ease;
        }
        :global(.saga-link:hover),
        :global(.saga-link:focus-visible) {
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        @media (prefers-reduced-motion: reduce) {
          :global(.saga-link) {
            animation: none !important;
          }
        }

        :global(.hero-card::after) {
          content: "";
          position: absolute;
          inset: -2px;
          pointer-events: none;
          opacity: 0;
          /* Light mode: dark/black glow against the yellow bg */
          box-shadow:
            0 0 22px 4px rgba(0, 0, 0, 0.45),
            0 0 55px 10px rgba(0, 0, 0, 0.22);
          transition: opacity 250ms ease, box-shadow 200ms ease;
        }
        :global(.dark .hero-card::after) {
          /* Dark mode: blue glow */
          box-shadow:
            0 0 22px 4px rgba(59, 130, 246, 0.55),
            0 0 55px 10px rgba(59, 130, 246, 0.3);
        }
        @media (min-width: 768px) {
          :global(.hero-card::after) {
            box-shadow:
              0 0 30px 6px rgba(0, 0, 0, 0.5),
              0 0 75px 14px rgba(0, 0, 0, 0.25);
          }
          :global(.dark .hero-card::after) {
            box-shadow:
              0 0 30px 6px rgba(59, 130, 246, 0.6),
              0 0 75px 14px rgba(59, 130, 246, 0.35);
          }
        }
        :global(.hero-card:hover),
        :global(.hero-card:focus-within) {
          animation-play-state: paused, paused;
        }
        :global(.hero-card:hover::after),
        :global(.hero-card:focus-within::after) {
          opacity: 1;
        }
        :global(.hero-card:active::after) {
          opacity: 1;
          /* Light mode active: deeper black flash */
          box-shadow:
            0 0 32px 8px rgba(0, 0, 0, 0.7),
            0 0 80px 18px rgba(0, 0, 0, 0.4);
        }
        :global(.dark .hero-card:active::after) {
          /* Dark mode active: blue → purple flash */
          box-shadow:
            0 0 32px 8px rgba(59, 130, 246, 0.9),
            0 0 80px 18px rgba(139, 92, 246, 0.55);
        }
        :global(.animate-status-ping) {
          animation: statusPing 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        :global(.stat-btn) {
          cursor: pointer;
        }
        :global(.stat-btn:focus-visible) {
          outline: 2px solid white;
          outline-offset: 2px;
        }

        /* DAVID DUNN — 3D offset + glow */
        :global(.hero-name) {
          text-shadow:
            2px 2px 0 rgba(251, 191, 36, 0.85),
            0 0 14px rgba(0, 0, 0, 0.4),
            0 0 32px rgba(0, 0, 0, 0.22);
        }
        @media (min-width: 768px) {
          :global(.hero-name) {
            text-shadow:
              4px 4px 0 rgba(251, 191, 36, 0.85),
              0 0 22px rgba(0, 0, 0, 0.45),
              0 0 50px rgba(0, 0, 0, 0.25);
          }
        }
        :global(.dark .hero-name) {
          text-shadow:
            3px 3px 0 rgba(0, 0, 0, 0.85),
            0 0 14px rgba(59, 130, 246, 0.65),
            0 0 32px rgba(59, 130, 246, 0.35);
        }
        @media (min-width: 768px) {
          :global(.dark .hero-name) {
            text-shadow:
              5px 5px 0 rgba(0, 0, 0, 0.85),
              0 0 22px rgba(59, 130, 246, 0.7),
              0 0 50px rgba(59, 130, 246, 0.4);
          }
        }

        /* Subtle always-on glow on inner elements — same color logic as hero card, ~50% intensity */
        :global(.hero-glow-sm) {
          position: relative;
        }
        :global(.hero-glow-sm::after) {
          content: "";
          position: absolute;
          inset: -1px;
          pointer-events: none;
          box-shadow:
            0 0 12px 2px rgba(0, 0, 0, 0.4),
            0 0 28px 5px rgba(0, 0, 0, 0.2);
        }
        :global(.dark .hero-glow-sm::after) {
          box-shadow:
            0 0 12px 2px rgba(59, 130, 246, 0.45),
            0 0 28px 5px rgba(59, 130, 246, 0.22);
        }

        @media (prefers-reduced-motion: reduce) {
          :global(.animate-status-ping) {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  )
}
