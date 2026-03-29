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

// HTML-based pipeline node — fixed pixel size, percentage positioned
function Node({
  label, left, top, fill, delay,
}: {
  label: string; left: string; top: string; fill: string; delay: string
}) {
  return (
    <div
      className="absolute animate-node-pulse px-2.5 md:px-3 py-1 md:py-1.5 border-2 md:border-[3px] border-black dark:border-neo-blue-400 rounded-sm text-white text-[10px] md:text-xs tracking-wide"
      style={{
        left,
        top,
        transform: "translate(-50%, -50%)",
        backgroundColor: fill,
        fontFamily: "Inter, system-ui, sans-serif",
        fontWeight: 900,
        animationDelay: delay,
      }}
    >
      {label}
    </div>
  )
}

// Edges drawn in percentage space — stretches to fill any container
function Edges({ paths }: { paths: string[] }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
    >
      {paths.map((d, i) => (
        <g key={i}>
          <path d={d} fill="none" className="stroke-black/15 dark:stroke-neo-blue-500/20" strokeWidth="0.4" />
          <path d={d} fill="none" className="stroke-black/30 dark:stroke-neo-blue-400/40 animate-dash-flow" strokeWidth="0.4" strokeDasharray="2 1.5" />
          <circle r="0.6" className="fill-neo-blue-500 dark:fill-neo-blue-400">
            <animateMotion dur={`${3.5 + i * 0.7}s`} repeatCount="indefinite" path={d} />
          </circle>
        </g>
      ))}
    </svg>
  )
}

// ============ DESKTOP (md+) ============

function DesktopPipelineTop() {
  // Percentage positions within a top container
  const edges = [
    "M8 30 C12 30, 16 65, 20 65",       // STREAM → INGEST
    "M80 30 C78 30, 78 65, 82 65",       // ANALYZE → SCORE
  ]
  return (
    <div className="absolute top-0 left-0 right-0 h-[38%]">
      <Edges paths={edges} />
      <Node label="STREAM"  left="5%"  top="25%" fill="#06b6d4" delay="0s" />
      <Node label="INGEST"  left="20%" top="65%" fill="#3b82f6" delay="0.7s" />
      <Node label="ANALYZE" left="80%" top="25%" fill="#10b981" delay="1.4s" />
      <Node label="SCORE"   left="85%" top="65%" fill="#8b5cf6" delay="2.1s" />
    </div>
  )
}

function DesktopPipelineBottom() {
  const edges = [
    "M10 50 C30 50, 70 50, 90 50",  // DETECT → EXECUTE
  ]
  return (
    <div className="absolute bottom-0 left-0 right-0 h-[38%]">
      <Edges paths={edges} />
      <Node label="DETECT"  left="8%"  top="50%" fill="#ec4899" delay="2.8s" />
      <Node label="EXECUTE" left="92%" top="50%" fill="#ef4444" delay="3.5s" />
    </div>
  )
}

function DesktopConnectors() {
  return (
    <Edges paths={[
      "M20 25 C20 45, 8 60, 8 78",    // INGEST → DETECT
      "M85 25 C85 45, 92 60, 92 78",   // SCORE → EXECUTE
    ]} />
  )
}

// ============ MOBILE (<md) ============

function MobilePipelineTop() {
  // 1:1:3 fan-out layout
  const edges = [
    "M50 12 L50 35",                     // STREAM → INGEST (vertical)
    "M50 42 C50 55, 15 60, 15 78",       // INGEST → ANALYZE (fan left)
    "M50 42 L50 78",                      // INGEST → SCORE (fan center)
    "M50 42 C50 55, 85 60, 85 78",       // INGEST → DETECT (fan right)
  ]
  return (
    <div className="absolute top-10 left-0 right-0 h-44">
      <Edges paths={edges} />
      <Node label="STREAM"  left="50%" top="8%"  fill="#06b6d4" delay="0s" />
      <Node label="INGEST"  left="50%" top="38%" fill="#3b82f6" delay="0.7s" />
      <Node label="ANALYZE" left="15%" top="82%" fill="#10b981" delay="1.4s" />
      <Node label="SCORE"   left="50%" top="82%" fill="#8b5cf6" delay="2.1s" />
      <Node label="DETECT"  left="85%" top="82%" fill="#ec4899" delay="2.8s" />
    </div>
  )
}

function MobilePipelineBottom() {
  return (
    <div className="absolute bottom-2 left-0 right-0 h-14">
      <Node label="EXECUTE" left="50%" top="50%" fill="#ef4444" delay="3.5s" />
    </div>
  )
}

function MobileConnectors() {
  return (
    <Edges paths={[
      "M15 28 C15 50, 50 65, 50 85",   // ANALYZE → EXECUTE
      "M50 28 L50 85",                   // SCORE → EXECUTE
      "M85 28 C85 50, 50 65, 50 85",   // DETECT → EXECUTE
    ]} />
  )
}

// ============ Combined ============

function PipelineFlow() {
  return (
    <>
      <div className="hidden md:block absolute inset-0">
        <DesktopPipelineTop />
        <DesktopConnectors />
        <DesktopPipelineBottom />
      </div>
      <div className="md:hidden absolute inset-0">
        <MobilePipelineTop />
        <MobileConnectors />
        <MobilePipelineBottom />
      </div>
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
