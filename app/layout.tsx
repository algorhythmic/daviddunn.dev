import type { Metadata } from 'next'
import { ThemeProvider } from '@/contexts/theme-context'
import './globals.css'

const themeInitScript = `(function(){try{var s=localStorage.getItem('theme');var d=s?s==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;var c=document.documentElement.classList;c.remove('light','dark');c.add(d?'dark':'light');}catch(e){}})();`

export const metadata: Metadata = {
  metadataBase: new URL('https://daviddunn.dev'),
  title: 'David Dunn | Applied AI & Integration Engineer',
  description: 'David Dunn — Applied AI & Integration Engineer in Santa Clara, CA, with 7+ years across data engineering, BI, and LLM-powered systems. Building agent tooling, multi-agent orchestration, voice-first AI, real-time data platforms, and MCP servers.',
  generator: 'Next.js',
  icons: {
    icon: '/rocket_launch.svg',
  },
  openGraph: {
    title: 'David Dunn | Applied AI & Integration Engineer',
    description: 'I build AI systems that plan, execute, review, and fix their own work, with a person approving what actually ships.',
    url: 'https://daviddunn.dev',
    siteName: 'David Dunn',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'David Dunn | Applied AI & Integration Engineer',
    description: 'I build AI systems that plan, execute, review, and fix their own work, with a person approving what actually ships.',
    creator: '@MrDavidDunn',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="darkreader-lock" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
