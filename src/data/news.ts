import type { ArtTheme } from '@/components/ui/ArtImage'

export const newsCategories = ['All', 'Announcements', 'Academics', 'Exams', 'Events', 'Sports', 'Newsletters', 'Circulars', 'Holidays'] as const
export type NewsCategory = Exclude<(typeof newsCategories)[number], 'All'>

export interface NewsArticle {
  slug: string
  title: string
  category: NewsCategory
  date: string // ISO
  excerpt: string
  body: string[]
  theme: ArtTheme
  featured?: boolean
  document?: { label: string; href: string }
}

/** SAMPLE ARTICLES — replace with the school's real announcements. */
export const news: NewsArticle[] = [
  {
    slug: 'admissions-open-2027-28',
    title: 'Admissions open for the 2027–28 academic session',
    category: 'Announcements',
    date: '2026-10-12',
    excerpt: 'Applications are now invited for Nursery to Grade 11. Families can begin with an online enquiry and book a campus visit.',
    body: [
      'We are pleased to announce that admissions for the 2027–28 academic session are now open, subject to seat availability in each grade.',
      'Families are encouraged to begin with an online enquiry. Our admissions team will then help you schedule a campus visit and guide you through eligibility, documents and next steps.',
      'Please refer to the admissions page for the complete process and the list of required documents. Fee information is shared by the admissions office on request.',
    ],
    theme: 'campus',
    featured: true,
    document: { label: 'Admission guidelines (sample PDF)', href: '/documents/admission-guidelines-sample.pdf' },
  },
  {
    slug: 'term-1-examination-schedule',
    title: 'Term 1 examination schedule released',
    category: 'Exams',
    date: '2026-10-08',
    excerpt: 'The Term 1 assessment schedule for Grades 3–10 has been shared. Download the timetable and preparation guidance.',
    body: ['The Term 1 assessment schedule for Grades 3 to 10 is now available.', 'Students will receive revision guidance from subject teachers. Please contact the class teacher with any questions.'],
    theme: 'classroom',
    document: { label: 'Examination schedule (sample PDF)', href: '/documents/exam-schedule-sample.pdf' },
  },
  {
    slug: 'parent-teacher-meeting-november',
    title: 'Parent–teacher meetings in November',
    category: 'Academics',
    date: '2026-10-05',
    excerpt: 'Slots for the mid-term parent–teacher meetings will open through the parent portal.',
    body: ['Mid-term parent–teacher meetings will be held in November. Booking details will be shared through the parent portal and by circular.', 'Meetings are an opportunity to review progress, discuss wellbeing and plan support together.'],
    theme: 'kids',
  },
  {
    slug: 'sports-day-announcement',
    title: 'Annual Sports Day: save the date',
    category: 'Sports',
    date: '2026-09-28',
    excerpt: 'Our annual sports day brings every house together for a day of athletics, games and celebration.',
    body: ['The annual sports day will be held in December. Students will take part in track events, team games and house relays.', 'Parents are warmly invited. Detailed timings and seating information will follow by circular.'],
    theme: 'sports',
  },
  {
    slug: 'october-newsletter',
    title: 'The NovaVerse Newsletter — October edition',
    category: 'Newsletters',
    date: '2026-09-30',
    excerpt: 'Highlights from the month: the science week, new library collections and student voices.',
    body: ['This month’s newsletter features science week, new additions to the library and reflections written by students.'],
    theme: 'library',
    document: { label: 'October newsletter (sample PDF)', href: '/documents/newsletter-october-sample.pdf' },
  },
  {
    slug: 'circular-transport-routes',
    title: 'Circular: transport route updates',
    category: 'Circulars',
    date: '2026-09-22',
    excerpt: 'Updated pick-up timings for selected routes. Please read and acknowledge.',
    body: ['Pick-up timings on selected routes have been revised. The updated route list is attached.', 'For questions, please contact the transport desk via the school office.'],
    theme: 'transport',
    document: { label: 'Transport circular (sample PDF)', href: '/documents/transport-circular-sample.pdf' },
  },
  {
    slug: 'festival-holidays',
    title: 'Festival holiday notice',
    category: 'Holidays',
    date: '2026-10-15',
    excerpt: 'School will remain closed for the festival break. Classes resume as per the academic calendar.',
    body: ['The school will remain closed for the festival break as per the academic calendar. Please check the events calendar for exact dates.'],
    theme: 'celebration',
  },
  {
    slug: 'science-week-recap',
    title: 'Science week: questions, experiments and a lot of curiosity',
    category: 'Events',
    date: '2026-09-15',
    excerpt: 'Students turned the campus into a laboratory for a week of experiments and demonstrations.',
    body: ['Science week saw students across grades run experiments, host demonstrations and present questions they want to investigate further.', 'Thank you to the families who visited the open-lab afternoon.'],
    theme: 'science',
  },
]

export const getArticle = (slug: string) => news.find((n) => n.slug === slug)
