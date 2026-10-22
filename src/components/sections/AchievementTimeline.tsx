import { motion } from 'framer-motion'
import { Award } from 'lucide-react'
import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ArtImage, type ArtTheme } from '@/components/ui/ArtImage'
import { SampleNote } from '@/components/ui/misc'
import { ButtonLink } from '@/components/ui/Button'
import { achievements, type Achievement } from '@/data/community'
import { gsap } from '@/lib/gsap'
import { cn } from '@/lib/cn'

const themeFor: Record<Achievement['category'], ArtTheme> = {
  Academic: 'award', Sports: 'sports', Awards: 'award', Competitions: 'math',
}

/* Section L — scroll-driven achievement timeline */
export function AchievementTimeline({ limit, filterable = false }: { limit?: number; filterable?: boolean }) {
  const [cat, setCat] = useState<'All' | Achievement['category']>('All')
  const list = useMemo(() => {
    const f = cat === 'All' ? achievements : achievements.filter((a) => a.category === cat)
    return limit ? f.slice(0, limit) : f
  }, [cat, limit])
  const cats = ['All', ...Array.from(new Set(achievements.map((a) => a.category)))] as const

  const wrap = useRef<HTMLOListElement>(null)
  const line = useRef<HTMLSpanElement>(null)
  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(line.current, { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: wrap.current, start: 'top 70%', end: 'bottom 70%', scrub: true } })
    })
    return () => mm.revert()
  }, [list.length])

  return (
    <section aria-labelledby="achievements-title" className="relative overflow-hidden bg-[linear-gradient(160deg,#FFE1D4_0%,#FFF1EA_40%,#ECE5FF_100%)] py-20 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-1/3 size-[420px] rounded-full bg-peach/50 blur-[100px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 bottom-0 size-[420px] rounded-full bg-lavender blur-[100px]" />
      <div className="container-x relative">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Student achievements"
            lines={[<span id="achievements-title">Moments we</span>, <span className="accent text-forest">celebrate.</span>]}
            intro="Achievement is more than trophies — it is growth, persistence and the courage to try."
          />
          <SampleNote>Sample entries only. Publish authentic results, names and photos with approval.</SampleNote>
        </div>

        {filterable && (
          <div role="group" aria-label="Filter achievements" className="mt-10 flex flex-wrap gap-2">
            {cats.map((c) => (
              <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c} className={cn('rounded-full px-4 py-2 text-sm font-medium', cat === c ? 'bg-violet text-white' : 'bg-white/60 hover:bg-white')}>{c}</button>
            ))}
          </div>
        )}

        <ol ref={wrap} className="relative mt-16">
          <span aria-hidden="true" className="absolute bottom-0 left-[19px] top-0 w-0.5 bg-plum/10 lg:left-1/2 lg:-translate-x-1/2" />
          <span ref={line} aria-hidden="true" className="absolute bottom-0 left-[19px] top-0 w-0.5 origin-top bg-forest lg:left-1/2 lg:-translate-x-1/2" />
          {list.map((a, i) => {
            const right = i % 2 === 1
            return (
              <li key={a.id} className="relative pb-14 pl-14 last:pb-0 lg:grid lg:grid-cols-2 lg:gap-16 lg:pl-0">
                <span aria-hidden="true" className="absolute left-0 top-1 grid size-10 place-items-center rounded-full bg-violet text-white ring-8 ring-peach-200/70 lg:left-1/2 lg:-translate-x-1/2">
                  <Award className="size-4" />
                </span>
                <motion.div
                  initial={{ opacity: 0, x: right ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(right ? 'lg:col-start-2' : 'lg:col-start-1 lg:text-right')}
                >
                  <p className="font-display text-5xl font-semibold tracking-tighter text-plum/15 sm:text-6xl">{a.year}</p>
                  <article className={cn('mt-2 overflow-hidden rounded-[2rem] bg-white/80 text-left shadow-[0_30px_60px_-40px_rgba(33,23,47,.5)] backdrop-blur', a.featured && 'ring-2 ring-plum/10')}>
                    {(a.featured || a.image) && <div className="aspect-[16/8]"><ArtImage theme={themeFor[a.category]} alt={a.title} src={a.image} seed={i} /></div>}
                    <div className={cn('p-6', a.featured && 'sm:p-8')}>
                      <span className="rounded-full bg-lavender px-3 py-1 text-xs font-semibold">{a.category}</span>
                      <h3 className={cn('mt-4 font-display font-semibold', a.featured ? 'text-2xl sm:text-3xl' : 'text-xl')}>{a.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-strong">{a.description}</p>
                    </div>
                  </article>
                </motion.div>
              </li>
            )
          })}
        </ol>
        {limit && (
          <div className="mt-16 text-center"><ButtonLink to="/student-life/achievements" variant="dark">All achievements</ButtonLink></div>
        )}
      </div>
    </section>
  )
}
