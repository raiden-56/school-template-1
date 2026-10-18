import { motion } from 'framer-motion'
import { Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { ScrollTrigger } from '@/lib/gsap'
import { FloatingNavbar } from './FloatingNavbar'
import { OrbitalFooter } from './OrbitalFooter'

function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      // wait for lazy content to mount before scrolling to an anchor
      const t = setTimeout(() => document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 350)
      return () => clearTimeout(t)
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash])

  // Recalculate scroll-trigger positions once the new page (and its fonts/images) settle.
  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 600)
    return () => clearTimeout(t)
  }, [pathname])

  // Lazy content (forms, 3D fallbacks, fonts) can change the page height after load;
  // re-measure pinned/scrubbed sections when that happens.
  useEffect(() => {
    let last = document.body.scrollHeight
    let timer: ReturnType<typeof setTimeout>
    const ro = new ResizeObserver(() => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        const h = document.body.scrollHeight
        if (Math.abs(h - last) > 2) { ScrollTrigger.refresh(); last = document.body.scrollHeight }
      }, 250)
    })
    ro.observe(document.body)
    return () => { ro.disconnect(); clearTimeout(timer) }
  }, [])
  return null
}

export function PageLoader() {
  return (
    <div className="grid min-h-[70vh] place-items-center bg-cream" role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-4 text-plum">
        <div className="relative size-16">
          <span className="absolute inset-0 animate-spin rounded-full border-2 border-plum/15 border-t-emerald" />
          <span className="absolute inset-4 rounded-full bg-emerald/80" />
        </div>
        <span className="text-sm text-plum/70">Loading…</span>
      </div>
    </div>
  )
}

export function Layout() {
  const { pathname } = useLocation()
  return (
    <>
      <a href="#main" className="sr-only z-[200] rounded-full bg-emerald px-5 py-3 font-semibold text-plum focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>
      <ScrollManager />
      <FloatingNavbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <Suspense fallback={<PageLoader />}>
          <motion.div key={pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }}>
            <Outlet />
          </motion.div>
        </Suspense>
      </main>
      <OrbitalFooter />
    </>
  )
}
