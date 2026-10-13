import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { useLang } from '../../i18n'
import { strings } from '../../i18n/strings'
import { site } from '../../data/site'
import { useLockBody } from '../../hooks/useLockBody'
import { ease } from '../../lib/motion'
import { cn } from '../../lib/cn'
import LangToggle from './LangToggle'
import Button from '../ui/Button'

export const navItems = [
  { to: '/menu', label: strings.nav.menu },
  { to: '/#locale', label: strings.nav.locale },
  { to: '/#gruppi', label: strings.nav.gruppi },
  { to: '/#dove', label: strings.nav.dove },
  { to: '/#faq', label: strings.nav.faq },
]

function Wordmark() {
  const { t } = useLang()
  return (
    <Link to="/" className="flex flex-col leading-none text-enamel" aria-label="Gino e Pina, home">
      <span className="whitespace-nowrap text-2xl font-extrabold uppercase tracking-[0.01em] [font-stretch:72%] sm:text-[1.75rem]">
        Gino <span className="normal-case text-yellow">e</span> Pina
      </span>
      <span className="mt-0.5 whitespace-nowrap text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-enamel/80 sm:text-xs sm:tracking-[0.18em]">{t(strings.hero.since)}</span>
    </Link>
  )
}

export default function Header() {
  const { t } = useLang()
  const [open, setOpen] = useState(false)
  const location = useLocation()
  useLockBody(open)

  // chiude il pannello quando si cambia pagina o sezione
  useEffect(() => setOpen(false), [location.pathname, location.hash])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="sticky top-0 z-40 bg-green text-enamel shadow-[0_6px_20px_-12px_rgba(8,53,42,0.8)]">
      {/* filetto bianco come il bordo di un'insegna */}
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Wordmark />

        <nav aria-label="Principale" className="hidden items-center gap-1 lg:flex">
          {navItems.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                cn(
                  'rounded-lg px-3 py-2 text-[0.95rem] font-semibold transition-colors duration-150 hover:bg-green-deep',
                  isActive && n.to === '/menu' && 'bg-green-deep text-yellow',
                )
              }
            >
              {t(n.label)}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LangToggle />
          <span className="hidden sm:block">
            <Button to="/#prenota" variant="red" icon="ri-calendar-check-line">
              {t(strings.nav.book)}
            </Button>
          </span>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={t(open ? strings.nav.closeMenu : strings.nav.openMenu)}
            className="grid size-12 place-items-center rounded-xl bg-green-deep text-2xl transition-transform duration-150 active:scale-[0.95] lg:hidden"
          >
            <i className={open ? 'ri-close-line' : 'ri-menu-line'} aria-hidden />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.2, ease } }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.12 } }}
            className="absolute inset-x-0 top-full h-[calc(100dvh-4.5rem)] overflow-y-auto bg-green px-4 pb-28 pt-4 lg:hidden"
          >
            <nav aria-label="Mobile">
              <ul className="divide-y divide-enamel/15 border-y border-enamel/15">
                {[{ to: '/', label: strings.nav.home }, ...navItems].map((n) => (
                  <li key={n.to}>
                    <Link to={n.to} className="flex min-h-14 items-center justify-between py-3 text-xl font-bold">
                      {t(n.label)}
                      <i className="ri-arrow-right-s-line text-2xl text-enamel/70" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-6 grid gap-3">
              <Button to="/#prenota" variant="red" size="lg" icon="ri-calendar-check-line">
                {t(strings.nav.book)}
              </Button>
              <Button href={site.phone.href} variant="outline-light" size="lg" icon="ri-phone-line">
                {`${t(strings.actions.call)} ${site.phone.display}`}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
