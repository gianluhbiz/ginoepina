import { useLang } from '../i18n'
import { strings } from '../i18n/strings'
import { dayNames, hours, site, whatsappLink } from '../data/site'
import { useOpenStatus } from '../hooks/useOpenStatus'
import { cn } from '../lib/cn'
import Plate from '../components/ui/Plate'
import SignHeading from '../components/ui/SignHeading'
import Button from '../components/ui/Button'

const fmt = (r: [string, string] | null) => (r ? `${r[0]}–${r[1]}` : null)

/** Le tre targhe pratiche: orari, dove, contatti */
export default function InfoPlates() {
  const { t } = useLang()
  const { today } = useOpenStatus()

  return (
    <section id="dove" aria-label={t(strings.nav.dove)} className="scroll-mt-20 bg-mist pb-12 sm:pb-16">
      <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 lg:grid-cols-3 lg:gap-6">
        <Plate tone="enamel">
          <SignHeading className="mb-4 text-3xl text-green">{t(strings.info.hours)}</SignHeading>
          <table className="w-full text-left text-[0.95rem] tabular-nums sm:text-base">
            <caption className="sr-only">{t(strings.info.hours)}</caption>
            <thead className="sr-only">
              <tr>
                <th scope="col">{t(strings.info.hours)}</th>
                <th scope="col">{t(strings.info.lunchShort)}</th>
                <th scope="col">{t(strings.info.dinnerShort)}</th>
              </tr>
            </thead>
            <tbody>
              {hours.map((h) => {
                const isToday = h.day === today
                return (
                  <tr key={h.day} className={cn('border-t border-green/10', isToday && 'bg-yellow/35 font-bold')}>
                    <th scope="row" className="py-2 pl-2 font-semibold">
                      {t(dayNames[h.day])}
                      {isToday && <span className="block text-sm font-semibold text-green">{t(strings.info.today)}</span>}
                    </th>
                    <td className="whitespace-nowrap py-2 pr-2">{fmt(h.lunch)}</td>
                    <td className={cn('whitespace-nowrap py-2 pr-2 text-right', !h.dinner && 'font-semibold text-red-deep')}>{fmt(h.dinner) ?? t(strings.info.closed)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </Plate>

        <Plate tone="green" innerClassName="flex flex-col gap-4">
          <SignHeading className="text-3xl">{t(strings.info.where)}</SignHeading>
          <address className="text-xl not-italic leading-snug">
            {site.address.street}
            <br />
            {site.address.city}
          </address>
          <p className="text-enamel/90">{t(strings.info.parking)}</p>
          <ul className="space-y-1 text-enamel/90">
            <li className="flex gap-2"><i className="ri-ancient-pavilion-line text-yellow" aria-hidden /> Teatro Romano · 200 m</li>
          </ul>
          <div className="mt-auto flex flex-wrap gap-3">
            <Button href={site.mapsUrl} external variant="enamel" icon="ri-direction-line">{t(strings.actions.directions)}</Button>
          </div>
        </Plate>

        <Plate tone="enamel" innerClassName="flex flex-col gap-4">
          <SignHeading className="text-3xl text-green">{t(strings.info.contacts)}</SignHeading>
          <ul className="space-y-3 text-lg">
            <li>
              <a href={site.phone.href} className="flex items-center gap-3 font-bold text-green underline-offset-4 hover:underline">
                <i className="ri-phone-line text-2xl" aria-hidden /> {site.phone.display}
              </a>
            </li>
            <li>
              <a href={whatsappLink()} target="_blank" rel="noreferrer" className="flex items-center gap-3 font-bold text-green underline-offset-4 hover:underline">
                <i className="ri-whatsapp-line text-2xl" aria-hidden /> {site.mobile.display}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex items-center gap-3 text-ink underline-offset-4 hover:underline">
                <i className="ri-mail-line text-2xl text-green" aria-hidden /> {site.email}
              </a>
            </li>
          </ul>
          <div className="mt-auto">
            <Button href={site.bookingUrl} external variant="red" icon="ri-calendar-check-line">{t(strings.actions.bookOnline)}</Button>
          </div>
        </Plate>
      </div>
    </section>
  )
}
