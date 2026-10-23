"use client"

import { useEffect, useState } from "react"
import { ArrowRight, Bot, Check, Database, GitBranch, Layers, Pause, Play, Radio, ShieldCheck, Terminal, User, Workflow } from "lucide-react"
import type { ProjectPreviewSlug } from "@/lib/project-previews"
import styles from "./project-motion.module.css"

const sequences: Record<ProjectPreviewSlug, { labels: string[]; details: string[] }> = {
  odin: { labels: ["Objective", "Delegate", "Human review"], details: ["Keep the commitment across sessions", "Odin supervises · Saga executes", "Bring evidence back to a person"] },
  saga: { labels: ["Worker", "Container", "Outcome"], details: ["Start an isolated agent worker", "Execute inside a container", "Collect the worker’s result"] },
  runtime: { labels: ["Heimdall", "Skald + Braid", "Computer Use"], details: ["Task continuity and checkpoints", "Conversation archives and context retrieval", "Guarded actions on a Wayland desktop"] },
  dbriefly: { labels: ["Your sources", "Daily briefing", "Talk back"], details: ["Podcasts, channels, and newsletters", "A personal briefing with original clips", "Ask the voice agent a follow-up"] },
  nexus: { labels: ["Market feed", "Detection", "Context"], details: ["Ingest market activity", "Identify unusual moves", "Explore the alert in marketfinder"] },
  happily: { labels: ["Invitation", "Profile", "Review"], details: ["An applicant starts their journey", "A guided conversation builds a profile", "A matchmaker reviews the applicant"] },
  mcp: { labels: ["Assistant", "MCP server", "Live data"], details: ["An assistant requests a tool", "The server routes a structured request", "Return source data to the assistant"] },
}

export function ProjectMotion({ slug, reducedMotion, paused }: { slug: ProjectPreviewSlug; reducedMotion: boolean; paused: boolean }) {
  const [step, setStep] = useState(0)
  const [localPause, setLocalPause] = useState(false)
  const stopped = paused || reducedMotion || localPause
  const sequence = sequences[slug]
  useEffect(() => {
    if (stopped) return
    const timer = setInterval(() => setStep(value => (value + 1) % 3), 2400)
    return () => clearInterval(timer)
  }, [stopped])
  const icons = slug === "happily" ? [User, User, Check] : slug === "mcp" ? [Bot, Workflow, Database] : slug === "saga" ? [Bot, Layers, Check] : [GitBranch, Bot, ShieldCheck]
  return (
    <div className={styles.motion} data-paused={stopped}>
      <div className={styles.motionHeader}><span><span className={styles.tinyDot} /> {slug === "odin" ? "DESIGN CONCEPT" : "ILLUSTRATED WORKFLOW"}</span><button type="button" onClick={() => setLocalPause(!localPause)} disabled={paused || reducedMotion} aria-label={localPause ? "Play project animation" : "Pause project animation"}>{localPause || paused || reducedMotion ? <Play size={12} /> : <Pause size={12} />}</button></div>
      <div className={styles.stage} aria-hidden="true">
        {slug === "dbriefly" ? <div className={styles.audioScene}><div className={styles.audioIcon}><Radio size={25} /></div><div className={styles.wave}>{Array.from({length: 32}, (_, i) => <i key={i} style={{height: `${12 + ((i * 17 + 7) % 45)}px`, animationDelay: `${i * -0.09}s`}} />)}</div><span className={styles.sceneLabel}>{["Collecting the signal", "Your day, distilled.", "“Tell me more about that.”"][step]}</span></div>
        : slug === "nexus" ? <div className={styles.chartScene}><div className={styles.chartLabel}>SIGNAL / NOISE <span>illustrative data</span></div><svg viewBox="0 0 400 105"><path className={styles.chartGrid} d="M0 25H400 M0 55H400 M0 85H400" /><path className={styles.chartLine} d="M0 80L20 74L40 79L60 66L80 72L100 65L120 68L140 51L160 58L180 48L200 55L220 36L240 43L260 20L280 30L300 15L320 25L340 8L360 18L380 5L400 12"/><circle className={styles.signalDot} cx={[140,260,340][step]} cy={[51,20,8][step]} r="5" /></svg></div>
        : slug === "runtime" ? <div className={styles.toolScene}>{[{name:"Heimdall", icon:Terminal, text:"task checkpoint"}, {name:"Skald + Braid",icon:Database,text:"archive / retrieve"},{name:"Computer Use",icon:ShieldCheck,text:"guarded input"}].map(({name, icon: Icon,text},i) => <div key={name} className={styles.toolCard} data-active={step === i}><Icon size={20}/><strong>{name}</strong><small>{text}</small><span>Independent tool</span></div>)}</div>
        : <div className={styles.graphScene}><svg viewBox="0 0 480 140" preserveAspectRatio="none"><path d="M80 70H400" /><path className={styles.beam} d="M80 70H400" /></svg>{sequence.labels.map((label, index) => { const Icon = icons[index]; return <div key={label} className={styles.graphNode} data-active={step === index}><div><Icon size={23} /></div><span>{label}</span>{step === index && <i />}</div>})}{slug === "odin" && <span className={styles.graphNote}>persistent context ↵</span>}</div>}
      </div>
      <div className={styles.motionCaption}><span className={styles.stepNumber}>0{step + 1}</span><span>{sequence.details[step]}</span><ArrowRight size={13}/></div>
      <div className={styles.steps} aria-label="Workflow steps">{sequence.labels.map((label, i) => <button type="button" key={label} aria-pressed={i === step} onClick={() => {setStep(i); setLocalPause(true)}}><span>0{i + 1}</span>{label}</button>)}</div>
    </div>
  )
}
