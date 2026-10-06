import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { site } from '../../data/site'
import { navLinks } from '../../data/navigation'
import { ease } from '../../lib/motion'

export default function Footer() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-40%', '0%'])
  const letters = 'GINOEPINA'.split('')

  return (
    <footer ref={ref} className="relative overflow-hidden bg-ink text-paper">
      <div className="pointer-events-none absolute inset-0 bg-[url(/noise.svg)] opacity-25 mix-blend-overlay" />
      <motion.div style={{ y }} className="relative mx-auto max-w-[1600px] px-6 pt-24 md:px-10">
        <div className="grid gap-12 border-b border-paper/15 pb-16 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="max-w-md font-display text-3xl font-light leading-tight md:text-4xl">
              “Se vi perdete basterà chiedere a qualunque passante. <em className="text-crust">Noi intanto vi aspettiamo.</em>”
            </p>
            <p className="mt-6 max-w-md text-sm text-paper/50">
              Dal 1994 Gino e Pina ospita i finalisti del Premio Strega, la sera prima della premiazione a Roma.
            </p>
          </div>
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-paper/40">Esplora</p>
            <ul className="space-y-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="group inline-flex items-center gap-2 text-paper/80 hover:text-paper">
                    <span className="h-px w-0 bg-tomato transition-all duration-500 group-hover:w-5" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-paper/40">Contatti</p>
            <ul className="space-y-2 text-paper/80">
              <li>{site.address.street}</li>
              <li>{site.address.city}</li>
              <li><a className="hover:text-tomato" href={site.phone.href}>{site.phone.display}</a></li>
              <li><a className="hover:text-tomato" href={site.mobile.href}>{site.mobile.display}</a></li>
              <li><a className="hover:text-tomato" href={`mailto:${site.email}`}>{site.email}</a></li>
            </ul>
            <div className="mt-6 flex gap-2">
              {site.socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="grid size-10 place-items-center rounded-full border border-paper/20 transition-colors hover:bg-paper hover:text-ink">
                  <i className={s.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex select-none justify-between overflow-hidden py-6 font-display text-[14.5vw] font-semibold leading-[0.85] tracking-tighter text-paper">
          {letters.map((l, i) => (
            <motion.span
              key={i}
              initial={{ y: '100%', opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 1, ease }}
              className={i === 4 ? 'italic font-light text-tomato' : ''}
            >
              {l}
            </motion.span>
          ))}
        </div>

        <div className="flex flex-col justify-between gap-2 border-t border-paper/15 py-6 text-xs text-paper/40 md:flex-row">
          <span>© {new Date().getFullYear()} {site.fullName} — Benevento</span>
          <a href="#top" className="inline-flex items-center gap-1 hover:text-paper">
            Torna su <i className="ri-arrow-up-line" />
          </a>
        </div>
      </motion.div>
    </footer>
  )
}
