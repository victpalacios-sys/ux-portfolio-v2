'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const steps = [
  {
    number: '01',
    title: 'Discover',
    description:
      'Research, stakeholder interviews, user interviews, competitive analysis. Understand the problem before touching a pixel.',
  },
  {
    number: '02',
    title: 'Define',
    description:
      'Synthesis, problem framing, success metrics. Turn research into a sharp problem statement and design brief.',
  },
  {
    number: '03',
    title: 'Design',
    description:
      'Wireframes, prototypes, iteration loops with users. From low-fidelity concepts to tested, refined solutions.',
  },
  {
    number: '04',
    title: 'Deliver',
    description:
      'Final UI, design system, developer handoff. Staying involved through implementation to ensure fidelity.',
  },
]

export default function ProcessSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="px-6 md:px-10 lg:px-16 py-20 border-t"
      style={{
        borderColor: 'var(--color-border)',
        background: 'color-mix(in srgb, var(--color-surface) 30%, transparent)',
      }}
    >
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className="text-xs font-sans font-medium tracking-[0.2em] uppercase mb-4"
            style={{ color: 'var(--color-gold)' }}
          >
            Process
          </p>
          <h2
            className="font-serif text-4xl md:text-5xl max-w-lg mb-16 tracking-[-0.01em]"
            style={{ color: 'var(--color-foreground)' }}
          >
            How I work
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.1 + i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative"
            >
              <span
                className="text-4xl font-serif font-bold block mb-4 leading-none"
                style={{ color: 'color-mix(in srgb, var(--color-gold) 20%, transparent)' }}
                aria-hidden="true"
              >
                {step.number}
              </span>
              <h3
                className="font-serif text-lg mb-2"
                style={{ color: 'var(--color-foreground)' }}
              >
                {step.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--color-muted)' }}
              >
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
