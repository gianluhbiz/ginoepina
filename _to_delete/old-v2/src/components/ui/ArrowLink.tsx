import { cn } from '../../lib/cn'

interface Props {
  href: string
  children: string
  variant?: 'ink' | 'tomato' | 'paper' | 'outline'
  icon?: string
  className?: string
  external?: boolean
}

const variants = {
  ink: 'bg-ink text-paper hover:bg-ink-2',
  tomato: 'bg-tomato text-paper hover:bg-tomato-deep',
  paper: 'bg-paper text-ink hover:bg-paper-2',
  outline: 'border border-current text-current hover:bg-ink/5',
}

/** Bottone a pillola: il testo scorre in verticale in hover, si "preme" al click */
export default function ArrowLink({ href, children, variant = 'ink', icon = 'ri-arrow-right-up-line', className, external }: Props) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      className={cn(
        'group relative inline-flex items-center gap-3 overflow-hidden rounded-full py-2 pl-6 pr-2 text-sm font-semibold',
        'transition-[transform,background-color] duration-150 ease-out active:scale-[0.97]',
        variants[variant],
        className,
      )}
    >
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-300 ease-(--ease-out) group-hover:-translate-y-full">{children}</span>
        <span aria-hidden className="absolute inset-0 block translate-y-full transition-transform duration-300 ease-(--ease-out) group-hover:translate-y-0">
          {children}
        </span>
      </span>
      <span className="grid size-9 place-items-center rounded-full bg-current/10 transition-transform duration-300 ease-(--ease-out) group-hover:rotate-45">
        <i className={cn(icon, 'text-lg')} aria-hidden />
      </span>
    </a>
  )
}
