import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionTitle from './SectionTitle'
import { Cat } from './Doodles'

// Demo cat pictures from the internet (cataas.com — "Cat as a service").
// If a picture fails to load, a doodle cat appears instead.
const CATS = [
  { src: 'https://cataas.com/cat/cute?width=400&height=400&r=1', caption: 'me waiting for your text' },
  { src: 'https://cataas.com/cat/cute?width=400&height=400&r=2', caption: 'you when I say I miss you' },
  { src: 'https://cataas.com/cat/cute?width=400&height=400&r=3', caption: 'me on call with you at 3am' },
  { src: 'https://cataas.com/cat/cute?width=400&height=400&r=4', caption: 'us when we finally meet' },
]

function CatPic({ cat, index }) {
  const [failed, setFailed] = useState(false)
  return (
    <motion.figure
      className="cat-pic"
      initial={{ opacity: 0, scale: 0.5, rotate: index % 2 ? 20 : -20 }}
      whileInView={{ opacity: 1, scale: 1, rotate: index % 2 ? 3 : -3 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, type: 'spring', bounce: 0.5 }}
      whileHover={{ rotate: 0, scale: 1.06, y: -8 }}
    >
      <div className="cat-pic-img">
        {failed ? (
          <div className="cat-fallback">
            <Cat size={130} mood={index % 2 ? 'happy' : 'looking'} />
          </div>
        ) : (
          <img src={cat.src} alt="cute cat" loading="lazy" onError={() => setFailed(true)} />
        )}
      </div>
      <figcaption>{cat.caption}</figcaption>
    </motion.figure>
  )
}

export default function CatCorner() {
  return (
    <section className="section cat-corner">
      <SectionTitle kicker="a relatable intermission" icon={<Cat size={70} mood="looking" />}>
        Us, but as cats
      </SectionTitle>
      <div className="cat-grid">
        {CATS.map((c, i) => (
          <CatPic key={i} cat={c} index={i} />
        ))}
      </div>
    </section>
  )
}
