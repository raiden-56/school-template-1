import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Megaphone, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { school } from '@/config/school'
import { usePrefersReducedMotion } from '@/lib/hooks'

const KEY = `nv-announcement-dismissed-${school.academicYear}`

function readDismissed() {
  try { return localStorage.getItem(KEY) === '1' } catch { return false }
}

export function AnnouncementTicker({ hidden }: { hidden: boolean }) {
  const [dismissed, setDismissed] = useState(readDismissed)
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduced = usePrefersReducedMotion()
  const items = school.announcements

  useEffect(() => {
    if (paused || reduced || items.length < 2) return
    const t = setInterval(() => setIndex((i) => (i + 1) % items.length), 5000)
    return () => clearInterval(t)
  }, [paused, reduced, items.length])

  if (dismissed || !items.length) return null
  const item = items[index]

  return (
    <motion.div
      initial={false}
      animate={{ height: hidden ? 0 : 'auto', opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden bg-emerald text-plum"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-hidden={hidden || undefined}
      inert={hidden || undefined}
    >
      <div className="container-x flex h-10 items-center gap-3 text-[13px] font-medium sm:text-sm">
        <Megaphone className="hidden size-4 shrink-0 sm:block" aria-hidden="true" />
        <div className="relative h-full min-w-0 flex-1" role="region" aria-label="School announcements">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={index} initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -14, opacity: 0 }} transition={{ duration: 0.35 }} className="absolute inset-0 flex items-center">
              <Link to={item.href} className="group flex min-w-0 items-center gap-2 underline-offset-4 hover:underline">
                <span className="truncate">{item.text}</span>
                <ArrowRight className="size-3.5 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
        {items.length > 1 && (
          <div className="hidden items-center gap-1 sm:flex" aria-label="Choose announcement">
            {items.map((_, i) => (
              <button key={i} onClick={() => setIndex(i)} aria-label={`Show announcement ${i + 1} of ${items.length}`} aria-current={i === index} className="grid size-6 place-items-center">
                <span className={`block h-1.5 rounded-full bg-plum transition-all ${i === index ? 'w-4' : 'w-1.5 opacity-40'}`} />
              </button>
            ))}
          </div>
        )}
        <Link to="/admissions" className="hidden shrink-0 rounded-full bg-violet px-3 py-1 text-xs font-semibold text-white md:inline-block">Admissions</Link>
        <button
          onClick={() => { setDismissed(true); try { localStorage.setItem(KEY, '1') } catch { /* storage unavailable */ } }}
          className="grid size-8 shrink-0 place-items-center rounded-full hover:bg-plum/10"
          aria-label="Dismiss announcements"
        >
          <X className="size-4" />
        </button>
      </div>
    </motion.div>
  )
}
