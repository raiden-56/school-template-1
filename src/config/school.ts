/**
 * Central school configuration.
 *
 * EVERYTHING school-specific lives here or in /src/data. Content is taken from
 * the school's existing website (newprathampublicschool.in), its CBSE
 * mandatory public disclosure and the documents linked from it.
 *
 * Values set to `null` are rendered as "To be published by the school office"
 * rather than being invented.
 */

export const school = {
  name: 'New Pratham Public School',
  shortName: 'NPPS',
  tagline: 'The Path to Knowledge',
  description:
    'New Pratham Public School (NPPS) is a CBSE-affiliated school in K R Puram, Bengaluru, offering classes from Nursery to Class X with a vision of all-round development for every child — quality education at an affordable cost, with no donation.',
  siteUrl: 'https://www.newprathampublicschool.in',

  /** Marks the whole site as carrying sample content. Set false once real content is in. */
  isSampleContent: false,

  academicYear: '2026–27',
  admissionsOpen: true,

  founded: null as number | null,

  /** Trust that manages the school (as shown on official school documents). */
  trust: 'Sree Venkateshwara Charitable Trust',

  affiliation: {
    board: 'Central Board of Secondary Education (CBSE), New Delhi',
    affiliationNumber: '830770' as string | null,
    schoolCode: '45656' as string | null,
    udiseCode: null as string | null,
  },

  contact: {
    addressLines: ['New Pratham Public School', 'No. 3, 2nd Cross, 2nd Main, Pai Layout', 'K R Puram, Bengaluru – 560016', 'Karnataka, India'],
    /** Used for the "Get directions" link. Replace with a Google Maps place URL once available. */
    mapsQuery: 'New Pratham Public School, Pai Layout, K R Puram, Bengaluru 560016',
    mapsUrl: null as string | null,
    phone: '080 4095 4645',
    phoneHref: 'tel:+918040954645',
    /** Additional numbers published by the school. */
    mobiles: [
      { label: '74067 92525', href: 'tel:+917406792525' },
      { label: '74831 74599', href: 'tel:+917483174599' },
      { label: '97318 57345', href: 'tel:+919731857345' },
    ],
    whatsapp: 'https://wa.me/917204347528?text=Hello%20New%20Pratham%20Public%20School%2C%20I%20need%20some%20information.' as string | null,
    email: 'newprathampublicschool@gmail.com',
    admissionsEmail: 'newprathampublicschool@gmail.com',
    alternateEmail: 'newpratham@gmail.com',
    officeHours: [
      { days: 'Office hours', hours: 'Please call the school office to confirm timings' },
    ],
  },

  social: [
    { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61574280760755' },
    { label: 'Instagram', href: 'https://www.instagram.com/newprathampublicschool' },
    { label: 'WhatsApp', href: 'https://wa.me/917204347528' },
  ],

  /** External portals — set to the real URLs. `null` shows a "not yet available" state. */
  portals: {
    parent: null as string | null,
    student: null as string | null,
    teacher: null as string | null,
    feePayment: null as string | null,
  },

  /**
   * Form integrations. Provide endpoints via environment variables
   * (VITE_ENQUIRY_ENDPOINT, VITE_CONTACT_ENDPOINT). Without them forms run in
   * clearly-labelled demonstration mode and never claim a submission succeeded.
   */
  integrations: {
    enquiryEndpoint: (import.meta.env.VITE_ENQUIRY_ENDPOINT as string | undefined) || null,
    contactEndpoint: (import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined) || null,
  },

  /** Feature switches for optional offerings. */
  offers: {
    seniorSecondary: false,
    boarding: false,
    scholarships: false,
    careers: true,
    alumni: true,
    transport: false,
    counselling: true,
  },

  announcements: [
    { text: 'Class X CBSE results 2025–26: 100% pass — congratulations, Prathamites!', href: '/student-life/achievements' },
    { text: 'School reopens on 22 October 2026 after the Dasara vacation', href: '/events' },
    { text: 'Admission enquiries welcome — Nursery to Class X', href: '/admissions' },
  ],

  /**
   * "At a glance" figures, taken from the school's CBSE mandatory disclosure
   * and three-year results statement.
   */
  highlights: {
    verified: true,
    items: [
      { value: 13, suffix: '', label: 'Grade levels', detail: 'Nursery to Class X' },
      { value: 43, suffix: '', label: 'Teachers', detail: 'PGT, TGT, PRT & pre-primary' },
      { value: 100, suffix: '%', label: 'Class X pass', detail: 'CBSE board, 2024–25 & 2025–26' },
      { value: 31, suffix: '', label: 'Classrooms', detail: 'Plus 3 laboratories' },
      { value: 2, suffix: '', label: 'Playgrounds', detail: 'Multi-sports centre & Playzone' },
    ],
  },
} as const

export type School = typeof school

export const notPublished = 'To be published by the school office'
