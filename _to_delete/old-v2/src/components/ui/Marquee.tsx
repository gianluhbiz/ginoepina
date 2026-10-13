import type { ReactNode } from 'react'
import { usePauseOffscreen } from '../../hooks/usePauseOffscreen'
import { cn } from '../../lib/cn'

interface Props {
  children: ReactNode
  /** durata di un giro completo, in secondi */
  duration?: number
  reverse?: boolean
  className?: string
}

/**
 * Nastro infinito in CSS puro (gira fuori dal main thread, resta fluido anche
 * mentre la pagina carica le foto). Si ferma fuori schermo e con reduced-motion.
 */
export default function Marquee({ children, duration = 40, reverse = false, className }: Props) {
  const { ref, playState } = usePauseOffscreen<HTMLDivElement>()
  return (
    <div ref={ref} className={cn('flex overflow-hidden', className)}>
      <div
        style={{ animationDuration: `${duration}s` }}
        className={cn(
          'flex w-max shrink-0 animate-marquee will-change-transform motion-reduce:animate-none',
          reverse && '[animation-direction:reverse]',
          playState,
        )}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  )
}
