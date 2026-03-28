"use client"

// Layer 1: Traversing dots aligned to the 40px CSS grid
function GridDots() {
  // Horizontal dots — y positions are multiples of 40px to align with CSS grid
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

  // Vertical dots — x positions are multiples of 40px
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
      {/* Horizontal traversing dots — positioned in px to match CSS grid */}
      {hDots.map((dot, i) => (
        <div
          key={`h-${i}`}
          className="absolute left-0 w-3 h-3 rounded-full animate-dot-traverse-h"
          style={{
            top: `${dot.y}px`,
            backgroundColor: dot.color,
            "--traverse-x": "100vw",
            "--dot-duration": dot.dur,
            animationDelay: dot.delay,
          } as React.CSSProperties}
        />
      ))}

      {/* Vertical traversing dots — positioned in px to match CSS grid */}
      {vDots.map((dot, i) => (
        <div
          key={`v-${i}`}
          className="absolute top-0 w-3 h-3 rounded-full animate-dot-traverse-v"
          style={{
            left: `${dot.x}px`,
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

// Layer 2: Floating chart-like curves
function ChartLines() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="none"
      viewBox="0 0 1200 800"
    >
      <path
        d="M0 200 C150 160, 300 240, 450 180 S750 220, 900 170 S1050 210, 1200 190"
        fill="none"
        className="stroke-black/20 dark:stroke-neo-blue-400/25 animate-chart-drift-1"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M0 420 C100 350, 250 480, 400 380 S600 460, 750 370 S950 440, 1200 400"
        fill="none"
        className="stroke-neo-pink-light/20 dark:stroke-neo-pink-dark/20 animate-chart-drift-2"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M0 600 C200 570, 350 630, 500 580 S700 620, 850 575 S1000 610, 1200 590"
        fill="none"
        className="stroke-neo-green-light/20 dark:stroke-neo-green-dark/20 animate-chart-drift-3"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}

// Layer 3: Pipeline flow — uses percentage-based viewBox for full coverage
function PipelineFlow() {
  // Coordinates in a 100x100 viewBox (percentages of the section)
  const stages = [
    { label: "STREAM", x: 1, y: 3, fill: "#06b6d4" },
    { label: "INGEST", x: 15, y: 18, fill: "#3b82f6" },
    { label: "DETECT", x: 2, y: 55, fill: "#ec4899" },
    { label: "ANALYZE", x: 78, y: 5, fill: "#10b981" },
    { label: "SCORE", x: 85, y: 38, fill: "#8b5cf6" },
    { label: "EXECUTE", x: 75, y: 72, fill: "#ef4444" },
  ]

  // Node dimensions in viewBox units
  const nw = 10 // node width
  const nh = 4.5 // node height

  const edges = [
    // Left cluster: STREAM → INGEST
    `M${1 + nw} ${3 + nh / 2} C${8 + nw} ${3 + nh / 2}, ${15} ${18 + nh / 2}, ${15} ${18 + nh / 2}`,
    // INGEST → DETECT
    `M${15 + nw / 2} ${18 + nh} C${15 + nw / 2} ${36}, ${2 + nw / 2} ${40}, ${2 + nw / 2} ${55}`,
    // Right cluster: ANALYZE → SCORE
    `M${78 + nw} ${5 + nh / 2} C${85 + nw} ${5 + nh / 2}, ${85 + nw / 2} ${25}, ${85 + nw / 2} ${38}`,
    // SCORE → EXECUTE
    `M${85 + nw / 2} ${38 + nh} C${85 + nw / 2} ${55}, ${75 + nw / 2} ${60}, ${75 + nw / 2} ${72}`,
    // Cross: DETECT → ANALYZE
    `M${2 + nw} ${55 + nh / 2} C${35} ${55 + nh / 2}, ${55} ${5 + nh / 2}, ${78} ${5 + nh / 2}`,
  ]

  return (
    <svg
      className="absolute inset-0 w-full h-full hidden md:block"
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
    >
      {edges.map((d, i) => (
        <g key={`edge-${i}`}>
          <path
            d={d}
            fill="none"
            className="stroke-black/15 dark:stroke-neo-blue-500/20"
            strokeWidth="0.3"
          />
          <path
            d={d}
            fill="none"
            className="stroke-black/30 dark:stroke-neo-blue-400/40 animate-dash-flow"
            strokeWidth="0.3"
            strokeDasharray="1.5 1"
          />
          <circle r="0.5" className="fill-neo-blue-500 dark:fill-neo-blue-400">
            <animateMotion
              dur={`${3.5 + i * 0.8}s`}
              repeatCount="indefinite"
              path={d}
            />
          </circle>
        </g>
      ))}

      {stages.map((stage, i) => (
        <g
          key={stage.label}
          className="animate-node-pulse"
          style={{ animationDelay: `${i * 0.7}s`, transformOrigin: `${stage.x + nw / 2}% ${stage.y + nh / 2}%` }}
        >
          <rect
            x={stage.x}
            y={stage.y}
            width={nw}
            height={nh}
            rx="0.5"
            fill={stage.fill}
            className="stroke-black dark:stroke-neo-blue-400"
            strokeWidth="0.4"
          />
          <text
            x={stage.x + nw / 2}
            y={stage.y + nh * 0.65}
            textAnchor="middle"
            className="fill-white"
            style={{ fontFamily: "Inter, system-ui, sans-serif", fontWeight: 900, fontSize: "2px" }}
          >
            {stage.label}
          </text>
        </g>
      ))}
    </svg>
  )
}

export function AnimatedBackground({
  showPipeline = false,
}: {
  showPipeline?: boolean
}) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50 dark:opacity-25">
      {/* CSS grid via neo-grid-bg class — fixed attachment for cross-section continuity */}
      <div className="absolute inset-0 neo-grid-bg" />
      <GridDots />
      <ChartLines />
      {showPipeline && <PipelineFlow />}
    </div>
  )
}
