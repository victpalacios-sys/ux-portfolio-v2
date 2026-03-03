'use client'

import { useEffect, useState } from 'react'

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <a
      href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ133_yypE3yVbKay8QDsmXVGrhtn5z9zoLZPtQNfbALcn0qNTwL7-iMMwu53VSfY911u5kfYIA6"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 font-sans font-medium px-5 py-3 rounded-full shadow-lg text-sm"
      style={{
        background: 'var(--color-gold)',
        color: 'var(--color-background)',
        animation: 'fadeUp 0.3s ease forwards',
      }}
    >
      Book a Call →
    </a>
  )
}
