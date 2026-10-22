import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArtImage } from '@/components/ui/ArtImage'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Parallax } from '@/components/ui/ScrollFx'
import { activities, type Activity } from '@/data/community'
import { gsap } from '@/lib/gsap'
import { useIsDesktop, usePrefersReducedMotion } from '@/lib/hooks'
import { cn } from '@/lib/cn'

const widths: Record<Activity['aspect'], string> = {
  tall: 'w-[24vw] h-[62vh]',
  wide: 'w-[40vw] h-[50vh]',
  square: 'w-[30vw] h-[44vh]',
}

function Heading() {
  return (
    <SectionHeading
     
      eyebrow="Student life"
      lines={[<span id="life-title">Beyond the</span>, <span className="accent text-coral">classroom.</span>]}
      intro="Sport, music, art, robotics, debate, service — every child finds a place to shine and a team to belong to."
    />
  )
}

/** Desktop: pinned horizontal sequence driven by GSAP ScrollTrigger. */
function HorizontalGallery() {
  const pin = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const t = track.current!
      const distance = () => t.scrollWidth - window.innerWidth
      gsap.to(t, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: { trigger: pin.current, start: 'top top', end: () => `+=${distance()}`, pin: true, scrub: 0.8, invalidateOnRefresh: true, anticipatePin: 1 },
      })
    }, pin)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={pin} className="relative h-[100svh] overflow-hidden">
      <div ref={track} className="flex h-full w-max items-center gap-10 pl-[max(2.5rem,calc((100vw-88rem)/2+2.5rem))] pr-[10vw]">
        <div className="w-[34vw] shrink-0 pr-6">
          <Heading />
          <Link to="/student-life" className="group mt-8 inline-flex items-center gap-2 font-display font-semibold text-forest">
            All activities <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
        {activities.map((a, i) => (
          <figure key={a.id} className={cn('relative shrink-0', i % 2 ? 'self-end mb-[10vh]' : 'self-start mt-[16vh]')}>
            <div className={cn('overflow-hidden rounded-[2rem]', widths[a.aspect], i % 3 === 0 && 'rounded-tr-[6rem]', i % 3 === 1 && 'rounded-bl-[6rem]')}>
              <ArtImage theme={a.theme} alt={a.title} src={a.image} seed={i} />
            </div>
            <figcaption className={cn('absolute max-w-[260px] rounded-2xl bg-white p-4 text-plum shadow-2xl', i % 2 ? '-top-10 left-6' : '-bottom-10 right-6')}>
              <span className="font-display text-xs text-forest">{String(i + 1).padStart(2, '0')}</span>
              <span className="block font-display text-lg font-semibold">{a.title}</span>
              <span className="mt-1 block text-sm leading-snug text-muted-strong">{a.caption}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}

/** Mobile & reduced motion: vertical editorial grid with alternating reveals. */
function VerticalGallery() {
  return (
    <div className="container-x py-20 sm:py-28">
      <Heading />
      <ul className="mt-12 grid gap-10 sm:grid-cols-2">
        {activities.map((a, i) => (
          <motion.li key={a.id} initial={{ opacity: 0, x: i % 2 ? 40 : -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.7 }} className={cn(i % 2 === 1 && 'sm:mt-16')}>
            <figure>
              <div className={cn('overflow-hidden rounded-[2rem]', a.aspect === 'tall' ? 'aspect-[3/4]' : a.aspect === 'wide' ? 'aspect-[4/3]' : 'aspect-square')}>
                <ArtImage theme={a.theme} alt={a.title} src={a.image} seed={i} />
              </div>
              <figcaption className="mt-4">
                <span className="font-display text-xl font-semibold">{a.title}</span>
                <span className="mt-1 block text-sm leading-relaxed text-plum/75">{a.caption}</span>
              </figcaption>
            </figure>
          </motion.li>
        ))}
      </ul>
      <Link to="/student-life" className="mt-12 inline-flex items-center gap-2 font-display font-semibold text-forest">All activities <ArrowRight className="size-4" aria-hidden="true" /></Link>
    </div>
  )
}

/* Section K */
export function StudentLifeGallery() {
  const desktop = useIsDesktop()
  const reduced = usePrefersReducedMotion()
  return (
    <section aria-labelledby="life-title" className="relative overflow-hidden bg-rose-100 text-plum">
      <Parallax speed={0.4} className="pointer-events-none absolute right-[8%] top-[12%]"><span aria-hidden="true" className="block size-24 rounded-full border border-lavender/30" /></Parallax>
      <Parallax speed={-0.3} className="pointer-events-none absolute bottom-[14%] left-[42%]"><span aria-hidden="true" className="block size-6 rounded-full bg-peach/70" /></Parallax>
      {desktop && !reduced ? <HorizontalGallery /> : <VerticalGallery />}
    </section>
  )
}
