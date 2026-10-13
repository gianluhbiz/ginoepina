import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useLang } from '../i18n'
import { strings } from '../i18n/strings'
import { allergenNames, businessLunch, businessLunchNote, menu, menuNotes, tastingMenus } from '../data/menu'
import { site } from '../data/site'
import { formatPrice } from '../lib/format'
import { ease } from '../lib/motion'
import { cn } from '../lib/cn'
import type { MenuItem } from '../types'
import SignHeading from '../components/ui/SignHeading'
import Plate from '../components/ui/Plate'
import Button from '../components/ui/Button'
import MenuItemRow from '../components/ui/MenuItemRow'

const norm = (s: string) => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()

function matches(item: MenuItem, q: string) {
  if (!q) return true
  return norm([item.name, item.nameEn, item.desc?.it, item.desc?.en].filter(Boolean).join(' ')).includes(q)
}

export default function MenuPage() {
  const { t, lang } = useLang()
  const [query, setQuery] = useState('')
  const [excluded, setExcluded] = useState<number[]>([])
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [active, setActive] = useState(menu[0].id)
  const chipsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.title = `${t(strings.menuPage.title)} · Gino e Pina, Benevento`
  }, [t])

  const q = norm(query.trim())
  const filtered = useMemo(
    () =>
      menu
        .map((c) => ({
          ...c,
          sections: c.sections
            .map((s) => ({ ...s, items: s.items.filter((i) => matches(i, q) && !i.allergens?.some((a) => excluded.includes(a))) }))
            .filter((s) => s.items.length > 0),
        }))
        .filter((c) => c.sections.length > 0),
    [q, excluded],
  )
  const total = filtered.reduce((n, c) => n + c.sections.reduce((m, s) => m + s.items.length, 0), 0)
  const filtering = q.length > 0 || excluded.length > 0

  // evidenzia la categoria visibile e la tiene in vista nella barra
  useEffect(() => {
    const els = filtered.map((c) => document.getElementById(c.id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-35% 0px -60% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [filtered])

  useEffect(() => {
    const bar = chipsRef.current
    const chip = bar?.querySelector<HTMLElement>(`[data-cat="${active}"]`)
    if (bar && chip) bar.scrollTo({ left: chip.offsetLeft - 16, behavior: 'smooth' })
  }, [active])

  const toggleAllergen = (a: number) => setExcluded((x) => (x.includes(a) ? x.filter((y) => y !== a) : [...x, a]))
  const reset = () => {
    setQuery('')
    setExcluded([])
  }

  return (
    <>
      <section className="bg-green text-enamel">
        <div className="mx-auto max-w-7xl px-4 pb-8 pt-8 sm:px-6 sm:pt-12">
          <SignHeading as="h1" className="text-5xl sm:text-7xl">{t(strings.menuPage.title)}</SignHeading>
          <ul className="mt-5 grid max-w-4xl gap-2 text-base text-enamel/90 sm:grid-cols-3 sm:gap-4">
            <li className="flex gap-2"><i className="ri-calendar-line text-yellow" aria-hidden />{t(menuNotes.daily)}</li>
            <li className="flex gap-2"><i className="ri-information-line text-yellow" aria-hidden />{t(menuNotes.cover)}</li>
            <li className="flex gap-2"><i className="ri-error-warning-line text-yellow" aria-hidden />{t(menuNotes.allergies)}</li>
          </ul>
        </div>
      </section>

      {/* barra strumenti fissa: cerca + categorie */}
      <div className="sticky top-18 z-30 border-b border-green/15 bg-enamel shadow-[0_8px_20px_-16px_rgba(18,32,27,0.5)]">
        <div className="mx-auto max-w-7xl px-4 pt-3 sm:px-6">
          <div className="flex gap-2">
            <label className="relative flex-1">
              <span className="sr-only">{t(strings.menuPage.searchLabel)}</span>
              <i className="ri-search-line pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xl text-muted" aria-hidden />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t(strings.menuPage.search)}
                className="h-12 w-full rounded-xl border-2 border-green/20 bg-white pl-10 pr-3 text-base transition-colors duration-150 placeholder:text-muted focus-visible:border-green focus-visible:outline-none"
              />
            </label>
            <button
              type="button"
              aria-expanded={filtersOpen}
              aria-controls="allergen-panel"
              onClick={() => setFiltersOpen((o) => !o)}
              className={cn(
                'inline-flex min-h-12 items-center gap-2 rounded-xl border-2 px-3 font-semibold transition-[background-color,color,transform] duration-150 active:scale-[0.97]',
                excluded.length ? 'border-red bg-red text-enamel' : 'border-green text-green hover:bg-green-soft',
              )}
            >
              <i className="ri-filter-3-line text-xl" aria-hidden />
              <span className="hidden sm:inline">{t(strings.menuPage.allergenFilter)}</span>
              {excluded.length > 0 && <span className="tabular-nums">({excluded.length})</span>}
            </button>
          </div>


          <nav aria-label={t(strings.menuPage.categories)}>
            <div ref={chipsRef} className="-mx-4 flex gap-1.5 overflow-x-auto px-4 py-3 [scrollbar-width:none] sm:mx-0 sm:px-0">
              {filtered.map((c) => (
                <a
                  key={c.id}
                  href={`#${c.id}`}
                  data-cat={c.id}
                  aria-current={active === c.id ? 'true' : undefined}
                  className={cn(
                    'inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-lg px-3.5 font-semibold transition-[background-color,color] duration-150',
                    active === c.id ? 'bg-green text-enamel' : 'bg-mist text-green hover:bg-green-soft',
                  )}
                >
                  <i className={c.icon} aria-hidden /> {t(c.title)}
                </a>
              ))}
            </div>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
          <AnimatePresence initial={false}>
            {filtersOpen && (
              <motion.div
                id="allergen-panel"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1, transition: { duration: 0.22, ease } }}
                exit={{ height: 0, opacity: 0, transition: { duration: 0.15 } }}
                className="overflow-hidden"
              >
                <div role="group" aria-labelledby="allergen-help" className="mt-4 rounded-[var(--radius-plate)] bg-mist p-4">
                  <p id="allergen-help" className="mb-3 text-sm text-muted">{t(strings.menuPage.allergenFilterHelp)}</p>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(allergenNames).map(([n, name]) => {
                      const a = Number(n)
                      const on = excluded.includes(a)
                      return (
                        <button
                          key={n}
                          type="button"
                          aria-pressed={on}
                          onClick={() => toggleAllergen(a)}
                          className={cn(
                            'inline-flex min-h-10 items-center gap-1.5 rounded-lg border px-2.5 text-sm font-semibold transition-[background-color,color,transform] duration-150 active:scale-[0.97]',
                            on ? 'border-red bg-red text-enamel line-through' : 'border-green/30 bg-white text-ink hover:border-green',
                          )}
                        >
                          <span className="tabular-nums">{n}</span> {t(name)}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        <p aria-live="polite" className="sr-only">
          {filtering ? `${total} ${t(strings.menuPage.results)}` : ''}
        </p>
        {filtering && (
          <div className="mt-5 flex flex-wrap items-center gap-3 rounded-xl bg-mist p-3">
            <span className="font-semibold tabular-nums">
              {total} {t(strings.menuPage.results)}
            </span>
            <button type="button" onClick={reset} className="font-semibold text-green underline underline-offset-4">
              {t(strings.menuPage.resetFilters)}
            </button>
          </div>
        )}

        {!filtering && (
          <section aria-labelledby="set-menus" className="mt-8">
            <h2 id="set-menus" className="sr-only">{t(strings.menuPage.setMenus)}</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Plate tone="green">
                <h3 className="text-2xl font-extrabold uppercase [font-stretch:72%]">{t(strings.groups.tasting)}</h3>
                <ul className="mt-2 divide-y divide-enamel/15">
                  {tastingMenus.map((m) => (
                    <li key={m.name} className="flex items-baseline justify-between gap-3 py-2.5">
                      <span>
                        <span className="block font-bold">{m.name}</span>
                        <span className="text-sm text-enamel/85">{t(m.desc)}</span>
                      </span>
                      <span className="text-lg font-extrabold tabular-nums text-yellow">{formatPrice(m.price, lang)}</span>
                    </li>
                  ))}
                </ul>
              </Plate>
              <Plate tone="green">
                <h3 className="text-2xl font-extrabold uppercase [font-stretch:72%]">{t(strings.groups.business)}</h3>
                <p className="text-sm text-enamel/85">{t(businessLunchNote)}</p>
                <ul className="mt-1 divide-y divide-enamel/15">
                  {businessLunch.map((m) => (
                    <li key={m.name} className="flex items-baseline justify-between gap-3 py-2.5">
                      <span>
                        <span className="block font-bold">{m.name}</span>
                        <span className="text-sm text-enamel/85">{t(m.desc)}</span>
                      </span>
                      <span className="text-lg font-extrabold tabular-nums text-yellow">{formatPrice(m.price, lang)}</span>
                    </li>
                  ))}
                </ul>
              </Plate>
            </div>
          </section>
        )}

        {total === 0 ? (
          <div className="mt-10 rounded-[var(--radius-plate)] bg-mist p-8 text-center">
            <i className="ri-restaurant-line text-4xl text-green" aria-hidden />
            <p className="mt-3 text-lg">{t(strings.menuPage.noResults)}</p>
            <button type="button" onClick={reset} className="mt-4 font-semibold text-green underline underline-offset-4">
              {t(strings.menuPage.resetFilters)}
            </button>
          </div>
        ) : (
          filtered.map((c) => (
            <section key={c.id} id={c.id} aria-labelledby={`${c.id}-title`} className="mt-12 scroll-mt-52">
              <SignHeading id={`${c.id}-title`} className="flex items-center gap-3 border-b-4 border-green pb-2 text-4xl text-green sm:text-5xl">
                <i className={cn(c.icon, 'text-3xl')} aria-hidden /> {t(c.title)}
              </SignHeading>
              {c.intro && <p className="mt-3 max-w-[70ch] text-lg leading-relaxed text-muted">{t(c.intro)}</p>}
              <div className="mt-2 grid gap-x-10 lg:grid-cols-2">
                {c.sections.map((s) => (
                  <div key={s.id} className="mt-6">
                    <h3 className="text-xl font-extrabold uppercase text-ink [font-stretch:80%]">{t(s.title)}</h3>
                    {s.note && <p className="mt-1 text-sm text-muted">{t(s.note)}</p>}
                    <ul className="divide-y divide-green/10">
                      {s.items.map((i) => (
                        <MenuItemRow key={i.name + (i.desc?.it ?? '')} item={i} />
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          ))
        )}

        <p className="mt-10 text-base text-muted">{t(menuNotes.askDaily)}</p>

        <section aria-labelledby="legend" className="mt-10 rounded-[var(--radius-plate)] bg-mist p-5 sm:p-6">
          <h2 id="legend" className="text-xl font-bold">{t(strings.menuPage.legendTitle)}</h2>
          <ol className="mt-3 grid gap-x-6 gap-y-1.5 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(allergenNames).map(([n, name]) => (
              <li key={n} className="flex items-center gap-2">
                <span className="grid h-6 min-w-6 place-items-center rounded-full border border-green/30 px-1 text-xs font-bold text-green tabular-nums">{n}</span>
                {t(name)}
              </li>
            ))}
          </ol>
          <p className="mt-3 text-sm text-muted">{t(strings.menuPage.legendNote)}</p>
        </section>

        <Plate tone="green" className="mt-10" innerClassName="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-2xl font-extrabold uppercase [font-stretch:72%]">{t(strings.menuPage.bookCta)}</p>
          <div className="flex flex-wrap gap-3">
            <Button to="/#prenota" variant="red" icon="ri-calendar-check-line">{t(strings.nav.book)}</Button>
            <Button href={site.phone.href} variant="outline-light" icon="ri-phone-line">{site.phone.display}</Button>
          </div>
        </Plate>
      </div>
    </>
  )
}
