import { motion } from 'framer-motion'
import { Briefcase, GraduationCap, Mail, Users } from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { useSetHeaderTone } from '@/components/layout/HeaderTone'
import { OurStorySection } from '@/components/sections/EditorialAboutSection'
import { CampusVisitCTA } from '@/components/sections/CommunitySections'
import { ButtonLink } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { SampleNote } from '@/components/ui/misc'
import { ArtImage } from '@/components/ui/ArtImage'
import { about } from '@/data/about'
import { school } from '@/config/school'

export function AboutPage() {
  useSetHeaderTone('dark')
  return (
    <>
      <PageHero
        seoTitle="About the School"
        title={['About', <span className="accent text-sun">NovaVerse.</span>]}
        eyebrow="Our story"
        description={about.intro}
        crumbs={[{ name: 'About', path: '/about' }]}
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink to="/about/mission-vision">Mission & vision</ButtonLink>
          <ButtonLink to="/about/principal" variant="outline-light">Principal’s message</ButtonLink>
        </div>
      </PageHero>
      <OurStorySection />
      <section className="bg-cream py-20 sm:py-28" aria-labelledby="philosophy-title">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-forest">Philosophy</p>
            <h2 id="philosophy-title" className="mt-4 text-big font-semibold">{about.philosophy.title}</h2>
          </div>
          <ol className="space-y-4">
            {about.philosophy.points.map((p, i) => (
              <Reveal as="li" key={p} delay={i * 0.06} className="flex gap-5 rounded-[1.75rem] bg-white p-6">
                <span className="font-display text-3xl font-semibold text-forest/40">0{i + 1}</span>
                <p className="leading-relaxed">{p}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
      <section className="bg-white py-20 sm:py-28" aria-labelledby="more-title">
        <div className="container-x">
          <h2 id="more-title" className="font-display text-mid font-semibold">More about us</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['Mission & Vision', '/about/mission-vision'], ["Principal's Message", '/about/principal'], ['Leadership', '/about/leadership'], ['Faculty & Staff', '/faculty'],
            ].map(([l, h], i) => (
              <li key={h}><ButtonLink to={h} variant={i % 2 ? 'outline-dark' : 'dark'} className="w-full justify-between">{l}</ButtonLink></li>
            ))}
          </ul>
        </div>
      </section>
      <CampusVisitCTA />
    </>
  )
}

export function MissionVisionPage() {
  useSetHeaderTone('light')
  return (
    <>
      <PageHero tone="lavender" seoTitle="Mission and Vision" title={['Mission', <>& <span className="accent text-forest">vision.</span></>]} eyebrow="What we believe" description="The ideas that guide every lesson, every decision and every relationship at our school." crumbs={[{ name: 'About', path: '/about' }, { name: 'Mission & Vision', path: '/about/mission-vision' }]} />
      <section className="bg-cream py-20 sm:py-28">
        <div className="container-x grid gap-6 lg:grid-cols-2">
          <Reveal className="rounded-[2.5rem] bg-violet p-8 text-white sm:p-12">
            <p className="eyebrow text-sun">Our mission</p>
            <p className="mt-6 font-display text-mid font-medium">{about.mission}</p>
          </Reveal>
          <Reveal delay={0.1} className="rounded-[2.5rem] rounded-tr-[8rem] bg-sage p-8 sm:p-12">
            <p className="eyebrow text-forest">Our vision</p>
            <p className="mt-6 font-display text-mid font-medium">{about.vision}</p>
          </Reveal>
        </div>
        <div className="container-x mt-20">
          <h2 className="text-big font-semibold">Core values</h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {about.values.map((v, i) => (
              <Reveal as="li" key={v.title} delay={i * 0.05} className="rounded-[2rem] bg-white p-7">
                <span className="grid size-12 place-items-center rounded-full bg-lavender font-display font-semibold">{i + 1}</span>
                <h3 className="mt-6 font-display text-2xl font-semibold">{v.title}</h3>
                <p className="mt-2 text-muted-strong">{v.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

export function PrincipalPage() {
  useSetHeaderTone('light')
  const pr = about.principal
  return (
    <>
      <PageHero tone="sage" seoTitle="Principal's Message" title={['A message from', <span className="accent text-forest">our principal.</span>]} eyebrow="Welcome" description={pr.excerpt} crumbs={[{ name: 'About', path: '/about' }, { name: "Principal's Message", path: '/about/principal' }]} />
      <section className="bg-cream py-20 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="aspect-[4/5] overflow-hidden rounded-[2.5rem] rounded-tl-[7rem]"><ArtImage theme="leadership" alt="Portrait placeholder for the principal" /></div>
            <p className="mt-5 font-display text-2xl font-semibold">{pr.name}</p>
            <p className="text-muted-strong">{pr.title}, {school.name}</p>
          </div>
          <article className="prose-school max-w-2xl">
            {pr.sample && <SampleNote className="mb-8">Sample message — to be written and approved by the principal.</SampleNote>}
            {pr.letter.map((p, i) => <p key={i} className={i === 0 ? '!text-plum font-display text-xl font-semibold' : 'text-lg'}>{p}</p>)}
            <p className="!text-plum font-display text-lg font-semibold">— {pr.name}</p>
            <div className="mt-10 flex flex-wrap gap-3"><ButtonLink to="/visit">Book a campus visit</ButtonLink><ButtonLink to="/about/leadership" variant="outline-dark">Our leadership</ButtonLink></div>
          </article>
        </div>
      </section>
    </>
  )
}

export function LeadershipPage() {
  useSetHeaderTone('dark')
  return (
    <>
      <PageHero seoTitle="Management and Leadership" title={['Management', <>& <span className="accent text-sun">leadership.</span></>]} eyebrow="Governance" description="The people responsible for the school’s direction, quality and care." crumbs={[{ name: 'About', path: '/about' }, { name: 'Leadership', path: '/about/leadership' }]} />
      <section className="bg-cream py-20 sm:py-28">
        <div className="container-x">
          <SampleNote>Names marked “to be published” will be added once confirmed by the school management.</SampleNote>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {about.leadership.map((l, i) => (
              <motion.li key={l.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="rounded-[2rem] bg-white p-7">
                <Users className="size-7 text-forest" aria-hidden="true" />
                <h2 className="mt-5 font-display text-xl font-semibold">{l.name}</h2>
                <p className="mt-1 text-sm font-semibold text-forest">{l.person}</p>
                <p className="mt-3 text-sm text-muted-strong">{l.role}</p>
              </motion.li>
            ))}
          </ul>
          <div className="mt-12"><ButtonLink to="/faculty" variant="dark">Meet our faculty</ButtonLink></div>
        </div>
      </section>
    </>
  )
}

export function CareersPage() {
  useSetHeaderTone('light')
  return (
    <>
      <PageHero tone="peach" seoTitle="Careers" title={['Teach with', <span className="accent text-forest">us.</span>]} eyebrow="Careers" description="We look for educators who are curious, kind and committed to every child’s growth." crumbs={[{ name: 'Careers', path: '/careers' }]} />
      <section className="bg-cream py-20 sm:py-28">
        <div className="container-x grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="font-display text-mid font-semibold">Why work here</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {['Professional development every term', 'Collaborative planning time', 'Small advisory groups', 'Modern learning spaces'].map((t) => (
                <li key={t} className="rounded-[1.5rem] bg-white p-5 font-medium">{t}</li>
              ))}
            </ul>
            <h2 className="mt-14 font-display text-mid font-semibold">Current openings</h2>
            <div className="mt-6 rounded-[2rem] border-2 border-dashed border-plum/15 p-8 text-center">
              <Briefcase className="mx-auto size-8 text-forest" aria-hidden="true" />
              <p className="mt-4 font-display text-lg font-semibold">No openings are listed right now.</p>
              <p className="mt-2 text-sm text-muted-strong">Vacancies will be posted here when available. You may still share your CV for future opportunities.</p>
            </div>
          </div>
          <aside className="rounded-[2rem] bg-violet p-8 text-white lg:self-start">
            <Mail className="size-8 text-sun" aria-hidden="true" />
            <h2 className="mt-4 font-display text-2xl font-semibold">Send your CV</h2>
            <p className="mt-2 text-sm text-white/85">Email your CV and a short cover note. Please do not send original certificates.</p>
            <ButtonLink to={`mailto:${school.contact.email}?subject=Career%20application`} className="mt-6">Email the school</ButtonLink>
          </aside>
        </div>
      </section>
    </>
  )
}

export function AlumniPage() {
  useSetHeaderTone('dark')
  return (
    <>
      <PageHero seoTitle="Alumni" title={['Once NovaVerse,', <span className="accent text-sun">always NovaVerse.</span>]} eyebrow="Alumni" description="Our graduates are part of our community for life. Stay connected, come back and inspire the next generation." crumbs={[{ name: 'Alumni', path: '/alumni' }]} />
      <section className="bg-cream py-20 sm:py-28">
        <div className="container-x grid gap-6 md:grid-cols-3">
          {[
            { icon: GraduationCap, t: 'Stay in touch', d: 'Share your news and where life has taken you.' },
            { icon: Users, t: 'Mentor students', d: 'Speak at career days or mentor senior students.' },
            { icon: Mail, t: 'Reunions', d: 'Hear about reunions and alumni events.' },
          ].map(({ icon: Icon, t, d }) => (
            <div key={t} className="rounded-[2rem] bg-white p-7"><Icon className="size-8 text-forest" aria-hidden="true" /><h2 className="mt-5 font-display text-xl font-semibold">{t}</h2><p className="mt-2 text-sm text-muted-strong">{d}</p></div>
          ))}
        </div>
        <div className="container-x mt-12 flex flex-col items-start gap-4">
          <SampleNote>Alumni stories will be published here only with the graduate’s permission.</SampleNote>
          <ButtonLink to={`mailto:${school.contact.email}?subject=Alumni%20registration`} variant="dark">Register as an alumnus</ButtonLink>
        </div>
      </section>
    </>
  )
}
