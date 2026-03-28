"use client"

// Layer 1: Grid (CSS) with traversing dots (SVG)
function GridLayer() {
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
    { x: 1120, dur: "13s", delay: "7s", color: "#8b5cf6" },
  ]

  return (
    <>
      {/* CSS grid - fixed attachment makes it continuous across all sections */}
      <div className="absolute inset-0 neo-grid-bg" />

      {/* SVG traversing dots only */}
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1200 800"
      >
        {hDots.map((dot, i) => (
          <circle
            key={`h-${i}`}
            cx={0}
            cy={dot.y}
            r="5"
            fill={dot.color}
            className="animate-dot-traverse-h"
            style={{
              "--traverse-x": "1200px",
              "--dot-duration": dot.dur,
              animationDelay: dot.delay,
            } as React.CSSProperties}
          />
        ))}
        {vDots.map((dot, i) => (
          <circle
            key={`v-${i}`}
            cx={dot.x}
            cy={0}
            r="5"
            fill={dot.color}
            className="animate-dot-traverse-v"
            style={{
              "--traverse-y": "800px",
              "--dot-duration": dot.dur,
              animationDelay: dot.delay,
            } as React.CSSProperties}
          />
        ))}
      </svg>
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
        className="stroke-neo-blue-500/30 dark:stroke-neo-blue-400/25 animate-chart-drift-1"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M0 420 C100 350, 250 480, 400 380 S600 460, 750 370 S950 440, 1200 400"
        fill="none"
        className="stroke-neo-pink-light/25 dark:stroke-neo-pink-dark/20 animate-chart-drift-2"
        strokeWidth="3"
        strokeLinecap="round"
      />
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
    { label: "STREAM", x: 30, y: 60, fill: "#06b6d4" },
    { label: "INGEST", x: 240, y: 130, fill: "#3b82f6" },
    { label: "DETECT", x: 60, y: 380, fill: "#ec4899" },
    { label: "ANALYZE", x: 900, y: 80, fill: "#10b981" },
    { label: "SCORE", x: 1040, y: 280, fill: "#8b5cf6" },
    { label: "EXECUTE", x: 920, y: 470, fill: "#ef4444" },
  ]

  const edges = [
    "M150 80 C195 80, 195 150, 240 150",
    "M200 150 C150 150, 150 400, 60 400",
    "M1020 100 C1080 100, 1080 300, 1040 300",
    "M1100 300 C1100 400, 1040 490, 920 490",
    "M180 400 C450 400, 700 100, 900 100",
  ]

  return (
    <svg
      className="absolute inset-0 w-full h-full hidden md:block"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 1200 560"
    >
      {edges.map((d, i) => (
        <g key={`edge-${i}`}>
          <path
            d={d}
            fill="none"
            className="stroke-black/10 dark:stroke-neo-blue-500/20"
            strokeWidth="3"
          />
          <path
            d={d}
            fill="none"
            className="stroke-black/25 dark:stroke-neo-blue-400/40 animate-dash-flow"
            strokeWidth="3"
            strokeDasharray="12 8"
          />
          <circle r="5" className="fill-neo-blue-500 dark:fill-neo-blue-400">
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
          style={{ animationDelay: `${i * 0.7}s`, transformOrigin: `${stage.x + 60}px ${stage.y + 20}px` }}
        >
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
          <text
            x={stage.x + 60}
            y={stage.y + 26}
            textAnchor="middle"
            className="fill-white"
            style={{ fontFamily: "Inter, system-ui, sans-serif", fontWeight: 900, fontSize: "13px" }}
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
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40 dark:opacity-25">
      <GridLayer />
      <ChartLines />
      {showPipeline && <PipelineFlow />}
    </div>
  )
}
