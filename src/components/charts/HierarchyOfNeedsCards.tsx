'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

const needs = [
  {
    number: '01',
    title: 'Time is Money',
    description:
      'Labour at every stage is expensive and mistakes discovered late cost ten times more to fix. Simulations are essential to get the design right before installation.',
    src: '/images/distribution-networks-needs-1.jpg',
    alt: 'A technician working under time pressure on a job site installation',
  },
  {
    number: '02',
    title: 'Collaboration',
    description:
      'These projects involve multiple teams and companies. Smooth information-sharing reduces both cost and conflict throughout the project.',
    src: '/images/distribution-networks-needs-2.jpg',
    alt: 'Two professionals reviewing project plans together on site',
  },
  {
    number: '03',
    title: 'Business Results',
    description:
      'Designers need high-quality documentation and visual renders to impress clients and win future projects.',
    src: '/images/distribution-networks-needs-3.jpg',
    alt: 'Professional documentation and visual output from a distribution network project',
  },
]

export default function HierarchyOfNeedsCards() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div
      ref={ref}
      className="mt-6 flex flex-col gap-4"
      role="list"
      aria-label="Hierarchy of user needs"
    >
      {needs.map((need, index) => {
        // Odd index (0, 2) → image left; even index (1) → image right
        const imageOnLeft = index % 2 === 0

        return (
          <motion.div
            key={need.number}
            role="listitem"
            className="flex flex-col overflow-hidden rounded-xl"
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: index * 0.15, ease: 'easeOut' }}
          >
            {/* Inner row — column on mobile, row on md+ */}
            <div
              className={`flex flex-col md:flex-row${imageOnLeft ? '' : ' md:flex-row-reverse'}`}
            >
              {/* Image side — 40% on desktop, full width on mobile */}
              <div
                className="relative w-full md:w-2/5 flex-none"
                style={{ minHeight: '280px' }}
              >
                <Image
                  src={need.src}
                  alt={need.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>

              {/* Text side */}
              <div className="flex flex-col justify-center flex-1 p-6 md:p-8">
                {/* Gold serif number */}
                <p
                  className="text-3xl mb-2"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    color: 'var(--color-gold)',
                  }}
                >
                  {need.number}
                </p>

                {/* Need title */}
                <h3
                  className="text-xl mb-3"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    color: 'var(--color-foreground)',
                  }}
                >
                  {need.title}
                </h3>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--color-muted)' }}
                >
                  {need.description}
                </p>
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
