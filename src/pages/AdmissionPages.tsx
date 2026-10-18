import { CalendarCheck, CheckCircle2, Clock, FileDown, FileText, GraduationCap, MapPin, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHero } from '@/components/layout/PageHero'
import { AdmissionOrbitTimeline } from '@/components/sections/AdmissionOrbitTimeline'
import { FeeInformation } from '@/components/sections/FeeInformation'
import { MultiStepEnquiryForm } from '@/components/forms'
import { Accordion } from '@/components/ui/Accordion'
import { ButtonLink } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { SampleNote } from '@/components/ui/misc'
import { admissionDates, admissionDownloads, ageCriteria, ageCutOffNote, gradesOffered, gradesOpen, requiredDocuments } from '@/data/admissions'
import { faqs, scholarships } from '@/data/info'
import { notPublished, school } from '@/config/school'
import { directionsUrl } from '@/components/sections/CommunitySections'

const crumbs = [{ name: 'Admissions', path: '/admissions' }]

export function AdmissionsPage() {
  return (
    <>
      <PageHero
        seoTitle={`Admissions ${school.academicYear}`}
        title={['Every great future', <>starts with <span className="accent text-sun">one step.</span></>]}
        eyebrow={`Admissions ${school.academicYear} · ${school.admissionsOpen ? 'Open' : 'Closed'}`}
        description="Discover the right learning environment for your child and take the next step with confidence."
        crumbs={crumbs}
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink to="/admissions/apply" size="lg">Start your enquiry</ButtonLink>
          <ButtonLink to="/visit" variant="outline-light" size="lg">Book a campus visit</ButtonLink>
        </div>
      </PageHero>

      <nav aria-label="On this page" className="sticky top-[4.5rem] z-30 border-b border-plum/10 bg-cream/90 backdrop-blur sm:top-20">
        <ul className="container-x scrollbar-none flex gap-1 overflow-x-auto py-3 text-sm font-medium">
          {[['Process', '#process'], ['Grades', '#grades'], ['Eligibility', '#eligibility'], ['Documents', '#documents'], ['Dates', '#dates'], ['Fees', '#fees'], ['FAQ', '#admission-faq']].map(([l, h]) => (
            <li key={h}><a href={h} className="block whitespace-nowrap rounded-full px-4 py-2 hover:bg-plum/5">{l}</a></li>
          ))}
        </ul>
      </nav>

      <div id="process" className="scroll-mt-32"><AdmissionOrbitTimeline showIntro={false} /></div>

      <section className="bg-cream py-20 sm:py-28">
        <div className="container-x grid gap-6 lg:grid-cols-2">
          <Reveal className="scroll-mt-32 rounded-[2.5rem] bg-white p-7 sm:p-10">
            <div id="grades" className="scroll-mt-32" />
            <GraduationCap className="size-8 text-forest" aria-hidden="true" />
            <h2 className="mt-4 font-display text-3xl font-semibold">Available grades</h2>
            <p className="mt-2 text-muted-strong">Applications for {school.academicYear} are invited for the following grades, subject to seat availability.</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {gradesOffered.map((g) => {
                const open = (gradesOpen as readonly string[]).includes(g)
                return (
                  <li key={g} className={open ? 'rounded-full bg-sage px-3.5 py-1.5 text-sm font-medium' : 'rounded-full bg-plum/5 px-3.5 py-1.5 text-sm text-muted-strong line-through'}>
                    {g}{!open && <span className="sr-only"> (not open this session)</span>}
                  </li>
                )
              })}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="rounded-[2.5rem] bg-lavender p-7 sm:p-10">
            <div id="eligibility" className="scroll-mt-32" />
            <CheckCircle2 className="size-8 text-forest" aria-hidden="true" />
            <h2 className="mt-4 font-display text-3xl font-semibold">Eligibility & age criteria</h2>
            <table className="mt-6 w-full text-left text-sm">
              <caption className="sr-only">Age criteria by grade</caption>
              <thead><tr className="border-b border-plum/15"><th scope="col" className="py-2 pr-4">Grade</th><th scope="col" className="py-2">Requirement</th></tr></thead>
              <tbody>{ageCriteria.map((a) => <tr key={a.grade} className="border-b border-plum/10"><th scope="row" className="py-3 pr-4 font-semibold">{a.grade}</th><td className="py-3">{a.age}</td></tr>)}</tbody>
            </table>
            <p className="mt-4 text-sm text-plum/75">{ageCutOffNote}</p>
          </Reveal>

          <Reveal className="rounded-[2.5rem] bg-white p-7 sm:p-10">
            <div id="documents" className="scroll-mt-32" />
            <FileText className="size-8 text-forest" aria-hidden="true" />
            <h2 className="mt-4 font-display text-3xl font-semibold">Required documents</h2>
            <ul className="mt-6 space-y-3">{requiredDocuments.map((d) => <li key={d} className="flex gap-3"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-forest" aria-hidden="true" />{d}</li>)}</ul>
          </Reveal>

          <Reveal delay={0.1} className="rounded-[2.5rem] bg-violet p-7 text-white sm:p-10">
            <div id="dates" className="scroll-mt-32" />
            <Clock className="size-8 text-sun" aria-hidden="true" />
            <h2 className="mt-4 font-display text-3xl font-semibold">Key dates</h2>
            <dl className="mt-6 divide-y divide-white/20">{admissionDates.map((d) => <div key={d.label} className="flex flex-wrap justify-between gap-2 py-3"><dt className="text-white/85">{d.label}</dt><dd className="font-semibold">{d.value}</dd></div>)}</dl>
            <h3 className="mt-8 font-display text-lg font-semibold">Downloads</h3>
            <ul className="mt-3 grid gap-2">{admissionDownloads.map((d) => <li key={d.href}><a href={d.href} download className="flex items-center justify-between rounded-2xl bg-white/15 px-4 py-3 text-sm hover:bg-white/25"><span className="flex items-center gap-2"><FileDown className="size-4 text-sun" aria-hidden="true" />{d.label}</span><span className="text-xs text-white/85">{d.size}</span></a></li>)}</ul>
          </Reveal>
        </div>
      </section>

      <section id="fees" className="scroll-mt-32 bg-sage py-20 sm:py-28">
        <div className="container-x grid gap-6 md:grid-cols-3">
          <Link to="/admissions/fees" className="group rounded-[2rem] bg-cream p-7 hover:bg-white"><h2 className="font-display text-2xl font-semibold">Fees & payment</h2><p className="mt-2 text-sm text-muted-strong">Tuition, one-time charges and payment information.</p><span className="mt-6 block font-semibold text-forest">View fee structure →</span></Link>
          {school.offers.scholarships && <Link to="/admissions/scholarships" className="group rounded-[2rem] bg-cream p-7 hover:bg-white"><h2 className="font-display text-2xl font-semibold">Scholarships</h2><p className="mt-2 text-sm text-muted-strong">Merit and need-based support, where offered.</p><span className="mt-6 block font-semibold text-forest">Learn more →</span></Link>}
          <Link to="/visit" className="group rounded-[2rem] bg-violet p-7 text-white hover:bg-[#5a3fd1]"><h2 className="font-display text-2xl font-semibold">Book a campus visit</h2><p className="mt-2 text-sm text-white/85">Saturdays, by appointment.</p><span className="mt-6 block font-semibold text-sun">Choose a date →</span></Link>
        </div>
      </section>

      <section id="admission-faq" className="scroll-mt-32 bg-cream py-20 sm:py-28">
        <div className="container-x grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <h2 className="text-big font-semibold">Admission FAQs</h2>
          <Accordion items={faqs.filter((f) => f.category === 'Admissions' || f.category === 'Fees').map((f) => ({ title: f.q, content: f.a }))} defaultOpen={0} />
        </div>
      </section>
    </>
  )
}

export function ApplyPage() {
  return (
    <>
      <PageHero tone="lavender" seoTitle="Admission Enquiry and Application" title={['Enquire', <>& <span className="accent text-forest">apply.</span></>]} eyebrow={`Admissions ${school.academicYear}`} description="Start with a short enquiry. Our admissions team will guide you through the application, documents and campus visit." crumbs={[...crumbs, { name: 'Enquire & Apply', path: '/admissions/apply' }]} />
      <section className="bg-lavender-200 py-16 sm:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <MultiStepEnquiryForm />
          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[2rem] bg-white p-7">
              <h2 className="font-display text-xl font-semibold">Prefer paper?</h2>
              <p className="mt-2 text-sm text-muted-strong">Download the application form and submit it at the school office with the required documents.</p>
              <ul className="mt-4 space-y-2">{admissionDownloads.map((d) => <li key={d.href}><a href={d.href} download className="flex items-center gap-2 text-sm font-semibold text-forest hover:underline"><FileDown className="size-4" aria-hidden="true" />{d.label}</a></li>)}</ul>
            </div>
            <div className="rounded-[2rem] bg-violet p-7 text-white">
              <h2 className="font-display text-xl font-semibold">What happens next?</h2>
              <ol className="mt-4 space-y-3 text-sm text-white/85">
                <li>1. We confirm your enquiry by email.</li><li>2. We invite you for a campus visit.</li><li>3. We share the application pack and fee schedule.</li>
              </ol>
              <Link to="/admissions#process" className="mt-5 inline-block text-sm font-semibold text-sun">See the full process →</Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}

export function VisitPage() {
  return (
    <>
      <PageHero seoTitle="Book a Campus Visit" title={['Book a', <span className="accent text-sun">campus visit.</span>]} eyebrow="See it in person" description="Walk the corridors, peek into classrooms and meet our team. Visits usually take about 60 minutes." crumbs={[...crumbs, { name: 'Book a Visit', path: '/visit' }]} />
      <section className="bg-cream py-16 sm:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <MultiStepEnquiryForm mode="visit" />
          <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
            {[
              { icon: CalendarCheck, t: 'When', d: 'Saturdays, 9:30 AM – 12:30 PM (sample timings — confirm with the office).' },
              { icon: Sparkles, t: 'What to expect', d: 'A guided tour, a conversation with admissions and time for your questions.' },
              { icon: MapPin, t: 'Where', d: school.contact.addressLines.slice(1).join(', ') },
            ].map(({ icon: Icon, t, d }) => (
              <div key={t} className="flex gap-4 rounded-[1.75rem] bg-white p-6"><Icon className="size-6 shrink-0 text-forest" aria-hidden="true" /><div><h2 className="font-display font-semibold">{t}</h2><p className="mt-1 text-sm text-muted-strong">{d}</p></div></div>
            ))}
            <ButtonLink to={directionsUrl} variant="dark" className="w-full">Get directions</ButtonLink>
            <ButtonLink to="/campus/explorer" variant="outline-dark" className="w-full">Take the 3D tour first</ButtonLink>
          </aside>
        </div>
      </section>
    </>
  )
}

export function FeesPage() {
  return (
    <>
      <PageHero tone="peach" seoTitle="Fee Structure" title={['Transparent', <span className="accent text-forest">fees.</span>]} eyebrow={`Fee information · ${school.academicYear}`} description="Clear information on tuition and other charges. We never require donations or capitation fees for admission." crumbs={[...crumbs, { name: 'Fees', path: '/admissions/fees' }]} />
      <section className="bg-cream py-16 sm:py-24"><div className="container-x"><FeeInformation /></div></section>
    </>
  )
}

export function ScholarshipsPage() {
  return (
    <>
      <PageHero tone="sage" seoTitle="Scholarships and Financial Assistance" title={['Scholarships', <>& <span className="accent text-forest">assistance.</span></>]} eyebrow="Making learning accessible" description="Where offered, scholarships and concessions are awarded according to the school’s published policy." crumbs={[...crumbs, { name: 'Scholarships', path: '/admissions/scholarships' }]} />
      <section className="bg-cream py-16 sm:py-24">
        <div className="container-x">
          {scholarships.length ? (
            <>
              <SampleNote force>Criteria, values and deadlines will be published by the school. Nothing here is a commitment of financial support.</SampleNote>
              <ul className="mt-8 grid gap-6 md:grid-cols-3">
                {scholarships.map((s) => (
                  <li key={s.title} className="rounded-[2rem] bg-white p-7">
                    <h2 className="font-display text-2xl font-semibold">{s.title}</h2>
                    <p className="mt-3 text-muted-strong">{s.text}</p>
                    <p className="mt-6 text-sm"><span className="font-semibold">Eligibility:</span> <span className="text-muted-strong">{s.eligibility}</span></p>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-lg">The school does not currently offer scholarships. Please contact the office about fee instalments.</p>
          )}
          <div className="mt-12 flex flex-wrap gap-3"><ButtonLink to="/contact?subject=Fees" variant="dark">Enquire confidentially</ButtonLink><ButtonLink to="/admissions/fees" variant="outline-dark">Fee structure</ButtonLink></div>
          <p className="mt-6 text-sm text-muted-strong">Application deadlines: {notPublished}.</p>
        </div>
      </section>
    </>
  )
}
