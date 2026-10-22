import type { LucideIcon } from 'lucide-react'
import {
  Atom, Brain, Calculator, ClipboardCheck, Compass, Cpu, Globe, Languages, Lightbulb, Palette, Rocket, Telescope,
} from 'lucide-react'

export interface Subject {
  id: string
  title: string
  icon: LucideIcon
  /** Line-art pattern drawn in the tile */
  pattern: 'orbits' | 'grid' | 'waves' | 'nodes' | 'spiral' | 'steps'
  tone: 'lavender' | 'peach' | 'sage' | 'plum' | 'cream' | 'emerald'
  size: 'lg' | 'md' | 'sm'
  summary: string
  detail: string
}

export const subjects: Subject[] = [
  { id: 'curriculum', title: 'CBSE Curriculum', icon: Compass, pattern: 'orbits', tone: 'plum', size: 'lg', summary: 'CBSE curriculum from Nursery to Class X, mapped to NEP 2020.', detail: 'The school is affiliated to CBSE, New Delhi (Affiliation No. 830770). Keeping in view the rules laid down by the National Education Policy (NEP 2020), the entire curriculum is mapped accordingly and our teachers are trained to tutor in line with NEP pedagogy.' },
  { id: 'facilitated', title: 'Facilitated Learning', icon: Lightbulb, pattern: 'steps', tone: 'peach', size: 'md', summary: 'Every learning session is supported with an activity plan.', detail: 'NPPS believes in facilitated learning. Learning happens through experiential and inquisitive methods, and the learning outcome is the key component exercised in the formal classroom.' },
  { id: 'languages', title: 'Languages', icon: Languages, pattern: 'waves', tone: 'lavender', size: 'md', summary: 'Language learning for confident expression and communication.', detail: 'Languages are taught as per the CBSE scheme of studies, with celebrations such as Kannada Rajyotsava honouring our language and culture.' },
  { id: 'mathematics', title: 'Mathematics', icon: Calculator, pattern: 'grid', tone: 'sage', size: 'lg', summary: 'Number sense and reasoning — with abacus and mental-maths practice.', detail: 'Students build strong number sense and problem-solving skills, take part in the Arithmetic Talent Exam and compete in inter-school abacus competitions.' },
  { id: 'sciences', title: 'Sciences', icon: Atom, pattern: 'nodes', tone: 'cream', size: 'md', summary: 'Hands-on science in well-equipped laboratories.', detail: 'Three laboratories, including the computer lab, support practical learning — along with Environment Day activities and educational trips such as the Jawaharlal Nehru Planetarium.' },
  { id: 'social-studies', title: 'Social Studies', icon: Globe, pattern: 'orbits', tone: 'lavender', size: 'sm', summary: 'History, geography and civics connected to the world around us.', detail: 'Educational trips — such as our visit to Vidhana Soudha — and special assemblies on national days bring social studies to life.' },
  { id: 'digital-literacy', title: 'Computer Education', icon: Cpu, pattern: 'grid', tone: 'emerald', size: 'sm', summary: 'Safe, responsible and creative use of technology.', detail: 'Computer lessons in the computer lab, an internet-enabled campus and teachers trained in implementing technology in the classroom.' },
  { id: 'physical-education', title: 'Physical Education', icon: Rocket, pattern: 'steps', tone: 'peach', size: 'md', summary: 'Sports, yoga and fitness on two playgrounds.', detail: 'The NPPS Multi-Sports Activity Centre, the NPPS Playzone, a children’s gymnasium, indoor sports, a cricket bowling machine and a mini pool — with professional training for future athletes.' },
  { id: 'arts', title: 'Art & Culture', icon: Palette, pattern: 'spiral', tone: 'plum', size: 'md', summary: 'Clay modelling, rangoli, music, dance and drama.', detail: 'Creative activities in class, rangoli competitions, Music Day and a grand Annual Day on stage give every student a chance to create and perform.' },
  { id: 'values', title: 'Human Values', icon: Brain, pattern: 'spiral', tone: 'sage', size: 'sm', summary: 'A human-centric, value-rich learning environment.', detail: 'We instil self-discipline and self-confidence in an ambient atmosphere of love and respect, growing true and responsible citizens of our country.' },
  { id: 'experiential', title: 'Beyond the Classroom', icon: Telescope, pattern: 'waves', tone: 'cream', size: 'sm', summary: 'Hands-on experiences beyond the corners of the classroom.', detail: 'Educational trips, club activities (CCA), Environment Day, Nutrition Week and festivals — learning from hands-on experience.' },
  { id: 'assessment', title: 'Assessment & Support', icon: ClipboardCheck, pattern: 'grid', tone: 'lavender', size: 'md', summary: 'Four periodic assessments and annual examinations, with support for every learner.', detail: 'Periodic Assessments (PA-1 to PA-4) through the year and annual examinations in March, with a special educator and a counsellor & wellness teacher supporting students who need it.' },
]
