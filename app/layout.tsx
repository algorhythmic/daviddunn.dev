import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'David Dunn | AI Engineer',
  description: 'Portfolio of David Dunn — AI developer building real-time data systems, LLM-powered applications, and MCP servers. Based in Santa Clara, CA.',
  generator: 'Next.js',
  icons: {
    icon: '/rocket_launch.svg',
  },
  openGraph: {
    title: 'David Dunn | AI Engineer',
    description: 'AI developer building real-time data systems, LLM-powered applications, and MCP servers.',
    url: 'https://daviddunn.dev',
    siteName: 'David Dunn',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'David Dunn | AI Engineer',
    description: 'AI developer building real-time data systems, LLM-powered applications, and MCP servers.',
    creator: '@MrDavidDunn',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
