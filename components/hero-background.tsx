"use client"

const colors = ["#3b82f6", "#ec4899", "#10b981", "#8b5cf6"]
const durations = ["9s", "10s", "11s", "12s", "13s", "14s", "15s"]

// Deterministic pseudo-random from index for consistent renders
function pick<T>(arr: T[], i: number): T {
  return arr[i % arr.length]
}
function delay(i: number): string {
  return `${(i * 1.7) % 8}s`
}

// Generate dots on every gridline (every 40px), alternating direction
function GridDots() {
  // Horizontal dots: every 40px from 40 to 960, alternating LR/RL
  const hLines = Array.from({ length: 24 }, (_, i) => (i + 1) * 40)
  // Vertical dots: every 40px from 40 to 2000, alternating TB/BT
  const vLines = Array.from({ length: 50 }, (_, i) => (i + 1) * 40)

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
              "--traverse-x": isReverse ? "-100vw" : "100vw",
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
              "--traverse-y": isReverse ? "-100vh" : "100vh",
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
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-70 dark:opacity-40">
      <div className="absolute inset-0 neo-grid-bg" />
      <GridDots />
    </div>
  )
}
