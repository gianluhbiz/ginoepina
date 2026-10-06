import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { marqueeBottom, marqueeTop } from '../data/dishes'
import { ingredients } from '../data/pizzeria'
import Marquee from '../components/ui/Marquee'

function Photo({ src, i }: { src: string; i: number }) {
  return (
    <div className={`mx-2 shrink-0 overflow-hidden rounded-2xl md:mx-3 ${i % 3 === 0 ? 'h-56 w-44 md:h-80 md:w-64' : 'h-56 w-56 md:h-80 md:w-80'}`}>
      <img src={src} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 hover:scale-110" />
    </div>
  )
}

/** Due nastri di foto che scorrono in direzioni opposte, inclinati con lo scroll */
export default function DishMarquee() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const rotate = useTransform(scrollYProgress, [0, 1], [-6, 3])
  const rotate2 = useTransform(scrollYProgress, [0, 1], [4, -3])

  return (
    <section ref={ref} className="relative overflow-hidden bg-paper py-16 md:py-24">
      <motion.div style={{ rotate }} className="-mx-10">
        <Marquee duration={55}>{marqueeTop.map((src, i) => <Photo key={src} src={src} i={i} />)}</Marquee>
      </motion.div>

      <div className="relative z-10 -my-4 -rotate-2 bg-tomato py-5 text-paper shadow-xl md:-my-6">
        <Marquee duration={30} reverse>
          {ingredients.map((t) => (
            <span key={t} className="flex items-center gap-6 px-6 font-display text-3xl italic md:text-5xl">
              {t} <i className="ri-asterisk text-2xl text-crust not-italic" />
            </span>
          ))}
        </Marquee>
      </div>

      <motion.div style={{ rotate: rotate2 }} className="-mx-10">
        <Marquee duration={60} reverse>{marqueeBottom.map((src, i) => <Photo key={src} src={src} i={i + 1} />)}</Marquee>
      </motion.div>
    </section>
  )
}
