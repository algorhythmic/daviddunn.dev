export type ArchNodeVariant =
  | "agent"
  | "daemon"
  | "datastore"
  | "human"
  | "interface"
  | "bus"

export interface ArchNode {
  id: string
  label: string
  detail?: string
  variant: ArchNodeVariant
  position: { x: number; y: number }
}

/**
 * Edge variants:
 * - default: delivered connection (solid)
 * - feedback: return path (animated dash)
 * - optional: delivered but opt-in (long dash)
 * - partial: partly delivered / in progress (dotted, amber)
 */
export type ArchEdgeVariant = "default" | "feedback" | "optional" | "partial"

export interface ArchEdge {
  id?: string
  from: string
  to: string
  label?: string
  variant?: ArchEdgeVariant
}

export interface Architecture {
  nodes: ArchNode[]
  edges: ArchEdge[]
}

/** A link to the document or file that backs a figure. */
export interface EvidenceSource {
  label: string
  url: string
}

export interface Highlight {
  metric: string
  description: string
  source?: EvidenceSource
}

export interface Feature {
  title: string
  description: string
}

export interface ProjectScreenshot {
  title: string
  src: string
  alt: string
  caption: string
  width: number
  height: number
}

export interface CaseStudyLink {
  label: string
  /** Omitted for private repositories, which are shown without a link. */
  url?: string
  type: "github" | "live" | "demo" | "case-study" | "contact"
  private?: boolean
}

export interface CaseStudy {
  /** Display order, 1-based. */
  id: number
  /** Stable anchor: the card renders with id={slug} (e.g. /projects#runtime). */
  slug: string
  /** Older anchors that should still land on this card. */
  legacyAnchors?: string[]
  title: string
  subtitle: string
  /** Short badge shown under the subtitle, e.g. "Client project". */
  label?: string
  hook: string
  /** One line under the summary, with an optional trailing link. */
  note?: { text: string; link?: { label: string; url: string } }
  icon: string
  accentColor: string
  darkAccentColor: string
  problem: string
  solution: string
  impact: string
  architectureDescription: string
  architecture?: Architecture
  highlights: Highlight[]
  /** Caveat shown under the highlight grid. */
  highlightsNote?: string
  features?: Feature[]
  screenshots?: ProjectScreenshot[]
  technologies: string[]
  links: CaseStudyLink[]
}

const GH = "https://github.com/algorhythmic"
const WCU = `${GH}/wayland-computer-use`
const WCU_RESULTS = `${WCU}/blob/main/reports/2026-09-08-wcu-braid-implementation-results.md`

