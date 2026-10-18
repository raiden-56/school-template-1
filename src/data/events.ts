export const eventCategories = ['All', 'Academic', 'Exams', 'Holiday', 'Parents', 'Sports', 'Cultural', 'Competition', 'Admissions'] as const
export type EventCategory = Exclude<(typeof eventCategories)[number], 'All'>

export interface SchoolEvent {
  slug: string
  title: string
  category: EventCategory
  start: string // ISO date
  end?: string
  time?: string
  location: string
  audience: string
  description: string
}

/** SAMPLE CALENDAR — replace with the school's approved academic calendar. */
export const events: SchoolEvent[] = [
  { slug: 'campus-open-morning-oct', title: 'Campus Open Morning', category: 'Admissions', start: '2026-10-24', time: '9:30 AM – 12:30 PM', location: 'Main reception', audience: 'Prospective families', description: 'Tour the campus, meet teachers and learn about admissions for 2027–28.' },
  { slug: 'festival-break', title: 'Festival Break', category: 'Holiday', start: '2026-11-07', end: '2026-11-11', location: '—', audience: 'All students', description: 'School closed for the festival break.' },
  { slug: 'term-1-assessments', title: 'Term 1 Assessments', category: 'Exams', start: '2026-11-16', end: '2026-11-24', location: 'Classrooms', audience: 'Grades 3–10', description: 'Term 1 assessments. Schedule available in the news section.' },
  { slug: 'ptm-november', title: 'Parent–Teacher Meetings', category: 'Parents', start: '2026-11-28', time: '9:00 AM – 1:00 PM', location: 'Classrooms', audience: 'Parents of all grades', description: 'Mid-term progress conversations with class and subject teachers.' },
  { slug: 'inter-house-debate', title: 'Inter-house Debate', category: 'Competition', start: '2026-11-20', time: '11:00 AM', location: 'Auditorium', audience: 'Grades 6–12', description: 'House teams debate a motion chosen by the student council.' },
  { slug: 'annual-sports-day', title: 'Annual Sports Day', category: 'Sports', start: '2026-12-12', time: '8:00 AM – 1:00 PM', location: 'Sports ground', audience: 'Students & families', description: 'Track events, team games and house relays. Parents warmly invited.' },
  { slug: 'winter-concert', title: 'Winter Concert', category: 'Cultural', start: '2026-12-18', time: '5:30 PM', location: 'Auditorium', audience: 'Families & community', description: 'Choir, ensembles and dance performances.' },
  { slug: 'science-exhibition', title: 'Science Exhibition', category: 'Academic', start: '2027-01-22', time: '10:00 AM – 2:00 PM', location: 'Science block', audience: 'Families & guests', description: 'Student investigations on display, judged by guest scientists.' },
  { slug: 'campus-open-morning-jan', title: 'Campus Open Morning', category: 'Admissions', start: '2027-01-30', time: '9:30 AM – 12:30 PM', location: 'Main reception', audience: 'Prospective families', description: 'A second opportunity to tour the campus before admissions close.' },
  { slug: 'annual-day', title: 'Annual Day', category: 'Cultural', start: '2027-02-13', time: '5:00 PM', location: 'Auditorium', audience: 'Families & community', description: 'Our annual celebration of performance, art and student achievement.' },
]

export const getEvent = (slug: string) => events.find((e) => e.slug === slug)
