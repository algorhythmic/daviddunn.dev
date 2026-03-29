"use client"

function GridDots() {
  const hDots = [
    { y: 40, dur: "12s", delay: "0s", color: "#3b82f6" },
    { y: 120, dur: "9s", delay: "2s", color: "#ec4899" },
    { y: 200, dur: "14s", delay: "5s", color: "#10b981" },
    { y: 280, dur: "10s", delay: "1s", color: "#3b82f6" },
    { y: 360, dur: "11s", delay: "7s", color: "#8b5cf6" },
    { y: 440, dur: "13s", delay: "3s", color: "#ec4899" },
    { y: 520, dur: "12s", delay: "4s", color: "#10b981" },
    { y: 600, dur: "10s", delay: "6s", color: "#3b82f6" },
    { y: 680, dur: "14s", delay: "0.5s", color: "#8b5cf6" },
    { y: 760, dur: "11s", delay: "8s", color: "#ec4899" },
  ]

  const vDots = [
    { x: 80, dur: "15s", delay: "0s", color: "#10b981" },
    { x: 200, dur: "11s", delay: "4s", color: "#3b82f6" },
    { x: 360, dur: "13s", delay: "2s", color: "#ec4899" },
    { x: 520, dur: "10s", delay: "6s", color: "#8b5cf6" },
    { x: 680, dur: "14s", delay: "1s", color: "#10b981" },
    { x: 840, dur: "12s", delay: "5s", color: "#3b82f6" },
    { x: 1000, dur: "11s", delay: "3s", color: "#ec4899" },
    { x: 1160, dur: "13s", delay: "7s", color: "#8b5cf6" },
    { x: 1320, dur: "12s", delay: "2.5s", color: "#10b981" },
  ]

  return (
    <>
      {hDots.map((dot, i) => (
        <div
          key={`h-${i}`}
          className="absolute w-3 h-3 rounded-full opacity-0 animate-dot-traverse-h"
          style={{
            top: `${dot.y}px`,
            left: 0,
            marginTop: "-6px",
            backgroundColor: dot.color,
            "--traverse-x": "100vw",
            "--dot-duration": dot.dur,
            animationDelay: dot.delay,
          } as React.CSSProperties}
        />
      ))}
      {vDots.map((dot, i) => (
        <div
          key={`v-${i}`}
          className="absolute w-3 h-3 rounded-full opacity-0 animate-dot-traverse-v"
          style={{
            left: `${dot.x}px`,
            top: 0,
            marginLeft: "-6px",
            backgroundColor: dot.color,
            "--traverse-y": "100vh",
            "--dot-duration": dot.dur,
            animationDelay: dot.delay,
          } as React.CSSProperties}
        />
      ))}
    </>
  )
}

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50 dark:opacity-25">
      <div className="absolute inset-0 neo-grid-bg" />
      <GridDots />
    </div>
  )
}
