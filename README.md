# daviddunn.dev

Personal portfolio site for David Dunn — Applied AI Engineer based in Santa Clara, CA. Hosted at [daviddunn.dev](https://daviddunn.dev).

## What's on the site

The site is a single-page experience with four sections, navigated via a fixed header:

- **Hero** — name, typewriter role cycler, count-up stats (years / case studies / GitHub repos), and a `VIEW RESUME` button that opens a mac-style terminal modal rendering the resume from `public/resume.md`.
- **Case Studies** — four expandable case study cards (Saga, Nexus, happily.love, MCP server ecosystem). Each card collapses to a hook + four highlight metrics + tech badges, and expands to show problem / solution / architecture / role. Each architecture is rendered as an interactive [React Flow](https://reactflow.dev) graph inside a mac-style terminal window with a maximize-to-modal action.
- **About** — profile card (photo, role, social/email link via the footer), my-story bio, key achievements, and a **Technical Focus** card whose skill chips are clickable — each scrolls to the relevant case study.
- **Footer** — terminal-styled copyright, socials, build credit.

A persistent **status pill** in the menu bar links to the active build (`#saga`). Each case study has a deep-link hash slug (`/#saga`, `/#nexus`, `/#happily`, `/#mcp`) that auto-expands and scrolls to the matching card on load or hash change.

## Design

- **Neobrutalism**: thick borders, hard offset shadows, vivid fills, all-caps headings, chunky `font-black` weights. See `app/globals.css` for shared utilities (`.section-text-outline`, `.text-outline-black`, `.text-outline-white`, etc.).
- **Animated grid background**: shared `AnimatedBackground` component (`components/hero-background.tsx`) renders a CSS grid with traversing colored balls; used across Hero, Portfolio, About, and Footer with section-specific `boost` and fade variants.
- **Homebrew terminal aesthetic**: phosphor green `#28ff28` text on pure black, applied to the resume terminal modal and to the in-card React Flow architecture diagrams. The architecture window has mac-style chrome (traffic lights, title bar) — the green dot maximizes to a near-fullscreen modal portaled to `document.body`.
- **Per-case-study identity**: each case study has a vivid two-color gradient header (Saga violet→pink, Nexus blue→sky, happily.love pink→orange, MCP emerald→lime) plus a unique icon and accent color.

## Tech stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router) on React 19
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with a custom `neo-*` color palette and `hoverOnlyWhenSupported` enabled (no sticky hover on touch devices)
- **UI primitives**: [shadcn/ui](https://ui.shadcn.com/) on top of [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Architecture diagrams**: [@xyflow/react](https://reactflow.dev/) (formerly React Flow), lazy-loaded via `next/dynamic`
- **Markdown**: [react-markdown](https://github.com/remarkjs/react-markdown) + [remark-gfm](https://github.com/remarkjs/remark-gfm) (for the resume terminal)
- **Theme**: custom `ThemeProvider` (`contexts/theme-context.tsx`) — class-based dark mode, persisted to `localStorage`, defaults to system color scheme
- **Package manager**: [pnpm](https://pnpm.io/)

## Project layout

```
app/
  layout.tsx          Root layout, metadata, theme init script
  page.tsx            Composes <Navigation>, <Hero>, <Portfolio>, <About>, <Footer>, <ResumeTerminal>
  globals.css         Theme tokens, neo utilities, animations, scrollbar
components/
  navigation.tsx      Fixed nav: 3-cell grid (logo / status pill / nav controls)
  hero.tsx            Hero card, typewriter, count-up stats, magnetic CTAs
  hero-background.tsx Shared animated grid + traversing balls
  portfolio.tsx       Case study cards, hash deep-linking, expand-to-modal
  about.tsx           Profile + bio + achievements + Technical Focus chips
  footer.tsx          Terminal copyright, socials, build credit
  resume-terminal.tsx Mac-style terminal modal rendering public/resume.md
  architecture-diagram.tsx  React Flow + custom node shapes + maximize portal
  theme-toggle.tsx    Sun/Moon icon swap with rotation animation
contexts/
  theme-context.tsx   Theme provider + useTheme hook
lib/
  portfolio-data.ts   Case study data: highlights, tech, links, architecture graphs
public/
  resume.md           Markdown resume served by the resume terminal
  dd-profile.png      Profile photo
```

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `pnpm dev` — dev server (Next.js on port 3000)
- `pnpm build` — production build
- `pnpm start` — serve the production build
- `pnpm lint` — ESLint via `next lint`

## Deployment

Deployed via Vercel.

## Author

[David Dunn](https://linkedin.com/in/mrdaviddunn) · [github.com/algorhythmic](https://github.com/algorhythmic) · davidalexanderdunn@gmail.com
