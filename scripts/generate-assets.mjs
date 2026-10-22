/**
 * Generates public/sitemap.xml from the static route list
 * (+ news/event/faculty detail pages).
 *
 * Run with: npm run assets
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const SITE = 'https://www.newprathampublicschool.in'

const staticRoutes = [
  '/', '/about', '/about/mission-vision', '/about/principal', '/about/leadership', '/careers', '/alumni', '/academics', '/academics/stages', '/faculty',
  '/admissions', '/admissions/apply', '/admissions/fees', '/visit', '/campus/facilities', '/campus/explorer', '/safety',
  '/student-life', '/student-life/achievements', '/gallery', '/news', '/events', '/parents', '/students', '/contact', '/faq', '/disclosures',
  '/privacy', '/terms', '/accessibility', '/policies/child-protection', '/policies/anti-bullying',
]
const read = (file) => readFileSync(join(root, 'src/data', file), 'utf8')
const slugs = (file, key) => [...read(file).matchAll(new RegExp(`${key}: '([^']+)'`, 'g'))].map((m) => m[1])
/** Mirrors the id rule in src/data/faculty.ts. */
const facultyIds = [...read('faculty.ts').matchAll(/\['([^']+)', '([A-Z ]+)', '/g)].map(([, name, d]) =>
  d === 'PRINCIPAL' ? 'principal' : name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
)
const dynamic = [
  ...slugs('news.ts', 'slug').map((s) => `/news/${s}`),
  ...slugs('events.ts', 'slug').map((s) => `/events/${s}`),
  ...facultyIds.map((s) => `/faculty/${s}`),
]
const today = new Date().toISOString().slice(0, 10)
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...staticRoutes, ...dynamic]
  .map((p) => `  <url><loc>${SITE}${p === '/' ? '/' : p}</loc><lastmod>${today}</lastmod></url>`)
  .join('\n')}\n</urlset>\n`
writeFileSync(join(root, 'public/sitemap.xml'), xml)
console.log(`Wrote a sitemap with ${staticRoutes.length + dynamic.length} URLs.`)
