import { school } from '@/config/school'

export interface LearningStage {
  id: string
  name: string
  short: string
  grades: string
  ages: string
  /** Planet colours used by the orbital selector */
  color: string
  accent: string
  summary: string
  goals: string[]
  activities: string[]
  approach: string
}

const allStages: LearningStage[] = [
  {
    id: 'early-years',
    name: 'Early Years',
    short: 'Kindergarten',
    grades: 'Nursery – UKG',
    ages: 'Ages 3 – 6',
    color: '#FFB99E',
    accent: '#FFE1D4',
    summary: 'Play-rich, sensory learning that builds curiosity, language and confidence.',
    goals: ['Early literacy & numeracy through play', 'Social and emotional confidence', 'Fine & gross motor development', 'Wonder about the natural world'],
    activities: ['Story circles', 'Sand & water discovery', 'Music and movement', 'Garden explorers'],
    approach: 'Child-led, play-based learning in small groups with a strong home–school partnership.',
  },
  {
    id: 'primary',
    name: 'Primary School',
    short: 'Primary',
    grades: 'Grades 1 – 5',
    ages: 'Ages 6 – 11',
    color: '#20B486',
    accent: '#DCECE1',
    summary: 'Strong foundations in reading, mathematics and inquiry — with joy at the centre.',
    goals: ['Fluent reading and expressive writing', 'Number sense & problem solving', 'Inquiry habits in science & society', 'Kindness, collaboration and responsibility'],
    activities: ['Reading buddies', 'Maths labs', 'Theme-based projects', 'Clubs and sports'],
    approach: 'Integrated, theme-based units that connect subjects to real-world questions.',
  },
  {
    id: 'middle',
    name: 'Middle School',
    short: 'Middle',
    grades: 'Grades 6 – 8',
    ages: 'Ages 11 – 14',
    color: '#D9CBFF',
    accent: '#ECE5FF',
    summary: 'Deeper subject learning, independence and the confidence to ask bigger questions.',
    goals: ['Subject depth across sciences & humanities', 'Research and presentation skills', 'Digital literacy and coding', 'Leadership and teamwork'],
    activities: ['Science fair projects', 'Model United Nations', 'Robotics club', 'Field trips'],
    approach: 'Specialist teachers, project-based learning and structured study skills.',
  },
  {
    id: 'secondary',
    name: 'Secondary School',
    short: 'Secondary',
    grades: 'Grades 9 – 10',
    ages: 'Ages 14 – 16',
    color: '#6FE0BB',
    accent: '#DCECE1',
    summary: 'Rigorous preparation for board examinations alongside a broad, balanced life.',
    goals: ['Board-examination readiness', 'Analytical writing and reasoning', 'Laboratory and practical skills', 'Self-management and wellbeing'],
    activities: ['Olympiad preparation', 'Debate & public speaking', 'Community service', 'Inter-school sports'],
    approach: 'Structured curriculum, regular formative feedback and individual mentoring.',
  },
  {
    id: 'senior-secondary',
    name: 'Senior Secondary',
    short: 'Senior',
    grades: 'Grades 11 – 12',
    ages: 'Ages 16 – 18',
    color: '#FFD27A',
    accent: '#FFF1CF',
    summary: 'Specialised streams, university guidance and the independence to lead.',
    goals: ['Stream specialisation', 'University & career readiness', 'Independent research', 'Student leadership'],
    activities: ['Career counselling', 'Capstone projects', 'Internship exposure', 'Student council'],
    approach: 'Stream-based study with personal guidance on higher education pathways.',
  },
]

/** Only the stages the school actually offers. */
export const stages = allStages.filter((s) => s.id !== 'senior-secondary' || school.offers.seniorSecondary)
