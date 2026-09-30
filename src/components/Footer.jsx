import { motion } from 'framer-motion'
import { Heart, Paw } from './Doodles'
import { HER_NAME, MY_NAME } from '../config'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="paw-trail" aria-hidden>
        {Array.from({ length: 8 }, (_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.18 }}
          >
            <Paw size={22} color="var(--pink)" />
          </motion.span>
        ))}
      </div>
      <motion.h2
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', bounce: 0.5 }}
      >
        I love you, {HER_NAME}
      </motion.h2>
      <p>No distance is too far when it's you. See you soon, my love.</p>
      <motion.div animate={{ scale: [1, 1.2, 1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 1.4 }} className="footer-heart">
        <Heart size={56} />
      </motion.div>
      <p className="footer-sign">— made with too much love by {MY_NAME} 🐾</p>
    </footer>
  )
}
