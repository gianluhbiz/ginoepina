import { useEffect } from 'react'
import { useLocation } from 'react-router'

/** Al cambio pagina torna in cima; con un #ancora scorre alla sezione */
export default function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1))
      // aspetta il render della pagina di destinazione
      const t = window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ block: 'start' }), 60)
      return () => window.clearTimeout(t)
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}
