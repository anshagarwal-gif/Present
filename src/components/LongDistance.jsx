import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useInView, animate } from 'framer-motion'
import SectionTitle from './SectionTitle'
import { Cat, Heart, Paw } from './Doodles'
import { DISTANCE_KM, MY_CITY, HER_CITY, HER_NAME, LETTER, OPEN_WHEN } from '../config'

const ARC = 'M110 210 C 260 40, 540 40, 690 210'

function DistanceMap() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const [km, setKm] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, DISTANCE_KM, { duration: 2.5, ease: 'easeOut', onUpdate: (v) => setKm(Math.round(v)) })
    return () => controls.stop()
  }, [inView])

  return (
    <div className="distance" ref={ref}>
      <svg className="distance-map" viewBox="0 0 800 300" fill="none">
        {/* little clouds */}
        <g className="cloud c1">
          <path d="M300 80 q 10 -20 30 -10 q 15 -18 32 0 q 20 0 16 16 h -80 q -8 -8 2 -6 z" fill="#fff" stroke="var(--ink)" strokeWidth="2" />
        </g>
        <g className="cloud c2">
          <path d="M480 60 q 10 -20 30 -10 q 15 -18 32 0 q 20 0 16 16 h -80 q -8 -8 2 -6 z" fill="#fff" stroke="var(--ink)" strokeWidth="2" />
        </g>

        {/* dashed flight path */}
        <motion.path
          d={ARC}
          stroke="var(--pink-deep)"
          strokeWidth="3"
          strokeDasharray="10 10"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 2.2, ease: 'easeInOut' }}
        />

        {/* houses */}
        {[{ x: 110, label: MY_CITY, who: 'me' }, { x: 690, label: HER_CITY, who: 'you' }].map((h) => (
          <g key={h.who}>
            <path
              d={`M${h.x - 40} 230 L${h.x} 195 L${h.x + 40} 230 Z`}
              fill="var(--pink)"
              stroke="var(--ink)"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <rect x={h.x - 32} y="230" width="64" height="48" fill="#fff" stroke="var(--ink)" strokeWidth="2.5" />
            <rect x={h.x - 9} y="250" width="18" height="28" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="2" />
            <text x={h.x} y="298" textAnchor="middle" className="map-label">
              {h.who} · {h.label}
            </text>
          </g>
        ))}

        {/* the flying love letter */}
        {inView && (
          <g>
            <g>
              <rect x="-18" y="-12" width="36" height="24" rx="3" fill="#fff" stroke="var(--ink)" strokeWidth="2" />
              <path d="M-18 -12 L0 3 L18 -12" stroke="var(--ink)" strokeWidth="2" fill="none" />
              <path d="M0 6 C -6 1, -6 -3, -3 -3 C -1 -3, 0 -1, 0 0 C 0 -1, 1 -3, 3 -3 C 6 -3, 6 1, 0 6 Z" fill="var(--pink-deep)" />
              <animateMotion dur="4s" repeatCount="indefinite" rotate="auto" path={ARC} />
            </g>
          </g>
        )}
      </svg>
      <motion.div
        className="distance-count"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.4, type: 'spring' }}
      >
        <span className="km">{km.toLocaleString()}</span> km apart
        <small>…and you still feel like the closest person to me</small>
      </motion.div>
    </div>
  )
}

