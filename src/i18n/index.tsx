import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { L, Lang } from '../types'

interface LangContext {
  lang: Lang
  setLang: (l: Lang) => void
  /** sceglie la versione giusta di un testo bilingue */
  t: (text: L) => string
}

const Ctx = createContext<LangContext | null>(null)
const KEY = 'gep-lang'

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(KEY)
    if (saved === 'it' || saved === 'en') return saved
  } catch {
    /* storage non disponibile */
  }
  return navigator.language?.toLowerCase().startsWith('it') ? 'it' : 'en'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      localStorage.setItem(KEY, next)
    } catch {
      /* ignora */
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const value = useMemo(() => ({ lang, setLang, t: (text: L) => text[lang] }), [lang, setLang])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLang() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useLang va usato dentro <LangProvider>')
  return ctx
}
