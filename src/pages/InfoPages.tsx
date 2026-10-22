import { motion } from 'framer-motion'
import { BookOpen, Compass, FileDown, Home, Lightbulb, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PageHero } from '@/components/layout/PageHero'
import { Seo } from '@/components/layout/Seo'
import { useSetHeaderTone } from '@/components/layout/HeaderTone'
import { ContactDetails, ParentStudentHub } from '@/components/sections/CommunitySections'
import { ContactForm } from '@/components/forms'
import { Accordion } from '@/components/ui/Accordion'
import { ButtonLink } from '@/components/ui/Button'
import { OrbitFallback } from '@/components/three/fallbacks'
import { documents, faqs, officialDocs } from '@/data/info'
import { policies } from '@/data/policies'
import { notPublished, school } from '@/config/school'
import { cn } from '@/lib/cn'

export function ParentsPage() {
  return (
    <>
      <PageHero seoTitle="Parent Resources" title={['Parent', <span className="accent text-sun">resources.</span>]} eyebrow="For families" description="Fee structure, academic calendar, results, notices and mandatory disclosures — everything in one place." crumbs={[{ name: 'Parent Resources', path: '/parents' }]} />
      <ParentStudentHub audience="parents" showHeading={false} />
      <section className="bg-white py-16 sm:py-24" aria-labelledby="docs-title">
        <div className="container-x">
          <h2 id="docs-title" className="font-display text-mid font-semibold">Documents</h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {documents.map((d) => (
              <li key={d.href}><a href={d.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-2xl bg-cream px-5 py-4 font-medium hover:bg-sage"><FileDown className="size-5 text-forest" aria-hidden="true" />{d.label}<span className="ml-auto text-xs text-muted-strong">PDF</span></a></li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

export function StudentsPage() {
  return (
    <>
      <PageHero tone="lavender" seoTitle="Student Resources" title={['Student', <span className="accent text-forest">resources.</span>]} eyebrow="For students" description="Your timetable, syllabus, exam schedules, reading lists and learning tools." crumbs={[{ name: 'Student Resources', path: '/students' }]} />
      <ParentStudentHub audience="students" showHeading={false} />
      <section id="resources" className="scroll-mt-24 bg-white py-16 sm:py-24" aria-labelledby="learn-title">
        <div className="container-x">
          <h2 id="learn-title" className="font-display text-mid font-semibold">Homework & learning resources</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              { icon: BookOpen, t: 'Reading lists', d: 'Age-graded reading lists are shared by the library each term.' },
              { icon: Lightbulb, t: 'Homework', d: 'Homework is posted on the student portal by subject teachers.' },
              { icon: Compass, t: 'Study skills', d: 'Guides on planning, note-taking and revision from your mentor.' },
            ].map(({ icon: Icon, t, d }) => (
              <div key={t} className="rounded-[2rem] bg-cream p-7"><Icon className="size-7 text-forest" aria-hidden="true" /><h3 className="mt-4 font-display text-xl font-semibold">{t}</h3><p className="mt-2 text-sm text-muted-strong">{d}</p></div>
            ))}
          </div>
          <p className="mt-8 text-sm text-muted-strong">Personal records, marks and assignments are only available inside the secure student portal.</p>
        </div>
      </section>
    </>
  )
}

export function ContactPage() {
  return (
    <>
      <PageHero tone="sage" seoTitle="Contact Us" title={['Contact', <span className="accent text-forest">us.</span>]} eyebrow="Get in touch" description="Questions about admissions, fees, transport or anything else? We’re here to help." crumbs={[{ name: 'Contact', path: '/contact' }]} />
      <section className="bg-sage pb-20 sm:pb-28">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[2rem] bg-cream p-7 sm:p-10"><h2 className="mb-8 font-display text-2xl font-semibold">Visit, call or write</h2><ContactDetails /></div>
          <div><h2 className="mb-6 font-display text-2xl font-semibold">Send a message</h2><ContactForm /></div>
        </div>
      </section>
    </>
  )
}

export function FAQPage() {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('All')
  const cats = ['All', ...Array.from(new Set(faqs.map((f) => f.category)))]
  const list = useMemo(() => faqs.filter((f) => (cat === 'All' || f.category === cat) && (!q || `${f.q} ${f.a}`.toLowerCase().includes(q.toLowerCase()))), [q, cat])
  return (
    <>
      <PageHero tone="cream" seoTitle="Frequently Asked Questions" title={['Questions,', <span className="accent text-forest">answered.</span>]} eyebrow="FAQ" description="Quick answers about grades, curriculum, admissions, fees, transport, facilities, safety and more." crumbs={[{ name: 'FAQ', path: '/faq' }]} />
      <Seo title="Frequently Asked Questions" description="Answers to common questions about admissions, curriculum, fees and campus life." jsonLd={{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }} />
      <section className="bg-cream pb-20 sm:pb-28">
        <div className="container-x max-w-4xl">
          <div className="relative">
            <label htmlFor="faq-search" className="sr-only">Search questions</label>
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-strong" aria-hidden="true" />
            <input id="faq-search" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search questions…" className="field !rounded-full !pl-11" />
          </div>
          <div role="group" aria-label="Filter by topic" className="mt-5 flex flex-wrap gap-2">
            {cats.map((c) => <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c} className={cn('rounded-full px-4 py-2 text-sm font-medium', cat === c ? 'bg-violet text-white' : 'bg-white hover:bg-sage')}>{c}</button>)}
          </div>
          <p className="sr-only" aria-live="polite">{list.length} questions shown</p>
          {list.length ? <Accordion key={`${cat}-${q}`} className="mt-8 rounded-[2rem] bg-white px-6 sm:px-8" items={list.map((f) => ({ title: f.q, content: f.a }))} /> : <p className="mt-10 text-center text-muted-strong">No questions match. <Link to="/contact" className="font-semibold text-forest underline">Ask us directly</Link>.</p>}
        </div>
      </section>
    </>
  )
}

export function DisclosuresPage() {
  const a = school.affiliation
  const rows: [string, string][] = [
    ['Name of the school', school.name],
    ['Affiliating board', a.board],
    ['Affiliation number', a.affiliationNumber ?? notPublished],
    ['School code', a.schoolCode ?? notPublished],
    ['Complete address', school.contact.addressLines.slice(1).join(', ')],
    ['Principal', 'Jeevarathnam Reddy K.'],
    ['Principal’s qualification', 'M.A., B.Ed.'],
    ['School email', school.contact.email],
    ['Contact number', '97318 57345'],
    ['Managed by', school.trust],
  ]
  const docs: [string, string][] = [
    ['Affiliation / upgradation letter and recent extension of affiliation', officialDocs.affiliation],
    ['Society / trust registration certificate', officialDocs.trust],
    ['No objection certificate (NOC) issued by the State Government', officialDocs.noc],
    ['Recognition certificate under the RTE Act, 2009', officialDocs.recognition],
    ['Building safety certificate (National Building Code)', officialDocs.building],
    ['Fire safety certificate', officialDocs.fire],
    ['Self-certification submitted for affiliation', officialDocs.selfCertification],
    ['Water, health & sanitation certificates', officialDocs.waterHealth],
  ]
  const academics: [string, string][] = [
    ['Fee structure of the school', officialDocs.fees],
    ['Annual academic calendar', officialDocs.calendar],
    ['List of School Management Committee (SMC)', officialDocs.smc],
    ['List of Parents Teachers Association (PTA) members', officialDocs.pta],
    ['Last three years’ results of the board examination', officialDocs.results],
  ]
  const staff: [string, string][] = [
    ['Principal', 'Jeevarathnam Reddy K.'],
    ['Total number of teachers', '43 (PGT 4 · TGT 22 · PRT 16)'],
    ['Teacher–section ratio', '1 : 1.5'],
    ['Special educator', 'Priya R., B.Ed. in Special Education'],
    ['Counsellor & wellness teacher', 'Alice A., M.Sc. in Psychology'],
  ]
  const results: [string, string, string, string][] = [
    ['2023–24', '77', '76', '98.07%'],
    ['2024–25', '77', '77', '100%'],
    ['2025–26', '65', '65', '100%'],
  ]
  const infra: [string, string][] = [
    ['Total campus area', '2,415.48 sq m'],
    ['Classrooms (number & size)', '31 rooms · 48 sq m each'],
    ['Laboratories incl. computer labs (number & size)', '3 labs · 56 sq m each'],
    ['Internet facility', 'Yes'],
    ['Girls’ toilets', '20'],
    ['Boys’ toilets', '20'],
  ]
  const table = (caption: string, data: [string, string][]) => (
    <div className="mt-4 overflow-x-auto rounded-[1.5rem] bg-white">
      <table className="w-full min-w-[480px] text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <tbody>{data.map(([k, v]) => <tr key={k} className="border-b border-plum/5 last:border-0"><th scope="row" className="w-1/2 px-5 py-3.5 font-semibold">{k}</th><td className="px-5 py-3.5 text-muted-strong">{v}</td></tr>)}</tbody>
      </table>
    </div>
  )
  const links = (data: [string, string][]) => (
    <ul className="mt-4 divide-y divide-plum/5 rounded-[1.5rem] bg-white">
      {data.map(([d, href]) => (
        <li key={d}><a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-3 px-5 py-3.5 text-sm hover:bg-sage/50"><span>{d}</span><span className="inline-flex shrink-0 items-center gap-1 font-semibold text-forest"><FileDown className="size-4" aria-hidden="true" />PDF<span className="sr-only"> (opens in a new tab)</span></span></a></li>
      ))}
    </ul>
  )
  return (
    <>
      <PageHero seoTitle="Mandatory Public Disclosure and School Policies" title={['Mandatory', <span className="accent text-sun">disclosure.</span>]} eyebrow="CBSE Appendix IX" description="Statutory information and documents published as required by the Central Board of Secondary Education." crumbs={[{ name: 'Disclosures', path: '/disclosures' }]} />
      <section className="bg-cream py-16 sm:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="font-display text-2xl font-semibold">A. General information</h2>
            {table('General information', rows)}
            <h2 className="mt-12 font-display text-2xl font-semibold">B. Documents & information</h2>
            {links(docs)}
            <h2 className="mt-12 font-display text-2xl font-semibold">C. Result & academics</h2>
            {links(academics)}
            <h2 className="mt-12 font-display text-2xl font-semibold">D. Staff (teaching)</h2>
            {table('Teaching staff', staff)}
            <p className="mt-3 text-sm text-muted-strong">The full teacher list is on the <Link to="/faculty" className="font-semibold text-forest underline">Faculty & Staff</Link> page.</p>
            <h2 className="mt-12 font-display text-2xl font-semibold">Board results — Class X</h2>
            <div className="mt-4 overflow-x-auto rounded-[1.5rem] bg-white">
              <table className="w-full min-w-[480px] text-left text-sm">
                <caption className="sr-only">Class X board examination results</caption>
                <thead><tr className="border-b border-plum/10">{['Year', 'Appeared', 'Passed', 'Pass %'].map((h) => <th key={h} scope="col" className="px-5 py-3.5 font-semibold">{h}</th>)}</tr></thead>
                <tbody>{results.map((r) => <tr key={r[0]} className="border-b border-plum/5 last:border-0">{r.map((c, i) => <td key={i} className="px-5 py-3.5 text-muted-strong">{c}</td>)}</tr>)}</tbody>
              </table>
            </div>
            <h2 className="mt-12 font-display text-2xl font-semibold">E. School infrastructure</h2>
            {table('School infrastructure', infra)}
            <a href={officialDocs.infrastructureVideo} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-forest underline-offset-4 hover:underline">Watch the infrastructure inspection video on YouTube<span className="sr-only"> (opens in a new tab)</span></a>
          </div>
          <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
            <h2 className="font-display text-2xl font-semibold">School policies</h2>
            {Object.values(policies).map((p) => (
              <Link key={p.slug} to={['privacy', 'terms', 'accessibility'].includes(p.slug) ? `/${p.slug}` : `/policies/${p.slug}`} className="block rounded-[1.5rem] bg-white p-5 hover:bg-sage">
                <span className="font-display text-lg font-semibold">{p.title}</span>
                <span className="mt-1 block text-sm text-muted-strong">{p.intro}</span>
              </Link>
            ))}
          </aside>
        </div>
      </section>
    </>
  )
}

export function PolicyPage({ slug: fixed }: { slug?: string }) {
  const { slug: param } = useParams()
  const p = policies[fixed ?? param ?? '']
  if (!p) return <NotFoundPage />
  return (
    <>
      <PageHero tone="cream" seoTitle={p.title} title={[p.title]} eyebrow="Policy" description={p.intro} crumbs={[{ name: 'Disclosures & Policies', path: '/disclosures' }, { name: p.title, path: fixed ? `/${fixed}` : `/policies/${p.slug}` }]} />
      <section className="bg-cream pb-20 sm:pb-28">
        <div className="container-x max-w-3xl">
          <p className="text-sm text-muted-strong">Status: {p.updated}</p>
          <div className="prose-school">
            {p.sections.map((s) => (
              <div key={s.heading}>
                <h2>{s.heading}</h2>
                {s.body.map((b, i) => <p key={i}>{b}</p>)}
                {s.list && <ul>{s.list.map((l) => <li key={l}>{l}</li>)}</ul>}
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap gap-3"><ButtonLink to="/disclosures" variant="dark">All policies</ButtonLink><ButtonLink to="/contact" variant="outline-dark">Questions? Contact us</ButtonLink></div>
        </div>
      </section>
    </>
  )
}

export function NotFoundPage() {
  useSetHeaderTone('dark')
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-sky-100 pb-20 pt-32 text-plum">
      <Seo title="Page not found" description="The page you were looking for could not be found." noindex />
      <motion.div aria-hidden="true" className="pointer-events-none absolute -right-20 top-1/2 size-[520px] -translate-y-1/2 opacity-40 sm:size-[640px]" animate={{ rotate: 360 }} transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}>
        <OrbitFallback label="" />
      </motion.div>
      <div className="container-x relative">
        <p className="eyebrow text-forest">Error 404</p>
        <h1 className="mt-5 text-mega font-semibold">Lost in <span className="accent text-violet">space.</span></h1>
        <p className="mt-6 max-w-lg text-lg text-plum/75">This page drifted out of orbit. Let’s get you back to somewhere useful.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink to="/" size="lg"><Home className="size-4" aria-hidden="true" />Back to home</ButtonLink>
          <ButtonLink to="/admissions" variant="outline-light" size="lg">Admissions</ButtonLink>
          <ButtonLink to="/contact" variant="outline-light" size="lg">Contact</ButtonLink>
        </div>
      </div>
    </section>
  )
}

