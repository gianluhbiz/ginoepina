import { useEffect } from 'react'
import Hero from '../sections/Hero'
import InfoPlates from '../sections/InfoPlates'
import MenuPreview from '../sections/MenuPreview'
import Locale from '../sections/Locale'
import Groups from '../sections/Groups'
import Reviews from '../sections/Reviews'
import Faq from '../sections/Faq'
import Directions from '../sections/Directions'

export default function HomePage() {
  useEffect(() => {
    document.title = 'Gino e Pina · Ristorante Pizzeria a Benevento dal 1940'
  }, [])
  return (
    <>
      <Hero />
      <InfoPlates />
      <MenuPreview />
      <Locale />
      <Groups />
      <Reviews />
      <Faq />
      <Directions />
    </>
  )
}
