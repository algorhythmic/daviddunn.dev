"use client"

import { Github, Linkedin, Instagram, Mail } from "lucide-react"
import { AnimatedBackground } from "@/components/hero-background"

type Social = {
  icon: typeof Github
  href: string
  label: string
  bg: string
  text: string
}

const socials: Social[] = [
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/mrdaviddunn",
    label: "LinkedIn",
    bg: "bg-blue-500 hover:bg-blue-600",
    text: "text-white",
  },
  {
    icon: Github,
    href: "https://github.com/algorhythmic",
    label: "GitHub",
    bg: "bg-gray-800 hover:bg-gray-900",
    text: "text-white",
  },
  {
    icon: Instagram,
    href: "https://instagram.com/mrdaviddunn",
    label: "Instagram",
    bg: "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:from-pink-600 hover:via-red-600 hover:to-yellow-600",
    text: "text-white",
  },
  {
    icon: Mail,
    href: "mailto:davidalexanderdunn@gmail.com",
    label: "Email",
    bg: "bg-yellow-400 hover:bg-yellow-500",
    text: "text-black",
  },
]

export function Footer() {
  return (
    <footer className="relative bg-stone-50 dark:bg-zinc-950 border-t-[16px] border-black overflow-hidden -mt-2 md:-mt-3">
      <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_0%,transparent_75%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,transparent_75%)]">
        <AnimatedBackground />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 md:py-8 flex flex-col items-center text-center">
        {/* Terminal copyright */}
        <div className="bg-gray-900 dark:bg-black border-2 border-black dark:border-neo-blue-500 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] px-3 py-2 font-mono text-[11px] md:text-sm text-green-400 inline-flex items-center max-w-full overflow-x-auto whitespace-nowrap mb-4 md:mb-6">
          <span className="text-neo-blue-300">david@daviddunn.dev</span>
          <span className="text-gray-400">:</span>
          <span className="text-neo-pink-light">~</span>
          <span className="text-gray-400">$&nbsp;</span>
          <span>echo &quot;© 2026 David Dunn&quot;</span>
          <span className="ml-1 inline-block w-2 h-3.5 md:h-4 bg-green-400 animate-pulse" />
        </div>

        {/* Socials */}
        <div className="flex flex-wrap justify-center gap-2 mb-4 md:mb-6">
          {socials.map(({ icon: Icon, href, label, bg, text }) => {
            const isMail = href.startsWith("mailto:")
            return (
              <a
                key={label}
                href={href}
                target={isMail ? undefined : "_blank"}
                rel={isMail ? undefined : "noopener noreferrer"}
                className={`${bg} ${text} font-bold flex items-center gap-1.5 px-2.5 py-1.5 md:px-3 md:py-1.5 border-2 border-black dark:border-neo-blue-500 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all duration-150 hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] text-xs md:text-sm`}
              >
                <Icon size={14} />
                {label}
              </a>
            )
          })}
        </div>

        {/* Build credit */}
        <p className="text-[11px] md:text-sm font-bold text-foreground dark:text-gray-300">
          Built with Next.js, Tailwind, and a suspicious amount of Claude Code.
        </p>
      </div>
    </footer>
  )
}
