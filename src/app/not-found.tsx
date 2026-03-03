import Link from 'next/link'

export default function NotFound() {
  return (
    <main
      className="min-h-screen flex items-center justify-center px-6 text-center"
      style={{ background: 'var(--color-background)' }}
    >
      <div>
        <p
          className="text-xs font-sans font-medium tracking-[0.2em] uppercase mb-6"
          style={{ color: 'var(--color-gold)' }}
        >
          404
        </p>
        <h1
          className="font-serif text-5xl mb-4 tracking-[-0.02em]"
          style={{ color: 'var(--color-foreground)' }}
        >
          Page not found
        </h1>
        <p className="mb-8" style={{ color: 'var(--color-muted)' }}>
          This page doesn&apos;t exist — let&apos;s get you back on track.
        </p>
        <Link
          href="/"
          className="text-sm transition-colors"
          style={{ color: 'var(--color-gold)' }}
        >
          ← Back to home
        </Link>
      </div>
    </main>
  )
}
