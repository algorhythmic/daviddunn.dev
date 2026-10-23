"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import {
  ArrowUp, ArrowUpRight, Check, ChevronDown, FileText, Github,
  Globe, Instagram, Linkedin, Pause, Play, Plus, RotateCcw, Search,
} from "lucide-react"
import { INTRO_PROMPT, INTRO_TIMING } from "@/lib/intro-sequence"
import { INTRO_ANSWER, INTRO_GREETING, INTRO_SUBTITLE, SITE_ROLE } from "@/lib/site-copy"
import { profileSources } from "@/lib/portfolio-activity"
import styles from "./intro-animation.module.css"

type IntroAnimationProps = {
  tick: number
  paused: boolean
  reducedMotion: boolean
  onPause: () => void
  onSkip: () => void
  onReplay: () => void
  onSubmit: () => void
}

const sourceIcons = [Github, Linkedin, Instagram, Globe]
const answerWords = INTRO_ANSWER.split(/\s+/)

export function IntroAnimation({ tick, paused, reducedMotion, onPause, onSkip, onReplay, onSubmit }: IntroAnimationProps) {
  const [expanded, setExpanded] = useState(false)
  const progress = reducedMotion ? INTRO_TIMING.end : tick
  const sent = progress >= INTRO_TIMING.submit
  const thinking = progress >= INTRO_TIMING.thinkingStart
  const researched = progress >= INTRO_TIMING.researchEnd
  const answering = progress >= INTRO_TIMING.answerStart
  const complete = progress >= INTRO_TIMING.end
  const elapsed = Math.min(5, Math.floor(Math.max(0, progress - INTRO_TIMING.thinkingStart) * INTRO_TIMING.tickMs / 1000))
  const typedPrompt = INTRO_PROMPT.slice(0, Math.max(0, progress - INTRO_TIMING.typeStart))
  const answer = answerWords.slice(0, Math.max(0, progress - INTRO_TIMING.answerStart + 1) * 2).join(" ")
  const processOpen = !answering || expanded
  const phase = complete ? "complete" : answering ? "answering" : thinking ? "thinking" : sent ? "submitting" : "typing"

  useEffect(() => {
    if (!sent) setExpanded(false)
  }, [sent])

  return (
    <section className={styles.intro} data-testid="intro-animation" data-phase={phase} data-paused={paused} data-reduced-motion={reducedMotion} aria-label="An introduction to David Dunn">
      <div className={styles.welcome} data-sent={sent}>
        <div className={styles.welcomeClip}>
          <div className={styles.welcomeContent}>
            <span className={styles.eyebrow}>A little context before the work</span>
            <h1>{INTRO_GREETING}</h1>
            <p>{INTRO_SUBTITLE}</p>
          </div>
        </div>
      </div>

      <div className={styles.composerLane}>
        <div className={styles.composer} data-testid="intro-composer" data-sent={sent}>
          <p className={styles.prompt} aria-hidden="true"><span data-testid="intro-prompt">{sent ? INTRO_PROMPT : typedPrompt}</span>{!sent && <span className={styles.cursor} />}</p>
          <span className={styles.srOnly}>{INTRO_PROMPT}</span>
          <div className={styles.composerTools} aria-hidden={sent} inert={sent}>
            <span className={styles.composerHint}><Plus size={15} /><span>Get to know David</span></span>
            <button type="button" onClick={onSubmit} aria-label="Send introduction prompt"><ArrowUp size={16} /></button>
          </div>
        </div>
      </div>

      <div className={styles.response} data-visible={thinking} inert={!thinking}>
        <div className={styles.responseClip}>
          <div className={styles.thinkingCard} data-done={researched}>
            <button type="button" className={styles.thinkingHeader} onClick={() => setExpanded(value => !value)} disabled={!answering} aria-expanded={processOpen} aria-controls="intro-thinking-process">
              <span className={styles.mark} aria-hidden="true">
                <span className={styles.pixels}>{Array.from({ length: 9 }, (_, i) => <i key={i} />)}</span>
                <svg className={styles.doneCheck} viewBox="0 0 20 20" fill="none"><path d="m4 10 4 4 8-8" /></svg>
              </span>
              <span>{researched ? "Worked for 5s" : "Thinking"}</span>
              {!researched && <span className={styles.seconds}>{elapsed}s</span>}
              <ChevronDown size={14} className={styles.chevron} />
            </button>
            <div className={styles.process} data-open={processOpen} id="intro-thinking-process" inert={!processOpen} onFocusCapture={() => setExpanded(true)}>
              <div className={styles.processClip}>
                <div className={styles.processContent}>
                  <div className={styles.searchLabel}><Search size={14} /><span>{researched ? "Sources explored" : "Exploring public profiles"}</span></div>
                  <div className={styles.sources}>
                    {profileSources.map((source, index) => {
                      const Icon = sourceIcons[index]
                      const visible = progress >= INTRO_TIMING.thinkingStart + index * 10
                      if (!visible) return null
                      return <a className={styles.source} data-visible={visible} data-testid="intro-source" href={source.href} key={source.name} target="_blank" rel="noopener noreferrer" tabIndex={visible && processOpen ? 0 : -1} aria-hidden={!visible}><Icon size={13} /><span>{source.name}</span><small>@{source.handle}</small></a>
                    })}
                  </div>
                  <div className={styles.timeline}>
                    <div className={styles.step} data-visible={progress >= INTRO_TIMING.thinkingStart + 36} aria-hidden={progress < INTRO_TIMING.thinkingStart + 36} data-finished={progress >= INTRO_TIMING.thinkingStart + 58}><span className={styles.stepDot} /><span>Reading the projects and the code</span></div>
                    <div className={styles.step} data-visible={progress >= INTRO_TIMING.thinkingStart + 58} aria-hidden={progress < INTRO_TIMING.thinkingStart + 58} data-finished={progress >= INTRO_TIMING.thinkingStart + 80}><span className={styles.stepDot} /><div>Connecting the work<div className={styles.keywords}><span>Agent runtimes</span><span>Tooling</span><span>Evals</span></div></div></div>
                    <div className={styles.step} data-visible={progress >= INTRO_TIMING.thinkingStart + 80} aria-hidden={progress < INTRO_TIMING.thinkingStart + 80} data-finished={researched}><span className={styles.stepDot} /><span>Keeping the human in the loop</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.answer} data-visible={answering} inert={!answering}>
            <div className={styles.answerClip}>
              <div className={styles.answerContent}>
                <div className={styles.identity}><Image src="/dd-profile.png" alt="David Dunn" width={42} height={42} priority /><div><strong>David Dunn</strong><span>{SITE_ROLE}</span></div><span className={styles.human}><Check size={11} />Human, confirmed</span></div>
                <div className={styles.answerText}>
                  <p className={styles.answerReserve} aria-hidden="true">{INTRO_ANSWER}</p>
                  <p className={styles.stream} aria-hidden="true">{answer}{!complete && <span className={styles.cursor} />}</p>
                </div>
                <p className={styles.srOnly}>{INTRO_ANSWER}</p>
                <div className={styles.answerLinks} data-visible={complete} inert={!complete}>
                  <a href="/resume.pdf" target="_blank" rel="noopener noreferrer"><FileText size={13} />Résumé<ArrowUpRight size={11} /></a>
                  <a href={profileSources[0].href} target="_blank" rel="noopener noreferrer"><Github size={13} />GitHub<ArrowUpRight size={11} /></a>
                  <a href={profileSources[1].href} target="_blank" rel="noopener noreferrer"><Linkedin size={13} />LinkedIn<ArrowUpRight size={11} /></a>
                  <a href="mailto:davidalexanderdunn@gmail.com">Get in touch<ArrowUpRight size={11} /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.controls}>
        <span><i />Animated introduction</span>
        <div>
          {!complete && !reducedMotion && <button type="button" onClick={onPause} aria-pressed={paused}>{paused ? <Play size={11} /> : <Pause size={11} />}{paused ? "Resume" : "Pause"}</button>}
          {complete ? !reducedMotion && <button type="button" onClick={onReplay}><RotateCcw size={11} />Replay</button> : <button type="button" onClick={onSkip}>Skip intro<ArrowUpRight size={11} /></button>}
          {reducedMotion && <span className={styles.reducedLabel}>Reduced motion</span>}
        </div>
      </div>
    </section>
  )
}
