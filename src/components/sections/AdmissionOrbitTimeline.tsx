import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ButtonLink } from '@/components/ui/Button'
import { RevealText } from '@/components/ui/Reveal'
import { admissionSteps } from '@/data/admissions'
import { gsap } from '@/lib/gsap'
import { school } from '@/config/school'

/* Section O — admissions as an orbital journey. The steps are a plain ordered list;
   the connecting orbit path is decorative and drawn as the visitor scrolls. */
export function AdmissionOrbitTimeline({ showIntro = true }: { showIntro?: boolean }) {
  const wrap = useRef<HTMLDivElement>(null)
  const path = useRef<SVGPathElement>(null)
  const mobileLine = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const p = path.current
      if (p) gsap.fromTo(p, { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: wrap.current, start: 'top 75%', end: 'bottom 60%', scrub: true } })
      gsap.fromTo(mobileLine.current, { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: wrap.current, start: 'top 75%', end: 'bottom 70%', scrub: true } })
    })
    return () => mm.revert()
  }, [])

  return (
    <section aria-labelledby="admissions-title" className="relative overflow-hidden bg-mint py-20 text-plum sm:py-32">
      <svg aria-hidden="true" className="pointer-events-none absolute -left-40 top-10 size-[600px] opacity-30" viewBox="0 0 400 400">
        <circle cx="200" cy="200" r="190" fill="none" stroke="#D9CBFF" className="orbit-line" />
        <circle cx="200" cy="200" r="120" fill="none" stroke="#20B486" className="orbit-line" />
      </svg>
      <div className="container-x relative">
        {showIntro && (
          <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end">
            <div>
              <p className="eyebrow text-forest">Admissions {school.academicYear}</p>
              <RevealText as="h2" className="mt-5 text-giant font-semibold" lines={[<span id="admissions-title">Every Great Future</span>, <>Starts With <span className="accent text-forest">One Step.</span></>]} />
            </div>
            <div>
              <p className="text-lg leading-relaxed text-plum/75">Discover the right learning environment for your child and take the next step with confidence.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink to="/admissions/apply">Start your enquiry</ButtonLink>
                <ButtonLink to="/admissions" variant="outline-light">Admission details</ButtonLink>
              </div>
            </div>
          </div>
        )}
        {!showIntro && <h2 id="admissions-title" className="font-display text-big font-semibold">The admission journey</h2>}

        <div ref={wrap} className="relative mt-16">
          {/* desktop orbit path behind the two rows of steps */}
          <svg aria-hidden="true" className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block" viewBox="0 0 1000 600" preserveAspectRatio="none">
            <path d="M40 60 H900 C 990 60, 990 300, 900 300 H100 C 10 300, 10 540, 100 540 H960" fill="none" stroke="#BFE3CF" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            <path ref={path} pathLength={1} strokeDasharray="1" d="M40 60 H900 C 990 60, 990 300, 900 300 H100 C 10 300, 10 540, 100 540 H960" fill="none" stroke="#20B486" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          </svg>
          <span aria-hidden="true" className="absolute bottom-6 left-[23px] top-6 w-px bg-white/70 lg:hidden" />
          <span ref={mobileLine} aria-hidden="true" className="absolute bottom-6 left-[23px] top-6 w-px origin-top bg-emerald lg:hidden" />

          <ol className="relative grid gap-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
            {admissionSteps.map((s, i) => (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
                className="relative flex gap-5 lg:block"
              >
                <span className="relative z-10 grid size-12 shrink-0 place-items-center rounded-full bg-emerald font-display text-lg font-semibold text-plum ring-8 ring-mint">
                  {i + 1}
                  <span aria-hidden="true" className="absolute -inset-3 animate-spin-slow rounded-full border border-dashed border-emerald/40" />
                </span>
                <div className="flex-1 rounded-[1.75rem] bg-white/75 p-6 ring-1 ring-plum/10 backdrop-blur lg:mt-5">
                  <h3 className="font-display text-xl font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-plum/75">{s.text}</p>
                  {s.cta && (
                    <Link to={s.cta.href} className="group mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-forest">
                      {s.cta.label} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
