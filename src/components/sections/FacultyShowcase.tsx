import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Portrait } from '@/components/ui/Art'
import { SampleNote } from '@/components/ui/misc'
import { ButtonLink } from '@/components/ui/Button'
import { departments, educators, type Educator } from '@/data/faculty'
import { cn } from '@/lib/cn'

export function EducatorCard({ e, index }: { e: Educator; index: number }) {
  return (
    <motion.li layout initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.45, delay: (index % 4) * 0.05 }} className={cn(index % 2 === 1 && 'lg:translate-y-12')}>
      <Link to={`/faculty/${e.id}`} className="group block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] rounded-tl-[5rem]">
          <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105">
            <Portrait name={e.name} tone={e.tone} src={e.photo} />
          </div>
          {/* hover reveal */}
          <div className="absolute inset-x-0 bottom-0 translate-y-full bg-white/95 p-5 text-sm leading-relaxed text-plum shadow-lg backdrop-blur transition-transform duration-500 group-hover:translate-y-0 group-focus-visible:translate-y-0">
            {e.bio}
            <span className="mt-3 flex items-center gap-1 font-semibold text-violet">Full profile <ArrowUpRight className="size-4" aria-hidden="true" /></span>
          </div>
        </div>
        <div className="relative -mt-10 ml-4 mr-8 rounded-[1.5rem] bg-white p-5 shadow-[0_20px_50px_-30px_rgba(33,23,47,.45)]">
          <h3 className="font-display text-lg font-semibold leading-tight">{e.name}</h3>
          <p className="mt-1 text-sm text-forest">{e.role}</p>
          <p className="mt-1 text-xs text-muted-strong">{e.department} · {e.qualifications}</p>
        </div>
      </Link>
    </motion.li>
  )
}

/* Section J — Meet our educators */
export function FacultyShowcase({ limit, showHeading = true }: { limit?: number; showHeading?: boolean }) {
  const [dept, setDept] = useState<(typeof departments)[number]>('All')
  const list = useMemo(() => {
    const f = dept === 'All' ? educators : educators.filter((e) => e.department === dept)
    return limit ? f.slice(0, limit) : f
  }, [dept, limit])
  const available = departments.filter((d) => d === 'All' || educators.some((e) => e.department === d))

  return (
    <section aria-labelledby="faculty-title" className="bg-cream py-20 sm:py-32">
      <div className="container-x">
        {showHeading ? (
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Meet our educators"
              lines={[<span id="faculty-title">The people who</span>, <>light the <span className="accent text-forest">way.</span></>]}
              intro="Experienced, caring teachers who know every child — and keep learning themselves."
            />
            <ButtonLink to="/faculty" variant="outline-dark" className="shrink-0 self-start lg:self-auto">All faculty & staff</ButtonLink>
          </div>
        ) : <h2 id="faculty-title" className="sr-only">Faculty directory</h2>}

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div role="group" aria-label="Filter by department" className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
            {available.map((d) => (
              <button key={d} onClick={() => setDept(d)} aria-pressed={dept === d} className={cn('relative shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors', dept === d ? 'text-cream' : 'text-plum ring-1 ring-plum/15 hover:bg-plum/5')}>
                {dept === d && <motion.span layoutId="dept-pill" className="absolute inset-0 rounded-full bg-violet" />}
                <span className="relative">{d}</span>
              </button>
            ))}
          </div>
          <SampleNote>Sample profiles — replace with approved staff details and photos.</SampleNote>
        </div>

        <motion.ul layout className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 pb-12 min-[480px]:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {list.map((e, i) => <EducatorCard key={e.id} e={e} index={i} />)}
          </AnimatePresence>
        </motion.ul>
        <p className="sr-only" aria-live="polite">{list.length} educators shown</p>
      </div>
    </section>
  )
}
