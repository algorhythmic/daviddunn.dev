import type { MetadataRoute } from "next"

const SITE_URL = "https://daviddunn.dev"

// Public pages only. Unlisted intro pages (/v/...) are deliberately excluded;
// see docs/VIDEO-PUBLISHING.md.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/projects`, changeFrequency: "monthly", priority: 0.8 },
  ]
}
