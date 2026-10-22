import type { LucideIcon } from 'lucide-react'
import {
  Accessibility, Award, BadgeCheck, CalendarDays, ClipboardList, CreditCard, Droplets, FingerprintPattern, Flame,
  GraduationCap, HandHeart, HeartHandshake, CircleQuestionMark, Library, Megaphone, Receipt, School, ShieldCheck, Users,
} from 'lucide-react'
import { school } from '@/config/school'

/** Documents published on the school's current website (linked from the CBSE mandatory disclosure). */
const DOCS = 'http://www.newprathampublicschool.in'
export const officialDocs = {
  affiliation: `${DOCS}/affiliationLetter/affiliation.pdf`,
  trust: `${DOCS}/TrustCertificate/trust.pdf`,
  noc: `${DOCS}/NOC/noc.pdf`,
  recognition: `${DOCS}/RecognitionCertificate/Recognition.pdf`,
  building: `${DOCS}/BuildingCertificate/Building.pdf`,
  fire: `${DOCS}/FireCertificate/Fire.pdf`,
  selfCertification: `${DOCS}/DEOCertificate/deo.pdf`,
  waterHealth: `${DOCS}/WaterHealthCertificate/water.pdf`,
  fees: `${DOCS}/FeeStructure/fees.pdf`,
  calendar: `${DOCS}/AcademicCalendar/academiccalendar.pdf`,
  smc: `${DOCS}/List_of_SMC/SMC.pdf`,
  pta: `${DOCS}/Link_of_PTA/pta.pdf`,
  results: `${DOCS}/Link_of_ThreeYearResult/ThreeYearResult.pdf`,
  infrastructureVideo: 'https://youtu.be/08CCfkIGPYs',
}

/* ---------------- Fees ---------------- */
/** Fee structure 2026–27 (existing students), as published by the school. */
export interface FeeItem { label: string; amount: string | null; note?: string }
export interface FeeCategory { id: string; title: string; description: string; items: FeeItem[] }

const term = (i: number, ii: number, iii: number) => `Term I ₹${i.toLocaleString('en-IN')} · Term II ₹${ii.toLocaleString('en-IN')} · Term III ₹${iii.toLocaleString('en-IN')}`

export const feeCategories: FeeCategory[] = [
  { id: 'pre-primary', title: 'Pre-primary (Nursery – UKG)', description: 'Annual fee, payable in three terms.', items: [
    { label: 'Nursery', amount: '₹64,000 / year', note: term(28000, 18000, 18000) },
    { label: 'LKG & UKG', amount: '₹59,500 / year', note: term(23500, 18000, 18000) },
  ] },
  { id: 'primary', title: 'Primary (Classes 1 – 5)', description: 'Annual fee, payable in three terms.', items: [
    { label: 'Class 1', amount: '₹63,000 / year', note: term(27000, 18000, 18000) },
    { label: 'Classes 2 & 3', amount: '₹65,500 / year', note: term(28500, 18500, 18500) },
    { label: 'Classes 4 & 5', amount: '₹68,500 / year', note: term(29500, 19500, 19500) },
  ] },
  { id: 'middle', title: 'Middle (Classes 6 – 8)', description: 'Annual fee, payable in three terms.', items: [
    { label: 'Classes 6 – 8', amount: '₹68,500 / year', note: term(29500, 19500, 19500) },
  ] },
  { id: 'secondary', title: 'Secondary (Classes 9 – 10)', description: 'Annual fee, payable in three terms.', items: [
    { label: 'Classes 9 & 10', amount: '₹84,000 / year', note: term(34000, 25000, 25000) },
  ] },
]

export const feeConditions = [
  'Amounts are for existing students for the 2026–27 academic year, as per the official fee structure.',
  'Fees are payable in three terms (Term I, Term II and Term III).',
  'Charges for new admissions, books and uniforms are shared by the school office.',
  'NPPS follows the concept of no donation — no capitation fee or donation is charged for admission.',
]

export const scholarships: { title: string; text: string; eligibility: string }[] = []

/* ---------------- Safety & wellbeing ---------------- */
export interface SafetyItem { title: string; text: string; icon: LucideIcon; policy?: string }
export const safetyItems: SafetyItem[] = [
  { title: 'Certified safe building', text: 'A valid building safety certificate as per the National Building Code.', icon: School, policy: officialDocs.building },
  { title: 'Fire safety', text: 'A valid fire safety certificate issued by the competent authority.', icon: Flame, policy: officialDocs.fire },
  { title: 'Water, health & sanitation', text: 'Valid water, health and sanitation certificates, with 20 girls’ and 20 boys’ toilets.', icon: Droplets, policy: officialDocs.waterHealth },
  { title: 'Counselling support', text: 'A qualified counsellor & wellness teacher (M.Sc. Psychology) for students and families.', icon: Users },
  { title: 'Special education', text: 'A special educator (B.Ed. Special Education) supports students with additional needs.', icon: Accessibility },
  { title: 'Student wellbeing', text: 'Class teachers who know every child, in an ambient atmosphere of love and respect.', icon: HeartHandshake },
  { title: 'Anti-bullying', text: 'A clear anti-bullying approach with reporting routes for students and parents.', icon: HandHeart, policy: '/policies/anti-bullying' },
  { title: 'Child protection', text: 'Safeguarding in line with the POCSO Act, 2012 and CBSE guidelines.', icon: ShieldCheck, policy: '/policies/child-protection' },
]

