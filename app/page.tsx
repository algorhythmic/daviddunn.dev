import type { Metadata } from "next"
import { Workbench } from "@/components/workbench"
import { SITE_DESCRIPTION, SITE_TITLE } from "@/lib/site-copy"

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "https://daviddunn.dev",
    siteName: "David Dunn",
    type: "website",
  },
}


export default function Home() {
  return <Workbench />
}
