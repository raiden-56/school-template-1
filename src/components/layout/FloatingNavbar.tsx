import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, ChevronDown, LayoutGrid, Menu, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, NavLink as RouterNavLink, useLocation } from 'react-router-dom'
import { mainNav, quickLinks, type NavGroup } from '@/config/navigation'
import { school } from '@/config/school'
import { cn } from '@/lib/cn'
import { AnnouncementTicker } from './AnnouncementTicker'

export function Logo({ light = true, compact = false }: { light?: boolean; compact?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <svg viewBox="0 0 64 64" className="size-9 shrink-0 sm:size-10" aria-hidden="true">
        <circle cx="32" cy="32" r="13" fill="#20B486" />
        <ellipse cx="32" cy="32" rx="27" ry="9" fill="none" stroke={light ? '#D9CBFF' : '#21172F'} strokeWidth="3" transform="rotate(-25 32 32)" />
        <circle cx="54" cy="21" r="4.5" fill="#FFB99E" />
      </svg>
      <span className={cn('font-display leading-none', light ? 'text-cream' : 'text-plum')}>
        <span className="block text-[1.05rem] font-bold tracking-tight sm:text-lg">{school.shortName}</span>
        {!compact && <span className="block text-[10px] font-medium uppercase tracking-[0.2em] opacity-70">International School</span>}
      </span>
    </span>
  )
}

function isActive(group: NavGroup, pathname: string) {
  return group.match.some((m) => pathname === m || pathname.startsWith(m + '/'))
}

