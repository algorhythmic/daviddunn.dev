import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Projects | David Dunn",
  description:
    "Projects from David Dunn — multi-agent orchestration (Saga), real-time prediction-market intelligence (Nexus), an AI matchmaking product (happily.love), and open-source MCP servers.",
  openGraph: {
    title: "Projects | David Dunn",
    description:
      "Projects from David Dunn — Saga, Nexus, happily.love, and MCP servers.",
    url: "https://daviddunn.dev/projects",
    siteName: "David Dunn",
    type: "website",
  },
}

export default function ProjectsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children
}
