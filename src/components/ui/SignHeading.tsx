import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

/** Titolo "da insegna": condensato, maiuscolo, pesante */
export default function SignHeading({ children, className, as: Tag = 'h2', id }: { children: ReactNode; className?: string; as?: 'h1' | 'h2' | 'h3'; id?: string }) {
  return (
    <Tag id={id} className={cn('font-extrabold uppercase leading-[0.95] tracking-[0.005em] [font-stretch:72%]', className)}>
      {children}
    </Tag>
  )
}
