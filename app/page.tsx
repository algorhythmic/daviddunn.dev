import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { MinimalThemeToggle } from "@/components/minimal-theme-toggle"
import { ResumeButton } from "@/components/resume-button"
import { ProjectsButton } from "@/components/projects-button"

export const metadata: Metadata = {
  title: "David Dunn | Applied AI & Integration Engineer",
  description:
    "David Dunn — Applied AI & Integration Engineer in Santa Clara, CA. I build AI systems that plan, execute, review, and fix their own work, with a person approving what actually ships.",
  openGraph: {
    title: "David Dunn | Applied AI & Integration Engineer",
    description:
      "I build AI systems that plan, execute, review, and fix their own work, with a person approving what actually ships.",
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
          <p className="text-foreground font-medium">
            I build AI systems that plan, execute, review, and fix their own work, with a person
            approving what actually ships.
          </p>
          <p>
            My current focus is <Link href="/projects#odin" className={externalLink}>Odin</Link>,
            a planned supervisory layer that keeps agent work moving across sessions and projects.
            It builds on existing harnesses, starting with Claude Code, and delegates execution to{" "}
            <Link href="/projects#saga" className={externalLink}>Saga</Link>,
            whose container runtime is being separated into an independent service.
          </p>
          <p>
            Alongside that, I build <Link href="/projects#runtime" className={externalLink}>agent runtime tools</Link>:
            {" "}Heimdall for task continuity, Skald for conversation archives, Braid for retrieval,
            and Wayland Computer Use for guarded desktop actions.
          </p>
          <p>
            I also built{" "}
            <Link href="/projects#dbriefly" className={externalLink}>
              dbriefly
            </Link>
            , a daily audio briefing from the podcasts, channels, and newsletters you follow, with
            a voice agent you can talk back to;{" "}
            <Link href="/projects#nexus" className={externalLink}>
              Nexus
            </Link>
            , a real-time prediction-market intelligence engine, and its live dashboard{" "}
            <a
              href="https://marketfinder.daviddunn.dev"
              target="_blank"
              rel="noopener noreferrer"
              className={externalLink}
            >
              marketfinder
            </a>
            ; and{" "}
            <Link href="/projects#happily" className={externalLink}>
              Happily.love
            </Link>
            , a matchmaking platform I scoped and delivered end-to-end for a client. I also
            maintain{" "}
            <Link href="/projects#mcp" className={externalLink}>
              open-source MCP servers
            </Link>{" "}
            that let Claude and other assistants pull live data instead of guessing.
          </p>
          <p>
            See more on the{" "}
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
