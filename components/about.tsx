"use client"

import type { ReactNode } from "react"
import Image from "next/image"
import { Terminal, MapPin, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { AnimatedBackground } from "@/components/hero-background"
import { caseStudies } from "@/lib/portfolio-data"

type AboutProps = {
  onOpenResume: () => void
}

// Project cards are addressed by slug (#runtime, #saga, ...), never by numeric
// id, so renumbering or reordering the cards cannot break these links.
type ProjectSlug = "odin" | "runtime" | "saga" | "dbriefly" | "nexus" | "happily" | "mcp"

const knownSlugs = new Set<string>(caseStudies.map((s) => s.slug))

// Each skill links to the project that actually uses it. Skills from client or
// employment work (no project card) render as plain, non-clickable chips.
const focus: { label: string; items: { name: string; project?: ProjectSlug }[] }[] = [
  {
    label: "AI Systems",
    items: [
      { name: "Claude API", project: "nexus" },
      { name: "OpenAI API", project: "dbriefly" },
      { name: "Vertex AI" },
      { name: "Agent Runtime · Computer Use", project: "runtime" },
      { name: "Multi-Agent Orchestration", project: "saga" },
      { name: "MCP Servers", project: "mcp" },
      { name: "Evals", project: "runtime" },
      { name: "Voice Agents", project: "dbriefly" },
    ],
  },
  {
    label: "Infrastructure & Automation",
    items: [
      { name: "Docker", project: "saga" },
      { name: "CI/CD", project: "runtime" },
      { name: "Proxmox", project: "saga" },
      { name: "LXC", project: "saga" },
      { name: "MQTT", project: "saga" },
      { name: "Fly.io", project: "nexus" },
      { name: "Grafana" },
    ],
  },
  {
    label: "Full-Stack Product",
    items: [
      { name: "Python", project: "dbriefly" },
      { name: "Go", project: "runtime" },
      { name: "TypeScript", project: "mcp" },
      { name: "FastAPI", project: "dbriefly" },
      { name: "React", project: "nexus" },
      { name: "Next.js", project: "dbriefly" },
      { name: "Node.js", project: "mcp" },
    ],
  },
  {
    label: "Data & Intelligence",
    items: [
      { name: "PostgreSQL · pgvector", project: "dbriefly" },
      { name: "SQLite", project: "runtime" },
      { name: "DuckDB" },
      { name: "WebSockets", project: "nexus" },
      { name: "Kafka" },
      { name: "dbt" },
      { name: "Airflow" },
    ],
  },
]

// Navigate to a project card via its slug hash. The card listens for
// hashchange (expands + scrolls); re-clicking the current hash fires no event,
// so replay it explicitly.
function goToProject(slug: string) {
  if (window.location.hash.slice(1).toLowerCase() === slug) {
    window.dispatchEvent(new HashChangeEvent("hashchange"))
  } else {
    window.location.hash = slug
  }
}

const projectLinkClass =
  "text-neo-blue-600 dark:text-neo-blue-300 font-black underline decoration-2 underline-offset-2 hover:decoration-4"

function ProjectLink({ slug, children }: { slug: ProjectSlug; children: ReactNode }) {
  if (!knownSlugs.has(slug)) return <span className="font-black">{children}</span>
  return (
    <a
      href={`#${slug}`}
      onClick={(e) => {
        e.preventDefault()
        goToProject(slug)
      }}
      className={projectLinkClass}
    >
      {children}
    </a>
  )
}

const chipBase =
  "bg-neo-pink-light dark:bg-neo-pink-dark text-theme-border dark:text-black font-bold px-1.5 py-0.5 border md:border-2 border-theme-border dark:border-black text-[10px] md:text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
const chipInteractive =
  "hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all duration-150 hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] hover:bg-neo-pink-300 dark:hover:bg-neo-pink-light cursor-pointer"

// Same order as the project cards.
const achievements: { title: string; body: ReactNode }[] = [
  {
    title: "Odin · Next Project",
    body: (
      <>
        Designing <ProjectLink slug="odin">Odin</ProjectLink> as a supervisory layer over existing
        agent harnesses: persistent commitments, memory, attention routing and selective review.
        Extraction from the original Saga prototype is planned; Claude Code is the first adapter.
      </>
    ),
  },
  {
    title: "Agent Runtime",
    body: (
      <>
        Built the independently usable tools behind a local-first{" "}
        <ProjectLink slug="runtime">agent runtime</ProjectLink>: Wayland Computer Use acts on a
        real desktop and rechecks focus and window identity before every input, Braid picks
        context within a fixed budget, and Heimdall keeps task state and proposes completion from
        evidence for human review.
      </>
    ),
  },
  {
    title: "Worker Execution",
    body: (
      <>
        Built <ProjectLink slug="saga">Saga</ProjectLink>&apos;s container-worker prototype with
        MQTT events and reviewed maintenance PRs. The next phase separates execution into a
        governed service that Odin or another orchestrator can use.
      </>
    ),
  },
  {
    title: "Voice-First AI Briefings",
    body: (
      <>
        Built <ProjectLink slug="dbriefly">dbriefly</ProjectLink>, a daily audio briefing built
        from the podcasts, channels, and newsletters you follow, with original clips inline and a
        realtime voice agent you can talk back to.
      </>
    ),
  },
  {
    title: "Real-Time AI Intelligence",
    body: (
      <>
        Built <ProjectLink slug="nexus">Nexus</ProjectLink> and its live dashboard{" "}
        <ProjectLink slug="nexus">marketfinder</ProjectLink>, combining streaming ingestion, anomaly
        detection, semantic market clustering, and LLM-generated analysis.
      </>
    ),
  },
  {
    title: "Client Delivery",
    body: (
      <>
        Scoped and delivered <ProjectLink slug="happily">happily.love</ProjectLink> end-to-end for a
        matchmaking client: Claude-assisted onboarding interviews, an invite-based applicant flow,
        structured profiles, approval workflows, and a private matchmaker dashboard.
      </>
    ),
  },
]

export function About({ onOpenResume }: AboutProps) {
  const techFocusCard = (
    <Card className="border-2 md:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white/85 dark:bg-slate-800/85 backdrop-blur-[2px] dark:border-neo-blue-500 dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:dark:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <CardContent className="p-3 md:p-6">
        <h3 className="text-lg md:text-2xl font-black text-black dark:text-white mb-2 md:mb-4">TECHNICAL FOCUS</h3>
        <div className="space-y-3 md:space-y-4">
          {focus.map(({ label, items }) => (
            <div key={label}>
              <h4 className="font-black uppercase tracking-wide text-foreground dark:text-white text-xs md:text-sm mb-2">
                {label}
              </h4>
              <div className="flex flex-wrap gap-1 md:gap-1.5">
                {items.map(({ name, project }) =>
                  project && knownSlugs.has(project) ? (
                    <a
                      key={name}
                      href={`#${project}`}
                      onClick={(e) => {
                        e.preventDefault()
                        goToProject(project)
                      }}
                      className={`${chipBase} ${chipInteractive}`}
                    >
                      {name}
                    </a>
                  ) : (
                    <span key={name} className={chipBase}>
                      {name}
                    </span>
                  ),
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <section id="about" className="min-h-[100svh] md:min-h-screen bg-orange-300 dark:bg-gray-900 py-10 md:py-20 relative overflow-hidden">
      <AnimatedBackground boost />
      <div className="relative z-10 max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="text-center mb-6 md:mb-12">
          <h2 className="section-text-outline text-2xl md:text-6xl font-black text-white mb-2 md:mb-4">ABOUT ME</h2>
          <p className="section-text-outline-thin text-xs md:text-xl font-bold text-white mb-4 md:mb-8 dark:text-gray-200">
            Building intelligent systems from data pipelines to user interfaces
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
          {/* Profile Card + (on lg+) Technical Focus stacked below */}
          <div className="lg:col-span-1 space-y-4 md:space-y-8">
            <Card className="border-2 md:border-4 border-theme-border shadow-[4px_4px_0px_0px] md:shadow-[8px_8px_0px_0px] shadow-theme-border bg-white/85 dark:bg-slate-800/85 backdrop-blur-[2px] dark:border-neo-blue-500 dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:dark:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <CardContent className="p-4 md:p-6">
                <div className="text-center mb-4 md:mb-6">
                  <div className="w-28 h-28 md:w-44 md:h-44 border-2 md:border-4 border-theme-border dark:border-neo-blue-500 mx-auto mb-3 md:mb-4 overflow-hidden bg-neo-cyan-light dark:bg-slate-900">
                    <Image
                      src="/dd-profile.png"
                      alt="David Dunn"
                      width={384}
                      height={384}
                      priority
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg md:text-2xl font-black text-foreground mb-1 md:mb-2 dark:text-white">DAVID DUNN</h3>
                  <p className="text-sm md:text-base font-bold text-muted-foreground mb-1 dark:text-gray-300">
                    Applied AI &amp; Integration Engineer
                  </p>
                  <div className="space-y-1 md:space-y-2 text-xs md:text-sm font-bold text-foreground dark:text-gray-200">
                    <div className="flex items-center justify-center">
                      <MapPin size={14} className="mr-1.5 md:mr-2 dark:text-neo-blue-400" />
                      Santa Clara, CA
                    </div>
                    <div className="flex items-center justify-center">
                      <Calendar size={14} className="mr-1.5 md:mr-2 dark:text-neo-blue-400" />
                      7+ Years Experience
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onOpenResume}
                  className="flex items-center justify-center w-full bg-neo-green-light dark:bg-neo-green-dark hover:bg-green-500 text-theme-border dark:text-black font-black py-2 md:py-3 px-3 md:px-4 border-2 md:border-4 border-theme-border dark:border-black shadow-[3px_3px_0px_0px] md:shadow-[4px_4px_0px_0px] shadow-theme-border dark:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px] hover:shadow-theme-border active:shadow-none transition-all duration-150 text-sm md:text-base hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[3px] active:translate-y-[3px]"
                >
                  <Terminal className="inline mr-1.5 md:mr-2" size={16} />
                  VIEW RESUME
                </button>
              </CardContent>
            </Card>

            {/* Technical Focus — visible on lg+ only (mobile renders it in the right column instead) */}
            <div className="hidden lg:block">{techFocusCard}</div>
          </div>

          {/* Content Cards */}
          <div className="lg:col-span-2 space-y-4 md:space-y-8">
            {/* Bio */}
            <Card className="border-2 md:border-4 border-theme-border shadow-[4px_4px_0px_0px] md:shadow-[8px_8px_0px_0px] shadow-theme-border bg-white/85 dark:bg-slate-800/85 backdrop-blur-[2px] dark:border-neo-blue-500 dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:dark:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <CardContent className="p-3 md:p-6">
                <h3 className="text-lg md:text-2xl font-black text-foreground mb-2 md:mb-4 dark:text-white">MY STORY</h3>
                <div className="space-y-3 md:space-y-4 text-foreground dark:text-gray-200 font-bold leading-relaxed text-xs md:text-base">
                  <p>
                    I build AI systems that plan, execute, review, and fix their own work — with a
                    person approving what actually ships.
                  </p>
                  <p>
                    I'm particularly interested in problems where AI is not the whole product, but{" "}
                    <span className="dark:text-neo-blue-300">one intelligent layer inside a larger system</span>{" "}
                    that's connected to data, users, workflows, infrastructure, and human judgment.
                  </p>
                  <p>
                    My path into AI engineering has not been a straight line, and that is part of the value
                    I bring. I have worked in computational research, analytics engineering, BI systems,
                    client consulting, international media production, and early-stage startup environments.
                    Across those roles, the common thread has been{" "}
                    <span className="dark:text-neo-blue-300">integration</span>: understanding the problem,
                    connecting the right tools, and building systems that work in practice.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="border-2 md:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white/85 dark:bg-slate-800/85 backdrop-blur-[2px] dark:border-neo-blue-500 dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:dark:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <CardContent className="p-3 md:p-6">
                <h3 className="text-lg md:text-2xl font-black text-black dark:text-white mb-2 md:mb-4">KEY ACHIEVEMENTS</h3>
                <div className="space-y-3 md:space-y-4">
                  {achievements.map(({ title, body }, i) => (
                    <div key={title} className="flex items-start">
                      <div className="w-5 h-5 md:w-6 md:h-6 bg-neo-green-light dark:bg-neo-green-dark border md:border-2 border-theme-border dark:border-black flex items-center justify-center mr-2 md:mr-3 mt-0.5 font-black text-xs md:text-sm text-theme-border dark:text-black shrink-0">
                        {i + 1}
                      </div>
                      <div>
                        <h4 className="font-black uppercase tracking-wide text-foreground dark:text-white text-xs md:text-base mb-1">
                          {title}
                        </h4>
                        <p className="font-bold text-foreground dark:text-gray-200 text-xs md:text-base">{body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Technical Focus — visible below lg only (lg+ renders it in the left column instead) */}
            <div className="lg:hidden">{techFocusCard}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
