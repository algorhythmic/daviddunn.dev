"use client"

import { Sun, Moon } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent rendering until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <button
        className="relative px-2 py-1 md:px-4 md:py-2 font-black border-2 border-black dark:border-neo-blue-500 bg-white dark:bg-slate-800 text-black dark:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
        aria-label="Theme toggle"
      >
        <div className="relative w-4 h-4 md:w-5 md:h-5">
          <Sun size={16} className="md:hidden" />
          <Sun size={20} className="hidden md:block" />
        </div>
      </button>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative px-2 py-1 md:px-4 md:py-2 font-black border-2 border-black dark:border-neo-blue-500 bg-white dark:bg-slate-800 text-black dark:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all duration-150 hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px]"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <div className="relative w-4 h-4 md:w-5 md:h-5">
        <Sun
          className={`absolute inset-0 transition-all duration-300 ${
            theme === "light" ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0"
          }`}
          size={16}
        />
        <Moon
          className={`absolute inset-0 transition-all duration-300 text-neo-blue-500 ${
            theme === "dark" ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
          }`}
          size={16}
        />
      </div>
    </button>
  )
}
