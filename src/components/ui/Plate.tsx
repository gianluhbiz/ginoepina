import type { ElementType, ReactNode } from 'react'
import { cn } from '../../lib/cn'

type Tone = 'green' | 'enamel' | 'red' | 'yellow'

const tones: Record<Tone, { outer: string; rim: string }> = {
  green: { outer: 'bg-green text-enamel', rim: 'border-enamel/85' },
  enamel: { outer: 'bg-enamel text-ink shadow-[0_1px_0_rgba(18,32,27,0.06),0_12px_28px_-18px_rgba(18,32,27,0.45)] ring-1 ring-green/15', rim: 'border-green/70' },
  red: { outer: 'bg-red text-enamel', rim: 'border-enamel/85' },
  yellow: { outer: 'bg-yellow text-ink', rim: 'border-ink/70' },
}

interface Props {
  tone?: Tone
  as?: ElementType
  className?: string
  innerClassName?: string
  children: ReactNode
  id?: string
}

/**
 * La "targa smaltata": lamiera colorata con il filetto interno,
 * l'elemento base di tutto il sito.
 */
export default function Plate({ tone = 'green', as: Tag = 'div', className, innerClassName, children, id }: Props) {
  const t = tones[tone]
  return (
    <Tag id={id} className={cn('rounded-[var(--radius-plate)] p-1.5', t.outer, className)}>
      <div className={cn('h-full rounded-[calc(var(--radius-plate)-5px)] border-2 p-5 sm:p-6', t.rim, innerClassName)}>{children}</div>
    </Tag>
  )
}
