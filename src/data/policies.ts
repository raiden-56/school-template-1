import { school, notPublished } from '@/config/school'

export interface PolicyPage {
  slug: string
  title: string
  intro: string
  sections: { heading: string; body: string[]; list?: string[] }[]
  updated: string
}

/**
 * Policy templates. These are starting points written in plain language and
 * MUST be reviewed by school management (and legal counsel where needed)
 * before publication.
 */
export const policies: Record<string, PolicyPage> = {
  privacy: {
    slug: 'privacy',
    title: 'Privacy Policy',
    intro: `This policy explains how ${school.name} collects and uses personal information submitted through this website.`,
    updated: 'Draft — pending school review',
    sections: [
      { heading: 'What we collect', body: ['When you submit an enquiry or contact form we collect only what is needed to respond: parent/guardian name, contact details, the student’s name and grade, and your message.'] },
      { heading: 'How we use it', body: ['We use this information to respond to your enquiry, arrange campus visits and process admissions. We do not sell personal data.'] },
      { heading: 'Children’s data', body: ['We collect the minimum information about children and only with the consent of a parent or guardian. Student records are kept behind authenticated school systems and are not available on this public website.'] },
      { heading: 'Retention & your rights', body: ['Enquiry data is retained only as long as needed for admissions. You may ask us to access, correct or delete your information by writing to ' + school.contact.email + '.'] },
      { heading: 'Cookies', body: ['This website does not use advertising cookies. Your browser may store small preferences (such as a dismissed announcement) locally on your device.'] },
    ],
  },
  terms: {
    slug: 'terms',
    title: 'Terms of Use',
    intro: 'By using this website you agree to these terms.',
    updated: 'Draft — pending school review',
    sections: [
      { heading: 'Content', body: ['Information on this site is provided for general guidance. Official fees, dates and policies are those issued by the school office.'] },
      { heading: 'Images', body: ['Illustrations marked “Sample visual” are placeholders and do not depict the actual campus or students.'] },
      { heading: 'External links', body: ['Portals and third-party links are provided for convenience; their own terms apply.'] },
    ],
  },
  accessibility: {
    slug: 'accessibility',
    title: 'Accessibility Statement',
    intro: `${school.name} wants everyone to be able to use this website.`,
    updated: 'October 2026',
    sections: [
      { heading: 'Our approach', body: ['We aim to meet WCAG 2.2 Level AA. The site is built with semantic HTML, keyboard navigation, visible focus states and sufficient colour contrast.'] },
      { heading: 'Motion & 3D', body: ['If your device is set to reduce motion, animations are minimised and 3D scenes are replaced by static illustrations. Every 3D interaction has an ordinary list or button alternative.'] },
      { heading: 'Known limitations', body: ['Some sample illustrations are decorative placeholders. Interactive 3D scenes may not be available on older devices; equivalent content is always provided.'] },
      { heading: 'Feedback', body: ['If you find an accessibility barrier, please email ' + school.contact.email + ' and we will respond.'] },
    ],
  },
  'child-protection': {
    slug: 'child-protection',
    title: 'Child Protection Policy',
    intro: 'The safety and wellbeing of every child is our highest priority.',
    updated: 'Summary — the full policy is available from the school office',
    sections: [
      { heading: 'Commitment', body: ['The school is committed to safeguarding children in line with applicable laws, including the POCSO Act, 2012, and board guidelines.'] },
      { heading: 'Designated safeguarding lead', body: ['Name and contact: ' + notPublished + '.'] },
      { heading: 'Key measures', body: [], list: ['Background verification of staff (as per school procedure)', 'Staff training on safeguarding', 'Clear reporting procedures for concerns', 'Supervised access for visitors'] },
      { heading: 'Raising a concern', body: ['Parents and students may raise concerns with any teacher, the counsellor or the principal. All concerns are handled confidentially.'] },
    ],
  },
  'anti-bullying': {
    slug: 'anti-bullying',
    title: 'Anti-Bullying Policy',
    intro: 'Every student has the right to learn in a safe, respectful environment.',
    updated: 'Summary — the full policy is available from the school office',
    sections: [
      { heading: 'Prevention', body: ['Social-emotional learning, peer mentoring and clear expectations of behaviour.'] },
      { heading: 'Reporting', body: ['Students can report to any trusted adult. Parents can contact the class teacher or counsellor.'] },
      { heading: 'Response', body: ['Every report is investigated, both parties are supported and parents are informed.'] },
    ],
  },
}
