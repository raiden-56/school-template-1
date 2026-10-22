import { school } from './school'

export interface NavLink { label: string; to: string; description?: string }
export interface NavGroup { label: string; to: string; match: string[]; children?: NavLink[] }

export const mainNav: NavGroup[] = [
  {
    label: 'About', to: '/about', match: ['/about', '/faculty', '/careers', '/alumni'],
    children: [
      { label: 'Our Story', to: '/about', description: 'History, philosophy and what makes us unique' },
      { label: 'Mission & Vision', to: '/about/mission-vision', description: 'What we believe and why' },
      { label: "Principal's Message", to: '/about/principal', description: 'A welcome from our principal' },
      { label: 'Leadership', to: '/about/leadership', description: 'Management and governance' },
      { label: 'Faculty & Staff', to: '/faculty', description: 'Meet our educators' },
      ...(school.offers.careers ? [{ label: 'Careers', to: '/careers', description: 'Teach with us' }] : []),
      ...(school.offers.alumni ? [{ label: 'Alumni', to: '/alumni', description: 'Our graduates, our community' }] : []),
    ],
  },
  {
    label: 'Academics', to: '/academics', match: ['/academics'],
    children: [
      { label: 'Curriculum', to: '/academics', description: 'Subjects, pedagogy and assessment' },
      { label: 'Learning Stages', to: '/academics/stages', description: 'Pre-primary to Class X' },
      { label: 'Achievements', to: '/student-life/achievements', description: 'Celebrating student success' },
    ],
  },
  {
    label: 'Admissions', to: '/admissions', match: ['/admissions', '/visit'],
    children: [
      { label: 'Admission Process', to: '/admissions', description: 'Steps, eligibility and documents' },
      { label: 'Enquire & Apply', to: '/admissions/apply', description: 'Start your application' },
      { label: 'Fee Structure', to: '/admissions/fees', description: 'Transparent fee information' },
      ...(school.offers.scholarships ? [{ label: 'Scholarships', to: '/admissions/scholarships', description: 'Financial assistance' }] : []),
      { label: 'Book a Campus Visit', to: '/visit', description: 'See the campus in person' },
    ],
  },
  {
    label: 'Campus', to: '/campus/facilities', match: ['/campus', '/safety'],
    children: [
      { label: 'Facilities', to: '/campus/facilities', description: 'Labs, library, sports and studios' },
      { label: '3D Campus Explorer', to: '/campus/explorer', description: 'Take an interactive tour' },
      { label: 'Safety & Wellbeing', to: '/safety', description: 'How we care for every child' },
    ],
  },
  {
    label: 'Student Life', to: '/student-life', match: ['/student-life'],
    children: [
      { label: 'Sports & Activities', to: '/student-life', description: 'Clubs, sports and the arts' },
      { label: 'Achievements', to: '/student-life/achievements', description: 'Awards and milestones' },
    ],
  },
  { label: 'Gallery', to: '/gallery', match: ['/gallery'] },
  {
    label: 'News', to: '/news', match: ['/news', '/events'],
    children: [
      { label: 'News & Notices', to: '/news', description: 'Announcements and circulars' },
      { label: 'Events Calendar', to: '/events', description: 'Upcoming dates' },
    ],
  },
  { label: 'Contact', to: '/contact', match: ['/contact'] },
]

export const quickLinks: (NavLink & { external?: boolean; href: string | null })[] = [
  { label: 'Parent Portal', to: '/parents', href: school.portals.parent, external: true },
  { label: 'Student Portal', to: '/students', href: school.portals.student, external: true },
  { label: 'Parent Resources', to: '/parents', href: '/parents' },
  { label: 'Student Resources', to: '/students', href: '/students' },
  { label: 'Fee Payment', to: '/parents', href: school.portals.feePayment, external: true },
  { label: 'Disclosures & Policies', to: '/disclosures', href: '/disclosures' },
]
