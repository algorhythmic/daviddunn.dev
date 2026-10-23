# Project context: daviddunn.dev

Personal portfolio for David Dunn, focused on agent infrastructure and product engineering, Santa Clara, CA. Public repository: `algorhythmic/daviddunn.dev`; site: https://daviddunn.dev. Next.js 15.2.8, React 19, TypeScript, Tailwind, shadcn/Radix, Lucide, React Flow.

## Current structure (October 2026 revision)

- `/`: prewritten animated introduction followed by connected, expandable work rows. The prompt types, a five-second research sequence links public profiles, and the answer streams in. Pause, skip, replay and reduced-motion behavior share timing in `lib/intro-sequence.ts`; `components/workbench.tsx` coordinates playback and work visibility.
- Landing copy and metadata share `lib/site-copy.ts`. Project order, statuses, public profiles and published articles/videos live in `lib/portfolio-activity.ts`. Everything, Projects, Articles and Videos filters derive counts from those records. Publications are currently empty; never include unlisted `/v/` introductions in this feed.
- Expanded landing projects show `components/project-motion.tsx` animations with summaries from `lib/project-previews.ts` and links to `/projects#slug`. Landing order is Odin, Saga, Agent Runtime, dbriefly, Nexus, Happily.love, MCP servers.
- `/projects`: `Navigation`, `Hero`, `Portfolio`, `About`, `Footer`, plus PDF/DOCX/Markdown and terminal resume viewers.
- Seven cards, in order: Odin, Agent Runtime, Saga, dbriefly, Nexus, Happily.love, MCP servers. Data lives in `lib/portfolio-data.ts`; rendering and hash navigation in `components/portfolio.tsx`.
- Stable anchors: `odin`, `runtime`, `saga`, `dbriefly`, `nexus`, `happily`, `mcp`. Use slugs in new links, not numeric card positions.
- Video groundwork: `app/v/[slug]/page.tsx`, server-side allowlist in `lib/intro-videos.ts`, asset headers in `next.config.mjs`. No video files are ready; the allowlist stays empty and routes return 404. See `docs/VIDEO-PUBLISHING.md`.
- Sitemap includes only home and projects. Never include unlisted intros in navigation, the sitemap or robots.txt.
- Selected resumes are `public/resume.pdf`, `public/resume.docx` and `public/resume.md`, supplied together by the owner. Do not silently rewrite or replace an individual format with a conflicting version.

## Content rules

- Positioning: agent infrastructure and product engineering; 7+ years of experience. Describe agent coordination, runtime tooling, observable runs, harnesses/evaluations and development from databases to interfaces in clear language. Keep shared copy in `lib/site-copy.ts` consistent across the landing, metadata and projects page.
- The landing introduction is a scripted animation, not a live chat or live profile lookup. Keep it labelled as an animated introduction and retain its playback controls and static reduced-motion end state.
- Odin is the first card, labelled as a specified design awaiting extraction. Its first adapter is Claude Code; other harness adapters and decision-model integrations remain planned. Saga owns execution, not Odin's planning or memory. Its independent API and durable run ledger are planned; the existing implementation is the April container-worker prototype. Keep this distinction in every summary and diagram.
- The runtime card uses the supplied Heimdall and Skald screenshots. The former connection summary is removed; reserve that position for a public explainer without rendering a placeholder.
- Agent runtime is a collection of independently usable tools with some partial/planned integrations, not a fully connected product. Link quantitative claims to the source report and retain relevant benchmark limits.
- Heimdall has scoped reads and explicit write grants. Evidence proposes completion for human review. Do not promise unrestricted reads or that a person can never manually complete work.
- Distinguish the legacy Saga component named Heimdall from the standalone task-continuity tool.
- Happily.love is client work. Do not describe David as its co-founder or imply ownership. Usage counts require current evidence.
- Nexus's 161M comparison figure describes a historical redesign; do not call it a current pre-filter or measured 99.99% billing saving. Current source has 449 test functions, not 449 freshly passing tests.
- dbriefly voice interaction on web/Telegram Mini App differs from messaging and delivery channels. A latency budget is not a measured latency. Private repositories should offer a walkthrough, not a public GitHub link that returns 404.
- Never invent videos, screenshots, current uptime, test results or repository popularity counts. Final counter values must exist in initial HTML.

## Development

Use pnpm with `pnpm-lock.yaml`. The older `package-lock.json` is stale; do not regenerate dependency versions just to make npm work.

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm exec tsc --noEmit
pnpm build
```

Run the standalone typecheck: the pre-existing Next configuration ignores build-time type errors. The `lint` script currently lacks a configured ESLint setup. Do not relax checks to conceal failures. Keep dependency and infrastructure changes scoped to the task.

Production hosting uses Vercel. Do not deploy, push, change remote settings, or access credentials unless the task authorizes it.

## Design

Preserve neobrutalist projects styling: 2px mobile/4px desktop borders, hard offset shadows, bold headings, bright `neo-*` colors, dark-mode accents and animated grid backgrounds. The landing uses a conversational animation and connected work feed, styled with scoped CSS modules. Architecture diagrams use React Flow in a terminal frame; avoid presenting planned relationships as delivered. Keep keyboard/focus behavior, reduced-motion support and responsive layouts usable.

Theme state belongs to `contexts/theme-context.tsx`. Shared primitives live under `components/ui/`; prefer existing components. Resume document and terminal modals have distinct roles, but both use the same selected asset set.