/* ---------------- Parent & student hub ---------------- */
export interface HubTile { title: string; text: string; icon: LucideIcon; href: string | null; audience: 'parents' | 'students' | 'both'; external?: boolean; tone: 'lavender' | 'peach' | 'sage' | 'emerald' | 'plum' | 'cream' }
export const hubTiles: HubTile[] = [
  { title: 'Parent Portal', text: 'Attendance, reports and communication.', icon: FingerprintPattern, href: school.portals.parent, external: true, audience: 'parents', tone: 'plum' },
  { title: 'Student Portal', text: 'Assignments, resources and timetable.', icon: GraduationCap, href: school.portals.student, external: true, audience: 'students', tone: 'emerald' },
  { title: 'Fee Payment', text: 'Pay fees online securely.', icon: CreditCard, href: school.portals.feePayment, external: true, audience: 'parents', tone: 'peach' },
  { title: 'Academic Calendar', text: 'Assessments, holidays and celebrations.', icon: CalendarDays, href: '/events', audience: 'both', tone: 'sage' },
  { title: 'Fee Structure', text: 'Term-wise fees for 2026–27.', icon: Receipt, href: '/admissions/fees', audience: 'parents', tone: 'cream' },
  { title: 'Examination Schedule', text: 'Periodic assessments and annual exams.', icon: ClipboardList, href: '/events?category=Exams', audience: 'both', tone: 'peach' },
  { title: 'Board Results', text: 'Class X results for the last three years.', icon: Award, href: officialDocs.results, external: true, audience: 'both', tone: 'lavender' },
  { title: 'Notices & Circulars', text: 'Latest circulars from school.', icon: Megaphone, href: '/news?category=Circulars', audience: 'both', tone: 'emerald' },
  { title: 'Mandatory Disclosure', text: 'CBSE disclosure and school policies.', icon: BadgeCheck, href: '/disclosures', audience: 'parents', tone: 'plum' },
  { title: 'Gallery', text: 'Photos and videos from school life.', icon: Library, href: '/gallery', audience: 'both', tone: 'sage' },
  { title: 'FAQs', text: 'Quick answers to common questions.', icon: CircleQuestionMark, href: '/faq', audience: 'both', tone: 'peach' },
]

/* ---------------- FAQ ---------------- */
export interface Faq { q: string; a: string; category: string }
export const faqs: Faq[] = [
  { category: 'Admissions', q: 'Which classes does the school offer?', a: 'We offer classes from Nursery, LKG and UKG through Class 1 to Class X. Seat availability for each class is confirmed by the school office.' },
  { category: 'Academics', q: 'Which curriculum do you follow?', a: `The school is affiliated to the Central Board of Secondary Education (CBSE), New Delhi — affiliation number ${school.affiliation.affiliationNumber}, school code ${school.affiliation.schoolCode}. The curriculum is mapped to the National Education Policy (NEP 2020).` },
  { category: 'Academics', q: 'How have your Class X board results been?', a: '100% of our students passed the CBSE Class X board examination in 2024–25 (77 of 77) and 2025–26 (65 of 65), and 98.07% in 2023–24.' },
  { category: 'Admissions', q: 'How do I apply for admission?', a: `Fill in the admission enquiry form on this website or call the school office on ${school.contact.phone}. The office will guide you through the application, documents and a campus visit.` },
  { category: 'Admissions', q: 'What documents are required?', a: 'Typically a birth certificate, photographs, proof of residence, Aadhaar cards, the previous report card and a transfer certificate (where applicable). The full list is on the Admissions page.' },
  { category: 'Fees', q: 'What is the fee structure?', a: 'The 2026–27 fee structure for existing students ranges from ₹59,500 to ₹84,000 a year depending on the class, payable in three terms. See the Fees page for details. NPPS follows the concept of no donation.' },
  { category: 'Campus', q: 'What facilities does the campus have?', a: 'A/C classrooms, three laboratories including a computer lab, the NPPS Multi-Sports Activity Centre, the NPPS Playzone, a children’s gymnasium, an indoor sports centre, a cricket bowling machine and a mini pool.' },
  { category: 'Safety', q: 'How do you keep students safe?', a: 'Our building holds valid building safety, fire safety and water, health & sanitation certificates. A counsellor & wellness teacher and a special educator support students, and we follow the POCSO Act and CBSE guidelines on child protection.' },
  { category: 'Campus', q: 'Where is the school?', a: `${school.contact.addressLines.slice(1).join(', ')}.` },
  { category: 'Contact', q: 'How can I contact the school?', a: `Call ${school.contact.phone} or email ${school.contact.email}. You can also message us on WhatsApp or use the contact form.` },
  { category: 'Admissions', q: 'Can we visit the campus before applying?', a: 'Yes — we encourage it. Book a campus visit online or call the school office and we will confirm your slot.' },
]

/* ---------------- Downloadable documents ---------------- */
export const documents = [
  { label: 'Fee structure 2026–27', href: officialDocs.fees },
  { label: 'Academic calendar 2026–27', href: officialDocs.calendar },
  { label: 'Class X results — last three years', href: officialDocs.results },
  { label: 'CBSE affiliation letter', href: officialDocs.affiliation },
  { label: 'School Management Committee (SMC)', href: officialDocs.smc },
  { label: 'Parent Teacher Association (PTA)', href: officialDocs.pta },
]