export const caseStudies: CaseStudy[] = [
  {
    id: 1,
    slug: "odin",
    title: "Odin",
    subtitle: "Persistent supervision over agent harnesses",
    label: "Design specified · extraction planned",
    hook: "Agent sessions end. Projects keep going. Odin is designed to carry objectives, decisions and follow-ups across sessions, coordinate workers, and bring back the evidence and questions that need your attention.",
    note: { text: "Evolving from the supervisor inside the original Saga prototype into a separate service. Claude Code is the first planned harness adapter; a second adapter will test portability." },
    icon: "🧭",
    accentColor: "bg-gradient-to-br from-indigo-600 to-violet-300",
    darkAccentColor: "dark:from-indigo-800 dark:to-violet-700",
    problem: "A capable coding session still leaves someone responsible for remembering commitments, coordinating separate workstreams and deciding when a result is good enough. That responsibility persists after the session ends.",
    solution: "The design puts a persistent service around an existing agent harness. Odin keeps project commitments and memory, prepares session briefings, schedules follow-ups and routes routine events without invoking a model. Claude Code supplies the reasoning and tool loop. Mimir provides selective reviews from original evidence; later, bounded decision models can help classify ambiguous events without granting authority.",
    impact: "The intended result is less repeated context and fewer abandoned follow-ups across long-running technical projects. The standalone service is not implemented yet; its value will be tested against an existing agent using the same execution backend, with review and decision-model features measured separately.",
    architectureDescription: "Planned boundary: terminal or Telegram → Odin service (commitments, memory, routing, sessions) → Claude Code adapter. Odin delegates execution through Saga's independent API; Saga owns run admission, limits and evidence. Mimir reviews selected decisions. Braid retrieval, Skald archiving and desktop workers are later integrations. A second harness adapter is planned, not current compatibility.",
    highlights: [
      { metric: "Continuity", description: "Planned: commitments and memory that survive a session restart." },
      { metric: "Attention", description: "Planned: routine events handled by code; decisions surfaced to the operator." },
      { metric: "Selective review", description: "Planned: Mimir critiques high-impact decisions with bounded rounds and spend." },
    ],
    highlightsNote: "These are design commitments, not shipped capabilities or measured improvements.",
    technologies: ["Claude Code · first adapter", "Agent SDK · planned", "Codex / Pi · adapter candidates"],
    links: [{ label: "Discuss the design", type: "contact", url: "mailto:davidalexanderdunn@gmail.com?subject=Odin%20design" }],
  },
  {
    id: 2,
    slug: "runtime",
    screenshots: [
      {
        title: "Heimdall · Workstream dashboard",
        src: "/images/projects/heimdall-tui.png",
        alt: "Heimdall terminal dashboard showing items needing attention, workstreams, and a selected task's next action",
        caption: "Review items needing attention alongside workstreams and the selected task's next action.",
        width: 924,
        height: 642,
      },
      {
        title: "Skald · Conversation archive",
        src: "/images/projects/skald-tui.png",
        alt: "Skald terminal UI showing conversations grouped by project and an expanded session recap",
        caption: "Browse conversations by project, inspect session recaps, and see source availability.",
        width: 922,
        height: 638,
      },
    ],
    title: "Agent Runtime",
    subtitle: "Heimdall · Braid · Wayland Computer Use · Skald",
    hook: "Independent tools that help AI agents do real work on a real Linux desktop: input that rechecks its target, actions that are recorded, context that fits a budget, and a person reviewing what counts as done.",
    icon: "🛡️",
    accentColor: "bg-gradient-to-br from-cyan-600 to-teal-200",
    darkAccentColor: "dark:from-cyan-800 dark:to-teal-700",
    problem:
      "Agents that act on real software fail in ways that are hard to see: the wrong window has focus, half a form gets typed, a save may or may not have happened. A transcript alone can't tell you which of those occurred, or whether the task is actually done.",
    solution:
      "Four small tools, each usable on its own. Wayland Computer Use is a pair of MCP servers for Hyprland: the input server rechecks focus and window identity before each input segment, records what it submitted, and never replays input automatically. Braid selects context within a cost budget and explains why it picked each item. Heimdall keeps task state, checkpoints and scoped grants in a local event log; evidence checks can propose that a task is done, and a person reviews the proposal. Skald archives Claude Code, Codex and Devin conversations, and Heimdall uses its capture library.",
    impact:
      "Desktop work by an agent leaves a record a person can check: which window it targeted, what was submitted, what is still uncertain, and what evidence supports calling the task done.",
    architectureDescription:
      "AI agent (MCP host) → Wayland Computer Use (guarded input on Hyprland) and Heimdall (scoped grants, event log). Skald's capture library feeds Heimdall. Braid is an optional, opt-in backend for Wayland Computer Use; Heimdall's Braid integration is partial (publish/query only).",
    architecture: {
      nodes: [
        { id: "person", label: "You", detail: "task · approvals · review", variant: "human", position: { x: 300, y: 0 } },
        { id: "agent", label: "AI agent", detail: "MCP host, e.g. Claude Code", variant: "agent", position: { x: 300, y: 120 } },
        { id: "skald", label: "Skald", detail: "transcript archive", variant: "agent", position: { x: 600, y: 120 } },
        { id: "wcu", label: "Computer Use", detail: "WCU · guarded input", variant: "agent", position: { x: 80, y: 260 } },
        { id: "heimdall", label: "Heimdall", detail: "tasks · checkpoints · grants", variant: "agent", position: { x: 480, y: 260 } },
        { id: "desktop", label: "Hyprland", detail: "Wayland desktop", variant: "interface", position: { x: 0, y: 410 } },
        { id: "braid", label: "Braid", detail: "budgeted retrieval", variant: "agent", position: { x: 280, y: 410 } },
        { id: "eventlog", label: "Event log", detail: "SQLite", variant: "datastore", position: { x: 560, y: 400 } },
      ],
      edges: [
        { from: "person", to: "agent", label: "task" },
        { from: "agent", to: "wcu", label: "MCP" },
        { from: "agent", to: "heimdall", label: "scoped MCP" },
        { from: "wcu", to: "desktop", label: "recheck → input" },
        { from: "skald", to: "heimdall", label: "capture library" },
        { from: "heimdall", to: "eventlog", label: "events · checkpoints" },
        { from: "wcu", to: "braid", label: "optional · opt-in", variant: "optional" },
        { from: "heimdall", to: "braid", label: "partial · publish/query", variant: "partial" },
        { from: "heimdall", to: "person", label: "evidence for review", variant: "feedback" },
      ],
    },
    highlights: [
      {
        metric: "27/27",
        description: "Paired desktop task runs passed, checked against saved artifacts.",
        source: { label: "WCU results", url: WCU_RESULTS },
      },
      {
        metric: "37–47%",
        description: "Lower median task time with batched, guarded input (form and browser-to-note tasks).",
        source: { label: "WCU results", url: WCU_RESULTS },
      },
      {
        metric: "2.58×",
        description: "Faster change detection with 99.81% less response data than the screenshot pipeline (six-trial fixture).",
        source: { label: "Comparison", url: `${WCU}/blob/main/benchmarks/COMPARISON.md` },
      },
      {
        metric: "19–41×",
        description: "Faster warm lexical retrieval than Braid's earlier implementation at 2K–20K records (15–27× with vector diversity).",
        source: { label: "Braid benchmarks", url: `${GH}/braid/blob/main/docs/retrieval-benchmarks.md` },
      },
      {
        metric: "184/191",
        description: "Wayland Computer Use tests passed on Oct 14, 2026; the other 7 are optional Braid tests, skipped.",
        source: { label: "WCU validation", url: `${WCU}#validation-and-benchmark-limits` },
      },
      {
        metric: "293",
        description: "Go test functions declared in Heimdall, with a CI workflow for Linux and Windows.",
        source: { label: "Tests and CI", url: `${GH}/heimdall` },
      },
    ],
    highlightsNote:
      "Benchmarks are local, single-machine runs of deterministic pipelines. They exclude model inference and approval time.",
    features: [
      {
        title: "Rechecks before input",
        description: "Focus and window identity are checked again before each input segment.",
      },
      {
        title: "No blind replays",
        description: "Partial or unconfirmed input is recorded as uncertain and never replayed automatically.",
      },
      {
        title: "Context on a budget",
        description: "Braid fits context to a cost limit and explains why it picked each item.",
      },
      {
        title: "Scoped grants",
        description: "Agents get scoped read access; saving progress needs an explicit write grant.",
      },
    ],
    technologies: [
      "Go",
      "Python",
      "C",
      "SQLite",
      "MCP",
      "Claude Code",
      "Hyprland/Wayland",
      "AT-SPI",
      "GitHub Actions",
    ],
    links: [
      { label: "Heimdall", url: `${GH}/heimdall`, type: "github" },
      { label: "Braid", url: `${GH}/braid`, type: "github" },
      { label: "Wayland Computer Use", url: WCU, type: "github" },
      { label: "Skald", url: `${GH}/skald`, type: "github" },
    ],
  },
  {
    id: 3,
    slug: "saga",
    legacyAnchors: ["case-study-1"],
    title: "Saga",
    subtitle: "Governed execution for agent workers",
    label: "Working prototype · service extraction planned",
    hook: "The execution backend for delegated work: isolated workers, recorded outcomes, and enforceable limits. Saga's next version accepts work from Odin or another orchestrator through an independent service API.",
    note: {
      text: "The April prototype ran one real project. Its launcher and event pipeline exist; the independent API, durable run ledger and expanded enforcement are the next implementation phase. The repository is private;",
      link: { label: "ask me for a walkthrough", url: "mailto:davidalexanderdunn@gmail.com?subject=Saga%20walkthrough" },
    },
    icon: "📜",
    accentColor: "bg-gradient-to-br from-violet-600 to-pink-200",
    darkAccentColor: "dark:from-violet-800 dark:to-pink-700",
    problem: "Delegating to several workers needs an execution boundary that survives the planning session: which work was authorized, what ran, when it must stop and what evidence came back.",
    solution: "The existing prototype launches Claude Code workers in isolated Docker containers, streams status and journals over MQTT, and uses Eir to propose maintenance pull requests for human review. The redesign extracts a standalone Saga service with a local API, delegation records, a run ledger and approval checks enforced at execution. Planning and cross-session memory belong to Odin or another client.",
    impact: "One real project exercised the original integrated prototype. The next milestone is an independent service where a CLI and Odin face the same admission, cancellation and verification rules; that milestone is not yet delivered.",
    architectureDescription: "Existing: launcher → isolated Claude Code containers → MQTT status and journals; Bragi compiles lessons and Eir proposes reviewed patches. Target: Odin, another orchestrator or a CLI → Saga API → policy checks and run ledger → launcher and workers. Run state belongs to Saga; planning and conversational memory remain with the client. The old launcher name Heimdall is unrelated to the standalone continuity tool.",
    highlights: [
      { metric: "Isolated workers", description: "Existing: one Claude Code worker container per stream, with an iteration cap." },
      { metric: "Recorded events", description: "Existing: worker status, journals and guidance carried over MQTT." },
      { metric: "Independent API", description: "Next: submit, inspect, guide and cancel runs from any authorized client." },
      { metric: "Enforced limits", description: "Next: approval binding, durable run state and service-level stop controls." },
    ],
    technologies: ["Python", "Bash", "Docker", "Claude Code", "MQTT", "Proxmox", "Gitea", "systemd"],
    links: [{ label: "GitHub", type: "github", private: true }],
  },
  {
    id: 4,
    slug: "dbriefly",
    title: "dbriefly",
    subtitle: "Daily audio briefings you can talk back to",
    hook: "A daily audio briefing built from the podcasts, channels and newsletters you follow, with a voice agent you can talk back to.",
    icon: "🎧",
    accentColor: "bg-gradient-to-br from-amber-500 to-yellow-200",
    darkAccentColor: "dark:from-amber-700 dark:to-yellow-700",
    problem:
      "Following dozens of podcasts, channels and newsletters means hours of overlapping coverage. The same story turns up in many places, it's hard to tell what is actually new, and there's no quick way to ask a follow-up.",
    solution:
      "dbriefly groups overlapping stories from podcasts, channels and newsletters into a 5–10 minute brief with original clips inline. Voice follow-ups run in the web player, including the Telegram Mini App; Telegram chat, WhatsApp and email provide separate messaging or delivery paths. SMS support is built but carrier production remains gated. API costs are recorded on a ledger, and automated critics feed an operator-controlled coding-agent repair loop.",
    impact:
      "A short daily brief in place of hours of feeds, with the original clips one tap away so you can hear the source for yourself.",
    architectureDescription:
      "Sources → transcription → story clustering → brief writing → audio with source clips. The web player and Telegram Mini App host voice interaction; messaging and delivery adapters serve separate channels. A cost ledger records API usage; critics flag issues for an operator-controlled coding agent.",
    highlights: [
      {
        metric: "~$0.03",
        description: "Estimated API cost per brief.",
      },
      {
        metric: "80+",
        description: "Active library sources recorded in July 2026, spanning podcasts, channels and feeds.",
      },
      {
        metric: "~500 ms",
        description: "Latency budget the voice agent is designed to — a target, not a measurement.",
      },
      {
        metric: "~700",
        description: "Approximate integration-test count reported for this private project.",
      },
    ],
    features: [
      { title: "Hear the source", description: "Original clips are embedded in the brief." },
      { title: "Talk back", description: "A realtime voice agent answers follow-up questions." },
      { title: "Costs on a ledger", description: "Every API call is metered and priced." },
      { title: "Reviewed repairs", description: "Automated critics flag issues for an operator-controlled coding agent." },
    ],
    technologies: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "pgvector",
      "Next.js",
      "Claude",
      "OpenAI",
      "Whisper",
      "Docker",
    ],
    links: [
      { label: "Live Site", url: "https://dbriefly.daviddunn.dev", type: "live" },
      { label: "GitHub", type: "github", private: true },
      { label: "Ask for a walkthrough", url: "mailto:davidalexanderdunn@gmail.com?subject=dbriefly%20walkthrough", type: "contact" },
    ],
  },
  {
    id: 5,
    slug: "nexus",
    legacyAnchors: ["case-study-2"],
    title: "Nexus",
    subtitle: "Prediction market intelligence platform",
    hook: "A service that watches prediction markets in real time, flags unusual price and volume moves, groups related markets, and explains each alert on a live dashboard.",
    icon: "📊",
    accentColor: "bg-gradient-to-br from-blue-600 to-sky-200",
    darkAccentColor: "dark:from-blue-800 dark:to-sky-700",
    problem:
      "Prediction markets move fast, and a raw price feed doesn't tell you which moves matter. Spotting a meaningful shift means watching thousands of markets at once and knowing which ones are about the same underlying event.",
    solution:
      "Nexus streams Kalshi market data over WebSocket into an in-memory buffer, rolls it into one-minute candles, and runs three anomaly rules (price threshold, volume spike, Z-score) over 5-minute to 24-hour windows. Claude groups related markets into topics so correlated moves surface together, and each alert gets a template explanation, optionally rewritten by Claude with news context. A cached REST API feeds the React dashboard (MarketFinder). A Polymarket adapter is built but off by default. An earlier MarketFinder design compared 161M+ cross-platform market pairs per run; the redesign replaced that matching job with streaming anomaly detection.",
    impact:
      "Turns a stream of raw market ticks into a short, explained feed of moves worth a look — served from a cache that cuts repeated database queries per viewer.",
    architectureDescription:
      "Kalshi WebSocket + REST → ingestion → ring buffer + 1-minute candles → detection (5/15/60/1440-min windows) → topic clustering and correlation (Claude) → alerts with template or Claude narrative → PostgreSQL views → cached REST API → React dashboard. Convex holds sign-in and per-user alerts.",
    architecture: {
      nodes: [
        { id: "kalshi", label: "Kalshi", detail: "WebSocket + REST", variant: "interface", position: { x: 140, y: 0 } },
        { id: "polymarket", label: "Polymarket", detail: "adapter · off by default", variant: "interface", position: { x: 440, y: 0 } },
        { id: "ingestion", label: "Ingestion", detail: "ring buffer · 1-min candles", variant: "agent", position: { x: 290, y: 110 } },
        { id: "postgres", label: "PostgreSQL", detail: "candles · views", variant: "datastore", position: { x: 560, y: 230 } },
        { id: "detection", label: "Detection", detail: "5/15/60/1440-min windows", variant: "agent", position: { x: 290, y: 230 } },
        { id: "analysis", label: "Analysis", detail: "clustering · correlation · narrative", variant: "agent", position: { x: 290, y: 360 } },
        { id: "claude", label: "Claude API", detail: "topics · narratives", variant: "interface", position: { x: 560, y: 360 } },
        { id: "api", label: "REST API", detail: "cached JSON · 7 routes", variant: "agent", position: { x: 290, y: 490 } },
        { id: "convex", label: "Convex", detail: "auth · user alerts", variant: "datastore", position: { x: 560, y: 490 } },
        { id: "dashboard", label: "Dashboard", detail: "React · MarketFinder", variant: "interface", position: { x: 290, y: 610 } },
      ],
      edges: [
        { from: "kalshi", to: "ingestion", label: "stream" },
        { from: "polymarket", to: "ingestion", label: "optional", variant: "optional" },
        { from: "ingestion", to: "postgres", label: "candles" },
        { from: "ingestion", to: "detection", label: "events" },
        { from: "detection", to: "analysis", label: "anomalies" },
        { from: "analysis", to: "claude", label: "query", variant: "feedback" },
        { from: "claude", to: "analysis", label: "narrative", variant: "feedback" },
        { from: "postgres", to: "api", label: "views" },
        { from: "analysis", to: "api", label: "alerts" },
        { from: "analysis", to: "convex", label: "user alerts" },
        { from: "api", to: "dashboard", label: "feed" },
      ],
    },
    highlights: [
      {
        metric: "449",
        description: "Test functions declared across 33 modules (source count).",
        source: { label: "Tests", url: `${GH}/projectnexus/tree/main/tests` },
      },
      {
        metric: "487K → 50K",
        description: "Recorded daily database writes, approximately, after buffering price ticks in memory.",
        source: { label: "Migration record", url: `${GH}/projectnexus/blob/main/docs/event-stream-migration.md` },
      },
      {
        metric: "5m–24h",
        description: "Sliding windows for three anomaly rules: price threshold, volume spike and Z-score.",
      },
      {
        metric: "7 routes",
        description: "Cached REST API serving pre-serialized JSON to the live dashboard.",
        source: { label: "API source", url: `${GH}/projectnexus/blob/main/nexus/api/app.py` },
      },
    ],
    technologies: [
      "Python",
      "asyncio",
      "WebSockets",
      "PostgreSQL",
      "SQLite",
      "Starlette",
      "Claude API",
      "TypeScript",
      "React",
      "Convex",
      "Fly.io",
      "Vercel",
    ],
    links: [
      { label: "Live Dashboard", url: "https://marketfinder.daviddunn.dev", type: "live" },
      { label: "GitHub", url: `${GH}/projectnexus`, type: "github" },
    ],
  },
  {
    id: 6,
    slug: "happily",
    legacyAnchors: ["case-study-3"],
    title: "happily.love",
    subtitle: "Matchmaking platform for a professional matchmaker",
    label: "Client project · live at happily.love",
    hook: "A matchmaking platform built end-to-end for a client.",
    icon: "💙",
    accentColor: "bg-gradient-to-br from-pink-600 to-orange-200",
    darkAccentColor: "dark:from-pink-800 dark:to-orange-800",
    problem:
      "A professional matchmaker needed one private place to take in applicants, learn what each of them is looking for, and review candidates.",
    solution:
      "I scoped and delivered the platform for a professional matchmaker: Claude-assisted onboarding interviews, an invite-based applicant flow, structured profiles, approval workflows, and a private dashboard where the matchmaker reviews and searches candidates.",
    impact:
      "A working product delivered to the client and live at happily.love, from applicant intake through the matchmaker's review.",
    architectureDescription:
      "Invited applicant → Claude-assisted onboarding interview → structured profile → matchmaker approval → private dashboard for review and search.",
    architecture: {
      nodes: [
        { id: "applicant", label: "Applicant", detail: "by invitation", variant: "human", position: { x: 130, y: 0 } },
        { id: "matchmaker", label: "Matchmaker", detail: "client", variant: "human", position: { x: 450, y: 0 } },
        { id: "onboarding", label: "Onboarding", detail: "Claude-assisted interview", variant: "agent", position: { x: 130, y: 140 } },
        { id: "dashboard", label: "Dashboard", detail: "private · review · search", variant: "interface", position: { x: 450, y: 140 } },
        { id: "profiles", label: "Profiles", detail: "structured", variant: "datastore", position: { x: 130, y: 280 } },
        { id: "approval", label: "Approval", detail: "workflow", variant: "agent", position: { x: 450, y: 290 } },
      ],
      edges: [
        { from: "applicant", to: "onboarding", label: "invite link" },
        { from: "onboarding", to: "profiles", label: "answers" },
        { from: "matchmaker", to: "dashboard", label: "review" },
        { from: "dashboard", to: "approval", label: "decide" },
        { from: "approval", to: "profiles", label: "approve", variant: "feedback" },
      ],
    },
    highlights: [
      {
        metric: "Client build",
        description: "Scoped and delivered end-to-end for a professional matchmaker.",
      },
      {
        metric: "Claude intake",
        description: "Onboarding interviews assisted by Claude produce structured profiles.",
      },
      {
        metric: "Invite-only",
        description: "Applicants join by invitation, and profiles go through approval workflows.",
      },
      {
        metric: "Private review",
        description: "A private dashboard where the matchmaker reviews and searches candidates.",
      },
    ],
    technologies: ["React", "TypeScript", "Next.js", "Claude", "Authentication"],
    links: [{ label: "Live Site", url: "https://happily.love", type: "live" }],
  },
  {
    id: 7,
    slug: "mcp",
    legacyAnchors: ["case-study-4"],
    title: "MCP servers",
    subtitle: "Open-source servers that connect AI assistants to live data",
    hook: "Small servers that let Claude and other assistants pull live data instead of guessing: Steam game stats and store details, and a searchable docs library.",
    icon: "🔌",
    accentColor: "bg-gradient-to-br from-emerald-600 to-lime-200",
    darkAccentColor: "dark:from-emerald-800 dark:to-lime-800",
    problem:
      "AI assistants can reason but can't reach live data on their own. The Model Context Protocol fixes that, but each integration still has to handle auth, rate limits, partial failures, and data shaped for a model rather than a person.",
    solution:
      "I built three. steam-mcp exposes ten read-only Steam tools — player counts, store details, news, stats and achievements — validates arguments before calling Steam, bounds requests with deadlines and retries, and reports failed lookups without dropping the successful ones. steamstats-mcp is a Python take on the same idea. context_fetch_mcp is a MongoDB-backed docs library an assistant can search and add to.",
    impact:
      "Claude and other MCP-capable assistants get structured Steam data and a searchable docs library with no custom glue code.",
    architectureDescription:
      "Each server implements MCP over stdio. The Steam servers wrap the Steam Web API with validated tool definitions and normalized responses. context_fetch_mcp adds a MongoDB persistence layer with text search, metadata aggregation, and schema discovery via MCP resources.",
    architecture: {
      nodes: [
        { id: "client", label: "AI Client", detail: "Claude · other MCP hosts", variant: "human", position: { x: 250, y: 0 } },
        { id: "steamjs", label: "steam-mcp", detail: "TypeScript · 10 tools", variant: "agent", position: { x: 50, y: 160 } },
        { id: "steampy", label: "steamstats-mcp", detail: "Python", variant: "agent", position: { x: 250, y: 160 } },
        { id: "ctxfetch", label: "context_fetch_mcp", detail: "TS · Zod", variant: "agent", position: { x: 470, y: 160 } },
        { id: "steamapi", label: "Steam Web API", detail: "REST", variant: "interface", position: { x: 150, y: 320 } },
        { id: "mongodb", label: "MongoDB", detail: "text-indexed docs", variant: "datastore", position: { x: 470, y: 320 } },
      ],
      edges: [
        { from: "client", to: "steamjs", label: "MCP / stdio" },
        { from: "client", to: "steampy", label: "MCP / stdio" },
        { from: "client", to: "ctxfetch", label: "MCP / stdio" },
        { from: "steamjs", to: "steamapi", label: "fetch" },
        { from: "steampy", to: "steamapi", label: "fetch" },
        { from: "ctxfetch", to: "mongodb", label: "search · aggregate" },
      ],
    },
    highlights: [
      {
        metric: "10 tools",
        description: "Read-only Steam tools: players, store details, news, stats and achievements.",
        source: { label: "Tool list", url: `${GH}/steam-mcp/blob/main/src/tools.ts` },
      },
      {
        metric: "35 tests",
        description: "Mocked MCP tests passed on Oct 14, 2026, including failed batches and malformed responses.",
        source: { label: "Tests", url: `${GH}/steam-mcp/tree/main/test` },
      },
      {
        metric: "3 servers",
        description: "Steam (TypeScript), Steam (Python), and a MongoDB-backed docs library.",
      },
      {
        metric: "Claude Code",
        description: "steam-mcp connects over stdio and lists all ten tools in Claude Code.",
        source: { label: "Setup", url: `${GH}/steam-mcp#use-with-claude-code` },
      },
    ],
    technologies: [
      "TypeScript",
      "JavaScript",
      "Python",
      "Node.js",
      "MongoDB",
      "Mongoose",
      "MCP SDK",
      "Zod",
      "Axios",
    ],
    links: [
      { label: "steam-mcp", url: `${GH}/steam-mcp`, type: "github" },
      { label: "steamstats-mcp (Py)", url: `${GH}/steamstats-mcp`, type: "github" },
      { label: "context_fetch_mcp", url: `${GH}/context_fetch_mcp`, type: "github" },
    ],
  },
]

/** Slugs in display order. */
export const caseStudySlugs = caseStudies.map((s) => s.slug)

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((s) => s.slug === slug)
}
