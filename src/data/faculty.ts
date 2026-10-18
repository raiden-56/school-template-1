/**
 * SAMPLE PROFILES — fictional placeholders. Replace with approved staff
 * information and photographs (with consent) before publishing.
 */
export interface Educator {
  id: string
  name: string
  role: string
  department: string
  qualifications: string
  bio: string
  tone: 'lavender' | 'peach' | 'sage' | 'emerald'
  /** Optional real photo URL */
  photo?: string
}

export const departments = ['All', 'Leadership', 'Early Years', 'Sciences', 'Mathematics', 'Languages', 'Arts', 'Sports', 'Student Support'] as const

export const educators: Educator[] = [
  { id: 'principal', name: 'Dr. A. Sample', role: 'Principal', department: 'Leadership', qualifications: 'Qualifications to be published', bio: 'Leads the school’s academic vision and culture of care, with a focus on inquiry-led learning and teacher development.', tone: 'lavender' },
  { id: 'vice-principal', name: 'Ms. B. Placeholder', role: 'Vice Principal', department: 'Leadership', qualifications: 'Qualifications to be published', bio: 'Oversees academic planning, assessment and the day-to-day running of the school.', tone: 'sage' },
  { id: 'early-years-lead', name: 'Ms. C. Example', role: 'Early Years Coordinator', department: 'Early Years', qualifications: 'Qualifications to be published', bio: 'Designs the play-based early years programme and partners closely with families.', tone: 'peach' },
  { id: 'physics', name: 'Mr. D. Sample', role: 'Senior Teacher, Physics', department: 'Sciences', qualifications: 'Qualifications to be published', bio: 'Believes every concept should be seen, tested and questioned in the lab.', tone: 'emerald' },
  { id: 'biology', name: 'Ms. E. Placeholder', role: 'Teacher, Biology', department: 'Sciences', qualifications: 'Qualifications to be published', bio: 'Runs the eco club and the school garden research projects.', tone: 'sage' },
  { id: 'maths', name: 'Mr. F. Example', role: 'Head of Mathematics', department: 'Mathematics', qualifications: 'Qualifications to be published', bio: 'Builds number confidence through puzzles, maths labs and Olympiad preparation.', tone: 'lavender' },
  { id: 'english', name: 'Ms. G. Sample', role: 'Head of English', department: 'Languages', qualifications: 'Qualifications to be published', bio: 'Leads the reading programme, literature circles and the school magazine.', tone: 'peach' },
  { id: 'hindi', name: 'Mr. H. Placeholder', role: 'Teacher, Hindi', department: 'Languages', qualifications: 'Qualifications to be published', bio: 'Brings language alive through poetry, theatre and storytelling.', tone: 'emerald' },
  { id: 'art', name: 'Ms. I. Example', role: 'Art & Design Lead', department: 'Arts', qualifications: 'Qualifications to be published', bio: 'Curates the student exhibition and the design-thinking studio.', tone: 'peach' },
  { id: 'music', name: 'Mr. J. Sample', role: 'Music Teacher', department: 'Arts', qualifications: 'Qualifications to be published', bio: 'Directs the school choir and instrumental ensembles.', tone: 'lavender' },
  { id: 'sports', name: 'Mr. K. Placeholder', role: 'Head of Physical Education', department: 'Sports', qualifications: 'Qualifications to be published', bio: 'Coaches athletics and football, and leads the annual sports day.', tone: 'emerald' },
  { id: 'counsellor', name: 'Ms. L. Example', role: 'School Counsellor', department: 'Student Support', qualifications: 'Qualifications to be published', bio: 'Supports student wellbeing, social-emotional learning and career guidance.', tone: 'sage' },
]

export const getEducator = (id: string) => educators.find((e) => e.id === id)
