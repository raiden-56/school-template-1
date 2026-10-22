import type { ArtTheme } from '@/components/ui/ArtImage'

/* ---------------- Student life ---------------- */
export interface Activity {
  id: string
  title: string
  theme: ArtTheme
  caption: string
  aspect: 'tall' | 'wide' | 'square'
  /** Real photo. Without it an illustration is shown. */
  image?: string
}

export const activities: Activity[] = [
  { id: 'sports', title: 'Sports & Athletics', theme: 'sports', image: '/images/home/sports-day.jpg', caption: 'Sports Day, National Sports Day and inter-school meets — our kho-kho girls’ team are inter-school champions.', aspect: 'wide' },
  { id: 'annual-day', title: 'Annual Day', theme: 'drama', image: '/images/home/annual-day-1.jpg', caption: 'A grand stage celebration of dance, drama and music by every class.', aspect: 'tall' },
  { id: 'art', title: 'Art, Clay & Rangoli', theme: 'art', image: '/images/gallery/g8-0.jpg', caption: 'Clay modelling, rangoli competitions and creative classroom activities.', aspect: 'square' },
  { id: 'yoga', title: 'Yoga', theme: 'kids', caption: 'Regular yoga sessions, Prathamites Yoga celebrations and International Yoga Day.', aspect: 'tall' },
  { id: 'abacus', title: 'Abacus & Talent Exams', theme: 'math', image: '/images/achievements/abacus.jpg', caption: 'Abacus and mental-maths competitions and the Arithmetic Talent Exam.', aspect: 'wide' },
  { id: 'clubs', title: 'Club Activities', theme: 'community', caption: 'Co-curricular club activities (CCA) through the year.', aspect: 'square' },
  { id: 'assembly', title: 'Special Assemblies', theme: 'debate', image: '/images/gallery/g5-0.jpg', caption: 'Assemblies that build discipline and confidence — Father’s Day, Kargil Vijay Diwas and more.', aspect: 'tall' },
  { id: 'environment', title: 'Environment Day', theme: 'garden', image: '/images/gallery/g22-0.jpg', caption: 'Environment Day activities that teach children to care for nature.', aspect: 'wide' },
  { id: 'leadership', title: 'Investiture Ceremony', theme: 'leadership', image: '/images/gallery/g20-0.jpg', caption: 'Student leaders are invested with their responsibilities each year.', aspect: 'square' },
  { id: 'wellbeing', title: 'Health & Wellbeing', theme: 'medical', image: '/images/gallery/g21-0.jpg', caption: 'Nutrition Week, Doctor’s Day and dental check-ups for students.', aspect: 'tall' },
  { id: 'culture', title: 'Festivals & Celebrations', theme: 'celebration', image: '/images/gallery/g7-0.jpg', caption: 'Diwali, Sankranti, Onam, Navaratri, Janmashtami, Christmas, Kannada Rajyotsava and national days.', aspect: 'wide' },
  { id: 'trips', title: 'Educational Trips', theme: 'trip', image: '/images/gallery/g10-0.jpg', caption: 'Trips to Vidhana Soudha, the Jawaharlal Nehru Planetarium and nature resorts.', aspect: 'square' },
]

/* ---------------- Achievements ---------------- */
export interface Achievement {
  id: string
  /** Academic year, or "Recent" when the school has not published a date. */
  year: string
  category: 'Academic' | 'Sports' | 'Awards' | 'Competitions'
  title: string
  description: string
  featured?: boolean
  image?: string
}

