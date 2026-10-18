import { AnimatePresence, motion } from 'framer-motion'
import { Compass, MapPin, Move3d, ScrollText } from 'lucide-react'
import { lazy, useLayoutEffect, useRef, useState } from 'react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Scene3D } from '@/components/three/Scene3D'
import { campusHotspots, campusStages } from '@/data/campus'
import { ScrollTrigger } from '@/lib/gsap'
import { hasWebGL, useIsDesktop, usePrefersReducedMotion } from '@/lib/hooks'
import { cn } from '@/lib/cn'
import { FacilityDialog } from './FacilityDialog'

const CampusExplorerScene = lazy(() => import('@/components/three/CampusExplorerScene'))

/** Section G — the signature, scroll-driven 3D campus tour (with a 2D map alternative). */
export function InteractiveCampusExplorer({ headingLevel = 'h2' }: { headingLevel?: 'h1' | 'h2' }) {
  const desktop = useIsDesktop()
  const reduced = usePrefersReducedMotion()
  const [webgl] = useState(() => hasWebGL())
  const [selected, setSelected] = useState<string | null>(null)
  const story = desktop && webgl && !reduced

  return (
    <>
      {story ? <StoryExplorer onSelect={setSelected} selected={selected} headingLevel={headingLevel} /> : <MapExplorer onSelect={setSelected} headingLevel={headingLevel} />}
      <FacilityDialog facilityId={selected} onClose={() => setSelected(null)} />
    </>
  )
}

