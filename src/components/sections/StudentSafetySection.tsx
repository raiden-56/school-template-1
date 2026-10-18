import { motion } from 'framer-motion'
import { ArrowUpRight, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SampleNote } from '@/components/ui/misc'
import { staggerItem, staggerParent } from '@/components/ui/Reveal'
import { safetyItems } from '@/data/info'

/** Shield illustration surrounded by protective rings (CSS 3D, no WebGL). */
function ShieldOrbit() {
  return (
    <div aria-hidden="true" className="relative mx-auto grid aspect-square w-full max-w-[380px] place-items-center [perspective:1000px]">
      {[0, 1, 2].map((i) => (
        <div key={i} className="absolute inset-0 [transform-style:preserve-3d]" style={{ transform: `rotateX(${68 - i * 14}deg) rotateY(${i * 18}deg) scale(${1 - i * 0.12})` }}>
          <div
            className="h-full w-full rounded-full border-2 border-forest/25"
            style={{ animation: `spin ${30 + i * 12}s linear infinite ${i % 2 ? 'reverse' : ''}`, borderStyle: i === 1 ? 'dashed' : 'solid' }}
          >
            <span className="absolute left-1/2 top-0 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-forest/60" />
          </div>
        </div>
      ))}
      <div className="absolute size-[70%] rounded-full bg-emerald/20 blur-3xl" />
      <motion.div
        initial={{ rotateY: -30, opacity: 0 }}
        whileInView={{ rotateY: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative animate-float"
      >
        <svg viewBox="0 0 160 190" className="w-40 drop-shadow-2xl sm:w-48">
          <defs>
            <linearGradient id="sh" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#20B486" /><stop offset="1" stopColor="#174C3C" /></linearGradient>
          </defs>
          <path d="M80 6 L150 32 V92 C150 140 118 172 80 184 C42 172 10 140 10 92 V32 Z" fill="url(#sh)" />
          <path d="M80 22 L136 43 V92 C136 130 110 157 80 167 Z" fill="#FFF8EE" opacity=".12" />
          <path d="M50 96 L72 118 L114 72" fill="none" stroke="#FFF8EE" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
      <span className="absolute right-[12%] top-[14%] size-4 rounded-full bg-peach" />
      <span className="absolute bottom-[16%] left-[10%] size-3 rounded-full bg-lavender" />
    </div>
  )
}

/* Section I — Safety & wellbeing */
export function StudentSafetySection({ compact = false }: { compact?: boolean }) {
  const items = compact ? safetyItems.slice(0, 6) : safetyItems
  return (
    <section aria-labelledby="safety-title" className="relative overflow-hidden bg-sage py-20 sm:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="Safety & wellbeing"
            lines={[<span id="safety-title">Safe to explore.</span>, <>Free to <span className="accent text-forest">grow.</span></>]}
            intro="Children learn best when they feel safe, seen and supported. Here is how we look after every student."
          />
          <div className="mt-10"><ShieldOrbit /></div>
          <SampleNote className="mt-6">Only measures the school actually provides should be listed. Review each item before publishing.</SampleNote>
        </div>
        <div>
          <motion.ul variants={staggerParent} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} className="grid gap-4 sm:grid-cols-2">
            {items.map((s) => {
              const Icon = s.icon
              return (
                <motion.li key={s.title} variants={staggerItem} className="rounded-[1.75rem] bg-cream p-6 shadow-[0_20px_50px_-35px_rgba(23,76,60,.5)]">
                  <span className="grid size-12 place-items-center rounded-2xl bg-emerald text-plum"><Icon className="size-6" strokeWidth={1.6} aria-hidden="true" /></span>
                  <h3 className="mt-5 font-display text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-strong">{s.text}</p>
                  {s.policy && (
                    s.policy.endsWith('.pdf')
                      ? <a href={s.policy} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-forest underline-offset-4 hover:underline">Read policy (PDF) <ArrowUpRight className="size-4" aria-hidden="true" /></a>
                      : <Link to={s.policy} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-forest underline-offset-4 hover:underline">Read policy <ArrowUpRight className="size-4" aria-hidden="true" /></Link>
                  )}
                </motion.li>
              )
            })}
          </motion.ul>
          {compact && (
            <Link to="/safety" className="mt-8 inline-flex items-center gap-2 font-display font-semibold text-forest">
              <ShieldCheck className="size-5" aria-hidden="true" /> All safety & wellbeing measures
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
