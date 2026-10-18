import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'
import type { Subject } from '@/data/academics'

const tones = {
  lavender: ['#ECE5FF', '#D9CBFF', '#21172F'],
  peach: ['#FFE1D4', '#FFB99E', '#21172F'],
  sage: ['#DCECE1', '#A9D6BB', '#174C3C'],
  emerald: ['#6FE0BB', '#20B486', '#21172F'],
}

/** Stylised portrait placeholder (no real person depicted). */
export function Portrait({ name, tone, className, src }: { name: string; tone: keyof typeof tones; className?: string; src?: string }) {
  if (src) return <img src={src} alt={`Portrait of ${name}`} loading="lazy" className={cn('h-full w-full object-cover', className)} />
  const [a, b, ink] = tones[tone]
  const initials = name.replace(/^(Dr|Mr|Ms|Mrs)\.?\s+/, '').split(/\s+/).map((p) => p[0]).join('').slice(0, 2)
  return (
    <div role="img" aria-label={`Placeholder portrait for ${name}`} className={cn('relative h-full w-full overflow-hidden', className)} style={{ background: `linear-gradient(160deg, ${a}, ${b})` }}>
      <svg viewBox="0 0 300 380" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <circle cx="240" cy="70" r="90" fill="none" stroke={ink} strokeOpacity=".12" strokeWidth="2" />
        <circle cx="150" cy="150" r="62" fill={ink} opacity=".85" />
        <path d="M40 380 C 40 270, 90 225, 150 225 C 210 225, 260 270, 260 380 Z" fill={ink} opacity=".85" />
        <text x="150" y="166" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontSize="40" fontWeight="600" fill={a}>{initials}</text>
      </svg>
      <span className="absolute left-3 top-3 rounded-full bg-black/40 px-2.5 py-1 font-display text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur">Sample profile</span>
    </div>
  )
}

/** Animated line drawings for subject tiles. */
export function LineArt({ pattern, className }: { pattern: Subject['pattern']; className?: string }) {
  const draw = {
    initial: { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true, margin: '-40px' },
  }
  const t = (d: number) => ({ duration: 1.8, delay: d, ease: [0.22, 1, 0.36, 1] as const })
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.2, vectorEffect: 'non-scaling-stroke' as const }
  let paths: string[] = []
  switch (pattern) {
    case 'orbits':
      paths = ['M20 100 A 80 30 0 1 0 180 100 A 80 30 0 1 0 20 100', 'M50 100 A 50 50 0 1 0 150 100 A 50 50 0 1 0 50 100', 'M100 20 A 30 80 0 1 0 100 180 A 30 80 0 1 0 100 20']
      break
    case 'grid':
      paths = [0, 1, 2, 3, 4].flatMap((i) => [`M${20 + i * 40} 20 V180`, `M20 ${20 + i * 40} H180`])
      break
    case 'waves':
      paths = [0, 1, 2, 3].map((i) => `M10 ${60 + i * 28} C 50 ${30 + i * 28}, 80 ${90 + i * 28}, 110 ${60 + i * 28} S 170 ${30 + i * 28}, 195 ${60 + i * 28}`)
      break
    case 'nodes':
      paths = ['M40 50 L100 30 L160 70 L130 140 L60 150 Z', 'M40 50 L130 140', 'M100 30 L60 150', 'M160 70 L60 150']
      break
    case 'spiral':
      paths = ['M100 100 m0 -8 a8 8 0 1 1 -8 8 a16 16 0 1 1 16 16 a28 28 0 1 1 -28 -28 a44 44 0 1 1 44 44 a64 64 0 1 1 -64 -64']
      break
    case 'steps':
      paths = ['M20 180 H60 V140 H100 V100 H140 V60 H180 V20', 'M20 140 L60 100', 'M100 180 L180 100']
      break
  }
  return (
    <svg viewBox="0 0 200 200" className={cn('pointer-events-none', className)} aria-hidden="true">
      {paths.map((d, i) => (
        <motion.path key={i} d={d} {...common} {...draw} transition={t(i * 0.12)} />
      ))}
      {pattern === 'nodes' && [[40, 50], [100, 30], [160, 70], [130, 140], [60, 150]].map(([x, y], i) => (
        <motion.circle key={i} cx={x} cy={y} r="5" fill="currentColor" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 + i * 0.1 }} />
      ))}
    </svg>
  )
}

/** CSS-3D floating open book (no WebGL needed). */
export function FloatingBook({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn('animate-float [perspective:900px]', className)}>
      <div className="relative h-28 w-44 [transform-style:preserve-3d] [transform:rotateX(55deg)_rotateZ(-18deg)] sm:h-32 sm:w-52">
        <div className="absolute inset-y-0 left-0 w-1/2 origin-right rounded-l-xl border border-plum/10 bg-cream shadow-xl [transform:rotateY(18deg)]">
          {[0, 1, 2, 3, 4].map((i) => <div key={i} className="mx-3 mt-3 h-1 rounded bg-plum/15" style={{ width: `${70 - i * 8}%` }} />)}
        </div>
        <div className="absolute inset-y-0 right-0 w-1/2 origin-left rounded-r-xl border border-plum/10 bg-white shadow-xl [transform:rotateY(-18deg)]">
          <div className="m-3 h-10 rounded-lg bg-lavender" />
          {[0, 1, 2].map((i) => <div key={i} className="mx-3 mt-2 h-1 rounded bg-plum/15" style={{ width: `${80 - i * 12}%` }} />)}
        </div>
        <div className="absolute -bottom-2 left-1/2 h-2 w-[104%] -translate-x-1/2 rounded-b-xl bg-emerald [transform:translateZ(-6px)]" />
      </div>
    </div>
  )
}
