"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import {
  ExternalLink,
  Github,
  ChevronDown,
  ChevronUp,
  Layers,
  Lightbulb,
  Wrench,
  TrendingUp,
  Lock,
  Mail,
} from "lucide-react"
import { caseStudies, type CaseStudy, type CaseStudyLink } from "@/lib/portfolio-data"
import { AnimatedBackground } from "@/components/hero-background"

const ArchitectureDiagram = dynamic(
  () => import("@/components/architecture-diagram").then((m) => m.ArchitectureDiagram),
  {
    ssr: false,
    loading: () => (
      <div className="h-[400px] w-full flex items-center justify-center font-mono text-sm text-green-400 bg-black">
        loading diagram…
      </div>
    ),
  },
)

const FOCUS_RING =
  "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-black dark:focus-visible:outline-white"

const BUTTON_BASE =
  "flex items-center gap-1.5 font-bold py-2 px-4 border-2 border-black dark:border-neo-blue-500 text-sm transition-all duration-150 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"

const BUTTON_PRESS =
  "hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[3px] active:translate-y-[3px]"

// Full class names so Tailwind can see them.
const HIGHLIGHT_COLS: Record<number, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  5: "md:grid-cols-3",
  6: "md:grid-cols-3",
}

function matchesHash(study: CaseStudy, hash: string) {
  return hash === study.slug || (study.legacyAnchors ?? []).includes(hash)
}

