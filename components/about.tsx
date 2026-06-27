"use client"

import Image from "next/image"
import { Terminal, MapPin, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { AnimatedBackground } from "@/components/hero-background"

type AboutProps = {
  onOpenResume: () => void
}

export function About({ onOpenResume }: AboutProps) {
  const focus: { label: string; items: { name: string; caseStudyId: number }[] }[] = [
    {
      label: "AI Systems",
      items: [
        { name: "LLM APIs (Claude · OpenAI · Vertex)", caseStudyId: 2 },
        { name: "Multi-Agent Orchestration", caseStudyId: 1 },
        { name: "MCP Servers", caseStudyId: 4 },
        { name: "Evals", caseStudyId: 1 },
      ],
    },
    {
      label: "Infrastructure & Automation",
      items: [
        { name: "Docker", caseStudyId: 1 },
        { name: "CI/CD", caseStudyId: 1 },
        { name: "Proxmox", caseStudyId: 1 },
        { name: "LXC", caseStudyId: 1 },
        { name: "Fly.io", caseStudyId: 2 },
        { name: "Prometheus", caseStudyId: 2 },
        { name: "Grafana", caseStudyId: 2 },
      ],
    },
    {
      label: "Full-Stack Product",
      items: [
        { name: "Python", caseStudyId: 2 },
        { name: "TypeScript", caseStudyId: 2 },
        { name: "React", caseStudyId: 3 },
        { name: "Next.js", caseStudyId: 3 },
        { name: "Node.js", caseStudyId: 4 },
        { name: "Tailwind", caseStudyId: 3 },
      ],
    },
    {
      label: "Data & Intelligence",
      items: [
        { name: "PostgreSQL", caseStudyId: 2 },
        { name: "DuckDB", caseStudyId: 2 },
        { name: "WebSockets", caseStudyId: 2 },
        { name: "Kafka", caseStudyId: 2 },
        { name: "dbt", caseStudyId: 2 },
        { name: "Airflow", caseStudyId: 2 },
      ],
    },
  ]

  const scrollToCaseStudy = (id: number) => {
    const el = document.getElementById(`case-study-${id}`)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

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
                {items.map(({ name, caseStudyId }) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => scrollToCaseStudy(caseStudyId)}
                    className="bg-neo-pink-light dark:bg-neo-pink-dark text-theme-border dark:text-black font-bold px-1.5 py-0.5 border md:border-2 border-theme-border dark:border-black text-[10px] md:text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all duration-150 hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] hover:bg-neo-pink-300 dark:hover:bg-neo-pink-light cursor-pointer"
                  >
                    {name}
                  </button>
                ))}
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
          <h2 className="section-text-outline text-2xl md:text-6xl font-black text-foreground mb-2 md:mb-4 dark:text-white">ABOUT ME</h2>
          <p className="section-text-outline-thin text-xs md:text-xl font-bold text-foreground mb-4 md:mb-8 dark:text-gray-200">
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
                    Applied AI Engineer
                  </p>
                  <div className="space-y-1 md:space-y-2 text-xs md:text-sm font-bold text-foreground dark:text-gray-200">
                    <div className="flex items-center justify-center">
                      <MapPin size={14} className="mr-1.5 md:mr-2 dark:text-neo-blue-400" />
                      Santa Clara, CA
                    </div>
                    <div className="flex items-center justify-center">
                      <Calendar size={14} className="mr-1.5 md:mr-2 dark:text-neo-blue-400" />
                      6+ Years Experience
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
                  <div className="flex items-start">
                    <div className="w-5 h-5 md:w-6 md:h-6 bg-neo-green-light dark:bg-neo-green-dark border md:border-2 border-theme-border dark:border-black flex items-center justify-center mr-2 md:mr-3 mt-0.5 font-black text-xs md:text-sm text-theme-border dark:text-black shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="font-black uppercase tracking-wide text-foreground dark:text-white text-xs md:text-base mb-1">
                        Agent Orchestration
                      </h4>
                      <p className="font-bold text-foreground dark:text-gray-200 text-xs md:text-base">
                        Built <a href="#saga" className="text-neo-blue-600 dark:text-neo-blue-300 font-black underline decoration-2 underline-offset-2 hover:decoration-4">Saga</a>, a multi-agent
                        orchestration system that coordinates parallel Claude Code workers in sandboxed
                        Docker containers — with critic gates, MQTT event streams, and a recursive PR
                        loop back to its own repo.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-5 h-5 md:w-6 md:h-6 bg-neo-green-light dark:bg-neo-green-dark border md:border-2 border-theme-border dark:border-black flex items-center justify-center mr-2 md:mr-3 mt-0.5 font-black text-xs md:text-sm text-theme-border dark:text-black shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="font-black uppercase tracking-wide text-foreground dark:text-white text-xs md:text-base mb-1">
                        Real-Time AI Intelligence
                      </h4>
                      <p className="font-bold text-foreground dark:text-gray-200 text-xs md:text-base">
                        Built <a href="#nexus" className="text-neo-blue-600 dark:text-neo-blue-300 font-black underline decoration-2 underline-offset-2 hover:decoration-4">Nexus</a> and{" "}
                        <a href="#nexus" className="text-neo-blue-600 dark:text-neo-blue-300 font-black underline decoration-2 underline-offset-2 hover:decoration-4">marketfinder</a>, combining
                        streaming ingestion, anomaly detection, semantic market clustering, and
                        LLM-generated analysis.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-5 h-5 md:w-6 md:h-6 bg-neo-green-light dark:bg-neo-green-dark border md:border-2 border-theme-border dark:border-black flex items-center justify-center mr-2 md:mr-3 mt-0.5 font-black text-xs md:text-sm text-theme-border dark:text-black shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="font-black uppercase tracking-wide text-foreground dark:text-white text-xs md:text-base mb-1">
                        Shipped AI Product
                      </h4>
                      <p className="font-bold text-foreground dark:text-gray-200 text-xs md:text-base">
                        Built <a href="#happily" className="text-neo-blue-600 dark:text-neo-blue-300 font-black underline decoration-2 underline-offset-2 hover:decoration-4">happily.love</a>, an
                        AI-powered matchmaking SaaS platform with guided onboarding, structured profile
                        modeling, and private matchmaker workflows.
                      </p>
                    </div>
                  </div>
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
