"use client"

import { useEffect, useRef, useState } from "react"
import { Download, X } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

type Props = {
  open: boolean
  onClose: () => void
}

const PROMPT = "david@daviddunn.dev ~/Documents $ "
const COMMAND = "cat resume.md"
const TYPE_SPEED = 55

type Phase = "typing" | "loading" | "rendering"

export function ResumeTerminal({ open, onClose }: Props) {
  const [typed, setTyped] = useState("")
  const [phase, setPhase] = useState<Phase>("typing")
  const [markdown, setMarkdown] = useState<string | null>(null)
  const [fetchError, setFetchError] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Lock body scroll while open + close on Esc
  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener("keydown", onKey)
    }
  }, [open, onClose])

  // Reset + run animation each time the terminal opens
  useEffect(() => {
    if (!open) return
    setTyped("")
    setPhase("typing")
    setFetchError(false)

    let cancelled = false

    // Lazy-fetch markdown (only on first open)
    if (markdown == null) {
      fetch("/resume.md")
        .then((r) => (r.ok ? r.text() : Promise.reject(new Error(String(r.status)))))
        .then((text) => {
          if (!cancelled) setMarkdown(text)
        })
        .catch(() => {
          if (!cancelled) setFetchError(true)
        })
    }

    return () => {
      cancelled = true
    }
  }, [open, markdown])

  // Typewriter for the command
  useEffect(() => {
    if (!open || phase !== "typing") return
    if (typed.length >= COMMAND.length) {
      const t = setTimeout(() => setPhase("loading"), 350)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      setTyped(COMMAND.slice(0, typed.length + 1))
    }, TYPE_SPEED + Math.random() * 35)
    return () => clearTimeout(t)
  }, [open, phase, typed])

  // Loading delay → render
  useEffect(() => {
    if (phase !== "loading") return
    const t = setTimeout(() => setPhase("rendering"), 450)
    return () => clearTimeout(t)
  }, [phase])

  // Auto-scroll to top of content when it renders
  useEffect(() => {
    if (phase === "rendering" && scrollRef.current) {
      scrollRef.current.scrollTop = 0
    }
  }, [phase])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-3 py-6 md:p-8 animate-[fadeIn_180ms_ease-out]"
      role="dialog"
      aria-modal="true"
      aria-label="Resume terminal"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Window */}
      <div
        className="relative w-full max-w-3xl h-[80vh] md:h-[78vh] flex flex-col rounded-xl overflow-hidden border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:border-neo-blue-500 animate-[termPop_320ms_cubic-bezier(0.2,0.9,0.3,1.2)_both]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title bar (macOS style) */}
        <div className="relative flex items-center h-9 px-3 bg-gradient-to-b from-zinc-700/95 to-zinc-800/95 border-b border-black/60 backdrop-blur-md select-none">
          {/* Traffic lights */}
          <div className="flex items-center gap-2 z-10">
            <button
              onClick={onClose}
              aria-label="Close"
              className="group w-3.5 h-3.5 rounded-full bg-[#ff5f57] border border-[#e0443e] flex items-center justify-center hover:brightness-110 transition"
            >
              <X
                size={8}
                className="text-[#7a0014] opacity-0 group-hover:opacity-100 transition"
                strokeWidth={3}
              />
            </button>
            <span className="w-3.5 h-3.5 rounded-full bg-[#febc2e] border border-[#dea123]" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#28c840] border border-[#1aab29]" />
          </div>

          {/* Path centered */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="font-mono text-[11px] md:text-xs text-zinc-300 tracking-tight">
              ~/Documents/resume.md
            </span>
          </div>

          {/* Right-side actions */}
          <div className="ml-auto z-10">
            <a
              href="/resume.md"
              download="david-dunn-resume.md"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 text-[10px] md:text-xs font-mono text-zinc-300 hover:text-emerald-300 transition"
              aria-label="Download resume markdown"
            >
              <Download size={12} />
              <span className="hidden sm:inline">.md</span>
            </a>
          </div>
        </div>

        {/* Terminal body */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto bg-black/85 backdrop-blur-md font-mono text-[12px] md:text-[13px] leading-relaxed text-emerald-400 p-4 md:p-5 selection:bg-emerald-400/30 selection:text-emerald-100"
          style={{
            textShadow: "0 0 8px rgba(16, 185, 129, 0.35)",
          }}
        >
          {/* Boot line */}
          <div className="text-emerald-500/70 mb-1">
            Last login: {new Date().toUTCString()} on ttys000
          </div>

          {/* Prompt + typed command */}
          <div className="flex flex-wrap">
            <span className="text-emerald-300">{PROMPT}</span>
            <span className="ml-1">{typed}</span>
            {phase === "typing" && (
              <span className="inline-block w-[7px] h-[1em] bg-emerald-400 ml-0.5 align-middle animate-cursor-blink" />
            )}
          </div>

          {/* Loading state */}
          {phase === "loading" && (
            <div className="mt-2 text-emerald-300/80">
              <LoadingDots />
            </div>
          )}

          {/* Rendered resume */}
          {phase === "rendering" && (
            <div className="mt-3 animate-[fadeIn_220ms_ease-out]">
              {fetchError ? (
                <div className="text-red-400">
                  Error: could not load resume.md. <br />
                  Try the download link in the title bar.
                </div>
              ) : markdown == null ? (
                <LoadingDots />
              ) : (
                <article className="resume-md">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
                </article>
              )}

              {/* Trailing prompt */}
              <div className="mt-6 flex">
                <span className="text-emerald-300">{PROMPT}</span>
                <span className="inline-block w-[7px] h-[1em] bg-emerald-400 ml-1 align-middle animate-cursor-blink" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Component-scoped styles */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes termPop {
          0%   { opacity: 0; transform: scale(0.85) translateY(20px) rotate(-1.5deg); }
          60%  { opacity: 1; transform: scale(1.02) translateY(-4px) rotate(0.4deg); }
          100% { opacity: 1; transform: scale(1) translateY(0) rotate(0); }
        }

        /* Markdown styling — keep monospace, lean into homebrew green */
        .resume-md h1,
        .resume-md h2,
        .resume-md h3 {
          color: #fef3c7; /* warm cream for headings */
          text-transform: uppercase;
          letter-spacing: 0.04em;
          font-weight: 700;
          margin-top: 1.1em;
          margin-bottom: 0.4em;
        }
        .resume-md h1 { font-size: 1.05em; }
        .resume-md h2 { font-size: 1em; }
        .resume-md h3 { font-size: 0.95em; }
        .resume-md p { margin: 0.4em 0; }
        .resume-md strong { color: #fef3c7; font-weight: 700; }
        .resume-md em { color: #fde68a; font-style: italic; }
        .resume-md a {
          color: #67e8f9;
          text-decoration: underline;
          text-decoration-color: rgba(103, 232, 249, 0.45);
        }
        .resume-md a:hover { color: #a5f3fc; }
        .resume-md ul { list-style: none; padding-left: 1.1em; margin: 0.3em 0; }
        .resume-md li { position: relative; margin: 0.2em 0; }
        .resume-md li::before {
          content: "▸";
          position: absolute;
          left: -1.1em;
          color: #34d399;
        }
        .resume-md hr {
          border: none;
          border-top: 1px dashed rgba(52, 211, 153, 0.4);
          margin: 0.8em 0;
        }
        .resume-md code {
          background: rgba(16, 185, 129, 0.12);
          padding: 0.05em 0.3em;
          border-radius: 2px;
        }
      `}</style>
    </div>
  )
}

function LoadingDots() {
  const [n, setN] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setN((v) => (v + 1) % 4), 220)
    return () => clearInterval(id)
  }, [])
  return <span>loading{".".repeat(n)}</span>
}
