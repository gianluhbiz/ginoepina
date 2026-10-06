import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '../../lib/cn'

interface Props {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  /** intensità del parallasse in % */
  strength?: number
}

export default function ParallaxImage({ src, alt, className, imgClassName, strength = 12 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`])

  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        style={{ y }}
        className={cn('absolute inset-0 h-full w-full scale-[1.3] object-cover', imgClassName)}
      />
    </div>
  )
}
