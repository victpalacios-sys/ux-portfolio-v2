'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const principles = [
  {
    number: '01',
    name: 'Easy to Use',
    description: 'Accessible for beginners without penalising experts.',
  },
  {
    number: '02',
    name: 'Fast Path to Success',
    description: 'From zero to a working design as quickly as possible.',
  },
  {
    number: '03',
    name: 'Progressive Mastery',
    description: 'A clear path from novice to advanced.',
  },
  {
    number: '04',
    name: 'Company Expertise Built In',
    description: 'Best practices encoded in the tool, not left implicit.',
  },
  {
    number: '05',
    name: 'Delight',
    description: 'Visual quality and feature richness both matter.',
  },
  {
    number: '06',
    name: 'Fast Delivery',
    description: 'Ship value quickly and iterate.',
  },
]

export default function DesignPrinciplesGrid() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <div
      ref={ref}
      className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      role="list"
      aria-label="Design principles"
    >
      {principles.map((principle, index) => (
        <motion.div
          key={principle.number}
          role="listitem"
          className="rounded-xl p-6"
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderLeft: '3px solid var(--color-gold)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
        >
          <p
            className="text-3xl mb-3"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-gold)' }}
          >
            {principle.number}
          </p>
          <p
            className="text-lg mb-2"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-foreground)' }}
          >
            {principle.name}
          </p>
          <p
            className="text-sm leading-relaxed"
            style={{ color: 'var(--color-muted)' }}
          >
            {principle.description}
          </p>
        </motion.div>
      ))}
    </div>
  )
}
