"use client"

import { useEffect, useState, type CSSProperties } from "react"
import Link from "next/link"
import {
  ArrowRight, ArrowUpRight, BookOpen, Check, ChevronDown, Code2, Video, Workflow,
} from "lucide-react"
import { MinimalThemeToggle } from "@/components/minimal-theme-toggle"
import { caseStudies } from "@/lib/portfolio-data"
import { projectPreviews, type ProjectPreviewSlug } from "@/lib/project-previews"
import { projectActivity, projectOrder, publications } from "@/lib/portfolio-activity"
import { ProjectMotion } from "./project-motion"
import { IntroAnimation } from "./intro-animation"
import { INTRO_TIMING } from "@/lib/intro-sequence"
import { SITE_ROLE } from "@/lib/site-copy"
import styles from "./agent-workspace.module.css"

type Filter = "all" | "project" | "article" | "video"

export function Workbench() {
  const [tick, setTick] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [filter, setFilter] = useState<Filter>("all")
  const [open, setOpen] = useState<string | null>(null)

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => {
      setReducedMotion(media.matches)
      if (media.matches) setTick(INTRO_TIMING.end)
    }
    const onHash = () => {
      const slug = window.location.hash.slice(1)
      if (slug === "work" || projectOrder.includes(slug as ProjectPreviewSlug) || publications.some(item => item.id === slug)) {
        setTick(INTRO_TIMING.end)
        setFilter("all")
        if (slug !== "work") setOpen(slug)
        // A hash may arrive while results are hidden; scroll after React reveals them.
        requestAnimationFrame(() => requestAnimationFrame(() => document.getElementById(slug)?.scrollIntoView({ block: "start" })))
      }
    }
    sync()
    onHash()
    media.addEventListener("change", sync)
    window.addEventListener("hashchange", onHash)
    return () => {
      media.removeEventListener("change", sync)
      window.removeEventListener("hashchange", onHash)
    }
  }, [])

  useEffect(() => {
    if (paused || reducedMotion || tick >= INTRO_TIMING.end) return
    const timeout = setTimeout(() => setTick(value => value + 1), INTRO_TIMING.tickMs)
    return () => clearTimeout(timeout)
  }, [paused, reducedMotion, tick])

  const complete = reducedMotion || tick >= INTRO_TIMING.end
  const visibleProjects = filter === "all" || filter === "project" ? projectOrder : []
  const visiblePublications = publications.filter(item => filter === "all" || item.kind === filter)
  const resultCount = visibleProjects.length + visiblePublications.length
  const totalCount = projectOrder.length + publications.length

  function skip() {
    setTick(INTRO_TIMING.end)
    setPaused(false)
  }
  function replay() {
    setTick(0)
    setPaused(false)
    setOpen(null)
    setFilter("all")
    window.history.replaceState(null, "", window.location.pathname + window.location.search)
    window.scrollTo({ top: 0, behavior: "instant" })
  }

  return (
    <div className={styles.workspace} data-paused={paused || reducedMotion}>
      <a className={styles.skipLink} href="#work" onClick={skip}>Skip introduction and browse projects</a>
      <div className={styles.background} aria-hidden="true" />
      <header className={styles.header}>
        <a className={styles.brand} href="#" aria-label="David Dunn, home"><span className={styles.brandMark}>d<span>.</span></span><span>David Dunn<small>{SITE_ROLE}</small></span></a>
        <nav aria-label="Main navigation"><a href="#work" onClick={skip}>Work <span>{String(totalCount).padStart(2, "0")}</span></a><a href="mailto:davidalexanderdunn@gmail.com">Get in touch <ArrowUpRight size={13} /></a><MinimalThemeToggle /></nav>
      </header>

      <main className={styles.main}>
        <IntroAnimation
          tick={tick}
          paused={paused}
          reducedMotion={reducedMotion}
          onPause={() => setPaused(value => !value)}
          onSkip={skip}
          onReplay={replay}
          onSubmit={() => setTick(value => Math.max(value, INTRO_TIMING.submit))}
        />

        <section id="work" className={styles.activity} data-ready={complete} inert={!complete} aria-labelledby="activity-title">
          <div className={styles.activityHeader}><div className={styles.activityHeading}><span className={styles.activityIcon}><Workflow size={16} /></span><div><h2 id="activity-title">The work, connected.</h2><p>Open a thread. See what’s behind it.</p></div></div><span className={styles.resultCount}>{String(totalCount).padStart(2, "0")} ITEMS</span></div>
          <div className={styles.filters} role="group" aria-label="Filter activity">{([{id:"all",label:"Everything",icon:Workflow,count:totalCount},{id:"project",label:"Projects",icon:Code2,count:projectOrder.length},{id:"article",label:"Articles",icon:BookOpen,count:publications.filter(p => p.kind === "article").length},{id:"video",label:"Videos",icon:Video,count:publications.filter(p => p.kind === "video").length}] as const).map(({id,label,icon:Icon,count}) => <button key={id} onClick={() => setFilter(id)} aria-pressed={filter === id}><Icon size={12} />{label}<span>{count || "soon"}</span></button>)}</div>
          <div className={styles.activityList}>
            <div className={styles.branchOrigin}><span><Check size={10} /></span><span>PROFILE COMPILED</span><span>{resultCount} {resultCount === 1 ? "result" : "results"}</span></div>
            {visibleProjects.map((slug, index) => {
              const project = caseStudies.find(item => item.slug === slug)!
              const preview = projectPreviews[slug]
              const info = projectActivity[slug]
              const expanded = open === slug
              return <article className={styles.project} data-open={expanded} data-color={info.color} style={{"--row-index":index} as CSSProperties} key={slug} id={slug}>
                <span className={styles.branch} aria-hidden="true"><i /></span>
                <h3><button className={styles.projectRow} onClick={() => setOpen(expanded ? null : slug)} aria-expanded={expanded} aria-controls={`${slug}-panel`} id={`${slug}-trigger`}><span className={styles.projectSymbol}><Code2 size={16} /></span><span className={styles.projectName}>{project.title}<small>{info.summary}</small></span><span className={styles.projectType}>PROJECT</span><span className={styles.status}><i />{info.status}</span><ChevronDown className={styles.expandIcon} size={15} /></button></h3>
                <div className={styles.projectPanel} data-open={expanded} id={`${slug}-panel`} role="region" aria-labelledby={`${slug}-trigger`} inert={!expanded}><div className={styles.panelClip}><div className={styles.projectDetails}><div className={styles.projectCopy}><div className={styles.projectCategory}>{info.category}<span>{preview.status}</span></div><h4>{project.subtitle}</h4><p>{preview.summary}</p><div className={styles.tags}>{project.technologies.slice(0,3).map(tech => <span key={tech}>{tech}</span>)}</div><div className={styles.projectLinks}><Link href={`/projects#${slug}`}>Explore project<ArrowUpRight size={12} /></Link>{project.links.filter(link => link.url && !link.private).slice(0,2).map(link => <a key={link.label} href={link.url} target={link.url?.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">{link.label}<ArrowUpRight size={11} /></a>)}</div></div><ProjectMotion slug={slug} reducedMotion={reducedMotion} paused={paused || !expanded || !complete} /></div></div></div>
              </article>
            })}
            {visiblePublications.map((item,index) => {
              const expanded = open === item.id
              const Icon = item.kind === "article" ? BookOpen : Video
              return <article className={styles.project} key={item.id} id={item.id} data-open={expanded} style={{"--row-index":visibleProjects.length + index} as CSSProperties}><span className={styles.branch} aria-hidden="true"><i /></span><h3><button className={styles.projectRow} onClick={() => setOpen(expanded ? null : item.id)} aria-expanded={expanded} aria-controls={`${item.id}-panel`} id={`${item.id}-trigger`}><span className={styles.projectSymbol}><Icon size={16} /></span><span className={styles.projectName}>{item.title}<small>{item.summary}</small></span><span className={styles.projectType}>{item.kind.toUpperCase()}</span><span className={styles.status}>{item.date}</span><ChevronDown className={styles.expandIcon} size={15} /></button></h3><div className={styles.projectPanel} data-open={expanded} id={`${item.id}-panel`} role="region" aria-labelledby={`${item.id}-trigger`} inert={!expanded}><div className={styles.panelClip}><div className={styles.publicationDetails}><p>{item.description}</p><a href={item.url} target="_blank" rel="noopener noreferrer">{item.kind === "article" ? "Read article" : "Watch video"}<ArrowUpRight size={13} /></a></div></div></div></article>
            })}
            {resultCount === 0 && <div className={styles.empty}><span className={styles.branch} aria-hidden="true"><i /></span>{filter === "video" ? <Video size={23} /> : <BookOpen size={23} />}<h3>{filter === "video" ? "The first video is in the works." : "The next chapter is being written."}</h3><p>David is working on publishing {filter === "video" ? "videos" : "articles"}. In the meantime, explore what he’s building.</p><button onClick={() => setFilter("project")}>Explore the projects <ArrowRight size={13} /></button></div>}
            <div className={styles.branchEnd}><span /><p>{filter === "all" ? "More threads soon. Articles and videos are in the works." : "Always a work in progress."}</p></div>
          </div>
          <div className={styles.activityFooter}><span><Check size={12} />Your turn to explore.</span><Link href="/projects">All the architecture &amp; evidence<ArrowUpRight size={12} /></Link></div>
        </section>
        <noscript><p>This animated introduction needs JavaScript. <a href="/projects">Read the full project portfolio</a> or <a href="/resume.pdf">view David’s résumé</a>.</p></noscript>
        <p className="sr-only" role="status">{complete ? `${totalCount} portfolio items ready to explore.` : "The prewritten introduction is playing. You can skip it to browse projects."}</p>
      </main>
      <footer className={styles.footer}><span>© {new Date().getFullYear()} David Dunn</span><span>Human-built. Agent-assisted.</span><a href="mailto:davidalexanderdunn@gmail.com">Let’s build something useful <ArrowUpRight size={12} /></a></footer>
    </div>
  )
}
