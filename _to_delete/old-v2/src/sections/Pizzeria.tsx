import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { pizzaSteps } from '../data/pizzeria'
import { photos } from '../lib/images'
import Counter from '../components/ui/Counter'
import ParallaxImage from '../components/ui/ParallaxImage'

export default function Pizzeria() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  // la pizza "gira sulla pala" mentre si legge come nasce
  const rotate = useTransform(scrollYProgress, [0, 1], [-60, 120])
  const scale = useTransform(scrollYProgress, [0, 0.35, 1], [0.85, 1, 1.04])

  return (
    <section id="pizzeria" ref={ref} className="relative overflow-hidden bg-ink text-paper">
      <div className="pointer-events-none absolute inset-0 bg-[url(/noise.svg)] opacity-30 mix-blend-overlay" />
      <div className="relative mx-auto max-w-[1600px] px-6 py-28 md:px-10 md:py-40">
        <div className="grid gap-16 lg:grid-cols-2">
          <div className="relative lg:order-2">
            <div className="lg:sticky lg:top-24">
              <motion.div
                style={{ rotate, scale }}
                className="relative mx-auto aspect-square w-full max-w-[560px] overflow-hidden rounded-full shadow-[0_40px_90px_-30px_rgba(224,169,109,0.45)]"
              >
                <img src={photos.pizzaTop} alt="Pizza napoletana di Gino e Pina" className="h-full w-full scale-[1.45] object-cover" />
              </motion.div>

              {/* i numeri vivono dentro una frase, non in una griglia di "stat" */}
              <p className="mx-auto mt-10 max-w-[560px] font-display text-2xl font-light leading-snug text-paper/85 md:text-3xl">
                Circa <span className="font-normal tabular-nums text-crust"><Counter to={50} />&nbsp;ore</span> di lievitazione naturale, farine{' '}
                <span className="font-normal tabular-nums text-crust"><Counter to={100} />%</span> grano italiano macinate a pietra e{' '}
                <span className="font-normal text-crust">tre generazioni</span> di pizzaioli al forno.
              </p>
            </div>
          </div>

          <div>
            <h2 className="mb-14 font-display text-5xl font-light leading-[0.95] tracking-tight md:text-7xl">
              La vera pizza napoletana, la sera, <em className="text-crust">nel forno a legna.</em>
            </h2>
            <ol>
              {pizzaSteps.map((s) => (
                <li key={s.title} className="group border-t border-paper/15 py-8">
                  <h3 className="mb-3 font-display text-3xl">{s.title}</h3>
                  <p className="max-w-[62ch] leading-relaxed text-paper/75">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-24 grid gap-4 md:grid-cols-[2fr_1fr]">
          <ParallaxImage src={photos.threeGenerations} alt="Tre generazioni di pizzaioli" className="aspect-[16/8] rounded-[1.75rem]" imgClassName="grayscale" />
          <figure className="flex flex-col justify-between gap-8 rounded-[1.75rem] bg-tomato p-8">
            <i className="ri-double-quotes-l text-5xl text-paper/60" aria-hidden />
            <blockquote className="font-display text-3xl leading-tight">
              Dagli straccetti di pizza fritta agli <em>angioletti con Nutella</em>: ti sorprenderemo ogni volta.
            </blockquote>
            <figcaption className="text-sm text-paper">Pizzaioli da generazioni</figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
