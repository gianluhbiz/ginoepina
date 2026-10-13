import { useLang } from '../../i18n'
import { strings } from '../../i18n/strings'
import { cn } from '../../lib/cn'
import type { Lang } from '../../types'

/** Selettore IT / EN: due tasti sempre visibili, nessun menu a tendina */
export default function LangToggle({ className }: { className?: string }) {
  const { lang, setLang, t } = useLang()
  const opts: Lang[] = ['it', 'en']
  return (
    <div role="group" aria-label={t(strings.lang.label)} className={cn('flex rounded-lg bg-green-deep p-1', className)}>
      {opts.map((o) => (
        <button
          key={o}
          type="button"
          lang={o}
          aria-pressed={lang === o}
          onClick={() => setLang(o)}
          className={cn(
            'min-h-9 min-w-10 rounded-md px-2 text-sm font-bold uppercase transition-colors duration-150',
            lang === o ? 'bg-enamel text-green' : 'text-enamel/80 hover:text-enamel',
          )}
        >
          {o}
        </button>
      ))}
    </div>
  )
}