export const achievements: Achievement[] = [
  { id: 'a1', year: '2025–26', category: 'Academic', title: 'Class X CBSE board results: 100% pass', description: 'All 65 students who appeared for the CBSE Class X board examination passed — our second consecutive year of 100% results (77 of 77 in 2024–25; 76 of 77 in 2023–24).', featured: true },
  { id: 'a2', year: 'Recent', category: 'Awards', title: '“Excellent” rating by EduConnectIn', description: 'Our school has been conferred an “Excellent” rating by EduConnectIn, standing out among 6,775 schools across Bengaluru. The evaluation assessed teaching–learning practices, student engagement, infrastructure, innovation and overall institutional effectiveness.', featured: true, image: '/images/achievements/educonnect-excellent.jpg' },
  { id: 'a3', year: '2025', category: 'Awards', title: 'India K-12 Awards (IKA) 2025', description: 'Our school has been honoured with the prestigious K-12 Award — a recognition of our commitment to academic excellence and holistic education, and of the collective efforts of our educators, students and parent community.', featured: true, image: '/images/achievements/india-k12-awards.jpg' },
  { id: 'a4', year: 'Recent', category: 'Sports', title: 'Victory Quantum — inter-school sports meet', description: 'Our school hosted an inter-school sports meet celebrating sportsmanship, teamwork and healthy competition. Our kho-kho girls’ team delivered an outstanding performance and emerged as the winners.', image: '/images/achievements/victory-quantum.jpg' },
  { id: 'a5', year: 'Recent', category: 'Competitions', title: 'Inter-school Abacus competition', description: 'Our young mathematicians took part in the inter-school abacus competition at Adharsh International School, Hoskote, showing remarkable speed, accuracy and concentration in mental calculation.', image: '/images/achievements/abacus.jpg' },
  { id: 'a6', year: 'Recent', category: 'Sports', title: 'The Power Play — kho-kho champions', description: 'At the inter-school sports competition held at Christ International School, Bengaluru, our kho-kho girls’ team displayed exceptional teamwork, agility and sportsmanship to win first place.' },
]

/* ---------------- Gallery ---------------- */
export const galleryCategories = ['All', 'Campus', 'Celebrations', 'Cultural Events', 'Sports', 'Classrooms', 'Student Activities', 'Educational Trips', 'Teacher Development', 'Videos'] as const
export type GalleryCategory = Exclude<(typeof galleryCategories)[number], 'All'>

export interface GalleryItem {
  id: string
  title: string
  category: GalleryCategory
  theme: ArtTheme
  type: 'image' | 'video'
  /** Real media URL. When missing, an illustration is shown. */
  src?: string
  videoUrl?: string
  /** YouTube video id — played in an embedded player. */
  youtubeId?: string
  span: 'tall' | 'wide' | 'big' | 'normal'
}

const photo = (id: number, title: string, category: GalleryCategory, file: string, span: GalleryItem['span'] = 'normal', theme: ArtTheme = 'event'): GalleryItem =>
  ({ id: `g${id}`, title, category, theme, type: 'image', src: `/images/${file}`, span })

const video = (id: number, title: string, youtubeId: string, span: GalleryItem['span'] = 'normal'): GalleryItem =>
  ({ id: `g${id}`, title, category: 'Videos', theme: 'celebration', type: 'video', youtubeId, src: `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`, span })

