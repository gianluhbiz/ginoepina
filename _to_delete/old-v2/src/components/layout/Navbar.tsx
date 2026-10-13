import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useState } from 'react'
import { site } from '../../data/site'
import { useOpenStatus } from '../../hooks/useOpenStatus'
import { ease, easeInOut } from '../../lib/motion'
import { cn } from '../../lib/cn'
import MenuOverlay from './MenuOverlay'

export default function Navbar({ ready }: { ready: boolean }) {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const status = useOpenStatus()

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(y > prev && y > 400 && !open)
    setScrolled(y > 60)
  })

  return (
    <>
      <motion.header
        initial={{ y: -120 }}
        animate={{ y: ready && !hidden ? 0 : -120 }}
        transition={{ duration: 0.45, ease }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-4"
      >
        <div
          className={cn(
            'mx-auto flex max-w-[1600px] items-center justify-between rounded-full py-2 pl-5 pr-2 transition-[background-color,box-shadow] duration-300 ease-out',
            scrolled && !open ? 'bg-paper shadow-[0_10px_30px_-14px_rgba(23,18,14,0.45)]' : 'bg-transparent',
            open ? 'text-paper' : 'text-ink',
          )}
        >
          <a href="#top" className="group flex items-baseline gap-2" onClick={() => setOpen(false)}>
            <span className="font-display text-2xl font-semibold tracking-tight">
              Gino <em className="font-normal text-tomato">e</em> Pina
            </span>
            <span className="hidden font-display text-sm italic opacity-75 sm:inline">dal {site.founded}</span>
          </a>

          <div className="hidden items-center gap-2 text-xs font-medium md:flex">
            <span className="relative flex size-2">
              {status.open && <span className="absolute inline-flex size-full animate-ping rounded-full bg-basil opacity-60" />}
              <span className={cn('relative inline-flex size-2 rounded-full', status.open ? 'bg-basil' : 'bg-tomato')} />
            </span>
            {status.label}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={site.phone.href}
              className={cn(
                'hidden items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-[background-color,transform] duration-150 ease-out active:scale-[0.97] sm:flex',
                open ? 'bg-paper text-ink' : 'bg-tomato text-paper hover:bg-tomato-deep',
              )}
            >
              <i className="ri-phone-line" aria-hidden /> Prenota
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? 'Chiudi menu' : 'Apri menu'}
              aria-expanded={open}
              className={cn(
                'relative grid size-12 place-items-center rounded-full transition-[background-color,transform] duration-150 ease-out active:scale-[0.95]',
                open ? 'bg-tomato text-paper' : 'bg-ink text-paper',
              )}
            >
              <motion.span
                className="absolute h-0.5 w-5 rounded bg-current"
                animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
                transition={{ duration: 0.3, ease: easeInOut }}
              />
              <motion.span
                className="absolute h-0.5 w-5 rounded bg-current"
                animate={open ? { rotate: -45, y: 0, width: 20 } : { rotate: 0, y: 4, width: 12 }}
                transition={{ duration: 0.3, ease: easeInOut }}
              />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>{open && <MenuOverlay onClose={() => setOpen(false)} />}</AnimatePresence>
    </>
  )
}
