import { useInView } from 'framer-motion'
import { useRef } from 'react'

/**
 * I loop decorativi (marquee, badge rotante) si fermano quando escono dallo schermo.
 * Ritorna un ref e la classe Tailwind da applicare agli elementi animati.
 */
export function usePauseOffscreen<T extends Element>() {
  const ref = useRef<T>(null)
  const inView = useInView(ref, { margin: '100px 0px' })
  return { ref, playState: inView ? '[animation-play-state:running]' : '[animation-play-state:paused]' }
}
