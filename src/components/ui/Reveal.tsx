import { motion, type Variants } from 'framer-motion'
import type { ReactNode, ElementType } from 'react'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: (d: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: d } }),
}

export function Reveal({ children, delay = 0, className, as = 'div' }: { children: ReactNode; delay?: number; className?: string; as?: 'div' | 'li' | 'section' | 'article' }) {
  const M = motion[as]
  return (
    <M className={className} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} custom={delay}>
      {children}
    </M>
  )
}

/**
 * Masked, line-by-line headline reveal. Each entry in `lines` is one visual line.
 * Text is real DOM text, so it stays readable by assistive tech; with reduced
 * motion, MotionConfig removes the transform so the text is simply shown.
 */
export function RevealText({
  lines, as: Tag = 'h2', className, delay = 0, immediate = false,
}: { lines: ReactNode[]; as?: ElementType; className?: string; delay?: number; immediate?: boolean }) {
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={i} className="-mb-[0.1em] block overflow-hidden pb-[0.1em]">
          <motion.span
            className="block"
            initial={{ y: '105%' }}
            {...(immediate ? { animate: { y: 0 } } : { whileInView: { y: 0 }, viewport: { once: true, margin: '-40px' } })}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: delay + i * 0.09 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

export const staggerParent: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } }
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}
