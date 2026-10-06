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
  ink: 'bg-ink text-paper',
  tomato: 'bg-tomato text-paper',
  paper: 'bg-paper text-ink',
  outline: 'border border-current text-current',
}

/** Bottone a pillola: la freccia "passa" da destra a sinistra in hover */
export default function ArrowLink({ href, children, variant = 'ink', icon = 'ri-arrow-right-up-line', className, external }: Props) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      className={cn(
        'group relative inline-flex items-center gap-3 overflow-hidden rounded-full py-2 pl-6 pr-2 text-sm font-semibold transition-transform duration-500 active:scale-95',
        variants[variant],
        className,
      )}
    >
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-full">{children}</span>
        <span className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0">
          {children}
        </span>
      </span>
      <span className="grid size-9 place-items-center rounded-full bg-current/10 transition-transform duration-500 group-hover:rotate-45">
        <i className={cn(icon, 'text-lg')} />
      </span>
    </a>
  )
}
