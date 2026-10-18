import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'dark' | 'light' | 'outline-dark' | 'outline-light' | 'ghost'
const variants: Record<Variant, string> = {
  primary: 'bg-emerald text-plum hover:bg-emerald-300',
  dark: 'bg-violet text-white hover:bg-[#5a3fd1]',
  light: 'bg-cream text-plum hover:bg-white',
  'outline-dark': 'border-2 border-plum/70 text-plum hover:border-violet hover:bg-violet hover:text-white',
  'outline-light': 'border-2 border-plum/70 bg-white/60 text-plum hover:border-violet hover:bg-violet hover:text-white',
  ghost: 'text-current underline-offset-4 hover:underline',
}

interface Props {
  to: string
  children: ReactNode
  variant?: Variant
  size?: 'md' | 'lg'
  arrow?: boolean
  className?: string
  download?: boolean
  onClick?: () => void
}

const isExternal = (to: string) => /^(https?:|mailto:|tel:)/.test(to)

export function ButtonLink({ to, children, variant = 'primary', size = 'md', arrow = true, className, download, onClick }: Props) {
  const cls = cn(
    'group inline-flex items-center justify-center gap-2 rounded-full font-display font-semibold tracking-tight transition-colors duration-300',
    size === 'lg' ? 'px-6 py-3.5 text-base sm:px-7 sm:py-4 sm:text-lg' : 'px-5 py-3 text-sm sm:text-base',
    variants[variant],
    className,
  )
  const inner = (
    <>
      <span>{children}</span>
      {arrow && (
        <span className="grid size-6 place-items-center overflow-hidden rounded-full bg-black/10" aria-hidden="true">
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      )}
    </>
  )
  if (isExternal(to) || download || to.endsWith('.pdf')) {
    const ext = /^https?:/.test(to)
    return (
      <a href={to} className={cls} onClick={onClick} download={download || undefined} {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {inner}
        {ext && <span className="sr-only">(opens in a new tab)</span>}
      </a>
    )
  }
  return (
    <Link to={to} className={cls} onClick={onClick}>
      {inner}
    </Link>
  )
}

export function Button({ children, className, variant = 'primary', ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      {...rest}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-display font-semibold transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50',
        variants[variant],
        className,
      )}
    >
      {children}
    </button>
  )
}
