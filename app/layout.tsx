import type { Metadata } from 'next'
import { ThemeProvider } from '@/contexts/theme-context'
import './globals.css'

const themeInitScript = `(function(){try{var s=localStorage.getItem('theme');var d=s?s==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;var c=document.documentElement.classList;c.remove('light','dark');c.add(d?'dark':'light');}catch(e){}})();`

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
