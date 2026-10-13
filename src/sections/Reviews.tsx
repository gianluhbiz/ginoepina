import { motion } from 'framer-motion'
import { useRef } from 'react'
import { platforms, reviews } from '../data/reviews'
import { photos } from '../lib/images'
import { ease, viewport } from '../lib/motion'
import SectionLabel from '../components/ui/SectionLabel'
import RevealText from '../components/ui/RevealText'

export default function Reviews() {
  const constraints = useRef<HTMLDivElement>(null)

  return (
    <section className="relative overflow-hidden bg-paper-2 pb-20 pt-28 text-ink md:pb-28 md:pt-40">
      <div className="mx-auto max-w-[1600px] px-4 md:px-10">
        <div className="mb-16 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionLabel className="mb-8 text-tomato">La nostra cucina raccontata dai clienti</SectionLabel>
            <RevealText text="Detto da chi si è seduto a tavola." className="font-display text-5xl font-light leading-[0.95] tracking-tight md:text-7xl" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-6 lg:self-end">
            {platforms.map((p, i) => (
              <motion.a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport}
                transition={{ duration: 0.9, ease, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="group rounded-[1.5rem] bg-paper p-6"
              >
                <div className="mb-6 flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 font-semibold">
                    <i className={`${p.icon} text-xl text-tomato`} /> {p.name}
                  </span>
                  <i className="ri-arrow-right-up-line text-xl transition-transform duration-500 group-hover:rotate-45" />
                </div>
                <p className="font-display text-7xl font-light leading-none">
                  {p.rating}
                  <span className="text-2xl text-ink/40">/5</span>
                </p>
                <p className="mt-3 text-sm font-medium">{p.count}</p>
                <p className="text-sm text-ink/55">{p.note}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* carosello trascinabile */}
      <div ref={constraints} className="overflow-hidden px-4 md:px-10">
        <motion.div
          drag="x"
          dragConstraints={constraints}
          dragElastic={0.12}
          className="flex w-max cursor-grab gap-5 active:cursor-grabbing"
        >
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewport}
            transition={{ duration: 1, ease }}
            className="relative w-[78vw] shrink-0 overflow-hidden rounded-[1.75rem] sm:w-[420px]"
          >
            <img src={photos.awards} alt="Riconoscimenti e attestati" className="pointer-events-none absolute inset-0 h-full w-full object-cover" draggable={false} />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 to-transparent" />
            <div className="relative flex h-full min-h-[340px] flex-col justify-end p-7 text-paper">
              <i className="ri-award-line mb-3 text-4xl text-crust" />
              <p className="font-display text-3xl leading-tight">Travellers’ Choice Tripadvisor</p>
              <p className="mt-2 text-sm text-paper/70">Tra il 10% dei migliori ristoranti al mondo.</p>
            </div>
          </motion.div>

          {reviews.map((r, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewport}
              transition={{ duration: 1, ease, delay: 0.08 * (i + 1) }}
              className="flex w-[78vw] shrink-0 select-none flex-col justify-between rounded-[1.75rem] bg-paper p-7 sm:w-[420px]"
            >
              <div>
                <div className="mb-6 flex text-gold">
                  {Array.from({ length: 5 }).map((_, k) => <i key={k} className="ri-star-fill" />)}
                </div>
                <blockquote className="font-display text-2xl font-light leading-snug md:text-[1.7rem]">“{r.text}”</blockquote>
              </div>
              <figcaption className="mt-10 flex items-center gap-3 border-t border-ink/10 pt-5">
                <span className="grid size-11 place-items-center rounded-full bg-ink font-display text-lg text-paper">{r.author[0]}</span>
                <span>
                  <span className="block font-semibold">{r.author}</span>
                  <span className="text-sm text-ink/50">
                    {r.meta} · <i className="ri-google-fill" /> {r.source}
                  </span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
        <p className="mt-6 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-ink/40">
          <i className="ri-drag-move-line text-base" /> Trascina
        </p>
      </div>
    </section>
  )
}
