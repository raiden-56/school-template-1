import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useId, useState, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

export interface AccordionItem { id?: string; title: ReactNode; content: ReactNode }

export function Accordion({ items, tone = 'light', defaultOpen = -1, className }: { items: AccordionItem[]; tone?: 'light' | 'dark'; defaultOpen?: number; className?: string }) {
  const [open, setOpen] = useState<number>(defaultOpen)
  const base = useId()
  return (
    <div className={cn('divide-y', tone === 'dark' ? 'divide-cream/15' : 'divide-plum/10', className)}>
      {items.map((item, i) => {
        const isOpen = open === i
        const btnId = `${base}-b-${i}`
        const panelId = `${base}-p-${i}`
        return (
          <div key={i} id={item.id}>
            <h3 className="text-base sm:text-lg">
              <button
                id={btnId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left font-display font-semibold tracking-tight sm:gap-6"
              >
                <span>{item.title}</span>
                <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className={cn('grid size-9 shrink-0 place-items-center rounded-full', tone === 'dark' ? 'bg-cream/10' : 'bg-plum/5')} aria-hidden="true">
                  <Plus className="size-4" />
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className={cn('pb-6 leading-relaxed sm:pr-12', tone === 'dark' ? 'text-cream/75' : 'text-muted-strong')}>{item.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
