import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getCaseStudy, caseStudies } from '@/data/caseStudies'
import FloatingCTA from '@/components/FloatingCTA'
import type { Metadata } from 'next'
import MarketSegmentsChart from '@/components/charts/MarketSegmentsChart'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const study = getCaseStudy(slug)
  if (!study) return {}
  return {
    title: `${study.title} — Victor Palacios`,
    description: study.outcome,
  }
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const study = getCaseStudy(slug)
  if (!study) notFound()

  const currentIndex = caseStudies.findIndex((c) => c.slug === slug)
  const prev = currentIndex > 0 ? caseStudies[currentIndex - 1] : null
  const next = currentIndex < caseStudies.length - 1 ? caseStudies[currentIndex + 1] : null

  const contextItems = [
    { label: 'Client', value: study.client },
    { label: 'Role', value: study.role },
    { label: 'Year', value: study.year },
    { label: 'Tools', value: study.tools },
  ]

  return (
    <>
      <FloatingCTA />
      <main className="pt-24">
        {/* Header */}
        <div className="px-6 md:px-10 lg:px-16 pt-12 pb-0">
          <div className="max-w-[1200px] mx-auto">
            <Link
              href="/work"
              className="inline-block text-xs font-sans font-medium tracking-[0.2em] uppercase mb-8 transition-colors"
              style={{ color: 'var(--color-muted)' }}
            >
              ← All Work
            </Link>
            <p
              className="text-xs font-sans font-medium tracking-[0.2em] uppercase block mb-4"
              style={{ color: 'var(--color-gold)' }}
            >
              {study.tag}
            </p>
            <h1
              className="font-serif text-4xl md:text-5xl lg:text-6xl max-w-3xl mb-6 tracking-[-0.02em]"
              style={{ color: 'var(--color-foreground)' }}
            >
              {study.title}
            </h1>
            <p
              className="text-lg max-w-2xl mb-12 leading-relaxed"
              style={{ color: 'var(--color-muted)' }}
            >
              {study.outcome}
            </p>

            {/* Context strip */}
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t pt-8 mb-12"
              style={{ borderColor: 'var(--color-border)' }}
            >
              {contextItems.map(({ label, value }) => (
                <div key={label}>
                  <p
                    className="text-xs font-sans font-medium tracking-[0.2em] uppercase mb-1"
                    style={{ color: 'var(--color-gold)' }}
                  >
                    {label}
                  </p>
                  <p className="text-sm" style={{ color: 'var(--color-foreground)' }}>
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hero image */}
        <div
          className="relative w-full overflow-hidden"
          style={{
            height: '600px',
            maxHeight: '70vh',
            background: 'var(--color-surface-2)',
          }}
        >
          <Image
            src={study.coverImage}
            alt={study.title}
            fill
            className="object-contain"
          />
        </div>

        {/* Body */}
        <div className="px-6 md:px-10 lg:px-16 py-20">
          <div className="max-w-3xl mx-auto">
            {study.sections.length > 0 ? (
              study.sections.map((section) => (
                <div key={section.heading} className="mb-12">
                  <h2
                    className="font-serif text-2xl mb-4"
                    style={{ color: 'var(--color-foreground)' }}
                  >
                    {section.heading}
                  </h2>
                  <p
                    className="leading-relaxed"
                    style={{ color: 'var(--color-muted)' }}
                  >
                    {section.body}
                  </p>
                  {section.chartComponent === 'market-segments' ? (
                    <MarketSegmentsChart />
                  ) : section.image ? (
                    <div
                      className="relative mt-6 rounded-xl overflow-hidden"
                      style={{
                        height: '400px',
                        background: 'var(--color-surface-2)',
                      }}
                    >
                      <Image
                        src={section.image}
                        alt={section.imageAlt ?? section.heading}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : null}
                </div>
              ))
            ) : (
              <div
                className="rounded-2xl p-8 border text-center"
                style={{
                  background: 'var(--color-surface)',
                  borderColor: 'var(--color-border)',
                }}
              >
                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{ color: 'var(--color-muted)' }}
                >
                  Full case study details available on request — book a discovery call to
                  discuss this project in depth.
                </p>
                <a
                  href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ133_yypE3yVbKay8QDsmXVGrhtn5z9zoLZPtQNfbALcn0qNTwL7-iMMwu53VSfY911u5kfYIA6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-sans font-medium px-6 py-3 rounded-full text-sm"
                  style={{ background: 'var(--color-gold)', color: 'var(--color-background)' }}
                >
                  Book a Discovery Call →
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Project navigation */}
        <div
          className="border-t px-6 md:px-10 lg:px-16 py-12"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <div className="max-w-[1200px] mx-auto flex justify-between items-center">
            {prev ? (
              <Link
                href={`/work/${prev.slug}`}
                className="flex items-center gap-3 transition-colors"
                style={{ color: 'var(--color-muted)' }}
              >
                <span style={{ color: 'var(--color-gold)' }}>←</span>
                <div>
                  <p
                    className="text-xs font-sans font-medium tracking-[0.2em] uppercase mb-0.5"
                    style={{ color: 'var(--color-gold)' }}
                  >
                    Previous
                  </p>
                  <p className="text-sm font-serif" style={{ color: 'var(--color-foreground)' }}>
                    {prev.title}
                  </p>
                </div>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                href={`/work/${next.slug}`}
                className="flex items-center gap-3 text-right transition-colors"
                style={{ color: 'var(--color-muted)' }}
              >
                <div>
                  <p
                    className="text-xs font-sans font-medium tracking-[0.2em] uppercase mb-0.5"
                    style={{ color: 'var(--color-gold)' }}
                  >
                    Next
                  </p>
                  <p className="text-sm font-serif" style={{ color: 'var(--color-foreground)' }}>
                    {next.title}
                  </p>
                </div>
                <span style={{ color: 'var(--color-gold)' }}>→</span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </main>
    </>
  )
}
