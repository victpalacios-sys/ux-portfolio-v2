import WorkCard from '@/components/WorkCard'
import { caseStudies } from '@/data/caseStudies'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Work — Victor Palacios',
  description:
    'UX case studies across enterprise software, consumer apps, mobile hardware, and construction tech.',
}

export default function WorkPage() {
  return (
    <main className="pt-28 px-6 md:px-10 lg:px-16 py-20">
      <div className="max-w-[1200px] mx-auto">
        <p
          className="text-xs font-sans font-medium tracking-[0.2em] uppercase mb-4"
          style={{ color: 'var(--color-gold)' }}
        >
          Work
        </p>
        <h1
          className="font-serif text-5xl md:text-6xl mb-4 tracking-[-0.02em]"
          style={{ color: 'var(--color-foreground)' }}
        >
          All Projects
        </h1>
        <p
          className="mb-16 max-w-lg leading-relaxed"
          style={{ color: 'var(--color-muted)' }}
        >
          25 years of UX work across industries. Every project begins with a problem that matters.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {caseStudies.map((study, i) => (
            <WorkCard key={study.slug} study={study} index={i} />
          ))}
        </div>
      </div>
    </main>
  )
}
