import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useLayoutEffect, useRef, useState } from 'react'
import { story } from '../data/story'
import SectionLabel from '../components/ui/SectionLabel'
import RevealText from '../components/ui/RevealText'

/** Scroll orizzontale "bloccato": lo scroll verticale fa scorrere i capitoli */
export default function Story() {
  const section = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)

  useLayoutEffect(() => {
    const measure = () => {
      if (!track.current) return
      setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth))
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (track.current) ro.observe(track.current)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 25, mass: 0.4 })
  const x = useTransform(smooth, [0, 1], [0, -distance])
  const bar = useTransform(smooth, [0, 1], ['0%', '100%'])

  return (
    <section id="storia" ref={section} className="relative bg-paper-2 text-ink" style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <div className="mx-auto flex w-full max-w-[1600px] items-end justify-between px-6 pt-28 md:px-10">
          <div>
            <SectionLabel index="02" className="mb-4 text-tomato">La storia</SectionLabel>
            <RevealText text="Quasi un secolo a tavola" className="font-display text-4xl font-light tracking-tight md:text-6xl" />
          </div>
          <div className="mb-3 hidden w-48 md:block">
            <div className="h-px w-full bg-ink/15">
              <motion.div style={{ width: bar }} className="h-px bg-tomato" />
            </div>
            <p className="mt-2 text-right text-[10px] uppercase tracking-[0.3em] text-ink/50">Scorri</p>
          </div>
        </div>

        <motion.div ref={track} style={{ x }} className="flex flex-1 items-center gap-6 px-6 md:gap-10 md:px-10">
          {story.map((c, i) => (
            <article
              key={c.title}
              className={`group relative flex h-[62vh] w-[82vw] shrink-0 flex-col justify-end overflow-hidden rounded-[1.75rem] md:w-[46vw] lg:w-[38vw] ${i % 2 ? 'md:mt-16' : 'md:-mt-10'}`}
            >
              <img src={c.image} alt={c.caption} loading="lazy" className="absolute inset-0 h-full w-full object-cover grayscale-[35%] transition-all duration-[1.2s] group-hover:scale-105 group-hover:grayscale-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
              <span className="absolute right-5 top-4 font-display text-7xl font-light italic text-paper/90 md:text-8xl">{c.year}</span>
              <div className="relative p-6 text-paper md:p-8">
                <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-paper/60">{c.caption}</p>
                <h3 className="mb-3 font-display text-3xl leading-tight md:text-4xl">{c.title}</h3>
                <p className="max-w-md text-sm leading-relaxed text-paper/80 md:text-base">{c.text}</p>
              </div>
            </article>
          ))}
          <div className="flex w-[70vw] shrink-0 flex-col justify-center pr-10 md:w-[30vw]">
            <p className="font-display text-4xl font-light italic leading-tight md:text-5xl">
              “È da Gino e Pina che l’arte e la cultura incontrano i veri sapori del Sannio.”
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
