import { ArrowLeft, CalendarPlus, Clock, FileDown, MapPin, Search, Users } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { PageHero } from '@/components/layout/PageHero'
import { Seo, breadcrumbJsonLd } from '@/components/layout/Seo'
import { useSetHeaderTone } from '@/components/layout/HeaderTone'
import { FeaturedStory, NewsCard } from '@/components/sections/NewsMagazine'
import { EventsCalendar, EventCard } from '@/components/sections/EventsCalendar'
import { ArtImage } from '@/components/ui/ArtImage'
import { ButtonLink } from '@/components/ui/Button'
import { SampleNote } from '@/components/ui/misc'
import { getArticle, news, newsCategories } from '@/data/news'
import { events, getEvent } from '@/data/events'
import { downloadICS } from '@/lib/ics'
import { formatDate } from '@/lib/format'
import { cn } from '@/lib/cn'
import { school } from '@/config/school'
import { NotFoundPage } from './InfoPages'

const PER_PAGE = 6

export function NewsPage() {
  const [params, setParams] = useSearchParams()
  const cat = params.get('category') ?? 'All'
  const q = params.get('q') ?? ''
  const page = Math.max(1, Number(params.get('page') ?? 1))
  // local input state keeps typing responsive; the URL is updated shortly after
  const [term, setTerm] = useState(q)

  const update = (patch: Record<string, string | null>) => {
    const next = new URLSearchParams(params)
    Object.entries(patch).forEach(([k, v]) => (v === null || v === '' || v === 'All' ? next.delete(k) : next.set(k, v)))
    if (!('page' in patch)) next.delete('page')
    setParams(next, { replace: true, preventScrollReset: true })
  }

  useEffect(() => {
    if (term === q) return
    const t = setTimeout(() => update({ q: term }), 200)
    return () => clearTimeout(t)
  }, [term]) // eslint-disable-line react-hooks/exhaustive-deps

  const sorted = useMemo(() => [...news].sort((a, b) => b.date.localeCompare(a.date)), [])
  const filtered = sorted.filter((n) => (cat === 'All' || n.category === cat) && (!q || `${n.title} ${n.excerpt}`.toLowerCase().includes(q.toLowerCase())))
  const showFeatured = cat === 'All' && !q && page === 1
  const featured = showFeatured ? filtered.find((n) => n.featured) : undefined
  const rest = filtered.filter((n) => n !== featured)
  const pages = Math.max(1, Math.ceil(rest.length / PER_PAGE))
  const current = rest.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return (
    <>
      <PageHero tone="cream" seoTitle="News and Notices" title={['News', <>& <span className="accent text-forest">notices.</span></>]} eyebrow="School news" description="Announcements, circulars, results, awards and stories from New Pratham Public School." crumbs={[{ name: 'News', path: '/news' }]} />
      <section className="bg-cream pb-20 sm:pb-28">
        <div className="container-x">
          <SampleNote>Sample articles for demonstration. Downloadable PDFs are sample documents.</SampleNote>
          <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div role="group" aria-label="Filter by category" className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:flex-wrap lg:px-0">
              {newsCategories.map((c) => (
                <button key={c} onClick={() => update({ category: c })} aria-pressed={cat === c} className={cn('shrink-0 rounded-full px-4 py-2 text-sm font-medium', cat === c ? 'bg-violet text-white' : 'bg-white hover:bg-sage')}>{c}</button>
              ))}
            </div>
            <form role="search" onSubmit={(e) => e.preventDefault()} className="relative w-full lg:w-80">
              <label htmlFor="news-search" className="sr-only">Search news</label>
              <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-strong" aria-hidden="true" />
              <input id="news-search" type="search" value={term} onChange={(e) => setTerm(e.target.value)} placeholder="Search news…" className="field !rounded-full !pl-11" />
            </form>
          </div>
          <p className="sr-only" aria-live="polite">{filtered.length} articles found</p>

          {featured && <div className="mt-10"><FeaturedStory a={featured} /></div>}
          {current.length ? (
            <ul className="mt-8 grid gap-4 md:grid-cols-2">{current.map((a) => <li key={a.slug}><NewsCard a={a} /></li>)}</ul>
          ) : !featured && (
            <div className="mt-10 rounded-[2rem] border-2 border-dashed border-plum/15 p-10 text-center">
              <p className="font-display text-xl font-semibold">No articles match your search.</p>
              <button onClick={() => { setTerm(''); setParams({}, { replace: true }) }} className="mt-3 text-sm font-semibold text-forest underline">Clear filters</button>
            </div>
          )}

          {pages > 1 && (
            <nav aria-label="Pagination" className="mt-10 flex justify-center gap-2">
              {Array.from({ length: pages }).map((_, i) => (
                <button key={i} onClick={() => { update({ page: String(i + 1) }); window.scrollTo({ top: 300, behavior: 'smooth' }) }} aria-current={page === i + 1 ? 'page' : undefined} className={cn('grid size-11 place-items-center rounded-full font-semibold', page === i + 1 ? 'bg-violet text-white' : 'bg-white')}>{i + 1}</button>
              ))}
            </nav>
          )}
        </div>
      </section>
    </>
  )
}

