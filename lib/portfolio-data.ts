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
  highlights: {
    metric: string
    description: string
  }[]
  technologies: string[]
  links: {
    label: string
    url: string
    type: "github" | "live" | "demo" | "case-study"
  }[]
}

export const caseStudies: CaseStudy[] = [
  {
    id: 1,
    slug: "prediction-market-platform",
    title: "Prediction Market Intelligence Platform",
    subtitle: "Real-time ingestion, anomaly detection, LLM-powered analysis & autonomous execution",
    hook: "An end-to-end system that ingests streaming prediction market data, detects anomalies, identifies cross-platform arbitrage using ML and LLMs, and surfaces structured intelligence for decision-making.",
    icon: "📊",
    accentColor: "bg-neo-blue-500",
    darkAccentColor: "dark:bg-neo-blue-600",
    problem:
      "Prediction markets generate massive volumes of real-time price and volume data across multiple platforms (Kalshi, Polymarket). Identifying meaningful signals — anomalous price movements, correlated shifts across related markets, and cross-platform arbitrage opportunities — requires processing millions of data points with sub-minute latency. No existing tool combined real-time ingestion, statistical anomaly detection, LLM-powered semantic analysis, and autonomous execution in a single platform.",
    solution:
      "I built a multi-repo platform spanning the full pipeline from data ingestion to autonomous trade execution. ProjectNexus handles real-time WebSocket streaming, sliding-window anomaly detection, and Claude-powered narrative generation that explains why markets moved. MarketFinder ETL is a multi-layer comparison engine that reduces 161M+ potential cross-platform comparisons to ~1K LLM calls using semantic bucketing, hierarchical filtering, and ML scoring — a 99.99% cost reduction. Arbytron is the autonomous execution layer with Kafka-based message brokering, position tracking, and configurable risk controls. The React/Convex frontend provides a live dashboard with anomaly feeds, market comparison tools, and trending topic views.",
    role: "Sole architect and developer — designed the system architecture, built all backend services, trained the ML scoring model, integrated three LLM providers, built the frontend, and deployed to Fly.io.",
    architectureDescription:
      "Ingestion (WebSocket streaming + REST polling) → Detection (sliding-window anomaly detection at 5/15/60/1440-min intervals) → Analysis (LLM topic clustering, cross-market correlation, narrative generation, multi-layer arbitrage comparison) → Execution (autonomous cross-platform arbitrage with Kafka and PostgreSQL)",
    highlights: [
      {
        metric: "161M → 1K",
        description:
          "Market comparisons reduced via semantic bucketing, hierarchical filtering, and ML scoring — 99.99% cost reduction",
      },
      {
        metric: "158 tests",
        description:
          "Comprehensive test suite across 17 modules covering ingestion, anomaly detection, clustering, correlation, and API layers",
      },
      {
        metric: "72h+",
        description:
          "Continuous stable ingestion validated with 100K+ events, failure modes documented, formal decision gates passed",
      },
      {
        metric: "3 LLM providers",
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
    id: 2,
    slug: "happily-love",
    title: "happily.love",
    subtitle: "AI-powered matchmaking platform",
    hook: "A full-stack consumer SaaS matchmaking service — from AI-driven compatibility analysis to the interface users interact with daily.",
    icon: "💜",
    accentColor: "bg-neo-pink-light",
    darkAccentColor: "dark:bg-neo-pink-dark",
    problem:
      "Modern dating platforms rely on surface-level signals — photos, short bios, and swipe behavior — to match people. They optimize for engagement rather than compatibility. Users face decision fatigue from endless options, and matching algorithms treat people as inventory rather than individuals with complex preferences, values, and relationship goals.",
    solution:
      "I designed and built happily.love, a matchmaking service that uses AI to analyze compatibility at a deeper level than traditional swipe-based apps. The platform includes an intelligent matching engine, user onboarding flows that capture meaningful preference data, an admin dashboard for managing matches and monitoring platform health, and a consumer-facing interface designed around intentional connection rather than infinite scrolling.",
    role: "Full-stack developer and technical co-founder — architecture design through deployment, including the AI matching pipeline, backend services, admin tooling, and user-facing frontend.",
    architectureDescription:
      "Modern web frontend → Backend API (auth, profiles, matching logic) → AI compatibility engine → Admin dashboard for matchmaking operations and analytics",
    highlights: [
      {
        metric: "Full SaaS",
        description:
          "End-to-end consumer product: user auth, onboarding, profiles, matching, admin dashboard, and analytics",
      },
      {
        metric: "AI matching",
        description:
          "Intelligent compatibility engine that matches on values, goals, and behavioral signals — not just photos",
      },
      {
        metric: "Admin tooling",
        description:
          "Internal dashboard for match management, user analytics, platform health monitoring, and operations",
      },
      {
        metric: "Live product",
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
    id: 3,
    slug: "mcp-server-ecosystem",
    title: "MCP Server Ecosystem",
    subtitle: "Building the connective layer between AI models and external services",
    hook: "Three Model Context Protocol servers across JavaScript and Python — giving AI assistants structured access to gaming data, documentation, and more.",
    icon: "🔌",
    accentColor: "bg-neo-green-light",
    darkAccentColor: "dark:bg-neo-green-dark",
    problem:
      "AI assistants are powerful reasoners but have limited ability to interact with external services and data sources. The Model Context Protocol (MCP) is the emerging standard for giving AI models structured tool access, but the ecosystem is still young. Real-world API integrations require handling authentication, rate limiting, error recovery, and structured data transformation — challenges that get harder when the consumer is a language model, not a human.",
    solution:
      "I built three MCP servers that demonstrate different aspects of the protocol. The Steam MCP servers (built in both JavaScript and Python) expose the full Steam Web API to AI clients — player stats, achievements, store details, and news. The context_fetch_mcp server is a documentation knowledge base backed by MongoDB, enabling AI clients to fetch, store, search, and aggregate technical documentation. Together they range from API proxy (Steam) to knowledge management (context_fetch).",
    role: "Sole developer on all three servers. Built the JavaScript Steam server first, then rebuilt it in Python to demonstrate MCP pattern portability. Designed the context_fetch_mcp architecture including MongoDB text indexing and Zod schema validation.",
    architectureDescription:
      "Each server implements MCP via STDIO transport. Steam servers wrap the Steam Web API with structured tool definitions and response normalization. context_fetch_mcp adds a MongoDB persistence layer with text search, metadata aggregation, and schema discovery via MCP resources.",
    highlights: [
      {
        metric: "5 ★",
        description:
          "steam-mcp has real community traction — GitHub stars and forks from other developers building on it",
      },
      {
        metric: "2 languages",
        description:
          "Steam MCP built in both JavaScript (Node.js + TypeScript) and Python, demonstrating protocol portability",
      },
      {
        metric: "3 servers",
        description:
          "Three distinct MCP servers: steam-mcp (JS), steamstats-mcp (Python), and context_fetch_mcp (TS + MongoDB)",
      },
      {
        metric: "9+ tools",
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
