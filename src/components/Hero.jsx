import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Cat, Heart, Star, Sparkle, Squiggle } from './Doodles'
import { HER_NAME, HERO_PHOTO } from '../config'

const letters = HER_NAME.split('')

export default function Hero({ started }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80])

  return (
    <section className="hero" ref={ref}>
      <motion.div className="hero-text" style={{ y: textY }}>
        <motion.p
          className="hero-kicker"
          initial={{ opacity: 0, y: 20 }}
          animate={started ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          a tiny website for my favourite person
        </motion.p>
        <h1 className="hero-name" aria-label={HER_NAME}>
          {letters.map((ch, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 80, rotate: -20 }}
              animate={started ? { opacity: 1, y: 0, rotate: 0 } : {}}
              transition={{ delay: 0.8 + i * 0.12, type: 'spring', bounce: 0.55 }}
              whileHover={{ y: -12, rotate: i % 2 ? 8 : -8, color: 'var(--pink-deep)' }}
            >
              {ch}
            </motion.span>
          ))}
        </h1>
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={started ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ delay: 1.6, duration: 0.8 }}
          style={{ originX: 0 }}
        >
          <Squiggle width={240} />
        </motion.div>
        <motion.p
          className="hero-line"
          initial={{ opacity: 0 }}
          animate={started ? { opacity: 1 } : {}}
          transition={{ delay: 2 }}
        >
          I love you more than cats love boxes. <br />
          And I miss you <em>so</em> much it's silly. 🐾
        </motion.p>
        <motion.a
          href="#reasons"
          className="scroll-cue"
          initial={{ opacity: 0 }}
          animate={started ? { opacity: 1, y: [0, 8, 0] } : {}}
          transition={{ delay: 2.4, y: { repeat: Infinity, duration: 1.6 } }}
        >
          scroll down, meow ↓
        </motion.a>
      </motion.div>

      <motion.div className="hero-photo-wrap" style={{ y: photoY }}>
        <motion.div
          className="hero-photo"
          initial={{ opacity: 0, scale: 0.6, rotate: 12 }}
          animate={started ? { opacity: 1, scale: 1, rotate: 4 } : {}}
          transition={{ delay: 1, type: 'spring', bounce: 0.4, duration: 1.2 }}
          whileHover={{ rotate: -2, scale: 1.03 }}
        >
          <div className="tape tape-top" />
          <img src={HERO_PHOTO} alt={HER_NAME} />
          <p className="polaroid-caption">my sunshine ☀️</p>
        </motion.div>
        <Heart className="float f1" size={44} />
        <Star className="float f2" size={34} />
        <Sparkle className="float f3" size={26} />
        <Heart className="float f4" size={28} color="var(--yellow)" />
        <motion.div
          className="hero-cat"
          initial={{ x: 200, opacity: 0 }}
          animate={started ? { x: 0, opacity: 1 } : {}}
          transition={{ delay: 2.2, type: 'spring', bounce: 0.3 }}
        >
          <Cat size={130} />
        </motion.div>
      </motion.div>
    </section>
  )
}
