import { notPublished } from '@/config/school'

export interface AdmissionStep {
  title: string
  text: string
  cta?: { label: string; href: string }
}

/** Configure to match the school's real admission process. */
export const admissionSteps: AdmissionStep[] = [
  { title: 'Submit an enquiry', text: 'Fill in the admission enquiry form or call the school office on 080 4095 4645. Tell us about your child and the class you are applying for.', cta: { label: 'Start enquiry', href: '/admissions/apply' } },
  { title: 'Visit the campus', text: 'Visit us at Pai Layout, K R Puram, see our classrooms and playgrounds and meet the school team.', cta: { label: 'Book a visit', href: '/visit' } },
  { title: 'Check eligibility & documents', text: 'Check the age criteria for the class and keep the required documents ready.' },
  { title: 'Complete the application', text: 'Collect and submit the application form at the school office along with the required documents.' },
  { title: 'Interaction', text: 'A short, age-appropriate interaction helps us understand your child.' },
  { title: 'Fee payment & enrolment', text: 'Pay the first-term fee as per the published fee structure to confirm the seat. No donation is charged.' },
]

export const gradesOffered = [
  'Nursery', 'LKG', 'UKG', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10',
] as const

export const currentGradeOptions = ['Not yet in school', 'Playgroup', ...gradesOffered] as const

/** Classes open for application this session — seat availability is confirmed by the school office. */
export const gradesOpen = [...gradesOffered]

/** Age criteria follow CBSE and Government of Karnataka norms; confirm with the school office. */
export const ageCriteria: { grade: string; age: string }[] = [
  { grade: 'Nursery', age: '3+ years as on the cut-off date' },
  { grade: 'LKG', age: '4+ years as on the cut-off date' },
  { grade: 'UKG', age: '5+ years as on the cut-off date' },
  { grade: 'Class 1', age: '6+ years as on the cut-off date' },
  { grade: 'Classes 2 – 10', age: 'Based on completion of the previous class and transfer certificate' },
]
export const ageCutOffNote = 'The cut-off date and age criteria follow CBSE and Government of Karnataka regulations and are confirmed by the school office at the time of admission.'

export const requiredDocuments = [
  'Birth certificate (copy)',
  'Recent passport-size photographs of the student',
  'Proof of residence',
  'Aadhaar card of the student and parents',
  'Previous school report card (Class 1 onwards)',
  'Transfer certificate (Class 2 onwards, at enrolment)',
]

export const admissionDates = [
  { label: 'Enquiries', value: 'Open — call 080 4095 4645 or use the enquiry form' },
  { label: 'Campus visits', value: 'By appointment with the school office' },
  { label: 'Application deadline', value: notPublished },
  { label: 'Academic year', value: 'June to April, as per the academic calendar' },
]

export const admissionDownloads = [
  { label: 'Fee structure 2026–27', href: 'http://www.newprathampublicschool.in/FeeStructure/fees.pdf', size: 'PDF' },
  { label: 'Academic calendar 2026–27', href: 'http://www.newprathampublicschool.in/AcademicCalendar/academiccalendar.pdf', size: 'PDF' },
]
