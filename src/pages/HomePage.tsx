import { Seo, schoolJsonLd } from '@/components/layout/Seo'
import { HeroSection } from '@/components/sections/HeroSection'
import { QuickAccess } from '@/components/sections/QuickAccess'
import { EditorialAboutSection, SchoolHighlights } from '@/components/sections/EditorialAboutSection'
import { LearningPlanetSelector } from '@/components/sections/LearningPlanetSelector'
import { AcademicSubjectGrid } from '@/components/sections/AcademicSubjectGrid'
import { InteractiveCampusExplorer } from '@/components/sections/InteractiveCampusExplorer'
import { FacilityBentoGrid } from '@/components/sections/FacilityBentoGrid'
import { StudentSafetySection } from '@/components/sections/StudentSafetySection'
import { FacultyShowcase } from '@/components/sections/FacultyShowcase'
import { StudentLifeGallery } from '@/components/sections/StudentLifeGallery'
import { AchievementTimeline } from '@/components/sections/AchievementTimeline'
import { InteractiveGallery } from '@/components/sections/InteractiveGallery'
import { NewsMagazine } from '@/components/sections/NewsMagazine'
import { AdmissionOrbitTimeline } from '@/components/sections/AdmissionOrbitTimeline'
import { CampusVisitCTA, ContactSection, FAQAccordion, TestimonialCarousel } from '@/components/sections/CommunitySections'
import { school } from '@/config/school'

/**
 * Home: a curated tour of the school. Deeper content (our story, fees, the
 * enquiry form, parent resources) lives on dedicated pages, reached via the
 * quick-access strip and the navigation.
 */
export default function HomePage() {
  return (
    <>
      <Seo title={school.name} description={`${school.description} Admissions open for ${school.academicYear}.`} jsonLd={schoolJsonLd()} />
      <HeroSection />
      <QuickAccess />
      <EditorialAboutSection />
      <SchoolHighlights />
      <LearningPlanetSelector />
      <AcademicSubjectGrid limit={8} />
      <InteractiveCampusExplorer />
      <FacilityBentoGrid limit={6} />
      <StudentLifeGallery />
      <StudentSafetySection compact />
      <FacultyShowcase limit={4} />
      <AchievementTimeline limit={3} />
      <InteractiveGallery limit={8} />
      <NewsMagazine />
      <AdmissionOrbitTimeline />
      <TestimonialCarousel />
      <CampusVisitCTA />
      <FAQAccordion limit={5} />
      <ContactSection />
    </>
  )
}
