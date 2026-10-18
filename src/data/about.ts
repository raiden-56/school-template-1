import { notPublished } from '@/config/school'

/**
 * About-the-school content. Statements below are SAMPLE copy describing the
 * intended educational approach — review and replace with the school's own words.
 */
export const about = {
  intro:
    'NovaVerse is a place where curiosity is taken seriously. We believe children learn best when they feel safe, are known by name, and are given real questions to explore — in classrooms, studios, laboratories and outdoors.',
  mission:
    'To nurture curious, compassionate and capable young people through joyful, rigorous learning that connects knowledge to the real world.',
  vision:
    'A learning community where every child discovers what they love, learns how to learn, and grows the character to make a positive difference.',
  values: [
    { title: 'Curiosity', text: 'We ask questions and follow them.' },
    { title: 'Kindness', text: 'We look after one another.' },
    { title: 'Integrity', text: 'We do the right thing, even when it is hard.' },
    { title: 'Courage', text: 'We try, fail, learn and try again.' },
    { title: 'Belonging', text: 'Every child is known and valued.' },
    { title: 'Stewardship', text: 'We care for our planet and community.' },
  ],
  history: {
    title: 'Our history',
    text: `Founding year, founders and milestones: ${notPublished}. This space tells the story of how the school began and how it has grown.`,
  },
  philosophy: {
    title: 'Educational philosophy',
    points: [
      'Inquiry first — students learn by investigating real questions.',
      'Balance — academics, arts, sport and wellbeing carry equal weight.',
      'Relationships — small advisory groups so every child has a trusted adult.',
      'Evidence — teaching informed by research and continuous feedback.',
    ],
  },
  unique: [
    { title: 'Learning beyond walls', text: 'Outdoor classrooms, gardens and trips are part of the timetable, not extras.' },
    { title: 'Studio culture', text: 'Art, music, design and drama are taught by specialists in dedicated studios.' },
    { title: 'Know every child', text: 'Mentor groups, student-led conferences and individual learning plans.' },
    { title: 'Future-ready', text: 'Coding, robotics and design thinking from the primary years.' },
  ],
  principal: {
    name: 'Dr. A. Sample',
    title: 'Principal',
    sample: true,
    excerpt:
      'Every child arrives with a universe of questions. Our job is to protect that wonder, give it direction, and help it grow into knowledge, character and purpose.',
    letter: [
      'Dear families,',
      'Welcome to NovaVerse. This is a sample principal’s message that shows how a personal welcome will appear on the website. The final message will be written and approved by the principal.',
      'At our school we believe that learning is an adventure that children and adults share. We want every student to leave us with deep knowledge, the confidence to use it and the kindness to use it well.',
      'Our teachers know each child by name, by strengths and by the things they are still working on. Our campus is designed for discovery — from science labs and studios to gardens and playing fields.',
      'I warmly invite you to visit us, meet our teachers and see learning in action.',
    ],
  },
  leadership: [
    { name: 'Chairperson, Managing Committee', person: notPublished, role: 'Governance and strategic direction' },
    { name: 'Principal', person: 'Dr. A. Sample (sample)', role: 'Academic leadership and school culture' },
    { name: 'Vice Principal', person: 'Ms. B. Placeholder (sample)', role: 'Academic operations and assessment' },
    { name: 'Head of Admissions', person: notPublished, role: 'Admissions and family partnerships' },
    { name: 'Head of Student Wellbeing', person: notPublished, role: 'Pastoral care, counselling and safeguarding' },
    { name: 'Administrative Officer', person: notPublished, role: 'Operations, transport and facilities' },
  ],
}
