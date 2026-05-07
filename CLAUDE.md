# CLAUDE.md — Project Context for daviddunn.dev

## Project Overview

Personal portfolio site for David Alexander Dunn (github.com/algorhythmic), hosted at **daviddunn.dev** (formerly .tech). Built with Next.js 15, React 19, TypeScript, Tailwind CSS, and shadcn/ui. Uses a **neobrutalist** design system (thick borders, hard box shadows, bold fills, all-caps headings, vivid accent colors) layered over an animated grid background.

Public-facing title: **"AI Engineer"** (positioning was repositioned from generic "Data Engineering" to AI/LLM/MCP focus).

## Site Structure (current)

`app/page.tsx` is a thin client component composing:

1. `Navigation` — fixed top nav, auto-hide on scroll-down (mobile), active-section highlighting, theme toggle.
2. `Hero` — status pill, typewriter role ("AI Systems Builder", "Applied AI Engineer", "Data Automation Developer"), count-up stats, magnetic CTAs, entrance choreography, glow.
3. `Portfolio` — three expandable case study cards (see below).
4. `About` — profile card (photo, location, experience, social links), bio, technical skills, key achievements.
5. `ResumeTerminal` — modal viewer with mac-style chrome and Homebrew-themed terminal that "types" `cat resume.md` then renders `public/resume.md` via `react-markdown`. Triggered from both Hero and About.

`AnimatedBackground` (`components/hero-background.tsx`) is the shared grid+dots+balls background used across Hero and About sections, with a `boost` variant for stronger glow.

## The Three Case Studies (`lib/portfolio-data.ts`)

### 1. Prediction Market Intelligence Platform
- **Repos**: projectnexus, marketfinder_ETL, arbytron, marketfinder
- End-to-end system: ingestion → anomaly detection → LLM analysis → autonomous execution.
- ProjectNexus: real-time WebSocket streaming from Kalshi, sliding-window anomaly detection (5/15/60/1440 min), Claude-powered narratives, LLM topic clustering, 158 tests across 17 modules, Fly.io.
- MarketFinder ETL: multi-layer comparison reducing 161M comparisons → ~1K LLM calls (99.99% cost reduction) via semantic bucketing → hierarchical filtering → ML scoring → LLM evaluation.
- Arbytron: autonomous arbitrage execution bot with Kafka, PostgreSQL, Prometheus, configurable risk controls.
- MarketFinder: React/Convex frontend (now merged into Nexus monorepo).

### 2. happily.love
- Live AI-powered matchmaking SaaS (proprietary, private repo) — https://happily.love
- Presented via narrative + screenshots (no code links).
- **Tech list is still placeholders** (`React`, `TypeScript`, `Next.js`, `AI/LLM Integration`, `Authentication`, `Cloud Deployment`) — needs real stack details from David.

### 3. MCP Server Ecosystem
- **Repos**: steam-mcp (JS, 5★), steamstats-mcp (Python), context_fetch_mcp (TS + MongoDB)
- Three Model Context Protocol servers giving AI models structured access to external services.

## Full Repo Inventory (github.com/algorhythmic — 19 repos)

| Repo | Description | Language | Stars | Status |
|------|-------------|----------|-------|--------|
| projectnexus | Prediction market intelligence engine | Python | 5 | Active |
| marketfinder | Prediction Market Discovery Platform (archived, merged into Nexus) | TypeScript | — | Archived |
| auctionpilot | WoW TBC auction house toolkit (Lua addon + Python analytics) | Lua/Python | — | Active |
| daviddunn.dev | This portfolio site | TypeScript | — | Active |
| marketfinder_ETL | Multi-layer arbitrage detection pipeline | TypeScript | 2 | Active |
| arbytron | Autonomous Arbitration Arbiter | Jupyter Notebook | — | Active |
| obsidiservicord | (private) | — | — | Private |
| yc_analytics | Streamlit Dashboard of YC-backed Companies (DuckDB + Plotly) | Python | 1 | Active |
| context_fetch_mcp | MCP documentation database server (MongoDB) | TypeScript | — | Active |
| steamstats-mcp | MCP Server for Steam (Python) | Python | — | Active |
| steam-mcp | MCP Server for Steam (JavaScript) | JavaScript | 5 | Active |
| stEvalViz | Streamlit Prediction Dashboard | Python | 1 | Older |
| registrarSearch | (private) | — | — | Private |
| stockbot | Jupyter Notebook + R | Jupyter Notebook | 2 | Minimal |
| py_projects | Python notebook collection | Jupyter Notebook | — | Older |
| r_projects | R notebook collection | HTML | — | Older |
| daviddunn-tech | Deprecated portfolio | TypeScript | — | Deprecated |
| personalsite-deprecated | Old personal site | CSS | — | Deprecated |
| try_git | First repo | — | — | 2013 |

