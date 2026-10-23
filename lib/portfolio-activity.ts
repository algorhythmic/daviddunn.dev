import type { ProjectPreviewSlug } from "./project-previews"

export const projectOrder: ProjectPreviewSlug[] = ["odin", "saga", "runtime", "dbriefly", "nexus", "happily", "mcp"]

export const projectActivity: Record<ProjectPreviewSlug, { category: string; status: string; summary: string; color: string }> = {
  odin: { category: "Agent systems", status: "In design", summary: "A supervisor that remembers the objective.", color: "violet" },
  saga: { category: "Agent systems", status: "Prototype", summary: "Isolated workers. Accountable execution.", color: "blue" },
  runtime: { category: "Developer tools", status: "Open source", summary: "Continuity, memory, and guarded desktop actions.", color: "mint" },
  dbriefly: { category: "Products", status: "Product", summary: "Your daily briefing. Now a conversation.", color: "orange" },
  nexus: { category: "Products", status: "Product", summary: "Find the signal in prediction markets.", color: "blue" },
  happily: { category: "Products", status: "Delivered", summary: "A more thoughtful way to bring people together.", color: "pink" },
  mcp: { category: "Developer tools", status: "Open source", summary: "Give assistants sources, not guesses.", color: "mint" },
}

export type Publication = {
  id: string
  kind: "article" | "video"
  title: string
  summary: string
  description: string
  url: string
  date: string
}

// Public publications only. Unlisted /v/ introductions must never enter this feed.
// Add a record here when an article or video is published; counts and tabs update automatically.
export const publications: Publication[] = []

export const profileSources = [
  { name: "GitHub", handle: "algorhythmic", href: "https://github.com/algorhythmic", action: "Let's look at the code", keywords: ["Agent coordination", "Runtime tools", "Harnesses & evals"] },
  { name: "LinkedIn", handle: "mrdaviddunn", href: "https://linkedin.com/in/mrdaviddunn", action: "Here's how the experience connects", keywords: ["Product engineering", "Observability", "Full-stack development"] },
  { name: "Instagram", handle: "mrdaviddunn", href: "https://instagram.com/mrdaviddunn", action: "A little more human context", keywords: ["Beyond the code", "The human behind it"] },
  { name: "X", handle: "MrDavidDunn", href: "https://x.com/MrDavidDunn", action: "A few ideas behind the work", keywords: ["Agent systems", "Ideas → products"] },
] as const
