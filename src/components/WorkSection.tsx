import Link from 'next/link'
import WorkCard from './WorkCard'
import { featuredCaseStudies } from '@/data/caseStudies'

export default function WorkSection() {
  return (
    <section
      id="work"
      className="px-6 md:px-10 lg:px-16 py-20 border-t"
      style={{
        borderColor: 'var(--color-border)',
        scrollMarginTop: '4rem',
      }}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p
              className="text-xs font-sans font-medium tracking-[0.2em] uppercase mb-4"
              style={{ color: 'var(--color-gold)' }}
            >
              Selected Work
            </p>
            <h2
              className="font-serif text-4xl md:text-5xl max-w-lg tracking-[-0.01em]"
              style={{ color: 'var(--color-foreground)' }}
            >
              Projects that shaped complex products
            </h2>
          </div>
          <Link
            href="/work"
            className="hidden md:flex items-center gap-2 text-sm transition-colors"
            style={{ color: 'var(--color-muted)' }}
          >
            All projects
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredCaseStudies.map((study, i) => (
            <WorkCard key={study.slug} study={study} index={i} />
          ))}
        </div>

        <div className="mt-8 md:hidden">
          <Link
            href="/work"
            className="text-sm flex items-center gap-2 transition-colors"
            style={{ color: 'var(--color-muted)' }}
          >
            All projects →
          </Link>
        </div>
      </div>
    </section>
  )
}
