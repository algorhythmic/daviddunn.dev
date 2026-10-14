import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Projects | David Dunn",
  description:
    "David Dunn's projects: Odin, a planned supervisory layer over agent harnesses; agent runtime tools; Saga's worker execution service redesign; dbriefly; Nexus; Happily.love; and open-source MCP servers.",
  openGraph: {
    title: "Projects | David Dunn",
    description:
      "Odin (planned), Agent Runtime, Saga, dbriefly, Nexus, Happily.love (client work), and open-source MCP servers.",
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
