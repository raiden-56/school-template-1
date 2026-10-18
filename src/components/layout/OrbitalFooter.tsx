import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { school } from '@/config/school'
import { SocialGlyph } from '@/components/ui/misc'
import { Logo } from './FloatingNavbar'

const columns = [
  { title: 'Explore', links: [['About the School', '/about'], ['Mission & Vision', '/about/mission-vision'], ["Principal's Message", '/about/principal'], ['Faculty', '/faculty'], ['Careers', '/careers'], ['Alumni', '/alumni']] },
  { title: 'Academics', links: [['Curriculum', '/academics'], ['Learning Stages', '/academics/stages'], ['Achievements', '/student-life/achievements'], ['Student Life', '/student-life'], ['Gallery', '/gallery']] },
  { title: 'Admissions', links: [['Admission Process', '/admissions'], ['Enquire & Apply', '/admissions/apply'], ['Fee Structure', '/admissions/fees'], ['Scholarships', '/admissions/scholarships'], ['Book a Visit', '/visit'], ['FAQ', '/faq']] },
  { title: 'Campus & Community', links: [['Facilities', '/campus/facilities'], ['3D Campus Explorer', '/campus/explorer'], ['Safety & Wellbeing', '/safety'], ['News', '/news'], ['Events', '/events'], ['Parent Resources', '/parents'], ['Student Resources', '/students']] },
] as const

export function OrbitalFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative overflow-hidden bg-violet-100 text-plum">
      <svg aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-[900px] w-[1600px] -translate-x-1/2 opacity-30" viewBox="0 0 1600 900">
        <ellipse cx="800" cy="900" rx="760" ry="300" fill="none" stroke="#D9CBFF" className="orbit-line" />
        <ellipse cx="800" cy="900" rx="560" ry="220" fill="none" stroke="#20B486" className="orbit-line" style={{ animationDuration: '45s', animationDirection: 'reverse' }} />
        <ellipse cx="800" cy="900" rx="360" ry="140" fill="none" stroke="#FFB99E" className="orbit-line" style={{ animationDuration: '60s' }} />
      </svg>

      <div className="container-x relative pb-10 pt-20 sm:pt-28">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Logo light={false} />
            <p className="mt-6 max-w-sm leading-relaxed text-plum/70">{school.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/admissions/apply" className="inline-flex items-center gap-2 rounded-full bg-emerald px-5 py-3 font-display font-semibold text-plum hover:bg-emerald-300">
                Apply Now <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
              <Link to="/visit" className="inline-flex items-center gap-2 rounded-full border border-plum/15 px-5 py-3 font-display font-semibold hover:bg-cream hover:text-plum">
                Book a Visit
              </Link>
            </div>
            <address className="mt-10 space-y-3 not-italic text-plum/80">
              <p className="flex gap-3"><MapPin className="mt-0.5 size-5 shrink-0 text-forest" aria-hidden="true" /><span>{school.contact.addressLines.slice(1).join(', ')}</span></p>
              <p className="flex gap-3"><Phone className="size-5 shrink-0 text-forest" aria-hidden="true" /><a href={school.contact.phoneHref} className="link-underline">{school.contact.phone}</a></p>
              <p className="flex gap-3"><Mail className="size-5 shrink-0 text-forest" aria-hidden="true" /><a href={`mailto:${school.contact.email}`} className="link-underline break-all">{school.contact.email}</a></p>
            </address>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
            {columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h2 className="eyebrow text-forest">{col.title}</h2>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {col.links.map(([label, to]) => (
                    <li key={to}><Link to={to} className="link-underline text-plum/75 hover:text-violet">{label}</Link></li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-6 rounded-[2rem] bg-white/70 p-6 ring-1 ring-plum/10 sm:grid-cols-[1fr_auto] sm:items-center sm:p-8">
          <div>
            <h2 className="font-display text-xl font-semibold">Portals</h2>
            <p className="mt-1 text-sm text-plum/65">Secure access for enrolled families and students.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {([['Parent Portal', school.portals.parent], ['Student Portal', school.portals.student]] as const).map(([label, href]) =>
              href ? (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="rounded-full bg-violet px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#5a3fd1]">{label}</a>
              ) : (
                <Link key={label} to={label === 'Parent Portal' ? '/parents' : '/students'} className="rounded-full bg-violet px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#5a3fd1]">{label}</Link>
              ),
            )}
          </div>
        </div>

        <p aria-hidden="true" className="pointer-events-none mt-16 select-none whitespace-nowrap font-display text-[17vw] font-bold leading-none tracking-tighter text-plum/[0.06] xl:text-[15rem]">
          {school.shortName}
        </p>

        <div className="mt-6 flex flex-col gap-6 border-t border-plum/15 pt-8 text-sm text-plum/65 lg:flex-row lg:items-center lg:justify-between">
          <p>© {year} {school.name}. All rights reserved.{school.isSampleContent && ' · Sample content for demonstration.'}</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li><Link className="link-underline hover:text-violet" to="/privacy">Privacy</Link></li>
            <li><Link className="link-underline hover:text-violet" to="/terms">Terms</Link></li>
            <li><Link className="link-underline hover:text-violet" to="/accessibility">Accessibility</Link></li>
            <li><Link className="link-underline hover:text-violet" to="/policies/child-protection">Child Protection</Link></li>
            <li><Link className="link-underline hover:text-violet" to="/disclosures">Mandatory Disclosures</Link></li>
          </ul>
          <ul className="flex gap-2" aria-label="Social media">
            {school.social.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`${s.label} (opens in a new tab)`} className="grid size-10 place-items-center rounded-full bg-white/70 text-plum transition hover:bg-emerald hover:text-plum">
                  <SocialGlyph label={s.label} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
