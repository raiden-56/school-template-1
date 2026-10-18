import { AnimatePresence, motion, type PanInfo } from 'framer-motion'
import { ArrowUpRight, ChevronLeft, ChevronRight, Clock, Lock, Mail, MapPin, Navigation, Phone, Quote } from 'lucide-react'
import { lazy, useState } from 'react'
import { Link } from 'react-router-dom'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ButtonLink } from '@/components/ui/Button'
import { RevealText, staggerItem, staggerParent } from '@/components/ui/Reveal'
import { Accordion } from '@/components/ui/Accordion'
import { SampleNote, SocialGlyph } from '@/components/ui/misc'
import { Scene3D } from '@/components/three/Scene3D'
import { CompassFallback, OrbitFallback } from '@/components/three/fallbacks'
import { MultiStepEnquiryForm } from '@/components/forms'
import { ContactForm } from '@/components/forms'
import { hubTiles, faqs, type HubTile } from '@/data/info'
import { testimonials } from '@/data/community'
import { school } from '@/config/school'
import { cn } from '@/lib/cn'

const CompassScene = lazy(() => import('@/components/three/CompassScene'))
const GlobeScene = lazy(() => import('@/components/three/GlobeScene'))

export const directionsUrl = school.contact.mapsUrl ?? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(school.contact.mapsQuery)}`

/* Section P — enquiry form block */
export function EnquirySection() {
  return (
    <section aria-labelledby="enquiry-title" className="relative overflow-hidden bg-lavender-200 py-20 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 size-[520px] rounded-full bg-lavender blur-3xl" />
      <div className="container-x relative grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Admission enquiry"
            lines={[<span id="enquiry-title">Let’s begin</span>, <>the <span className="accent text-forest">conversation.</span></>]}
            intro="Share a few details and our admissions team will get in touch to help you plan a visit and next steps."
          />
          <ul className="mt-8 space-y-3 text-sm text-muted-strong">
            <li className="flex gap-3"><Lock className="size-5 shrink-0 text-forest" aria-hidden="true" />We only ask for what we need to respond. See our <Link to="/privacy" className="underline">privacy policy</Link>.</li>
            <li className="flex gap-3"><Clock className="size-5 shrink-0 text-forest" aria-hidden="true" />Takes about two minutes.</li>
          </ul>
        </div>
        <MultiStepEnquiryForm />
      </div>
    </section>
  )
}

/* Section R — parent & student hub */
const tileTone: Record<HubTile['tone'], string> = {
  lavender: 'bg-lavender', peach: 'bg-peach-200', sage: 'bg-sage', emerald: 'bg-emerald', plum: 'bg-violet text-white', cream: 'bg-white ring-1 ring-plum/10',
}

export function HubTileCard({ t }: { t: HubTile }) {
  const Icon = t.icon
  const inner = (
    <>
      <span className={cn('grid size-11 place-items-center rounded-2xl', t.tone === 'plum' ? 'bg-white/15' : 'bg-white/60')}><Icon className="size-5" strokeWidth={1.7} aria-hidden="true" /></span>
      <span className="mt-6 block font-display text-lg font-semibold leading-tight">{t.title}</span>
      <span className={cn('mt-1 block text-sm', t.tone === 'plum' ? 'text-white/85' : 'text-plum/70')}>{t.text}</span>
    </>
  )
  const cls = cn('group relative flex h-full flex-col rounded-[1.75rem] p-5 transition-transform duration-300', tileTone[t.tone])
  if (!t.href) {
    return (
      <div className={cn(cls, 'opacity-80')} aria-disabled="true">
        {inner}
        <span className="mt-3 inline-flex w-fit items-center gap-1 rounded-full bg-black/10 px-2.5 py-1 text-[11px] font-semibold"><Lock className="size-3" aria-hidden="true" />Link not configured yet</span>
      </div>
    )
  }
  const arrow = <ArrowUpRight className="absolute right-4 top-4 size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
  if (t.external || t.href.endsWith('.pdf')) {
    return <a href={t.href} className={cn(cls, 'hover:-translate-y-1')} {...(t.external ? { target: '_blank', rel: 'noopener noreferrer' } : { download: true })}>{inner}{arrow}{t.external && <span className="sr-only">(opens in a new tab)</span>}</a>
  }
  return <Link to={t.href} className={cn(cls, 'hover:-translate-y-1')}>{inner}{arrow}</Link>
}

export function ParentStudentHub({ audience = 'both', showHeading = true }: { audience?: 'parents' | 'students' | 'both'; showHeading?: boolean }) {
  const tiles = hubTiles.filter((t) => audience === 'both' || t.audience === audience || t.audience === 'both')
  return (
    <section aria-labelledby="hub-title" className="bg-cream py-20 sm:py-32">
      <div className="container-x">
        {showHeading ? (
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Parent & student hub"
              lines={[<span id="hub-title">Everything you need,</span>, <span className="accent text-forest">one tap away.</span>]}
              intro="Portals, calendars, timetables, policies and resources for enrolled families and students."
            />
            <div className="flex shrink-0 gap-3"><ButtonLink to="/parents" variant="outline-dark">Parent resources</ButtonLink><ButtonLink to="/students" variant="dark">Student resources</ButtonLink></div>
          </div>
        ) : <h2 id="hub-title" className="sr-only">Resources</h2>}
        <motion.ul variants={staggerParent} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }} className="mt-12 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-5">
          {tiles.map((t) => <motion.li key={t.title} variants={staggerItem}><HubTileCard t={t} /></motion.li>)}
        </motion.ul>
        <SampleNote className="mt-6">Portal links are configured in <code>src/config/school.ts</code>. Student records are only available inside the secure portals.</SampleNote>
      </div>
    </section>
  )
}

/* Section S — testimonials */
export function TestimonialCarousel() {
  const [i, setI] = useState(0)
  const [dir, setDir] = useState(1)
  const n = testimonials.length
  const go = (d: number) => { setDir(d); setI((x) => (x + d + n) % n) }
  const t = testimonials[i]
  if (!n) return null
  return (
    <section aria-labelledby="voices-title" aria-roledescription="carousel" className="relative overflow-hidden bg-lavender py-20 sm:py-32">
      <OrbitFallback className="pointer-events-none absolute -right-24 -top-24 size-[420px] opacity-30" label="" />
      <div className="container-x relative">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading eyebrow="Voices" lines={[<span id="voices-title">In their</span>, <span className="accent text-forest">own words.</span>]} />
          <SampleNote>Placeholders only — no real reviews are shown. Publish feedback only with consent.</SampleNote>
        </div>
        <div className="mt-12 grid items-center gap-8 lg:grid-cols-[1fr_auto]">
          <div className="relative min-h-[300px] overflow-hidden sm:min-h-[260px]" aria-live="polite">
            <AnimatePresence mode="wait" custom={dir} initial={false}>
              <motion.figure
                key={t.id}
                custom={dir}
                initial={{ opacity: 0, x: dir * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -60 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(_: unknown, info: PanInfo) => { if (info.offset.x < -50) go(1); else if (info.offset.x > 50) go(-1) }}
                className="cursor-grab touch-pan-y rounded-[2.5rem] bg-cream p-7 active:cursor-grabbing sm:p-12"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${n}`}
              >
                <Quote className="size-10 text-forest/30" aria-hidden="true" />
                <blockquote className="mt-4 font-display text-xl font-medium leading-snug tracking-tight sm:text-3xl">“{t.quote}”</blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  <span className={cn('grid size-12 place-items-center rounded-full font-display font-semibold', t.tone === 'peach' ? 'bg-peach' : t.tone === 'sage' ? 'bg-sage' : 'bg-lavender')} aria-hidden="true">{t.author[0]}</span>
                  <span>
                    <span className="block font-semibold">{t.author}</span>
                    <span className="block text-sm text-muted-strong">{t.relation}</span>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
          <div className="flex items-center gap-3 lg:flex-col">
            <button onClick={() => go(-1)} aria-label="Previous testimonial" className="grid size-14 place-items-center rounded-full bg-violet text-white hover:bg-forest"><ChevronLeft className="size-6" /></button>
            <button onClick={() => go(1)} aria-label="Next testimonial" className="grid size-14 place-items-center rounded-full bg-violet text-white hover:bg-forest"><ChevronRight className="size-6" /></button>
            <p className="font-display text-sm lg:mt-2">{i + 1} / {n}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* Section T — campus visit CTA */
