import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  Accessibility, Award, BedDouble, BookOpen, Bot, Bus, Crown, Dice5, Drama, EighthNotes, FlaskConical, Globe, HandHeart,
  Map, Mic, Monitor, Palette, PartyPopper, Presentation, School, Sigma, Sprout, Stethoscope, Theater, Trophy, Utensils, Languages, Users,
} from 'lucide-react'
import { cn } from '@/lib/cn'
import { school } from '@/config/school'

export type ArtTheme =
  | 'campus' | 'classroom' | 'science' | 'library' | 'sports' | 'games' | 'music' | 'art' | 'drama' | 'robotics' | 'computer'
  | 'garden' | 'auditorium' | 'cafeteria' | 'medical' | 'transport' | 'accessible' | 'boarding' | 'event' | 'trip' | 'debate'
  | 'leadership' | 'community' | 'celebration' | 'math' | 'language' | 'globe' | 'award' | 'kids'

const themeMap: Record<ArtTheme, { icon: LucideIcon; palette: number }> = {
  campus: { icon: School, palette: 0 }, classroom: { icon: Presentation, palette: 1 }, science: { icon: FlaskConical, palette: 2 },
  library: { icon: BookOpen, palette: 3 }, sports: { icon: Trophy, palette: 4 }, games: { icon: Dice5, palette: 5 },
  music: { icon: EighthNotes, palette: 3 }, art: { icon: Palette, palette: 1 }, drama: { icon: Drama, palette: 5 },
  robotics: { icon: Bot, palette: 0 }, computer: { icon: Monitor, palette: 2 }, garden: { icon: Sprout, palette: 4 },
  auditorium: { icon: Theater, palette: 5 }, cafeteria: { icon: Utensils, palette: 1 }, medical: { icon: Stethoscope, palette: 2 },
  transport: { icon: Bus, palette: 4 }, accessible: { icon: Accessibility, palette: 3 }, boarding: { icon: BedDouble, palette: 0 },
  event: { icon: PartyPopper, palette: 1 }, trip: { icon: Map, palette: 4 }, debate: { icon: Mic, palette: 5 },
  leadership: { icon: Crown, palette: 3 }, community: { icon: HandHeart, palette: 2 }, celebration: { icon: PartyPopper, palette: 1 },
  math: { icon: Sigma, palette: 3 }, language: { icon: Languages, palette: 1 }, globe: { icon: Globe, palette: 0 },
  award: { icon: Award, palette: 5 }, kids: { icon: Users, palette: 2 },
}

/** [background from, background to, blob, secondary blob, ink] */
const palettes = [
  ['#ece5ff', '#cfc0ff', '#20b486', '#ffd86b', '#21172f'],
  ['#ffe1d4', '#ffb99e', '#d9cbff', '#fff8ee', '#21172f'],
  ['#e3f6ec', '#b9e6cd', '#20b486', '#ffb99e', '#174c3c'],
  ['#dceeff', '#b8dcff', '#ffb99e', '#6b4ee6', '#21172f'],
  ['#fff6d9', '#ffe08f', '#20b486', '#ffb99e', '#21172f'],
  ['#ffe4ec', '#ffc2d4', '#6b4ee6', '#d9cbff', '#21172f'],
]

interface ArtImageProps {
  theme: ArtTheme
  alt: string
  src?: string
  className?: string
  /** Hide the "Sample visual" tag (e.g. for purely decorative usage) */
  hideTag?: boolean
  /** Deterministic variation for repeated themes */
  seed?: number
  iconScale?: number
}

/**
 * Renders a real photograph when `src` is provided. Otherwise shows an
 * illustrated, clearly-labelled sample visual so placeholder art is never
 * mistaken for the real campus or students.
 */
export function ArtImage({ theme, alt, src, className, hideTag, seed = 0, iconScale = 1 }: ArtImageProps) {
  const [failed, setFailed] = useState(false)
  if (src && !failed) {
    return (
      <img src={src} alt={alt} loading="lazy" decoding="async" onError={() => setFailed(true)} className={cn('h-full w-full object-cover', className)} />
    )
  }
  const { icon: Icon, palette } = themeMap[theme]
  const [c1, c2, blob, blob2, ink] = palettes[(palette + seed) % palettes.length]
  const r = (n: number) => ((seed * 37 + n * 53) % 100) / 100
  const id = `g-${theme}-${seed}`

  return (
    <div role="img" aria-label={`${alt} (illustration)`} className={cn('relative h-full w-full overflow-hidden', className)} style={{ background: `linear-gradient(140deg, ${c1}, ${c2})` }}>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <radialGradient id={id} cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor={blob} stopOpacity="0.85" />
            <stop offset="100%" stopColor={blob} stopOpacity="0" />
          </radialGradient>
          <pattern id={`${id}-dots`} width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill={ink} opacity="0.18" />
          </pattern>
        </defs>
        <rect width="400" height="300" fill={`url(#${id}-dots)`} />
        <circle cx={120 + r(1) * 160} cy={110 + r(2) * 60} r="150" fill={`url(#${id})`} />
        <path d="M60 230 C 90 150, 190 160, 230 200 S 360 270, 380 190 L 400 300 L 0 300 Z" fill={blob2} opacity="0.45" />
        <ellipse cx="200" cy="150" rx={150 + r(3) * 30} ry="46" fill="none" stroke={ink} strokeOpacity="0.35" strokeWidth="1.2" transform={`rotate(${-18 + r(4) * 20} 200 150)`} />
        <ellipse cx="200" cy="150" rx="110" ry="30" fill="none" stroke={ink} strokeOpacity="0.2" strokeDasharray="3 7" transform={`rotate(${12 - r(5) * 20} 200 150)`} />
        <circle cx={60 + r(6) * 60} cy={60 + r(7) * 40} r={10 + r(8) * 10} fill={blob2} opacity="0.9" />
        <circle cx={320 + r(9) * 40} cy={70 + r(10) * 50} r={6 + r(11) * 6} fill={blob} />
        {theme === 'campus' && (
          <g fill={ink} opacity="0.85">
            <rect x="120" y="170" width="70" height="70" rx="4" />
            <rect x="190" y="140" width="90" height="100" rx="4" />
            <rect x="280" y="185" width="50" height="55" rx="4" />
            <path d="M185 140 L235 110 L285 140 Z" />
            {Array.from({ length: 12 }).map((_, i) => (
              <rect key={i} x={200 + (i % 4) * 19} y={155 + Math.floor(i / 4) * 24} width="10" height="13" rx="2" fill={c1} />
            ))}
            <circle cx="95" cy="215" r="22" fill={blob} /><rect x="93" y="225" width="4" height="18" />
            <circle cx="355" cy="210" r="18" fill={blob} /><rect x="353" y="220" width="4" height="22" />
          </g>
        )}
      </svg>
      {theme !== 'campus' && (
        <div className="absolute inset-0 grid place-items-center">
          <div className="grid place-items-center rounded-full" style={{ width: `${34 * iconScale}%`, aspectRatio: '1', background: `color-mix(in oklab, ${ink} 10%, transparent)`, border: `1.5px solid color-mix(in oklab, ${ink} 30%, transparent)` }}>
            <Icon aria-hidden="true" strokeWidth={1.25} style={{ color: ink, width: '50%', height: '50%' }} />
          </div>
        </div>
      )}
      {!hideTag && (
        <span className="absolute bottom-3 left-3 rounded-full bg-black/40 px-2.5 py-1 font-display text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur">
          {school.isSampleContent ? 'Sample visual' : 'Illustration'}
        </span>
      )}
    </div>
  )
}

