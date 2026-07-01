"use client"

import { Sun, Moon } from "lucide-react"
import { useEffect, useState } from "react"
import { useTheme } from "@/contexts/theme-context"

export function MinimalThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const iconClass = "w-5 h-5"

  if (!mounted) {
    return (
      <button
        className="p-2 rounded-full text-foreground/70"
        aria-label="Theme toggle"
      >
        <Sun className={iconClass} />
      </button>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      className="p-2 rounded-full text-foreground/70 hover:text-foreground hover:bg-foreground/5 transition-colors"
    >
      {theme === "dark" ? <Moon className={iconClass} /> : <Sun className={iconClass} />}
    </button>
  )
}
