import { motion } from 'framer-motion'
import { ArrowUpRight, BookOpen, CalendarDays, ClipboardList, Map, Phone, Receipt } from 'lucide-react'
import { Link } from 'react-router-dom'
import { staggerItem, staggerParent } from '@/components/ui/Reveal'

const links = [
  { label: 'Admissions', text: 'Process, dates & documents', to: '/admissions', icon: ClipboardList, cls: 'bg-violet text-white', sub: 'text-white/85' },
  { label: 'Fees', text: 'Transparent fee structure', to: '/admissions/fees', icon: Receipt, cls: 'bg-sun', sub: 'text-plum/75' },
  { label: 'Academics', text: 'Curriculum & stages', to: '/academics', icon: BookOpen, cls: 'bg-lavender', sub: 'text-plum/75' },
  { label: 'Campus tour', text: 'Explore in 3D', to: '/campus/explorer', icon: Map, cls: 'bg-mint', sub: 'text-plum/75' },
  { label: 'Events', text: 'Calendar & notices', to: '/events', icon: CalendarDays, cls: 'bg-peach-200', sub: 'text-plum/75' },
  { label: 'Contact', text: 'Call, email or visit', to: '/contact', icon: Phone, cls: 'bg-sky', sub: 'text-plum/75' },
]

/** Fast paths for parents — the most-needed pages, one tap from the home page. */
export function QuickAccess() {
  return (
    <section aria-label="Quick links" className="relative z-10 bg-cream pb-6 pt-6 sm:pt-10">
      <motion.ul
        variants={staggerParent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="container-x grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
      >
        {links.map(({ label, text, to, icon: Icon, cls, sub }) => (
          <motion.li key={label} variants={staggerItem}>
            <Link to={to} className={`group relative flex h-full flex-col rounded-[1.5rem] p-4 transition-transform duration-300 hover:-translate-y-1 sm:p-5 ${cls}`}>
              <Icon className="size-6" strokeWidth={1.7} aria-hidden="true" />
              <span className="mt-4 font-display text-base font-semibold sm:text-lg">{label}</span>
              <span className={`mt-0.5 text-xs sm:text-sm ${sub}`}>{text}</span>
              <ArrowUpRight className="absolute right-4 top-4 size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  )
}
