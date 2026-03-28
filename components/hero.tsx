"use client"

import { useEffect, useState, useCallback } from "react"
import { ChevronDown, Cpu, Code, Plug } from "lucide-react"
import { AnimatedBackground } from "@/components/hero-background"

const roles = ["AI Engineer", "LLM Application Engineer", "Full-Stack Developer"]
const TYPE_SPEED = 80
const DELETE_SPEED = 50
const PAUSE_AFTER_TYPE = 2000
const PAUSE_AFTER_DELETE = 400

function useTypewriter(words: string[]) {
  const [text, setText] = useState("")
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const tick = useCallback(() => {
    const currentWord = words[wordIndex]

    if (!isDeleting) {
      // Typing forward
      const next = currentWord.slice(0, text.length + 1)
      setText(next)

      if (next === currentWord) {
        // Finished typing — pause then start deleting
        return PAUSE_AFTER_TYPE
      }
      return TYPE_SPEED + Math.random() * 40
    } else {
      // Deleting backward
      const next = currentWord.slice(0, text.length - 1)
      setText(next)

      if (next === "") {
        // Finished deleting — move to next word
        setIsDeleting(false)
        setWordIndex((prev) => (prev + 1) % words.length)
        return PAUSE_AFTER_DELETE
      }
      return DELETE_SPEED
    }
  }, [text, wordIndex, isDeleting, words])

  useEffect(() => {
    const delay = tick()

    // After typing a full word and pausing, switch to deleting
    if (!isDeleting && text === words[wordIndex]) {
      const timeout = setTimeout(() => setIsDeleting(true), PAUSE_AFTER_TYPE)
      return () => clearTimeout(timeout)
    }

    const timeout = setTimeout(() => {
      tick()
    }, delay)

    return () => clearTimeout(timeout)
  }, [text, isDeleting, wordIndex, tick, words])

  return text
}

export function Hero() {
  const typedRole = useTypewriter(roles)

  return (
    <section
      id="hero"
      className="min-h-screen bg-neo-yellow-light dark:bg-slate-900 flex items-center justify-center pt-16 relative overflow-hidden"
    >
      <AnimatedBackground showPipeline />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white dark:bg-slate-800 border-4 md:border-6 border-black dark:border-neo-blue-500 px-5 py-6 md:px-10 md:py-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:dark:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transform -rotate-1 hover:rotate-0 transition-transform duration-300 w-full max-w-2xl md:max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-6xl font-black mb-3 md:mb-4 text-black dark:text-white dark:neo-text-glow">
            DAVID DUNN
          </h1>
          <div className="h-10 md:h-14 mb-4 md:mb-5 flex items-center justify-center">
            <h2 className="text-xl md:text-3xl font-bold text-neo-blue-500 dark:text-neo-blue-400 dark:neo-text-glow min-w-0 text-center font-mono">
              {typedRole}
              <span className="inline-block w-[3px] h-[1em] bg-neo-blue-500 dark:bg-neo-blue-400 ml-0.5 align-middle animate-cursor-blink" />
            </h2>
          </div>
          <p className="text-sm md:text-lg font-bold text-black dark:text-white mb-5 md:mb-6 max-w-2xl mx-auto">
            Building intelligent systems at the intersection of real-time data and large language models.
          </p>

          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-5 md:mb-6">
            <div className="flex items-center bg-neo-blue-500 dark:bg-neo-blue-600 border-2 md:border-4 border-black dark:border-neo-blue-400 px-3 py-1.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <Cpu className="mr-1.5 text-white" size={18} />
              <span className="font-bold text-white text-sm">AI / LLM</span>
            </div>
            <div className="flex items-center bg-neo-pink-light dark:bg-orange-500 border-2 md:border-4 border-black dark:border-neo-blue-400 px-3 py-1.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <Code className="mr-1.5 text-white" size={18} />
              <span className="font-bold text-white text-sm">Full-Stack</span>
            </div>
            <div className="flex items-center bg-neo-green-light dark:bg-emerald-500 border-2 md:border-4 border-black dark:border-neo-blue-400 px-3 py-1.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <Plug className="mr-1.5 text-white" size={18} />
              <span className="font-bold text-white text-sm">MCP Servers</span>
            </div>
          </div>

          <button
            onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-neo-red-light dark:bg-red-500 hover:bg-red-600 text-white font-black px-6 py-3 border-4 border-black dark:border-neo-blue-400 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-150 text-base hover:translate-x-[3px] hover:translate-y-[3px] active:translate-x-[5px] active:translate-y-[5px]"
          >
            EXPLORE MY WORK
          </button>
        </div>

        <button
          onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
          className="mt-8 animate-bounce cursor-pointer bg-transparent border-none"
          aria-label="Scroll to case studies"
        >
          <ChevronDown size={36} className="mx-auto text-black dark:text-neo-blue-400 dark:neo-text-glow" />
        </button>
      </div>
    </section>
  )
}
