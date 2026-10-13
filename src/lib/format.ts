import type { Lang } from '../types'

/** 8 → "8 €" (it) / "€8" (en); 4.5 → "4,50 €" / "€4.50" */
export function formatPrice(value: number, lang: Lang) {
  return new Intl.NumberFormat(lang === 'it' ? 'it-IT' : 'en-GB', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
  }).format(value)
}
