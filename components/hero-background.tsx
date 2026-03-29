"use client"

function GridDots() {
  // Left→right dots on gridlines: y = 40, 120, 200, 280...
  const hDotsLR = [
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

  // Right→left dots on the interleaving gridlines: y = 80, 160, 240, 320...
  const hDotsRL = [
    { y: 80, dur: "11s", delay: "1s", color: "#10b981" },
    { y: 160, dur: "13s", delay: "4s", color: "#8b5cf6" },
    { y: 240, dur: "10s", delay: "6s", color: "#3b82f6" },
    { y: 320, dur: "14s", delay: "0s", color: "#ec4899" },
    { y: 400, dur: "12s", delay: "3s", color: "#10b981" },
    { y: 480, dur: "9s", delay: "5s", color: "#8b5cf6" },
    { y: 560, dur: "13s", delay: "2s", color: "#3b82f6" },
    { y: 640, dur: "11s", delay: "7s", color: "#ec4899" },
    { y: 720, dur: "10s", delay: "4.5s", color: "#10b981" },
  ]

  // Top→bottom dots on gridlines: x = 80, 200, 360, 520...
  const vDotsTB = [
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

  // Bottom→top dots on interleaving gridlines: x = 40, 160, 280, 440...
  const vDotsBT = [
    { x: 40, dur: "13s", delay: "3s", color: "#ec4899" },
    { x: 160, dur: "10s", delay: "5s", color: "#10b981" },
    { x: 280, dur: "14s", delay: "1s", color: "#3b82f6" },
    { x: 440, dur: "11s", delay: "7s", color: "#8b5cf6" },
    { x: 600, dur: "12s", delay: "0s", color: "#ec4899" },
    { x: 760, dur: "9s", delay: "4s", color: "#10b981" },
    { x: 920, dur: "13s", delay: "6s", color: "#3b82f6" },
    { x: 1080, dur: "11s", delay: "2s", color: "#8b5cf6" },
    { x: 1240, dur: "14s", delay: "5.5s", color: "#ec4899" },
  ]

  return (
    <>
      {/* Horizontal: left → right */}
      {hDotsLR.map((dot, i) => (
        <div
          key={`hlr-${i}`}
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

      {/* Horizontal: right → left */}
      {hDotsRL.map((dot, i) => (
        <div
          key={`hrl-${i}`}
          className="absolute w-3 h-3 rounded-full opacity-0 animate-dot-traverse-h-rev"
          style={{
            top: `${dot.y}px`,
            right: 0,
            marginTop: "-6px",
            backgroundColor: dot.color,
            "--traverse-x": "-100vw",
            "--dot-duration": dot.dur,
            animationDelay: dot.delay,
          } as React.CSSProperties}
        />
      ))}

      {/* Vertical: top → bottom */}
      {vDotsTB.map((dot, i) => (
        <div
          key={`vtb-${i}`}
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

      {/* Vertical: bottom → top */}
      {vDotsBT.map((dot, i) => (
        <div
          key={`vbt-${i}`}
          className="absolute w-3 h-3 rounded-full opacity-0 animate-dot-traverse-v-rev"
          style={{
            left: `${dot.x}px`,
            bottom: 0,
            marginLeft: "-6px",
            backgroundColor: dot.color,
            "--traverse-y": "-100vh",
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
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-70 dark:opacity-40">
      <div className="absolute inset-0 neo-grid-bg" />
      <GridDots />
    </div>
  )
}
