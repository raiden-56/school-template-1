/**
 * Central school configuration.
 *
 * EVERYTHING school-specific lives here or in /src/data. Replace the sample
 * values with verified, approved information before publishing.
 *
 * Values set to `null` are rendered as "To be published by the school office"
 * rather than being invented.
 */

export const school = {
  name: 'NovaVerse International School',
  shortName: 'NovaVerse',
  tagline: 'Small Discoveries. Infinite Possibilities.',
  description:
    'NovaVerse International School is a day school where young minds explore boldly, learn deeply and grow into the people who will shape tomorrow.',
  siteUrl: 'https://www.novaverse.example',

  /** Marks the whole site as carrying sample content. Set false once real content is in. */
  isSampleContent: true,

  academicYear: '2027–28',
  admissionsOpen: true,

  founded: null as number | null,

  affiliation: {
    board: 'Curriculum board — to be confirmed',
    affiliationNumber: null as string | null,
    schoolCode: null as string | null,
    udiseCode: null as string | null,
  },

  contact: {
    addressLines: ['NovaVerse International School', '123 Sample Avenue, Placeholder District', 'City, State 000000', 'India'],
    /** Used for the "Get directions" link. Replace with the verified address or a Google Maps place URL. */
    mapsQuery: 'NovaVerse International School',
    mapsUrl: null as string | null,
    phone: '+91 00000 00000',
    phoneHref: 'tel:+910000000000',
    whatsapp: null as string | null,
    email: 'info@novaverse.example',
    admissionsEmail: 'admissions@novaverse.example',
    officeHours: [
      { days: 'Monday – Friday', hours: '8:00 AM – 4:00 PM' },
      { days: 'Saturday', hours: '9:00 AM – 1:00 PM' },
      { days: 'Sunday & public holidays', hours: 'Closed' },
    ],
  },

  social: [
    { label: 'Instagram', href: 'https://instagram.com/' },
    { label: 'YouTube', href: 'https://youtube.com/' },
    { label: 'Facebook', href: 'https://facebook.com/' },
    { label: 'LinkedIn', href: 'https://linkedin.com/' },
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
    seniorSecondary: true,
    boarding: false,
    scholarships: true,
    careers: true,
    alumni: true,
    transport: true,
    counselling: true,
  },

  announcements: [
    { text: 'New Academic Session 2027–28 | Admissions Now Open', href: '/admissions' },
    { text: 'Campus visits every Saturday — book your slot online', href: '/visit' },
    { text: 'Sample notice: Term 1 calendar is now available for download', href: '/events' },
  ],

  /**
   * "At a glance" figures. `verified: false` adds a visible "sample figures" note.
   * Only publish numbers the school can substantiate.
   */
  highlights: {
    verified: false,
    items: [
      { value: 15, suffix: '', label: 'Grade levels', detail: 'Nursery to Grade 12' },
      { value: 1, suffix: '', label: 'Curriculum', detail: 'Board to be confirmed' },
      { value: 12, suffix: '+', label: 'Years of teaching experience', detail: 'Sample figure' },
      { value: 40, suffix: '+', label: 'Learning spaces', detail: 'Labs, studios & classrooms' },
      { value: 25, suffix: '+', label: 'Clubs & activities', detail: 'Sports, arts & STEM' },
    ],
  },
} as const

export type School = typeof school

export const notPublished = 'To be published by the school office'
