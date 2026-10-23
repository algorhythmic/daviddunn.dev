export type ProjectPreview = {
  title: string
  format: "Mechanics animation" | "Tool walkthrough"
  status: string
  summary: string
  beats: readonly [string, string, string]
  caption: string
}

// Editorial storyboards, not recordings or evidence of shipped functionality.
// Production briefs and the publishing checklist live in docs/VIDEO-PUBLISHING.md.
export const projectPreviews = {
  odin: {
    title: "Odin",
    format: "Mechanics animation",
    status: "Specified design · extraction planned",
    summary: "A planned supervisor that carries commitments between agent sessions and brings decisions back to you.",
    beats: ["Keep the objective", "Delegate execution", "Review the evidence"],
    caption: "Follow one objective across a session restart. Show Odin supervising, Saga executing, and a person reviewing the result.",
  },
  saga: {
    title: "Saga",
    format: "Mechanics animation",
    status: "Working prototype · service extraction planned",
    summary: "Isolated agent workers with recorded outcomes. An independent execution API and durable run ledger are planned next.",
    beats: ["Launch a worker", "Run in a container", "Collect status"],
    caption: "Trace the existing container-worker prototype, then distinguish the planned API and enforcement boundary.",
  },
  runtime: {
    title: "Agent runtime tools",
    format: "Tool walkthrough",
    status: "Independent tools · integrations vary",
    summary: "Heimdall keeps task context, Skald archives conversations, Braid retrieves context, and Wayland Computer Use guards desktop input.",
    beats: ["Resume a task", "Inspect its context", "Review an action"],
    caption: "A montage of separate tool demonstrations, with each tool named. It will not imply a fully integrated workflow.",
  },
  dbriefly: {
    title: "dbriefly",
    format: "Tool walkthrough",
    status: "Audio briefing product",
    summary: "A daily briefing from the sources you follow, with original clips and voice follow-ups in the web player.",
    beats: ["Open a briefing", "Hear a source clip", "Ask a follow-up"],
    caption: "Show a short web-player session. On-screen captions will make the audio exchange understandable with sound off.",
  },
  nexus: {
    title: "Nexus / marketfinder",
    format: "Tool walkthrough",
    status: "Prediction-market intelligence",
    summary: "Nexus detects unusual market activity; marketfinder lets you inspect the alerts and their context.",
    beats: ["Spot an alert", "Inspect the move", "Read the context"],
    caption: "Follow one recorded alert through the dashboard, with the capture date visible so it is not mistaken for live market data.",
  },
  happily: {
    title: "Happily.love",
    format: "Tool walkthrough",
    status: "Client project · delivered end-to-end",
    summary: "A matchmaking platform built for a client, from applicant onboarding to the matchmaker’s review workflow.",
    beats: ["Accept an invite", "Build a profile", "Review an applicant"],
    caption: "Demonstrate the applicant and matchmaker experience using fictional profiles, with no client or applicant data exposed.",
  },
  mcp: {
    title: "Open-source MCP servers",
    format: "Tool walkthrough",
    status: "Live-data tools for AI assistants",
    summary: "Servers that let assistants request Steam data and search a documentation library instead of guessing.",
    beats: ["Ask a question", "Call a tool", "Inspect the result"],
    caption: "Record one question, the visible tool call, and its returned data. A brief overlay can explain the client → server → source path.",
  },
} satisfies Record<string, ProjectPreview>

export type ProjectPreviewSlug = keyof typeof projectPreviews
