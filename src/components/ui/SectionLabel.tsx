import { motion } from 'framer-motion'
import { ease } from '../../lib/motion'
import { cn } from '../../lib/cn'

/** Etichetta editoriale: ——— Cucina sannita */
export default function SectionLabel({ children, className }: { children: string; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className={cn('flex items-center gap-4 text-xs font-medium uppercase tracking-[0.25em]', className)}
    >
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease }}
        className="h-px w-16 origin-left bg-current opacity-50"
      />
      <span>{children}</span>
    </motion.div>
  )
}
