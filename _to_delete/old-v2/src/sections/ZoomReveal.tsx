import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { photos } from '../lib/images'

/** Il piatto parte "nel piatto" (ovale) e si apre a tutto schermo con lo scroll */
export default function ZoomReveal() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const clip = useTransform(scrollYProgress, [0, 0.6], ['inset(18% 22% 18% 22% round 999px)', 'inset(0% 0% 0% 0% round 0px)'])
  const scale = useTransform(scrollYProgress, [0, 0.6], [1.35, 1])
  const textOpacity = useTransform(scrollYProgress, [0.45, 0.7], [0, 1])
  const textY = useTransform(scrollYProgress, [0.45, 0.75], [60, 0])
  const sideX = useTransform(scrollYProgress, [0, 0.5], ['0%', '-60%'])
  const sideX2 = useTransform(scrollYProgress, [0, 0.5], ['0%', '60%'])
  const sideOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])

  return (
    <section ref={ref} className="relative h-[260vh] bg-paper">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <motion.span style={{ x: sideX, opacity: sideOpacity }} aria-hidden className="absolute left-4 z-10 font-display text-[9vw] italic text-ink md:left-10">
          Il gusto
        </motion.span>
        <motion.span style={{ x: sideX2, opacity: sideOpacity }} aria-hidden className="absolute right-4 z-10 font-display text-[9vw] text-ink md:right-10">
          sannita
        </motion.span>

        <motion.div style={{ clipPath: clip }} className="absolute inset-0">
          <motion.img style={{ scale }} src={photos.fettuccine} alt="Fettuccine ai funghi porcini e pecorino" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
        </motion.div>

        <motion.div style={{ opacity: textOpacity, y: textY }} className="absolute inset-x-0 bottom-0 z-10 mx-auto max-w-[1600px] px-6 pb-14 text-paper md:px-10">
          <p className="max-w-4xl font-display text-4xl font-light leading-[1.05] md:text-7xl">
            Un viaggio nella tradizione beneventana, <em className="text-crust">un piatto alla volta.</em>
          </p>
          <p className="mt-4 text-sm text-paper/80">Nella foto: fettuccine ai funghi porcini e pecorino.</p>
        </motion.div>
      </div>
    </section>
  )
}
