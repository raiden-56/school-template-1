import { AnimatePresence, motion } from 'framer-motion'
import { CalendarPlus, ChevronLeft, ChevronRight, Clock, MapPin, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { eventCategories, events, type EventCategory, type SchoolEvent } from '@/data/events'
import { downloadICS } from '@/lib/ics'
import { formatDate, toISODate } from '@/lib/format'
import { cn } from '@/lib/cn'
import { DateBadge } from './NewsMagazine'

const catColor: Record<EventCategory, string> = {
  Academic: 'bg-lavender', Exams: 'bg-peach', Holiday: 'bg-sage', Parents: 'bg-emerald', Sports: 'bg-emerald-300', Cultural: 'bg-peach-200', Competition: 'bg-lavender-200', Admissions: 'bg-violet text-white',
}
const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const occursOn = (e: SchoolEvent, iso: string) => iso >= e.start && iso <= (e.end ?? e.start)

export function EventCard({ e }: { e: SchoolEvent }) {
  return (
    <article className="flex gap-4 rounded-[1.75rem] bg-white p-5">
      <DateBadge iso={e.start} tone="dark" />
      <div className="min-w-0 flex-1">
        <span className={cn('inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold', catColor[e.category])}>{e.category}</span>
        <h3 className="mt-2 font-display text-lg font-semibold leading-snug"><Link to={`/events/${e.slug}`} className="hover:underline">{e.title}</Link></h3>
        <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-strong">
          <span>{formatDate(e.start)}{e.end && ` – ${formatDate(e.end)}`}</span>
          {e.time && <span className="inline-flex items-center gap-1"><Clock className="size-3.5" aria-hidden="true" />{e.time}</span>}
          <span className="inline-flex items-center gap-1"><MapPin className="size-3.5" aria-hidden="true" />{e.location}</span>
        </p>
        <button onClick={() => downloadICS(e)} className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-forest hover:underline">
          <CalendarPlus className="size-4" aria-hidden="true" />Add to calendar
        </button>
      </div>
    </article>
  )
}

/** Month-view events calendar with category filtering and day selection. */
export function EventsCalendar() {
  const first = events.map((e) => e.start).sort()[0]
  const todayIso = toISODate(new Date())
  const startRef = todayIso > first ? todayIso : first
  const [month, setMonth] = useState(() => { const d = new Date(startRef + 'T00:00:00'); return new Date(d.getFullYear(), d.getMonth(), 1) })
  const [cat, setCat] = useState<(typeof eventCategories)[number]>('All')
  const [day, setDay] = useState<string | null>(null)

  const filtered = useMemo(() => (cat === 'All' ? events : events.filter((e) => e.category === cat)), [cat])

  const cells = useMemo(() => {
    const y = month.getFullYear(), m = month.getMonth()
    const offset = (new Date(y, m, 1).getDay() + 6) % 7
    const days = new Date(y, m + 1, 0).getDate()
    const out: (string | null)[] = Array(offset).fill(null)
    for (let d = 1; d <= days; d++) out.push(toISODate(new Date(y, m, d)))
    while (out.length % 7) out.push(null)
    return out
  }, [month])

  const monthKey = toISODate(month).slice(0, 7)
  const inMonth = filtered
    .filter((e) => e.start.slice(0, 7) === monthKey || (e.end ?? e.start).slice(0, 7) === monthKey)
    .filter((e) => !day || occursOn(e, day))
    .sort((a, b) => a.start.localeCompare(b.start))

  const label = new Intl.DateTimeFormat('en-IN', { month: 'long', year: 'numeric' }).format(month)
  const shift = (d: number) => { setDay(null); setMonth((m) => new Date(m.getFullYear(), m.getMonth() + d, 1)) }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-[2rem] bg-white p-4 sm:p-7">
        <div role="group" aria-label="Filter events by category" className="scrollbar-none -mx-1 mb-6 flex gap-2 overflow-x-auto px-1">
          {eventCategories.map((c) => (
            <button key={c} onClick={() => { setCat(c); setDay(null) }} aria-pressed={cat === c} className={cn('shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium', cat === c ? 'bg-violet text-white' : 'bg-cream hover:bg-sage')}>{c}</button>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <button onClick={() => shift(-1)} aria-label="Previous month" className="grid size-11 place-items-center rounded-full bg-cream hover:bg-sage"><ChevronLeft className="size-5" /></button>
          <h2 className="font-display text-xl font-semibold sm:text-2xl" aria-live="polite">{label}</h2>
          <button onClick={() => shift(1)} aria-label="Next month" className="grid size-11 place-items-center rounded-full bg-cream hover:bg-sage"><ChevronRight className="size-5" /></button>
        </div>
        <table className="mt-6 w-full table-fixed border-separate border-spacing-1">
          <caption className="sr-only">Events in {label}. Select a day to filter the list.</caption>
          <thead><tr>{weekdays.map((w) => <th key={w} scope="col" className="pb-2 text-xs font-semibold uppercase tracking-wider text-muted-strong"><span className="sm:hidden">{w[0]}</span><span className="hidden sm:inline">{w}</span></th>)}</tr></thead>
          <tbody>
            {Array.from({ length: cells.length / 7 }).map((_, r) => (
              <tr key={r}>
                {cells.slice(r * 7, r * 7 + 7).map((iso, c) => {
                  if (!iso) return <td key={c} />
                  const evs = filtered.filter((e) => occursOn(e, iso))
                  const selected = day === iso
                  return (
                    <td key={c} className="p-0 align-top">
                      <button
                        onClick={() => setDay(selected ? null : iso)}
                        aria-pressed={selected}
                        aria-label={`${formatDate(iso)}${evs.length ? `, ${evs.length} event${evs.length > 1 ? 's' : ''}: ${evs.map((e) => e.title).join(', ')}` : ', no events'}`}
                        className={cn('flex h-12 w-full flex-col items-center rounded-xl pt-1.5 text-sm transition-colors sm:h-20 sm:items-start sm:px-2', selected ? 'bg-violet text-white' : evs.length ? 'bg-sage hover:bg-emerald/40' : 'hover:bg-cream', iso === todayIso && !selected && 'ring-2 ring-emerald')}
                      >
                        <span className="font-semibold">{Number(iso.slice(8))}</span>
                        <span className="mt-1 flex gap-0.5 sm:hidden">{evs.slice(0, 3).map((e) => <span key={e.slug} className="size-1.5 rounded-full bg-forest" />)}</span>
                        <span className="mt-1 hidden w-full truncate text-left text-[11px] leading-tight sm:block">{evs[0]?.title}{evs.length > 1 && ` +${evs.length - 1}`}</span>
                      </button>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-display text-2xl font-semibold">{day ? formatDate(day) : `Events in ${label}`}</h2>
          {day && <button onClick={() => setDay(null)} className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-sm"><X className="size-4" aria-hidden="true" />Clear day</button>}
        </div>
        <ul className="mt-6 space-y-4" aria-live="polite">
          <AnimatePresence mode="popLayout">
            {inMonth.map((e) => (
              <motion.li key={e.slug} layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><EventCard e={e} /></motion.li>
            ))}
          </AnimatePresence>
          {!inMonth.length && <li className="rounded-[1.75rem] border-2 border-dashed border-plum/15 p-8 text-center text-muted-strong">No events{cat !== 'All' ? ` in “${cat}”` : ''} for this {day ? 'day' : 'month'}.</li>}
        </ul>
      </div>
    </div>
  )
}
