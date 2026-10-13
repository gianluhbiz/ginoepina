import { useLang } from '../i18n'
import { strings } from '../i18n/strings'
import { businessLunch, businessLunchNote, tastingMenus } from '../data/menu'
import { site, whatsappLink } from '../data/site'
import { formatPrice } from '../lib/format'
import { photos } from '../lib/images'
import type { SetMenu } from '../types'
import Plate from '../components/ui/Plate'
import SignHeading from '../components/ui/SignHeading'
import Button from '../components/ui/Button'

function PriceList({ items }: { items: SetMenu[] }) {
  const { t, lang } = useLang()
  return (
    <ul className="divide-y divide-green/15">
      {items.map((m) => (
        <li key={m.name} className="flex items-baseline justify-between gap-4 py-3">
          <span>
            <span className="block text-lg font-bold">{m.name}</span>
            <span className="text-muted">{t(m.desc)}</span>
          </span>
          <span className="shrink-0 text-xl font-extrabold tabular-nums text-green">{formatPrice(m.price, lang)}</span>
        </li>
      ))}
    </ul>
  )
}

export default function Groups() {
  const { t } = useLang()
  const quote = t({ it: 'Buongiorno, vorrei un preventivo per un evento/gruppo da Gino e Pina.', en: 'Hello, I would like a quote for a group/event at Gino e Pina.' })

  return (
    <section id="gruppi" aria-labelledby="gruppi-title" className="scroll-mt-20 bg-green py-14 text-enamel sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
          <SignHeading id="gruppi-title" className="text-4xl sm:text-6xl">{t(strings.groups.title)}</SignHeading>
          <div>
            <p className="max-w-[62ch] text-lg leading-relaxed text-enamel/90">{t(strings.groups.lead)}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button href={whatsappLink(quote)} external variant="red" icon="ri-whatsapp-line">{t(strings.actions.askQuote)}</Button>
              <Button href={site.mobile.href} variant="outline-light" icon="ri-phone-line">{site.mobile.display}</Button>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_1fr_0.9fr] lg:gap-6">
          <Plate tone="enamel">
            <h3 className="mb-1 text-2xl font-extrabold uppercase text-green [font-stretch:72%]">{t(strings.groups.tasting)}</h3>
            <p className="text-sm text-muted">{t(strings.groups.perPerson)}</p>
            <PriceList items={tastingMenus} />
          </Plate>
          <Plate tone="enamel">
            <h3 className="mb-1 text-2xl font-extrabold uppercase text-green [font-stretch:72%]">{t(strings.groups.business)}</h3>
            <p className="text-sm text-muted">{t(businessLunchNote)}</p>
            <PriceList items={businessLunch} />
          </Plate>
          <figure className="overflow-hidden rounded-[var(--radius-plate)] bg-green-deep p-1.5">
            <img src={photos.prive} alt={t({ it: 'La sala privé', en: 'The private room' })} loading="lazy" className="aspect-[4/3] w-full rounded-[calc(var(--radius-plate)-5px)] object-cover" />
            <figcaption className="flex gap-2 p-3 text-enamel/90">
              <i className="ri-gift-line text-xl text-yellow" aria-hidden />
              {t(strings.groups.gift)}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
