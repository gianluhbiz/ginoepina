import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import type { Dish } from '../../types'
import { useLockBody } from '../../hooks/useLockBody'
import { ease } from '../../lib/motion'

interface Props {
  items: Dish[]
  index: number | null
  onClose: () => void
  onChange: (i: number) => void
}

export default function Lightbox({ items, index, onClose, onChange }: Props) {
  const open = index !== null
  useLockBody(open)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onChange((index + 1) % items.length)
      if (e.key === 'ArrowLeft') onChange((index - 1 + items.length) % items.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, index, items.length, onChange, onClose])

  const i = index ?? 0
  const dish = open ? items[i] : null

  return (
    <AnimatePresence>
      {dish && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-md md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div className="relative flex w-full max-w-5xl flex-col items-center gap-6 md:flex-row md:items-end" onClick={(e) => e.stopPropagation()}>
            <motion.img
              layoutId={`dish-${dish.id}`}
              key={dish.id}
              src={dish.image}
              alt={dish.name}
              className="aspect-square w-full max-w-[min(80vh,640px)] rounded-[2rem] object-cover"
              transition={{ duration: 0.7, ease }}
            />
            <div className="w-full text-paper md:pb-4">
              <motion.p key={`c-${dish.id}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-2 text-xs uppercase tracking-[0.3em] text-crust">
                {dish.category} · {String(i + 1).padStart(2, '0')}/{items.length}
              </motion.p>
              <motion.h3 key={`t-${dish.id}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }} className="mb-8 font-display text-4xl leading-tight md:text-5xl">
                {dish.name}
              </motion.h3>
              <div className="flex gap-2">
                <button onClick={() => onChange((i - 1 + items.length) % items.length)} aria-label="Precedente" className="grid size-12 place-items-center rounded-full border border-paper/30 text-xl transition-colors hover:bg-paper hover:text-ink">
                  <i className="ri-arrow-left-line" />
                </button>
                <button onClick={() => onChange((i + 1) % items.length)} aria-label="Successivo" className="grid size-12 place-items-center rounded-full border border-paper/30 text-xl transition-colors hover:bg-paper hover:text-ink">
                  <i className="ri-arrow-right-line" />
                </button>
                <button onClick={onClose} aria-label="Chiudi" className="ml-auto grid size-12 place-items-center rounded-full bg-tomato text-xl">
                  <i className="ri-close-line" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
