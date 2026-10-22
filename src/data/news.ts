import type { ArtTheme } from '@/components/ui/ArtImage'

export const newsCategories = ['All', 'Announcements', 'Academics', 'Exams', 'Events', 'Sports', 'Newsletters', 'Circulars', 'Holidays'] as const
export type NewsCategory = Exclude<(typeof newsCategories)[number], 'All'>

export interface NewsArticle {
  slug: string
  title: string
  category: NewsCategory
  date: string // ISO — the date the item was published on the school website
  excerpt: string
  body: string[]
  theme: ArtTheme
  featured?: boolean
  image?: string
  document?: { label: string; href: string }
}

const DOCS = 'http://www.newprathampublicschool.in'

/** News and notices published by the school. */
export const news: NewsArticle[] = [
  {
    slug: 'dasara-vacation-2026',
    title: 'Dasara vacation: 14 – 21 October 2026',
    category: 'Holidays',
    date: '2026-10-14',
    excerpt: 'The school will remain closed for the Dasara vacation from 14 to 21 October 2026. Classes reopen on Thursday, 22 October 2026.',
    body: [
      'As per the Calendar of Events 2026–27, the Dasara vacation is from 14 October to 21 October 2026, including Maha Navami (19 October) and Vijaya Dashami (20 October).',
      'School reopens on Thursday, 22 October 2026. We wish all our families a joyful Dasara.',
    ],
    theme: 'celebration',
  },
  {
    slug: 'class-x-results-2025-26',
    title: 'Class X CBSE results: 100% pass for the second year running',
    category: 'Academics',
    date: '2026-09-29',
    excerpt: 'All 65 students who appeared for the CBSE Class X board examination in 2025–26 have passed — following 100% results in 2024–25.',
    body: [
      'We are proud to share that all 65 students who appeared for the CBSE Class X board examination in 2025–26 passed, giving New Pratham Public School a 100% pass result.',
      'This follows 100% results in 2024–25 (77 of 77 students) and 98.07% in 2023–24 (76 of 77 students).',
      'Congratulations to our Prathamites, their parents and our dedicated teachers.',
    ],
    theme: 'award',
    featured: true,
    document: { label: 'Three-year results (PDF)', href: `${DOCS}/Link_of_ThreeYearResult/ThreeYearResult.pdf` },
  },
  {
    slug: 'academic-calendar-2026-27',
    title: 'Calendar of Events and Holiday List 2026–27',
    category: 'Circulars',
    date: '2026-09-29',
    excerpt: 'Periodic assessments, celebrations, holidays and vacations for the 2026–27 academic year.',
    body: [
      'The Calendar of Events and Holiday List for 2026–27 is now available.',
      'Periodic Assessments are scheduled on 13 July (PA-1), 19 August (PA-2), 2 December (PA-3) and 8 February (PA-4). Annual examinations begin on 15 March 2027.',
      'The Dasara vacation is from 14 to 21 October 2026 and the winter break from 25 December 2026, with school reopening on Monday, 4 January 2027.',
    ],
    theme: 'library',
    document: { label: 'Academic calendar 2026–27 (PDF)', href: `${DOCS}/AcademicCalendar/academiccalendar.pdf` },
  },
  {
    slug: 'fee-structure-2026-27',
    title: 'Fee structure 2026–27 for existing students',
    category: 'Announcements',
    date: '2026-09-29',
    excerpt: 'The term-wise fee structure for 2026–27, from Nursery to Class X, is now published.',
    body: [
      'The fee structure for existing students for the 2026–27 academic year has been published. Fees are payable in three terms.',
      'See the Fees page for class-wise amounts, or download the official fee structure below. NPPS follows the concept of no donation.',
    ],
    theme: 'campus',
    document: { label: 'Fee structure 2026–27 (PDF)', href: `${DOCS}/FeeStructure/fees.pdf` },
  },
  {
    slug: 'educonnect-excellent-rating',
    title: 'NPPS rated “Excellent” by EduConnectIn',
    category: 'Announcements',
    date: '2026-05-06',
    excerpt: 'Our school has been conferred an “Excellent” rating by EduConnectIn, standing out among 6,775 schools across Bengaluru.',
    body: [
      'Our school is proud to announce that it has been conferred an “Excellent” rating by EduConnectIn, standing out among 6,775 schools across Bengaluru.',
      'This prestigious recognition reflects our unwavering commitment to academic excellence, holistic development and quality education.',
      'The EduConnectIn evaluation assessed schools on multiple parameters, including teaching–learning practices, student engagement, infrastructure, innovation and overall institutional effectiveness. Achieving an Excellent rating in such a comprehensive and competitive assessment is a significant milestone for our school.',
    ],
    theme: 'award',
    image: '/images/achievements/educonnect-excellent.jpg',
  },
  {
    slug: 'india-k12-awards-2025',
    title: 'NPPS receives the India K-12 Award (IKA) 2025',
    category: 'Events',
    date: '2026-05-06',
    excerpt: 'Our school has been honoured with the prestigious K-12 Award, recognising our commitment to academic excellence and holistic education.',
    body: [
      'We are proud to announce that our school has been honoured with the prestigious K-12 Award, a recognition of our unwavering commitment to academic excellence and holistic education.',
      'This achievement reflects the collective efforts of our dedicated educators, enthusiastic students and supportive parent community.',
    ],
    theme: 'award',
    image: '/images/achievements/india-k12-awards.jpg',
  },
  {
    slug: 'victory-quantum-sports-meet',
    title: 'Victory Quantum: our kho-kho girls win the inter-school sports meet',
    category: 'Sports',
    date: '2026-05-06',
    excerpt: 'NPPS hosted the inter-school sports meet — and our kho-kho girls’ team emerged as the winners.',
    body: [
      'Our school proudly hosted the inter-school sports meet, bringing together young athletes from various schools to celebrate sportsmanship, teamwork and healthy competition.',
      'The event provided a vibrant platform for students to showcase their athletic skills while fostering friendship and mutual respect among participating schools.',
      'Adding to the pride of the occasion, our kho-kho girls’ team delivered an outstanding performance and emerged as the winners, earning well-deserved applause and admiration from all.',
    ],
    theme: 'sports',
    image: '/images/achievements/victory-quantum.jpg',
  },
  {
    slug: 'inter-school-abacus-competition',
    title: 'Abacus: a celebration of mental-maths excellence',
    category: 'Events',
    date: '2026-05-06',
    excerpt: 'Our students took part in an inter-school abacus competition at Adharsh International School, Hoskote.',
    body: [
      'An exciting inter-school abacus competition was hosted at Adharsh International School, Hoskote, bringing together young maths enthusiasts from various schools to showcase their mental calculation skills.',
      'The event witnessed enthusiastic participation from students, who demonstrated exceptional speed, accuracy and concentration.',
    ],
    theme: 'math',
    image: '/images/achievements/abacus.jpg',
  },
]

export const getArticle = (slug: string) => news.find((n) => n.slug === slug)
