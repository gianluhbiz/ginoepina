import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { cn } from '../../lib/cn'

type Variant = 'red' | 'enamel' | 'green' | 'outline' | 'outline-light'

const variants: Record<Variant, string> = {
  red: 'bg-red text-enamel hover:bg-red-deep',
  enamel: 'bg-enamel text-green hover:bg-mist',
  green: 'bg-green text-enamel hover:bg-green-deep',
  outline: 'border-2 border-green text-green hover:bg-green hover:text-enamel',
  'outline-light': 'border-2 border-enamel/80 text-enamel hover:bg-enamel hover:text-green',
}

interface Props {
  href?: string
  to?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  variant?: Variant
  icon?: string
  children: ReactNode
  className?: string
  external?: boolean
  size?: 'md' | 'lg'
}

/** Bottone/link: grande, leggibile, con risposta immediata al tocco */
export default function Button({ href, to, onClick, type = 'button', variant = 'red', icon, children, className, external, size = 'md' }: Props) {
  const cls = cn(
    'inline-flex items-center justify-center gap-2 rounded-xl font-semibold',
    'transition-[background-color,color,transform] duration-150 ease-out active:scale-[0.97]',
    size === 'lg' ? 'min-h-14 px-6 text-lg' : 'min-h-12 px-5 text-base',
    variants[variant],
    className,
  )
  const content = (
    <>
      {icon && <i className={cn(icon, 'text-[1.25em]')} aria-hidden />}
      <span>{children}</span>
    </>
  )
  if (to) return <Link to={to} className={cls}>{content}</Link>
  if (href)
    return (
      <a href={href} className={cls} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
        {content}
      </a>
    )
  return (
    <button type={type} onClick={onClick} className={cls}>
      {content}
    </button>
  )
}
