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

export interface ArchEdge {
  id?: string
  from: string
  to: string
  label?: string
  variant?: "default" | "feedback"
}

export interface Architecture {
  nodes: ArchNode[]
  edges: ArchEdge[]
}

export interface CaseStudy {
  id: number
  slug: string
  title: string
  subtitle: string
  hook: string
  icon: string
  accentColor: string
  darkAccentColor: string
  problem: string
  solution: string
  role: string
  architectureDescription: string
  architecture?: Architecture
  highlights: {
    metric: string
    description: string
  }[]
  technologies: string[]
  links: {
    label: string
    url: string
    type: "github" | "live" | "demo" | "case-study"
    private?: boolean
  }[]
}

export const caseStudies: CaseStudy[] = [
  {
    id: 1,
    slug: "saga",
    title: "Saga",
    subtitle: "Multi-agent orchestration system",
    hook: "A personal multi-agent orchestration system that runs parallel Claude Code sessions in sandboxed containers — with critic gates, MQTT event streams, and a recursive PR loop back to its own repo.",
    icon: "📜",
    accentColor: "bg-gradient-to-br from-violet-600 to-pink-200",
    darkAccentColor: "dark:from-violet-800 dark:to-pink-700",
    problem:
      "Two ceilings make parallel coding work hard. The human ceiling: one operator can only context-switch across so many long-running streams before quality starts to slip. The agent ceiling: long-running Claude Code sessions drift as their context windows accumulate noise over time ('context rot'), so the agents themselves need time-gating to stay sharp. Existing frameworks address neither well by removing the human entirely (turning supervision into auditing-after-the-fact) and rarely time-bound their loops. The need is for the opposite shape: a small number of supervised, time-bounded Claude Code sessions, each on a different stream of the operator's own work, all visible and pausable without losing the loop on any one.",
    solution:
      "Saga is a personal orchestrator running on a self-hosted Proxmox cluster. The operator hands it work via Telegram. Odin (Opus) decomposes it into independent or competitive workstreams; Mimir (Sonnet) critiques every plan before it executes. Heimdall — a Python daemon outside the container plane, the security boundary — launches N sandboxed dvergr workers, each running Anthropic's `/ralph-loop` inside a Trail of Bits hardened devcontainer (built from source, pinned by git commit — no opaque public images). Workers publish status, journals, and convergence signals over MQTT. Bragi compiles outputs into a git-versioned Obsidian vault. Eir reads everything and authors fix-PRs back to Saga's own repo, gated by Mimir's seven-checkbox patch review. Every container inherits Claude Max auth from a single Docker volume populated once by interactive `/login` — there is no API key in the picture.",
    role:
      "Sole architect, developer, and operator. Designed the seven Norse-named agent roles and their coordination protocols, wrote every persona prompt, hook, sidecar, and systemd unit, and provisioned the Proxmox + LXC homelab the system runs on. Authored the Phase 3 retrospective that surfaced the 'mechanical enforcement compounds, cultural enforcement decays' principle now baked into the contract-handoff layer.",
    architectureDescription:
      "Operator (Telegram) → Odin (Opus) plans → Mimir (Sonnet) critiques → Heimdall launches N Dvergr workers in Docker → MQTT events stream → Bragi compiles journal to git-versioned vault → Eir authors fix-PRs back to Saga's own repo",
    architecture: {
      nodes: [
        { id: "operator", label: "Operator", detail: "human", variant: "human", position: { x: 340, y: 0 } },
        { id: "telegram", label: "Telegram", detail: "MCP", variant: "interface", position: { x: 340, y: 90 } },
        { id: "odin", label: "Odin", detail: "Opus · plans", variant: "agent", position: { x: 200, y: 200 } },
        { id: "mimir", label: "Mimir", detail: "Sonnet · critic", variant: "agent", position: { x: 480, y: 200 } },
        { id: "heimdall", label: "Heimdall", detail: "Python daemon", variant: "daemon", position: { x: 340, y: 320 } },
        { id: "dvergr1", label: "Dvergr 1", detail: "/ralph-loop", variant: "agent", position: { x: 130, y: 440 } },
        { id: "dvergr2", label: "Dvergr 2", detail: "/ralph-loop", variant: "agent", position: { x: 340, y: 440 } },
        { id: "dvergr3", label: "Dvergr N", detail: "/ralph-loop", variant: "agent", position: { x: 550, y: 440 } },
        { id: "mqtt", label: "MQTT", detail: "Mosquitto", variant: "bus", position: { x: 340, y: 560 } },
        { id: "bragi", label: "Bragi", detail: "compiler", variant: "agent", position: { x: 340, y: 670 } },
        { id: "vault", label: "Vault", detail: "git + Obsidian", variant: "datastore", position: { x: 340, y: 780 } },
        { id: "eir", label: "Eir", detail: "patcher", variant: "agent", position: { x: 340, y: 900 } },
        { id: "repo", label: "Saga repo", detail: "git", variant: "datastore", position: { x: 580, y: 900 } },
      ],
      edges: [
        { from: "operator", to: "telegram", label: "task" },
        { from: "telegram", to: "odin" },
        { from: "odin", to: "mimir", label: "plan" },
        { from: "mimir", to: "odin", label: "critique", variant: "feedback" },
        { from: "mimir", to: "heimdall", label: "approved" },
        { from: "heimdall", to: "dvergr1", label: "launch" },
        { from: "heimdall", to: "dvergr2" },
        { from: "heimdall", to: "dvergr3" },
        { from: "dvergr1", to: "mqtt", label: "events" },
        { from: "dvergr2", to: "mqtt" },
        { from: "dvergr3", to: "mqtt" },
        { from: "mqtt", to: "bragi" },
        { from: "bragi", to: "vault", label: "compile" },
        { from: "vault", to: "eir", label: "journals" },
        { from: "eir", to: "mimir", label: "patch", variant: "feedback" },
        { from: "eir", to: "repo", label: "fix-PR" },
        { from: "repo", to: "operator", label: "merge", variant: "feedback" },
      ],
    },
    highlights: [
      {
        metric: "Critic-Actor Loop",
        description:
          "Plans go through Mimir before workers launch; Eir's fix-PRs back into Saga's own repo go through Mimir before merge — same critic, two surfaces",
      },
      {
        metric: "Hardened Sandbox",
        description:
          "Each dvergr runs as a `/ralph-loop` inside a Trail of Bits hardened devcontainer, built from source and pinned by git commit — autonomy bounded by the sandbox, not by trust",
      },
      {
        metric: "Human Operator Commits",
        description:
          "The system proposes; the human operator commits. Every plan launch, Eir patch, and merge terminates at one person pressing one button — autonomy stops at the gate",
      },
      {
        metric: "7 Roles",
        description:
          "Norse taxonomy by intent: Odin plans, Mimir critiques, Dvergar work, Eir patches, Bragi narrates, Heimdall guards, Ratatoskr ferries",
      },
    ],
    technologies: [
      "Claude Code",
      "MCP",
      "Python",
      "Bash",
      "Docker",
      "Trail of Bits devcontainers",
      "MQTT",
      "Proxmox",
      "LXC",
      "Gitea",
      "Tailscale",
      "Telegram",
      "systemd",
    ],
    links: [
      { label: "GitHub", url: "https://github.com/algorhythmic/saga", type: "github", private: true },
    ],
  },
  {
    id: 2,
    slug: "nexus",
    title: "Nexus",
    subtitle: "Prediction market intelligence platform",
    hook: "An end-to-end system that ingests streaming prediction market data, detects anomalies, identifies cross-platform arbitrage using ML and LLMs, and surfaces structured intelligence for decision-making.",
    icon: "📊",
    accentColor: "bg-gradient-to-br from-blue-600 to-sky-200",
    darkAccentColor: "dark:from-blue-800 dark:to-sky-700",
    problem:
      "Prediction markets generate massive volumes of real-time price and volume data across multiple platforms (Kalshi, Polymarket). Identifying meaningful signals — anomalous price movements, correlated shifts across related markets, and cross-platform arbitrage opportunities — requires processing millions of data points with sub-minute latency. No existing tool combined real-time ingestion, statistical anomaly detection, LLM-powered semantic analysis, and autonomous execution in a single platform.",
    solution:
      "I built a multi-repo platform spanning the full pipeline from data ingestion to autonomous trade execution. ProjectNexus handles real-time WebSocket streaming, sliding-window anomaly detection, and Claude-powered narrative generation that explains why markets moved. MarketFinder ETL is a multi-layer comparison engine that reduces 161M+ potential cross-platform comparisons to ~1K LLM calls using semantic bucketing, hierarchical filtering, and ML scoring — a 99.99% cost reduction. Arbytron is the autonomous execution layer with Kafka-based message brokering, position tracking, and configurable risk controls. The React/Convex frontend provides a live dashboard with anomaly feeds, market comparison tools, and trending topic views.",
    role: "Sole architect and developer — designed the system architecture, built all backend services, trained the ML scoring model, integrated three LLM providers, built the frontend, and deployed to Fly.io.",
    architectureDescription:
      "Ingestion (WebSocket streaming + REST polling) → Detection (sliding-window anomaly detection at 5/15/60/1440-min intervals) → Analysis (LLM topic clustering, cross-market correlation, narrative generation, multi-layer arbitrage comparison) → Execution (autonomous cross-platform arbitrage with Kafka and PostgreSQL)",
    architecture: {
      nodes: [
        { id: "kalshi", label: "Kalshi", detail: "WebSocket", variant: "interface", position: { x: 140, y: 0 } },
        { id: "polymarket", label: "Polymarket", detail: "REST", variant: "interface", position: { x: 440, y: 0 } },
        { id: "ingestion", label: "Ingestion", detail: "stream + poll", variant: "agent", position: { x: 290, y: 110 } },
        { id: "postgres", label: "PostgreSQL", detail: "raw + state", variant: "datastore", position: { x: 540, y: 230 } },
        { id: "detection", label: "Detection", detail: "5/15/60/1440-min windows", variant: "agent", position: { x: 290, y: 230 } },
        { id: "analysis", label: "Analysis", detail: "clustering + narrative", variant: "agent", position: { x: 290, y: 360 } },
        { id: "llms", label: "LLM APIs", detail: "Claude · OpenAI · Vertex", variant: "interface", position: { x: 540, y: 360 } },
        { id: "kafka", label: "Kafka", detail: "signal bus", variant: "bus", position: { x: 290, y: 480 } },
        { id: "arbytron", label: "Arbytron", detail: "execution bot", variant: "agent", position: { x: 290, y: 600 } },
        { id: "dashboard", label: "Dashboard", detail: "React · Convex", variant: "interface", position: { x: 290, y: 720 } },
      ],
      edges: [
        { from: "kalshi", to: "ingestion", label: "stream" },
        { from: "polymarket", to: "ingestion", label: "poll" },
        { from: "ingestion", to: "postgres", label: "store" },
        { from: "ingestion", to: "detection", label: "events" },
        { from: "detection", to: "analysis", label: "anomalies" },
        { from: "analysis", to: "llms", label: "query", variant: "feedback" },
        { from: "llms", to: "analysis", label: "narrative", variant: "feedback" },
        { from: "analysis", to: "kafka", label: "signals" },
        { from: "kafka", to: "arbytron", label: "trade signal" },
        { from: "arbytron", to: "postgres", label: "positions", variant: "feedback" },
        { from: "arbytron", to: "dashboard", label: "execution" },
        { from: "detection", to: "dashboard", label: "feed", variant: "feedback" },
      ],
    },
    highlights: [
      {
        metric: "161M → 1K",
        description:
          "Market comparisons reduced via semantic bucketing, hierarchical filtering, and ML scoring — 99.99% cost reduction",
      },
      {
        metric: "158 Tests",
        description:
          "Comprehensive test suite across 17 modules covering ingestion, anomaly detection, clustering, correlation, and API layers",
      },
      {
        metric: "72h+",
        description:
          "Continuous stable ingestion validated with 100K+ events, failure modes documented, formal decision gates passed",
      },
      {
        metric: "3 LLM Providers",
        description:
          "Anthropic Claude, OpenAI, and Google Vertex AI integrated for semantic matching, clustering, and narrative generation",
      },
    ],
    technologies: [
      "Python",
      "TypeScript",
      "React",
      "Convex",
      "Claude API",
      "OpenAI API",
      "Vertex AI",
      "WebSockets",
      "Kafka",
      "PostgreSQL",
      "DuckDB",
      "Airflow",
      "Docker",
      "Fly.io",
    ],
    links: [
      { label: "ProjectNexus", url: "https://github.com/algorhythmic/projectnexus", type: "github" },
      { label: "MarketFinder ETL", url: "https://github.com/algorhythmic/marketfinder_ETL", type: "github" },
      { label: "Arbytron", url: "https://github.com/algorhythmic/arbytron", type: "github" },
      { label: "MarketFinder UI", url: "https://github.com/algorhythmic/marketfinder", type: "github" },
    ],
  },
  {
    id: 3,
    slug: "happily",
    title: "happily.love",
    subtitle: "AI-powered matchmaking platform",
    hook: "A full-stack consumer SaaS matchmaking service — from AI-driven compatibility analysis to the interface users interact with daily.",
    icon: "💙",
    accentColor: "bg-gradient-to-br from-pink-600 to-orange-200",
    darkAccentColor: "dark:from-pink-800 dark:to-orange-800",
    problem:
      "Modern dating platforms rely on surface-level signals — photos, short bios, and swipe behavior — to match people. They optimize for engagement rather than compatibility. Users face decision fatigue from endless options, and matching algorithms treat people as inventory rather than individuals with complex preferences, values, and relationship goals.",
    solution:
      "I designed and built happily.love, a matchmaking service that uses AI to analyze compatibility at a deeper level than traditional swipe-based apps. The platform includes an intelligent matching engine, user onboarding flows that capture meaningful preference data, an admin dashboard for managing matches and monitoring platform health, and a consumer-facing interface designed around intentional connection rather than infinite scrolling.",
    role: "Full-stack developer and technical co-founder — architecture design through deployment, including the AI matching pipeline, backend services, admin tooling, and user-facing frontend.",
    architectureDescription:
      "Modern web frontend → Backend API (auth, profiles, matching logic) → AI compatibility engine → Admin dashboard for matchmaking operations and analytics",
    architecture: {
      nodes: [
        { id: "users", label: "Users", detail: "consumers", variant: "human", position: { x: 130, y: 0 } },
        { id: "matchmaker", label: "Matchmaker", detail: "operator", variant: "human", position: { x: 430, y: 0 } },
        { id: "frontend", label: "Frontend", detail: "consumer web", variant: "interface", position: { x: 130, y: 130 } },
        { id: "admin", label: "Admin", detail: "ops dashboard", variant: "interface", position: { x: 430, y: 130 } },
        { id: "api", label: "Backend API", detail: "auth · profiles · matching", variant: "agent", position: { x: 280, y: 260 } },
        { id: "db", label: "Database", detail: "profiles · matches", variant: "datastore", position: { x: 130, y: 390 } },
        { id: "ai", label: "AI Engine", detail: "compatibility scoring", variant: "agent", position: { x: 430, y: 390 } },
      ],
      edges: [
        { from: "users", to: "frontend", label: "browse" },
        { from: "matchmaker", to: "admin", label: "manage" },
        { from: "frontend", to: "api", label: "request" },
        { from: "admin", to: "api", label: "ops" },
        { from: "api", to: "db", label: "read/write" },
        { from: "api", to: "ai", label: "score" },
        { from: "ai", to: "api", label: "matches", variant: "feedback" },
      ],
    },
    highlights: [
      {
        metric: "Full SaaS",
        description:
          "End-to-end consumer product: user auth, onboarding, profiles, matching, admin dashboard, and analytics",
      },
      {
        metric: "AI Matching",
        description:
          "Intelligent compatibility engine that matches on values, goals, and behavioral signals — not just photos",
      },
      {
        metric: "Admin Tooling",
        description:
          "Internal dashboard for match management, user analytics, platform health monitoring, and operations",
      },
      {
        metric: "Live Product",
        description:
          "Shipped and running at happily.love — a real product serving real users, not a portfolio demo",
      },
    ],
    technologies: [
      "React",
      "TypeScript",
      "Next.js",
      "AI/LLM Integration",
      "Authentication",
      "Cloud Deployment",
    ],
    links: [{ label: "Live Site", url: "https://happily.love", type: "live" }],
  },
  {
    id: 4,
    slug: "mcp",
    title: "MCP server ecosystem",
    subtitle: "Building the connective layer between AI models and external services",
    hook: "Three Model Context Protocol servers across JavaScript and Python — giving AI assistants structured access to gaming data, documentation, and more.",
    icon: "🔌",
    accentColor: "bg-gradient-to-br from-emerald-600 to-lime-200",
    darkAccentColor: "dark:from-emerald-800 dark:to-lime-800",
    problem:
      "AI assistants are powerful reasoners but have limited ability to interact with external services and data sources. The Model Context Protocol (MCP) is the emerging standard for giving AI models structured tool access, but the ecosystem is still young. Real-world API integrations require handling authentication, rate limiting, error recovery, and structured data transformation — challenges that get harder when the consumer is a language model, not a human.",
    solution:
      "I built three MCP servers that demonstrate different aspects of the protocol. The Steam MCP servers (built in both JavaScript and Python) expose the full Steam Web API to AI clients — player stats, achievements, store details, and news. The context_fetch_mcp server is a documentation knowledge base backed by MongoDB, enabling AI clients to fetch, store, search, and aggregate technical documentation. Together they range from API proxy (Steam) to knowledge management (context_fetch).",
    role: "Sole developer on all three servers. Built the JavaScript Steam server first, then rebuilt it in Python to demonstrate MCP pattern portability. Designed the context_fetch_mcp architecture including MongoDB text indexing and Zod schema validation.",
    architectureDescription:
      "Each server implements MCP via STDIO transport. Steam servers wrap the Steam Web API with structured tool definitions and response normalization. context_fetch_mcp adds a MongoDB persistence layer with text search, metadata aggregation, and schema discovery via MCP resources.",
    architecture: {
      nodes: [
        { id: "client", label: "AI Client", detail: "Claude · Cursor · ChatGPT", variant: "human", position: { x: 250, y: 0 } },
        { id: "steamjs", label: "steam-mcp", detail: "JS · 9 tools", variant: "agent", position: { x: 50, y: 160 } },
        { id: "steampy", label: "steamstats-mcp", detail: "Python", variant: "agent", position: { x: 250, y: 160 } },
        { id: "ctxfetch", label: "context_fetch_mcp", detail: "TS · Zod", variant: "agent", position: { x: 470, y: 160 } },
        { id: "steamapi", label: "Steam Web API", detail: "REST", variant: "interface", position: { x: 150, y: 320 } },
        { id: "mongodb", label: "MongoDB", detail: "text-indexed docs", variant: "datastore", position: { x: 470, y: 320 } },
      ],
      edges: [
        { from: "client", to: "steamjs", label: "MCP / STDIO" },
        { from: "client", to: "steampy", label: "MCP / STDIO" },
        { from: "client", to: "ctxfetch", label: "MCP / STDIO" },
        { from: "steamjs", to: "steamapi", label: "fetch" },
        { from: "steampy", to: "steamapi", label: "fetch" },
        { from: "ctxfetch", to: "mongodb", label: "search · aggregate" },
      ],
    },
    highlights: [
      {
        metric: "5 ★",
        description:
          "steam-mcp has real community traction — GitHub stars and forks from other developers building on it",
      },
      {
        metric: "2 Languages",
        description:
          "Steam MCP built in both JavaScript (Node.js + TypeScript) and Python, demonstrating protocol portability",
      },
      {
        metric: "3 Servers",
        description:
          "Three distinct MCP servers: steam-mcp (JS), steamstats-mcp (Python), and context_fetch_mcp (TS + MongoDB)",
      },
      {
        metric: "9+ Tools",
        description:
          "Steam servers expose 9 tools covering player data, game stats, store details, news, and global achievements",
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
      { label: "steam-mcp (JS)", url: "https://github.com/algorhythmic/steam-mcp", type: "github" },
      { label: "steamstats-mcp (Py)", url: "https://github.com/algorhythmic/steamstats-mcp", type: "github" },
      { label: "context_fetch_mcp", url: "https://github.com/algorhythmic/context_fetch_mcp", type: "github" },
    ],
  },
]
