import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { useEffect } from 'react'
import { easeInOut, ease } from '../../lib/motion'
import { dishPhoto, photos } from '../../lib/images'
import { site } from '../../data/site'

const flashes = [photos.historic, dishPhoto(12), dishPhoto(6), photos.threeGenerations, dishPhoto(23)]

/** Intro: l'anno scorre dal 1940 a oggi mentre le foto si impilano */
export default function Preloader({ onDone }: { onDone: () => void }) {
  const year = useMotionValue<number>(site.founded)
  const label = useTransform(year, (v) => Math.round(v).toString())
  const now = new Date().getFullYear()

  useEffect(() => {
    const controls = animate(year, now, { duration: 1.5, ease: [0.77, 0, 0.175, 1] })
    const t = window.setTimeout(onDone, 1900)
    return () => {
      controls.stop()
      window.clearTimeout(t)
    }
  }, [year, now, onDone])

  return (
    <motion.div
      aria-hidden
      className="fixed inset-0 z-[100] flex flex-col justify-between overflow-hidden bg-ink p-6 text-paper md:p-10"
      initial={{ transform: 'translateY(0%)' }}
      exit={{ transform: 'translateY(-100%)', transition: { duration: 0.7, ease: easeInOut } }}
    >
      <div className="flex items-start justify-between font-display text-lg italic text-paper/75">
        <span>Benevento</span>
        <span>Ristorante, pizzeria, enoteca</span>
      </div>

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[46vmin] w-[36vmin] -translate-x-1/2 -translate-y-1/2">
        {flashes.map((src, i) => (
          <motion.img
            key={src}
            src={src}
            alt=""
            className="absolute inset-0 h-full w-full rounded-sm object-cover shadow-2xl"
            initial={{ opacity: 1, scale: 1.1, rotate: 0, clipPath: 'inset(100% 0 0 0)' }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: (i % 2 ? 1 : -1) * (i * 2.2),
              clipPath: 'inset(0% 0 0 0)',
            }}
            transition={{ delay: 0.1 + i * 0.22, duration: 0.6, ease }}
          />
        ))}
      </div>

      <div className="relative flex items-end justify-between">
        <motion.span className="font-display text-[22vw] font-light leading-[0.8] tracking-[-0.04em] tabular-nums md:text-[14vw]">{label}</motion.span>
        <span className="mb-3 max-w-40 text-right font-display text-lg italic text-paper/70 md:text-2xl">
          {site.name}
        </span>
      </div>
    </motion.div>
  )
}
