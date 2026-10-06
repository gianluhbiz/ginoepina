import { useEffect, useState } from 'react'
import { hours } from '../data/site'

const toMin = (t: string) => {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}

export interface OpenStatus {
  open: boolean
  label: string
  today: number
}

/** Calcola in tempo reale se il locale è aperto (ora locale del visitatore) */
export function getOpenStatus(now = new Date()): OpenStatus {
  const day = now.getDay()
  const mins = now.getHours() * 60 + now.getMinutes()
  const slot = hours.find((h) => h.day === day)
  const ranges = [slot?.lunch, slot?.dinner].filter(Boolean) as Array<[string, string]>

  for (const [a, b] of ranges) {
    if (mins >= toMin(a) && mins < toMin(b)) return { open: true, label: `Aperto · chiude alle ${b}`, today: day }
  }
  const next = ranges.find(([a]) => toMin(a) > mins)
  if (next) return { open: false, label: `Chiuso · apre alle ${next[0]}`, today: day }
  return { open: false, label: 'Chiuso · riapre domani alle 12:00', today: day }
}

export function useOpenStatus() {
  const [status, setStatus] = useState(() => getOpenStatus())
  useEffect(() => {
    const id = window.setInterval(() => setStatus(getOpenStatus()), 60_000)
    return () => window.clearInterval(id)
  }, [])
  return status
}
