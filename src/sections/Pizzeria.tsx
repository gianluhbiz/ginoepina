import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { pizzaFacts, pizzaSteps } from '../data/pizzeria'
import { photos } from '../lib/images'
import { ease, viewport } from '../lib/motion'
import Counter from '../components/ui/Counter'
import SectionLabel from '../components/ui/SectionLabel'
import RevealText from '../components/ui/RevealText'
import ParallaxImage from '../components/ui/ParallaxImage'

export default function Pizzeria() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const rotate = useTransform(scrollYProgress, [0, 1], [-60, 120])
  const scale = useTransform(scrollYProgress, [0, 0.35, 1], [0.7, 1, 1.05])

  return (
    <section id="pizzeria" ref={ref} className="relative overflow-hidden bg-ink text-paper">
      <div className="pointer-events-none absolute inset-0 bg-[url(/noise.svg)] opacity-30 mix-blend-overlay" />
      <div className="relative mx-auto max-w-[1600px] px-6 py-28 md:px-10 md:py-40">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* colonna immagine: pizza che ruota con lo scroll, bloccata */}
          <div className="relative lg:order-2">
            <div className="lg:sticky lg:top-24">
              <motion.div style={{ rotate, scale }} className="relative mx-auto aspect-square w-full max-w-[560px] overflow-hidden rounded-full shadow-[0_40px_120px_-20px_rgba(224,169,109,0.35)]">
                <img src={photos.pizzaTop} alt="Pizza napoletana Gino e Pina" className="h-full w-full scale-[1.45] object-cover" />
              </motion.div>
              <div className="mt-10 grid grid-cols-3 gap-4 border-t border-paper/15 pt-8">
                {pizzaFacts.map((f) => (
                  <div key={f.label}>
                    <p className="font-display text-5xl font-light text-crust md:text-6xl">
                      <Counter to={f.value} />
                      {f.suffix}
                    </p>
                    <p className="mt-1 text-xs leading-snug text-paper/60">{f.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* colonna testi */}
          <div>
            <SectionLabel className="mb-8 text-crust">Pizzeria · forno a legna</SectionLabel>
            <RevealText
              as="h2"
              text="La vera pizza napoletana, la sera, nel forno a legna."
              className="mb-14 font-display text-5xl font-light leading-[0.95] tracking-tight md:text-7xl"
            />
            <ol className="space-y-px">
              {pizzaSteps.map((s, i) => (
                <motion.li
                  key={s.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewport}
                  transition={{ duration: 0.9, ease, delay: i * 0.05 }}
                  className="group grid grid-cols-[3rem_1fr] gap-4 border-t border-paper/15 py-8"
                >
                  <span className="font-display text-xl italic text-tomato">0{i + 1}</span>
                  <div>
                    <h3 className="mb-3 font-display text-3xl transition-transform duration-500 group-hover:translate-x-2">{s.title}</h3>
                    <p className="max-w-lg leading-relaxed text-paper/65">{s.text}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-24 grid gap-4 md:grid-cols-[2fr_1fr]">
          <ParallaxImage src={photos.threeGenerations} alt="Tre generazioni di pizzaioli" className="aspect-[16/8] rounded-[1.75rem]" imgClassName="grayscale" />
          <div className="flex flex-col justify-between rounded-[1.75rem] bg-tomato p-8">
            <i className="ri-double-quotes-l text-5xl text-paper/50" />
            <p className="font-display text-3xl leading-tight">
              Dagli straccetti di pizza fritta agli <em>angioletti con Nutella</em>: ti sorprenderemo ogni volta.
            </p>
            <p className="text-xs uppercase tracking-[0.3em] text-paper/70">Pizzaioli da generazioni</p>
          </div>
        </div>
      </div>
    </section>
  )
}
