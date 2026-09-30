import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionTitle from './SectionTitle'
import { CatHeart, Paw } from './Doodles'
import { REASONS } from '../config'

const colors = ['var(--pink-soft)', 'var(--yellow-soft)', 'var(--blue-soft)', 'var(--mint-soft)', 'var(--lilac-soft)', 'var(--peach-soft)']

function ReasonCard({ reason, index }) {
  const [flipped, setFlipped] = useState(false)
  return (
    <motion.div
      className="reason-wrap"
      initial={{ opacity: 0, y: 60, rotate: index % 2 ? 6 : -6 }}
      whileInView={{ opacity: 1, y: 0, rotate: index % 2 ? 2 : -2 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.1, type: 'spring', bounce: 0.4 }}
    >
      <motion.button
        className="reason-card"
        onClick={() => setFlipped((f) => !f)}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.7, type: 'spring', bounce: 0.3 }}
        whileHover={{ scale: 1.05 }}
      >
        <div className="reason-face reason-front" style={{ background: colors[index % colors.length] }}>
          <span className="reason-num">#{index + 1}</span>
          <h3>{reason.front}</h3>
          <span className="reason-tap">
            <Paw size={16} /> tap me
          </span>
        </div>
        <div className="reason-face reason-back">
          <p>{reason.back}</p>
        </div>
      </motion.button>
    </motion.div>
  )
}

export default function Reasons() {
  return (
    <section id="reasons" className="section">
      <SectionTitle kicker="a very incomplete list of" icon={<CatHeart />}>
        Reasons I love you
      </SectionTitle>
      <div className="reasons-grid">
        {REASONS.map((r, i) => (
          <ReasonCard key={i} reason={r} index={i} />
        ))}
      </div>
    </section>
  )
}
