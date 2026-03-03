'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ133_yypE3yVbKay8QDsmXVGrhtn5z9zoLZPtQNfbALcn0qNTwL7-iMMwu53VSfY911u5kfYIA6"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-6 z-50 font-sans font-medium px-5 py-3 rounded-full shadow-lg text-sm"
          style={{
            background: 'var(--color-gold)',
            color: 'var(--color-background)',
          }}
        >
          Book a Call →
        </motion.a>
      )}
    </AnimatePresence>
  )
}
