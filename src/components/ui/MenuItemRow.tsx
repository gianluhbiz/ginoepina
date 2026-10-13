import { useState } from 'react'
import { useLang } from '../../i18n'
import { strings } from '../../i18n/strings'
import { allergenNames } from '../../data/menu'
import { formatPrice } from '../../lib/format'
import { menuPhoto } from '../../lib/images'
import type { MenuItem } from '../../types'

/** Una riga del menu: foto (se c'è), nome, descrizione, allergeni, prezzo */
export default function MenuItemRow({ item }: { item: MenuItem }) {
  const { t, lang } = useLang()
  const [imgOk, setImgOk] = useState(Boolean(item.img))

  const price =
    typeof item.price === 'number'
      ? `${formatPrice(item.price, lang)}${item.priceNote ? ` ${t(item.priceNote)}` : ''}`
      : item.priceNote
        ? t(item.priceNote)
        : item.desc?.it.includes('€')
          ? null
          : t(strings.menuPage.askPrice)

  return (
    <li className="flex gap-3 py-4 sm:gap-4">
      {imgOk && item.img && (
        <img
          src={menuPhoto(item.img)}
          alt=""
          loading="lazy"
          decoding="async"
          onError={() => setImgOk(false)}
          className="size-18 shrink-0 rounded-lg bg-mist object-cover sm:size-20"
        />
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-3">
          <h4 className="text-lg font-bold leading-snug">
            {item.name}
            {lang === 'en' && item.nameEn && <span className="block text-base font-medium italic text-muted">{item.nameEn}</span>}
          </h4>
          {price && <p className="shrink-0 text-lg font-extrabold tabular-nums text-green">{price}</p>}
        </div>
        {item.desc && <p className="mt-0.5 text-base leading-relaxed text-muted">{t(item.desc)}</p>}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {item.seasonal && (
            <span className="rounded-md bg-yellow/40 px-2 py-0.5 text-sm font-semibold text-ink">{t(strings.menuPage.seasonal)}</span>
          )}
          {item.allergens && item.allergens.length > 0 && (
            <span className="flex flex-wrap items-center gap-1 text-sm text-muted">
              <span className="sr-only">{t(strings.menuPage.allergens)}:</span>
              <i className="ri-error-warning-line text-base" aria-hidden />
              {item.allergens.map((a) => (
                <abbr
                  key={a}
                  title={t(allergenNames[a])}
                  className="grid h-6 min-w-6 place-items-center rounded-full border border-green/30 px-1 text-xs font-bold text-green no-underline tabular-nums"
                >
                  <span aria-hidden>{a}</span>
                  <span className="sr-only">{t(allergenNames[a])}</span>
                </abbr>
              ))}
            </span>
          )}
        </div>
      </div>
    </li>
  )
}
