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

function GridDots({ width, height }: { width: number; height: number }) {
  const hLines = Array.from(
    { length: Math.ceil(height / 40) },
    (_, i) => (i + 1) * 40
  )
  const vLines = Array.from(
    { length: Math.ceil(width / 40) },
    (_, i) => (i + 1) * 40
  )

  return (
    <>
      {hLines.map((y, i) => {
        const isReverse = i % 2 === 1
        return (
          <div
            key={`h-${i}`}
            className={`absolute w-3 h-3 rounded-full opacity-0 ${isReverse ? "animate-dot-traverse-h-rev" : "animate-dot-traverse-h"}`}
            style={{
              top: `${y}px`,
              [isReverse ? "right" : "left"]: 0,
              marginTop: "-6px",
              backgroundColor: pick(colors, i),
              "--traverse-x": isReverse ? `-${width}px` : `${width}px`,
              "--dot-duration": pick(durations, i + 3),
              animationDelay: delay(i),
            } as React.CSSProperties}
          />
        )
      })}

      {vLines.map((x, i) => {
        const isReverse = i % 2 === 1
        return (
          <div
            key={`v-${i}`}
            className={`absolute w-3 h-3 rounded-full opacity-0 ${isReverse ? "animate-dot-traverse-v-rev" : "animate-dot-traverse-v"}`}
            style={{
              left: `${x}px`,
              [isReverse ? "bottom" : "top"]: 0,
              marginLeft: "-6px",
              backgroundColor: pick(colors, i + 2),
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

export function AnimatedBackground() {
  const [dims, setDims] = useState<{ w: number; h: number } | null>(null)

  useEffect(() => {
    setDims({ w: window.innerWidth, h: window.innerHeight })
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-70 dark:opacity-40">
      <div className="absolute inset-0 neo-grid-bg" />
      {dims && <GridDots width={dims.w} height={dims.h} />}
    </div>
  )
}
