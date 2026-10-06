import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface Props {
  children: ReactNode
  duration?: number
  reverse?: boolean
  className?: string
}

/** Nastro infinito: il contenuto viene duplicato e traslato del 50% */
export default function Marquee({ children, duration = 40, reverse = false, className }: Props) {
  return (
    <div className={cn('flex overflow-hidden', className)}>
      <motion.div
        className="flex w-max shrink-0"
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration, ease: 'linear', repeat: Infinity }}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden>
          {children}
        </div>
      </motion.div>
    </div>
  )
}
