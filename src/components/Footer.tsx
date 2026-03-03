'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer
      className="border-t py-10 px-6 md:px-10 lg:px-16"
      style={{
        borderColor: 'var(--color-border)',
        background: 'color-mix(in srgb, var(--color-surface) 50%, transparent)',
      }}
    >
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <Link
            href="/"
            className="font-serif transition-colors"
            style={{ color: 'var(--color-foreground)' }}
          >
            Victor Palacios
          </Link>
          <p className="text-xs mt-1" style={{ color: 'var(--color-muted)' }}>
            Senior UX Consultant · Montreal
          </p>
        </div>

        <nav
          className="flex flex-wrap items-center justify-center gap-6 text-xs"
          style={{ color: 'var(--color-muted)' }}
          aria-label="Footer navigation"
        >
          <Link href="/work" className="hover:text-white transition-colors">Work</Link>
          <Link href="/about" className="hover:text-white transition-colors">About</Link>
          <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
          <a href="mailto:victpalacios@gmail.com" className="hover:text-white transition-colors">
            victpalacios@gmail.com
          </a>
          <a
            href="https://www.linkedin.com/in/victorpalacios/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            LinkedIn
          </a>
        </nav>

        <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
          © {new Date().getFullYear()} Victor Palacios
        </p>
      </div>
    </footer>
  )
}
