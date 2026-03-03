import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog — Victor Palacios',
  description: 'Thoughts on UX, product design, and working with complex systems.',
}

export default function BlogPage() {
  return (
    <main className="pt-28 px-6 md:px-10 lg:px-16 py-20">
      <div className="max-w-3xl mx-auto">
        <p
          className="text-xs font-sans font-medium tracking-[0.2em] uppercase mb-4"
          style={{ color: 'var(--color-gold)' }}
        >
          Blog
        </p>
        <h1
          className="font-serif text-5xl mb-6 tracking-[-0.02em]"
          style={{ color: 'var(--color-foreground)' }}
        >
          Writing
        </h1>
        <p className="leading-relaxed" style={{ color: 'var(--color-muted)' }}>
          Blog posts coming soon. In the meantime,{' '}
          <a
            href="https://www.linkedin.com/in/victorpalacios/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors"
            style={{ color: 'var(--color-gold)' }}
          >
            follow me on LinkedIn
          </a>{' '}
          for shorter-form thoughts on UX and product design.
        </p>
      </div>
    </main>
  )
}