export function ArticlePage() {
  const { slug = '' } = useParams()
  const a = getArticle(slug)
  useSetHeaderTone('light')
  if (!a) return <NotFoundPage />
  const related = news.filter((n) => n.slug !== a.slug && n.category === a.category).concat(news.filter((n) => n.slug !== a.slug && n.category !== a.category)).slice(0, 3)
  return (
    <>
      <Seo title={a.title} description={a.excerpt} type="article" jsonLd={[
        { '@context': 'https://schema.org', '@type': 'NewsArticle', headline: a.title, datePublished: a.date, publisher: { '@type': 'Organization', name: school.name } },
        breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'News', path: '/news' }, { name: a.title, path: `/news/${a.slug}` }]),
      ]} />
      <article className="bg-cream pb-20 pt-32 sm:pt-40">
        <div className="container-x max-w-4xl">
          <nav aria-label="Breadcrumb"><Link to="/news" className="inline-flex items-center gap-2 text-sm font-semibold text-forest"><ArrowLeft className="size-4" aria-hidden="true" />All news</Link></nav>
          <p className="mt-8 flex flex-wrap gap-3 text-sm"><span className="rounded-full bg-violet px-3 py-1 font-semibold text-white">{a.category}</span><time dateTime={a.date} className="py-1 text-muted-strong">{formatDate(a.date)}</time></p>
          <h1 className="mt-5 text-big font-semibold">{a.title}</h1>
          <p className="mt-5 text-xl leading-relaxed text-muted-strong">{a.excerpt}</p>
          <div className="mt-10 aspect-[16/8] overflow-hidden rounded-[2rem]"><ArtImage theme={a.theme} alt={a.title} src={a.image} /></div>
          <div className="prose-school mt-10 text-lg">{a.body.map((p, i) => <p key={i}>{p}</p>)}</div>
          {a.document && <ButtonLink to={a.document.href} download variant="dark" className="mt-4"><FileDown className="size-4" aria-hidden="true" />{a.document.label}</ButtonLink>}
          <SampleNote className="mt-10">This is a sample article.</SampleNote>
        </div>
        <div className="container-x mt-20 max-w-4xl">
          <h2 className="font-display text-2xl font-semibold">More news</h2>
          <ul className="mt-6 grid gap-4">{related.map((r) => <li key={r.slug}><NewsCard a={r} compact /></li>)}</ul>
        </div>
      </article>
    </>
  )
}

export function EventsPage() {
  return (
    <>
      <PageHero tone="sage" seoTitle="Events Calendar" title={['Events', <span className="accent text-forest">calendar.</span>]} eyebrow={`Academic year ${school.academicYear}`} description="The school’s Calendar of Events and Holiday List — periodic assessments, holidays, celebrations and sports days. Add any event to your own calendar." crumbs={[{ name: 'News', path: '/news' }, { name: 'Events', path: '/events' }]}>
        <ButtonLink to="http://www.newprathampublicschool.in/AcademicCalendar/academiccalendar.pdf" variant="dark">Download academic calendar (PDF)</ButtonLink>
      </PageHero>
      <section className="bg-sage pb-20 sm:pb-28">
        <div className="container-x">
          <SampleNote className="mb-6">Sample calendar — replace with the school’s approved academic calendar in <code>src/data/events.ts</code>.</SampleNote>
          <EventsCalendar />
        </div>
      </section>
    </>
  )
}

export function EventDetailPage() {
  const { slug = '' } = useParams()
  const e = getEvent(slug)
  useSetHeaderTone('dark')
  if (!e) return <NotFoundPage />
  const more = events.filter((x) => x.slug !== e.slug && x.start >= e.start).slice(0, 2)
  return (
    <>
      <Seo title={e.title} description={e.description} jsonLd={{
        '@context': 'https://schema.org', '@type': 'Event', name: e.title, startDate: e.start, endDate: e.end ?? e.start, description: e.description,
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode', location: { '@type': 'Place', name: `${e.location}, ${school.name}`, address: school.contact.addressLines.slice(1).join(', ') },
      }} />
      <section className="bg-violet-100 pb-16 pt-32 text-plum sm:pt-40">
        <div className="container-x max-w-4xl">
          <Link to="/events" className="inline-flex items-center gap-2 text-sm font-semibold text-forest"><ArrowLeft className="size-4" aria-hidden="true" />Events calendar</Link>
          <p className="mt-8"><span className="rounded-full bg-emerald px-3 py-1 text-sm font-semibold text-plum">{e.category}</span></p>
          <h1 className="mt-5 text-giant font-semibold">{e.title}</h1>
          <dl className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              [CalendarPlus, 'Date', `${formatDate(e.start)}${e.end ? ` – ${formatDate(e.end)}` : ''}`],
              [Clock, 'Time', e.time ?? 'All day'],
              [MapPin, 'Location', e.location],
              [Users, 'For', e.audience],
            ].map(([Icon, k, v]) => {
              const I = Icon as typeof Clock
              return <div key={k as string} className="flex gap-3 rounded-2xl bg-white/80 p-4"><I className="mt-0.5 size-5 text-forest" aria-hidden="true" /><div><dt className="text-sm text-plum/60">{k as string}</dt><dd className="font-semibold">{v as string}</dd></div></div>
            })}
          </dl>
        </div>
      </section>
      <section className="bg-cream py-16">
        <div className="container-x max-w-4xl">
          <p className="text-xl leading-relaxed">{e.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={() => downloadICS(e)} className="inline-flex items-center gap-2 rounded-full bg-violet px-6 py-3 font-display font-semibold text-white hover:bg-[#5a3fd1]"><CalendarPlus className="size-4" aria-hidden="true" />Add to calendar</button>
            {e.category === 'Admissions' && <ButtonLink to="/visit">Book a visit</ButtonLink>}
          </div>
          {more.length > 0 && (
            <>
              <h2 className="mt-16 font-display text-2xl font-semibold">Coming up next</h2>
              <ul className="mt-6 grid gap-4">{more.map((m) => <li key={m.slug}><EventCard e={m} /></li>)}</ul>
            </>
          )}
        </div>
      </section>
    </>
  )
}
