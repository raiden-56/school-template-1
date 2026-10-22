import { Check } from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { FacilityBentoGrid } from '@/components/sections/FacilityBentoGrid'
import { InteractiveCampusExplorer } from '@/components/sections/InteractiveCampusExplorer'
import { StudentSafetySection } from '@/components/sections/StudentSafetySection'
import { StudentLifeGallery } from '@/components/sections/StudentLifeGallery'
import { AchievementTimeline } from '@/components/sections/AchievementTimeline'
import { InteractiveGallery } from '@/components/sections/InteractiveGallery'
import { CampusVisitCTA } from '@/components/sections/CommunitySections'
import { ArtImage } from '@/components/ui/ArtImage'
import { ButtonLink } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { facilities } from '@/data/facilities'
import { activities } from '@/data/community'

export function FacilitiesPage() {
  return (
    <>
      <PageHero seoTitle="Facilities and Amenities" title={['Facilities', <>& <span className="accent text-emerald">amenities.</span></>]} eyebrow="Campus" description="A/C classrooms, laboratories, two playgrounds, a children’s gymnasium, indoor sports, a mini pool and more — every space designed to make learning active and safe." crumbs={[{ name: 'Campus', path: '/campus/facilities' }, { name: 'Facilities', path: '/campus/facilities' }]}>
        <ButtonLink to="/campus/explorer">Explore in 3D</ButtonLink>
      </PageHero>
      <FacilityBentoGrid showHeading={false} />
      <section className="bg-cream py-20 sm:py-28" aria-labelledby="facility-list-title">
        <div className="container-x">
          <h2 id="facility-list-title" className="text-big font-semibold">Every space, in detail</h2>
          <div className="mt-12 space-y-6">
            {facilities.map((f, i) => (
              <Reveal key={f.id}>
                <article id={f.id} className="grid scroll-mt-28 gap-6 overflow-hidden rounded-[2rem] bg-white p-4 sm:p-6 md:grid-cols-[minmax(0,320px)_1fr] md:items-center md:gap-10">
                  <div className="aspect-[4/3] overflow-hidden rounded-[1.5rem]"><ArtImage theme={f.theme} alt={f.title} src={f.image} seed={i} /></div>
                  <div className="pb-2 md:pb-0">
                    <h3 className="font-display text-2xl font-semibold">{f.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted-strong">{f.summary}</p>
                    <ul className="mt-4 grid gap-2 sm:grid-cols-2">{f.details.map((d) => <li key={d} className="flex gap-2 text-sm"><Check className="mt-0.5 size-4 shrink-0 text-forest" aria-hidden="true" />{d}</li>)}</ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CampusVisitCTA />
    </>
  )
}

export function CampusExplorerPage() {
  return (
    <>
      <PageHero seoTitle="3D Campus Explorer" title={['Campus', <span className="accent text-emerald">explorer.</span>]} eyebrow="Interactive tour" description="Scroll to fly through the campus, or select a marker to learn about each space. On phones and with reduced motion, an illustrated map is shown instead." crumbs={[{ name: 'Campus', path: '/campus/facilities' }, { name: 'Campus Explorer', path: '/campus/explorer' }]} />
      <InteractiveCampusExplorer />
      <section className="bg-cream py-16">
        <div className="container-x flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <p className="font-display text-2xl font-semibold">Prefer to see it in person?</p>
          <div className="flex flex-wrap gap-3"><ButtonLink to="/visit">Book a visit</ButtonLink><ButtonLink to="/campus/facilities" variant="outline-dark">All facilities</ButtonLink></div>
        </div>
      </section>
    </>
  )
}

export function SafetyPage() {
  return (
    <>
      <PageHero tone="sage" seoTitle="Safety and Wellbeing" title={['Safety', <>& <span className="accent text-forest">wellbeing.</span></>]} eyebrow="Care for every child" description="How we keep students safe, supported and well — on campus, on the bus and online." crumbs={[{ name: 'Safety & Wellbeing', path: '/safety' }]}>
        <div className="flex flex-wrap gap-3"><ButtonLink to="/policies/child-protection" variant="dark">Child protection policy</ButtonLink><ButtonLink to="/policies/anti-bullying" variant="outline-dark">Anti-bullying policy</ButtonLink></div>
      </PageHero>
      <StudentSafetySection />
    </>
  )
}

export function StudentLifePage() {
  return (
    <>
      <PageHero tone="peach" seoTitle="Sports and Extracurricular Activities" title={['Sports', <>& <span className="accent text-forest">activities.</span></>]} eyebrow="Student life" description="Sports, yoga, Annual Day, festivals, educational trips and club activities — where every Prathamite finds a place to shine." crumbs={[{ name: 'Student Life', path: '/student-life' }]} />
      <section className="bg-cream py-16 sm:py-24" aria-labelledby="clubs-title">
        <div className="container-x">
          <h2 id="clubs-title" className="text-big font-semibold">Clubs & programmes</h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {activities.map((a, i) => (
              <Reveal as="li" key={a.id} delay={(i % 3) * 0.05} className="flex gap-4 rounded-[1.75rem] bg-white p-5">
                <div className="size-20 shrink-0 overflow-hidden rounded-2xl"><ArtImage theme={a.theme} alt="" src={a.image} hideTag seed={i} /></div>
                <div><h3 className="font-display text-lg font-semibold">{a.title}</h3><p className="mt-1 text-sm text-muted-strong">{a.caption}</p></div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
      <StudentLifeGallery />
      <AchievementTimeline limit={3} />
    </>
  )
}

export function AchievementsPage() {
  return (
    <>
      <PageHero seoTitle="Student Achievements" title={['Student', <span className="accent text-emerald">achievements.</span>]} eyebrow="Celebrating growth" description="Board results, awards and inter-school wins — milestones our Prathamites, teachers and parents have achieved together." crumbs={[{ name: 'Student Life', path: '/student-life' }, { name: 'Achievements', path: '/student-life/achievements' }]} />
      <AchievementTimeline filterable />
    </>
  )
}

export function GalleryPage() {
  return (
    <>
      <PageHero tone="cream" seoTitle="Gallery" title={['Moments in', <span className="accent text-forest">motion.</span>]} eyebrow="Gallery" description="Celebrations, Annual Day, sports, classroom activities, trips and videos from New Pratham Public School. Select any item to open the full-screen viewer." crumbs={[{ name: 'Gallery', path: '/gallery' }]} />
      <InteractiveGallery showHeading={false} />
    </>
  )
}
