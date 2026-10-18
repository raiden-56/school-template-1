import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { gsap } from '@/lib/gsap'
import { cn } from '@/lib/cn'

const MOTION_OK = '(prefers-reduced-motion: no-preference)'

/**
 * Layered parallax: moves its wrapper at a different speed to the scroll.
 * Uses GSAP ScrollTrigger on the wrapper only, so children may still use Framer Motion.
 */
export function Parallax({ children, speed = 0.15, className }: { children?: ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const mm = gsap.matchMedia()
    mm.add(MOTION_OK, () => {
      gsap.fromTo(el, { yPercent: -speed * 60 }, {
        yPercent: speed * 60,
        ease: 'none',
        scrollTrigger: { trigger: el.parentElement ?? el, start: 'top bottom', end: 'bottom top', scrub: true },
      })
    })
    return () => mm.revert()
  }, [speed])
  return <div ref={ref} className={cn('will-change-transform', className)}>{children}</div>
}

/**
 * Reveals media through an expanding rounded clipping mask while the inner
 * image settles from a slight zoom. Fully visible when motion is reduced.
 */
export function ClipReveal({ children, className, from = 'inset(14% 18% 14% 18% round 999px)', to = 'inset(0% 0% 0% 0% round 40px)' }: { children: ReactNode; className?: string; from?: string; to?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const mm = gsap.matchMedia()
    mm.add(MOTION_OK, () => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 85%', end: 'center 55%', scrub: 0.8 } })
      tl.fromTo(el, { clipPath: from }, { clipPath: to, ease: 'none' }, 0)
      if (inner.current) tl.fromTo(inner.current, { scale: 1.25 }, { scale: 1, ease: 'none' }, 0)
    })
    return () => mm.revert()
  }, [from, to])
  return (
    <div ref={ref} className={cn('overflow-hidden', className)} style={{ clipPath: to }}>
      <div ref={inner} className="h-full w-full">{children}</div>
    </div>
  )
}
