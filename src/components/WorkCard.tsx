'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { CaseStudy } from '@/data/caseStudies'

export default function WorkCard({
  study,
  index,
}: {
  study: CaseStudy
  index: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/work/${study.slug}`}
        className="group block rounded-2xl overflow-hidden border transition-colors"
        style={{
          background: 'var(--color-surface)',
          borderColor: 'var(--color-border)',
        }}
      >
        {/* Image */}
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9', background: 'var(--color-surface-2)' }}>
          <Image
            src={study.coverImage}
            alt={study.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, color-mix(in srgb, var(--color-surface) 60%, transparent), transparent)' }}
          />
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <span
              className="text-xs font-sans font-medium tracking-[0.2em] uppercase"
              style={{ color: 'var(--color-gold)' }}
            >
              {study.tag}
            </span>
            <span className="text-xs" style={{ color: 'var(--color-muted)' }}>
              {study.year}
            </span>
          </div>
          <h3
            className="font-serif text-xl mb-2 transition-colors"
            style={{ color: 'var(--color-foreground)' }}
          >
            {study.title}
          </h3>
          <p
            className="text-sm leading-relaxed mb-4"
            style={{ color: 'var(--color-muted)' }}
          >
            {study.outcome}
          </p>
          <span
            className="text-xs flex items-center gap-1.5"
            style={{ color: 'var(--color-gold)' }}
          >
            View case study
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path
                d="M1 6h10M5.5 1L11 6l-5.5 5"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </Link>
    </motion.div>
  )
}
