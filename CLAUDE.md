# CLAUDE.md — Project Context for daviddunn.tech

## Project Overview

Personal portfolio website for David Alexander Dunn (github.com/algorhythmic), hosted at **daviddunn.dev** (recently changed TLD from .tech to .dev). Built with Next.js 15, React 19, TypeScript, Tailwind CSS, and shadcn/ui. Uses a **neobrutalist** design system (thick borders, hard box shadows, bold fills, all-caps headings, vivid accent colors).

## Strategic Direction

The site is being repositioned from a generic "data engineering" portfolio to a **"full-stack AI developer"** portfolio. The key changes:

1. **Replaced 9 fictional projects with 3 real case studies** based on actual repos and shipped products
2. **Case study format** instead of project cards — each study has: problem, solution, role, architecture, quantified highlights, tech stack, and links
3. **Navigation updated**: "Projects" → "Case Studies", logo ".TECH" → ".DEV"
4. **Content must be authentic** — no fake data, no stock photos, no dead links

## The Three Case Studies

### Case Study 1: Prediction Market Intelligence Platform
- **Repos**: projectnexus, marketfinder_ETL, arbytron, marketfinder
- **What it is**: End-to-end system spanning ingestion → anomaly detection → LLM analysis → autonomous execution
- **ProjectNexus**: Real-time WebSocket streaming from Kalshi, sliding-window anomaly detection (5/15/60/1440 min), Claude-powered narrative generation, LLM topic clustering, 158 tests across 17 modules, Fly.io deployment
- **MarketFinder ETL**: Multi-layer comparison engine reducing 161M potential cross-platform comparisons to ~1K LLM calls (99.99% cost reduction). Uses semantic bucketing → hierarchical filtering → ML scoring → LLM evaluation (OpenAI, Anthropic, Vertex AI)
- **Arbytron**: Autonomous arbitrage execution bot with Kafka, PostgreSQL, Prometheus, configurable risk controls
- **MarketFinder**: React/Convex frontend (now merged into Nexus monorepo). Dashboard, anomaly feeds, market comparison, trending topics
- **Key tech**: Python, TypeScript, React, Convex, Claude API, OpenAI API, Vertex AI, WebSockets, Kafka, PostgreSQL, DuckDB, Airflow, Docker, Fly.io

### Case Study 2: happily.love
- **What it is**: AI-powered matchmaking SaaS platform (proprietary, private repo)
- **Live at**: https://happily.love
- **Presentation approach**: Screenshots, architecture diagrams, and narrative — no code links (proprietary)
- **Includes**: AI matching engine, user onboarding, admin dashboard, consumer frontend
- **TODO**: Get actual tech stack details from David to replace placeholder technologies

### Case Study 3: MCP Server Ecosystem
- **Repos**: steam-mcp (JS, 5 stars, 1 fork), steamstats-mcp (Python), context_fetch_mcp (TS + MongoDB)
- **What it is**: Three Model Context Protocol servers giving AI models structured access to external services
- **steam-mcp**: Node.js/TypeScript, wraps Steam Web API (9 tools: player stats, achievements, game schema, news, etc.)
- **steamstats-mcp**: Same concept rebuilt in Python — demonstrates MCP pattern portability
- **context_fetch_mcp**: MCP documentation knowledge base backed by MongoDB with text search, metadata aggregation, Zod validation, and MCP resource discovery

## Full Repo Inventory (github.com/algorhythmic — 19 repos)

| Repo | Description | Language | Stars | Status |
|------|-------------|----------|-------|--------|
| projectnexus | Prediction market intelligence engine | Python | 5 | Active, 73 commits |
| marketfinder | Prediction Market Discovery Platform (archived, merged into Nexus) | TypeScript | — | Archived |
| auctionpilot | WoW TBC auction house toolkit (Lua addon + Python analytics) | Lua/Python | — | Active, 13 commits |
| daviddunn.tech | This portfolio site | TypeScript | — | Active |
| marketfinder_ETL | Multi-layer arbitrage detection pipeline | TypeScript | 2 | Active |
| arbytron | Autonomous Arbitration Arbiter | Jupyter Notebook | — | Active |
| obsidiservicord | (private) | — | — | Private |
| yc_analytics | Streamlit Dashboard of YC-backed Companies (DuckDB + Plotly) | Python | 1 | Active |
| context_fetch_mcp | MCP documentation database server (MongoDB) | TypeScript | — | Active |
| steamstats-mcp | MCP Server for Steam (Python) | Python | — | Active |
| steam-mcp | MCP Server for Steam (JavaScript) | JavaScript | 5 | Active |
| stEvalViz | Streamlit Prediction Dashboard | Python | 1 | Older |
| registrarSearch | (private) | — | — | Private |
| stockbot | Jupyter Notebook + R (bare README) | Jupyter Notebook | 2 | Minimal |
| py_projects | Python notebook collection | Jupyter Notebook | — | Older |
| r_projects | R notebook collection | HTML | — | Older |
| daviddunn-tech | Deprecated portfolio | TypeScript | — | Deprecated |
| personalsite-deprecated | Old personal site | CSS | — | Deprecated |
| try_git | First repo | — | — | 2013 |

## Known Issues (from site review)

### Critical — FIXED
- ~~**About bio is entirely satirical**~~ — Rewritten with genuine career narrative
- ~~**"DOWNLOAD RESUME" button has no handler**~~ — Now links to LinkedIn (interim; real PDF still needed)
- ~~**Photo gallery uses Unsplash stock images**~~ — Removed from site entirely
- **Dashboard shows random fake data** — `Math.random()` generates all KPIs, but now labeled as "interactive demo" (acceptable)
- ~~**Location says "San Francisco, CA"**~~ — Fixed to "Santa Clara, CA"

