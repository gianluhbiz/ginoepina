import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef } from 'react'
import { dishPhoto, photos } from '../lib/images'
import SectionLabel from '../components/ui/SectionLabel'
import ParallaxImage from '../components/ui/ParallaxImage'

const text =
  'Freschezza e qualità delle materie prime: stagionali, a km zero e presidio Slow Food, comprate ogni giorno al vicino mercatino, dove si incontrano ancora i contadini che vendono i prodotti genuini delle nostre terre sannite.'

function ScrollWord({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.12, 1])
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {word}
    </motion.span>
  )
}

/** Testo che si "accende" parola per parola mentre si scorre */
export default function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] })
  const words = text.split(' ')

  return (
    <section className="relative overflow-hidden bg-paper px-6 py-28 text-ink md:px-10 md:py-40">
      <div className="mx-auto grid max-w-[1600px] gap-16 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <SectionLabel className="mb-10 text-tomato">Il nostro mestiere è antico</SectionLabel>
          <p ref={ref} className="font-display text-3xl font-light leading-[1.15] tracking-tight md:text-5xl lg:text-6xl">
            {words.map((w, i) => (
              <ScrollWord key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
            ))}
          </p>
        </div>
        <div className="relative hidden min-h-[620px] lg:col-span-4 lg:block">
          <ParallaxImage src={photos.antipastiCollage} alt="Antipasti della casa" strength={18} className="absolute right-0 top-0 aspect-[3/4] w-[78%] rounded-t-full" />
          <ParallaxImage src={dishPhoto(14)} alt="Burrata e pomodorini" strength={25} className="absolute bottom-0 left-0 aspect-square w-[52%] rounded-full border-8 border-paper" />
        </div>
      </div>
    </section>
  )
}
