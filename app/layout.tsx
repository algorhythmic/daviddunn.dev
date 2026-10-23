import type { Metadata } from 'next'
import { ThemeProvider } from '@/contexts/theme-context'
import { SITE_DESCRIPTION, SITE_TITLE } from '@/lib/site-copy'
import './globals.css'

const themeInitScript = `(function(){try{var s=localStorage.getItem('theme');var d=s?s==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;var c=document.documentElement.classList;c.remove('light','dark');c.add(d?'dark':'light');}catch(e){}})();`

export const metadata: Metadata = {
  metadataBase: new URL('https://daviddunn.dev'),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  generator: 'Next.js',
  icons: {
    icon: '/rocket_launch.svg',
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: 'https://daviddunn.dev',
    siteName: 'David Dunn',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
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
