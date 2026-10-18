# NovaVerse International School — website

A light, colourful, immersive school website built with React, Vite and TypeScript. It has 3D scenes, scroll-driven storytelling and a full set of school pages: admissions, fees, academics, campus, safety, news, events, gallery, resources, policies and contact.

> **All school content is sample content.** Names, figures, policies and images are placeholders and are clearly labelled on the site. Replace them with verified, approved information before publishing (see [Replacing the content](#replacing-the-content)).

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build
npm run assets     # regenerate sample PDFs in public/documents and public/sitemap.xml
```

Requires Node 18+.

## Stack

| Concern | Library |
| --- | --- |
| UI | React 19, TypeScript, Vite 6 |
| Styling | Tailwind CSS 4 (design tokens in `src/index.css` → `@theme`) |
| Component motion | Framer Motion (entrances, hover, accordions, carousels, route fades) |
| Scroll motion | GSAP + ScrollTrigger (pinned campus tour, horizontal gallery, timelines, parallax, clip reveals) |
| 3D | three.js + React Three Fiber + Drei |
| Routing | React Router 7 (all pages except Home are code-split) |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |

## Project structure

```
src/
  config/school.ts        ← school name, contacts, academic year, portals, integrations, feature switches
  config/navigation.ts    ← main menu, dropdowns, quick links
  data/                   ← all replaceable content (stages, subjects, facilities, faculty, news, events,
                            gallery, achievements, testimonials, fees, FAQ, policies, admissions)
  components/
    layout/               ← FloatingNavbar, AnnouncementTicker, OrbitalFooter, PageHero, Seo, Layout
    sections/             ← homepage + reusable page sections (HeroSection, LearningPlanetSelector,
                            InteractiveCampusExplorer, FacilityBentoGrid, AdmissionOrbitTimeline, …)
    three/                ← R3F scenes (hero island, campus explorer, planets, compass, globe),
                            Scene3D wrapper and static SVG fallbacks
    forms/                ← MultiStepEnquiryForm, ContactForm, accessible field components
    ui/                   ← Button, Reveal/RevealText, Accordion, Modal, TiltCard, ArtImage, ScrollFx, …
  pages/                  ← route pages (About, Academics, Admissions, Campus, News, Info pages)
  lib/                    ← gsap setup, hooks, api (form submission), ics (add-to-calendar), formatting
public/
  documents/              ← downloadable PDFs (generated samples — replace with official files)
  robots.txt, sitemap.xml, og-image.svg, favicon.svg
scripts/generate-assets.mjs
```

## Pages (routes)

Home `/` · About `/about` · Mission & Vision `/about/mission-vision` · Principal's Message `/about/principal` · Leadership `/about/leadership` · Academics `/academics` · Learning Stages `/academics/stages` · Faculty `/faculty` and `/faculty/:id` · Admissions `/admissions` · Enquire & Apply `/admissions/apply` · Fees `/admissions/fees` · Scholarships `/admissions/scholarships` · Book a Visit `/visit` · Facilities `/campus/facilities` · 3D Campus Explorer `/campus/explorer` · Safety & Wellbeing `/safety` · Sports & Activities `/student-life` · Achievements `/student-life/achievements` · Gallery `/gallery` · News `/news` and `/news/:slug` · Events Calendar `/events` and `/events/:slug` · Parent Resources `/parents` · Student Resources `/students` · Contact `/contact` · FAQ `/faq` · Mandatory Disclosures `/disclosures` · Careers `/careers` · Alumni `/alumni` · Privacy `/privacy` · Terms `/terms` · Accessibility `/accessibility` · Policies `/policies/child-protection`, `/policies/anti-bullying` · custom 404.

## Replacing the content

1. **School profile** — edit `src/config/school.ts`: name, address, phone, email, office hours, social links, academic year, affiliation, portal URLs and `offers` switches (senior secondary, boarding, scholarships, transport, …). Turned-off offerings disappear from menus and pages.
2. **Figures** — `school.highlights` drives the "at a glance" numbers. Keep `verified: false` (which shows a "sample figures" note) until every number is confirmed.
3. **Content** — edit the files in `src/data/`. Values left as `null` display "To be published by the school office". **Fees, affiliation numbers, results and certifications are never invented.**
4. **Photos** — anywhere an `ArtImage` is used you can pass `src` (or set `src` on gallery items / `photo` on educators). Until then a colourful illustration with a visible "Sample visual" tag is shown, so it is never mistaken for the real campus.
5. **Testimonials & achievements** — the current entries are labelled placeholders. Publish only approved quotes, results and names (with consent).
6. **Documents** — replace the PDFs in `public/documents/` with the official files (keep the file names or update the links in `src/data`).
7. **Domain** — update `siteUrl` in `school.ts`, `SITE` in `scripts/generate-assets.mjs` and the sitemap line in `public/robots.txt`, then run `npm run assets`.
8. When everything is real, set `school.isSampleContent = false` to hide the sample-content notes.

## Forms and integrations

The enquiry, campus-visit and contact forms validate with Zod and submit as JSON `POST` to the endpoints you configure:

```bash
# .env (see .env.example)
VITE_ENQUIRY_ENDPOINT=https://your-crm-or-function.example/enquiries
VITE_CONTACT_ENDPOINT=https://your-crm-or-function.example/contact
```

**Without endpoints, the forms run in clearly-labelled demonstration mode.** They say plainly that nothing was sent and offer a one-click pre-filled email and a phone link instead. The forms never show a false success message. The endpoint should validate input server-side, store data securely and send any confirmation emails. The forms collect only the minimum information about children, and they need explicit consent before submitting.

Portal links (parent, student, teacher, fee payment) are set in `school.portals`. Until a URL is set, the portal tiles show "Link not configured yet". Student records are never exposed on the public site.

## 3D, motion and fallbacks

- 3D scenes load lazily, only when they come near the viewport, and pause rendering when off-screen. They never block the rest of the page: a static SVG illustration shows while they load.
- **No WebGL / scene error** → the static illustration stays in place.
- **Phones and tablets** → the campus explorer becomes an illustrated tap-to-explore map, the learning planets become a swipeable carousel, the student-life gallery is vertical, and the 3D scenes use a lighter detail tier.
- **`prefers-reduced-motion`** → the explorer and planets use their non-3D alternatives, other scenes render a still frame or illustration, scroll animations are disabled and all text is shown immediately.
- Every 3D interaction has an ordinary HTML button or list alternative (stage tabs, facility lists, map markers).

## Accessibility and SEO

- Semantic landmarks, a skip link, one `h1` per page, keyboard-operable menus, dropdowns, tabs, accordions, carousels and the lightbox (arrow keys and Esc), focus trapping in dialogs, and visible focus rings.
- Form fields have labels, inline errors (`aria-invalid`, `aria-describedby`) and a progress indicator.
- Each page has a unique title, meta description, canonical URL and Open Graph tags (React 19 head hoisting). It also has JSON-LD for School, BreadcrumbList, NewsArticle, Event and FAQPage, plus `robots.txt` and `sitemap.xml`.

## Deployment

This is a single-page app: configure your host to serve `index.html` for unknown paths.

- Netlify: add `/* /index.html 200` to `public/_redirects`.
- Vercel: add a rewrite to `/index.html`.
- Nginx: `try_files $uri /index.html;`.

## Not included: admin dashboard

The data layer (`src/data`, `src/config`) is structured so it can later be fed from a CMS or API. An admin dashboard has **not** been built. A real one needs authentication, role-based authorisation, persistent storage and an API. It should not be faked with a mock UI.
