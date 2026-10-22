/**
 * Teaching staff as published in the school's CBSE mandatory public disclosure
 * (Section F — Teacher details). Add photos (with consent) via `photo`.
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

export const departments = ['All', 'Leadership', 'Pre-Primary', 'Primary', 'Secondary', 'Physical Education', 'Student Support'] as const

type Designation = 'PRINCIPAL' | 'PGT' | 'TGT' | 'PRT' | 'NTT' | 'PET' | 'SPECIAL EDUCATOR' | 'WELLNESS TEACHER' | 'OTHER'

const designation: Record<Designation, { role: string; department: (typeof departments)[number]; bio: string }> = {
  PRINCIPAL: { role: 'Principal', department: 'Leadership', bio: 'Leads the academic vision of New Pratham Public School and its faculty.' },
  PGT: { role: 'Post Graduate Teacher (PGT)', department: 'Secondary', bio: 'Post Graduate Teacher at New Pratham Public School.' },
  TGT: { role: 'Trained Graduate Teacher (TGT)', department: 'Secondary', bio: 'Trained Graduate Teacher at New Pratham Public School.' },
  PRT: { role: 'Primary Teacher (PRT)', department: 'Primary', bio: 'Primary Teacher at New Pratham Public School.' },
  NTT: { role: 'Nursery Teacher (NTT)', department: 'Pre-Primary', bio: 'Pre-primary teacher at New Pratham Public School.' },
  PET: { role: 'Physical Education Teacher', department: 'Physical Education', bio: 'Physical Education Teacher — sports, fitness and yoga.' },
  'SPECIAL EDUCATOR': { role: 'Special Educator', department: 'Student Support', bio: 'Supports students with additional learning needs.' },
  'WELLNESS TEACHER': { role: 'Counsellor & Wellness Teacher', department: 'Student Support', bio: 'Counselling and wellbeing support for students and families.' },
  OTHER: { role: 'Staff', department: 'Secondary', bio: 'Staff member at New Pratham Public School.' },
}

/** [name, designation, qualification] — in the order listed in the disclosure. */
const staff: [string, Designation, string][] = [
  ['K. Jeevarathnam Reddy', 'PRINCIPAL', 'M.Com., M.Ed.'],
  ['Priya R.', 'SPECIAL EDUCATOR', 'B.Ed. (Special Education), MCA'],
  ['Alice A.', 'WELLNESS TEACHER', 'M.Sc. (Psychology), B.Ed.'],
  ['M. Uma', 'PGT', 'M.Tech., B.Ed.'],
  ['Sowjanya M.', 'PGT', 'M.Ed.'],
  ['Latha K.', 'PGT', 'B.Ed.'],
  ['Rasmita Sahoo', 'TGT', 'B.Ed.'],
  ['Deepa C. N.', 'TGT', 'B.Ed.'],
  ['C. Kayalvizhi', 'TGT', 'B.E.'],
  ['Suman Sharma', 'TGT', 'B.Ed.'],
  ['R. Priya', 'TGT', 'B.Ed.'],
  ['Sangeetha Anand', 'TGT', 'M.Sc.'],
  ['Parimala D.', 'TGT', 'B.A.'],
  ['Roopa R.', 'TGT', 'M.A.'],
  ['Suma C.', 'TGT', 'B.A.'],
  ['E. Angelina Michael', 'TGT', 'B.E.'],
  ['Janaki Kumari Sahu', 'TGT', 'M.A.'],
  ['Ajitha S.', 'TGT', 'M.Sc.'],
  ['K. Monisha', 'TGT', 'B.E.'],
  ['Kalavathy', 'TGT', 'M.Sc., M.Phil.'],
  ['Anuroopa Anil', 'TGT', 'B.Ed.'],
  ['Rajni Kumari', 'TGT', 'B.A.'],
  ['Ashalatha S. R.', 'TGT', 'M.A.'],
  ['Roshini Singh', 'PRT', 'D.Ed.'],
  ['Chitra N.', 'PRT', 'D.Ed.'],
  ['Mary Jacinitha', 'PRT', 'PUC'],
  ['Sivapriya S.', 'PRT', 'B.A.'],
  ['Kalaivani S.', 'PRT', 'B.A.'],
  ['Menaga R.', 'PRT', 'B.Ed.'],
  ['Lakshmi Karthick', 'PRT', 'D.El.Ed.'],
  ['Rokhaiya', 'PRT', 'B.Ed.'],
  ['Saumya Achar', 'PRT', 'B.Com.'],
  ['Rabiabasri K.', 'PRT', 'B.E.'],
  ['Deepali Anand', 'PRT', 'M.Sc.'],
  ['Vidyashree Daga', 'PRT', 'B.A.'],
  ['Prabha K.', 'NTT', 'Dip. in Computer, Dip. in Art & Craft, NTT'],
  ['M. Yamuna', 'NTT', 'PUC, NTT'],
  ['Bhavani', 'NTT', 'PUC'],
  ['Praveena K.', 'NTT', 'B.A.'],
  ['Jayashreebai P.', 'NTT', 'B.A.'],
  ['Netala Sambharamma', 'PET', 'UGD'],
  ['Yalamanchili Sivaji Ganesh', 'PET', 'B.Sc.'],
  ['Malathi', 'OTHER', 'MCA'],
]

const tones: Educator['tone'][] = ['lavender', 'peach', 'sage', 'emerald']
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

export const educators: Educator[] = staff.map(([name, d, qualifications], i) => ({
  id: d === 'PRINCIPAL' ? 'principal' : slug(name),
  name,
  role: designation[d].role,
  department: designation[d].department,
  qualifications,
  bio: designation[d].bio,
  tone: tones[i % tones.length],
  photo: d === 'PRINCIPAL' ? '/images/leadership/principal.jpg' : undefined,
}))

export const getEducator = (id: string) => educators.find((e) => e.id === id)
