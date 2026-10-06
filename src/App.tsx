import { AnimatePresence, MotionConfig } from 'framer-motion'
import { useCallback, useState } from 'react'
import Preloader from './components/layout/Preloader'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Grain from './components/layout/Grain'
import ScrollProgress from './components/layout/ScrollProgress'
import Hero from './sections/Hero'
import ZoomReveal from './sections/ZoomReveal'
import Manifesto from './sections/Manifesto'
import DishMarquee from './sections/DishMarquee'
import Story from './sections/Story'
import Pizzeria from './sections/Pizzeria'
import Specialties from './sections/Specialties'
import Spaces from './sections/Spaces'
import Services from './sections/Services'
import GiftCards from './sections/GiftCards'
import Reviews from './sections/Reviews'
import Location from './sections/Location'

export default function App() {
  const [loading, setLoading] = useState(true)
  const done = useCallback(() => setLoading(false), [])

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>{loading && <Preloader key="preloader" onDone={done} />}</AnimatePresence>
      <ScrollProgress />
      <Navbar ready={!loading} />
      <main className="bg-paper font-sans text-ink antialiased selection:bg-tomato selection:text-paper">
        <Hero ready={!loading} />
        <ZoomReveal />
        <Manifesto />
        <DishMarquee />
        <Story />
        <Pizzeria />
        <Specialties />
        <Spaces />
        <Services />
        <GiftCards />
        <Reviews />
        <Location />
      </main>
      <Footer />
      <Grain />
    </MotionConfig>
  )
}
