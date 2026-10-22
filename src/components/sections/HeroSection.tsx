import { motion } from 'framer-motion'
import { CalendarCheck, Sparkles } from 'lucide-react'
import { lazy, useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ButtonLink } from '@/components/ui/Button'
import { RevealText } from '@/components/ui/Reveal'
import { Scene3D } from '@/components/three/Scene3D'
import { IslandFallback } from '@/components/three/fallbacks'
import { useSetHeaderTone } from '@/components/layout/HeaderTone'
import { ScrollTrigger } from '@/lib/gsap'
import { school } from '@/config/school'

const HeroCampusScene = lazy(() => import('@/components/three/HeroCampusScene'))

const chips = [
  { text: 'A/C classrooms', cls: 'left-4 top-5 bg-white text-plum sm:left-6 sm:top-6' },
  { text: '100% Class X results', cls: 'right-4 top-16 bg-sun text-plum sm:right-6 sm:top-20' },
  { text: 'Two playgrounds', cls: 'bottom-5 left-6 bg-peach text-plum sm:bottom-6 sm:left-10' },
]

/** Section A — compact, single-screen hero: copy on the left, 3D floating campus in its own card. */
export function HeroSection() {
  useSetHeaderTone('light')
  const section = useRef<HTMLElement>(null)
  const scrollRef = useRef(0)

  useLayoutEffect(() => {
    const el = section.current
    if (!el) return
    const st = ScrollTrigger.create({ trigger: el, start: 'top top', end: 'bottom top', onUpdate: (s) => { scrollRef.current = s.progress } })
    return () => st.kill()
  }, [])

  return (
    <section
      ref={section}
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-[linear-gradient(160deg,#F3EFFF_0%,#FFF8EE_50%,#E3F6EC_100%)] text-plum"
    >
      {/* soft colour atmosphere */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-24 size-[420px] rounded-full bg-emerald/15 blur-[110px]" />
        <div className="absolute right-0 top-10 size-[520px] rounded-full bg-lavender/70 blur-[130px]" />
        <div className="absolute bottom-0 left-1/3 size-[320px] rounded-full bg-peach/40 blur-[110px]" />
        <div className="dot-grid absolute inset-0 text-plum/[0.06]" />
      </div>

      <div className="container-x relative grid items-center gap-6 pb-8 pt-[8rem] sm:gap-10 sm:pb-12 sm:pt-36 lg:min-h-[100svh] lg:grid-cols-[1fr_1.05fr] lg:gap-12 lg:pb-10 lg:pt-32">
        {/* copy */}
        <div className="max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-forest shadow-sm ring-1 ring-plum/5 sm:text-sm"
          >
            <Sparkles className="size-4 text-violet" aria-hidden="true" /> {school.admissionsOpen ? 'Admission enquiries open · Nursery to Class X' : `CBSE affiliated · ${school.affiliation.affiliationNumber}`}
          </motion.p>

          <RevealText
            as="h1"
            immediate
            delay={0.15}
            className="mt-4 font-display text-[2.15rem] font-semibold leading-[1.05] tracking-tight sm:mt-6 sm:text-5xl lg:text-[3.4rem] xl:text-[3.9rem]"
            lines={[
              <span id="hero-title">The Path to</span>,
              <>
                <span className="accent text-violet">Knowledge.</span>
              </>,
            ]}
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-4 max-w-md text-[15px] leading-relaxed text-muted-strong sm:mt-5 sm:text-lg"
          >
            New Pratham Public School, K R Puram — empowering students to excel academically, grow personally, and lead with confidence.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 0.65 } } }}
            className="mt-6 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap sm:mt-8"
          >
            <motion.div variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}>
              <ButtonLink to="#about-universe" className="w-full min-[420px]:w-auto">Discover NPPS</ButtonLink>
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}>
              <ButtonLink to="/admissions" variant="dark" className="w-full min-[420px]:w-auto">Start Your Admission Journey</ButtonLink>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.95 }} className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <Link to="/visit" className="link-underline inline-flex items-center gap-2 font-semibold text-forest">
              <CalendarCheck className="size-4" aria-hidden="true" /> Book a Campus Visit
            </Link>
            <span className="hidden text-muted-strong sm:inline">CBSE · Affiliation No. {school.affiliation.affiliationNumber}</span>
          </motion.div>
        </div>

        {/* 3D floating campus card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative h-[34svh] min-h-[230px] overflow-hidden rounded-[2rem] bg-[linear-gradient(150deg,#ECE5FF_0%,#EEF7FF_55%,#E3F6EC_100%)] shadow-[0_40px_90px_-50px_rgba(107,78,230,.55)] ring-1 ring-white sm:h-[46svh] sm:rounded-[2.5rem] lg:h-[min(68svh,620px)]"
        >
          <Scene3D className="h-full w-full" fallback={<div className="grid h-full place-items-center p-6"><IslandFallback className="max-h-full" /></div>} rootMargin="0px" fallbackOnReducedMotion>
            {(p) => <HeroCampusScene {...p} scrollRef={scrollRef} offsetX={0} />}
          </Scene3D>
          {chips.map((c, i) => (
            <motion.span
              key={c.text}
              aria-hidden="true"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.15 }}
              className={`pointer-events-none absolute hidden rounded-full px-3.5 py-1.5 font-display text-xs font-semibold shadow-lg min-[420px]:block sm:text-sm ${c.cls}`}
            >
              {c.text}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
