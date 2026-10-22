import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ArtImage } from '@/components/ui/ArtImage'
import { ButtonLink } from '@/components/ui/Button'
import { Reveal, RevealText } from '@/components/ui/Reveal'
import { ClipReveal, Parallax } from '@/components/ui/ScrollFx'
import { FloatingBook } from '@/components/ui/Art'
import { RotatingBadge, SampleNote } from '@/components/ui/misc'
import { Counter } from '@/components/ui/Counter'
import { about } from '@/data/about'
import { school } from '@/config/school'
import { cn } from '@/lib/cn'

const labels = [
  { text: 'Facilitated learning', cls: 'left-[-4%] top-[14%] bg-lavender', d: 0 },
  { text: 'NEP 2020 aligned', cls: 'right-[-6%] top-[38%] bg-peach', d: 1.2 },
  { text: 'No donation', cls: 'left-[6%] bottom-[10%] bg-emerald', d: 2.1 },
]

/* Section B — A school beyond classrooms */
export function EditorialAboutSection() {
  return (
    <section id="about-universe" aria-labelledby="beyond-title" className="relative overflow-hidden bg-cream pb-20 pt-12 sm:pb-28 sm:pt-16">
      <Parallax speed={0.3} className="pointer-events-none absolute -left-20 top-40 hidden lg:block">
        <svg width="260" height="260" viewBox="0 0 200 200" aria-hidden="true"><circle cx="100" cy="100" r="90" fill="none" stroke="#21172F" strokeOpacity=".1" strokeDasharray="2 8" /><circle cx="100" cy="100" r="40" fill="#D9CBFF" opacity=".5" /></svg>
      </Parallax>
      <div className="container-x">
        <div className="grid gap-6 lg:grid-cols-12">
          <p className="eyebrow text-forest lg:col-span-12">A few words about us</p>
          <RevealText
            as="h2"
            className="text-giant font-semibold lg:col-span-11"
            lines={[<span id="beyond-title">More Than a School.</span>, <>A World of <span className="accent text-forest">Possibilities.</span></>]}
          />
        </div>

        <div className="mt-10 grid items-center gap-12 lg:mt-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-lg leading-relaxed text-muted-strong sm:text-xl">{about.intro}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="mt-10 grid grid-cols-2 gap-6 border-t border-plum/10 pt-8">
                {[['All-round', 'development of every child'], ['No donation', 'quality education, affordable cost']].map(([a, b]) => (
                  <li key={a}>
                    <p className="font-display text-2xl font-semibold">{a}</p>
                    <p className="mt-1 text-sm text-muted-strong">{b}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.2} className="mt-10 flex flex-wrap items-center gap-4">
              <ButtonLink to="/about#philosophy" variant="dark">Our educational philosophy</ButtonLink>
              <Link to="/about" className="link-underline font-medium text-forest">Read our story</Link>
            </Reveal>
          </div>

          <div className="relative lg:col-span-7">
            <ClipReveal className="relative mx-auto aspect-[4/5] w-full max-w-xl rounded-t-[999px] sm:aspect-[5/5] lg:ml-auto" to="inset(0% 0% 0% 0% round 999px 999px 40px 40px)">
              <ArtImage theme="campus" src="/images/home/annual-day-2.jpg" alt="Students performing at the New Pratham Public School Annual Day" className="h-full w-full" />
            </ClipReveal>
            {labels.map((l) => (
              <motion.span
                key={l.text}
                aria-hidden="true"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + l.d * 0.2 }}
                className={cn('absolute hidden rounded-full px-4 py-2 font-display text-sm font-semibold text-plum shadow-xl sm:block', l.cls)}
                style={{ animation: `float 6s ease-in-out ${l.d}s infinite` }}
              >
                {l.text}
              </motion.span>
            ))}
            <RotatingBadge text="The Path to Knowledge" className="absolute -bottom-10 right-2 sm:right-10" />
          </div>
        </div>
      </div>
    </section>
  )
}

