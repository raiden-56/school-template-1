import type { LucideIcon } from 'lucide-react'
import {
  Accessibility, Ambulance, BadgeCheck, Bus, CalendarDays, ClipboardList, Clock, CreditCard, Eye, FileText, FingerprintPattern,
  GraduationCap, HandHeart, HeartHandshake, CircleQuestionMark, Library, Megaphone, NotebookPen, School, ShieldCheck, Siren, UserCheck, Users,
} from 'lucide-react'
import { school, notPublished } from '@/config/school'

/* ---------------- Fees ---------------- */
/**
 * Fee categories. Amounts are deliberately `null` — they are never invented.
 * Enter amounts exactly as approved by school management.
 */
export interface FeeItem { label: string; amount: string | null; note?: string }
export interface FeeCategory { id: string; title: string; description: string; items: FeeItem[] }

export const feeCategories: FeeCategory[] = [
  { id: 'tuition', title: 'Tuition fees', description: 'Charged per term or annually depending on grade band.', items: [
    { label: 'Early Years (Nursery – UKG)', amount: null }, { label: 'Primary (Grades 1 – 5)', amount: null }, { label: 'Middle (Grades 6 – 8)', amount: null }, { label: 'Secondary & Senior Secondary (Grades 9 – 12)', amount: null },
  ] },
  { id: 'admission', title: 'Registration & admission charges', description: 'One-time charges payable at the time of registration and enrollment.', items: [
    { label: 'Registration fee', amount: null, note: 'Payable with the application form' }, { label: 'Admission fee', amount: null, note: 'Payable at enrollment' }, { label: 'Refundable security deposit (if applicable)', amount: null },
  ] },
  { id: 'transport', title: 'Transportation', description: 'Optional, charged according to route distance.', items: [{ label: 'Transport (by route slab)', amount: null, note: 'Subject to route availability' }] },
  { id: 'books', title: 'Books & uniforms', description: 'Purchased through the school or designated vendors.', items: [{ label: 'Books & stationery', amount: null }, { label: 'Uniform set', amount: null }] },
  { id: 'other', title: 'Other applicable charges', description: 'Activity, examination or excursion charges, where applicable.', items: [{ label: 'Activity & clubs', amount: null }, { label: 'Educational trips (optional)', amount: null }] },
]

export const feeConditions = [
  'All fees are as per the official fee schedule approved by school management and applicable regulations.',
  'Fees once paid are refundable only as per the school’s published refund policy.',
  'Payment modes and instalment options are communicated by the accounts office.',
  'The school does not accept capitation fees or donations as a condition of admission.',
]

export const scholarships = school.offers.scholarships
  ? [
      { title: 'Merit scholarship', text: 'Criteria and value to be published by the school.', eligibility: notPublished },
      { title: 'Sibling concession', text: 'Policy to be published by the school.', eligibility: notPublished },
      { title: 'Need-based financial assistance', text: 'Families may apply confidentially through the admissions office.', eligibility: notPublished },
    ]
  : []

/* ---------------- Safety & wellbeing ---------------- */
export interface SafetyItem { title: string; text: string; icon: LucideIcon; policy?: string }
export const safetyItems: SafetyItem[] = [
  { title: 'Campus supervision', text: 'Staff supervision during arrival, breaks and dismissal. Describe CCTV coverage here only if installed.', icon: Eye },
  { title: 'Visitor procedures', text: 'All visitors sign in at reception, carry a visitor pass and are escorted on campus.', icon: UserCheck },
  { title: 'Emergency preparedness', text: 'Regular evacuation drills and documented emergency procedures.', icon: Siren },
  { title: 'First aid & medical support', text: 'Medical room with first-aid provision during school hours; parents informed promptly.', icon: Ambulance },
  { title: 'Transport safety', text: 'Attendants on school buses and a documented transport policy.', icon: Bus, policy: '/documents/transport-policy-sample.pdf' },
  { title: 'Student wellbeing', text: 'Class teachers and mentors who know every child, with a social-emotional learning programme.', icon: HeartHandshake },
  { title: 'Anti-bullying', text: 'A clear anti-bullying policy with reporting routes for students and parents.', icon: HandHeart, policy: '/policies/anti-bullying' },
  { title: 'Counselling support', text: 'Access to the school counsellor for students and families.', icon: Users },
  { title: 'Child protection', text: 'A child protection policy with a designated safeguarding lead.', icon: ShieldCheck, policy: '/policies/child-protection' },
  { title: 'Accessibility & inclusion', text: 'Reasonable adjustments and individual support planning for students with additional needs.', icon: Accessibility, policy: '/accessibility' },
]

