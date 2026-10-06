import { motion } from 'framer-motion'
import { ease } from '../../lib/motion'
import { cn } from '../../lib/cn'

interface Props {
  text: string
  className?: string
  wordClassName?: string
  delay?: number
  stagger?: number
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  /** se true, anima subito invece che all'ingresso in viewport */
  immediate?: boolean
}

/** Titolo che entra parola per parola, "da sotto la linea" */
export default function RevealText({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.06,
  as = 'h2',
  immediate = false,
}: Props) {
  const Tag = motion[as]
  const words = text.split(' ')
  const trigger = immediate ? { animate: 'show' } : { whileInView: 'show', viewport: { once: true, margin: '-10% 0px' } }

  return (
    <Tag
      className={cn('flex flex-wrap', className)}
      initial="hidden"
      {...trigger}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] pr-[0.25em]">
          <motion.span
            className={cn('inline-block will-change-transform', wordClassName)}
            variants={{
              hidden: { y: '110%', rotate: 4 },
              show: { y: '0%', rotate: 0, transition: { duration: 1, ease } },
            }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
