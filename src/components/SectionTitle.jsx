import { motion } from 'framer-motion'
import { Squiggle } from './Doodles'

export default function SectionTitle({ kicker, children, icon }) {
  return (
    <motion.div
      className="section-title"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7 }}
    >
      {icon && <div className="section-icon">{icon}</div>}
      {kicker && <p className="kicker">{kicker}</p>}
      <h2>{children}</h2>
      <Squiggle width={160} />
    </motion.div>
  )
}
