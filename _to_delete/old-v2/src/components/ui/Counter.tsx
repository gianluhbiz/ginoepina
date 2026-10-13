import { animate, motion, useInView, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface Props {
  to: number
  from?: number
  duration?: number
  className?: string
}

export default function Counter({ to, from = 0, duration = 2, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const mv = useMotionValue(from)
  const rounded = useTransform(mv, (v) => Math.round(v).toString())

  useEffect(() => {
    if (!inView) return
    const controls = animate(mv, to, { duration, ease: [0.22, 1, 0.36, 1] })
    return () => controls.stop()
  }, [inView, mv, to, duration])

  return (
    <motion.span ref={ref} className={className}>
      {rounded}
    </motion.span>
  )
}
