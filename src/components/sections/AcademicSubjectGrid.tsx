import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { LineArt } from '@/components/ui/Art'
import { ButtonLink } from '@/components/ui/Button'
import { staggerItem, staggerParent } from '@/components/ui/Reveal'
import { subjects, type Subject } from '@/data/academics'
import { cn } from '@/lib/cn'

const toneCls: Record<Subject['tone'], string> = {
  lavender: 'bg-lavender text-plum',
  peach: 'bg-peach-200 text-plum',
  sage: 'bg-sage text-plum',
  plum: 'bg-violet text-white',
  cream: 'bg-white text-plum ring-1 ring-plum/10',
  emerald: 'bg-emerald text-plum',
}

const sizeCls: Record<Subject['size'], string> = {
  lg: 'sm:col-span-2 lg:col-span-3 lg:row-span-2 min-h-[300px] lg:min-h-[420px]',
  md: 'sm:col-span-1 lg:col-span-2 min-h-[240px]',
  sm: 'sm:col-span-1 lg:col-span-2 xl:col-span-1 min-h-[220px]',
}

function SubjectTile({ s }: { s: Subject }) {
  const dark = s.tone === 'plum'
  const Icon = s.icon
  return (
    <motion.li variants={staggerItem} className={cn('group relative overflow-hidden rounded-[2rem]', toneCls[s.tone], sizeCls[s.size], s.size === 'lg' && 'rounded-br-[5rem]')}>
      <Link to={`/academics#${s.id}`} className="flex h-full flex-col justify-between p-6 sm:p-7" aria-describedby={`subj-${s.id}`}>
        <LineArt pattern={s.pattern} className={cn('absolute -right-6 -top-6 transition-transform duration-700 group-hover:rotate-12 group-hover:scale-110', s.size === 'lg' ? 'size-64 opacity-40' : 'size-40 opacity-30')} />
        <span className={cn('relative grid size-12 place-items-center rounded-2xl', dark ? 'bg-white/15' : 'bg-white/60')}>
          <Icon className="size-6" strokeWidth={1.5} aria-hidden="true" />
        </span>
        <div className="relative mt-10">
          <h3 className={cn('font-display font-semibold tracking-tight', s.size === 'lg' ? 'text-3xl sm:text-4xl' : 'text-xl')}>{s.title}</h3>
          <p id={`subj-${s.id}`} className={cn('mt-2 text-sm leading-relaxed', dark ? 'text-white/85' : 'text-plum/75')}>{s.summary}</p>
          {/* revealed on hover / focus for pointer devices; always visible on touch */}
          <p className={cn('mt-3 text-sm leading-relaxed transition-all duration-500 [@media(hover:hover)]:max-h-0 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:max-h-40 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-visible:max-h-40 [@media(hover:hover)]:group-focus-visible:opacity-100', s.size !== 'lg' && 'hidden sm:block', dark ? 'text-white/85' : 'text-plum/80')}>
            {s.detail}
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold">
            Explore <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </motion.li>
  )
}

/* Section F — academics showcase */
export function AcademicSubjectGrid({ limit }: { limit?: number }) {
  const list = limit ? subjects.slice(0, limit) : subjects
  return (
    <section aria-labelledby="academics-title" className="bg-cream py-20 sm:py-32">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Academics & curriculum"
            lines={[<span id="academics-title">Rigour meets</span>, <span className="accent text-forest">imagination.</span>]}
            intro="A strong board curriculum, extended with inquiry, design, the arts and real-world projects — so children learn deeply and enjoy it."
          />
          <ButtonLink to="/academics" variant="outline-dark" className="shrink-0 self-start lg:self-auto">Full curriculum</ButtonLink>
        </div>
        <motion.ul
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-14 grid grid-flow-dense grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6 xl:grid-cols-7"
        >
          {list.map((s) => <SubjectTile key={s.id} s={s} />)}
        </motion.ul>
      </div>
    </section>
  )
}