export function CampusVisitCTA() {
  return (
    <section aria-labelledby="visit-title" className="relative flex items-center overflow-hidden bg-[linear-gradient(150deg,#FFF6D9_0%,#FFE1D4_55%,#FFE4EC_100%)] py-20 lg:min-h-[85svh] text-plum">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(32,180,134,.18),transparent_55%)]" />
      <div className="container-x relative grid items-center gap-10 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <p className="eyebrow text-forest">Visit us</p>
          <RevealText as="h2" className="mt-5 text-giant font-semibold" lines={[<span id="visit-title">Your Child’s</span>, 'Next Adventure', <span className="accent text-coral">Is Waiting.</span>]} />
          <p className="mt-6 max-w-lg text-lg text-plum/75">Walk the corridors, peek into classrooms, meet our teachers — and imagine your child here.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink to="/visit" size="lg">Book a Campus Visit</ButtonLink>
            <ButtonLink to="/campus/explorer" variant="outline-light" size="lg">Explore the Campus</ButtonLink>
          </div>
          <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="link-underline mt-6 inline-flex items-center gap-2 text-sm text-plum/80 hover:text-violet">
            <Navigation className="size-4 text-forest" aria-hidden="true" /> Get directions <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
        <Scene3D className="order-1 mx-auto aspect-square w-full max-w-[260px] sm:max-w-[400px] lg:order-2 lg:max-w-[540px]" fallback={<CompassFallback />} fallbackOnReducedMotion>
          {(p) => <CompassScene {...p} />}
        </Scene3D>
      </div>
    </section>
  )
}

