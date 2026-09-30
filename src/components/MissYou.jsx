import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionTitle from './SectionTitle'
import { Cat, Heart, Paw } from './Doodles'
import { HER_NAME } from '../config'

function MissMeter() {
  // idle → filling → broken
  const [state, setState] = useState('idle')
  const [pct, setPct] = useState(0)

  useEffect(() => {
    if (state !== 'filling') return
    let v = 0
    const id = setInterval(() => {
      v += v < 80 ? 2 : 1
      setPct(v)
      if (v >= 100) {
        clearInterval(id)
        setTimeout(() => setState('broken'), 300)
      }
    }, 30)
    return () => clearInterval(id)
  }, [state])

  return (
    <div className="meter-card">
      <h3>How much do I miss you?</h3>
      <motion.div
        className={`meter ${state}`}
        animate={state === 'broken' ? { x: [0, -8, 8, -6, 6, 0], rotate: [0, -2, 2, 0] } : {}}
        transition={{ duration: 0.5 }}
      >
        <motion.div className="meter-fill" style={{ width: `${Math.min(pct, 100)}%` }} />
        <span className="meter-pct">{state === 'broken' ? '∞' : `${pct}%`}</span>
      </motion.div>
      <AnimatePresence mode="wait">
        {state === 'idle' && (
          <motion.button key="b" className="doodle-btn" onClick={() => setState('filling')} exit={{ opacity: 0 }} whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}>
            measure it 📏
          </motion.button>
        )}
        {state === 'broken' && (
          <motion.div key="r" className="meter-result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p>⚠️ ERROR: meter broke. too much missing detected.</p>
            <div className="meter-hearts">
              {Array.from({ length: 12 }, (_, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 0, opacity: 1, x: 0 }}
                  animate={{ y: -120 - Math.random() * 80, x: (Math.random() - 0.5) * 200, opacity: 0 }}
                  transition={{ duration: 1.6 + Math.random(), delay: i * 0.05 }}
                >
                  <Heart size={20 + Math.random() * 14} />
                </motion.span>
              ))}
            </div>
            <button
              className="doodle-btn small"
              onClick={() => {
                setPct(0)
                setState('idle')
              }}
            >
              try again (it'll break again)
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function CatPair() {
  return (
    <div className="countdown-cats">
      <motion.div animate={{ x: [0, 14, 0] }} transition={{ repeat: Infinity, duration: 2.4 }}>
        <Cat size={80} />
      </motion.div>
      <motion.div animate={{ scale: [1, 1.25, 1] }} transition={{ repeat: Infinity, duration: 1.2 }}>
        <Heart size={30} />
      </motion.div>
      <motion.div animate={{ x: [0, -14, 0] }} transition={{ repeat: Infinity, duration: 2.4 }}>
        <div className="flip"><Cat size={80} body="#ffe9c7" accent="var(--pink-deep)" /></div>
      </motion.div>
    </div>
  )
}

export default function MissYou() {
  return (
    <section className="section">
      <SectionTitle kicker={`dear ${HER_NAME}`} icon={<Paw size={46} color="var(--pink-deep)" />}>
        Missing you, measured
      </SectionTitle>
      <div className="miss-grid">
        <MissMeter />
      </div>
      <CatPair />
    </section>
  )
}
