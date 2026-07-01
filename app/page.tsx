import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { MinimalThemeToggle } from "@/components/minimal-theme-toggle"
import { ResumeButton } from "@/components/resume-button"
import { ProjectsButton } from "@/components/projects-button"

export const metadata: Metadata = {
  title: "David Dunn",
  description:
    "David Dunn — Applied AI & Integration Engineer in Santa Clara, CA. I build systems where AI is one intelligent layer inside something larger.",
  openGraph: {
    title: "David Dunn",
    description:
      "Applied AI & Integration Engineer building agentic systems, real-time data platforms, and shipped AI products.",
    url: "https://daviddunn.dev",
    siteName: "David Dunn",
    type: "website",
  },
}

const externalLink =
  "text-neo-blue-600 dark:text-neo-blue-400 font-medium underline decoration-1 underline-offset-2 decoration-neo-blue-600/40 dark:decoration-neo-blue-400/40 hover:decoration-2 transition-all"

export default function Home() {
  return (
    <div className="min-h-[100svh] bg-background text-foreground">
      {/* Top bar — full width so the controls sit in the viewport corners */}
      <header className="w-full flex items-center justify-between gap-3 px-4 sm:px-6 lg:px-10 py-5">
        <ProjectsButton />
        <MinimalThemeToggle />
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto px-5 sm:px-6 pb-24">
        <div className="pt-6 sm:pt-10 text-center">
          <Image
            src="/dd-profile.png"
            alt="David Dunn"
            width={384}
            height={384}
            priority
            className="mx-auto w-[clamp(12rem,40vw,20rem)] h-[clamp(12rem,40vw,20rem)] rounded-2xl object-cover ring-1 ring-foreground/10 shadow-sm"
          />

          <h1 className="mt-8 text-3xl sm:text-4xl font-bold tracking-tight">David Dunn</h1>
          <p className="mt-2 text-base sm:text-lg text-foreground/60">
            Applied AI &amp; Integration Engineer · Santa Clara, CA
          </p>

          <div className="mt-5">
            <ResumeButton />
          </div>
        </div>

        <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-foreground/80">
          <p>
            I build systems where AI is one intelligent layer inside something larger — connected
            to data, users, infrastructure, and human judgment. Today I work as an Applied AI
            &amp; Integration Engineer, wiring LLMs, APIs, databases, and automation into tools
            people actually use.
          </p>
          <p>
            My path here wasn&apos;t a straight line. I studied physics at Lake Forest College,
            then spent about four years in Seoul building business-intelligence and
            marketing-analytics systems for early-stage consumer startups. Back in the US I moved
            deeper into analytics and data engineering — modular dbt models, experimentation
            pipelines, and ELT workflows for SMB clients — before focusing on applied AI.
          </p>
          <p>
            Most of my work now is agentic. I built{" "}
            <Link href="/projects#saga" className={externalLink}>
              Saga
            </Link>
            , a multi-agent orchestration system that runs parallel Claude Code workers in
            sandboxed containers with human review gates. I built{" "}
            <a
              href="https://github.com/algorhythmic/projectnexus"
              target="_blank"
              rel="noopener noreferrer"
              className={externalLink}
            >
              Nexus
            </a>
            , a real-time prediction-market intelligence engine, and its live dashboard{" "}
            <a
              href="https://marketfinder.daviddunn.dev"
              target="_blank"
              rel="noopener noreferrer"
              className={externalLink}
            >
              marketfinder
            </a>
            . And I built{" "}
            <a
              href="https://happily.love"
              target="_blank"
              rel="noopener noreferrer"
              className={externalLink}
            >
              happily.love
            </a>{" "}
            end-to-end for a client — AI-assisted onboarding, structured profiles, and a private
            matchmaker dashboard. I also maintain a set of open-source{" "}
            <a
              href="https://github.com/algorhythmic"
              target="_blank"
              rel="noopener noreferrer"
              className={externalLink}
            >
              MCP servers
            </a>{" "}
            that give AI assistants structured access to external data.
          </p>
          <p>
            See the full case studies on the{" "}
            <Link href="/projects" className={externalLink}>
              projects page
            </Link>
            , browse my{" "}
            <a
              href="https://github.com/algorhythmic"
              target="_blank"
              rel="noopener noreferrer"
              className={externalLink}
            >
              code on GitHub
            </a>
            , or connect on{" "}
            <a
              href="https://linkedin.com/in/mrdaviddunn"
              target="_blank"
              rel="noopener noreferrer"
              className={externalLink}
            >
              LinkedIn
            </a>
            .
          </p>
        </div>

        {/* Links row */}
        <nav className="mt-12 flex flex-wrap gap-x-6 gap-y-2 text-sm text-foreground/60">
          <a
            href="https://github.com/algorhythmic"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/mrdaviddunn"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="mailto:davidalexanderdunn@gmail.com"
            className="hover:text-foreground transition-colors"
          >
            Email
          </a>
        </nav>
      </main>

      <footer className="max-w-2xl mx-auto px-5 sm:px-6 pb-10 text-sm text-foreground/40">
        © 2026 David Dunn
      </footer>
    </div>
  )
}