/* Section C — School at a glance */
export function SchoolHighlights() {
  const { items, verified } = school.highlights
  return (
    <section aria-labelledby="glance-title" className="bg-cream pb-20 sm:pb-28">
      <div className="container-x">
        <div className="rounded-[2.5rem] bg-white p-6 shadow-[0_30px_80px_-40px_rgba(33,23,47,.35)] sm:p-10">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <h2 id="glance-title" className="font-display text-2xl font-semibold sm:text-3xl">School at a glance</h2>
            {!verified && <SampleNote force>Sample figures — replace with verified school information in <code>src/config/school.ts</code>.</SampleNote>}
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 lg:divide-x lg:divide-plum/10">
            {items.map((it, i) => (
              <li key={it.label} className={cn('pr-4 lg:px-6', i === 0 && 'lg:pl-0')}>
                <p className="font-display text-5xl font-semibold tracking-tighter text-plum sm:text-6xl xl:text-7xl">
                  <Counter value={it.value} suffix={it.suffix} />
                </p>
                <p className="mt-3 font-display text-base font-semibold">{it.label}</p>
                <p className="mt-1 text-sm text-muted-strong">{it.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* Section D — Our story */
export function OurStorySection() {
  return (
    <section aria-labelledby="story-title" className="relative overflow-hidden bg-white py-20 sm:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="eyebrow text-forest">Our story</p>
          <RevealText as="h2" className="mt-5 text-big font-semibold" lines={[<span id="story-title">All-round</span>, <><span className="accent text-forest">development</span> of every child.</>]} />
          <Reveal delay={0.1}><p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-strong">{about.history.text}</p></Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <Reveal className="rounded-[2rem] bg-violet p-7 text-white">
              <p className="eyebrow text-sun">Mission</p>
              <p className="mt-3 leading-relaxed text-white/85">{about.mission}</p>
            </Reveal>
            <Reveal delay={0.1} className="rounded-[2rem] rounded-tr-[5rem] bg-lavender p-7">
              <p className="eyebrow text-plum/70">Vision</p>
              <p className="mt-3 leading-relaxed">{about.vision}</p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <h3 className="mt-10 font-display text-lg font-semibold">Core values</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {about.values.map((v) => (
                <li key={v.title} className="rounded-full border border-plum/15 px-4 py-2 text-sm"><span className="font-semibold">{v.title}</span> <span className="text-muted-strong">— {v.text}</span></li>
              ))}
            </ul>
          </Reveal>

          <div id="philosophy" className="mt-10 grid gap-6 sm:grid-cols-2">
            {about.unique.map((u, i) => (
              <Reveal key={u.title} delay={i * 0.05}>
                <p className="font-display text-sm text-forest">0{i + 1}</p>
                <h3 className="mt-1 font-display text-lg font-semibold">{u.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-strong">{u.text}</p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* collage */}
        <div className="relative min-h-[520px] sm:min-h-[640px]">
          <Parallax speed={0.12} className="absolute left-0 top-0 w-[62%]">
            <div className="aspect-[3/4] overflow-hidden rounded-[2.5rem] rounded-bl-[7rem]"><ArtImage theme="classroom" src="/images/gallery/g13-0.jpg" alt="A pre-primary classroom activity" /></div>
          </Parallax>
          <Parallax speed={-0.18} className="absolute right-0 top-[18%] w-[48%]">
            <div className="aspect-square overflow-hidden rounded-full ring-8 ring-white"><ArtImage theme="campus" src="/images/campus/school-building.jpg" alt="The New Pratham Public School building at Pai Layout" seed={1} /></div>
          </Parallax>
          <Parallax speed={0.22} className="absolute bottom-0 right-[8%] w-[54%]">
            <div className="aspect-[4/3] overflow-hidden rounded-[2rem] rounded-tr-[6rem] ring-8 ring-white"><ArtImage theme="art" src="/images/gallery/g8-0.jpg" alt="Grade 2 students during a clay modelling activity" seed={2} /></div>
          </Parallax>
          <FloatingBook className="absolute bottom-[22%] left-[2%] z-10" />
        </div>
      </div>

      {/* principal's message strip */}
      <div className="container-x mt-20 sm:mt-28">
        <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-sage p-8 sm:p-14">
          <Quote className="absolute right-8 top-8 size-24 text-forest/10" aria-hidden="true" />
          <div className="grid gap-8 lg:grid-cols-[auto_1fr] lg:items-center">
            <div className="flex items-center gap-4">
              <img src={about.principal.photo} alt={`Portrait of ${about.principal.name}`} className="size-20 rounded-full object-cover" />
              <div>
                <p className="font-display text-lg font-semibold">{about.principal.name}</p>
                <p className="text-sm text-muted-strong">{about.principal.title}</p>
              </div>
            </div>
            <div>
              <blockquote className="font-display text-mid font-medium tracking-tight">“{about.principal.excerpt}”</blockquote>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <ButtonLink to="/about/principal" variant="dark">Read the principal’s message</ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
