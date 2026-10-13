import { useLang } from '../../i18n'
import { strings } from '../../i18n/strings'
import { useOpenStatus } from '../../hooks/useOpenStatus'
import { cn } from '../../lib/cn'

/** Targhetta "Aperto / Chiuso" in tempo reale, sull'ora di Benevento */
export default function StatusPlate({ className }: { className?: string }) {
  const { t } = useLang()
  const s = useOpenStatus()
  const open = s.kind === 'open'
  const label =
    s.kind === 'open'
      ? `${t(strings.status.openUntil)} ${s.until}`
      : s.kind === 'later'
        ? `${t(strings.status.closedOpensAt)} ${s.at}`
        : `${t(strings.status.closedTomorrow)} ${s.at}`

  return (
    <p
      role="status"
      className={cn(
        'inline-flex items-center gap-2.5 rounded-lg px-3.5 py-2 text-base font-semibold tabular-nums',
        open ? 'bg-yellow text-ink' : 'bg-enamel text-red-deep',
        className,
      )}
    >
      <span className={cn('size-2.5 rounded-full', open ? 'bg-green' : 'bg-red')} aria-hidden />
      {label}
    </p>
  )
}