function StoryExplorer({ onSelect, selected, headingLevel }: { onSelect: (id: string) => void; selected: string | null; headingLevel: 'h1' | 'h2' }) {
  const outer = useRef<HTMLElement>(null)
  const progressRef = useRef(0)
  const [stage, setStage] = useState(0)
  const [mode, setMode] = useState<'story' | 'free'>('story')
  const n = campusStages.length

  useLayoutEffect(() => {
    if (!outer.current) return
    const st = ScrollTrigger.create({
      trigger: outer.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (s) => {
        progressRef.current = s.progress
        setStage(Math.min(n - 1, Math.round(s.progress * (n - 1))))
      },
    })
    return () => st.kill()
  }, [n])

  const goTo = (i: number) => {
    const el = outer.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    const range = el.offsetHeight - window.innerHeight
    setMode('story')
    window.scrollTo({ top: top + (range * i) / (n - 1), behavior: 'smooth' })
  }

  const s = campusStages[stage]
  const H = headingLevel

  return (
    <section ref={outer} aria-labelledby="explorer-title" className="relative bg-sky-100 text-plum" style={{ height: `${n * 90 + 60}vh` }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,#FFFFFF_0%,#E6F3FF_50%,#CBE5FF_100%)]" />
        <Scene3D className="!absolute inset-0" fallback={<div className="grid h-full place-items-center text-plum/60">Loading campus…</div>} rootMargin="600px">
          {(p) => <CampusExplorerScene {...p} progressRef={progressRef} mode={mode} selected={selected} onSelect={onSelect} />}
        </Scene3D>

        {/* overlay copy */}
        <div className="pointer-events-none relative z-10 flex h-full flex-col justify-between pb-10 pt-28">
          <div className="container-x">
            <p className="eyebrow text-forest">Campus explorer</p>
            <H id="explorer-title" className="mt-3 max-w-xl font-display text-big font-semibold">
              Take a walk through <span className="accent text-violet">our world.</span>
            </H>
          </div>

          <div className="container-x flex items-end justify-between gap-8">
            <div className="pointer-events-auto glass max-w-md rounded-[2rem] p-7 ring-1 ring-plum/10" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.div key={s.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }}>
                  <p className="font-display text-sm text-forest">{s.kicker}</p>
                  <h3 className="mt-2 font-display text-2xl font-semibold">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-plum/80">{s.text}</p>
                </motion.div>
              </AnimatePresence>
              <ol className="mt-6 flex items-center gap-2" aria-label="Tour stages">
                {campusStages.map((cs, i) => (
                  <li key={cs.id}>
                    <button onClick={() => goTo(i)} aria-label={`Go to stage ${i + 1}: ${cs.title}`} aria-current={i === stage ? 'step' : undefined} className="grid h-8 place-items-center px-0.5">
                      <span className={cn('block h-1.5 rounded-full transition-all duration-500', i === stage ? 'w-10 bg-emerald' : i < stage ? 'w-5 bg-cream/60' : 'w-5 bg-white/70')} />
                    </button>
                  </li>
                ))}
              </ol>
            </div>

            <div className="pointer-events-auto glass hidden w-72 rounded-[2rem] p-5 ring-1 ring-plum/10 xl:block">
              <div className="flex items-center justify-between">
                <p className="eyebrow text-plum/70">Facilities</p>
                <button
                  onClick={() => setMode((m) => (m === 'story' ? 'free' : 'story'))}
                  className="flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1.5 text-xs font-semibold hover:bg-white"
                  aria-pressed={mode === 'free'}
                >
                  {mode === 'story' ? <><Move3d className="size-3.5" aria-hidden="true" />Free explore</> : <><ScrollText className="size-3.5" aria-hidden="true" />Guided tour</>}
                </button>
              </div>
              {mode === 'free' && <p className="mt-2 text-xs text-plum/60">Drag to orbit · scroll the page to continue</p>}
              <ul className="mt-3 grid grid-cols-1 gap-1">
                {campusHotspots.map((h) => (
                  <li key={h.id}>
                    <button onClick={() => onSelect(h.facilityId)} className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm hover:bg-white">
                      <MapPin className="size-4 text-forest" aria-hidden="true" />{h.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/** Accessible, non-3D alternative: illustrated map with hotspot buttons + the tour as a list. */
function MapExplorer({ onSelect, headingLevel }: { onSelect: (id: string) => void; headingLevel: 'h1' | 'h2' }) {
  return (
    <section aria-labelledby="explorer-title" className="bg-sky-100 py-20 text-plum sm:py-28">
      <div className="container-x">
        <SectionHeading
         
          as={headingLevel}
          eyebrow="Campus explorer"
          lines={[<span id="explorer-title">Take a walk</span>, <>through <span className="accent text-violet">our world.</span></>]}
          intro="Tap a marker on the campus map to learn about each space."
        />
        <div className="relative mt-10 overflow-hidden rounded-[2rem] bg-sky ring-1 ring-plum/10">
          <CampusMapSvg />
          <ul>
            {campusHotspots.map((h) => (
              <li key={h.id} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${h.map.x}%`, top: `${h.map.y}%` }}>
                <button onClick={() => onSelect(h.facilityId)} className="flex items-center gap-1.5 rounded-full bg-white py-1 pl-1 pr-2.5 text-[11px] font-semibold text-plum shadow-lg ring-1 ring-plum/10 hover:bg-emerald hover:text-plum sm:text-xs" aria-label={`Open details: ${h.label}`}>
                  <span className="grid size-5 place-items-center rounded-full bg-emerald text-plum"><MapPin className="size-3" aria-hidden="true" /></span>
                  <span className="hidden min-[420px]:inline">{h.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Campus facilities">
          {campusHotspots.map((h) => (
            <li key={h.id}>
              <button onClick={() => onSelect(h.facilityId)} className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-sm font-medium shadow-sm ring-1 ring-plum/10 hover:bg-emerald">
                <MapPin className="size-4 text-forest" aria-hidden="true" />{h.label}
              </button>
            </li>
          ))}
        </ul>
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {campusStages.map((s) => (
            <li key={s.id} className="rounded-[1.5rem] bg-white/75 p-5 ring-1 ring-plum/10">
              <p className="flex items-center gap-2 font-display text-sm text-forest"><Compass className="size-4" aria-hidden="true" />{s.kicker}</p>
              <h3 className="mt-2 font-display text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-plum/75">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function CampusMapSvg() {
  return (
    <svg viewBox="0 0 100 70" className="block h-auto w-full" role="img" aria-label="Illustrated campus map">
      <rect width="100" height="70" fill="#BFE0FF" />
      <ellipse cx="50" cy="35" rx="47" ry="33" fill="#6CCB9F" />
      <path d="M8 52 H92 M50 4 V66" stroke="#FFF8EE" strokeWidth="1.6" strokeLinecap="round" opacity=".9" />
      <circle cx="50" cy="52" r="4" fill="none" stroke="#FFF8EE" strokeWidth="1.4" />
      <ellipse cx="42" cy="11" rx="14" ry="6" fill="#3FA77B" stroke="#FFB99E" strokeWidth="1.4" />
      <rect x="22" y="28" width="22" height="10" rx="1" fill="#FFF8EE" />
      <rect x="22" y="38" width="6" height="10" rx="1" fill="#FFF8EE" />
      <rect x="56" y="25" width="12" height="9" rx="1" fill="#FFB99E" />
      <rect x="68" y="17" width="11" height="9" rx="1" fill="#DCECE1" />
      <path d="M10 20 a6 6 0 0 1 12 0 v4 h-12 z" fill="#6B4EE6" />
      <rect x="12" y="44" width="11" height="8" rx="1" fill="#FFF8EE" />
      <rect x="68" y="42" width="12" height="5" rx="1" fill="#FFB99E" /><rect x="68" y="48" width="12" height="5" rx="1" fill="#D9CBFF" />
      <circle cx="54" cy="60" r="3" fill="#9EC9F0" />
      {[[30, 60], [62, 63], [86, 30], [14, 34], [82, 56], [38, 54]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2.2" fill={i % 2 ? '#20B486' : '#3FA77B'} />)}
    </svg>
  )
}
