import { MotionConfig } from 'framer-motion'
import { lazy } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { HeaderToneProvider } from '@/components/layout/HeaderTone'
import HomePage from '@/pages/HomePage'

/* Every page except Home is code-split. */
const p = <T,>(loader: () => Promise<Record<string, T>>, name: string) => lazy(() => loader().then((m) => ({ default: m[name] as React.ComponentType })))

const AboutPage = p(() => import('@/pages/AboutPages'), 'AboutPage')
const MissionVisionPage = p(() => import('@/pages/AboutPages'), 'MissionVisionPage')
const PrincipalPage = p(() => import('@/pages/AboutPages'), 'PrincipalPage')
const LeadershipPage = p(() => import('@/pages/AboutPages'), 'LeadershipPage')
const CareersPage = p(() => import('@/pages/AboutPages'), 'CareersPage')
const AlumniPage = p(() => import('@/pages/AboutPages'), 'AlumniPage')
const AcademicsPage = p(() => import('@/pages/AcademicPages'), 'AcademicsPage')
const StagesPage = p(() => import('@/pages/AcademicPages'), 'StagesPage')
const FacultyPage = p(() => import('@/pages/AcademicPages'), 'FacultyPage')
const EducatorPage = p(() => import('@/pages/AcademicPages'), 'EducatorPage')
const AdmissionsPage = p(() => import('@/pages/AdmissionPages'), 'AdmissionsPage')
const ApplyPage = p(() => import('@/pages/AdmissionPages'), 'ApplyPage')
const VisitPage = p(() => import('@/pages/AdmissionPages'), 'VisitPage')
const FeesPage = p(() => import('@/pages/AdmissionPages'), 'FeesPage')
const ScholarshipsPage = p(() => import('@/pages/AdmissionPages'), 'ScholarshipsPage')
const FacilitiesPage = p(() => import('@/pages/CampusPages'), 'FacilitiesPage')
const CampusExplorerPage = p(() => import('@/pages/CampusPages'), 'CampusExplorerPage')
const SafetyPage = p(() => import('@/pages/CampusPages'), 'SafetyPage')
const StudentLifePage = p(() => import('@/pages/CampusPages'), 'StudentLifePage')
const AchievementsPage = p(() => import('@/pages/CampusPages'), 'AchievementsPage')
const GalleryPage = p(() => import('@/pages/CampusPages'), 'GalleryPage')
const NewsPage = p(() => import('@/pages/NewsPages'), 'NewsPage')
const ArticlePage = p(() => import('@/pages/NewsPages'), 'ArticlePage')
const EventsPage = p(() => import('@/pages/NewsPages'), 'EventsPage')
const EventDetailPage = p(() => import('@/pages/NewsPages'), 'EventDetailPage')
const ParentsPage = p(() => import('@/pages/InfoPages'), 'ParentsPage')
const StudentsPage = p(() => import('@/pages/InfoPages'), 'StudentsPage')
const ContactPage = p(() => import('@/pages/InfoPages'), 'ContactPage')
const FAQPage = p(() => import('@/pages/InfoPages'), 'FAQPage')
const DisclosuresPage = p(() => import('@/pages/InfoPages'), 'DisclosuresPage')
const PolicyPage = lazy(() => import('@/pages/InfoPages').then((m) => ({ default: m.PolicyPage })))
const NotFoundPage = p(() => import('@/pages/InfoPages'), 'NotFoundPage')

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/about/mission-vision', element: <MissionVisionPage /> },
      { path: '/about/principal', element: <PrincipalPage /> },
      { path: '/about/leadership', element: <LeadershipPage /> },
      { path: '/careers', element: <CareersPage /> },
      { path: '/alumni', element: <AlumniPage /> },
      { path: '/academics', element: <AcademicsPage /> },
      { path: '/academics/stages', element: <StagesPage /> },
      { path: '/faculty', element: <FacultyPage /> },
      { path: '/faculty/:id', element: <EducatorPage /> },
      { path: '/admissions', element: <AdmissionsPage /> },
      { path: '/admissions/apply', element: <ApplyPage /> },
      { path: '/admissions/fees', element: <FeesPage /> },
      { path: '/admissions/scholarships', element: <ScholarshipsPage /> },
      { path: '/visit', element: <VisitPage /> },
      { path: '/campus/facilities', element: <FacilitiesPage /> },
      { path: '/campus/explorer', element: <CampusExplorerPage /> },
      { path: '/safety', element: <SafetyPage /> },
      { path: '/student-life', element: <StudentLifePage /> },
      { path: '/student-life/achievements', element: <AchievementsPage /> },
      { path: '/gallery', element: <GalleryPage /> },
      { path: '/news', element: <NewsPage /> },
      { path: '/news/:slug', element: <ArticlePage /> },
      { path: '/events', element: <EventsPage /> },
      { path: '/events/:slug', element: <EventDetailPage /> },
      { path: '/parents', element: <ParentsPage /> },
      { path: '/students', element: <StudentsPage /> },
      { path: '/contact', element: <ContactPage /> },
      { path: '/faq', element: <FAQPage /> },
      { path: '/disclosures', element: <DisclosuresPage /> },
      { path: '/privacy', element: <PolicyPage slug="privacy" /> },
      { path: '/terms', element: <PolicyPage slug="terms" /> },
      { path: '/accessibility', element: <PolicyPage slug="accessibility" /> },
      { path: '/policies/:slug', element: <PolicyPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <HeaderToneProvider>
        <RouterProvider router={router} />
      </HeaderToneProvider>
    </MotionConfig>
  )
}