const wordVariants = {
  hidden: { opacity: 0, y: 8, filter: 'blur(4px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

function Words({ text, delay = 0 }) {
  return (
    <motion.p
      initial="hidden"
      animate="show"
      transition={{ staggerChildren: 0.035, delayChildren: delay }}
    >
      {text.split(' ').map((w, i) => (
        <motion.span key={i} variants={wordVariants} className="word">
          {w}{' '}
        </motion.span>
      ))}
    </motion.p>
  )
}

function LoveLetter() {
  // closed → flap → out → letter
  const [stage, setStage] = useState('closed')

  const open = () => {
    if (stage !== 'closed') return
    setStage('flap')
    setTimeout(() => setStage('out'), 700)
    setTimeout(() => setStage('letter'), 1900)
  }

  // Compute cumulative delays so paragraphs write one after another.
  let delay = 0.4
  const paraDelays = LETTER.paragraphs.map((p) => {
    const d = delay
    delay += p.split(' ').length * 0.035 + 0.3
    return d
  })

  return (
    <div className="letter-area">
      <AnimatePresence mode="wait">
        {stage !== 'letter' ? (
          <motion.div
            key="env"
            className="envelope-wrap"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            exit={{ opacity: 0, scale: 0.8, y: 60, transition: { duration: 0.5 } }}
          >
            <motion.div
              className={`envelope ${stage}`}
              onClick={open}
              animate={stage === 'closed' ? { rotate: [-2, 2, -2], y: [0, -6, 0] } : { rotate: 0, y: 0 }}
              transition={stage === 'closed' ? { repeat: Infinity, duration: 2.4 } : { duration: 0.3 }}
              whileHover={stage === 'closed' ? { scale: 1.05 } : {}}
            >
              <div className="env-back" />
              <motion.div
                className="env-letter"
                animate={stage === 'out' ? { y: '-70%' } : { y: 0 }}
                transition={{ duration: 0.9, ease: [0.34, 1.3, 0.64, 1] }}
              >
                <span>for you, {HER_NAME} 💌</span>
              </motion.div>
              <div className="env-front" />
              <motion.div
                className="env-flap"
                animate={{ rotateX: stage === 'closed' ? 0 : 180 }}
                transition={{ duration: 0.7, ease: 'easeInOut' }}
                style={{ zIndex: stage === 'closed' || stage === 'flap' ? 4 : 1 }}
              />
              <motion.div
                className="env-seal"
                animate={stage === 'closed' ? { scale: [1, 1.15, 1] } : { scale: 0, opacity: 0 }}
                transition={stage === 'closed' ? { repeat: Infinity, duration: 1.2 } : { duration: 0.3 }}
              >
                <Heart size={40} color="#fff" stroke="var(--pink-deep)" />
              </motion.div>
            </motion.div>
            <p className="envelope-hint">{stage === 'closed' ? 'tap to open your letter 💌' : 'opening…'}</p>
          </motion.div>
        ) : (
          <motion.article
            key="letter"
            className="letter-paper"
            initial={{ scaleY: 0.05, scaleX: 0.6, opacity: 0 }}
            animate={{ scaleY: 1, scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{ originY: 0 }}
          >
            <div className="letter-doodle-cat">
              <Cat size={90} />
            </div>
            <motion.h3 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              {LETTER.greeting}
            </motion.h3>
            {LETTER.paragraphs.map((p, i) => (
              <Words key={i} text={p} delay={paraDelays[i]} />
            ))}
            <motion.div
              className="letter-sign"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay }}
            >
              <p>{LETTER.signoff}</p>
              <p className="signature">{LETTER.signature}</p>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1, delay: delay + 0.5 }}
                className="sign-heart"
              >
                <Heart size={34} />
              </motion.div>
            </motion.div>
            <button className="reread" onClick={() => setStage('closed')}>
              ↺ fold it back up
            </button>
          </motion.article>
        )}
      </AnimatePresence>
    </div>
  )
}

function OpenWhen() {
  const [open, setOpen] = useState(null)
  return (
    <div className="open-when">
      <h3 className="open-when-title">open when…</h3>
      <div className="open-when-grid">
        {OPEN_WHEN.map((o, i) => (
          <motion.button
            key={o.label}
            className="mini-env"
            style={{ '--env': o.color }}
            onClick={() => setOpen(i)}
            initial={{ opacity: 0, y: 40, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: i % 2 ? 3 : -3 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, type: 'spring' }}
            whileHover={{ y: -10, rotate: 0 }}
          >
            <span className="mini-flap" />
            <span className="mini-label">…{o.label}</span>
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {open !== null && (
          <motion.div className="note-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)}>
            <motion.div
              className="note-card"
              style={{ background: OPEN_WHEN[open].color }}
              initial={{ y: 200, rotate: -15, scale: 0.6 }}
              animate={{ y: 0, rotate: -2, scale: 1 }}
              exit={{ y: 200, rotate: 15, scale: 0.6 }}
              transition={{ type: 'spring', bounce: 0.4 }}
              onClick={(e) => e.stopPropagation()}
            >
              <p className="note-when">open when {OPEN_WHEN[open].label}</p>
              <p className="note-text">{OPEN_WHEN[open].note}</p>
              <button className="note-close" onClick={() => setOpen(null)}>
                <Paw size={18} /> close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function LongDistance() {
  return (
    <section className="section ld-section" id="letter">
      <SectionTitle kicker="the long-distance part" icon={<Heart size={50} />}>
        Missing you from far away
      </SectionTitle>
      <DistanceMap />
      <LoveLetter />
      <OpenWhen />
    </section>
  )
}