function CardLink({ link }: { link: CaseStudyLink }) {
  if (link.private || !link.url) {
    return (
      <span
        title="Private repository"
        className={`${BUTTON_BASE} bg-gray-600 dark:bg-gray-700 text-gray-200 opacity-80 cursor-default`}
      >
        <Lock size={14} aria-hidden="true" />
        {link.label}
        <span className="text-[10px] uppercase tracking-wider opacity-90 ml-0.5 font-mono">(private)</span>
      </span>
    )
  }

  const isContact = link.type === "contact"
  const style =
    link.type === "github"
      ? "bg-gray-800 dark:bg-gray-700 text-white hover:bg-gray-900"
      : link.type === "live"
        ? "bg-neo-green-light dark:bg-neo-green-dark text-white hover:bg-green-600"
        : "bg-neo-yellow-light dark:bg-neo-yellow-dark text-black hover:bg-yellow-500"

  return (
    <a
      href={link.url}
      {...(isContact ? {} : { target: "_blank", rel: "noopener noreferrer" })}
      className={`${BUTTON_BASE} ${BUTTON_PRESS} ${FOCUS_RING} ${style}`}
    >
      {isContact ? (
        <Mail size={14} aria-hidden="true" />
      ) : link.type === "github" ? (
        <Github size={14} aria-hidden="true" />
      ) : (
        <ExternalLink size={14} aria-hidden="true" />
      )}
      {link.label}
      {!isContact && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  )
}

function CaseStudyCard({ study, index }: { study: CaseStudy; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const detailsId = `${study.slug}-details`

  useEffect(() => {
    if (typeof window === "undefined") return
    const applyHash = () => {
      let hash = window.location.hash.slice(1)
      try {
        hash = decodeURIComponent(hash)
      } catch {
        // keep the raw hash
      }
      hash = hash.toLowerCase()
      if (!hash || !matchesHash(study, hash)) return
      setIsExpanded(true)
      requestAnimationFrame(() => {
        document.getElementById(study.slug)?.scrollIntoView({ behavior: "smooth", block: "start" })
      })
    }
    applyHash()
    window.addEventListener("hashchange", applyHash)
    return () => window.removeEventListener("hashchange", applyHash)
  }, [study])

  const toggleExpanded = () => {
    setIsExpanded((prev) => {
      const next = !prev
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href)
        url.hash = next ? study.slug : ""
        window.history.replaceState(null, "", url.toString())
      }
      return next
    })
  }

  const cols = HIGHLIGHT_COLS[study.highlights.length] ?? "md:grid-cols-4"

  return (
    <article
      id={study.slug}
      aria-labelledby={`${study.slug}-title`}
      className="relative scroll-mt-12 md:scroll-mt-20 bg-white/85 dark:bg-slate-800/85 backdrop-blur-[2px] border-2 md:border-4 border-black dark:border-neo-blue-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:dark:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300"
    >
      {/* Older anchors (e.g. #case-study-1) still land on this card. */}
      {study.legacyAnchors?.map((anchor) => (
        <span
          key={anchor}
          id={anchor}
          aria-hidden="true"
          className="absolute top-0 left-0 scroll-mt-12 md:scroll-mt-20"
        />
      ))}

      {/* Header band */}
      <div
        className={`${study.accentColor} ${study.darkAccentColor} border-b-4 border-black dark:border-neo-blue-500 px-4 md:px-8 py-4 md:py-5`}
      >
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-4">
          <div className="flex-1 min-w-0 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 md:gap-3 mb-1 md:mb-2">
              <span className="text-2xl md:text-3xl" aria-hidden="true">
                {study.icon}
              </span>
              <h3
                id={`${study.slug}-title`}
                className="text-outline-black text-xl md:text-3xl font-black text-white tracking-tight leading-tight"
              >
                {study.title}
              </h3>
            </div>
            <p className="text-outline-black text-xs md:text-base font-bold text-white/90">
              {study.subtitle}
            </p>
            {study.label && (
              <span className="inline-block mt-2 text-[10px] md:text-xs font-black bg-white text-black px-2 py-0.5 border-2 border-black uppercase tracking-wider">
                {study.label}
              </span>
            )}
          </div>
          <span className="text-[10px] md:text-xs font-black bg-black text-white px-2 py-1 md:px-3 md:py-1.5 border-2 border-white shrink-0 uppercase tracking-wider self-center">
            Project {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="px-4 md:px-8 py-4 md:py-6">
        {/* Hook */}
        <p
          className={`text-sm md:text-lg font-bold text-foreground dark:text-gray-200 leading-relaxed text-center md:text-left ${
            study.note ? "mb-2 md:mb-3" : "mb-4 md:mb-6"
          }`}
        >
          {study.hook}
        </p>

        {study.note && (
          <p className="text-xs md:text-sm font-bold text-muted-foreground dark:text-gray-300 leading-relaxed mb-4 md:mb-6 text-center md:text-left">
            {study.note.text}
            {study.note.link && (
              <>
                {" "}
                <a
                  href={study.note.link.url}
                  className={`text-neo-blue-600 dark:text-neo-blue-300 font-black underline decoration-2 underline-offset-2 hover:decoration-4 ${FOCUS_RING}`}
                >
                  {study.note.link.label}
                </a>
                .
              </>
            )}
          </p>
        )}

        {study.screenshots && study.screenshots.length > 0 && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-4 md:mb-6">
            {study.screenshots.map((screenshot) => (
              <figure
                key={screenshot.src}
                className="min-w-0 border-2 border-black dark:border-neo-blue-500 bg-white dark:bg-slate-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
              >
                <a
                  href={screenshot.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block ${FOCUS_RING}`}
                >
                  <Image
                    src={screenshot.src}
                    alt={screenshot.alt}
                    width={screenshot.width}
                    height={screenshot.height}
                    className="w-full h-auto"
                    sizes="(min-width: 1280px) 50vw, 100vw"
                  />
                  <span className="sr-only">View full-size screenshot (opens in a new tab)</span>
                </a>
                <figcaption className="p-3 border-t-2 border-black dark:border-neo-blue-500">
                  <p className="text-sm font-black text-foreground dark:text-white">{screenshot.title}</p>
                  <p className="mt-1 text-xs font-bold text-muted-foreground dark:text-gray-300">{screenshot.caption}</p>
                  <p className="mt-2 text-xs font-mono text-muted-foreground dark:text-gray-400">Select image to view full size ↗</p>
                </figcaption>
              </figure>
            ))}
          </div>
        )}

        {/* Future public explainer belongs here once video, poster and captions exist. */}

        {/* Highlight metrics */}
        <div
          className={`grid grid-cols-2 ${cols} gap-2 md:gap-3 ${study.highlightsNote ? "mb-2" : "mb-4 md:mb-6"}`}
        >
          {study.highlights.map((h) => (
            <div
              key={h.metric}
              className="flex flex-col bg-neo-yellow-light/20 dark:bg-zinc-800 border-2 border-black dark:border-neo-blue-500 p-2 md:p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            >
              <div className="text-outline-white text-center text-lg md:text-2xl font-black text-foreground dark:text-white mb-0.5 md:mb-1">
                {h.metric}
              </div>
              <div className="text-left text-[10px] md:text-xs font-bold text-muted-foreground dark:text-gray-300 leading-snug">
                {h.description}
              </div>
              {h.source && (
                <a
                  href={h.source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-auto pt-1.5 self-start inline-flex items-center gap-1 font-mono text-[9px] md:text-[11px] font-bold text-neo-blue-600 dark:text-neo-blue-300 underline decoration-1 underline-offset-2 hover:decoration-2 ${FOCUS_RING}`}
                >
                  Source: {h.source.label}
                  <ExternalLink size={10} aria-hidden="true" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
            </div>
          ))}
        </div>
        {study.highlightsNote && (
          <p className="text-[10px] md:text-xs font-bold text-muted-foreground dark:text-gray-400 mb-4 md:mb-6 text-center md:text-left">
            {study.highlightsNote}
          </p>
        )}

        {/* Feature blocks */}
        {study.features && study.features.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-4 md:mb-6">
            {study.features.map((f) => (
              <div
                key={f.title}
                className="bg-white/70 dark:bg-slate-900/70 border-2 border-black dark:border-neo-blue-500 p-2 md:p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
              >
                <div className="text-xs md:text-sm font-black uppercase tracking-wide text-foreground dark:text-white mb-0.5 md:mb-1">
                  {f.title}
                </div>
                <div className="text-[10px] md:text-xs font-bold text-muted-foreground dark:text-gray-300 leading-snug">
                  {f.description}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tech badges */}
        <div className="flex flex-wrap justify-center md:justify-start gap-1.5 mb-4 md:mb-6">
          {study.technologies.map((tech) => (
            <Badge
              key={tech}
              className="bg-gray-100 dark:bg-slate-700 text-foreground dark:text-gray-200 border-2 border-black dark:border-neo-blue-500 font-bold text-xs hover:bg-neo-pink-light hover:text-white dark:hover:bg-neo-pink-dark transition-colors"
            >
              {tech}
            </Badge>
          ))}
        </div>

        {/* Expandable content: kept in the server HTML, hidden until opened */}
        <div
          id={detailsId}
          hidden={!isExpanded}
          className="space-y-6 pt-4 border-t-2 border-dashed border-black/20 dark:border-white/20 animate-in fade-in duration-300"
        >
          {/* Problem */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-neo-red-light dark:bg-neo-red-dark border-2 border-black dark:border-neo-blue-500 flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <Lightbulb size={16} className="text-white" aria-hidden="true" />
              </div>
              <h4 className="text-lg font-black text-foreground dark:text-white uppercase tracking-wide">
                The Problem
              </h4>
            </div>
            <p className="font-bold text-foreground dark:text-gray-200 leading-relaxed pl-10">
              {study.problem}
            </p>
          </div>

          {/* Solution */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-neo-green-light dark:bg-neo-green-dark border-2 border-black dark:border-neo-blue-500 flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <Wrench size={16} className="text-white" aria-hidden="true" />
              </div>
              <h4 className="text-lg font-black text-foreground dark:text-white uppercase tracking-wide">
                What I Built
              </h4>
            </div>
            <p className="font-bold text-foreground dark:text-gray-200 leading-relaxed pl-10">
              {study.solution}
            </p>
          </div>

          {/* Impact */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-neo-purple-light dark:bg-neo-purple-dark border-2 border-black dark:border-neo-blue-500 flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <TrendingUp size={16} className="text-white" aria-hidden="true" />
              </div>
              <h4 className="text-lg font-black text-foreground dark:text-white uppercase tracking-wide">
                Impact
              </h4>
            </div>
            <p className="font-bold text-foreground dark:text-gray-200 leading-relaxed pl-10">
              {study.impact}
            </p>
          </div>

          {/* Architecture */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-neo-blue-500 dark:bg-neo-blue-600 border-2 border-black dark:border-neo-blue-400 flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <Layers size={16} className="text-white" aria-hidden="true" />
              </div>
              <h4 className="text-lg font-black text-foreground dark:text-white uppercase tracking-wide">
                Architecture
              </h4>
            </div>
            <div className="pl-10">
              {study.architecture && isExpanded ? (
                <>
                  <ArchitectureDiagram architecture={study.architecture} slug={study.slug} />
                  <p className="sr-only">{study.architectureDescription}</p>
                </>
              ) : (
                <div className="bg-gray-900 dark:bg-black border-2 border-black dark:border-neo-blue-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 font-mono text-sm text-green-400 leading-relaxed overflow-x-auto">
                  {study.architectureDescription}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Links + expand toggle */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 md:gap-3 mt-4 md:mt-6 pt-3 md:pt-4 border-t-2 border-black/10 dark:border-white/10">
          {study.links.map((link) => (
            <CardLink key={link.label} link={link} />
          ))}

          <button
            type="button"
            onClick={toggleExpanded}
            aria-expanded={isExpanded}
            aria-controls={detailsId}
            className={`w-full md:w-auto md:ml-auto justify-center font-black bg-white dark:bg-slate-700 text-foreground dark:text-white ${BUTTON_BASE} ${BUTTON_PRESS} ${FOCUS_RING}`}
          >
            {isExpanded ? (
              <>
                COLLAPSE <ChevronUp size={16} aria-hidden="true" />
              </>
            ) : (
              <>
                FULL PROJECT <ChevronDown size={16} aria-hidden="true" />
              </>
            )}
            <span className="sr-only"> — {study.title}</span>
          </button>
        </div>
      </div>
    </article>
  )
}

export function Portfolio() {
  return (
    <section id="portfolio" className="min-h-[100svh] md:min-h-screen bg-blue-600 dark:bg-gray-800 py-10 md:py-20 relative overflow-hidden">
      <AnimatedBackground boost />
      <div className="relative z-10 max-w-5xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="text-center mb-6 md:mb-16">
          <h2 className="section-text-outline text-2xl md:text-6xl font-black text-white mb-2 md:mb-4">
            PROJECTS
          </h2>
          <p className="section-text-outline-thin text-xs md:text-xl font-bold text-white dark:text-gray-200 max-w-2xl mx-auto">
            Real projects, real code, real users — not lorem ipsum placeholders
          </p>
        </div>

        <div className="space-y-6 md:space-y-12">
          {caseStudies.map((study, index) => (
            <CaseStudyCard key={study.slug} study={study} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
