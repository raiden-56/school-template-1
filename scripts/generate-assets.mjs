/**
 * Generates:
 *   - public/documents/*.pdf  — clearly-labelled SAMPLE documents so every download link works
 *   - public/sitemap.xml      — from the static route list (+ news/event/faculty detail pages)
 *
 * Run with: npm run assets
 * Replace the sample PDFs with the school's official documents (keep the same file names,
 * or update the links in src/data).
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const SITE = 'https://www.novaverse.example'

/* ---------------- minimal PDF writer (text only, Helvetica) ---------------- */
function pdf(title, lines) {
  const esc = (s) => s.replace(/[\\()]/g, (m) => '\\' + m).replace(/[^\x20-\x7E]/g, '-')
  const body = [
    'BT /F1 22 Tf 56 770 Td (' + esc(title) + ') Tj ET',
    'BT /F1 11 Tf 56 748 Td (SAMPLE DOCUMENT - placeholder for NovaVerse International School. Not an official document.) Tj ET',
    ...lines.map((l, i) => `BT /F1 12 Tf 56 ${710 - i * 20} Td (${esc(l)}) Tj ET`),
  ].join('\n')
  const objs = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
    `<< /Length ${Buffer.byteLength(body)} >>\nstream\n${body}\nendstream`,
  ]
  let out = '%PDF-1.4\n'
  const offsets = []
  objs.forEach((o, i) => { offsets.push(Buffer.byteLength(out)); out += `${i + 1} 0 obj\n${o}\nendobj\n` })
  const xref = Buffer.byteLength(out)
  out += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n` + offsets.map((o) => String(o).padStart(10, '0') + ' 00000 n \n').join('')
  out += `trailer\n<< /Size ${objs.length + 1} /Root 1 0 R /Info << /Title (${esc(title)}) >> >>\nstartxref\n${xref}\n%%EOF\n`
  return out
}

const docs = {
  'admission-guidelines-sample.pdf': ['Admission Guidelines 2027-28 (Sample)', ['1. Submit an online enquiry.', '2. Schedule a campus visit.', '3. Review eligibility and documents.', '4. Complete the application.', '5. Interaction / assessment where applicable.', '6. Admission decision.', '7. Enrollment formalities.', '', 'Final guidelines will be issued by the admissions office.']],
  'application-form-sample.pdf': ['Application Form (Sample)', ['Student name: ______________________', 'Date of birth: ______________________', 'Grade applying for: _________________', 'Parent / guardian: __________________', 'Phone: _____________  Email: _______________', 'Address: ____________________________', '', 'Attach the documents listed on the Admissions page.']],
  'fee-schedule-sample.pdf': ['Fee Schedule (Sample)', ['Fee amounts are published only after approval by school management.', 'Tuition: to be published', 'Registration & admission: to be published', 'Transport: to be published (by route slab)', 'Books & uniform: to be published', '', 'The school does not accept capitation fees or donations for admission.']],
  'academic-calendar-sample.pdf': ['Academic Calendar (Sample)', ['Oct 24  Campus Open Morning', 'Nov 7-11  Festival Break', 'Nov 16-24  Term 1 Assessments', 'Nov 28  Parent-Teacher Meetings', 'Dec 12  Annual Sports Day', 'Dec 18  Winter Concert', 'Jan 22  Science Exhibition', 'Feb 13  Annual Day']],
  'parent-handbook-sample.pdf': ['Parent Handbook (Sample)', ['School timings, uniform, attendance, communication,', 'homework, assessment, health, transport and policies.', '', 'The final handbook is shared with enrolled families.']],
  'transport-policy-sample.pdf': ['Transport Policy (Sample)', ['Attendant on every bus.', 'Pick-up and drop-off only at designated stops.', 'Parents informed of route changes by circular.']],
  'transport-circular-sample.pdf': ['Circular: Transport Route Updates (Sample)', ['Pick-up timings on selected routes have been revised.', 'Please contact the transport desk for details.']],
  'exam-schedule-sample.pdf': ['Term 1 Examination Schedule (Sample)', ['Grades 3-10', 'Nov 16  English', 'Nov 17  Mathematics', 'Nov 19  Science', 'Nov 20  Social Studies', 'Nov 23  Second Language', 'Nov 24  Computer Science']],
  'newsletter-october-sample.pdf': ['The NovaVerse Newsletter - October (Sample)', ['Science week highlights', 'New library collections', 'Student voices']],
  'timetable-sample.pdf': ['Class Timetables (Sample)', ['Timetables for each grade are shared by class teachers', 'and on the student portal.']],
  'syllabus-overview-sample.pdf': ['Syllabus Overview (Sample)', ['Subject-wise syllabus for each grade will be published', 'at the start of the academic year.']],
}

mkdirSync(join(root, 'public/documents'), { recursive: true })
for (const [file, [title, lines]] of Object.entries(docs)) writeFileSync(join(root, 'public/documents', file), pdf(title, lines), 'latin1')

/* ---------------- sitemap ---------------- */
const staticRoutes = [
  '/', '/about', '/about/mission-vision', '/about/principal', '/about/leadership', '/careers', '/alumni', '/academics', '/academics/stages', '/faculty',
  '/admissions', '/admissions/apply', '/admissions/fees', '/admissions/scholarships', '/visit', '/campus/facilities', '/campus/explorer', '/safety',
  '/student-life', '/student-life/achievements', '/gallery', '/news', '/events', '/parents', '/students', '/contact', '/faq', '/disclosures',
  '/privacy', '/terms', '/accessibility', '/policies/child-protection', '/policies/anti-bullying',
]
const slugs = (file, key) => [...readFileSync(join(root, 'src/data', file), 'utf8').matchAll(new RegExp(`${key}: '([^']+)'`, 'g'))].map((m) => m[1])
const dynamic = [
  ...slugs('news.ts', 'slug').map((s) => `/news/${s}`),
  ...slugs('events.ts', 'slug').map((s) => `/events/${s}`),
  ...slugs('faculty.ts', "\\{ id").map((s) => `/faculty/${s}`),
]
const today = new Date().toISOString().slice(0, 10)
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...staticRoutes, ...dynamic]
  .map((p) => `  <url><loc>${SITE}${p === '/' ? '/' : p}</loc><lastmod>${today}</lastmod></url>`)
  .join('\n')}\n</urlset>\n`
writeFileSync(join(root, 'public/sitemap.xml'), xml)
console.log(`Wrote ${Object.keys(docs).length} sample PDFs and a sitemap with ${staticRoutes.length + dynamic.length} URLs.`)
