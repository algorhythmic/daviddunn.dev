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
        className="flex items-center justify-center -mt-[1px] dark:-mt-[2px] md:mt-0 dark:md:mt-0 p-1.5 md:px-2 md:py-1.5 font-black border-2 border-black dark:border-neo-blue-500 bg-white dark:bg-slate-800 text-black dark:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:md:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
        aria-label="Theme toggle"
      >
        <div className="relative w-[18px] h-[18px] md:w-7 md:h-7">
          <Sun className="absolute inset-0 w-full h-full" />
        </div>
      </button>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center -mt-[1px] dark:-mt-[2px] md:mt-0 dark:md:mt-0 p-1.5 md:px-2 md:py-1.5 font-black border-2 border-black dark:border-neo-blue-500 bg-white dark:bg-slate-800 text-black dark:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:md:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-[box-shadow,transform] duration-150 hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px]"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <div className="relative w-[18px] h-[18px] md:w-7 md:h-7">
        <Sun
          className={`absolute inset-0 w-full h-full transition-all duration-300 ${
            theme === "light" ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0"
          }`}
        />
        <Moon
          className={`absolute inset-0 w-full h-full transition-all duration-300 text-neo-blue-500 ${
            theme === "dark" ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
          }`}
        />
      </div>
    </button>
  )
}
