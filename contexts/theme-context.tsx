"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark"

type ThemeContextType = {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// Read the theme already applied by the pre-hydration script in app/layout.tsx.
// On the server we default to "light" — the script will fix up the DOM before paint
// on the client, and our state lazy-init matches that DOM on first client render.
function readInitialTheme(): Theme {
  if (typeof document === "undefined") return "light"
  return document.documentElement.classList.contains("dark") ? "dark" : "light"
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(readInitialTheme)

  // Keep the DOM class in sync with state. Note: we do NOT persist here — writing
  // to localStorage on mount would lock in a preference the user never chose, so the
  // site would stop following the OS setting after the first visit.
  useEffect(() => {
    const root = document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(theme)
  }, [theme])

  // With no explicit preference saved, follow the OS light/dark setting live.
  useEffect(() => {
    if (typeof window === "undefined") return
    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const onChange = () => {
      if (!localStorage.getItem("theme")) {
        setTheme(mq.matches ? "dark" : "light")
      }
    }
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  const toggleTheme = () => {
    // Only an explicit toggle persists a preference.
    setTheme((prevTheme) => {
      const next = prevTheme === "light" ? "dark" : "light"
      try {
        localStorage.setItem("theme", next)
      } catch {
        /* ignore */
      }
      return next
    })
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
