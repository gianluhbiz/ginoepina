import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import type { Dish } from '../../types'
import { useLockBody } from '../../hooks/useLockBody'
import { spring } from '../../lib/motion'

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
          role="dialog"
          aria-modal="true"
          aria-label={dish.name}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.25 } }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          onClick={onClose}
        >
          <div className="relative flex w-full max-w-5xl flex-col items-center gap-6 md:flex-row md:items-end" onClick={(e) => e.stopPropagation()}>
            <motion.img
              layoutId={`dish-${dish.id}`}
              key={dish.id}
              src={dish.image}
              alt={dish.name}
              className="aspect-square w-full max-w-[min(80vh,640px)] rounded-[2rem] object-cover"
              transition={spring}
            />
            <div className="w-full text-paper md:pb-4">
              <motion.h3 key={`t-${dish.id}`} initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.3 } }} className="font-display text-4xl leading-tight md:text-5xl">
                {dish.name}
              </motion.h3>
              <p className="mb-8 mt-2 text-sm tabular-nums text-paper/75">
                {dish.category} · {i + 1} di {items.length}
              </p>
              <div className="flex gap-2">
                <button onClick={() => onChange((i - 1 + items.length) % items.length)} aria-label="Precedente" className="grid size-12 place-items-center rounded-full border border-paper/30 text-xl transition-[color,background-color,transform] duration-150 ease-out hover:bg-paper hover:text-ink active:scale-[0.95]">
                  <i className="ri-arrow-left-line" aria-hidden />
                </button>
                <button onClick={() => onChange((i + 1) % items.length)} aria-label="Successivo" className="grid size-12 place-items-center rounded-full border border-paper/30 text-xl transition-[color,background-color,transform] duration-150 ease-out hover:bg-paper hover:text-ink active:scale-[0.95]">
                  <i className="ri-arrow-right-line" aria-hidden />
                </button>
                <button onClick={onClose} aria-label="Chiudi" className="ml-auto grid size-12 place-items-center rounded-full bg-tomato text-xl transition-transform duration-150 ease-out active:scale-[0.95]">
                  <i className="ri-close-line" aria-hidden />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
