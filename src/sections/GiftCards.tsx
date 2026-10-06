import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { giftCards } from '../data/giftcards'
import { site } from '../data/site'
import type { GiftCard } from '../types'
import { ease } from '../lib/motion'
import { cn } from '../lib/cn'
import SectionLabel from '../components/ui/SectionLabel'
import RevealText from '../components/ui/RevealText'
import ArrowLink from '../components/ui/ArrowLink'

const tones: Record<GiftCard['tone'], string> = {
  gold: 'bg-gradient-to-br from-[#e9c77b] via-gold to-[#8a6424] text-ink',
  silver: 'bg-gradient-to-br from-[#f1f1ee] via-[#bdbdb6] to-[#7f7f78] text-ink',
  paper: 'bg-paper text-ink',
}

/** Biglietto con inclinazione 3D che segue il mouse */
function Ticket({ card, i }: { card: GiftCard; i: number }) {
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rx = useSpring(useTransform(my, [0, 1], [12, -12]), { stiffness: 200, damping: 18 })
  const ry = useSpring(useTransform(mx, [0, 1], [-14, 14]), { stiffness: 200, damping: 18 })
  const glareX = useTransform(mx, [0, 1], ['0%', '100%'])
  const glare = useTransform(glareX, (v) => `radial-gradient(circle at ${v} 30%, rgba(255,255,255,0.55), transparent 55%)`)

  return (
    <motion.div
      initial={{ opacity: 0, y: 80, rotate: (i - 1) * 6 }}
      whileInView={{ opacity: 1, y: 0, rotate: (i - 1) * 3 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 1.1, ease, delay: i * 0.12 }}
      className={cn('[perspective:1200px]', i === 1 && 'md:-translate-y-10')}
    >
      <motion.div
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect()
          mx.set((e.clientX - r.left) / r.width)
          my.set((e.clientY - r.top) / r.height)
        }}
        onPointerLeave={() => {
          mx.set(0.5)
          my.set(0.5)
        }}
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        className={cn('relative flex aspect-[3/4.2] flex-col justify-between overflow-hidden rounded-[1.5rem] p-7 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]', tones[card.tone])}
      >
        <motion.div style={{ background: glare }} className="pointer-events-none absolute inset-0 mix-blend-soft-light" />
        <div className="flex items-start justify-between">
          <span className="font-display text-xl">
            Gino <em className="text-tomato">e</em> Pina
          </span>
          <span className="rounded-full border border-current px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em]">{card.tier}</span>
        </div>

        {/* perforazione del biglietto */}
        <div className="relative -mx-7 flex items-center">
          <span className="-ml-3 size-6 rounded-full bg-ink" />
          <span className="mx-2 h-px flex-1 border-t-2 border-dashed border-current opacity-30" />
          <span className="-mr-3 size-6 rounded-full bg-ink" />
        </div>

        <div style={{ transform: 'translateZ(40px)' }}>
          <p className="mb-1 text-[10px] uppercase tracking-[0.3em] opacity-60">Gift card · cena per due</p>
          <p className="font-display text-7xl font-light leading-none">€{card.price}</p>
          <p className="mt-4 text-sm leading-snug opacity-75">{card.text}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function GiftCards() {
  return (
    <section id="gift" className="relative overflow-hidden bg-ink px-4 py-28 text-paper md:px-10 md:py-40">
      <div className="pointer-events-none absolute inset-0 bg-[url(/noise.svg)] opacity-25 mix-blend-overlay" />
      <div className="relative mx-auto max-w-[1600px]">
        <div className="mb-20 grid gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <SectionLabel index="07" className="mb-8 text-crust">Gift card regalo</SectionLabel>
            <RevealText text="Regala una cena per due." className="font-display text-5xl font-light leading-[0.95] tracking-tight md:text-8xl" />
          </div>
          <div className="lg:justify-self-end">
            <p className="mb-6 max-w-sm text-paper/60">Un’esperienza culinaria indimenticabile da mettere sotto l’albero, in un biglietto d’auguri, o semplicemente da regalare.</p>
            <ArrowLink href={site.whatsapp} external variant="paper" icon="ri-whatsapp-line">Richiedila su WhatsApp</ArrowLink>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
          {giftCards.map((c, i) => (
            <Ticket key={c.tier} card={c} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
