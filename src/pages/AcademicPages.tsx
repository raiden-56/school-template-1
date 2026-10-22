import { ArrowLeft, Check } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { PageHero } from '@/components/layout/PageHero'
import { useSetHeaderTone } from '@/components/layout/HeaderTone'
import { AcademicSubjectGrid } from '@/components/sections/AcademicSubjectGrid'
import { LearningPlanetSelector } from '@/components/sections/LearningPlanetSelector'
import { FacultyShowcase } from '@/components/sections/FacultyShowcase'
import { ButtonLink } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { Portrait } from '@/components/ui/Art'
import { SampleNote } from '@/components/ui/misc'
import { subjects } from '@/data/academics'
import { stages } from '@/data/stages'
import { educators, getEducator } from '@/data/faculty'
import { school } from '@/config/school'
import { Seo } from '@/components/layout/Seo'
import { NotFoundPage } from './InfoPages'

export function AcademicsPage() {
  useSetHeaderTone('light')
  return (
    <>
      <PageHero tone="cream" seoTitle="Academics and Curriculum" title={['Academics', <>& <span className="accent text-forest">curriculum.</span></>]} eyebrow={school.affiliation.board} description="The CBSE curriculum from Nursery to Class X, mapped to NEP 2020 and delivered through facilitated, experiential learning." crumbs={[{ name: 'Academics', path: '/academics' }]}>
        <div className="flex flex-wrap gap-3"><ButtonLink to="/academics/stages" variant="dark">Learning stages</ButtonLink><ButtonLink to="/events" variant="outline-dark">Academic calendar</ButtonLink></div>
      </PageHero>
      <AcademicSubjectGrid />
      <section className="bg-white py-20 sm:py-28" aria-labelledby="subject-detail-title">
        <div className="container-x">
          <h2 id="subject-detail-title" className="text-big font-semibold">In detail</h2>
          <div className="mt-12 divide-y divide-plum/10 border-y border-plum/10">
            {subjects.map((s) => {
              const Icon = s.icon
              return (
                <article key={s.id} id={s.id} className="grid scroll-mt-28 gap-4 py-8 md:grid-cols-[auto_1fr_2fr] md:gap-10">
                  <span className="grid size-14 place-items-center rounded-2xl bg-sage"><Icon className="size-6 text-forest" aria-hidden="true" /></span>
                  <h3 className="font-display text-2xl font-semibold">{s.title}</h3>
                  <div>
                    <p className="font-medium">{s.summary}</p>
                    <p className="mt-2 leading-relaxed text-muted-strong">{s.detail}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>
      <LearningPlanetSelector />
    </>
  )
}

export function StagesPage() {
  useSetHeaderTone('dark')
  return (
    <>
      <PageHero seoTitle="Learning Stages and Grades" title={['Learning stages', <>& <span className="accent text-sun">grades.</span></>]} eyebrow="From first steps to graduation" description="Each stage is designed around how children of that age learn best." crumbs={[{ name: 'Academics', path: '/academics' }, { name: 'Learning Stages', path: '/academics/stages' }]}>
        <nav aria-label="Jump to stage"><ul className="flex flex-wrap gap-2">{stages.map((s) => <li key={s.id}><a href={`#${s.id}`} className="block rounded-full bg-white/15 px-4 py-2 text-sm hover:bg-white/25">{s.name}</a></li>)}</ul></nav>
      </PageHero>
      <div className="bg-cream">
        {stages.map((s, i) => (
          <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="scroll-mt-24 border-b border-plum/10 py-16 sm:py-24">
            <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <Reveal>
                <span className="block size-20 rounded-full" style={{ background: `radial-gradient(circle at 30% 30%, ${s.accent}, ${s.color})` }} aria-hidden="true" />
                <p className="mt-6 font-display text-sm text-forest">Stage {i + 1} · {s.grades} · {s.ages}</p>
                <h2 id={`${s.id}-title`} className="mt-2 text-big font-semibold">{s.name}</h2>
                <p className="mt-4 text-lg text-muted-strong">{s.summary}</p>
              </Reveal>
              <Reveal delay={0.1} className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-[2rem] bg-white p-7">
                  <h3 className="font-display text-lg font-semibold">Learning goals</h3>
                  <ul className="mt-4 space-y-2">{s.goals.map((g) => <li key={g} className="flex gap-2 text-sm"><Check className="mt-0.5 size-4 shrink-0 text-forest" aria-hidden="true" />{g}</li>)}</ul>
                </div>
                <div className="rounded-[2rem] bg-white p-7">
                  <h3 className="font-display text-lg font-semibold">Activities</h3>
                  <ul className="mt-4 flex flex-wrap gap-2">{s.activities.map((a) => <li key={a} className="rounded-full bg-sage px-3 py-1.5 text-sm">{a}</li>)}</ul>
                </div>
                <div className="rounded-[2rem] bg-violet p-7 text-white sm:col-span-2">
                  <h3 className="font-display text-lg font-semibold">Teaching approach</h3>
                  <p className="mt-3 text-white/85">{s.approach}</p>
                </div>
              </Reveal>
            </div>
          </section>
        ))}
        <div className="container-x py-16 text-center"><ButtonLink to="/admissions" variant="dark">Admissions for {school.academicYear}</ButtonLink></div>
      </div>
    </>
  )
}

export function FacultyPage() {
  useSetHeaderTone('light')
  return (
    <>
      <PageHero tone="cream" seoTitle="Faculty and Staff" title={['Faculty', <>& <span className="accent text-forest">staff.</span></>]} eyebrow="Our educators" description="Experienced, caring professionals who know every child — and keep learning themselves." crumbs={[{ name: 'Faculty', path: '/faculty' }]} />
      <FacultyShowcase showHeading={false} />
    </>
  )
}

export function EducatorPage() {
  const { id = '' } = useParams()
  const e = getEducator(id)
  useSetHeaderTone('light')
  if (!e) return <NotFoundPage />
  const colleagues = educators.filter((x) => x.department === e.department && x.id !== e.id).slice(0, 3)
  return (
    <>
      <Seo title={`${e.name} — ${e.role}`} description={e.bio} />
      <section className="bg-cream pb-20 pt-32 sm:pt-40">
        <div className="container-x">
          <Link to="/faculty" className="inline-flex items-center gap-2 text-sm font-semibold text-forest"><ArrowLeft className="size-4" aria-hidden="true" />All faculty</Link>
          <div className="mt-8 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div className="aspect-[3/4] overflow-hidden rounded-[2.5rem] rounded-tl-[7rem]"><Portrait name={e.name} tone={e.tone} src={e.photo} /></div>
            <div>
              <p className="eyebrow text-forest">{e.department}</p>
              <h1 className="mt-4 text-giant font-semibold">{e.name}</h1>
              <p className="mt-3 font-display text-xl text-forest">{e.role}</p>
              <dl className="mt-8 grid gap-4 rounded-[2rem] bg-white p-6 sm:grid-cols-2">
                <div><dt className="text-sm text-muted-strong">Department</dt><dd className="font-semibold">{e.department}</dd></div>
                <div><dt className="text-sm text-muted-strong">Qualifications</dt><dd className="font-semibold">{e.qualifications}</dd></div>
              </dl>
              <p className="mt-8 text-lg leading-relaxed text-muted-strong">{e.bio}</p>
              <SampleNote className="mt-8">This is a sample profile. Publish real staff details only with their consent.</SampleNote>
              {colleagues.length > 0 && (
                <>
                  <h2 className="mt-12 font-display text-xl font-semibold">Also in {e.department}</h2>
                  <ul className="mt-4 flex flex-wrap gap-3">{colleagues.map((c) => <li key={c.id}><Link to={`/faculty/${c.id}`} className="block rounded-full bg-white px-4 py-2 text-sm font-medium hover:bg-sage">{c.name}</Link></li>)}</ul>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
