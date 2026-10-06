import type { Variants } from 'framer-motion'

/** Curva "expo-out": morbida in uscita, usata ovunque per coerenza */
export const ease = [0.22, 1, 0.36, 1] as const
export const easeInOut = [0.76, 0, 0.24, 1] as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease, delay: i * 0.08 },
  }),
}

export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
})

export const viewport = { once: true, margin: '-12% 0px' } as const
