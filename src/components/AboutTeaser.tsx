'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function AboutTeaser() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="px-6 md:px-10 lg:px-16 py-20 border-t"
      style={{ borderColor: 'var(--color-border)' }}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-2xl overflow-hidden max-w-sm mx-auto md:mx-0"
            style={{ aspectRatio: '3/4', background: 'var(--color-surface-2)' }}
          >
            <Image
              src="https://static.wixstatic.com/media/9d26ae_1e501f86745f49179044289b9b7f730d~mv2.jpg/v1/crop/x_76,y_0,w_348,h_544/fill/w_417,h_653,al_c,lg_1,q_80,enc_avif,quality_auto/Victor%20Selfie_edited.jpg"
              alt="Victor Palacios"
              fill
              className="object-cover"
            />
            <div
              className="absolute inset-0 rounded-2xl"
              style={{ boxShadow: 'inset 0 0 0 1px color-mix(in srgb, var(--color-gold) 10%, transparent)' }}
            />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              className="text-xs font-sans font-medium tracking-[0.2em] uppercase mb-6"
              style={{ color: 'var(--color-gold)' }}
            >
              About
            </p>
            <h2
              className="font-serif text-4xl md:text-5xl mb-6 tracking-[-0.01em]"
              style={{ color: 'var(--color-foreground)' }}
            >
              25 years of making software make sense
            </h2>
            <p
              className="leading-relaxed mb-4"
              style={{ color: 'var(--color-muted)' }}
            >
              I&apos;ve been practicing UX since 2000, when I joined Nokia and made a pivotal shift
              from engineering into design. Since then I&apos;ve worked across mobile hardware,
              enterprise B2B software, construction tech, fintech, and more.
            </p>
            <p
              className="leading-relaxed mb-8"
              style={{ color: 'var(--color-muted)' }}
            >
              I&apos;m based in Montreal, work remotely with teams worldwide, and believe that the
              best design work happens when you understand the domain deeply before designing anything.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm transition-colors"
              style={{ color: 'var(--color-gold)' }}
            >
              Read more about me
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path
                  d="M1 7h12M7 1l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