### SEO / Technical — PARTIALLY FIXED
- **Page is still `"use client"`** — metadata added to layout.tsx (SSR for meta tags works), but full SSR requires moving ThemeProvider to layout
- ~~**Metadata is generic**~~ — Proper title, description, Open Graph, and Twitter cards added
- ~~**Artificial 1.5s loading delay**~~ — Removed

### Design / UX — REMAINING
- **No footer, no copyright**
- **No accessibility fundamentals** — no skip-to-content, no ARIA labels
- **Massive Tailwind class duplication** — the neo shadow/border pattern is copy-pasted dozens of times, should be extracted to shared utilities

## Files Changed So Far

### `lib/portfolio-data.ts` — REPLACED
- Old: 9 fictional project objects with dead links
- New: 3 `CaseStudy` objects with full problem/solution/role/architecture/highlights/tech/links
- Removed unused backward-compatible `projects` export (dead code)

### `components/portfolio.tsx` — REPLACED
- Old: Project card grid with category filter
- New: Expandable case study cards. Collapsed view shows header band, hook, 4 metric cards, tech badges, links. Expanded view adds Problem, Solution, Architecture (terminal-style), and Role sections

### `components/navigation.tsx` — MODIFIED
- "Projects" → "Case Studies" in nav label
- ".TECH" → ".DEV" in logo
- Removed "Gallery" nav item (stock photo gallery removed from site)

### `components/hero.tsx` — MODIFIED
- Roles: "Data Engineer / Real-time Analytics / Full-Stack Development" → "AI Developer / Full-Stack Engineer / LLM & MCP Systems"
- Badge chips: "Big Data / Analytics / Full-Stack" → "AI / LLM / Full-Stack / MCP Servers"
- Icons: Database/BarChart3/Code → Cpu/Code/Plug
- Tagline rewritten to AI-focused messaging

### `components/about.tsx` — REWRITTEN
- Removed entirely satirical bio ("University of Mars", "data pipelines for dinosaurs"), replaced with genuine career narrative
- Title: "Senior Data & Analytics Engineer" → "Full-Stack AI Developer"
- Location: "San Francisco, CA" → "Santa Clara, CA"
- Skills list updated: removed generic data engineering tools, added Claude API, OpenAI API, Vertex AI, MCP SDK, Convex, etc.
- Achievements: replaced fake metrics with real accomplishments from case studies
- Resume button: replaced non-functional `<button>` with `<a>` linking to LinkedIn (interim until PDF resume is added)
- Removed unused `Download` import, added `ExternalLink`

### `components/dashboard.tsx` — MODIFIED
- Subtitle changed to honestly label as "Interactive data visualization demo — built with Recharts and randomized sample data"

### `app/layout.tsx` — MODIFIED
- Title: "David's Website" → "David Dunn | Full-Stack AI Developer"
- Description: "Welcome to my website!" → proper SEO description
- Added Open Graph and Twitter card metadata

### `app/page.tsx` — MODIFIED
- Removed artificial 1.5s loading delay (`setTimeout`)
- Removed `LoadingSpinner` import and `isLoading` state
- Removed `PhotoGallery` import and component (stock photo gallery removed)
- Kept `mounted` check for hydration mismatch prevention (instant, no delay)

## Still TODO

- [ ] Add resume PDF and wire download button (currently links to LinkedIn)
- [ ] Add footer with copyright and social links
- [ ] Get happily.love actual tech stack and update case study 2
- [ ] Add screenshots/architecture diagrams to case studies
- [ ] Consider adding `registrarSearch` as a case study if it becomes public
- [ ] Extract repeated Tailwind neo-brutal patterns into shared utilities or @apply
- [ ] Update GitHub profile README to match new positioning
- [ ] Update experience from "3+ Years" if outdated
- [ ] Move ThemeProvider to layout.tsx and convert page.tsx to server component for true SSR
- [ ] Add sitemap.xml
- [ ] Delete unused `components/photo-gallery.tsx` and `components/loading-spinner.tsx` (no longer imported)
- [ ] Rename GitHub repo from `daviddunn.tech` to `daviddunn.dev`

## Design System Reference

- **Aesthetic**: Neobrutalism — thick black borders (4px), hard box shadows (8-16px offset), vivid fills, all-caps headings, font-black weight
- **Colors**: neo-blue-500 (#3b82f6) primary, neo-yellow-light (#fbbf24), neo-pink-light (#ec4899), neo-green-light (#10b981), neo-red-light (#ef4444), neo-cyan-light (#06b6d4), neo-purple-light (#8b5cf6)
- **Dark mode**: Implemented via class strategy, slate backgrounds, neo-blue accent borders, glow effects
- **Shadow pattern**: `border-4 border-black dark:border-neo-blue-500 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`
- **Interactive pattern**: hover reduces shadow + translates element, active removes shadow entirely
- **Font**: Inter (but should be upgraded per frontend-design best practices)
- **Components**: shadcn/ui primitives with Radix UI, Recharts for dashboard, Lucide icons

## Developer Info

- **Author**: David Alexander Dunn
- **GitHub**: github.com/algorhythmic
- **LinkedIn**: linkedin.com/in/mrdaviddunn
- **X/Twitter**: @MrDavidDunn
- **Email**: davidalexanderdunn@gmail.com
- **Location**: Santa Clara, CA
- **Domain**: daviddunn.dev
- **Deployed via**: Vercel (assumed from Next.js setup)
- **Package manager**: pnpm (fallback: npm with --legacy-peer-deps)
