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
    name: 'Pre-Primary',
    short: 'Pre-Primary',
    grades: 'Nursery – UKG',
    ages: 'Ages 3 – 6',
    color: '#FFB99E',
    accent: '#FFE1D4',
    summary: 'Joyful, activity-based learning in the pre-primary years that builds language, curiosity and confidence.',
    goals: ['Early literacy & numeracy through play', 'Social and emotional confidence', 'Fine & gross motor development', 'Love for nature and the world around us'],
    activities: ['Pre-primary activities', 'Environment Day activities', 'Colour days & celebrations', 'NPPS Playzone'],
    approach: 'Facilitated, play-based learning with an activity plan for every session and a strong home–school partnership.',
  },
  {
    id: 'primary',
    name: 'Primary School',
    short: 'Primary',
    grades: 'Classes 1 – 5',
    ages: 'Ages 6 – 11',
    color: '#20B486',
    accent: '#DCECE1',
    summary: 'Strong foundations in reading, mathematics and inquiry — with experiential, hands-on learning.',
    goals: ['Fluent reading and expressive writing', 'Number sense, mental maths & problem solving', 'Inquiry habits in science & society', 'Kindness, collaboration and responsibility'],
    activities: ['Clay modelling & classroom activities', 'Abacus & mental maths', 'Club activities (CCA)', 'Yoga and sports'],
    approach: 'Facilitated learning through experiential and inquisitive methods, mapped to NEP 2020.',
  },
  {
    id: 'middle',
    name: 'Middle School',
    short: 'Middle',
    grades: 'Classes 6 – 8',
    ages: 'Ages 11 – 14',
    color: '#D9CBFF',
    accent: '#ECE5FF',
    summary: 'Deeper subject learning, independence and the confidence to ask bigger questions.',
    goals: ['Subject depth across sciences & humanities', 'Research and presentation skills', 'Digital literacy', 'Leadership and teamwork'],
    activities: ['Laboratory sessions', 'Talent exams & competitions', 'Inter-school sports', 'Educational trips'],
    approach: 'Subject teachers, activity-based learning and periodic assessments (PA-1 to PA-4) through the year.',
  },
  {
    id: 'secondary',
    name: 'Secondary School',
    short: 'Secondary',
    grades: 'Classes 9 – 10',
    ages: 'Ages 14 – 16',
    color: '#6FE0BB',
    accent: '#DCECE1',
    summary: 'Focused preparation for the CBSE Class X board examination — with 100% results in 2024–25 and 2025–26.',
    goals: ['CBSE Class X board-examination readiness', 'Analytical writing and reasoning', 'Laboratory and practical skills', 'Self-management and wellbeing'],
    activities: ['Board-exam preparation', 'Laboratory practicals', 'Inter-school sports', 'Student leadership (Investiture)'],
    approach: 'Structured curriculum, regular assessments, counselling support and individual attention.',
  },
  {
    id: 'senior-secondary',
    name: 'Senior Secondary',
    short: 'Senior',
    grades: 'Classes 11 – 12',
    ages: 'Ages 16 – 18',
    color: '#FFD27A',
    accent: '#FFF1CF',
    summary: 'Not currently offered.',
    goals: [],
    activities: [],
    approach: '',
  },
]

/** Only the stages the school actually offers. */
export const stages = allStages.filter((s) => s.id !== 'senior-secondary' || school.offers.seniorSecondary)
