import { Info } from 'lucide-react'
import { cn } from '@/lib/cn'
import { school } from '@/config/school'

/** Organic curved divider used to connect sections of different colours. */
export function CurvedDivider({ fill, flip = false, className }: { fill: string; flip?: boolean; className?: string }) {
  return (
    <div aria-hidden="true" className={cn('pointer-events-none relative z-10 -my-px block w-full leading-none', flip && 'rotate-180', className)}>
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="block h-[44px] w-full sm:h-[90px]">
        <path d="M0 120 L0 70 C 240 10, 480 10, 720 55 C 960 100, 1200 110, 1440 40 L1440 120 Z" fill={fill} />
      </svg>
    </div>
  )
}

/** Visible label for placeholder content. Hidden once school.isSampleContent is false. */
export function SampleNote({ children, className, tone = 'light', force }: { children: React.ReactNode; className?: string; tone?: 'light' | 'dark'; force?: boolean }) {
  if (!school.isSampleContent && !force) return null
  return (
    <p className={cn('inline-flex items-start gap-2 rounded-2xl px-3.5 py-2 text-xs leading-relaxed sm:text-sm', tone === 'dark' ? 'bg-cream/10 text-cream/80' : 'bg-plum/5 text-muted-strong', className)}>
      <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      <span>{children}</span>
    </p>
  )
}

/** Rotating circular text badge — decorative. */
export function RotatingBadge({ text, className, tone = 'dark' }: { text: string; className?: string; tone?: 'dark' | 'light' }) {
  const chars = `${text} • ${text} • `
  return (
    <div aria-hidden="true" className={cn('relative grid size-32 place-items-center sm:size-40', className)}>
      <svg viewBox="0 0 200 200" className="absolute inset-0 animate-spin-slow">
        <defs>
          <path id="circlePath" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text className="font-display" fontSize="15" letterSpacing="4" fill={tone === 'dark' ? '#21172F' : '#FFF8EE'}>
          <textPath href="#circlePath">{chars.toUpperCase()}</textPath>
        </text>
      </svg>
      <div className={cn('size-12 rounded-full sm:size-14', tone === 'dark' ? 'bg-emerald' : 'bg-peach')} />
    </div>
  )
}

/** Simple monochrome social glyphs (brand icons are not shipped with lucide). */
export function SocialGlyph({ label }: { label: string }) {
  const paths: Record<string, string> = {
    Instagram: 'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm5 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm5.5-3a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z',
    YouTube: 'M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3L10 15Z',
    Facebook: 'M14 8h3V4h-3a4 4 0 0 0-4 4v2H8v4h2v8h4v-8h3l1-4h-4V8.5a.5.5 0 0 1 .5-.5Z',
    WhatsApp: 'M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.6.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.2c0-.1-.2-.2-.5-.3Z',
    LinkedIn: 'M4 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm-2 6h4v12H2V9Zm7 0h3.8v1.7h.1A4.2 4.2 0 0 1 16.7 8.7C20.7 8.7 21.5 11.3 21.5 14.7V21h-4v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9V21H9V9Z',
  }
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
      <path d={paths[label] ?? 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z'} fillRule="evenodd" />
    </svg>
  )
}
