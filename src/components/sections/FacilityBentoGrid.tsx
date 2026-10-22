import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ArtImage } from '@/components/ui/ArtImage'
import { TiltCard } from '@/components/ui/TiltCard'
import { ButtonLink } from '@/components/ui/Button'
import { staggerItem, staggerParent } from '@/components/ui/Reveal'
import { facilities, type Facility } from '@/data/facilities'
import { cn } from '@/lib/cn'
import { FacilityDialog } from './FacilityDialog'

const sizeCls: Record<Facility['size'], string> = {
  xl: 'sm:col-span-2 sm:row-span-2',
  lg: 'sm:col-span-2',
  md: 'sm:row-span-2',
  sm: '',
}
const smallTones = ['bg-lavender text-plum', 'bg-peach text-plum', 'bg-emerald text-plum', 'bg-sage text-plum']

function Tile({ f, i, onOpen }: { f: Facility; i: number; onOpen: () => void }) {
  const photo = f.size !== 'sm'
  return (
    <motion.li variants={staggerItem} className={cn('min-h-[220px]', sizeCls[f.size])}>
      <TiltCard className="h-full">
        <button
          onClick={onOpen}
          className={cn('group relative flex h-full w-full flex-col justify-end overflow-hidden rounded-[2rem] text-left', photo ? 'text-plum' : smallTones[i % smallTones.length])}
          aria-label={`${f.title}: ${f.summary} Open details`}
        >
          {photo ? (
            <>
              <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110">
                <ArtImage theme={f.theme} alt="" src={f.image} seed={i} hideTag={f.size === 'md'} />
              </div>
            </>
          ) : (
            <svg aria-hidden="true" className="absolute -right-8 -top-8 size-40 opacity-30 transition-transform duration-700 group-hover:rotate-45" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeDasharray="2 6" />
              <rect x="30" y="30" width="40" height="40" rx="12" fill="currentColor" opacity=".2" />
            </svg>
          )}
          <div className={cn('relative', photo ? 'm-3 rounded-[1.5rem] bg-white/90 p-5 shadow-lg backdrop-blur' : 'p-6')}>
            <h3 className={cn('font-display font-semibold tracking-tight transition-transform duration-500 group-hover:-translate-y-1', f.size === 'xl' ? 'text-3xl sm:text-4xl' : 'text-xl')}>{f.title}</h3>
            <p className={cn('mt-2 line-clamp-2 text-sm', photo ? 'text-plum/80' : 'text-plum/75')}>{f.summary}</p>
          </div>
          <span className={cn('absolute right-4 top-4 grid size-10 place-items-center rounded-full transition-transform duration-500 group-hover:rotate-90', photo ? 'bg-white/70 backdrop-blur' : 'bg-plum/10')} aria-hidden="true">
            <Plus className="size-5" />
          </span>
        </button>
      </TiltCard>
    </motion.li>
  )
}

/* Section H — facilities bento grid on dark plum */
export function FacilityBentoGrid({ limit, showHeading = true }: { limit?: number; showHeading?: boolean }) {
  const [open, setOpen] = useState<string | null>(null)
  const list = limit ? facilities.slice(0, limit) : facilities
  return (
    <section aria-labelledby="facilities-title" className="relative overflow-hidden bg-sun-100 py-20 text-plum sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 top-20 size-72 rounded-full border border-plum/15" />
      <div aria-hidden="true" className="pointer-events-none absolute left-10 top-1/2 size-4 animate-float rounded-full bg-peach" />
      <div className="container-x relative">
        {showHeading && (
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
             
              eyebrow="Facilities & amenities"
              lines={[<span id="facilities-title">Spaces designed</span>, <>for <span className="accent text-coral">discovery.</span></>]}
              intro="Every space on campus has a purpose: to make learning visible, active and safe."
            />
            <ButtonLink to="/campus/facilities" variant="outline-light" className="shrink-0 self-start lg:self-auto">All facilities</ButtonLink>
          </div>
        )}
        {!showHeading && <h2 id="facilities-title" className="sr-only">Facilities</h2>}
        <motion.ul
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-14 grid auto-rows-[220px] grid-flow-dense grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {list.map((f, i) => <Tile key={f.id} f={f} i={i} onOpen={() => setOpen(f.id)} />)}
        </motion.ul>
        {limit && limit < facilities.length && (
          <div className="mt-10 text-center">
            <ButtonLink to="/campus/facilities" variant="primary">See all {facilities.length} facilities</ButtonLink>
          </div>
        )}
      </div>
      <FacilityDialog facilityId={open} onClose={() => setOpen(null)} />
    </section>
  )
}