function Dropdown({ group, light, active }: { group: NavGroup; light: boolean; active: boolean }) {
  const [open, setOpen] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const btnRef = useRef<HTMLButtonElement>(null)
  const { pathname } = useLocation()
  useEffect(() => setOpen(false), [pathname])

  const enter = () => { clearTimeout(timer.current); setOpen(true) }
  const leave = () => { timer.current = setTimeout(() => setOpen(false), 140) }

  return (
    <li className="relative" onMouseEnter={enter} onMouseLeave={leave}
      onKeyDown={(e) => { if (e.key === 'Escape' && open) { setOpen(false); btnRef.current?.focus() } }}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false) }}
    >
      <button
        ref={btnRef}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((o) => !o)}
        className={cn('relative flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition-colors', light ? 'hover:bg-cream/10' : 'hover:bg-plum/5', active && (light ? 'text-emerald' : 'text-forest'))}
      >
        {group.label}
        <ChevronDown className={cn('size-3.5 transition-transform', open && 'rotate-180')} aria-hidden="true" />
        {active && <motion.span layoutId="nav-active" className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-emerald" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-full z-50 w-80 -translate-x-1/2 pt-3"
          >
            <ul className="rounded-3xl border border-plum/5 bg-cream p-2 text-plum shadow-2xl shadow-plum/20">
              {group.children!.map((c) => (
                <li key={c.to + c.label}>
                  <RouterNavLink to={c.to} end className={({ isActive }) => cn('group flex items-start justify-between gap-3 rounded-2xl px-4 py-3 transition-colors hover:bg-sage', isActive && 'bg-sage')}>
                    <span>
                      <span className="block font-display font-semibold">{c.label}</span>
                      {c.description && <span className="mt-0.5 block text-xs text-muted-strong">{c.description}</span>}
                    </span>
                    <ArrowUpRight className="mt-1 size-4 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                  </RouterNavLink>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}

function QuickLinksMenu({ light }: { light: boolean }) {
  const [open, setOpen] = useState(false)
  const btnRef = useRef<HTMLButtonElement>(null)
  const { pathname } = useLocation()
  useEffect(() => setOpen(false), [pathname])
  return (
    <div className="relative" onKeyDown={(e) => { if (e.key === 'Escape') { setOpen(false); btnRef.current?.focus() } }}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false) }}>
      <button ref={btnRef} aria-expanded={open} aria-haspopup="true" onClick={() => setOpen((o) => !o)}
        className={cn('flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors', light ? 'border-cream/25 hover:bg-cream/10' : 'border-plum/20 hover:bg-plum/5')}>
        <LayoutGrid className="size-4" aria-hidden="true" />
        Portals
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} className="absolute right-0 top-full z-50 w-72 pt-3">
            <ul className="rounded-3xl bg-white p-2 text-plum shadow-2xl ring-1 ring-plum/10">
              {quickLinks.map((q) => <QuickLinkItem key={q.label} q={q} />)}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function QuickLinkItem({ q }: { q: (typeof quickLinks)[number] }) {
  const cls = 'flex items-center justify-between gap-3 rounded-2xl px-4 py-3 text-sm transition-colors hover:bg-violet-100'
  if (q.external && q.href) {
    return <li><a href={q.href} target="_blank" rel="noopener noreferrer" className={cls}>{q.label}<ArrowUpRight className="size-4" aria-hidden="true" /><span className="sr-only">(opens in a new tab)</span></a></li>
  }
  return (
    <li>
      <Link to={q.href ?? q.to} className={cls}>
        <span>{q.label}{q.external && !q.href && <span className="block text-[11px] text-muted-strong">Link to be configured — see resources</span>}</span>
        <ArrowUpRight className="size-4" aria-hidden="true" />
      </Link>
    </li>
  )
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null)
  const { pathname } = useLocation()
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => { onClose() }, [pathname]) // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!open) return
    const html = document.documentElement
    html.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    setTimeout(() => panelRef.current?.querySelector<HTMLElement>('button, a')?.focus(), 50)
    return () => { html.style.overflow = ''; document.removeEventListener('keydown', onKey) }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          initial={{ clipPath: 'circle(0% at 92% 4%)' }}
          animate={{ clipPath: 'circle(150% at 92% 4%)' }}
          exit={{ clipPath: 'circle(0% at 92% 4%)' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[90] overflow-y-auto bg-[linear-gradient(160deg,#F3EFFF_0%,#FFF8EE_50%,#E3F6EC_100%)] text-plum xl:hidden"
        >
          <svg aria-hidden="true" className="pointer-events-none absolute -bottom-40 -right-40 size-[520px] opacity-40" viewBox="0 0 400 400">
            <ellipse cx="200" cy="200" rx="190" ry="70" fill="none" stroke="#D9CBFF" className="orbit-line" transform="rotate(-24 200 200)" />
            <circle cx="200" cy="200" r="60" fill="#20B486" />
          </svg>
          <div className="container-x relative flex min-h-full flex-col pb-10 pt-5">
            <div className="flex items-center justify-between">
              <Link to="/" aria-label={`${school.name} home`}><Logo light={false} /></Link>
              <button onClick={onClose} className="grid size-12 place-items-center rounded-full bg-white shadow" aria-label="Close menu"><X className="size-6" /></button>
            </div>
            <nav aria-label="Mobile" className="mt-8 flex-1">
              <ul className="divide-y divide-plum/10">
                {mainNav.map((g, i) => (
                  <motion.li key={g.label} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.04 }}>
                    {g.children ? (
                      <>
                        <button aria-expanded={expanded === g.label} onClick={() => setExpanded(expanded === g.label ? null : g.label)} className="flex w-full items-center justify-between py-4 font-display text-2xl font-semibold sm:text-3xl">
                          {g.label}
                          <ChevronDown className={cn('size-6 transition-transform', expanded === g.label && 'rotate-180')} aria-hidden="true" />
                        </button>
                        <AnimatePresence initial={false}>
                          {expanded === g.label && (
                            <motion.ul initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                              {g.children.map((c) => (
                                <li key={c.to + c.label}><Link to={c.to} className="block py-2.5 pl-4 text-lg text-plum/80 hover:text-forest">{c.label}</Link></li>
                              ))}
                              <li className="h-3" />
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link to={g.to} className="block py-4 font-display text-2xl font-semibold sm:text-3xl">{g.label}</Link>
                    )}
                  </motion.li>
                ))}
              </ul>
              <p className="eyebrow mt-10 text-forest">Quick links</p>
              <ul className="mt-3 grid grid-cols-2 gap-2">
                {quickLinks.map((q) => (
                  <li key={q.label}>
                    {q.external && q.href ? (
                      <a href={q.href} target="_blank" rel="noopener noreferrer" className="block rounded-2xl bg-white px-4 py-3 text-sm shadow-sm">{q.label}</a>
                    ) : (
                      <Link to={q.href ?? q.to} className="block rounded-2xl bg-white px-4 py-3 text-sm shadow-sm">{q.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
            <Link to="/admissions/apply" className="mt-8 flex items-center justify-center gap-2 rounded-full bg-emerald px-6 py-4 font-display text-lg font-semibold text-plum">
              Apply Now <ArrowUpRight className="size-5" aria-hidden="true" />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function FloatingNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const light = false // light theme: plum text on light surfaces

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <AnnouncementTicker hidden={scrolled} />
        <div className={cn('container-x transition-all duration-500', scrolled ? 'pt-2 sm:pt-3' : 'pt-3 sm:pt-5')}>
          <div
            className={cn(
              'flex items-center justify-between gap-3 rounded-full transition-all duration-500',
              scrolled ? 'glass py-2 pl-4 pr-2 shadow-xl shadow-plum/10 ring-1 ring-plum/10 sm:pl-5' : 'py-2 pl-1 pr-0',
              light ? 'text-cream' : 'text-plum',
            )}
          >
            <Link to="/" aria-label={`${school.name} — home`} className="shrink-0">
              <Logo light={light} compact={scrolled} />
            </Link>
            <nav aria-label="Main" className="hidden xl:block">
              <ul className="flex items-center gap-0.5">
                {mainNav.map((g) =>
                  g.children ? (
                    <Dropdown key={g.label} group={g} light={light} active={isActive(g, pathname)} />
                  ) : (
                    <li key={g.label} className="relative">
                      <Link to={g.to} aria-current={isActive(g, pathname) ? 'page' : undefined} className={cn('relative block rounded-full px-3 py-2 text-sm font-medium transition-colors', light ? 'hover:bg-cream/10' : 'hover:bg-plum/5', isActive(g, pathname) && (light ? 'text-emerald' : 'text-forest'))}>
                        {g.label}
                        {isActive(g, pathname) && <motion.span layoutId="nav-active" className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-emerald" />}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </nav>
            <div className="flex items-center gap-2">
              <div className="hidden xl:block"><QuickLinksMenu light={light} /></div>
              <Link to="/admissions/apply" className="hidden rounded-full bg-emerald px-5 py-2.5 font-display text-sm font-semibold text-plum transition-colors hover:bg-emerald-300 sm:inline-flex">
                Apply Now
              </Link>
              <button
                onClick={() => setMenuOpen(true)}
                className={cn('grid size-11 place-items-center rounded-full xl:hidden', light ? 'bg-cream/10' : 'bg-plum/5')}
                aria-label="Open menu"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
              >
                <Menu className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  )
}
