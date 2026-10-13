import { Link } from 'react-router'
import { useLang } from '../../i18n'
import { strings } from '../../i18n/strings'
import { site, whatsappLink } from '../../data/site'

/** Barra fissa da telefono: le quattro cose che si fanno con un pollice */
export default function MobileActionBar() {
  const { t } = useLang()
  const item = 'flex flex-1 flex-col items-center justify-center gap-0.5 rounded-lg py-2 text-xs font-bold transition-[background-color,transform] duration-150 active:scale-[0.96] active:bg-green-deep'
  return (
    <nav
      aria-label="Azioni rapide"
      className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-enamel/20 bg-green px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 text-enamel md:hidden"
    >
      <div className="flex gap-1">
        <a href={site.phone.href} className={item}>
          <i className="ri-phone-fill text-2xl text-yellow" aria-hidden />
          {t(strings.actions.call)}
        </a>
        <a href={whatsappLink()} target="_blank" rel="noreferrer" className={item}>
          <i className="ri-whatsapp-line text-2xl" aria-hidden />
          {t(strings.actions.whatsapp)}
        </a>
        <Link to="/menu" className={item}>
          <i className="ri-book-open-line text-2xl" aria-hidden />
          {t(strings.actions.menu)}
        </Link>
        <a href={site.mapsUrl} target="_blank" rel="noreferrer" className={item}>
          <i className="ri-map-pin-2-line text-2xl" aria-hidden />
          {t(strings.actions.map)}
        </a>
      </div>
    </nav>
  )
}
