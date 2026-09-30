import { motion, AnimatePresence } from 'framer-motion'
import { Cat, Heart, Paw } from './Doodles'
import { HER_NAME } from '../config'

export default function Intro({ open, onOpen }) {
  return (
    <AnimatePresence>
      {!open && (
        <motion.div
          className="intro"
          exit={{ y: '-100%', transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }}
        >
          <motion.div
            className="intro-inner"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', bounce: 0.5, duration: 1 }}
          >
            <div className="intro-cat">
              <Cat size={170} mood="looking" />
              <motion.div
                className="intro-heart"
                animate={{ y: [0, -10, 0], rotate: [-8, 8, -8] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Heart size={46} />
              </motion.div>
            </div>
            <h1 className="intro-title">psst… {HER_NAME}</h1>
            <p className="intro-sub">someone who misses you a lot made you something</p>
            <motion.button
              className="paw-button"
              onClick={onOpen}
              whileHover={{ scale: 1.1, rotate: -6 }}
              whileTap={{ scale: 0.9 }}
              animate={{ boxShadow: ['0 0 0 0 rgba(255,143,171,.6)', '0 0 0 22px rgba(255,143,171,0)'] }}
              transition={{ boxShadow: { repeat: Infinity, duration: 1.6 } }}
              aria-label="Open"
            >
              <Paw size={44} color="#fff" />
            </motion.button>
            <p className="intro-hint">tap the paw 🐾</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
