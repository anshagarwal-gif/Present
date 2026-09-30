import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionTitle from './SectionTitle'
import { Heart, Star } from './Doodles'
import { PHOTOS } from '../config'

const tilts = [-5, 3, -2, 6, -4, 2, 5, -3, 4, -6, 1, -2]

export default function Gallery() {
  const [active, setActive] = useState(null)

  useEffect(() => {
    if (active === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setActive(null)
      if (e.key === 'ArrowRight') setActive((a) => (a + 1) % PHOTOS.length)
      if (e.key === 'ArrowLeft') setActive((a) => (a - 1 + PHOTOS.length) % PHOTOS.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active])

  return (
    <section className="section gallery-section">
      <SectionTitle kicker="our little scrapbook" icon={<Star size={48} />}>
        Us, in pictures
      </SectionTitle>
      <div className="polaroid-board">
        {PHOTOS.map((p, i) => (
          <motion.figure
            key={p.src}
            className="polaroid"
            style={{ '--tilt': `${tilts[i % tilts.length]}deg` }}
            initial={{ opacity: 0, y: 80, scale: 0.7, rotate: tilts[i % tilts.length] * 3 }}
            whileInView={{ opacity: 1, y: 0, scale: 1, rotate: tilts[i % tilts.length] }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: (i % 4) * 0.08, type: 'spring', bounce: 0.35, duration: 0.9 }}
            whileHover={{ scale: 1.08, rotate: 0, zIndex: 5, transition: { duration: 0.25 } }}
            onClick={() => setActive(i)}
          >
            <div className={`tape ${i % 2 ? 'tape-left' : 'tape-top'}`} />
            <img src={p.src} alt={p.caption} loading="lazy" />
            <figcaption className="polaroid-caption">{p.caption}</figcaption>
            {i % 3 === 0 && <Heart className="polaroid-sticker" size={30} />}
          </motion.figure>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <button
              className="lb-nav lb-prev"
              onClick={(e) => {
                e.stopPropagation()
                setActive((a) => (a - 1 + PHOTOS.length) % PHOTOS.length)
              }}
              aria-label="Previous"
            >
              ‹
            </button>
            <AnimatePresence mode="wait">
              <motion.figure
                key={active}
                className="lightbox-card"
                initial={{ scale: 0.7, rotate: -8, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                exit={{ scale: 0.7, rotate: 8, opacity: 0 }}
                transition={{ type: 'spring', bounce: 0.35 }}
                onClick={(e) => e.stopPropagation()}
              >
                <img src={PHOTOS[active].src} alt={PHOTOS[active].caption} />
                <figcaption className="polaroid-caption">{PHOTOS[active].caption}</figcaption>
              </motion.figure>
            </AnimatePresence>
            <button
              className="lb-nav lb-next"
              onClick={(e) => {
                e.stopPropagation()
                setActive((a) => (a + 1) % PHOTOS.length)
              }}
              aria-label="Next"
            >
              ›
            </button>
            <button className="lb-close" onClick={() => setActive(null)} aria-label="Close">
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
