import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/cn'

interface ModalProps {
  open: boolean
  onClose: () => void
  label: string
  children: ReactNode
  className?: string
  variant?: 'panel' | 'fullscreen'
  onKeyDown?: (e: KeyboardEvent) => void
}

/** Accessible dialog: focus trap, Escape to close, scroll lock, focus restore. */
export function Modal({ open, onClose, label, children, className, variant = 'panel', onKeyDown }: ModalProps) {
  const ref = useRef<HTMLDivElement>(null)
  const keyRef = useRef(onKeyDown)
  keyRef.current = onKeyDown
  const closeRef = useRef(onClose)
  closeRef.current = onClose

  useEffect(() => {
    if (!open) return
    const previous = document.activeElement as HTMLElement | null
    const html = document.documentElement
    const prevOverflow = html.style.overflow
    html.style.overflow = 'hidden'
    const t = setTimeout(() => ref.current?.querySelector<HTMLElement>('[data-autofocus], button, a, [tabindex]')?.focus(), 30)

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); closeRef.current(); return }
      keyRef.current?.(e)
      if (e.key !== 'Tab' || !ref.current) return
      const focusables = Array.from(ref.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'))
      if (!focusables.length) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      clearTimeout(t)
      document.removeEventListener('keydown', onKey)
      html.style.overflow = prevOverflow
      previous?.focus?.()
    }
  }, [open])

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-plum/30 backdrop-blur-md" onClick={onClose} aria-hidden="true" />
          <motion.div
            ref={ref}
            role="dialog"
            aria-modal="true"
            aria-label={label}
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              'relative z-10 w-full overflow-y-auto',
              variant === 'panel' ? 'max-h-[92dvh] max-w-2xl rounded-t-[2rem] bg-cream sm:rounded-[2rem]' : 'h-[100dvh] max-w-none bg-cream/95 backdrop-blur-xl',
              className,
            )}
          >
            <button onClick={onClose} className="absolute right-4 top-4 z-20 grid size-11 place-items-center rounded-full bg-violet text-white ring-2 ring-white transition hover:bg-emerald hover:text-plum" aria-label="Close dialog">
              <X className="size-5" />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
