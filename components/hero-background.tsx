"use client"

// Traversing dots aligned to the 40px CSS grid
// Use margin offset for centering (not transform, which gets overridden by animation)
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
      {/* Horizontal dots: traverse left→right, centered on gridline via margin-top */}
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
      {/* Vertical dots: traverse top→bottom, centered on gridline via margin-left */}
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

// Pipeline flow — single SVG, uniform scaling, always fully visible
// viewBox 1000x700 with preserveAspectRatio="xMidYMid meet"
function PipelineFlow() {
  const nw = 100
  const nh = 34

  const stages = [
    { label: "STREAM", x: 20, y: 30, fill: "#06b6d4" },
    { label: "INGEST", x: 180, y: 140, fill: "#3b82f6" },
    { label: "DETECT", x: 40, y: 400, fill: "#ec4899" },
    { label: "ANALYZE", x: 780, y: 40, fill: "#10b981" },
    { label: "SCORE", x: 860, y: 260, fill: "#8b5cf6" },
    { label: "EXECUTE", x: 770, y: 460, fill: "#ef4444" },
  ]

  const cx = (s: typeof stages[0]) => s.x + nw / 2
  const cy = (s: typeof stages[0]) => s.y + nh / 2
  const r = (s: typeof stages[0]) => s.x + nw
  const b = (s: typeof stages[0]) => s.y + nh

  const edges = [
    // STREAM → INGEST
    `M${r(stages[0])} ${cy(stages[0])} C${r(stages[0]) + 30} ${cy(stages[0])}, ${stages[1].x - 30} ${cy(stages[1])}, ${stages[1].x} ${cy(stages[1])}`,
    // INGEST → DETECT
    `M${cx(stages[1])} ${b(stages[1])} C${cx(stages[1])} ${b(stages[1]) + 80}, ${cx(stages[2])} ${stages[2].y - 80}, ${cx(stages[2])} ${stages[2].y}`,
    // ANALYZE → SCORE
    `M${cx(stages[3])} ${b(stages[3])} C${cx(stages[3])} ${b(stages[3]) + 60}, ${cx(stages[4])} ${stages[4].y - 60}, ${cx(stages[4])} ${stages[4].y}`,
    // SCORE → EXECUTE
    `M${cx(stages[4])} ${b(stages[4])} C${cx(stages[4])} ${b(stages[4]) + 60}, ${cx(stages[5])} ${stages[5].y - 60}, ${cx(stages[5])} ${stages[5].y}`,
    // DETECT → ANALYZE (cross)
    `M${r(stages[2])} ${cy(stages[2])} C${r(stages[2]) + 200} ${cy(stages[2])}, ${stages[3].x - 200} ${cy(stages[3])}, ${stages[3].x} ${cy(stages[3])}`,
  ]

  return (
    <svg
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 1000 520"
    >
      {edges.map((d, i) => (
        <g key={`edge-${i}`}>
          <path
            d={d}
            fill="none"
            className="stroke-black/15 dark:stroke-neo-blue-500/20"
            strokeWidth="3"
          />
          <path
            d={d}
            fill="none"
            className="stroke-black/30 dark:stroke-neo-blue-400/40 animate-dash-flow"
            strokeWidth="3"
            strokeDasharray="14 10"
          />
          <circle r="5" className="fill-neo-blue-500 dark:fill-neo-blue-400">
            <animateMotion
              dur={`${4 + i * 0.8}s`}
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
          style={{ animationDelay: `${i * 0.7}s`, transformOrigin: `${cx(stage)}px ${cy(stage)}px` }}
        >
          <rect
            x={stage.x}
            y={stage.y}
            width={nw}
            height={nh}
            rx="4"
            fill={stage.fill}
            className="stroke-black dark:stroke-neo-blue-400"
            strokeWidth="3"
          />
          <text
            x={cx(stage)}
            y={stage.y + 23}
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
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50 dark:opacity-25">
      <div className="absolute inset-0 neo-grid-bg" />
      <GridDots />
      {showPipeline && <PipelineFlow />}
    </div>
  )
}
