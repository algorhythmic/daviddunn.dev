"use client"

// Layer 1: Traversing dots aligned to the 40px CSS grid
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
          className="absolute left-0 w-3 h-3 rounded-full opacity-0 animate-dot-traverse-h"
          style={{
            top: `${dot.y}px`,
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
          className="absolute top-0 w-3 h-3 rounded-full opacity-0 animate-dot-traverse-v"
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

// Layer 3: Pipeline flow — SVG for edges, HTML divs for nodes (no Y-stretch)
function PipelineFlow() {
  const stages = [
    { label: "STREAM", left: "1%", top: "5%", fill: "#06b6d4" },
    { label: "INGEST", left: "16%", top: "18%", fill: "#3b82f6" },
    { label: "DETECT", left: "2%", top: "58%", fill: "#ec4899" },
    { label: "ANALYZE", left: "79%", top: "5%", fill: "#10b981" },
    { label: "SCORE", left: "86%", top: "40%", fill: "#8b5cf6" },
    { label: "EXECUTE", left: "76%", top: "75%", fill: "#ef4444" },
  ]

  // Edge paths in the percentage viewBox (preserveAspectRatio="none" for full stretch)
  // Coordinates match the percentage positions of the nodes
  const edges = [
    // STREAM → INGEST
    "M11 7.5 C13 7.5, 14 20.5, 16 20.5",
    // INGEST → DETECT
    "M21 22.5 C21 38, 7 42, 7 58",
    // ANALYZE → SCORE
    "M89 7.5 C93 7.5, 91 28, 91 40",
    // SCORE → EXECUTE
    "M91 44.5 C91 58, 81 62, 81 75",
    // DETECT → ANALYZE (cross)
    "M12 60.5 C35 60.5, 55 7.5, 79 7.5",
  ]

  return (
    <div className="absolute inset-0 hidden md:block">
      {/* SVG edges only — stretches to fill */}
      <svg
        className="absolute inset-0 w-full h-full"
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
      </svg>

      {/* HTML nodes — maintain aspect ratio, no stretch */}
      {stages.map((stage, i) => (
        <div
          key={stage.label}
          className="absolute px-3 py-1.5 border-[3px] border-black dark:border-neo-blue-400 rounded-sm animate-node-pulse"
          style={{
            left: stage.left,
            top: stage.top,
            backgroundColor: stage.fill,
            animationDelay: `${i * 0.7}s`,
          }}
        >
          <span
            className="text-white text-[11px] tracking-wide"
            style={{ fontFamily: "Inter, system-ui, sans-serif", fontWeight: 900 }}
          >
            {stage.label}
          </span>
        </div>
      ))}
    </div>
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
      <ChartLines />
      {showPipeline && <PipelineFlow />}
    </div>
  )
}
