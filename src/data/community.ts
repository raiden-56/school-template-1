import type { ArtTheme } from '@/components/ui/ArtImage'

/* ---------------- Student life ---------------- */
export interface Activity {
  id: string
  title: string
  theme: ArtTheme
  caption: string
  aspect: 'tall' | 'wide' | 'square'
}

export const activities: Activity[] = [
  { id: 'sports', title: 'Sports & Athletics', theme: 'sports', caption: 'Athletics, football, cricket, basketball and yoga — coached for skill, teamwork and fair play.', aspect: 'wide' },
  { id: 'music-dance', title: 'Music & Dance', theme: 'music', caption: 'Choir, instrumental ensembles and dance in classical and contemporary styles.', aspect: 'tall' },
  { id: 'art', title: 'Art & Crafts', theme: 'art', caption: 'Painting, clay, printmaking and craft with an annual student exhibition.', aspect: 'square' },
  { id: 'drama', title: 'Drama', theme: 'drama', caption: 'Class plays, an annual production and drama-in-education across subjects.', aspect: 'tall' },
  { id: 'robotics', title: 'Robotics & Coding', theme: 'robotics', caption: 'Build, program and compete — from block code to microcontrollers.', aspect: 'wide' },
  { id: 'science-fair', title: 'Science Fairs', theme: 'science', caption: 'Student investigations presented to peers, parents and guest judges.', aspect: 'square' },
  { id: 'debate', title: 'Debate & Public Speaking', theme: 'debate', caption: 'Debate society, elocution and Model UN build confident voices.', aspect: 'tall' },
  { id: 'eco', title: 'Environmental Club', theme: 'garden', caption: 'Composting, gardening and campus sustainability audits run by students.', aspect: 'wide' },
  { id: 'leadership', title: 'Student Leadership', theme: 'leadership', caption: 'Student council, house captains and peer mentors.', aspect: 'square' },
  { id: 'service', title: 'Community Service', theme: 'community', caption: 'Partnerships with local organisations for meaningful service learning.', aspect: 'tall' },
  { id: 'culture', title: 'Cultural Celebrations', theme: 'celebration', caption: 'Festivals and heritage days celebrated together as one community.', aspect: 'wide' },
  { id: 'trips', title: 'Educational Trips', theme: 'trip', caption: 'Museum visits, nature camps and field studies linked to the curriculum.', aspect: 'square' },
]

/* ---------------- Achievements (SAMPLE entries) ---------------- */
export interface Achievement {
  id: string
  year: string
  category: 'Academic' | 'Sports' | 'Cultural' | 'Science' | 'Olympiad' | 'Projects' | 'Community' | 'Alumni'
  title: string
  description: string
  featured?: boolean
}

export const achievements: Achievement[] = [
  { id: 'a1', year: '2026', category: 'Science', title: 'Sample: Inter-school science exhibition', description: 'Placeholder entry showing how a verified science exhibition result would appear. Replace with an approved result.', featured: true },
  { id: 'a2', year: '2026', category: 'Sports', title: 'Sample: District athletics meet', description: 'Placeholder for a verified sports result, with student names published only with consent.' },
  { id: 'a3', year: '2026', category: 'Olympiad', title: 'Sample: Mathematics Olympiad participation', description: 'Placeholder for verified Olympiad participation or results.' },
  { id: 'a4', year: '2025', category: 'Cultural', title: 'Sample: Regional music festival', description: 'Placeholder for an approved cultural competition result.', featured: true },
  { id: 'a5', year: '2025', category: 'Projects', title: 'Sample: Student-led water conservation project', description: 'Placeholder for a student project with a real community outcome.' },
  { id: 'a6', year: '2025', category: 'Community', title: 'Sample: Neighbourhood literacy drive', description: 'Placeholder for a verified community initiative.' },
  { id: 'a7', year: '2024', category: 'Academic', title: 'Sample: Board examination results', description: 'Placeholder. Publish only official, verified results.', featured: true },
  { id: 'a8', year: '2024', category: 'Alumni', title: 'Sample: Alumni story', description: 'Placeholder for a verified alumni achievement, published with permission.' },
]

