import { motion } from 'framer-motion'
import { ArrowUpRight, CalendarDays, FileDown, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ArtImage } from '@/components/ui/ArtImage'
import { ButtonLink } from '@/components/ui/Button'
import { staggerItem, staggerParent } from '@/components/ui/Reveal'
import { news, type NewsArticle } from '@/data/news'
import { events } from '@/data/events'
import { dayOf, formatDate, monthShort } from '@/lib/format'
import { cn } from '@/lib/cn'

export function DateBadge({ iso, tone = 'light' }: { iso: string; tone?: 'light' | 'dark' }) {
  return (
    <span className={cn('inline-flex flex-col items-center justify-center rounded-2xl px-3 py-2 leading-none', tone === 'dark' ? 'bg-violet text-white' : 'bg-white text-plum shadow')}>
      <span className="font-display text-2xl font-semibold">{dayOf(iso)}</span>
      <span className="mt-1 text-[10px] font-semibold uppercase tracking-widest opacity-70">{monthShort(iso)}</span>
    </span>
  )
}

export function FeaturedStory({ a }: { a: NewsArticle }) {
  return (
    <Link to={`/news/${a.slug}`} className="group relative block overflow-hidden rounded-[2.5rem] bg-white text-plum">
      <div className="aspect-[4/3] transition-transform duration-700 group-hover:scale-105 sm:aspect-[16/11]">
        <ArtImage theme={a.theme} alt={a.title} src={a.image} />
      </div>
      <div className="absolute left-5 top-5"><DateBadge iso={a.date} /></div>
      <div className="absolute inset-x-3 bottom-3 rounded-[2rem] bg-white/92 p-5 shadow-xl backdrop-blur sm:inset-x-5 sm:bottom-5 sm:p-8">
        <span className="rounded-full bg-emerald px-3 py-1 text-xs font-semibold text-plum">{a.category}</span>
        <h3 className="mt-4 max-w-2xl font-display text-2xl font-semibold leading-tight sm:text-4xl">{a.title}</h3>
        <p className="mt-3 line-clamp-2 max-w-xl text-sm text-muted-strong sm:text-base">{a.excerpt}</p>
      </div>
    </Link>
  )
}

export function NewsCard({ a, compact = false }: { a: NewsArticle; compact?: boolean }) {
  return (
    <article className="group relative flex gap-4 rounded-[1.75rem] bg-white p-4 shadow-[0_20px_50px_-40px_rgba(33,23,47,.5)] transition-shadow hover:shadow-[0_30px_60px_-30px_rgba(33,23,47,.45)] sm:gap-5 sm:p-5">
      <div className={cn('shrink-0 overflow-hidden rounded-2xl', compact ? 'size-20 sm:size-24' : 'size-24 sm:size-32')}>
        <ArtImage theme={a.theme} alt="" src={a.image} hideTag />
      </div>
      <div className="min-w-0 flex-1">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-strong">
          <span className="font-semibold text-forest">{a.category}</span>
          <time dateTime={a.date}>{formatDate(a.date)}</time>
        </p>
        <h3 className="mt-1.5 font-display text-base font-semibold leading-snug sm:text-lg">
          <Link to={`/news/${a.slug}`} className="after:absolute after:inset-0">{a.title}</Link>
        </h3>
        {!compact && <p className="mt-1.5 line-clamp-2 text-sm text-muted-strong">{a.excerpt}</p>}
        {a.document && (
          <a href={a.document.href} download className="relative z-10 mt-2 inline-flex items-center gap-1 text-xs font-semibold text-forest hover:underline">
            <FileDown className="size-3.5" aria-hidden="true" /> {a.document.label}
          </a>
        )}
      </div>
      <ArrowUpRight className="absolute right-4 top-4 size-4 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
    </article>
  )
}

/* Section N — news & events (homepage edition) */
export function NewsMagazine() {
  const sorted = [...news].sort((a, b) => b.date.localeCompare(a.date))
  const featured = sorted.find((n) => n.featured) ?? sorted[0]
  const rest = sorted.filter((n) => n !== featured).slice(0, 4)
  const today = new Date().toISOString().slice(0, 10)
  const upcoming = [...events].filter((e) => (e.end ?? e.start) >= today).sort((a, b) => a.start.localeCompare(b.start)).slice(0, 4)

  return (
    <section aria-labelledby="news-title" className="bg-white py-20 sm:py-32">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="News & events"
            lines={[<span id="news-title">What’s happening</span>, <>at <span className="accent text-forest">NPPS.</span></>]}
          />
          <div className="flex shrink-0 gap-3">
            <ButtonLink to="/news" variant="outline-dark">All news</ButtonLink>
            <ButtonLink to="/events" variant="dark">Events calendar</ButtonLink>
          </div>
        </div>
        <div className="mt-14 grid gap-6 lg:grid-cols-[1.25fr_1fr]">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <FeaturedStory a={featured} />
          </motion.div>
          <motion.ul variants={staggerParent} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-4">
            {rest.map((a) => <motion.li key={a.slug} variants={staggerItem}><NewsCard a={a} compact /></motion.li>)}
          </motion.ul>
        </div>

        <div className="mt-16 rounded-[2.5rem] bg-sage p-6 sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h3 className="flex items-center gap-3 font-display text-2xl font-semibold"><CalendarDays className="size-6 text-forest" aria-hidden="true" /> Upcoming events</h3>
            <Link to="/events" className="link-underline text-sm font-semibold text-forest">Full calendar</Link>
          </div>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {upcoming.map((e) => (
              <li key={e.slug}>
                <Link to={`/events/${e.slug}`} className="group flex h-full gap-4 rounded-[1.5rem] bg-cream p-4 transition-colors hover:bg-white">
                  <DateBadge iso={e.start} tone="dark" />
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold text-forest">{e.category}</span>
                    <span className="mt-1 block font-display font-semibold leading-snug">{e.title}</span>
                    <span className="mt-1 flex items-center gap-1 text-xs text-muted-strong"><MapPin className="size-3" aria-hidden="true" />{e.location}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
