"use client"

import { useEffect, useState } from "react"
import { ChevronDown, Download, X } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

type Props = {
  open: boolean
  onClose: () => void
}

// A clean, paper-like resume viewer — white page, black text, as if reading a PDF.
// Always light regardless of site theme.
const DOWNLOADS = [
  { label: "PDF", href: "/resume.pdf", filename: "david-dunn-resume.pdf" },
  { label: "DOCX", href: "/resume.docx", filename: "david-dunn-resume.docx" },
  { label: "Markdown", href: "/resume.md", filename: "david-dunn-resume.md" },
]

export function ResumeDocument({ open, onClose }: Props) {
  const [markdown, setMarkdown] = useState<string | null>(null)
  const [fetchError, setFetchError] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Lock body scroll + close on Esc while open
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

  // Close the download menu whenever the viewer closes
  useEffect(() => {
    if (!open) setMenuOpen(false)
  }, [open])

  // Lazy-fetch the markdown on first open
  useEffect(() => {
    if (!open || markdown != null) return
    let cancelled = false
    fetch("/resume.md")
      .then((r) => (r.ok ? r.text() : Promise.reject(new Error(String(r.status)))))
      .then((text) => {
        if (!cancelled) setMarkdown(text)
      })
      .catch(() => {
        if (!cancelled) setFetchError(true)
      })
    return () => {
      cancelled = true
    }
  }, [open, markdown])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center px-3 py-6 md:p-8 animate-[fadeIn_180ms_ease-out]"
      role="dialog"
      aria-modal="true"
      aria-label="Résumé"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Paper sheet */}
      <div
        className="relative w-full max-w-3xl max-h-[88vh] flex flex-col rounded-md overflow-hidden bg-white shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-2 px-4 py-2 border-b border-zinc-200 bg-zinc-50">
          <span className="text-xs font-medium text-zinc-500">david-dunn-resume</span>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setMenuOpen((v) => !v)
                }}
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                className="inline-flex items-center gap-1 text-xs font-medium text-zinc-600 hover:text-black transition-colors"
              >
                <Download size={14} />
                Download
                <ChevronDown
                  size={13}
                  className={`transition-transform ${menuOpen ? "rotate-180" : ""}`}
                />
              </button>
              {menuOpen && (
                <>
                  {/* click-away layer */}
                  <div
                    className="fixed inset-0 z-0"
                    onClick={(e) => {
                      e.stopPropagation()
                      setMenuOpen(false)
                    }}
                  />
                  <div
                    role="menu"
                    className="absolute right-0 mt-1.5 z-10 w-36 overflow-hidden rounded-md border border-zinc-200 bg-white shadow-lg"
                  >
                    {DOWNLOADS.map((d) => (
                      <a
                        key={d.label}
                        href={d.href}
                        download={d.filename}
                        role="menuitem"
                        onClick={(e) => {
                          e.stopPropagation()
                          setMenuOpen(false)
                        }}
                        className="block px-3 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-100 hover:text-black transition-colors"
                      >
                        {d.label}
                      </a>
                    ))}
                  </div>
                </>
              )}
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="p-1 text-zinc-500 hover:text-black transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Document body */}
        <div className="flex-1 overflow-y-auto bg-white px-6 py-8 sm:px-12 sm:py-12">
          {fetchError ? (
            <p className="text-red-600">Could not load resume. Try the download link above.</p>
          ) : markdown == null ? (
            <p className="text-zinc-400">Loading…</p>
          ) : (
            <article className="resume-doc mx-auto max-w-[46rem]">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
            </article>
          )}
        </div>
      </div>

      {/* Document styles — tuned for the resume.md structure (bold section titles,
          literal bullets, contact links). Always light. */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .resume-doc {
          color: #18181b;
          font-size: 14px;
          line-height: 1.65;
        }
        .resume-doc p { margin: 0.55em 0; }
        .resume-doc strong { color: #000; font-weight: 700; }
        .resume-doc em { color: #52525b; font-style: italic; }
        .resume-doc a {
          color: #2563eb;
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .resume-doc a:hover { color: #1d4ed8; }
        .resume-doc hr {
          border: none;
          border-top: 1px solid #e4e4e7;
          margin: 1.4em 0;
        }
        .resume-doc h1, .resume-doc h2, .resume-doc h3 {
          color: #000;
          font-weight: 700;
          margin: 1.1em 0 0.4em;
        }
        .resume-doc ul { padding-left: 1.2em; margin: 0.4em 0; }
        .resume-doc li { margin: 0.2em 0; }
        /* Name + title header block */
        .resume-doc > p:first-child { text-align: center; margin-top: 0; }
        .resume-doc > p:first-child strong {
          font-size: 1.9em;
          letter-spacing: 0.02em;
        }
        .resume-doc > p:nth-child(2),
        .resume-doc > p:nth-child(3) { text-align: center; }
        .resume-doc > p:nth-child(2) strong {
          font-size: 1.05em;
          color: #3f3f46;
        }
        .resume-doc > p:nth-child(3) { font-size: 0.9em; color: #52525b; }
      `}</style>
    </div>
  )
}
