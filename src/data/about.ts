/**
 * About-the-school content, taken from the school's existing website
 * (Home and About Us pages). Light copy-editing only — spelling and grammar.
 */
export const about = {
  intro:
    'Welcome to New Pratham Public School, where education meets inspiration. We are dedicated to empowering students with the knowledge, creativity and values needed to thrive in an ever-changing world — in a nurturing environment that encourages academic excellence, personal growth and a lifelong passion for learning.',
  mission:
    'Provide quality, uncompromised, concept-based teaching and learning. Inculcate a human-centric, value-rich learning environment. Impart physical education and adventure activities to ambitious students and help them achieve their goals. Extend our educational service to rural students and uplift socio-economic standards.',
  vision:
    'Help children realise their potential by providing a hassle-free academic environment, give them opportunities to go beyond the corners of the classroom and learn from hands-on experience, and present a learning atmosphere enriched with human values.',
  values: [
    { title: 'All-round development', text: 'Every child grows academically, physically and personally.' },
    { title: 'Self-discipline', text: 'We instil discipline and build self-confidence in every child.' },
    { title: 'Human values', text: 'Learning rooted in love, respect and responsibility.' },
    { title: 'Experiential learning', text: 'Children learn by doing, asking and exploring.' },
    { title: 'Affordable excellence', text: 'High-quality education at an affordable cost — no donation.' },
    { title: 'Responsible citizens', text: 'Growing true and responsible citizens of our country.' },
  ],
  history: {
    title: 'Our story',
    text: 'New Pratham Public School is affiliated to the Central Board of Secondary Education (CBSE), New Delhi, and offers classes from Nursery to Class X with the dedicated vision of “All-Round Development” of each and every child in an ambient atmosphere of love and respect. We endeavour to instil self-discipline and develop self-confidence in children, creating a conducive environment in which they can learn, play and grow into true and responsible citizens of our country.',
  },
  philosophy: {
    title: 'How we teach',
    points: [
      'Facilitated learning — every learning session is supported by an activity plan.',
      'Experiential and inquisitive methods — children learn by doing and by asking questions.',
      'Learning outcomes are the key component exercised in the formal classroom.',
      'Curriculum mapped to the National Education Policy (NEP 2020), with teachers trained in NEP pedagogy.',
    ],
  },
  unique: [
    { title: 'No donation', text: 'High-quality education at an affordable cost, with the concept of no donation.' },
    { title: 'NEP 2020 aligned', text: 'The entire curriculum is mapped to NEP 2020 and teachers are trained to tutor in line with NEP pedagogy.' },
    { title: 'Two playgrounds', text: 'The NPPS Multi-Sports Activity Centre and the NPPS Playzone, with equipment that boosts physical development.' },
    { title: 'Unique facilities', text: 'Children’s gymnasium, cricket bowling machine, indoor sports centre, mini pool, A/C classrooms and well-equipped laboratories.' },
  ],
  principal: {
    name: 'Shri K. Jeevarathnam Reddy',
    title: 'Principal',
    photo: '/images/leadership/principal.jpg',
    sample: false,
    excerpt:
      'Our faculty is dedicated to designing and executing a unique blend of world-class curriculum and contemporary teaching methodologies, with equal focus on intellectual, physical and personality development — evolving our Prathamites into future leaders and achievers.',
    letter: [
      'Dear parents and students,',
      'Our faculty is dedicated to designing and executing a unique blend of world-class curriculum with a distinctive amalgamation of contemporary teaching methodologies.',
      'We place an equal emphasis on intellectual, physical and personality development — an approach that evolves our Prathamites into future leaders and achievers.',
      'I warmly invite you to visit New Pratham Public School, meet our teachers and see our students in action.',
    ],
  },
  leadership: [
    {
      name: 'Chairman',
      person: 'Dr. S. G. Prakash Rao Sathe',
      role: 'Philanthropist known for his exemplary work towards promoting a better society. He has been honoured with several national-level awards, including the Bharat Ratna Award and a Doctorate.',
      photo: '/images/leadership/chairman.jpg',
      message: 'It gives me immense pleasure to welcome you as a student of NPPS. We enjoy the proud and unique distinction of being an institution with a rich history, traditions and achievements spanning over a decade.',
    },
    {
      name: 'Managing Trustee',
      person: 'Dr. Neetha Sathe',
      role: 'A young educationist and energetic entrepreneur who seeks to foster young talent and nurture women’s empowerment. She was conferred a Doctorate by Rajamatha Her Excellency Pramoda Devi of Mysore and the “Times 40 Under 40 Achievers” award by Shri Anupam Kher.',
      photo: '/images/leadership/managing-trustee.jpg',
      message: 'Dr. Neetha Sathe inspires her students to be nothing but the best and motivates them to develop holistically, cultivating a competitive spirit in teachers and students to choose a path and move in the right direction to achieve success.',
    },
    {
      name: 'Principal',
      person: 'Shri K. Jeevarathnam Reddy',
      role: 'Academic leadership, curriculum and school culture.',
      photo: '/images/leadership/principal.jpg',
      message: 'Our faculty is dedicated to designing and executing a unique blend of world-class curriculum with contemporary teaching methodologies.',
    },
    { name: 'Special Educator', person: 'Ms. Priya R.', role: 'B.Ed. in Special Education — support for students with additional learning needs.' },
    { name: 'Counsellor & Wellness Teacher', person: 'Ms. Alice A.', role: 'M.Sc. in Psychology — student counselling and wellbeing.' },
  ] as { name: string; person: string; role: string; photo?: string; message?: string }[],
}
