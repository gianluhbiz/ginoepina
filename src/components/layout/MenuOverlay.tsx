import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { navLinks } from '../../data/navigation'
import { site } from '../../data/site'
import { useLockBody } from '../../hooks/useLockBody'
import { ease, easeInOut } from '../../lib/motion'
import { cn } from '../../lib/cn'

export default function MenuOverlay({ onClose }: { onClose: () => void }) {
  const [hover, setHover] = useState(0)
  useLockBody(true)

  return (
    <motion.nav
      className="fixed inset-0 z-40 overflow-y-auto bg-ink text-paper"
      initial={{ clipPath: 'circle(0% at 96% 5%)' }}
      animate={{ clipPath: 'circle(150% at 96% 5%)', transition: { duration: 1, ease: easeInOut } }}
      exit={{ clipPath: 'circle(0% at 96% 5%)', transition: { duration: 0.8, ease: easeInOut, delay: 0.15 } }}
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
                initial={{ y: '100%' }}
                animate={{ y: 0, transition: { delay: 0.35 + i * 0.06, duration: 0.9, ease } }}
                exit={{ y: '100%', transition: { duration: 0.4, ease } }}
                className={cn(
                  'group flex items-baseline gap-5 py-2 font-display text-[11vw] font-light leading-[1.05] tracking-tight transition-all duration-500 sm:text-6xl lg:text-7xl',
                  hover === i ? 'text-paper' : 'text-paper/35',
                )}
              >
                <span className="font-sans text-xs tracking-widest text-tomato">0{i + 1}</span>
                <span className="transition-transform duration-500 group-hover:translate-x-3 group-hover:italic">{l.label}</span>
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
                initial={{ clipPath: 'inset(0 0 100% 0)', scale: 1.2 }}
                animate={{ clipPath: 'inset(0 0 0% 0)', scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease }}
              />
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.7 } }}
            exit={{ opacity: 0 }}
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
