"use client"

import { ExternalLink, Linkedin, Github, Twitter, Mail, MapPin, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { AnimatedBackground } from "@/components/hero-background"

export function About() {
  const skills = [
    "Python",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Claude API",
    "OpenAI API",
    "Vertex AI",
    "MCP SDK",
    "WebSockets",
    "Kafka",
    "PostgreSQL",
    "MongoDB",
    "DuckDB",
    "Convex",
    "Docker",
    "Airflow",
    "Fly.io",
  ]

  const achievements = [
    "Built an end-to-end prediction market intelligence platform spanning real-time ingestion, anomaly detection, LLM analysis, and autonomous execution",
    "Engineered a multi-layer comparison pipeline reducing 161M potential market comparisons to ~1K LLM calls — a 99.99% cost reduction",
    "Created three open-source MCP servers across JavaScript and Python, with community adoption and contributions",
    "Co-founded and shipped happily.love, a live AI-powered matchmaking SaaS platform",
  ]

  return (
    <section id="about" className="min-h-[100svh] md:min-h-screen bg-neo-red-light dark:bg-gray-900 py-10 md:py-20 relative overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10 max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="text-center mb-6 md:mb-12">
          <h2 className="text-2xl md:text-6xl font-black text-foreground mb-2 md:mb-4 dark:text-white">ABOUT ME</h2>
          <p className="text-xs md:text-xl font-bold text-foreground mb-4 md:mb-8 dark:text-gray-200">
            Building intelligent systems from data pipelines to user interfaces
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="border-2 md:border-4 border-theme-border shadow-[4px_4px_0px_0px] md:shadow-[8px_8px_0px_0px] shadow-theme-border bg-theme-surface dark:bg-slate-800 dark:border-neo-blue-500 dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:dark:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <CardContent className="p-4 md:p-6">
                <div className="text-center mb-4 md:mb-6">
                  <div className="w-20 h-20 md:w-32 md:h-32 bg-gradient-to-br from-neo-cyan-light to-blue-500 dark:from-neo-cyan-dark dark:to-blue-400 border-2 md:border-4 border-theme-border dark:border-neo-blue-500 mx-auto mb-3 md:mb-4 flex items-center justify-center text-2xl md:text-4xl font-black text-theme-border dark:text-white">
                    DD
                  </div>
                  <h3 className="text-lg md:text-2xl font-black text-foreground mb-1 md:mb-2 dark:text-white">DAVID DUNN</h3>
                  <p className="text-sm md:text-base font-bold text-muted-foreground mb-3 md:mb-4 dark:text-gray-300">
                    AI Engineer
                  </p>

                  <div className="space-y-1 md:space-y-2 text-xs md:text-sm font-bold text-foreground dark:text-gray-200">
                    <div className="flex items-center justify-center">
                      <MapPin size={14} className="mr-1.5 md:mr-2 dark:text-neo-blue-400" />
                      Santa Clara, CA
                    </div>
                    <div className="flex items-center justify-center">
                      <Calendar size={14} className="mr-1.5 md:mr-2 dark:text-neo-blue-400" />
                      3+ Years Experience
                    </div>
                  </div>
                </div>

                <a
                  href="https://linkedin.com/in/mrdaviddunn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full bg-neo-green-light dark:bg-neo-green-dark hover:bg-green-500 text-theme-border dark:text-black font-black py-2 md:py-3 px-3 md:px-4 border-2 md:border-4 border-theme-border dark:border-black shadow-[3px_3px_0px_0px] md:shadow-[4px_4px_0px_0px] shadow-theme-border dark:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px] hover:shadow-theme-border active:shadow-none transition-all duration-150 mb-4 md:mb-6 text-sm md:text-base hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[3px] active:translate-y-[3px]"
                >
                  <ExternalLink className="inline mr-1.5 md:mr-2" size={16} />
                  VIEW RESUME
                </a>

                <div className="space-y-2 md:space-y-3">
                  <a
                    href="https://linkedin.com/in/mrdaviddunn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-1.5 md:py-2 px-3 md:px-4 border-2 border-black dark:border-neo-blue-500 transition-all duration-150 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] text-sm md:text-base"
                  >
                    <Linkedin className="mr-3" size={20} />
                    LINKEDIN
                  </a>
                  <a
                    href="https://github.com/algorhythmic"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-1.5 md:py-2 px-3 md:px-4 border-2 border-black dark:border-neo-blue-500 transition-all duration-150 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] text-sm md:text-base"
                  >
                    <Github className="mr-3" size={20} />
                    GITHUB
                  </a>
                  <a
                    href="https://x.com/MrDavidDunn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center w-full bg-cyan-400 hover:bg-cyan-500 text-black font-bold py-1.5 md:py-2 px-3 md:px-4 border-2 border-black dark:border-neo-blue-500 transition-all duration-150 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] text-sm md:text-base"
                  >
                    <Twitter className="mr-3" size={20} />
                    TWITTER
                  </a>
                  <a
                    href="mailto:davidalexanderdunn@gmail.com"
                    className="flex items-center w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-1.5 md:py-2 px-3 md:px-4 border-2 border-black dark:border-neo-blue-500 transition-all duration-150 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] text-sm md:text-base"
                  >
                    <Mail className="mr-3" size={20} />
                    EMAIL
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Content Cards */}
          <div className="lg:col-span-2 space-y-4 md:space-y-8">
            {/* Bio */}
            <Card className="border-2 md:border-4 border-theme-border shadow-[4px_4px_0px_0px] md:shadow-[8px_8px_0px_0px] shadow-theme-border bg-theme-surface dark:bg-slate-800 dark:border-neo-blue-500 dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:dark:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <CardContent className="p-3 md:p-6">
                <h3 className="text-lg md:text-2xl font-black text-foreground mb-2 md:mb-4 dark:text-white">MY STORY</h3>
                <div className="space-y-3 md:space-y-4 text-foreground dark:text-gray-200 font-bold leading-relaxed text-xs md:text-base">
                  <p>
                    I'm an <span className="dark:text-neo-blue-300">AI engineer</span> based in
                    Santa Clara, CA, focused on building systems that combine real-time data processing with
                    large language models. My work spans the full stack — from WebSocket streaming and anomaly
                    detection pipelines to React frontends and autonomous execution systems.
                  </p>
                  <p>
                    Most recently, I built a{" "}
                    <span className="dark:text-neo-blue-300">prediction market intelligence platform</span>{" "}
                    that ingests streaming data across multiple platforms, detects anomalies using sliding-window
                    analysis, and generates narrative explanations using Claude, OpenAI, and Vertex AI. I also
                    co-founded <span className="dark:text-neo-blue-300">happily.love</span>, an AI-powered
                    matchmaking platform, and contribute to the{" "}
                    <span className="dark:text-neo-blue-300">Model Context Protocol ecosystem</span> with
                    open-source MCP servers.
                  </p>
                  <p>
                    I'm drawn to problems where real-time systems meet AI — where the challenge isn't just
                    building a model, but shipping a complete system around it. When I'm not writing code,
                    you'll find me hiking in the Bay Area or exploring the latest developments in the AI
                    tooling ecosystem.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card className="border-2 md:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white dark:bg-slate-800 dark:border-neo-blue-500 dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:dark:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <CardContent className="p-3 md:p-6">
                <h3 className="text-lg md:text-2xl font-black text-black dark:text-white mb-2 md:mb-4">TECHNICAL SKILLS</h3>
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-neo-pink-light dark:bg-neo-pink-dark text-theme-border dark:text-black font-bold px-2 py-0.5 md:px-3 md:py-1 border md:border-2 border-theme-border dark:border-black text-[10px] md:text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="border-2 md:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white dark:bg-slate-800 dark:border-neo-blue-500 dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:dark:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <CardContent className="p-3 md:p-6">
                <h3 className="text-lg md:text-2xl font-black text-black dark:text-white mb-2 md:mb-4">KEY ACHIEVEMENTS</h3>
                <div className="space-y-2 md:space-y-3">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-5 h-5 md:w-6 md:h-6 bg-neo-green-light dark:bg-neo-green-dark border md:border-2 border-theme-border dark:border-black flex items-center justify-center mr-2 md:mr-3 mt-0.5 font-black text-xs md:text-sm text-theme-border dark:text-black shrink-0">
                        {index + 1}
                      </div>
                      <p className="font-bold text-foreground dark:text-gray-200 text-xs md:text-base">{achievement}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
