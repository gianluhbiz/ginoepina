import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import { useRef, useState, type PointerEvent } from 'react'
import { services } from '../data/services'
import { perks } from '../data/site'
import { ease, softSpring } from '../lib/motion'

/** Lista servizi: in hover la foto del servizio segue il cursore (molla, non 1:1) */
export default function Services() {
  const list = useRef<HTMLUListElement>(null)
  const [hover, setHover] = useState<number | null>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, softSpring)
  const sy = useSpring(y, softSpring)

  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return
    const r = list.current?.getBoundingClientRect()
    if (!r) return
    x.set(e.clientX - r.left)
    y.set(e.clientY - r.top)
  }

  return (
    <section id="servizi" className="relative bg-paper px-4 py-28 text-ink md:px-10 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-16 grid gap-8 lg:grid-cols-2 lg:items-end">
          <h2 className="font-display text-5xl font-light leading-[0.95] tracking-tight md:text-7xl">
            Far star bene a tavola. <em className="text-tomato">Anche fuori dal ristorante.</em>
          </h2>
          <ul className="flex flex-wrap gap-2 lg:justify-end" aria-label="Comodità">
            {perks.map((p) => (
              <li key={p.label} className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-paper-2/60 px-4 py-2 text-sm">
                <i className={`${p.icon} text-tomato`} aria-hidden /> {p.label}
              </li>
            ))}
          </ul>
        </div>

        <ul ref={list} onPointerMove={onMove} onPointerLeave={() => setHover(null)} className="relative border-b border-ink/15">
          {services.map((s, i) => (
            <li
              key={s.title}
              onPointerEnter={(e) => e.pointerType === 'mouse' && setHover(i)}
              className="group relative grid grid-cols-[auto_1fr] items-center gap-4 border-t border-ink/15 py-6 md:grid-cols-[4rem_1fr_1fr_auto] md:gap-8 md:py-8"
            >
              <span className="grid size-12 place-items-center rounded-full bg-ink/5 text-xl transition-colors duration-200 group-hover:bg-tomato group-hover:text-paper">
                <i className={s.icon} aria-hidden />
              </span>
              <h3 className="pr-20 font-display text-3xl transition-transform duration-300 ease-(--ease-out) group-hover:translate-x-3 md:pr-0 md:text-5xl">
                {s.title}
              </h3>
              <p className="col-span-2 text-ink/75 md:col-span-1">{s.text}</p>
              <img src={s.image} alt="" loading="lazy" className="absolute right-0 top-6 size-16 rounded-xl object-cover md:hidden" />
              <i className="ri-arrow-right-up-line hidden text-2xl opacity-0 transition-[opacity,transform] duration-200 ease-out group-hover:rotate-45 group-hover:opacity-100 md:block" aria-hidden />
            </li>
          ))}

          <motion.div style={{ x: sx, y: sy }} className="pointer-events-none absolute left-0 top-0 z-10 hidden md:block" aria-hidden>
            <AnimatePresence>
              {hover !== null && (
                <motion.div
                  key="cursor-img"
                  initial={{ opacity: 0, scale: 0.92, rotate: -8 }}
                  animate={{ opacity: 1, scale: 1, rotate: -4, transition: { duration: 0.3, ease } }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
                  className="relative -ml-36 -mt-44 h-72 w-60 overflow-hidden rounded-2xl shadow-[0_30px_60px_-20px_rgba(23,18,14,0.5)]"
                >
                  <AnimatePresence initial={false}>
                    <motion.img
                      key={services[hover].image}
                      src={services[hover].image}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover"
                      initial={{ clipPath: 'inset(100% 0 0 0)' }}
                      animate={{ clipPath: 'inset(0% 0 0 0)' }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35, ease }}
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
