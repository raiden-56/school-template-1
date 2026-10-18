import { notPublished } from '@/config/school'

export interface AdmissionStep {
  title: string
  text: string
  cta?: { label: string; href: string }
}

/** Configure to match the school's real admission process. */
export const admissionSteps: AdmissionStep[] = [
  { title: 'Submit an enquiry', text: 'Tell us about your child and the grade you are applying for. It takes about two minutes.', cta: { label: 'Start enquiry', href: '/admissions/apply' } },
  { title: 'Schedule a campus visit', text: 'Walk the campus, see classrooms in action and meet our admissions team.', cta: { label: 'Book a visit', href: '/visit' } },
  { title: 'Review eligibility & documents', text: 'Check age criteria for the grade and keep the required documents ready.' },
  { title: 'Complete the application', text: 'Submit the application form along with the required documents.' },
  { title: 'Interaction or assessment', text: 'An age-appropriate interaction (and for some grades, a short assessment) helps us understand your child.' },
  { title: 'Admission decision', text: 'The admissions office will communicate the decision by email and phone.' },
  { title: 'Enrollment formalities', text: 'Complete fee payment and enrollment paperwork to confirm the seat.' },
]

export const gradesOffered = [
  'Nursery', 'LKG', 'UKG', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12',
] as const

export const currentGradeOptions = ['Not yet in school', 'Playgroup', ...gradesOffered] as const

/** Grades open for application this session. */
export const gradesOpen = gradesOffered.filter((g) => g !== 'Grade 10' && g !== 'Grade 12')

/** Age criteria — illustrative. Confirm against board and state regulations. */
export const ageCriteria: { grade: string; age: string }[] = [
  { grade: 'Nursery', age: '3+ years as on the cut-off date' },
  { grade: 'LKG', age: '4+ years as on the cut-off date' },
  { grade: 'UKG', age: '5+ years as on the cut-off date' },
  { grade: 'Grade 1', age: '6+ years as on the cut-off date' },
  { grade: 'Grades 2 – 9 & 11', age: 'Based on previous grade completion and transfer certificate' },
]
export const ageCutOffNote = 'The cut-off date and age criteria follow applicable board and state regulations and will be confirmed by the admissions office.'

export const requiredDocuments = [
  'Birth certificate (copy)',
  'Recent passport-size photographs of the student',
  'Proof of residence',
  'Previous school report card (Grade 1 onwards)',
  'Transfer certificate (Grade 2 onwards, at enrollment)',
  'Parent/guardian identity proof',
  'Medical / immunisation record',
]

export const admissionDates = [
  { label: 'Enquiries open', value: 'October 2026 (sample)' },
  { label: 'Campus visits', value: 'Every Saturday, by appointment' },
  { label: 'Application deadline', value: notPublished },
  { label: 'Session begins', value: notPublished },
]

export const admissionDownloads = [
  { label: 'Admission guidelines', href: '/documents/admission-guidelines-sample.pdf', size: 'PDF · sample' },
  { label: 'Application form', href: '/documents/application-form-sample.pdf', size: 'PDF · sample' },
  { label: 'Fee schedule', href: '/documents/fee-schedule-sample.pdf', size: 'PDF · sample' },
]
