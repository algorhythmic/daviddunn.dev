# daviddunn.dev

David Dunn's portfolio — Applied AI & Integration Engineer in Santa Clara, CA.

The home page introduces the work and links to seven projects on `/projects`: Odin, Agent Runtime, Saga, dbriefly, Nexus, Happily.love and MCP servers. Project cards retain the site's neobrutalist design, expandable details and architecture diagrams. Runtime figures link to their source reports and distinguish local benchmarks from general agent performance.

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
| `app/page.tsx` | Home page, project links and resume viewer |
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

No video assets are included yet. Missing or unconfigured introductions return 404; no empty player appears on the runtime card. See [video publishing](docs/VIDEO-PUBLISHING.md) for asset preparation and activation.

Unlisted pages are accessible to anyone who has the link. They use noindex metadata, stay out of the sitemap/navigation, and intro assets receive an `X-Robots-Tag` header. This is discoverability control, not authentication.

## Stack and design

Next.js 15 App Router, React 19, TypeScript, Tailwind CSS, shadcn/Radix primitives, Lucide icons, React Flow and Markdown resume rendering. Themes follow the system by default, with an explicit user override. The projects page uses thick borders, hard shadows, vivid accents, an animated grid and terminal-style diagrams; the home page uses a simpler layout.

Deployment is configured through Vercel. Local edits and builds do not deploy the site.