/* ---------------- Gallery ---------------- */
export const galleryCategories = ['All', 'Campus', 'Classrooms', 'Sports', 'Cultural Events', 'Student Activities', 'Celebrations', 'Science Exhibitions', 'Educational Trips'] as const
export type GalleryCategory = Exclude<(typeof galleryCategories)[number], 'All'>

export interface GalleryItem {
  id: string
  title: string
  category: GalleryCategory
  theme: ArtTheme
  type: 'image' | 'video'
  /** Real media URL. When missing, an illustrated sample visual is shown. */
  src?: string
  videoUrl?: string
  span: 'tall' | 'wide' | 'big' | 'normal'
}

export const gallery: GalleryItem[] = [
  { id: 'g1', title: 'Morning on the central green', category: 'Campus', theme: 'campus', type: 'image', span: 'big' },
  { id: 'g2', title: 'Group work in Grade 4', category: 'Classrooms', theme: 'classroom', type: 'image', span: 'normal' },
  { id: 'g3', title: 'Sports day relay', category: 'Sports', theme: 'sports', type: 'video', span: 'wide' },
  { id: 'g4', title: 'Annual day rehearsal', category: 'Cultural Events', theme: 'drama', type: 'image', span: 'tall' },
  { id: 'g5', title: 'Robotics club build', category: 'Student Activities', theme: 'robotics', type: 'image', span: 'normal' },
  { id: 'g6', title: 'Festival of lights', category: 'Celebrations', theme: 'celebration', type: 'image', span: 'normal' },
  { id: 'g7', title: 'Science fair projects', category: 'Science Exhibitions', theme: 'science', type: 'image', span: 'wide' },
  { id: 'g8', title: 'Museum visit', category: 'Educational Trips', theme: 'trip', type: 'image', span: 'tall' },
  { id: 'g9', title: 'The library reading corner', category: 'Campus', theme: 'library', type: 'image', span: 'normal' },
  { id: 'g10', title: 'Maths lab', category: 'Classrooms', theme: 'math', type: 'image', span: 'normal' },
  { id: 'g11', title: 'Choir performance', category: 'Cultural Events', theme: 'music', type: 'video', span: 'normal' },
  { id: 'g12', title: 'Eco club garden', category: 'Student Activities', theme: 'garden', type: 'image', span: 'wide' },
  { id: 'g13', title: 'Football practice', category: 'Sports', theme: 'sports', type: 'image', span: 'tall' },
  { id: 'g14', title: 'Art exhibition', category: 'Student Activities', theme: 'art', type: 'image', span: 'normal' },
  { id: 'g15', title: 'Nature camp', category: 'Educational Trips', theme: 'trip', type: 'image', span: 'normal' },
  { id: 'g16', title: 'Graduation celebration', category: 'Celebrations', theme: 'award', type: 'image', span: 'big' },
]

/* ---------------- Testimonials ---------------- */
/**
 * SAMPLE PLACEHOLDERS — not real reviews. Replace with feedback the school
 * has permission to publish. Names appear only when `nameApproved` is true.
 */
export interface Testimonial {
  id: string
  quote: string
  author: string
  relation: string
  nameApproved: boolean
  tone: 'lavender' | 'peach' | 'sage'
}

export const testimonials: Testimonial[] = [
  { id: 't1', quote: 'This is a placeholder for approved parent feedback about their child’s experience. Real quotes will appear here once the school collects consent.', author: 'Parent', relation: 'Primary School parent (sample)', nameApproved: false, tone: 'lavender' },
  { id: 't2', quote: 'Placeholder for a student reflection — for example, a project or club that made school memorable. To be replaced with an approved quote.', author: 'Student', relation: 'Middle School student (sample)', nameApproved: false, tone: 'peach' },
  { id: 't3', quote: 'Placeholder for an alumni story, published only with the graduate’s permission.', author: 'Alumnus', relation: 'Alumni (sample)', nameApproved: false, tone: 'sage' },
  { id: 't4', quote: 'Placeholder for feedback about the admissions experience from a new family.', author: 'Parent', relation: 'Early Years parent (sample)', nameApproved: false, tone: 'lavender' },
]
