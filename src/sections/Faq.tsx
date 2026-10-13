import { AnimatePresence, motion } from 'framer-motion'
import { useId, useState } from 'react'
import { useLang } from '../i18n'
import { strings } from '../i18n/strings'
import { faqs } from '../data/content'
import { ease } from '../lib/motion'
import { cn } from '../lib/cn'
import SignHeading from '../components/ui/SignHeading'

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  const id = useId()
  return (
    <li className="border-b border-green/15">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((o) => !o)}
          className="flex min-h-16 w-full items-center justify-between gap-4 py-4 text-left text-lg font-bold transition-colors duration-150 hover:text-green"
        >
          {q}
          <span className={cn('grid size-9 shrink-0 place-items-center rounded-lg transition-[background-color,transform] duration-200 ease-out', open ? 'rotate-45 bg-green text-enamel' : 'bg-green-soft text-green')}>
            <i className="ri-add-line text-xl" aria-hidden />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1, transition: { duration: 0.25, ease } }}
            exit={{ height: 0, opacity: 0, transition: { duration: 0.15 } }}
            className="overflow-hidden"
          >
            <p className="max-w-[68ch] pb-5 text-lg leading-relaxed text-muted">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}

export default function Faq() {
  const { t } = useLang()
  return (
    <section id="faq" aria-labelledby="faq-title" className="scroll-mt-20 bg-mist py-14 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
        <SignHeading id="faq-title" className="text-4xl text-green sm:text-5xl">{t(strings.faq.title)}</SignHeading>
        <ul className="border-t border-green/15">
          {faqs.map((f) => (
            <Item key={f.q.it} q={t(f.q)} a={t(f.a)} />
          ))}
        </ul>
      </div>
    </section>
  )
}
