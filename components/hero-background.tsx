"use client"

// Traversing dots aligned to the 40px CSS grid
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

// Shared edge renderer
function PipelineEdge({ d, index }: { d: string; index: number }) {
  return (
    <g>
      <path d={d} fill="none" className="stroke-black/15 dark:stroke-neo-blue-500/20" strokeWidth="3" />
      <path d={d} fill="none" className="stroke-black/30 dark:stroke-neo-blue-400/40 animate-dash-flow" strokeWidth="3" strokeDasharray="14 10" />
      <circle r="5" className="fill-neo-blue-500 dark:fill-neo-blue-400">
        <animateMotion dur={`${4 + index * 0.8}s`} repeatCount="indefinite" path={d} />
      </circle>
    </g>
  )
}

// Shared node renderer
function PipelineNode({ label, x, y, nw, nh, fill, delay }: {
  label: string; x: number; y: number; nw: number; nh: number; fill: string; delay: string
}) {
  return (
    <g className="animate-node-pulse" style={{ animationDelay: delay, transformOrigin: `${x + nw / 2}px ${y + nh / 2}px` }}>
      <rect x={x} y={y} width={nw} height={nh} rx="4" fill={fill} className="stroke-black dark:stroke-neo-blue-400" strokeWidth="3" />
      <text x={x + nw / 2} y={y + 23} textAnchor="middle" className="fill-white" style={{ fontFamily: "Inter, system-ui, sans-serif", fontWeight: 900, fontSize: "13px" }}>
        {label}
      </text>
    </g>
  )
}

// Top pipeline cluster: STREAM → INGEST, ANALYZE → SCORE
// Positioned in the top ~35% of the section
function PipelineTop() {
  const nw = 100, nh = 34

  const stream = { x: 30, y: 20, fill: "#06b6d4" }
  const ingest = { x: 200, y: 110, fill: "#3b82f6" }
  const analyze = { x: 700, y: 20, fill: "#10b981" }
  const score = { x: 780, y: 110, fill: "#8b5cf6" }

  const edges = [
    // STREAM → INGEST
    `M${stream.x + nw} ${stream.y + nh / 2} C${stream.x + nw + 40} ${stream.y + nh / 2}, ${ingest.x - 40} ${ingest.y + nh / 2}, ${ingest.x} ${ingest.y + nh / 2}`,
    // ANALYZE → SCORE
    `M${analyze.x + nw / 2} ${analyze.y + nh} C${analyze.x + nw / 2} ${analyze.y + nh + 20}, ${score.x + nw / 2} ${score.y - 20}, ${score.x + nw / 2} ${score.y}`,
  ]

  // Downward exit lines (fade into the card area)
  const exitLines = [
    `M${ingest.x + nw / 2} ${ingest.y + nh} L${ingest.x + nw / 2} 200`,
    `M${score.x + nw / 2} ${score.y + nh} L${score.x + nw / 2} 200`,
  ]

  return (
    <svg
      className="absolute top-0 left-0 right-0 h-[22%] md:h-[38%]"
      preserveAspectRatio="xMidYMin meet"
      viewBox="0 0 950 200"
    >
      {edges.map((d, i) => <PipelineEdge key={i} d={d} index={i} />)}
      {exitLines.map((d, i) => (
        <path key={`exit-${i}`} d={d} fill="none" className="stroke-black/20 dark:stroke-neo-blue-400/30 animate-dash-flow" strokeWidth="2" strokeDasharray="8 6" />
      ))}
      <PipelineNode label="STREAM" {...stream} nw={nw} nh={nh} delay="0s" />
      <PipelineNode label="INGEST" {...ingest} nw={nw} nh={nh} delay="0.7s" />
      <PipelineNode label="ANALYZE" {...analyze} nw={nw} nh={nh} delay="1.4s" />
      <PipelineNode label="SCORE" {...score} nw={nw} nh={nh} delay="2.1s" />
    </svg>
  )
}

// Bottom pipeline cluster: DETECT, EXECUTE + cross-connection hint
// Positioned in the bottom ~35% of the section
function PipelineBottom() {
  const nw = 100, nh = 34

  const detect = { x: 50, y: 60, fill: "#ec4899" }
  const execute = { x: 760, y: 60, fill: "#ef4444" }

  // Upward entry lines (arriving from the card area)
  const entryLines = [
    `M${detect.x + nw / 2} 0 L${detect.x + nw / 2} ${detect.y}`,
    `M${execute.x + nw / 2} 0 L${execute.x + nw / 2} ${execute.y}`,
  ]

  // Cross-connection: DETECT → EXECUTE
  const crossEdge = `M${detect.x + nw} ${detect.y + nh / 2} C${detect.x + nw + 200} ${detect.y + nh / 2}, ${execute.x - 200} ${execute.y + nh / 2}, ${execute.x} ${execute.y + nh / 2}`

  return (
    <svg
      className="absolute bottom-0 left-0 right-0 h-[22%] md:h-[38%]"
      preserveAspectRatio="xMidYMax meet"
      viewBox="0 0 950 130"
    >
      {entryLines.map((d, i) => (
        <path key={`entry-${i}`} d={d} fill="none" className="stroke-black/20 dark:stroke-neo-blue-400/30 animate-dash-flow" strokeWidth="2" strokeDasharray="8 6" />
      ))}
      <PipelineEdge d={crossEdge} index={3} />
      <PipelineNode label="DETECT" {...detect} nw={nw} nh={nh} delay="2.8s" />
      <PipelineNode label="EXECUTE" {...execute} nw={nw} nh={nh} delay="3.5s" />
    </svg>
  )
}

function PipelineFlow() {
  return (
    <>
      <PipelineTop />
      <PipelineBottom />
    </>
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
