"use client"

import { useEffect, useState, useRef } from "react"
import { ChevronDown, Cpu, Code, Plug } from "lucide-react"
import { AnimatedBackground } from "@/components/hero-background"

const roles = ["AI Engineer", "LLM Application Engineer", "Full-Stack Developer"]
const TYPE_SPEED = 80
const DELETE_SPEED = 50
const PAUSE_AFTER_TYPE = 2000
const PAUSE_AFTER_DELETE = 400

function useTypewriter(words: string[]) {
  const [display, setDisplay] = useState("")
  const [wordIndex, setWordIndex] = useState(0)
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting" | "waiting">("typing")
  const randRef = useRef(0)

  useEffect(() => {
    const word = words[wordIndex]
    let timeout: ReturnType<typeof setTimeout>

    switch (phase) {
      case "typing":
        if (display.length < word.length) {
          randRef.current = Math.random() * 40
          timeout = setTimeout(() => {
            setDisplay(word.slice(0, display.length + 1))
          }, TYPE_SPEED + randRef.current)
        } else {
          setPhase("pausing")
        }
        break
      case "pausing":
        timeout = setTimeout(() => setPhase("deleting"), PAUSE_AFTER_TYPE)
        break
      case "deleting":
        if (display.length > 0) {
          timeout = setTimeout(() => {
            setDisplay(display.slice(0, -1))
          }, DELETE_SPEED)
        } else {
          setPhase("waiting")
        }
        break
      case "waiting":
        timeout = setTimeout(() => {
          setWordIndex((prev) => (prev + 1) % words.length)
          setPhase("typing")
        }, PAUSE_AFTER_DELETE)
        break
    }

    return () => clearTimeout(timeout)
  }, [display, phase, wordIndex, words])

  return display
}

export function Hero() {
  const typedRole = useTypewriter(roles)
  const [heroHeight, setHeroHeight] = useState<number | null>(null)

  // Capture viewport height once on mount — immune to address bar changes
  useEffect(() => {
    setHeroHeight(window.innerHeight)
  }, [])

  return (
    <section
      id="hero"
      className="bg-neo-yellow-light dark:bg-slate-900 flex items-center justify-center pt-10 md:pt-16 relative overflow-hidden"
      style={{ height: heroHeight ? `${heroHeight}px` : "100svh" }}
    >
      <AnimatedBackground />
      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 text-center">
        <div className="bg-white dark:bg-slate-800 border-2 md:border-4 border-black dark:border-neo-blue-500 px-3 py-3 md:px-10 md:py-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:dark:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transform -rotate-1 hover:rotate-0 transition-transform duration-300 w-full max-w-[280px] sm:max-w-sm md:max-w-3xl mx-auto">
          <h1 className="text-xl md:text-6xl font-black mb-1 md:mb-4 text-black dark:text-white dark:neo-text-glow">
            DAVID DUNN
          </h1>
          <div className="h-6 md:h-14 mb-1.5 md:mb-5 flex items-center justify-center">
            <h2 className="text-sm md:text-3xl font-bold text-neo-blue-500 dark:text-neo-blue-400 dark:neo-text-glow min-w-0 text-center font-mono">
              {typedRole}
              <span className="inline-block w-[2px] md:w-[3px] h-[1em] bg-neo-blue-500 dark:bg-neo-blue-400 ml-0.5 align-middle animate-cursor-blink" />
            </h2>
          </div>
          <p className="text-[11px] md:text-lg font-bold text-black dark:text-white mb-2 md:mb-6 max-w-2xl mx-auto leading-relaxed">
            Building intelligent systems at the intersection of real-time data and large language models.
          </p>

          <div className="flex flex-wrap justify-center gap-1 md:gap-3 mb-2 md:mb-6">
            <div className="flex items-center bg-neo-blue-500 dark:bg-neo-blue-600 border md:border-4 border-black dark:border-neo-blue-400 px-1.5 py-0.5 md:px-3 md:py-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <Cpu className="mr-0.5 md:mr-1.5 text-white" size={12} />
              <span className="font-bold text-white text-[10px] md:text-sm">AI / LLM</span>
            </div>
            <div className="flex items-center bg-neo-pink-light dark:bg-orange-500 border md:border-4 border-black dark:border-neo-blue-400 px-1.5 py-0.5 md:px-3 md:py-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <Code className="mr-0.5 md:mr-1.5 text-white" size={12} />
              <span className="font-bold text-white text-[10px] md:text-sm">Full-Stack</span>
            </div>
            <div className="flex items-center bg-neo-green-light dark:bg-emerald-500 border md:border-4 border-black dark:border-neo-blue-400 px-1.5 py-0.5 md:px-3 md:py-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <Plug className="mr-0.5 md:mr-1.5 text-white" size={12} />
              <span className="font-bold text-white text-[10px] md:text-sm">MCP Servers</span>
            </div>
          </div>

          <button
            onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-neo-red-light dark:bg-red-500 hover:bg-red-600 text-white font-black px-4 py-1.5 md:px-6 md:py-3 border-2 md:border-4 border-black dark:border-neo-blue-400 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all duration-150 text-xs md:text-base hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[3px] active:translate-y-[3px]"
          >
            EXPLORE MY WORK
          </button>
        </div>

        <button
          onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
          className="mt-4 md:mt-8 animate-bounce cursor-pointer bg-transparent border-none"
          aria-label="Scroll to case studies"
        >
          <ChevronDown size={28} className="md:hidden mx-auto text-black dark:text-neo-blue-400 dark:neo-text-glow" />
          <ChevronDown size={36} className="hidden md:block mx-auto text-black dark:text-neo-blue-400 dark:neo-text-glow" />
        </button>
      </div>
    </section>
  )
}
