"use client"

import { useEffect, useState } from "react"
import { ChevronDown, Download, X } from "lucide-react"

type Props = {
  open: boolean
  onClose: () => void
}

const DOWNLOADS = [
  { label: "PDF", href: "/resume.pdf", filename: "david-dunn-resume.pdf" },
  { label: "DOCX", href: "/resume.docx", filename: "david-dunn-resume.docx" },
  { label: "Markdown", href: "/resume.md", filename: "david-dunn-resume.md" },
]

// Resume viewer — embeds the PDF directly so it reads exactly like the document.
export function ResumeDocument({ open, onClose }: Props) {
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

      {/* Sheet */}
      <div
        className="relative w-full max-w-3xl h-[88vh] flex flex-col rounded-md overflow-hidden bg-white shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
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

        {/* PDF */}
        <div className="flex-1 min-h-0 bg-zinc-100">
          <object data="/resume.pdf" type="application/pdf" className="w-full h-full">
            <div className="p-8 text-center text-sm text-zinc-600">
              Your browser can&apos;t display the PDF inline.{" "}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Open it in a new tab
              </a>
              .
            </div>
          </object>
        </div>
      </div>

      {/* fade-in keyframes */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
