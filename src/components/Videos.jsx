import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionTitle from './SectionTitle'
import { Paw } from './Doodles'
import { VIDEOS } from '../config'

function VideoCard({ video, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.6 })

  // Autoplay (muted) while on screen, pause when scrolled away.
  useEffect(() => {
    const v = ref.current
    if (!v) return
    if (inView) v.play().catch(() => {})
    else v.pause()
  }, [inView])

  return (
    <motion.div
      className="video-card"
      initial={{ opacity: 0, y: 60, rotate: index % 2 ? 4 : -4 }}
      whileInView={{ opacity: 1, y: 0, rotate: index % 2 ? 1.5 : -1.5 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: (index % 3) * 0.12, type: 'spring', bounce: 0.35 }}
      whileHover={{ rotate: 0, scale: 1.03 }}
    >
      <div className="video-frame">
        <div className="cat-ears" aria-hidden>
          <span />
          <span />
        </div>
        <video ref={ref} src={`${video.src}#t=0.1`} muted loop playsInline controls preload="metadata" />
      </div>
      <p className="video-caption">
        <Paw size={16} color="var(--pink-deep)" /> {video.caption}
      </p>
    </motion.div>
  )
}

export default function Videos() {
  return (
    <section className="section videos-section">
      <SectionTitle kicker="press play & unmute 🔊" icon={<Paw size={48} color="var(--pink)" />}>
        Our little moments
      </SectionTitle>
      <div className="videos-grid">
        {VIDEOS.map((v, i) => (
          <VideoCard key={v.src} video={v} index={i} />
        ))}
      </div>
    </section>
  )
}
