import { useEffect, useState } from 'react'
import Intro from './components/Intro'
import Hero from './components/Hero'
import Reasons from './components/Reasons'
import Gallery from './components/Gallery'
import Videos from './components/Videos'
import CatCorner from './components/CatCorner'
import LongDistance from './components/LongDistance'
import MissYou from './components/MissYou'
import Footer from './components/Footer'
import { FloatingDoodles, ClickBursts, ScrollProgress } from './components/Effects'

export default function App() {
  const [open, setOpen] = useState(false)

  // Lock scrolling until the intro is opened.
  useEffect(() => {
    document.body.style.overflow = open ? '' : 'hidden'
  }, [open])

  return (
    <>
      <Intro open={open} onOpen={() => setOpen(true)} />
      <ScrollProgress />
      <FloatingDoodles />
      <ClickBursts />
      <main>
        <Hero started={open} />
        <Reasons />
        <Gallery />
        <LongDistance />
        <Videos />
        <CatCorner />
        <MissYou />
      </main>
      <Footer />
    </>
  )
}
