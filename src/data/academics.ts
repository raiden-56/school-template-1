import type { LucideIcon } from 'lucide-react'
import {
  Atom, Bot, Brain, Calculator, ClipboardCheck, Compass, Cpu, Globe, Languages, Lightbulb, Palette, Rocket, Telescope, Hammer,
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
  { id: 'curriculum', title: 'Curriculum & Board', icon: Compass, pattern: 'orbits', tone: 'plum', size: 'lg', summary: 'A national-board curriculum enriched with inquiry and projects.', detail: 'Our curriculum follows the affiliated board’s framework (to be confirmed by the school), extended with interdisciplinary units, reading programmes and real-world projects at every stage.' },
  { id: 'languages', title: 'Languages', icon: Languages, pattern: 'waves', tone: 'peach', size: 'md', summary: 'English, Hindi and a third language, taught for expression and fluency.', detail: 'Literature circles, creative writing, drama-based language learning and debate build confident, articulate communicators.' },
  { id: 'mathematics', title: 'Mathematics', icon: Calculator, pattern: 'grid', tone: 'lavender', size: 'md', summary: 'Number sense, patterns and reasoning through hands-on maths labs.', detail: 'Manipulatives in the early years, maths labs in primary and problem-solving clubs and Olympiad preparation in senior years.' },
  { id: 'sciences', title: 'Sciences', icon: Atom, pattern: 'nodes', tone: 'sage', size: 'lg', summary: 'Physics, chemistry and biology learnt by observing, testing and questioning.', detail: 'Regular laboratory sessions, nature walks, the science fair and student research projects make science something students do, not just read.' },
  { id: 'social-studies', title: 'Social Studies', icon: Globe, pattern: 'orbits', tone: 'cream', size: 'sm', summary: 'History, geography, civics and economics connected to today’s world.', detail: 'Map work, heritage walks, mock parliaments and case studies help students understand communities and responsibilities.' },
  { id: 'digital-literacy', title: 'Digital Literacy', icon: Cpu, pattern: 'grid', tone: 'lavender', size: 'sm', summary: 'Safe, responsible and creative use of technology.', detail: 'Age-appropriate digital citizenship, online safety, productivity tools and media literacy from Grade 1 onwards.' },
  { id: 'stem', title: 'STEM', icon: Rocket, pattern: 'steps', tone: 'emerald', size: 'md', summary: 'Design challenges that combine science, technology, engineering and maths.', detail: 'Build-test-improve cycles, tinkering kits and interdisciplinary challenges develop resilient problem solvers.' },
  { id: 'robotics', title: 'Robotics & Coding', icon: Bot, pattern: 'nodes', tone: 'plum', size: 'md', summary: 'From block coding to text-based programming and robotics.', detail: 'Students progress from visual programming to Python and microcontrollers, applying code to robots and real-world sensors.' },
  { id: 'arts', title: 'Arts & Design', icon: Palette, pattern: 'spiral', tone: 'peach', size: 'md', summary: 'Visual art, music, dance and drama as core parts of learning.', detail: 'Dedicated studios, exhibitions and performances let every student create, perform and reflect.' },
  { id: 'critical-thinking', title: 'Critical Thinking', icon: Brain, pattern: 'spiral', tone: 'sage', size: 'sm', summary: 'Questioning, reasoning and evaluating evidence.', detail: 'Philosophy for children, structured debate and thinking routines are woven through every subject.' },
  { id: 'project-based', title: 'Project-Based Learning', icon: Lightbulb, pattern: 'steps', tone: 'lavender', size: 'sm', summary: 'Long-form projects that solve authentic problems.', detail: 'Each term includes a project with a public outcome — an exhibition, a prototype, a campaign or a performance.' },
  { id: 'experiential', title: 'Experiential Education', icon: Telescope, pattern: 'waves', tone: 'cream', size: 'sm', summary: 'Learning outdoors, on trips and through service.', detail: 'Field trips, outdoor classrooms, community projects and residential camps (where offered) take learning beyond walls.' },
  { id: 'assessment', title: 'Assessment & Support', icon: ClipboardCheck, pattern: 'grid', tone: 'peach', size: 'md', summary: 'Continuous, transparent assessment with support for every learner.', detail: 'Formative feedback, periodic assessments and term reports, with remedial and enrichment support guided by teachers and counsellors.' },
  { id: 'career-guidance', title: 'Career Guidance', icon: Hammer, pattern: 'orbits', tone: 'emerald', size: 'sm', summary: 'Guidance on streams, universities and careers for senior students.', detail: 'Aptitude conversations, stream selection support and higher-education guidance for Grades 9–12.' },
]
