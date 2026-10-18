import type { ReactNode } from 'react'
import { RevealText, Reveal } from './Reveal'
import { cn } from '@/lib/cn'

interface Props {
  eyebrow?: string
  lines: ReactNode[]
  intro?: ReactNode
  tone?: 'light' | 'dark'
  align?: 'left' | 'center'
  size?: 'giant' | 'big' | 'mid'
  as?: 'h1' | 'h2' | 'h3'
  className?: string
}

const sizes = { giant: 'text-giant', big: 'text-big', mid: 'text-mid' }

export function SectionHeading({ eyebrow, lines, intro, tone = 'light', align = 'left', size = 'big', as = 'h2', className }: Props) {
  return (
    <div className={cn(align === 'center' && 'mx-auto text-center', 'max-w-4xl', className)}>
      {eyebrow && (
        <Reveal>
          <p className={cn('eyebrow mb-5 inline-flex items-center gap-3', tone === 'dark' ? 'text-emerald' : 'text-forest')}>
            <span className="inline-block h-px w-8 bg-current" aria-hidden="true" />
            {eyebrow}
          </p>
        </Reveal>
      )}
      <RevealText as={as} lines={lines} className={cn(sizes[size], 'font-semibold', tone === 'dark' ? 'text-cream' : 'text-plum')} />
      {intro && (
        <Reveal delay={0.15}>
          <div className={cn('mt-6 max-w-2xl text-base leading-relaxed sm:text-lg', align === 'center' && 'mx-auto', tone === 'dark' ? 'text-cream/75' : 'text-muted-strong')}>{intro}</div>
        </Reveal>
      )}
    </div>
  )
}
