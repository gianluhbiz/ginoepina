import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { categories, dishes, signatureDishes } from '../data/dishes'
import { ease } from '../lib/motion'
import { cn } from '../lib/cn'
import SectionLabel from '../components/ui/SectionLabel'
import RevealText from '../components/ui/RevealText'
import Lightbox from '../components/ui/Lightbox'
import ParallaxImage from '../components/ui/ParallaxImage'

/**
 * Schema "editoriale" della griglia (4 colonne): ogni blocco di 10 piatti
 * riempie esattamente 4 righe (16 celle), così non restano buchi.
 */
const span = (i: number, editorial: boolean) => {
  if (!editorial) return i === 0 ? 'col-span-2 row-span-2' : ''
  const p = i % 10
  if (p === 0) return 'col-span-2 row-span-2'
  if (p === 3 || p === 7) return 'row-span-2'
  if (p === 5) return 'col-span-2'
  return ''
}

export default function Specialties() {
  const [cat, setCat] = useState<(typeof categories)[number]>('Tutti')
  const [expanded, setExpanded] = useState(false)
  const [active, setActive] = useState<number | null>(null)

  const filtered = useMemo(() => (cat === 'Tutti' ? dishes : dishes.filter((d) => d.category === cat)), [cat])
  const visible = expanded || cat !== 'Tutti' ? filtered : filtered.slice(0, 10)

  return (
    <section id="cucina" className="relative bg-paper px-4 py-28 text-ink md:px-10 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-14 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel className="mb-8 text-tomato">Il menu tipico sannita</SectionLabel>
            <RevealText text="Ogni piatto racconta le nostre terre." className="font-display text-5xl font-light leading-[0.95] tracking-tight md:text-7xl lg:text-8xl" />
          </div>
          <p className="max-w-md text-lg leading-relaxed text-ink/70 lg:col-span-5 lg:justify-self-end">
            Terra e mare, un menu che cambia con le stagioni e la disponibilità delle materie prime. Anche con specialità
            <strong className="font-semibold text-basil"> vegetariane, vegane e per celiaci</strong>.
          </p>
        </div>

        {/* tre copertine ufficiali */}
        <div className="mb-20 grid gap-4 md:grid-cols-3">
          {signatureDishes.map((d, i) => (
            <motion.figure
              key={d.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 1, ease, delay: i * 0.1 }}
              className="group"
            >
              <ParallaxImage src={d.image} alt={d.name} strength={10} className="aspect-[4/5] rounded-[1.5rem] md:aspect-[3/4]" />
              <figcaption className="mt-4 flex items-baseline justify-between gap-4">
                <span className="font-display text-2xl leading-tight">{d.name}</span>
                <span className="text-xs uppercase tracking-[0.25em] text-ink/40">Firma</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        {/* filtri */}
        <LayoutGroup>
          <div className="sticky top-24 z-20 mb-8 flex justify-center">
            <div className="flex max-w-full gap-1 overflow-x-auto rounded-full bg-ink p-1.5 text-sm text-paper shadow-xl [scrollbar-width:none]">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={cn('relative shrink-0 rounded-full px-4 py-2 font-medium transition-colors md:px-5', cat === c ? 'text-ink' : 'text-paper/70 hover:text-paper')}
                >
                  {cat === c && <motion.span layoutId="cat-pill" className="absolute inset-0 rounded-full bg-paper" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                  <span className="relative">{c}</span>
                </button>
              ))}
            </div>
          </div>

          <motion.div layout className="grid grid-flow-dense auto-rows-[150px] grid-cols-2 gap-3 md:auto-rows-[220px] md:grid-cols-4 md:gap-4">
            <AnimatePresence mode="popLayout">
              {visible.map((d, i) => (
                <motion.button
                  layout
                  key={d.id}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.6, ease }}
                  onClick={() => setActive(i)}
                  className={cn('group relative overflow-hidden rounded-2xl text-left', span(i, cat === 'Tutti'))}
                >
                  <motion.img
                    layoutId={`dish-${d.id}`}
                    src={d.image}
                    alt={d.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 translate-y-4 p-4 text-paper opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-crust">{d.category}</p>
                    <p className="font-display text-lg leading-tight md:text-2xl">{d.name}</p>
                  </div>
                  <span className="absolute right-3 top-3 grid size-9 scale-0 place-items-center rounded-full bg-paper text-ink transition-transform duration-500 group-hover:scale-100">
                    <i className="ri-add-line" />
                  </span>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {cat === 'Tutti' && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setExpanded((e) => !e)}
              className="group inline-flex items-center gap-3 rounded-full border border-ink px-7 py-4 font-semibold transition-colors hover:bg-ink hover:text-paper"
            >
              {expanded ? 'Mostra meno' : `Vedi tutti i ${dishes.length} piatti`}
              <i className={cn('ri-arrow-down-line transition-transform duration-500', expanded && 'rotate-180')} />
            </button>
          </div>
        )}
      </div>

      <Lightbox items={visible} index={active} onClose={() => setActive(null)} onChange={setActive} />
    </section>
  )
}
