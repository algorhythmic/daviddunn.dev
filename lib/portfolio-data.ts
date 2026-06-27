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
  impact: string
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
    hook: "I send it a coding task from my phone. It splits the work across several Claude Code agents in sandboxed containers, reviews each plan before any code runs, and opens pull requests back to my repos — I stay the one who hits merge.",
    icon: "📜",
    accentColor: "bg-gradient-to-br from-violet-600 to-pink-200",
    darkAccentColor: "dark:from-violet-800 dark:to-pink-700",
    problem:
      "Running one AI coding agent is easy. Running several at once isn't — one person can only watch so many long sessions before quality slips, and the sessions themselves drift as their context fills with noise. I wanted several supervised agents working in parallel without losing track of any of them.",
    solution:
      "Saga runs on my own home server. I hand it a task over Telegram; it breaks the work into independent streams, has a second model critique each plan before any code runs, then launches several agents — each isolated in its own hardened container with no API keys and no access to the host. They report progress over a live event stream, and a final agent drafts each fix as a pull request for me to review and merge.",
    impact:
      "Lets one person run several coding agents at once. I kick off work from my phone and come back to reviewed pull requests — parallel progress without sitting at the keyboard for each session.",
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
        metric: "Phone → PR",
        description:
          "Send a task from Telegram, get reviewed pull requests back. The loop runs unattended until merge.",
      },
      {
        metric: "Every plan reviewed",
        description:
          "A second model critiques each plan before code runs, and each fix before it merges.",
      },
      {
        metric: "Sandboxed",
        description:
          "Every agent runs in its own hardened container — no API keys, no access to the host machine.",
      },
      {
        metric: "I hit merge",
        description:
          "The system proposes; I approve. Every launch and merge stops at one button.",
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
    hook: "A system that watches prediction markets on Kalshi and Polymarket in real time, flags unusual price moves, finds the same bet priced differently across platforms, and can place the trade to capture the gap.",
    icon: "📊",
    accentColor: "bg-gradient-to-br from-blue-600 to-sky-200",
    darkAccentColor: "dark:from-blue-800 dark:to-sky-700",
    problem:
      "Prediction markets move fast and price the same events differently across platforms. Catching a gap worth trading means comparing millions of market pairs in near real time — too much to do by hand, and too expensive to point an LLM at every pair.",
    solution:
      "I built the full pipeline. One service streams live prices and flags abnormal moves. A matching engine narrows 161M+ possible cross-platform pairs down to ~1,000 worth an LLM's attention — a 99.99% cost cut — by running cheap filters first and the LLM last. An execution bot places trades within risk limits, and a dashboard shows the live anomaly feed and open positions.",
    impact: "Turns millions of raw market data points into a short list of tradeable price gaps — and can place the trade automatically within set risk limits, in near real time.",
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
          "Cross-platform pairs filtered down before any LLM runs — 99.99% less cost.",
      },
      {
        metric: "158 Tests",
        description:
          "Across ingestion, detection, clustering, and the API layer — 17 modules.",
      },
      {
        metric: "72h+",
        description:
          "Continuous live ingestion, 100K+ events, no crash.",
      },
      {
        metric: "3 LLMs",
        description:
          "Claude, OpenAI, and Vertex AI for matching, clustering, and analysis.",
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
      { label: "Live Site", url: "https://marketfinder.daviddunn.dev", type: "live" },
      { label: "GitHub", url: "https://github.com/algorhythmic/projectnexus", type: "github" },
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
    impact: "A live product real people use to find partners — with a private matchmaker workflow behind it. Shipped and running at happily.love, not a portfolio demo.",
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
        metric: "47 users",
        description:
          "Real people onboarded onto the platform.",
      },
      {
        metric: "AI Matching",
        description:
          "Matches on values, goals, and behavior — not just photos.",
      },
      {
        metric: "21 matches",
        description:
          "Matches made between members.",
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
    hook: "Three small servers that let AI assistants like Claude pull real data themselves — Steam game stats and a searchable docs library — instead of guessing.",
    icon: "🔌",
    accentColor: "bg-gradient-to-br from-emerald-600 to-lime-200",
    darkAccentColor: "dark:from-emerald-800 dark:to-lime-800",
    problem:
      "AI assistants can reason but can't reach live data on their own. The Model Context Protocol fixes that, but each integration still has to handle auth, rate limits, and data shaped for a model to use rather than a person.",
    solution:
      "I built three. Two expose the full Steam API — player stats, achievements, store details, news — one in JavaScript and one in Python. The third is a MongoDB-backed docs library an assistant can search and add to. The JavaScript one picked up 5 GitHub stars from other developers building on it.",
    impact: "Any MCP-capable assistant — Claude, Cursor, ChatGPT — gets clean access to Steam data and a searchable docs library with no custom glue code. Other developers have starred and forked them.",
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
          "steam-mcp picked up GitHub stars and forks from other developers.",
      },
      {
        metric: "9+ Tools",
        description:
          "Player data, game stats, store details, news, and achievements.",
      },
      {
        metric: "3 Servers",
        description:
          "Steam (JS), Steam (Python), and a MongoDB-backed docs library.",
      },
      {
        metric: "2 Languages",
        description:
          "Same Steam server in JS and Python to prove the pattern is portable.",
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
