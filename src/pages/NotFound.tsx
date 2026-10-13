import { useLang } from '../i18n'
import { strings } from '../i18n/strings'
import SignHeading from '../components/ui/SignHeading'
import Button from '../components/ui/Button'

export default function NotFound() {
  const { t } = useLang()
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 text-center">
      <SignHeading as="h1" className="text-5xl text-green">{t(strings.notFound.title)}</SignHeading>
      <p className="mt-4 text-lg text-muted">{t(strings.notFound.body)}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button to="/" variant="green">{t(strings.nav.home)}</Button>
        <Button to="/menu" variant="outline">{t(strings.nav.menu)}</Button>
      </div>
    </section>
  )
}
