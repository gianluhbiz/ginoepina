import { Link } from 'react-router'
import { useLang } from '../i18n'
import { strings } from '../i18n/strings'
import { menu, menuNotes } from '../data/menu'
import { formatPrice } from '../lib/format'
import { menuPhoto } from '../lib/images'
import { cn } from '../lib/cn'
import SignHeading from '../components/ui/SignHeading'
import Button from '../components/ui/Button'

/** Foto di copertina per le categorie principali (foto vere dal menu digitale) */
const covers: Record<string, string> = {
  antipasti: '697b8c2aebe668.024683394PARMIGIANADIMELANZANEALFORNO.jpg',
  pizze: '698088fe5b31a1.02891848MARGHERITADOC.jpg',
  primi: '697c86d96967d1.7913209241PASTAALLAbENEVENTANA.jpg',
  secondi: '697c8fabc26887.3150908484SALSICCIAROSSADICASTELPOTOCONPROVOLA.jpg',
}

export default function MenuPreview() {
  const { t, lang } = useLang()
  const main = menu.filter((c) => covers[c.id])
  const others = menu.filter((c) => !covers[c.id])

  const stats = (id: string) => {
    const items = menu.find((c) => c.id === id)!.sections.flatMap((s) => s.items)
    const prices = items.filter((i) => !i.priceNote).map((i) => i.price).filter((p): p is number => typeof p === 'number' && p > 0)
    return { count: items.length, from: prices.length ? Math.min(...prices) : null }
  }

  return (
    <section aria-labelledby="menu-title" className="bg-enamel py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <SignHeading id="menu-title" className="text-5xl text-green sm:text-6xl">{t(strings.menuPreview.title)}</SignHeading>
            <p className="mt-4 text-lg leading-relaxed text-muted">{t(strings.menuPreview.lead)}</p>
          </div>
          <Button to="/menu" variant="green" size="lg" icon="ri-book-open-line">{t(strings.actions.seeMenu)}</Button>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {main.map((c, i) => {
            const s = stats(c.id)
            return (
              <li key={c.id} className={cn(i === 0 && 'col-span-2 lg:col-span-1')}>
                <Link
                  to={`/menu#${c.id}`}
                  className="group block overflow-hidden rounded-[var(--radius-plate)] bg-green p-1.5 text-enamel transition-transform duration-150 active:scale-[0.98]"
                >
                  <img
                    src={menuPhoto(covers[c.id])}
                    alt=""
                    loading="lazy"
                    className={cn('w-full rounded-[calc(var(--radius-plate)-5px)] object-cover', i === 0 ? 'aspect-[16/9] lg:aspect-[4/5]' : 'aspect-[4/5]')}
                  />
                  <span className="flex items-end justify-between gap-2 px-2.5 pb-2 pt-3">
                    <span className="text-2xl font-extrabold uppercase leading-none [font-stretch:72%] sm:text-3xl">{t(c.title)}</span>
                    <span className="text-right text-sm leading-tight text-enamel/85 tabular-nums">
                      {s.count} {t(strings.menuPreview.dishes)}
                      {s.from !== null && (
                        <>
                          <br />
                          {t(strings.menuPreview.from)} {formatPrice(s.from, lang)}
                        </>
                      )}
                    </span>
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>

        <ul className="mt-4 flex flex-wrap gap-2">
          {others.map((c) => (
            <li key={c.id}>
              <Link
                to={`/menu#${c.id}`}
                className="inline-flex min-h-12 items-center gap-2 rounded-xl border-2 border-green px-4 font-semibold text-green transition-[background-color,color,transform] duration-150 hover:bg-green hover:text-enamel active:scale-[0.97]"
              >
                <i className={c.icon} aria-hidden /> {t(c.title)}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="mt-8 grid gap-3 text-base sm:grid-cols-3">
          <li className="flex gap-3 rounded-xl bg-yellow/30 p-4"><i className="ri-fire-line text-xl text-red-deep" aria-hidden />{t(strings.menuPreview.pizzaNote)}</li>
          <li className="flex gap-3 rounded-xl bg-green-soft p-4"><i className="ri-leaf-line text-xl text-green" aria-hidden />{t({ it: 'Piatti vegetariani, vegani e senza glutine.', en: 'Vegetarian, vegan and gluten-free dishes.' })}</li>
          <li className="flex gap-3 rounded-xl bg-mist p-4"><i className="ri-information-line text-xl text-green" aria-hidden />{t(menuNotes.cover)}</li>
        </ul>
      </div>
    </section>
  )
}