/* Section U — FAQ */
export function FAQAccordion({ limit }: { limit?: number }) {
  const list = limit ? faqs.slice(0, limit) : faqs
  return (
    <section aria-labelledby="faq-title" className="bg-cream py-20 sm:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading eyebrow="FAQ" lines={[<span id="faq-title">Questions,</span>, <span className="accent text-forest">answered.</span>]} intro="Can’t find what you’re looking for? Our team is happy to help." />
          <div className="mt-8 flex flex-wrap gap-3"><ButtonLink to="/faq" variant="dark">All FAQs</ButtonLink><ButtonLink to="/contact" variant="outline-dark">Ask a question</ButtonLink></div>
        </div>
        <Accordion items={list.map((f) => ({ title: f.q, content: f.a }))} defaultOpen={0} />
      </div>
    </section>
  )
}

/* Section V — contact */
export function ContactDetails({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const c = school.contact
  const muted = tone === 'dark' ? 'text-white/85' : 'text-muted-strong'
  return (
    <div className="space-y-6">
      <div className="flex gap-4"><MapPin className="mt-1 size-5 shrink-0 text-forest" aria-hidden="true" /><address className={cn('not-italic leading-relaxed', muted)}>{c.addressLines.map((l) => <span key={l} className="block">{l}</span>)}</address></div>
      <div className="flex gap-4"><Phone className="mt-0.5 size-5 shrink-0 text-forest" aria-hidden="true" /><a href={c.phoneHref} className="link-underline font-semibold">{c.phone}</a></div>
      <div className="flex gap-4"><Mail className="mt-0.5 size-5 shrink-0 text-forest" aria-hidden="true" /><div className="flex min-w-0 flex-col"><a href={`mailto:${c.email}`} className="link-underline break-all font-semibold">{c.email}</a><a href={`mailto:${c.admissionsEmail}`} className={cn('link-underline break-all text-sm', muted)}>{c.admissionsEmail} (admissions)</a></div></div>
      <div className="flex gap-4"><Clock className="mt-0.5 size-5 shrink-0 text-forest" aria-hidden="true" /><dl className={cn('grid gap-1 text-sm', muted)}>{c.officeHours.map((h) => <div key={h.days} className="flex flex-wrap gap-x-2"><dt className="font-semibold text-plum">{h.days}:</dt><dd>{h.hours}</dd></div>)}</dl></div>
      <div className="flex flex-wrap items-center gap-3">
        <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-violet px-5 py-3 font-display text-sm font-semibold text-white hover:bg-forest"><Navigation className="size-4" aria-hidden="true" />Get directions<span className="sr-only">(opens in a new tab)</span></a>
        {school.social.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`${s.label} (opens in a new tab)`} className="grid size-11 place-items-center rounded-full bg-white text-plum ring-1 ring-plum/10 hover:bg-emerald"><SocialGlyph label={s.label} /></a>
        ))}
      </div>
    </div>
  )
}

export function ContactSection({ headingLevel = 'h2' }: { headingLevel?: 'h1' | 'h2' }) {
  return (
    <section aria-labelledby="contact-title" className="relative overflow-hidden bg-sage py-20 sm:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <SectionHeading as={headingLevel} eyebrow="Contact us" lines={[<span id="contact-title">Say hello.</span>, <>We’d love to <span className="accent text-forest">hear from you.</span></>]} />
          <div className="relative mt-10">
            <Scene3D className="pointer-events-none absolute -right-10 -top-24 hidden size-64 opacity-90 sm:block lg:-right-4" fallback={<OrbitFallback label="" />} fallbackOnReducedMotion>
              {(p) => <GlobeScene {...p} />}
            </Scene3D>
            <div className="relative"><ContactDetails /></div>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  )
}
