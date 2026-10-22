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

const campus = 'School campus'
const everyone = 'All students'

/** Calendar of Events and Holiday List 2026–27, as issued by the school. */
export const events: SchoolEvent[] = [
  { slug: 'bakrid-2026', title: 'Bakrid / Eid al-Adha', category: 'Holiday', start: '2026-05-28', location: '—', audience: everyone, description: 'Holiday for Bakrid / Eid al-Adha.' },
  { slug: 'music-day-2026', title: 'Music Day celebrations', category: 'Cultural', start: '2026-06-16', location: campus, audience: everyone, description: 'Celebrating World Music Day.' },
  { slug: 'prathamites-yoga-2026', title: 'Prathamites Yoga celebrations', category: 'Sports', start: '2026-06-17', location: campus, audience: everyone, description: 'Yoga celebrations by our Prathamites.' },
  { slug: 'fathers-day-assembly-2026', title: 'Father’s Day — special assembly', category: 'Parents', start: '2026-06-19', location: campus, audience: 'Students & families', description: 'Father’s Day celebrations with a special assembly.' },
  { slug: 'yoga-day-2026', title: 'International Yoga Day', category: 'Sports', start: '2026-06-21', location: campus, audience: everyone, description: 'Yoga Day celebration.' },
  { slug: 'muharram-2026', title: 'Muharram', category: 'Holiday', start: '2026-06-26', location: '—', audience: everyone, description: 'Holiday for Muharram.' },
  { slug: 'pa-1-2026', title: 'Periodic Assessment 1 (PA-1)', category: 'Exams', start: '2026-07-13', location: 'Classrooms', audience: everyone, description: 'Periodic Assessment 1 begins.' },
  { slug: 'arithmetic-talent-exam-2026', title: 'Arithmetic Talent Exam', category: 'Competition', start: '2026-07-23', location: 'Classrooms', audience: everyone, description: 'Arithmetic talent examination.' },
  { slug: 'kargil-vijay-diwas-2026', title: 'Kargil Vijay Diwas — special assembly', category: 'Academic', start: '2026-07-27', location: campus, audience: everyone, description: 'Special assembly to honour the heroes of Kargil.' },
  { slug: 'club-activity-2026', title: 'CCA — Club Activity', category: 'Academic', start: '2026-08-05', location: campus, audience: everyone, description: 'Co-curricular club activities.' },
  { slug: 'independence-day-2026', title: 'Independence Day celebration', category: 'Cultural', start: '2026-08-15', location: campus, audience: 'Students & families', description: 'Celebrating India’s Independence Day.' },
  { slug: 'pa-2-2026', title: 'Periodic Assessment 2 (PA-2)', category: 'Exams', start: '2026-08-19', location: 'Classrooms', audience: everyone, description: 'Periodic Assessment 2 begins.' },
  { slug: 'varamahalakshmi-2026', title: 'Varamahalakshmi Festival', category: 'Holiday', start: '2026-08-21', location: '—', audience: everyone, description: 'Holiday for Varamahalakshmi.' },
  { slug: 'eid-milad-2026', title: 'Eid-Milad', category: 'Holiday', start: '2026-08-26', location: '—', audience: everyone, description: 'Holiday for Eid-Milad.' },
  { slug: 'national-sports-day-2026', title: 'National Sports Day', category: 'Sports', start: '2026-08-29', location: 'NPPS Multi-Sports Activity Centre', audience: everyone, description: 'National Sports Day activities.' },
  { slug: 'ganesh-chaturthi-2026', title: 'Ganesh Chaturthi', category: 'Holiday', start: '2026-09-14', location: '—', audience: everyone, description: 'Holiday for Ganesh Chaturthi.' },
  { slug: 'cbp-2026', title: 'Capacity Building Programme (CBP)', category: 'Academic', start: '2026-09-19', location: campus, audience: 'Teachers', description: 'Capacity Building Programme for teachers.' },
  { slug: 'gandhi-jayanti-2026', title: 'Gandhi Jayanti', category: 'Holiday', start: '2026-10-02', location: '—', audience: everyone, description: 'Holiday for Gandhi Jayanti.' },
  { slug: 'mahalaya-amavasya-2026', title: 'Mahalaya Amavasya', category: 'Holiday', start: '2026-10-10', location: '—', audience: everyone, description: 'Holiday for Mahalaya Amavasya.' },
  { slug: 'dasara-vacation-2026', title: 'Dasara vacation', category: 'Holiday', start: '2026-10-14', end: '2026-10-21', location: '—', audience: everyone, description: 'Dasara vacation, including Maha Navami (19 Oct) and Vijaya Dashami (20 Oct). School reopens on 22 October 2026.' },
  { slug: 'reopening-oct-2026', title: 'School reopens after Dasara', category: 'Academic', start: '2026-10-22', location: campus, audience: everyone, description: 'Classes resume after the Dasara vacation.' },
  { slug: 'valmiki-jayanti-2026', title: 'Maharishi Valmiki Jayanti', category: 'Holiday', start: '2026-10-26', location: '—', audience: everyone, description: 'Holiday for Maharishi Valmiki Jayanti.' },
  { slug: 'kannada-rajyotsava-2026', title: 'Kannada Rajyotsava', category: 'Cultural', start: '2026-11-01', location: campus, audience: everyone, description: 'Celebrating Karnataka Formation Day.' },
  { slug: 'deepavali-2026', title: 'Deepavali holidays', category: 'Holiday', start: '2026-11-08', end: '2026-11-10', location: '—', audience: everyone, description: 'Naraka Chaturdashi (8 Nov), Deepavali (9 Nov) and Balipadyami (10 Nov).' },
  { slug: 'kanakadasa-jayanti-2026', title: 'Kanakadasa Jayanti', category: 'Holiday', start: '2026-11-27', location: '—', audience: everyone, description: 'Holiday for Kanakadasa Jayanti.' },
  { slug: 'pa-3-2026', title: 'Periodic Assessment 3 (PA-3)', category: 'Exams', start: '2026-12-02', location: 'Classrooms', audience: everyone, description: 'Periodic Assessment 3 begins.' },
  { slug: 'winter-break-2026', title: 'Winter break', category: 'Holiday', start: '2026-12-25', end: '2027-01-03', location: '—', audience: everyone, description: 'Winter break including Christmas (25 Dec) and New Year (1 Jan). School reopens on Monday, 4 January 2027.' },
  { slug: 'reopening-jan-2027', title: 'School reopens after winter break', category: 'Academic', start: '2027-01-04', location: campus, audience: everyone, description: 'Classes resume after the winter break.' },
  { slug: 'pongal-sankranti-2027', title: 'Pongal & Makara Sankranti', category: 'Holiday', start: '2027-01-14', end: '2027-01-15', location: '—', audience: everyone, description: 'Pongal (14 Jan) and Makara Sankranti (15 Jan).' },
  { slug: 'republic-day-2027', title: 'Republic Day', category: 'Cultural', start: '2027-01-26', location: campus, audience: everyone, description: 'Republic Day celebration.' },
  { slug: 'pa-4-2027', title: 'Periodic Assessment 4 (PA-4)', category: 'Exams', start: '2027-02-08', location: 'Classrooms', audience: everyone, description: 'Periodic Assessment 4 begins.' },
  { slug: 'maha-shivaratri-2027', title: 'Maha Shivaratri', category: 'Holiday', start: '2027-03-06', location: '—', audience: everyone, description: 'Holiday for Maha Shivaratri.' },
  { slug: 'idul-fitr-2027', title: 'Idul Fitr', category: 'Holiday', start: '2027-03-10', location: '—', audience: everyone, description: 'Holiday for Idul Fitr.' },
  { slug: 'annual-examination-2027', title: 'Annual Examination', category: 'Exams', start: '2027-03-15', location: 'Classrooms', audience: everyone, description: 'Annual examinations begin.' },
  { slug: 'good-friday-2027', title: 'Good Friday', category: 'Holiday', start: '2027-03-26', location: '—', audience: everyone, description: 'Holiday for Good Friday.' },
  { slug: 'ugadi-2027', title: 'Ugadi', category: 'Holiday', start: '2027-04-07', location: '—', audience: everyone, description: 'Holiday for Ugadi.' },
  { slug: 'ambedkar-jayanti-2027', title: 'Dr. Ambedkar Jayanti', category: 'Holiday', start: '2027-04-14', location: '—', audience: everyone, description: 'Holiday for Dr. B. R. Ambedkar Jayanti.' },
]

export const getEvent = (slug: string) => events.find((e) => e.slug === slug)
