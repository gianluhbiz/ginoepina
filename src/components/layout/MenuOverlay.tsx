import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState, type RefObject } from 'react'
import { navLinks } from '../../data/navigation'
import { site } from '../../data/site'
import { useLockBody } from '../../hooks/useLockBody'
import { ease } from '../../lib/motion'
import { cn } from '../../lib/cn'

/** Raggio del bottone menu (size-12): il cerchio nasce dal bottone, non dal nulla. */
const START_RADIUS = 24

/** Centro del bottone e raggio che copre esattamente l'angolo più lontano dello schermo. */
function measure(anchor: HTMLElement | null) {
  const w = window.innerWidth
  const h = window.innerHeight
  const rect = anchor?.getBoundingClientRect()
  const x = rect ? rect.left + rect.width / 2 : w - 40
  const y = rect ? rect.top + rect.height / 2 : 40
  return { x, y, r: Math.ceil(Math.hypot(Math.max(x, w - x), Math.max(y, h - y))) }
}

export default function MenuOverlay({ onClose, anchor }: { onClose: () => void; anchor: RefObject<HTMLElement | null> }) {
  const [hover, setHover] = useState(0)
  const [origin, setOrigin] = useState(() => measure(anchor.current))
  const reduce = useReducedMotion()
  useLockBody(true)

  useEffect(() => {
    const onResize = () => setOrigin(measure(anchor.current))
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('resize', onResize)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('keydown', onKey)
    }
  }, [anchor, onClose])

  const circle = (r: number) => `circle(${r}px at ${origin.x}px ${origin.y}px)`

  return (
    <motion.nav
      className="fixed inset-0 z-40 overflow-y-auto bg-ink text-paper"
      initial={reduce ? { opacity: 0 } : { clipPath: circle(START_RADIUS) }}
      animate={
        reduce
          ? { opacity: 1, transition: { duration: 0.2 } }
          : { clipPath: circle(origin.r), transition: { duration: 0.6, ease } }
      }
      exit={
        reduce
          ? { opacity: 0, transition: { duration: 0.15 } }
          : { clipPath: circle(START_RADIUS), transition: { duration: 0.4, ease } }
      }
    >
      <div className="pointer-events-none absolute inset-0 bg-[url(/noise.svg)] opacity-20 mix-blend-overlay" />
      <div className="mx-auto grid min-h-full max-w-[1600px] gap-10 px-6 pb-10 pt-32 md:px-10 lg:grid-cols-[1.3fr_1fr]">
        <ul className="flex flex-col justify-center">
          {navLinks.map((l, i) => (
            <li key={l.href} className="overflow-hidden border-b border-paper/10">
              <motion.a
                href={l.href}
                onClick={onClose}
                onMouseEnter={() => setHover(i)}
                initial={reduce ? { opacity: 0 } : { transform: 'translateY(100%)' }}
                animate={
                  reduce
                    ? { opacity: 1, transition: { duration: 0.2 } }
                    : { transform: 'translateY(0%)', transition: { delay: 0.12 + i * 0.04, duration: 0.7, ease } }
                }
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                className={cn(
                  'group block py-2 font-display text-[11vw] font-light leading-[1.05] tracking-tight transition-colors duration-300 sm:text-6xl lg:text-7xl',
                  hover === i ? 'text-paper' : 'text-paper/35',
                )}
              >
                <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] [@media(hover:hover)]:group-hover:translate-x-3 [@media(hover:hover)]:group-hover:italic">
                  {l.label}
                </span>
              </motion.a>
            </li>
          ))}
        </ul>

        <div className="flex flex-col justify-between gap-8">
          <div className="relative hidden aspect-[4/5] overflow-hidden rounded-[2rem] lg:block">
            <AnimatePresence mode="popLayout">
              <motion.img
                key={navLinks[hover].image}
                src={navLinks[hover].image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ clipPath: 'inset(0 0 100% 0)', transform: 'scale(1.2)' }}
                animate={{ clipPath: 'inset(0 0 0% 0)', transform: 'scale(1)' }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease }}
              />
            </AnimatePresence>
          </div>

          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, transform: 'translateY(16px)' }}
            animate={{ opacity: 1, transform: 'translateY(0px)', transition: { delay: 0.35, duration: 0.6, ease } }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className="grid gap-6 text-sm sm:grid-cols-2"
          >
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.3em] text-paper/40">Dove</p>
              <p>{site.address.street}</p>
              <p>{site.address.city}</p>
            </div>
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.3em] text-paper/40">Prenota</p>
              <a className="block hover:text-tomato" href={site.phone.href}>{site.phone.display}</a>
              <a className="block hover:text-tomato" href={site.mobile.href}>{site.mobile.display}</a>
            </div>
            <div className="flex gap-3 sm:col-span-2">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="grid size-12 place-items-center rounded-full border border-paper/20 text-xl transition-colors hover:bg-paper hover:text-ink"
                >
                  <i className={s.icon} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  )
}
