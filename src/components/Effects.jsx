import { useEffect, useMemo, useState } from 'react'
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import { Heart, Paw, Star, Sparkle } from './Doodles'

// Drifting doodles in the background of the whole page.
export function FloatingDoodles() {
  const items = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        kind: i % 4,
        left: Math.random() * 100,
        size: 14 + Math.random() * 22,
        duration: 14 + Math.random() * 16,
        delay: -Math.random() * 30,
        opacity: 0.25 + Math.random() * 0.3,
      })),
    []
  )
  return (
    <div className="floating-doodles" aria-hidden>
      {items.map((it) => {
        const Comp = [Heart, Paw, Star, Sparkle][it.kind]
        return (
          <div
            key={it.id}
            className="drift"
            style={{
              left: `${it.left}%`,
              animationDuration: `${it.duration}s`,
              animationDelay: `${it.delay}s`,
              opacity: it.opacity,
            }}
          >
            <Comp size={it.size} color={it.kind === 1 ? 'var(--pink)' : undefined} />
          </div>
        )
      })}
    </div>
  )
}

// Click anywhere → little hearts and paws burst out.
export function ClickBursts() {
  const [bursts, setBursts] = useState([])
  useEffect(() => {
    const onClick = (e) => {
      const id = Date.now() + Math.random()
      setBursts((b) => [...b, { id, x: e.clientX, y: e.clientY }])
      setTimeout(() => setBursts((b) => b.filter((x) => x.id !== id)), 1200)
    }
    window.addEventListener('pointerdown', onClick)
    return () => window.removeEventListener('pointerdown', onClick)
  }, [])
  return (
    <div className="bursts" aria-hidden>
      <AnimatePresence>
        {bursts.map((b) =>
          Array.from({ length: 7 }, (_, i) => {
            const angle = (i / 7) * Math.PI * 2
            const dist = 40 + Math.random() * 40
            return (
              <motion.div
                key={`${b.id}-${i}`}
                className="burst-item"
                style={{ left: b.x, top: b.y }}
                initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                animate={{
                  x: Math.cos(angle) * dist,
                  y: Math.sin(angle) * dist - 20,
                  scale: 1,
                  opacity: 0,
                  rotate: Math.random() * 90 - 45,
                }}
                transition={{ duration: 1, ease: 'easeOut' }}
              >
                {i % 3 === 0 ? <Paw size={16} color="var(--pink-deep)" /> : <Heart size={18} />}
              </motion.div>
            )
          })
        )}
      </AnimatePresence>
    </div>
  )
}

// Paw-print scroll progress bar at the top.
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 })
  return <motion.div className="scroll-progress" style={{ scaleX }} />
}
