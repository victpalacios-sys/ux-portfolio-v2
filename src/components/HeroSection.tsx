'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center px-6 md:px-10 lg:px-16 pt-32 pb-20 overflow-hidden"
      style={{ background: 'var(--color-background)' }}
    >
      {/* Subtle gold grid background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(var(--color-gold) 1px, transparent 1px), linear-gradient(90deg, var(--color-gold) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] blur-[120px] rounded-full pointer-events-none"
        style={{ background: 'color-mix(in srgb, var(--color-gold) 5%, transparent)' }}
      />

      <div className="max-w-[1200px] mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Label */}
          <p
            className="text-xs font-sans font-medium tracking-[0.2em] uppercase mb-6"
            style={{ color: 'var(--color-gold)' }}
          >
            Senior UX Consultant
          </p>

          {/* Headline */}
          <h1
            className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl max-w-4xl mb-8 leading-[1.05] tracking-[-0.02em]"
            style={{ color: 'var(--color-foreground)' }}
          >
            I turn complex systems into{' '}
            <em style={{ color: 'var(--color-gold)' }}>simple, human</em>{' '}
            experiences
          </h1>

          {/* Subheadline */}
          <p
            className="text-lg max-w-xl mb-12 leading-relaxed"
            style={{ color: 'var(--color-muted)' }}
          >
            Helping product teams ship software people actually use —
            from research and strategy to interfaces that work.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a
              href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ133_yypE3yVbKay8QDsmXVGrhtn5z9zoLZPtQNfbALcn0qNTwL7-iMMwu53VSfY911u5kfYIA6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-sans font-medium px-7 py-3.5 rounded-full text-sm transition-colors"
              style={{ background: 'var(--color-gold)', color: 'var(--color-background)' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'var(--color-gold-light)')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'var(--color-gold)')}
            >
              Book a Discovery Call
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            <Link
              href="#work"
              className="text-sm flex items-center gap-2 transition-colors"
              style={{ color: 'var(--color-muted)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-foreground)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-muted)')}
            >
              See my work
              <span style={{ color: 'var(--color-gold)' }}>↓</span>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: `linear-gradient(to top, var(--color-background), transparent)` }}
      />
    </section>
  )
}
