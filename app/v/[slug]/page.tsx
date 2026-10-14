import { existsSync } from "node:fs"
import path from "node:path"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { FileText, Mail, PlayCircle } from "lucide-react"
import {
  INTRO_ASSET_EXTENSIONS,
  INTRO_VIDEOS,
  findIntroVideo,
  introAssetPaths,
  isPublishable,
  validateIntroVideo,
  type IntroVideo,
} from "@/lib/intro-videos"

// Unlisted intro pages. Not in the sitemap, navigation or robots.txt, and
// marked noindex/nofollow here and via X-Robots-Tag in next.config.mjs.
// See docs/VIDEO-PUBLISHING.md.

// Only slugs returned by generateStaticParams exist; everything else is a 404.
export const dynamicParams = false
// Allow regeneration after an hour. ISR is request-triggered and may serve a
// stale response first; expiry is not a strict cutoff. See the publishing guide.
export const revalidate = 3600

type Params = { slug: string }
type PageProps = { params: Promise<Params> }

const EMAIL = "davidalexanderdunn@gmail.com"
const RESUME_PDF = "/resume.pdf"
const WALKTHROUGH = "/projects#runtime"

function assetsPresent(intro: IntroVideo): boolean {
  const publicVideoDir = path.join(process.cwd(), "public", "video")
  return INTRO_ASSET_EXTENSIONS.every((ext) => existsSync(path.join(publicVideoDir, `${intro.file}.${ext}`)))
}

// Runs at build time only, where public/ is on disk. An entry is published
// only if it is valid, ready, unexpired and all three assets exist.
export function generateStaticParams(): Params[] {
  const now = new Date()
  const published: Params[] = []
  for (const intro of INTRO_VIDEOS) {
    const problems = validateIntroVideo(intro)
    if (problems.length > 0) {
      console.warn(`[intro-videos] not publishing an entry: ${problems.join("; ")}`)
      continue
    }
    if (!isPublishable(intro, now)) continue
    if (!assetsPresent(intro)) {
      console.warn(
        `[intro-videos] not publishing ${intro.file}: missing ${INTRO_ASSET_EXTENSIONS.map((e) => `${intro.file}.${e}`).join(", ")} in public/video/`,
      )
      continue
    }
    published.push({ slug: intro.slug })
  }
  return published
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const intro = findIntroVideo(slug)
  return {
    title: intro ? `David Dunn · ${intro.role}` : "Not found",
    description: intro ? `A short introduction from David Dunn, ${intro.role}.` : undefined,
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: { index: false, follow: false, noimageindex: true },
    },
    // Keep the unlisted URL out of Referer headers sent to other sites.
    referrer: "same-origin",
    openGraph: intro ? { title: `David Dunn · ${intro.role}`, siteName: "David Dunn", type: "website" } : undefined,
  }
}

const buttonClass =
  "inline-flex items-center gap-1.5 rounded-full border border-foreground/15 px-4 py-2 text-sm font-medium hover:bg-foreground/5 transition-colors"

export default async function IntroPage({ params }: PageProps) {
  const { slug } = await params
  const intro = findIntroVideo(slug)
  if (!intro) notFound()

  const assets = introAssetPaths(intro)

  return (
    <div className="min-h-[100svh] bg-background text-foreground">
      <main className="max-w-3xl mx-auto px-5 sm:px-6 py-10 sm:py-16">
        <video
          controls
          playsInline
          preload="metadata"
          poster={assets.poster}
          width={1920}
          height={1080}
          className="w-full h-auto aspect-video rounded-2xl bg-black ring-1 ring-foreground/10 shadow-sm"
        >
          <source src={assets.video} type="video/mp4" />
          <track
            kind="captions"
            src={assets.captions}
            srcLang="en"
            label="English"
            default={!intro.burnedInCaptions}
          />
          Your browser cannot play this video. <a href={assets.video}>Download the MP4</a>.
        </video>

        <h1 className="mt-6 text-center text-xl sm:text-2xl font-bold tracking-tight">
          David Dunn · {intro.role}
        </h1>

        <nav aria-label="Next steps" className="mt-6 flex flex-wrap justify-center gap-3">
          <a href={RESUME_PDF} target="_blank" rel="noopener" className={buttonClass}>
            <FileText className="w-4 h-4" aria-hidden="true" />
            Résumé (PDF)
          </a>
          <Link href={WALKTHROUGH} className={buttonClass}>
            <PlayCircle className="w-4 h-4" aria-hidden="true" />
            Agent runtime walkthrough
          </Link>
          <a href={`mailto:${EMAIL}`} className={buttonClass}>
            <Mail className="w-4 h-4" aria-hidden="true" />
            Email
          </a>
        </nav>
      </main>
    </div>
  )
}
