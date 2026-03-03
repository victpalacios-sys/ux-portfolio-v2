'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function FooterCTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="px-6 md:px-10 lg:px-16 py-28 border-t relative overflow-hidden"
      style={{ borderColor: 'var(--color-border)' }}
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] blur-[100px] rounded-full pointer-events-none"
        style={{ background: 'color-mix(in srgb, var(--color-gold) 5%, transparent)' }}
      />

      <div className="max-w-[1200px] mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className="text-xs font-sans font-medium tracking-[0.2em] uppercase mb-6"
            style={{ color: 'var(--color-gold)' }}
          >
            Let&apos;s Work Together
          </p>
          <h2
            className="font-serif text-4xl md:text-5xl lg:text-6xl max-w-3xl mx-auto mb-8 tracking-[-0.02em]"
            style={{ color: 'var(--color-foreground)' }}
          >
            Ready to bring clarity to your product?
          </h2>
          <p
            className="max-w-lg mx-auto mb-10 leading-relaxed"
            style={{ color: 'var(--color-muted)' }}
          >
            Whether you need a research sprint, a full product redesign, or a design partner
            for your team — let&apos;s start with a 30-minute conversation.
          </p>
          <a
            href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ133_yypE3yVbKay8QDsmXVGrhtn5z9zoLZPtQNfbALcn0qNTwL7-iMMwu53VSfY911u5kfYIA6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-sans font-medium px-8 py-4 rounded-full text-sm transition-colors"
            style={{ background: 'var(--color-gold)', color: 'var(--color-background)' }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'var(--color-gold-light)')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'var(--color-gold)')}
          >
            Book a Discovery Call
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path
                d="M1 7h12M7 1l6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
