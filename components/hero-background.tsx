"use client"

import { useState, useEffect } from "react"

const colors = ["#3b82f6", "#ec4899", "#10b981", "#8b5cf6"]
const durations = ["9s", "10s", "11s", "12s", "13s", "14s", "15s"]

function pick<T>(arr: T[], i: number): T {
  return arr[i % arr.length]
}
function delay(i: number): string {
  return `${(i * 1.7) % 8}s`
}

function GridDots({ width, height, boost = false }: { width: number; height: number; boost?: boolean }) {
  const hLines = Array.from(
    { length: Math.ceil(height / 40) },
    (_, i) => (i + 1) * 40
  )
  const vLines = Array.from(
    { length: Math.ceil(width / 40) },
    (_, i) => (i + 1) * 40
  )

  const ballGlow = (color: string) =>
    boost
      ? `0 0 8px ${color}, 0 0 16px ${color}, 0 0 26px ${color}aa`
      : `0 0 6px ${color}, 0 0 12px ${color}cc`

  return (
    <>
      {hLines.map((y, i) => {
        const isReverse = i % 2 === 1
        const color = pick(colors, i)
        return (
          <div
            key={`h-${i}`}
            className={`absolute w-3 h-3 rounded-full opacity-0 ${isReverse ? "animate-dot-traverse-h-rev" : "animate-dot-traverse-h"}`}
            style={{
              top: `${y}px`,
              [isReverse ? "right" : "left"]: 0,
              marginTop: "-5.25px",
              backgroundColor: color,
              boxShadow: ballGlow(color),
              "--traverse-x": isReverse ? `-${width}px` : `${width}px`,
              "--dot-duration": pick(durations, i + 3),
              animationDelay: delay(i),
            } as React.CSSProperties}
          />
        )
      })}

      {vLines.map((x, i) => {
        const isReverse = i % 2 === 1
        const color = pick(colors, i + 2)
        return (
          <div
            key={`v-${i}`}
            className={`absolute w-3 h-3 rounded-full opacity-0 ${isReverse ? "animate-dot-traverse-v-rev" : "animate-dot-traverse-v"}`}
            style={{
              left: `${x}px`,
              [isReverse ? "bottom" : "top"]: 0,
              marginLeft: "-5.25px",
              backgroundColor: color,
              boxShadow: ballGlow(color),
              "--traverse-y": isReverse ? `-${height}px` : `${height}px`,
              "--dot-duration": pick(durations, i),
              animationDelay: delay(i + 5),
            } as React.CSSProperties}
          />
        )
      })}
    </>
  )
}

export function AnimatedBackground({
  boost = false,
  dimGlow = false,
}: {
  boost?: boolean
  dimGlow?: boolean
}) {
  const [dims, setDims] = useState<{ w: number; h: number } | null>(null)

  useEffect(() => {
    setDims({ w: window.innerWidth, h: window.innerHeight })
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className={`absolute inset-0 neo-grid-bg ${
          boost ? "opacity-90 dark:opacity-50 boost" : "opacity-70 dark:opacity-40"
        } ${dimGlow ? "dim-glow" : ""}`}
      />
      {dims && <GridDots width={dims.w} height={dims.h} boost={boost} />}
    </div>
  )
}