> Note: GitHub repo for this site is still named `daviddunn.tech` — the live site URL has moved to `daviddunn.dev` (see commit `d809e72`), but the repo rename is pending.

## Status — Done

- Rebrand to "AI Engineer" positioning, three real case studies replacing 9 fictional projects.
- Domain switched from .tech → .dev (`d809e72`).
- About bio rewritten with genuine career narrative; Santa Clara location; "6+ Years Experience".
- Resume system: replaced non-functional download button with `ResumeTerminal` modal that renders `public/resume.md`. Trigger lives in both Hero and About via `onOpenResume` prop drilled from `app/page.tsx`.
- Profile pic (`public/dd-profile.png`) replacing placeholder; Instagram social link added.
- Animated background system (grid + traversing dots + glowing balls) replacing the random-data dashboard. Extends to all sections, with a `boost` variant. Multiple polish passes for mobile (svh, JS-captured height, scroll-resize fixes for iOS address bar).
- Hero overhaul: status pill, typewriter role cycler, count-up stats, magnetic CTAs, glow, entrance choreography. Hero gate animations moved into `globals.css` to avoid FOUC (`35ac5a9`); client-only mount gates removed (`2e2be9e`).
- Mobile nav: compact, auto-hide on scroll-down + reveal on scroll-up.
- Theme: defaults to system color scheme when no saved preference (`2e02068`); inline init script in `<head>` to prevent flash.
- Section text-outline utility for legibility over animated backgrounds; refreshed About + Case Studies background colors; translucent case study cards with anchor IDs.
- SEO metadata: proper title, description, Open Graph, Twitter card in `app/layout.tsx`.
- ThemeProvider moved to `app/layout.tsx` (now from `@/contexts/theme-context`). `app/page.tsx` is still `"use client"` because it owns `resumeOpen` state — full server-component conversion would require lifting that state or using URL state.
- React Server Components CVE patched (`dcfb697`).

## Status — Open TODOs

- [ ] Resume PDF — currently shipped as `public/resume.md` rendered via terminal modal. Decide whether to keep markdown-only or add a downloadable PDF.
- [ ] Accessibility fundamentals: skip-to-content link, ARIA labels on interactive controls, focus-visible styling audit.
- [ ] happily.love case study — replace placeholder tech list with real stack from David.
- [ ] Add screenshots / architecture diagrams to case studies.
- [ ] Consider adding `registrarSearch` as a case study if it becomes public.
- [ ] Extract repeated neo-brutal Tailwind patterns (border + shadow + hover translate combo is duplicated dozens of times) into shared utilities or `@apply`.
- [ ] Update GitHub profile README to match new positioning.
- [ ] `app/sitemap.ts` not present — add one.
- [ ] Rename GitHub repo from `daviddunn.tech` to `daviddunn.dev`.
- [ ] Consider lifting `resumeOpen` state out of `app/page.tsx` so the page can be a server component.

## Design System Reference

- **Aesthetic**: Neobrutalism — thick borders (2px mobile / 4px desktop), hard box shadows (4–8px offset), vivid fills, all-caps headings, `font-black` weight.
- **Colors**: `neo-blue-500` (#3b82f6) primary, `neo-yellow-light` (#fbbf24), `neo-pink-light` (#ec4899), `neo-green-light` (#10b981), `neo-red-light` (#ef4444), `neo-cyan-light` (#06b6d4), `neo-purple-light` (#8b5cf6).
- **Dark mode**: class strategy via `ThemeProvider` (`contexts/theme-context.tsx`); slate backgrounds, `neo-blue` accent borders, glow effects.
- **Shadow pattern**: `border-4 border-black dark:border-neo-blue-500 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`.
- **Interactive pattern**: hover reduces shadow + translates element; active removes shadow entirely.
- **Background**: shared `AnimatedBackground` component — animated grid lines with traversing dots and glowing balls; `boost` prop for stronger glow.
- **Font**: Inter.
- **Components**: shadcn/ui primitives with Radix UI; Lucide icons; `react-markdown` + `remark-gfm` for resume rendering.

## Developer Info

- **Author**: David Alexander Dunn
- **GitHub**: github.com/algorhythmic
- **LinkedIn**: linkedin.com/in/mrdaviddunn
- **X/Twitter**: @MrDavidDunn
- **Instagram**: instagram.com/mrdaviddunn
- **Email**: davidalexanderdunn@gmail.com
- **Location**: Santa Clara, CA
- **Domain**: daviddunn.dev
- **Deployed via**: Vercel
- **Package manager**: pnpm (fallback: npm with `--legacy-peer-deps`)
