import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { site } from '../data/site'
import { platforms } from '../data/reviews'
import { photos } from '../lib/images'
import { ease } from '../lib/motion'
import ArrowLink from '../components/ui/ArrowLink'

/** Parola del titolo che sale da sotto la linea */
function Word({ children, delay, className = '' }: { children: ReactNode; delay: number; className?: string }) {
  return (
    <span className="inline-block overflow-hidden pb-[0.06em] align-bottom">
      <motion.span
        className={`inline-block ${className}`}
        variants={{ hidden: { y: '105%' }, show: { y: 0, transition: { duration: 1.2, ease, delay } } }}
      >
        {children}
      </motion.span>
    </span>
  )
}

/** Immagine a pillola dentro al titolo: si "apre" orizzontalmente */
function Pill({ src, delay, className = '' }: { src: string; delay: number; className?: string }) {
  return (
    <motion.span
      className={`relative mx-[0.08em] inline-block h-[0.72em] overflow-hidden rounded-full align-middle ${className}`}
      variants={{
        hidden: { clipPath: 'inset(0% 50% 0% 50% round 999px)' },
        show: { clipPath: 'inset(0% 0% 0% 0% round 999px)', transition: { duration: 1.3, ease, delay } },
      }}
    >
      <motion.img
        src={src}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        variants={{ hidden: { scale: 1.6 }, show: { scale: 1, transition: { duration: 1.8, ease, delay } } }}
      />
    </motion.span>
  )
}

function RotatingBadge() {
  const text = 'Pizzeria · Forno a legna · Cucina sannita · Enoteca · '
  return (
    <motion.div
      className="relative grid size-32 place-items-center md:size-40"
      animate={{ rotate: 360 }}
      transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
    >
      <svg viewBox="0 0 200 200" className="absolute inset-0 size-full">
        <defs>
          <path id="circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text className="fill-ink text-[15px] font-semibold uppercase tracking-[0.2em]">
          <textPath href="#circle">{text}</textPath>
        </text>
      </svg>
      <span className="grid size-14 place-items-center rounded-full bg-tomato text-2xl text-paper md:size-16">
        <i className="ri-fire-line" />
      </span>
    </motion.div>
  )
}

export default function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const google = platforms[0]

  return (
    <section id="top" ref={ref} className="relative overflow-hidden bg-paper px-4 pb-10 pt-28 text-ink md:px-8 md:pt-32">
      <motion.div initial="hidden" animate={ready ? 'show' : 'hidden'} className="mx-auto max-w-[1600px]">
        <motion.div
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay: 0.2, duration: 1 } } }}
          className="mb-6 flex flex-wrap items-center justify-between gap-2 border-b border-ink/15 pb-4 text-[11px] font-medium uppercase tracking-[0.28em] text-ink/60"
        >
          <span>Ristorante · Pizzeria · Enoteca · Caffetteria</span>
          <span className="hidden md:inline">
            <i className="ri-map-pin-2-line mr-1" />
            {site.address.street} — Benevento
          </span>
        </motion.div>

        <motion.h1
          style={{ y: titleY }}
          aria-label="Gino e Pina, dal 1940"
          className="font-display text-[19vw] font-medium leading-[0.86] tracking-[-0.04em] md:text-[12.5vw]"
        >
          <span className="block whitespace-nowrap">
            <Word delay={0.1}>Gino</Word>
            <Pill src={photos.pizzaBanner} delay={0.45} className="w-[0.9em] md:w-[2.4em]" />
          </span>
          <span className="block whitespace-nowrap md:pl-[1.4em]">
            <Word delay={0.2} className="font-light italic text-tomato">e</Word>{' '}
            <Word delay={0.28}>Pina</Word>
            <motion.span
              className="relative ml-[0.15em] hidden size-[0.72em] overflow-hidden rounded-full align-middle md:inline-block"
              variants={{ hidden: { scale: 0, rotate: -90 }, show: { scale: 1, rotate: 0, transition: { duration: 1.4, ease, delay: 0.6 } } }}
            >
              <motion.img
                src={photos.pizzaTop}
                alt=""
                className="h-full w-full object-cover"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              />
            </motion.span>
          </span>
          <span className="block whitespace-nowrap text-right">
            <Pill src={photos.orecchiette} delay={0.55} className="w-[0.9em] md:w-[2.2em]" />
            <Word delay={0.36} className="font-light italic">dal</Word>{' '}
            <Word delay={0.44}>1940</Word>
          </span>
        </motion.h1>

        <motion.div style={{ opacity: fade }} className="mt-10 grid items-end gap-8 md:mt-14 md:grid-cols-12">
          <motion.p
            variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { delay: 0.8, duration: 1, ease } } }}
            className="max-w-md text-lg leading-relaxed text-ink/75 md:col-span-5"
          >
            {site.intro} <span className="font-display italic text-ink">{site.claim}.</span>
          </motion.p>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { delay: 0.95, duration: 1, ease } } }}
            className="flex flex-wrap gap-3 md:col-span-4"
          >
            <ArrowLink href={site.phone.href} variant="tomato" icon="ri-phone-line">Prenota un tavolo</ArrowLink>
            <ArrowLink href="#cucina" variant="outline" icon="ri-arrow-down-line">Il menu</ArrowLink>
          </motion.div>

          <motion.div
            variants={{ hidden: { opacity: 0, scale: 0.6 }, show: { opacity: 1, scale: 1, transition: { delay: 1.1, duration: 1, ease } } }}
            className="flex items-center justify-between gap-6 md:col-span-3 md:justify-end"
          >
            <a href={google.href} target="_blank" rel="noreferrer" className="group">
              <div className="flex items-baseline gap-2">
                <span className="font-display text-5xl font-light">{google.rating}</span>
                <span className="flex text-gold">
                  {Array.from({ length: 4 }).map((_, i) => <i key={i} className="ri-star-fill" />)}
                  <i className="ri-star-line" />
                </span>
              </div>
              <p className="text-xs uppercase tracking-[0.2em] text-ink/50 group-hover:text-ink">{google.count} Google</p>
            </a>
            <RotatingBadge />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
