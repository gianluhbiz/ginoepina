import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import { useRef, useState, type PointerEvent } from 'react'
import { services } from '../data/services'
import { perks } from '../data/site'
import { ease, viewport } from '../lib/motion'
import SectionLabel from '../components/ui/SectionLabel'
import RevealText from '../components/ui/RevealText'

/** Lista servizi: in hover un'immagine segue il cursore */
export default function Services() {
  const list = useRef<HTMLUListElement>(null)
  const [hover, setHover] = useState<number | null>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 150, damping: 20, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 150, damping: 20, mass: 0.5 })

  const onMove = (e: PointerEvent) => {
    const r = list.current?.getBoundingClientRect()
    if (!r) return
    x.set(e.clientX - r.left)
    y.set(e.clientY - r.top)
  }

  return (
    <section id="servizi" className="relative bg-paper px-4 py-28 text-ink md:px-10 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-16 grid gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <SectionLabel className="mb-8 text-tomato">Servizi e promo</SectionLabel>
            <RevealText text="Far star bene a tavola. Anche fuori dal ristorante." className="font-display text-5xl font-light leading-[0.95] tracking-tight md:text-7xl" />
          </div>
          <div className="flex flex-wrap gap-2 lg:justify-end">
            {perks.map((p, i) => (
              <motion.span
                key={p.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={viewport}
                transition={{ delay: i * 0.05, duration: 0.6, ease }}
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-paper-2/60 px-4 py-2 text-sm"
              >
                <i className={`${p.icon} text-tomato`} /> {p.label}
              </motion.span>
            ))}
          </div>
        </div>

        <ul ref={list} onPointerMove={onMove} onPointerLeave={() => setHover(null)} className="relative border-b border-ink/15">
          {services.map((s, i) => (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.8, ease, delay: i * 0.04 }}
              onPointerEnter={() => setHover(i)}
              className="group relative grid cursor-default grid-cols-[auto_1fr] items-center gap-4 border-t border-ink/15 py-6 md:grid-cols-[4rem_1fr_1fr_auto] md:gap-8 md:py-8"
            >
              <span className="grid size-12 place-items-center rounded-full bg-ink/5 text-xl transition-colors duration-500 group-hover:bg-tomato group-hover:text-paper">
                <i className={s.icon} />
              </span>
              <h3 className="pr-20 font-display text-3xl transition-transform md:pr-0 duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-4 md:text-5xl">
                {s.title}
              </h3>
              <p className="col-span-2 text-ink/60 md:col-span-1">{s.text}</p>
              <img src={s.image} alt="" loading="lazy" className="hidden size-16 rounded-xl object-cover max-md:block max-md:absolute max-md:right-0 max-md:top-6" />
              <i className="ri-arrow-right-up-line hidden text-2xl opacity-0 transition-all duration-500 group-hover:rotate-45 group-hover:opacity-100 md:block" />
            </motion.li>
          ))}

          {/* immagine che segue il cursore (desktop) */}
          <motion.div style={{ x: sx, y: sy }} className="pointer-events-none absolute left-0 top-0 z-10 hidden md:block">
            <AnimatePresence>
              {hover !== null && (
                <motion.div
                  key="cursor-img"
                  initial={{ opacity: 0, scale: 0.4, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: -4 }}
                  exit={{ opacity: 0, scale: 0.4 }}
                  transition={{ duration: 0.5, ease }}
                  className="relative -ml-36 -mt-44 h-72 w-60 overflow-hidden rounded-2xl shadow-2xl"
                >
                  <AnimatePresence initial={false}>
                    <motion.img
                      key={services[hover].image}
                      src={services[hover].image}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover"
                      initial={{ y: '100%' }}
                      animate={{ y: '0%' }}
                      exit={{ y: '-30%', opacity: 0 }}
                      transition={{ duration: 0.6, ease }}
                    />
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </ul>
      </div>
    </section>
  )
}
