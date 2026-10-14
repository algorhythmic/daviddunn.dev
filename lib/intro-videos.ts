// Unlisted intro videos served at /v/<slug>.
//
// "Unlisted" means hidden from search engines, the sitemap and navigation; anyone
// with the link can watch. See docs/VIDEO-PUBLISHING.md before adding an entry.
//
// Rules (enforced by validateIntroVideo; anything invalid is never published):
// - slug: lowercase letters, digits and hyphens, ending in a random token of at
//   least 8 characters including a digit (generate it; never use a company or
//   person name).
// - file: basename under public/video/, starting with "intro-" (so the
//   X-Robots-Tag header in next.config.mjs covers it) and ending in its own
//   random token, so the asset URL is not guessable either.
// - ready: set to true only after <file>.mp4, <file>.vtt and <file>.jpg are in
//   public/video/. The build also checks the files exist.
// - expiresAt: optional ISO 8601 timestamp; the page returns 404 from then on.
//
// This list is intentionally empty: no intro videos have been recorded yet.

export interface IntroVideo {
  /** URL segment after /v/. */
  slug: string
  /** Shown as "David Dunn · <role>". */
  role: string
  /** Asset basename in public/video/ without extension, e.g. intro-<role>-<token>. */
  file: string
  /** True once the MP4, VTT and poster have been added. */
  ready: boolean
  /** Captions are burned into the picture; the VTT track is then offered but off by default. */
  burnedInCaptions: boolean
  /** Optional retirement time (ISO 8601 with offset, e.g. 2027-01-31T23:59:59-08:00). */
  expiresAt?: string
}

export const INTRO_VIDEOS: readonly IntroVideo[] = []

export const INTRO_ASSET_EXTENSIONS = ["mp4", "vtt", "jpg"] as const

const MIN_TOKEN_LENGTH = 8
const MAX_SLUG_LENGTH = 64
const SLUG_PATTERN = /^(?:[a-z0-9]+-)*[a-z0-9]+$/
const FILE_PATTERN = /^intro-(?:[a-z0-9]+-)*[a-z0-9]+$/

// Slugs that appear in the revision plan or obvious examples. Never publish them.
const FORBIDDEN_SLUGS = new Set(["fde-k7q29x", "aiops-m3t8wd"])
const FORBIDDEN_WORDS = ["example", "sample", "placeholder", "test", "demo"]

function lastToken(value: string): string {
  const parts = value.split("-")
  return parts[parts.length - 1] ?? ""
}

// Check token shape only. This cannot prove randomness: generate tokens with
// a cryptographic generator as described in the publishing guide.
function isRandomToken(token: string): boolean {
  return token.length >= MIN_TOKEN_LENGTH && /[0-9]/.test(token)
}

/** Returns a list of problems; an empty list means the entry is well formed. */
export function validateIntroVideo(intro: IntroVideo): string[] {
  const problems: string[] = []
  const { slug, file, role, expiresAt } = intro

  if (slug.length > MAX_SLUG_LENGTH || !SLUG_PATTERN.test(slug)) {
    problems.push(`slug "${slug}" must be lowercase letters, digits and single hyphens`)
  } else if (!isRandomToken(lastToken(slug))) {
    problems.push(`slug "${slug}" must end in a random token of at least ${MIN_TOKEN_LENGTH} characters including a digit`)
  }
  if (FORBIDDEN_SLUGS.has(slug) || FORBIDDEN_WORDS.some((word) => slug.includes(word))) {
    problems.push(`slug "${slug}" is an example or guessable slug`)
  }

  if (!FILE_PATTERN.test(file)) {
    problems.push(`file "${file}" must start with "intro-" and use lowercase letters, digits and hyphens`)
  } else if (!isRandomToken(lastToken(file))) {
    problems.push(`file "${file}" must end in a random token of at least ${MIN_TOKEN_LENGTH} characters including a digit`)
  }
  if (FORBIDDEN_WORDS.some((word) => file.includes(word))) {
    problems.push(`file "${file}" looks like an example asset`)
  }

  if (role.trim().length === 0) {
    problems.push(`slug "${slug}" has no role`)
  }

  if (expiresAt !== undefined && Number.isNaN(Date.parse(expiresAt))) {
    problems.push(`slug "${slug}" has an unparseable expiresAt "${expiresAt}"`)
  }

  return problems
}

/** Fails closed: an unparseable date counts as expired. */
export function isExpired(intro: IntroVideo, now: Date = new Date()): boolean {
  if (intro.expiresAt === undefined) return false
  const expires = Date.parse(intro.expiresAt)
  return Number.isNaN(expires) || now.getTime() >= expires
}

/** Valid, marked ready, and not expired. Does not touch the filesystem. */
export function isPublishable(intro: IntroVideo, now: Date = new Date()): boolean {
  return intro.ready && validateIntroVideo(intro).length === 0 && !isExpired(intro, now)
}

/**
 * Looks up a publishable intro by slug. Returns undefined for unknown, invalid,
 * unready or expired slugs, and for slugs that appear more than once.
 */
export function findIntroVideo(
  slug: string,
  now: Date = new Date(),
  intros: readonly IntroVideo[] = INTRO_VIDEOS,
): IntroVideo | undefined {
  const matches = intros.filter((intro) => intro.slug === slug)
  if (matches.length !== 1) return undefined
  const intro = matches[0]
  return isPublishable(intro, now) ? intro : undefined
}

export function introAssetPaths(intro: IntroVideo) {
  const base = `/video/${intro.file}`
  return { video: `${base}.mp4`, captions: `${base}.vtt`, poster: `${base}.jpg` }
}
