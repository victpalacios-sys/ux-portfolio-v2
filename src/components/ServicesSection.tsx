'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const services = [
  {
    icon: '◎',
    title: 'UX Strategy & Research',
    description:
      'Uncover what your users actually need. Discovery sprints, user interviews, and competitive analysis to turn ambiguity into a clear product direction.',
  },
  {
    icon: '⬡',
    title: 'Product Design & Systems',
    description:
      'From wireframes to high-fidelity UI and design systems. Interfaces that scale — with components your team can own and evolve.',
  },
  {
    icon: '△',
    title: 'UX Audits & Team Coaching',
    description:
      'An outside perspective on what\u2019s broken and why. Audit existing products and coach design teams to level up their process and output.',
  },
]

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0]
  index: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="p-8 rounded-2xl border transition-colors"
      style={{
        background: 'var(--color-surface)',
        borderColor: 'var(--color-border)',
      }}
    >
      <span
        className="text-2xl mb-6 block"
        style={{ color: 'var(--color-gold)' }}
        aria-hidden="true"
      >
        {service.icon}
      </span>
      <h3
        className="font-serif text-xl mb-3"
        style={{ color: 'var(--color-foreground)' }}
      >
        {service.title}
      </h3>
      <p
        className="text-sm leading-relaxed"
        style={{ color: 'var(--color-muted)' }}
      >
        {service.description}
      </p>
    </motion.div>
  )
}

export default function ServicesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="px-6 md:px-10 lg:px-16 py-20"
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
            Services
          </p>
          <h2
            className="font-serif text-4xl md:text-5xl max-w-2xl mb-12 tracking-[-0.01em]"
            style={{ color: 'var(--color-foreground)' }}
          >
            What I can do for your team
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
