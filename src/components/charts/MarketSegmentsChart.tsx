'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const segments = [
  {
    name: 'Small Projects',
    complexity: 'Low Complexity',
    value: '$100B',
    widthPct: 100,
    isTarget: true,
  },
  {
    name: 'Medium Projects',
    complexity: 'Mid Complexity',
    value: '$33B',
    widthPct: 33,
    isTarget: false,
  },
  {
    name: 'Complex Projects',
    complexity: 'High Complexity',
    value: '$10B',
    widthPct: 10,
    isTarget: false,
  },
]

export default function MarketSegmentsChart() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div
      ref={ref}
      className="mt-6 rounded-xl p-6 md:p-8"
      style={{ background: 'var(--color-surface-2)' }}
    >
      <div className="flex flex-col gap-6">
        {segments.map((seg, i) => (
          <div
            key={seg.name}
            className="flex items-start gap-4 pl-3 border-l-2"
            style={{
              borderColor: seg.isTarget ? 'var(--color-gold)' : 'transparent',
            }}
          >
            {/* Label column */}
            <div className="w-36 flex-shrink-0 pt-1">
              <p
                className="text-sm font-sans font-medium leading-tight"
                style={{ color: 'var(--color-foreground)' }}
              >
                {seg.name}
              </p>
              <p
                className="text-xs font-sans mt-0.5"
                style={{ color: 'var(--color-muted)' }}
              >
                {seg.complexity}
              </p>
            </div>

            {/* Bar + value */}
            <div className="flex-1 flex items-center gap-3 pt-2">
              <div
                className="flex-1 h-5 rounded-full overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.06)' }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: seg.isTarget
                      ? 'var(--color-gold)'
                      : 'rgba(201,168,76,0.35)',
                  }}
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${seg.widthPct}%` } : { width: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: i * 0.15 }}
                />
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <span
                  className="text-sm font-sans tabular-nums"
                  style={{
                    color: 'var(--color-foreground)',
                    minWidth: '3.5rem',
                    textAlign: 'right',
                  }}
                >
                  {seg.value}
                </span>
                {seg.isTarget && (
                  <span
                    className="text-xs font-sans font-medium tracking-[0.12em] uppercase px-2 py-0.5 rounded-full border"
                    style={{
                      color: 'var(--color-gold)',
                      borderColor: 'var(--color-gold)',
                    }}
                  >
                    UX Target
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Axis label */}
      <p
        className="mt-6 text-xs font-sans"
        style={{ color: 'var(--color-muted)' }}
      >
        ← Less Complex · More Accessible
      </p>
    </div>
  )
}
