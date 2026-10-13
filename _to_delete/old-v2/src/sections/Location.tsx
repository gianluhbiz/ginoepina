import { hours, nearby, site } from '../data/site'
import { useOpenStatus } from '../hooks/useOpenStatus'
import { photos } from '../lib/images'
import { cn } from '../lib/cn'
import ParallaxImage from '../components/ui/ParallaxImage'
import ArrowLink from '../components/ui/ArrowLink'
import Magnetic from '../components/ui/Magnetic'

const fmt = (r: [string, string] | null) => (r ? `${r[0]} – ${r[1]}` : 'Chiuso')

export default function Location() {
  const status = useOpenStatus()

  return (
    <section id="contatti" className="relative bg-paper px-4 py-28 text-ink md:px-10 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-16 grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2 className="font-display text-5xl font-light leading-[0.95] tracking-tight md:text-8xl lg:col-span-8">
            Dove siamo: a 200 metri <em className="text-tomato">dal Teatro Romano.</em>
          </h2>
          <p className="max-w-sm text-ink/80 lg:col-span-4 lg:justify-self-end">
            Ampio parcheggio per auto e pullman davanti al locale: spesso punto di partenza e arrivo dei tour che visitano la città.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-12">
          {/* foto città + distanze */}
          <div className="relative overflow-hidden rounded-[1.75rem] lg:col-span-7">
            <ParallaxImage src={photos.benevento} alt="Benevento: Arco di Traiano e Teatro Romano" className="aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[640px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
            <ul className="absolute inset-x-0 bottom-0 grid gap-px p-5 text-paper md:p-8">
              {nearby.map((n) => (
                <li
                  key={n.label}
                  className="flex items-center justify-between gap-4 border-t border-paper/20 py-3 text-sm md:text-base"
                >
                  <span className="flex items-center gap-3">
                    <i className={`${n.icon} text-xl text-crust`} /> {n.label}
                  </span>
                  <span className="shrink-0 font-display italic text-paper/80">{n.distance}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-4 lg:col-span-5">
            {/* orari */}
            <div className="rounded-[1.75rem] bg-ink p-7 text-paper md:p-9">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="font-display text-3xl">Orari</h3>
                <span className={cn('inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold', status.open ? 'bg-basil' : 'bg-tomato')}>
                  <span className="size-1.5 animate-pulse rounded-full bg-paper" /> {status.label}
                </span>
              </div>
              <ul className="text-sm tabular-nums">
                {hours.map((h) => (
                  <li key={h.label} className={cn('grid grid-cols-[1fr_auto_auto] gap-4 border-t border-paper/10 py-2.5', h.day === status.today && 'text-crust')}>
                    <span className="font-medium">{h.label}</span>
                    <span className="text-paper/80">{fmt(h.lunch)}</span>
                    <span className={cn('w-24 text-right', h.dinner ? 'text-paper/80' : 'text-paper/60')}>{fmt(h.dinner)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* contatti */}
            <div className="flex flex-col justify-between gap-8 rounded-[1.75rem] bg-tomato p-7 text-paper md:p-9">
              <div>
                <p className="mb-1 text-sm text-paper">Prenotazioni</p>
                <a href={site.phone.href} className="block font-display text-4xl font-light hover:italic md:text-5xl">{site.phone.display}</a>
                <a href={site.mobile.href} className="block font-display text-2xl font-light text-paper hover:italic">{site.mobile.display}</a>
                <a href={`mailto:${site.email}`} className="mt-3 inline-block text-sm underline decoration-paper/60 underline-offset-4 hover:decoration-paper">{site.email}</a>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Magnetic>
                  <a href={site.whatsapp} target="_blank" rel="noreferrer" className="grid size-16 place-items-center rounded-full bg-paper text-3xl text-basil transition-transform duration-150 ease-out active:scale-[0.97]" aria-label="WhatsApp">
                    <i className="ri-whatsapp-line" aria-hidden />
                  </a>
                </Magnetic>
                <ArrowLink href={site.mapsUrl} external variant="ink" icon="ri-direction-line">Indicazioni</ArrowLink>
              </div>
            </div>
          </div>

          {/* mappa */}
          <div
            className="relative h-[380px] overflow-hidden rounded-[1.75rem] lg:col-span-12"
          >
            <iframe
              title="Mappa Gino e Pina"
              src={site.mapsEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full border-0 grayscale-[0.85] sepia-[0.25] transition-[filter] duration-500 hover:grayscale-0 hover:sepia-0"
            />
            <div className="pointer-events-none absolute left-5 top-5 rounded-full bg-paper px-4 py-2 text-sm font-semibold shadow-lg">
              <i className="ri-map-pin-2-fill mr-1 text-tomato" /> {site.address.street}, Benevento
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