export const gallery: GalleryItem[] = [
  photo(1, 'Annual Day celebration', 'Cultural Events', 'home/annual-day-1.jpg', 'big'),
  photo(2, 'Our school building', 'Campus', 'campus/school-building.jpg', 'normal', 'campus'),
  photo(3, 'Sports Day', 'Sports', 'home/sports-day.jpg', 'wide'),
  photo(4, 'Diwali — a day of joy, light and learning', 'Celebrations', 'gallery/g7-0.jpg', 'tall'),
  photo(5, 'Victory Quantum inter-school sports meet', 'Sports', 'achievements/victory-quantum.jpg'),
  photo(6, 'Clay modelling by Grade 2', 'Classrooms', 'gallery/g8-0.jpg'),
  photo(7, 'Educational trip to Vidhana Soudha', 'Educational Trips', 'gallery/g10-0.jpg', 'wide'),
  photo(8, '“No Homework, Only Adventure!”', 'Educational Trips', 'gallery/g1-1.jpg', 'tall'),
  photo(9, 'Annual Day on stage', 'Cultural Events', 'home/annual-day-2.jpg'),
  photo(10, 'Happy Sankranti', 'Celebrations', 'gallery/g6-0.jpg'),
  photo(11, 'Investiture Ceremony 2025–26', 'Student Activities', 'gallery/g20-0.jpg', 'wide'),
  photo(12, 'Farewell — a step toward new beginnings', 'Celebrations', 'gallery/g3-0.jpg', 'tall'),
  photo(13, 'Divine Day of Knowledge and Wisdom', 'Celebrations', 'gallery/g0-0.jpg'),
  photo(14, 'Environment Day activity by pre-primary', 'Student Activities', 'gallery/g9-0.jpg'),
  photo(15, 'Jawaharlal Nehru Planetarium visit', 'Educational Trips', 'gallery/g11-0.jpg'),
  photo(16, 'School assembly', 'Student Activities', 'gallery/g5-1.jpg', 'big'),
  photo(17, 'Honouring our language and culture', 'Cultural Events', 'gallery/g2-0.jpg'),
  photo(18, 'Bell rings, fun begins', 'Student Activities', 'gallery/g4-0.jpg', 'wide'),
  photo(19, 'Pre-primary activity', 'Classrooms', 'gallery/g13-0.jpg'),
  photo(20, 'Onam celebration', 'Celebrations', 'gallery/g17-0.jpg'),
  photo(21, 'Red Day', 'Student Activities', 'gallery/g18-0.jpg'),
  photo(22, 'Where education meets entertainment', 'Student Activities', 'gallery/g14-0.jpg', 'wide'),
  photo(23, 'Nutrition Week activity', 'Student Activities', 'gallery/g21-0.jpg'),
  photo(24, 'Environment Day', 'Student Activities', 'gallery/g23-0.jpg'),
  photo(25, 'Christmas celebration', 'Celebrations', 'home/christmas.jpg'),
  photo(26, 'Educational trip', 'Educational Trips', 'gallery/g12-0.jpg'),
  photo(27, 'Capacity Building Programme by CBSE COE', 'Teacher Development', 'gallery/g16-0.jpg', 'wide'),
  photo(28, 'Training: technology in the classroom', 'Teacher Development', 'gallery/g19-0.jpg'),
  photo(29, 'Recognising our teachers', 'Teacher Development', 'home/staff-recognition.jpg', 'wide'),
  photo(30, 'Inauguration ceremony', 'Cultural Events', 'home/inauguration.jpg'),
  photo(31, 'Annual Day', 'Cultural Events', 'gallery/g24-0.jpg'),
  video(101, 'Sports Day celebration', '3X5-wsFUuO8', 'wide'),
  video(102, 'Independence Day celebration', 'bvU_LleMQDU'),
  video(103, 'Environment Day celebration', '2M3bTH8YRHk'),
  video(104, 'Navaratri celebration', 'agjVXMXIRmM'),
  video(105, 'Gandhi Jayanti celebration', '7OtM3IBD8N8'),
  video(106, 'International Yoga Day', 'rJlO1FBVOaY', 'wide'),
  video(107, 'Krishna Janmashtami celebration', 'mPEZlOE_9TQ'),
  video(108, 'International Tiger Day', '4XtnzsBSwso'),
  video(109, 'Parents Orientation Programme', 'FEKp8PHu_-0'),
  video(110, 'First day at New Pratham Public School', '6V2eI-7W1mE'),
  video(111, 'Farewell Day', 'S-S_bT_WyOU'),
]

/* ---------------- Testimonials ---------------- */
/**
 * Parent feedback the school has permission to publish. The section is hidden
 * while this list is empty. Names appear only when `nameApproved` is true.
 */
export interface Testimonial {
  id: string
  quote: string
  author: string
  relation: string
  nameApproved: boolean
  tone: 'lavender' | 'peach' | 'sage'
}

export const testimonials: Testimonial[] = []
