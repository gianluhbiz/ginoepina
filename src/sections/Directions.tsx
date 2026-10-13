import { useLang } from '../i18n'
import { strings } from '../i18n/strings'
import { nearby, site } from '../data/site'
import { photos } from '../lib/images'
import SignHeading from '../components/ui/SignHeading'
import Button from '../components/ui/Button'

export default function Directions() {
  const { t } = useLang()
  return (
    <section id="come-arrivare" aria-labelledby="dir-title" className="scroll-mt-20 bg-enamel py-14 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[1fr_1.3fr]">
        <div className="flex flex-col gap-6">
          <SignHeading id="dir-title" className="text-4xl text-green sm:text-5xl">{t(strings.location.title)}</SignHeading>
          <address className="text-xl not-italic">
            {site.address.street}, {site.address.city}
          </address>
          <div>
            <h3 className="mb-2 text-lg font-bold">{t(strings.location.near)}</h3>
            <ul className="divide-y divide-green/15 border-y border-green/15">
              {nearby.map((n) => (
                <li key={n.label.it} className="flex items-center justify-between gap-4 py-3">
                  <span className="flex items-center gap-3">
                    <i className={`${n.icon} text-xl text-green`} aria-hidden /> {t(n.label)}
                  </span>
                  <span className="shrink-0 font-semibold text-green">{t(n.distance)}</span>
                </li>
              ))}
            </ul>
          </div>
          <img src={photos.benevento} alt={t({ it: 'Benevento: Arco di Traiano e Teatro Romano', en: 'Benevento: Arch of Trajan and Roman Theatre' })} loading="lazy" className="hidden aspect-[2/1] w-full rounded-[var(--radius-plate)] object-cover lg:block" />
          <div>
            <Button href={site.mapsUrl} external variant="green" size="lg" icon="ri-direction-line">{t(strings.actions.directions)}</Button>
          </div>
        </div>
        <div className="overflow-hidden rounded-[var(--radius-plate)] bg-green p-1.5">
          <iframe
            title={t(strings.location.mapTitle)}
            src={site.mapsEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[380px] w-full rounded-[calc(var(--radius-plate)-5px)] border-0 lg:h-full lg:min-h-[560px]"
          />
        </div>
      </div>
    </section>
  )
}
