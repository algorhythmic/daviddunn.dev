# daviddunn.dev

David Dunn's portfolio — agent infrastructure and product engineering in Santa Clara, CA.

The home page opens with a prewritten animated introduction: a prompt types itself, a five-second research sequence links public profiles, and a short answer introduces David. Pause, skip, replay and reduced-motion controls lead to connected, expandable work rows with project animations and links to the full portfolio. Everything, Projects, Articles and Videos filters share one feed; articles and videos show empty states until public entries are added.

The seven projects are Odin, Saga, Agent Runtime, dbriefly, Nexus, Happily.love and MCP servers. `/projects` retains its neobrutalist cards, expandable details and architecture diagrams. Runtime figures link to source reports and distinguish local benchmarks from general agent performance.

Odin leads as a planned supervisory layer over existing agent harnesses. Saga distinguishes its working container prototype from its planned independent execution service. Neither card claims the extraction has shipped. The runtime card shows Heimdall and Skald screenshots; its public explainer position stays collapsed until a video is ready.

## Run locally

Use pnpm and the checked-in `pnpm-lock.yaml`. The older npm lockfile is out of sync with the manifest.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open http://localhost:3000. Before shipping:

```sh
pnpm exec tsc --noEmit
pnpm build
pnpm start
```

Run the TypeScript check separately: the existing Next configuration permits build-time type errors. The existing `lint` script requires an ESLint setup; it is not a substitute for the checks above.

## Content and routes

| Location | Purpose |
|---|---|
| `app/page.tsx`, `components/workbench.tsx` | Animated landing, connected work rows and content filters |
| `components/intro-animation.tsx`, `lib/intro-sequence.ts` | Prewritten introduction, shared timing and playback controls |
| `lib/site-copy.ts` | Shared positioning, introduction and metadata copy |
| `lib/portfolio-activity.ts` | Landing project order, statuses, public profiles and publication feed |
| `components/project-motion.tsx`, `lib/project-previews.ts` | Project animations and preview summaries |
| `app/projects/page.tsx` | Full portfolio, hero and About section |
| `lib/portfolio-data.ts` | Seven project cards, source links and architecture data |
| `components/portfolio.tsx` | Expandable cards and stable project anchors |
| `components/architecture-diagram.tsx` | React Flow diagrams with distinct relationship styles |
| `components/hero.tsx` | Role text and counters that render final values in initial HTML |
| `components/about.tsx` | Experience, client work and skill links |
| `public/resume.pdf`, `.docx`, `.md` | User-selected resume assets, served through the resume viewers |
| `app/v/[slug]/page.tsx` | Unlisted intro-video pages; unavailable until configured with complete assets |
| `lib/intro-videos.ts` | Server-side intro allowlist; empty until videos are ready |
| `app/sitemap.ts` | Public home/projects routes only |

Deep links use `/projects#odin`, `#runtime`, `#saga`, `#dbriefly`, `#nexus`, `#happily` and `#mcp`. Private projects offer a walkthrough rather than linking to an inaccessible GitHub repository.

## Video publishing

No video assets are included yet. Missing or unconfigured introductions return 404; no empty player appears on the runtime card. See [video publishing](docs/VIDEO-PUBLISHING.md) for asset preparation, activation and the site-wide recording/animation plan.

Unlisted pages are accessible to anyone who has the link. They use noindex metadata, stay out of the sitemap/navigation, and intro assets receive an `X-Robots-Tag` header. This is discoverability control, not authentication.

## Stack and design

Next.js 15 App Router, React 19, TypeScript, Tailwind CSS, shadcn/Radix primitives, Lucide icons, React Flow and Markdown resume rendering. Themes follow the system by default, with an explicit user override. The projects page uses thick borders, hard shadows, vivid accents, an animated grid and terminal-style diagrams; the landing page uses a conversational introduction and connected work feed.

Deployment is configured through Vercel. Local edits and builds do not deploy the site.
