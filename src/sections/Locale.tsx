import { useLang } from '../i18n'
import { strings } from '../i18n/strings'
import { spaces } from '../data/content'
import { photos } from '../lib/images'
import { cn } from '../lib/cn'
import SignHeading from '../components/ui/SignHeading'

const layout = ['lg:col-span-2 lg:row-span-2', '', '', 'lg:col-span-2']

export default function Locale() {
  const { t } = useLang()
  return (
    <section id="locale" aria-labelledby="locale-title" className="scroll-mt-20 bg-mist py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
          <div className="overflow-hidden rounded-[var(--radius-plate)] bg-green p-1.5">
            <img src={photos.threeGenerations} alt={t({ it: 'Tre generazioni di pizzaioli', en: 'Three generations of pizza makers' })} loading="lazy" className="aspect-[12/7] w-full rounded-[calc(var(--radius-plate)-5px)] object-cover grayscale" />
          </div>
          <div>
            <SignHeading id="locale-title" className="text-4xl text-green sm:text-5xl">{t(strings.locale.title)}</SignHeading>
            <p className="mt-5 max-w-[62ch] text-lg leading-relaxed">{t(strings.locale.body)}</p>
            <p className="mt-4 max-w-[62ch] text-lg leading-relaxed text-muted">{t(strings.locale.strega)}</p>
          </div>
        </div>

        <h3 className="mb-4 mt-14 text-2xl font-extrabold uppercase text-green [font-stretch:72%] sm:text-3xl">{t(strings.locale.spacesTitle)}</h3>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[15rem]">
          {spaces.map((s, i) => (
            <li key={s.id} className={cn('relative aspect-[16/11] overflow-hidden rounded-[var(--radius-plate)] bg-green lg:aspect-auto', layout[i])}>
              <img src={s.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-x-1.5 bottom-1.5 rounded-[calc(var(--radius-plate)-5px)] bg-green px-4 py-3 text-enamel">
                <p className="text-lg font-bold">{t(s.title)}</p>
                <p className="text-enamel/85">{t(s.text)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
