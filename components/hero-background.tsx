"use client"

// Layer 1: Grid with traversing dots
function GridLayer() {
  // Dots that traverse grid lines at various positions and speeds
  const hDots = [
    { x: 0, y: 80, dur: "12s", delay: "0s", color: "neo-blue" },
    { x: 0, y: 240, dur: "9s", delay: "2s", color: "neo-pink" },
    { x: 0, y: 400, dur: "14s", delay: "5s", color: "neo-green" },
    { x: 0, y: 560, dur: "10s", delay: "1s", color: "neo-blue" },
    { x: 0, y: 160, dur: "11s", delay: "7s", color: "neo-purple" },
    { x: 0, y: 640, dur: "13s", delay: "3s", color: "neo-pink" },
  ]

  const vDots = [
    { x: 160, y: 0, dur: "15s", delay: "0s", color: "neo-green" },
    { x: 400, y: 0, dur: "11s", delay: "4s", color: "neo-blue" },
    { x: 720, y: 0, dur: "13s", delay: "2s", color: "neo-pink" },
    { x: 960, y: 0, dur: "10s", delay: "6s", color: "neo-purple" },
    { x: 560, y: 0, dur: "14s", delay: "1s", color: "neo-green" },
  ]

  const dotColors: Record<string, { light: string; dark: string }> = {
    "neo-blue": { light: "#3b82f6", dark: "#60a5fa" },
    "neo-pink": { light: "#ec4899", dark: "#f472b6" },
    "neo-green": { light: "#10b981", dark: "#34d399" },
    "neo-purple": { light: "#8b5cf6", dark: "#a78bfa" },
  }

  return (
    <svg
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1200 800"
    >
      {/* Grid lines */}
      <defs>
        <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
          <path
            d="M 80 0 L 0 0 0 80"
            fill="none"
            className="stroke-black/[0.08] dark:stroke-neo-blue-500/[0.15]"
            strokeWidth="2"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />

      {/* Horizontal traversing dots */}
      {hDots.map((dot, i) => (
        <circle
          key={`h-${i}`}
          cx={dot.x}
          cy={dot.y}
          r="5"
          className="animate-dot-traverse-h"
          style={{
            "--traverse-x": "1200px",
            "--dot-duration": dot.dur,
            animationDelay: dot.delay,
          } as React.CSSProperties}
        >
          <set attributeName="fill" to={dotColors[dot.color].light} />
        </circle>
      ))}

      {/* Vertical traversing dots */}
      {vDots.map((dot, i) => (
        <circle
          key={`v-${i}`}
          cx={dot.x}
          cy={dot.y}
          r="5"
          className="animate-dot-traverse-v"
          style={{
            "--traverse-y": "800px",
            "--dot-duration": dot.dur,
            animationDelay: dot.delay,
          } as React.CSSProperties}
        >
          <set attributeName="fill" to={dotColors[dot.color].light} />
        </circle>
      ))}
    </svg>
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
      {/* Chart line 1 — gentle wave, upper region */}
      <path
        d="M0 200 C150 160, 300 240, 450 180 S750 220, 900 170 S1050 210, 1200 190"
        fill="none"
        className="stroke-neo-blue-500/30 dark:stroke-neo-blue-400/25 animate-chart-drift-1"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Chart line 2 — steeper peaks, mid region */}
      <path
        d="M0 420 C100 350, 250 480, 400 380 S600 460, 750 370 S950 440, 1200 400"
        fill="none"
        className="stroke-neo-pink-light/25 dark:stroke-neo-pink-dark/20 animate-chart-drift-2"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Chart line 3 — shallow drift, lower region */}
      <path
        d="M0 600 C200 570, 350 630, 500 580 S700 620, 850 575 S1000 610, 1200 590"
        fill="none"
        className="stroke-neo-green-light/25 dark:stroke-neo-green-dark/20 animate-chart-drift-3"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}

// Layer 3: Pipeline flow nodes and edges (desktop only)
function PipelineFlow() {
  const stages = [
    { label: "INGEST", x: 60, y: 100, fill: "#3b82f6", darkFill: "#2563eb" },
    { label: "DETECT", x: 340, y: 200, fill: "#ec4899", darkFill: "#f97316" },
    { label: "ANALYZE", x: 700, y: 560, fill: "#10b981", darkFill: "#059669" },
    { label: "EXECUTE", x: 1000, y: 660, fill: "#8b5cf6", darkFill: "#7c3aed" },
  ]

  // Edge paths between nodes (connecting center-right of one to center-left of next)
  const edges = [
    "M180 120 C260 120, 260 220, 340 220",
    "M460 220 C560 220, 560 580, 700 580",
    "M820 580 C900 580, 900 680, 1000 680",
  ]

  return (
    <svg
      className="absolute inset-0 w-full h-full hidden md:block"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1200 800"
    >
      {/* Dashed edges with flowing animation */}
      {edges.map((d, i) => (
        <g key={`edge-${i}`}>
          {/* Static edge background */}
          <path
            d={d}
            fill="none"
            className="stroke-black/10 dark:stroke-neo-blue-500/20"
            strokeWidth="3"
          />
          {/* Animated flowing dashes */}
          <path
            d={d}
            fill="none"
            className="stroke-black/20 dark:stroke-neo-blue-400/40 animate-dash-flow"
            strokeWidth="3"
            strokeDasharray="12 8"
          />
          {/* Data packet traveling along the edge */}
          <circle r="4" className="fill-neo-blue-500 dark:fill-neo-blue-400">
            <animateMotion
              dur={`${4 + i}s`}
              repeatCount="indefinite"
              path={d}
            />
          </circle>
        </g>
      ))}

      {/* Pipeline stage nodes */}
      {stages.map((stage, i) => (
        <g
          key={stage.label}
          className="animate-node-pulse"
          style={{ animationDelay: `${i * 1}s`, transformOrigin: `${stage.x + 60}px ${stage.y + 20}px` }}
        >
          {/* Node rectangle */}
          <rect
            x={stage.x}
            y={stage.y}
            width="120"
            height="40"
            rx="4"
            fill={stage.fill}
            className="stroke-black dark:stroke-neo-blue-400"
            strokeWidth="3"
          />
          {/* Node label */}
          <text
            x={stage.x + 60}
            y={stage.y + 25}
            textAnchor="middle"
            className="fill-white text-[13px] font-black"
            style={{ fontFamily: "Inter, system-ui, sans-serif", fontWeight: 900 }}
          >
            {stage.label}
          </text>
        </g>
      ))}
    </svg>
  )
}

export function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-35 dark:opacity-20">
      <GridLayer />
      <ChartLines />
      <PipelineFlow />
    </div>
  )
}
