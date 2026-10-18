import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { RevealText } from '@/components/ui/Reveal'
import { Seo, breadcrumbJsonLd } from './Seo'
import { cn } from '@/lib/cn'
import { useSetHeaderTone } from './HeaderTone'

export interface Crumb { name: string; path: string }

interface PageHeroProps {
  title: ReactNode[]
  seoTitle: string
  description: string
  eyebrow?: string
  crumbs?: Crumb[]
  tone?: 'plum' | 'cream' | 'sage' | 'lavender' | 'peach'
  children?: ReactNode
  aside?: ReactNode
}

const tones = {
  plum: 'bg-[linear-gradient(135deg,#F3EFFF_0%,#EEF7FF_60%,#FFF6D9_100%)] text-plum',
  cream: 'bg-cream text-plum',
  sage: 'bg-sage text-plum',
  lavender: 'bg-lavender text-plum',
  peach: 'bg-peach-200 text-plum',
}

/** Shared page header for all inner pages: SEO, breadcrumbs, oversized title and decorative orbit. */
export function PageHero({ title, seoTitle, description, eyebrow, crumbs = [], tone = 'plum', children, aside }: PageHeroProps) {
  const dark = false // light theme only
  useSetHeaderTone(dark ? 'dark' : 'light')
  const all = [{ name: 'Home', path: '/' }, ...crumbs]
  return (
    <header className={cn('relative overflow-hidden pb-14 pt-32 sm:pb-20 sm:pt-40', tones[tone])}>
      <Seo title={seoTitle} description={description} jsonLd={breadcrumbJsonLd(all)} />
      <svg aria-hidden="true" className="pointer-events-none absolute -right-40 -top-20 h-[560px] w-[560px] opacity-60 sm:-right-24" viewBox="0 0 400 400">
        <ellipse cx="200" cy="200" rx="190" ry="70" fill="none" stroke={dark ? '#D9CBFF' : '#21172F'} strokeOpacity="0.35" className="orbit-line" transform="rotate(-24 200 200)" />
        <ellipse cx="200" cy="200" rx="150" ry="150" fill="none" stroke={dark ? '#20B486' : '#174C3C'} strokeOpacity="0.3" />
        <circle cx="200" cy="200" r="58" fill={dark ? '#20B486' : '#FFB99E'} opacity="0.9" />
        <circle cx="345" cy="130" r="12" fill={dark ? '#FFB99E' : '#20B486'} />
      </svg>
      <div className="container-x relative">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className={cn('flex flex-wrap items-center gap-1.5 text-sm', dark ? 'text-cream/70' : 'text-muted-strong')}>
            {all.map((c, i) => (
              <li key={c.path} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="size-3.5" aria-hidden="true" />}
                {i === all.length - 1 ? (
                  <span aria-current="page" className={dark ? 'text-cream' : 'text-plum'}>{c.name}</span>
                ) : (
                  <Link to={c.path} className="link-underline">{c.name}</Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <div className="grid items-end gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            {eyebrow && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={cn('eyebrow mb-5', dark ? 'text-emerald' : 'text-forest')}>{eyebrow}</motion.p>}
            <RevealText as="h1" immediate lines={title} className="text-giant font-semibold" />
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.8 }} className={cn('mt-6 max-w-2xl text-base leading-relaxed sm:text-lg', dark ? 'text-cream/75' : 'text-muted-strong')}>
              {description}
            </motion.p>
            {children && <div className="mt-8">{children}</div>}
          </div>
          {aside && <div className="relative">{aside}</div>}
        </div>
      </div>
    </header>
  )
}
