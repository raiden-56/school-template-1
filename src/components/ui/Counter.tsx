import { animate, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '@/lib/hooks'

/** Counts up once when it enters the viewport; reduced motion shows the final value. */
export function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduced = usePrefersReducedMotion()
  const [display, setDisplay] = useState(() => (reduced ? value : 0))
  const started = useRef(false)

  useEffect(() => {
    if (reduced) { setDisplay(value); return }
    if (!inView || started.current) return
    started.current = true
    const c = animate(0, value, { duration: 1.8, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setDisplay(Math.round(v)) })
    return () => c.stop()
  }, [inView, reduced, value])

  return (
    <span ref={ref}>
      <span className="sr-only">{value}{suffix}</span>
      <span aria-hidden="true">{display}{suffix}</span>
    </span>
  )
}