/* ---------------- Parent & student hub ---------------- */
export interface HubTile { title: string; text: string; icon: LucideIcon; href: string | null; audience: 'parents' | 'students' | 'both'; external?: boolean; tone: 'lavender' | 'peach' | 'sage' | 'emerald' | 'plum' | 'cream' }
export const hubTiles: HubTile[] = [
  { title: 'Parent Portal', text: 'Attendance, reports and communication.', icon: FingerprintPattern, href: school.portals.parent, external: true, audience: 'parents', tone: 'plum' },
  { title: 'Student Portal', text: 'Assignments, resources and timetable.', icon: GraduationCap, href: school.portals.student, external: true, audience: 'students', tone: 'emerald' },
  { title: 'Teacher Portal', text: 'Staff access only.', icon: School, href: school.portals.teacher, external: true, audience: 'both', tone: 'lavender' },
  { title: 'Fee Payment', text: 'Pay fees online securely.', icon: CreditCard, href: school.portals.feePayment, external: true, audience: 'parents', tone: 'peach' },
  { title: 'Academic Calendar', text: 'Terms, holidays and key dates.', icon: CalendarDays, href: '/events', audience: 'both', tone: 'sage' },
  { title: 'Timetables', text: 'Class timetables by grade.', icon: Clock, href: '/documents/timetable-sample.pdf', audience: 'both', tone: 'cream' },
  { title: 'Syllabus', text: 'Subject syllabus by grade.', icon: NotebookPen, href: '/documents/syllabus-overview-sample.pdf', audience: 'both', tone: 'lavender' },
  { title: 'Examination Schedules', text: 'Assessment dates and guidance.', icon: ClipboardList, href: '/documents/exam-schedule-sample.pdf', audience: 'both', tone: 'peach' },
  { title: 'Homework & Resources', text: 'Learning resources and reading lists.', icon: Library, href: '/students#resources', audience: 'students', tone: 'sage' },
  { title: 'Notices & Circulars', text: 'Latest circulars from school.', icon: Megaphone, href: '/news?category=Circulars', audience: 'both', tone: 'emerald' },
  { title: 'School Policies', text: 'Policies and mandatory disclosures.', icon: BadgeCheck, href: '/disclosures', audience: 'parents', tone: 'plum' },
  { title: 'Transport Information', text: 'Routes, timings and policy.', icon: Bus, href: '/documents/transport-policy-sample.pdf', audience: 'parents', tone: 'cream' },
  { title: 'Parent Handbook', text: 'Everything families need to know.', icon: FileText, href: '/documents/parent-handbook-sample.pdf', audience: 'parents', tone: 'lavender' },
  { title: 'FAQs', text: 'Quick answers to common questions.', icon: CircleQuestionMark, href: '/faq', audience: 'both', tone: 'peach' },
]

/* ---------------- FAQ ---------------- */
export interface Faq { q: string; a: string; category: string }
export const faqs: Faq[] = [
  { category: 'Admissions', q: 'Which grades does the school offer?', a: `We offer Nursery to Grade ${school.offers.seniorSecondary ? '12' : '10'}. Seat availability for each grade is confirmed by the admissions office.` },
  { category: 'Academics', q: 'Which curriculum do you follow?', a: 'The school follows a national-board curriculum (board and affiliation details to be published), enriched with inquiry, projects and the arts.' },
  { category: 'Admissions', q: 'When do admissions open?', a: `Admissions for the ${school.academicYear} session are open. Please see the Admissions page for key dates.` },
  { category: 'Admissions', q: 'What documents are required?', a: 'Typically a birth certificate, photographs, proof of residence, previous report card and transfer certificate (where applicable). The full list is on the Admissions page.' },
  { category: 'Fees', q: 'What is the fee structure?', a: 'The approved fee schedule is shared by the admissions office and can be downloaded from the Fees page once published. We never require donations for admission.' },
  { category: 'Campus', q: 'Do you provide transport?', a: 'School transport is available on selected routes, subject to availability. Contact the office for route details.' },
  { category: 'Campus', q: 'What facilities does the campus have?', a: 'Smart classrooms, science and computer labs, a library, sports grounds, studios for art, music, dance and drama, an auditorium and gardens. Explore them on the Campus page.' },
  { category: 'Safety', q: 'How do you keep students safe?', a: 'Supervision, visitor procedures, emergency drills, first-aid provision, transport attendants and a child protection policy. See Safety & Wellbeing for details.' },
  { category: 'Contact', q: 'How can I contact the school?', a: `Call ${school.contact.phone} or email ${school.contact.email} during office hours. You can also use the contact form.` },
  { category: 'Parents', q: 'How do I access the parent portal?', a: 'Login details are shared with enrolled families at the start of the session. Use the Parent Portal link in the quick-links menu.' },
  { category: 'Admissions', q: 'Can we visit the campus before applying?', a: 'Yes — we encourage it. Book a campus visit online and our team will confirm your slot.' },
]

/* ---------------- Downloadable documents ---------------- */
export const documents = [
  { label: 'Admission guidelines', href: '/documents/admission-guidelines-sample.pdf' },
  { label: 'Application form', href: '/documents/application-form-sample.pdf' },
  { label: 'Fee schedule', href: '/documents/fee-schedule-sample.pdf' },
  { label: 'Academic calendar', href: '/documents/academic-calendar-sample.pdf' },
  { label: 'Parent handbook', href: '/documents/parent-handbook-sample.pdf' },
  { label: 'Transport policy', href: '/documents/transport-policy-sample.pdf' },
  { label: 'Examination schedule', href: '/documents/exam-schedule-sample.pdf' },
]
