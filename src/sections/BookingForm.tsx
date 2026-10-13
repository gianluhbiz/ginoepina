import { useMemo, useState, type FormEvent } from 'react'
import { useLang } from '../i18n'
import { strings } from '../i18n/strings'
import { dayNames, hours, site, whatsappLink } from '../data/site'

/** Oggi a Benevento, nel formato dei campi data (aaaa-mm-gg) */
function todayInRome() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Rome' }).format(new Date())
}

function slots(from: string, to: string) {
  const [h1, m1] = from.split(':').map(Number)
  const [h2, m2] = to.split(':').map(Number)
  const out: string[] = []
  // ultimo orario prenotabile: un'ora prima della chiusura
  for (let m = h1 * 60 + m1; m <= h2 * 60 + m2 - 60; m += 30) out.push(`${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`)
  return out
}

const field = 'h-12 w-full rounded-lg border-2 border-transparent bg-enamel px-3 text-base text-ink transition-colors duration-150 focus-visible:border-yellow focus-visible:outline-none'
const label = 'mb-1.5 block text-sm font-semibold text-enamel'

/**
 * Prenotazione che funziona senza server: compone il messaggio
 * e apre WhatsApp. Il ristorante conferma rispondendo.
 */
export default function BookingForm() {
  const { t, lang } = useLang()
  const [people, setPeople] = useState('2')
  const [date, setDate] = useState(todayInRome)
  const [time, setTime] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState(false)

  const day = useMemo(() => {
    const [y, m, d] = date.split('-').map(Number)
    return new Date(y, m - 1, d).getDay()
  }, [date])
  const opening = hours.find((h) => h.day === day)
  const lunch = opening?.lunch ? slots(...opening.lunch) : []
  const dinner = opening?.dinner ? slots(...opening.dinner) : []

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!time) {
      setError(true)
      return
    }
    const [y, m, d] = date.split('-')
    const msg = [
      t(strings.booking.message),
      `${t(strings.booking.msgPeople)}: ${people}`,
      `${t(strings.booking.msgDate)}: ${t(dayNames[day])} ${d}/${m}/${y}`,
      `${t(strings.booking.msgTime)}: ${time}`,
      name.trim() && `${t(strings.booking.msgName)}: ${name.trim()}`,
    ]
      .filter(Boolean)
      .join('\n')
    window.open(whatsappLink(msg), '_blank', 'noopener')
  }

  return (
    <form onSubmit={onSubmit} aria-labelledby="booking-title" noValidate>
      <h2 id="booking-title" className="mb-4 text-2xl font-extrabold uppercase [font-stretch:72%]">
        {t(strings.booking.title)}
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div>
          <label htmlFor="bk-people" className={label}>{t(strings.booking.people)}</label>
          <select id="bk-people" value={people} onChange={(e) => setPeople(e.target.value)} className={field}>
            {Array.from({ length: 12 }, (_, i) => String(i + 1)).map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
            <option value="13+">13+</option>
          </select>
        </div>
        <div>
          <label htmlFor="bk-date" className={label}>{t(strings.booking.date)}</label>
          <input
            id="bk-date"
            type="date"
            value={date}
            min={todayInRome()}
            lang={lang}
            onChange={(e) => {
              setDate(e.target.value || todayInRome())
              setTime('')
            }}
            className={field}
          />
        </div>
        <div>
          <label htmlFor="bk-time" className={label}>{t(strings.booking.time)}</label>
          <select
            id="bk-time"
            value={time}
            onChange={(e) => {
              setTime(e.target.value)
              setError(false)
            }}
            aria-invalid={error}
            aria-describedby={error ? 'bk-error' : undefined}
            className={field}
          >
            <option value="">{t(strings.booking.pickTime)}</option>
            <optgroup label={t(strings.booking.lunch)}>
              {lunch.map((s) => <option key={s} value={s}>{s}</option>)}
            </optgroup>
            {dinner.length > 0 && (
              <optgroup label={t(strings.booking.dinner)}>
                {dinner.map((s) => <option key={s} value={s}>{s}</option>)}
              </optgroup>
            )}
          </select>
        </div>
        <div>
          <label htmlFor="bk-name" className={label}>{t(strings.booking.name)}</label>
          <input id="bk-name" type="text" autoComplete="given-name" value={name} onChange={(e) => setName(e.target.value)} placeholder={t(strings.booking.namePlaceholder)} className={`${field} placeholder:text-muted`} />
        </div>
      </div>

      {dinner.length === 0 && <p className="mt-3 text-sm font-semibold text-yellow">{t(strings.booking.closedDay)}</p>}
      {error && (
        <p id="bk-error" role="alert" className="mt-3 inline-block rounded-md bg-enamel px-2 py-1 text-sm font-semibold text-red-deep">
          {t(strings.booking.errorTime)}
        </p>
      )}

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-red px-6 text-lg font-semibold text-enamel transition-[background-color,transform] duration-150 ease-out hover:bg-red-deep active:scale-[0.97]"
        >
          <i className="ri-whatsapp-line text-xl" aria-hidden />
          {t(strings.booking.submit)}
        </button>
        <p className="text-enamel/90">
          {t(strings.booking.or)}{' '}
          <a href={site.phone.href} className="font-bold text-yellow underline underline-offset-4">
            {site.phone.display}
          </a>
        </p>
      </div>
      <p className="mt-3 text-sm text-enamel/80">{t(strings.booking.help)}</p>
    </form>
  )
}
