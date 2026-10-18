import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { lazy, useLayoutEffect, useRef, useState, type KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Scene3D } from '@/components/three/Scene3D'
import { OrbitFallback } from '@/components/three/fallbacks'
import { stages, type LearningStage } from '@/data/stages'
import { ScrollTrigger } from '@/lib/gsap'
import { useIsDesktop } from '@/lib/hooks'
import { cn } from '@/lib/cn'

const PlanetsScene = lazy(() => import('@/components/three/PlanetsScene'))

function StagePanel({ stage }: { stage: LearningStage }) {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <span className="size-4 rounded-full" style={{ background: stage.color }} aria-hidden="true" />
        <span className="font-display text-sm text-plum/70">{stage.grades} · {stage.ages}</span>
      </div>
      <h3 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">{stage.name}</h3>
      <p className="mt-3 text-lg leading-relaxed text-plum/80">{stage.summary}</p>
      <div className="mt-7 grid gap-6 sm:grid-cols-2">
        <div>
          <h4 className="eyebrow text-forest">Learning goals</h4>
          <ul className="mt-3 space-y-2">
            {stage.goals.map((g) => (
              <li key={g} className="flex gap-2 text-sm text-plum/80"><Check className="mt-0.5 size-4 shrink-0 text-forest" aria-hidden="true" />{g}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="eyebrow text-forest">Activities</h4>
          <ul className="mt-3 flex flex-wrap gap-2">
            {stage.activities.map((a) => <li key={a} className="rounded-full bg-white/70 px-3 py-1.5 text-sm">{a}</li>)}
          </ul>
          <h4 className="eyebrow mt-6 text-forest">Teaching approach</h4>
          <p className="mt-2 text-sm leading-relaxed text-plum/80">{stage.approach}</p>
        </div>
      </div>
      <Link to={`/academics/stages#${stage.id}`} className="group mt-8 inline-flex items-center gap-2 font-display font-semibold text-forest">
        Explore {stage.name} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </Link>
    </div>
  )
}

/* Section E — the learning universe: orbiting planets (desktop) / swipeable carousel (mobile) */
export function LearningPlanetSelector() {
  const [active, setActive] = useState(0)
  const desktop = useIsDesktop()
  const section = useRef<HTMLElement>(null)
  const scrollRef = useRef(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])

  useLayoutEffect(() => {
    if (!section.current) return
    const st = ScrollTrigger.create({ trigger: section.current, start: 'top bottom', end: 'bottom top', onUpdate: (s) => { scrollRef.current = s.progress } })
    return () => st.kill()
  }, [])

  const onKey = (e: KeyboardEvent) => {
    const n = stages.length
    let next = active
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (active + 1) % n
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (active - 1 + n) % n
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = n - 1
    else return
    e.preventDefault()
    setActive(next)
    tabs.current[next]?.focus()
  }

  return (
    <section ref={section} aria-labelledby="universe-title" className="relative overflow-hidden bg-violet-100 py-20 text-plum sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 size-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lavender/70 blur-[160px]" />
      <div className="container-x relative">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
           
            eyebrow="The learning universe"
            lines={[<span id="universe-title">Every stage,</span>, <>its own <span className="accent text-violet">world.</span></>]}
            intro="Each learning stage orbits the same core — curiosity — while giving children exactly what they need at their age."
          />
          <Link to="/academics/stages" className="link-underline shrink-0 font-medium text-plum/80 hover:text-violet">View all stages as a list</Link>
        </div>

        {desktop ? (
          <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
            <div className="relative">
              <Scene3D className="aspect-square w-full" fallback={<div className="grid h-full place-items-center p-10"><OrbitFallback label="Illustration of learning stages orbiting a central core" /></div>}>
                {(p) => <PlanetsScene {...p} stages={stages} activeIndex={active} onSelect={setActive} scrollRef={scrollRef} />}
              </Scene3D>
              <p className="pointer-events-none absolute bottom-2 left-0 text-xs text-plum/50">Select a planet or use the stage buttons</p>
            </div>
            <div>
              <div role="tablist" aria-label="Learning stages" className="mb-8 flex flex-wrap gap-2" onKeyDown={onKey}>
                {stages.map((s, i) => (
                  <button
                    key={s.id}
                    ref={(el) => { tabs.current[i] = el }}
                    role="tab"
                    id={`stage-tab-${s.id}`}
                    aria-selected={i === active}
                    aria-controls="stage-panel"
                    tabIndex={i === active ? 0 : -1}
                    onClick={() => setActive(i)}
                    className={cn('relative rounded-full px-4 py-2 text-sm font-medium transition-colors', i === active ? 'text-plum' : 'text-plum/80 ring-1 ring-plum/10 hover:bg-white')}
                  >
                    {i === active && <motion.span layoutId="stage-pill" className="absolute inset-0 rounded-full bg-emerald" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                    <span className="relative">{s.short}</span>
                  </button>
                ))}
              </div>
              <div id="stage-panel" role="tabpanel" aria-labelledby={`stage-tab-${stages[active].id}`} className="min-h-[420px] rounded-[2rem] bg-white/75 p-8 ring-1 ring-plum/10">
                <AnimatePresence mode="wait">
                  <motion.div key={stages[active].id} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.35 }}>
                    <StagePanel stage={stages[active]} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        ) : (
          <MobileStageCarousel />
        )}
      </div>
    </section>
  )
}

function MobileStageCarousel() {
  const track = useRef<HTMLUListElement>(null)
  const [index, setIndex] = useState(0)
  const go = (i: number) => {
    const el = track.current?.children[i] as HTMLElement | undefined
    el?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' })
  }
  return (
    <div className="mt-10">
      <ul
        ref={track}
        aria-label="Learning stages"
        className="scrollbar-none -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4"
        onScroll={(e) => {
          const el = e.currentTarget
          const w = (el.children[0] as HTMLElement | undefined)?.offsetWidth ?? 1
          setIndex(Math.round(el.scrollLeft / (w + 16)))
        }}
      >
        {stages.map((s) => (
          <li key={s.id} className="w-[86%] shrink-0 snap-start rounded-[2rem] bg-white/75 p-6 ring-1 ring-plum/10 sm:w-[70%]">
            <div className="mb-6 flex items-center gap-4">
              <span className="relative block size-14 rounded-full" style={{ background: `radial-gradient(circle at 30% 30%, ${s.accent}, ${s.color})` }} aria-hidden="true">
                <span className="absolute -inset-2 rounded-full border border-plum/15" />
              </span>
            </div>
            <StagePanel stage={s} />
          </li>
        ))}
      </ul>
      <div className="mt-4 flex justify-center gap-1" role="group" aria-label="Choose a stage">
        {stages.map((s, i) => (
          <button key={s.id} onClick={() => go(i)} aria-label={`Show ${s.name}`} aria-current={i === index} className="grid size-8 place-items-center">
            <span className={cn('block h-2 rounded-full transition-all', i === index ? 'w-6 bg-emerald' : 'w-2 bg-cream/30')} />
          </button>
        ))}
      </div>
    </div>
  )
}
