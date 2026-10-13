import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { spaces } from '../data/spaces'
import { ease, easeInOut } from '../lib/motion'
import { cn } from '../lib/cn'

/** Pannelli a fisarmonica: quello attivo si allarga, gli altri diventano strisce */
export default function Spaces() {
  const [active, setActive] = useState(0)

  return (
    <section id="ambienti" className="bg-paper-2 px-4 py-28 text-ink md:px-10 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-8">
          <h2 className="max-w-3xl font-display text-5xl font-light leading-[0.95] tracking-tight md:text-7xl">
            Quattro sale di legno, <em className="text-tomato">profumi e tradizione.</em>
          </h2>
          <p className="max-w-xs text-ink/75">Quattro spazi per ogni occasione, dal pranzo veloce alla cena sotto le stelle.</p>
        </div>

        <div className="flex h-auto flex-col gap-3 md:h-[78vh] md:flex-row">
          {spaces.map((s, i) => {
            const isActive = active === i
            return (
              <motion.button
                key={s.id}
                layout
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-expanded={isActive}
                transition={{ duration: 0.6, ease: easeInOut }}
                className={cn(
                  'group relative overflow-hidden rounded-[1.75rem] text-left md:h-full',
                  isActive ? 'h-[60vh] md:flex-[5]' : 'h-[16vh] md:flex-[1]',
                )}
              >
                <motion.img
                  src={s.image}
                  alt={s.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                  animate={{ scale: isActive ? 1 : 1.25 }}
                  transition={{ duration: 0.8, ease: easeInOut }}
                />
                <div className={cn('absolute inset-0 transition-colors duration-500', isActive ? 'bg-gradient-to-t from-ink/85 via-ink/10 to-transparent' : 'bg-ink/45')} />

                {/* etichetta verticale quando chiuso (solo desktop) */}
                <span
                  className={cn(
                    'absolute bottom-8 left-1/2 hidden -translate-x-1/2 whitespace-nowrap font-display text-3xl text-paper transition-opacity duration-200 [writing-mode:vertical-rl] md:block',
                    isActive ? 'opacity-0' : 'rotate-180 opacity-100',
                  )}
                >
                  {s.name}
                </span>
                <span className="absolute left-5 top-5 grid size-11 place-items-center rounded-full bg-paper/90 text-lg text-ink">
                  <i className={s.icon} aria-hidden />
                </span>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)', transition: { delay: 0.25, duration: 0.5, ease } }}
                      exit={{ opacity: 0, transition: { duration: 0.12 } }}
                      className="absolute inset-x-0 bottom-0 p-6 text-paper md:p-10"
                    >
                      <h3 className="font-display text-4xl md:text-6xl">{s.name}</h3>
                      <p className="mb-3 font-display text-xl italic text-crust">{s.kicker}</p>
                      <p className="max-w-lg text-paper/85">{s.text}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
                {!isActive && (
                  <div className="absolute inset-x-0 bottom-0 p-6 text-paper md:hidden">
                    <h3 className="font-display text-3xl">{s.name}</h3>
                  </div>
                )}
              </motion.button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
