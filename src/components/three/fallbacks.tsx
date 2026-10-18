import { cn } from '@/lib/cn'

/* Static SVG illustrations shown while 3D loads, without WebGL, or for reduced motion. */

export function IslandFallback({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 500" className={cn('h-full w-full', className)} role="img" aria-label="Illustration of a floating island campus with a school building, trees and a glowing planet">
      <defs>
        <radialGradient id="if-glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#20B486" stopOpacity=".55" /><stop offset="100%" stopColor="#20B486" stopOpacity="0" /></radialGradient>
      </defs>
      <ellipse cx="300" cy="250" rx="270" ry="80" fill="none" stroke="#D9CBFF" strokeOpacity=".35" transform="rotate(-8 300 250)" />
      <circle cx="470" cy="110" r="90" fill="url(#if-glow)" />
      <circle cx="470" cy="110" r="42" fill="#20B486" />
      <ellipse cx="470" cy="110" rx="70" ry="18" fill="none" stroke="#D9CBFF" strokeWidth="3" transform="rotate(-20 470 110)" />
      <path d="M130 300 L300 470 L470 300 Z" fill="#A48FE0" />
      <path d="M180 300 L300 430 L300 300 Z" fill="#8B74D6" opacity=".6" />
      <ellipse cx="300" cy="300" rx="175" ry="46" fill="#6CCB9F" />
      <path d="M180 305 C 230 330, 360 335, 420 300" stroke="#FFF8EE" strokeWidth="9" fill="none" strokeLinecap="round" />
      <rect x="225" y="225" width="130" height="70" rx="4" fill="#FFF8EE" />
      <rect x="215" y="218" width="150" height="10" rx="3" fill="#D9CBFF" />
      <rect x="205" y="185" width="22" height="110" fill="#FFF8EE" />
      <path d="M200 185 L216 160 L232 185 Z" fill="#20B486" />
      <rect x="355" y="255" width="44" height="40" fill="#FFB99E" />
      {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={238 + i * 22} y="240" width="12" height="14" rx="2" fill="#FFE7B8" />)}
      <rect x="282" y="268" width="18" height="27" fill="#20B486" />
      {[[160, 290], [190, 310], [420, 290], [395, 315]].map(([x, y], i) => (
        <g key={i}><rect x={x - 2} y={y - 10} width="4" height="14" fill="#7A5A4A" /><circle cx={x} cy={y - 18} r="13" fill={i % 2 ? '#20B486' : '#3FA77B'} /></g>
      ))}
      <rect x="110" y="140" width="46" height="12" rx="2" fill="#FFB99E" transform="rotate(-14 133 146)" />
      <rect x="150" y="90" width="40" height="10" rx="2" fill="#D9CBFF" transform="rotate(10 170 95)" />
      <path d="M520 260 l30 -8 l-12 22 z" fill="#FFF8EE" />
      <circle cx="90" cy="230" r="3" fill="#D9CBFF" /><circle cx="540" cy="350" r="3" fill="#D9CBFF" /><circle cx="60" cy="380" r="2" fill="#FFB99E" />
    </svg>
  )
}

export function OrbitFallback({ className, label = 'Decorative orbit illustration' }: { className?: string; label?: string }) {
  return (
    <svg viewBox="0 0 400 400" className={cn('h-full w-full', className)} {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true })}>
      <ellipse cx="200" cy="200" rx="180" ry="70" fill="none" stroke="#D9CBFF" strokeOpacity=".5" transform="rotate(-18 200 200)" />
      <ellipse cx="200" cy="200" rx="130" ry="130" fill="none" stroke="#20B486" strokeOpacity=".4" strokeDasharray="4 8" />
      <circle cx="200" cy="200" r="70" fill="#D9CBFF" />
      <circle cx="200" cy="200" r="70" fill="none" stroke="#21172F" strokeOpacity=".2" strokeWidth="18" strokeDasharray="2 14" />
      <circle cx="340" cy="150" r="18" fill="#FFB99E" />
      <circle cx="80" cy="260" r="12" fill="#20B486" />
    </svg>
  )
}

export function CompassFallback({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" className={cn('h-full w-full', className)} role="img" aria-label="Illustration of a compass">
      <circle cx="200" cy="200" r="170" fill="none" stroke="#D9CBFF" strokeOpacity=".35" strokeDasharray="3 9" />
      <circle cx="200" cy="200" r="120" fill="#3A2C52" stroke="#FFB99E" strokeWidth="8" />
      <circle cx="200" cy="200" r="104" fill="#FFF8EE" />
      {Array.from({ length: 24 }).map((_, i) => {
        const a = (i / 24) * Math.PI * 2
        return <line key={i} x1={200 + Math.cos(a) * 90} y1={200 + Math.sin(a) * 90} x2={200 + Math.cos(a) * (i % 6 ? 98 : 84)} y2={200 + Math.sin(a) * (i % 6 ? 98 : 84)} stroke={i % 6 ? '#3A2C52' : '#20B486'} strokeWidth="3" />
      })}
      <path d="M200 110 L216 200 L200 200 Z" fill="#20B486" /><path d="M200 110 L184 200 L200 200 Z" fill="#17986f" />
      <path d="M200 290 L216 200 L200 200 Z" fill="#FFB99E" /><path d="M200 290 L184 200 L200 200 Z" fill="#f29c7c" />
      <circle cx="200" cy="200" r="10" fill="#D9CBFF" />
    </svg>
  )
}
