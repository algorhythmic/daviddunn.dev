"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, ChevronDown, ChevronUp, Layers, Lightbulb, Wrench, TrendingUp, Lock } from "lucide-react"
import { caseStudies, type CaseStudy } from "@/lib/portfolio-data"
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

function CaseStudyCard({ study, index }: { study: CaseStudy; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    const applyHash = () => {
      const hash = window.location.hash.slice(1).toLowerCase()
      if (!hash) return
      if (hash === study.slug || hash === `case-study-${study.id}`) {
        setIsExpanded(true)
        requestAnimationFrame(() => {
          document
            .getElementById(`case-study-${study.id}`)
            ?.scrollIntoView({ behavior: "smooth", block: "start" })
        })
      }
    }
    applyHash()
    window.addEventListener("hashchange", applyHash)
    return () => window.removeEventListener("hashchange", applyHash)
  }, [study.slug, study.id])

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

  return (
    <div
      id={`case-study-${study.id}`}
      className="scroll-mt-12 md:scroll-mt-20 bg-white/85 dark:bg-slate-800/85 backdrop-blur-[2px] border-2 md:border-4 border-black dark:border-neo-blue-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:dark:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300"
    >
      {/* Header band */}
      <div
        className={`${study.accentColor} ${study.darkAccentColor} border-b-4 border-black dark:border-neo-blue-500 px-4 md:px-8 py-4 md:py-5`}
      >
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-4">
          <div className="flex-1 min-w-0 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 md:gap-3 mb-1 md:mb-2">
              <span className="text-2xl md:text-3xl">{study.icon}</span>
              <h3 className="text-outline-black text-xl md:text-3xl font-black text-white tracking-tight leading-tight">
                {study.title}
              </h3>
            </div>
            <p className="text-outline-black text-xs md:text-base font-bold text-white/90">
              {study.subtitle}
            </p>
          </div>
          <span className="text-[10px] md:text-xs font-black bg-black text-white px-2 py-1 md:px-3 md:py-1.5 border-2 border-white shrink-0 uppercase tracking-wider self-center">
            Case Study {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="px-4 md:px-8 py-4 md:py-6">
        {/* Hook */}
        <p className="text-sm md:text-lg font-bold text-foreground dark:text-gray-200 leading-relaxed mb-4 md:mb-6 text-center md:text-left">
          {study.hook}
        </p>

        {/* Highlight metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-4 md:mb-6">
          {study.highlights.map((h, i) => (
            <div
              key={i}
              className="bg-neo-yellow-light/20 dark:bg-zinc-800 border-2 border-black dark:border-neo-blue-500 p-2 md:p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            >
              <div className="text-outline-white text-center text-lg md:text-2xl font-black text-foreground dark:text-white mb-0.5 md:mb-1">
                {h.metric}
              </div>
              <div className="text-left text-[10px] md:text-xs font-bold text-muted-foreground dark:text-gray-300 leading-snug">
                {h.description}
              </div>
            </div>
          ))}
        </div>

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

        {/* Expandable content */}
        {isExpanded && (
          <div className="space-y-6 pt-4 border-t-2 border-dashed border-black/20 dark:border-white/20 animate-in fade-in duration-300">
            {/* Problem */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-neo-red-light dark:bg-neo-red-dark border-2 border-black dark:border-neo-blue-500 flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <Lightbulb size={16} className="text-white" />
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
                  <Wrench size={16} className="text-white" />
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
                  <TrendingUp size={16} className="text-white" />
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
                  <Layers size={16} className="text-white" />
                </div>
                <h4 className="text-lg font-black text-foreground dark:text-white uppercase tracking-wide">
                  Architecture
                </h4>
              </div>
              <div className="pl-10">
                {study.architecture ? (
                  <ArchitectureDiagram architecture={study.architecture} slug={study.slug} />
                ) : (
                  <div className="bg-gray-900 dark:bg-black border-2 border-black dark:border-neo-blue-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 font-mono text-sm text-green-400 leading-relaxed overflow-x-auto">
                    {study.architectureDescription}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Links + expand toggle */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 md:gap-3 mt-4 md:mt-6 pt-3 md:pt-4 border-t-2 border-black/10 dark:border-white/10">
          {study.links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              title={link.private ? "This repository is private — link will 404 unless you have access" : undefined}
              className={`flex items-center gap-1.5 font-bold py-2 px-4 border-2 border-black dark:border-neo-blue-500 text-sm transition-all duration-150 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] ${
                link.private
                  ? "bg-gray-600 dark:bg-gray-700 text-gray-200 hover:bg-gray-700 opacity-80"
                  : link.type === "github"
                    ? "bg-gray-800 dark:bg-gray-700 text-white hover:bg-gray-900"
                    : link.type === "live"
                      ? "bg-neo-green-light dark:bg-neo-green-dark text-white hover:bg-green-600"
                      : "bg-neo-yellow-light dark:bg-neo-yellow-dark text-black hover:bg-yellow-500"
              }`}
            >
              {link.private ? (
                <Lock size={14} />
              ) : link.type === "github" ? (
                <Github size={14} />
              ) : (
                <ExternalLink size={14} />
              )}
              {link.label}
              {link.private && (
                <span className="text-[10px] uppercase tracking-wider opacity-90 ml-0.5 font-mono">
                  (private)
                </span>
              )}
            </a>
          ))}

          <button
            onClick={toggleExpanded}
            className="w-full md:w-auto md:ml-auto flex items-center justify-center gap-1.5 font-black py-2 px-4 border-2 border-black dark:border-neo-blue-500 bg-white dark:bg-slate-700 text-foreground dark:text-white text-sm transition-all duration-150 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[3px] active:translate-y-[3px]"
          >
            {isExpanded ? (
              <>
                COLLAPSE <ChevronUp size={16} />
              </>
            ) : (
              <>
                FULL CASE STUDY <ChevronDown size={16} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export function Portfolio() {
  return (
    <section id="portfolio" className="min-h-[100svh] md:min-h-screen bg-blue-600 dark:bg-gray-800 py-10 md:py-20 relative overflow-hidden">
      <AnimatedBackground boost />
      <div className="relative z-10 max-w-5xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="text-center mb-6 md:mb-16">
          <h2 className="section-text-outline text-2xl md:text-6xl font-black text-foreground dark:text-white mb-2 md:mb-4">
            CASE STUDIES
          </h2>
          <p className="section-text-outline-thin text-xs md:text-xl font-bold text-foreground dark:text-gray-200 max-w-2xl mx-auto">
            Real projects, real code, real users — not lorem ipsum placeholders
          </p>
        </div>

        <div className="space-y-6 md:space-y-12">
          {caseStudies.map((study, index) => (
            <CaseStudyCard key={study.id} study={study} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
