'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--color-background)]/95 backdrop-blur-sm border-b border-[var(--color-border)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-[1200px] mx-auto flex items-center justify-between h-16 px-6 md:px-10 lg:px-16">
        {/* Logo */}
        <Link
          href="/"
          className="font-serif text-lg transition-colors"
          style={{ color: 'var(--color-foreground)' }}
          onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) =>
            (e.currentTarget.style.color = 'var(--color-gold)')
          }
          onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) =>
            (e.currentTarget.style.color = 'var(--color-foreground)')
          }
        >
          Victor Palacios
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {['Work', 'About', 'Blog'].map(link => (
            <Link
              key={link}
              href={`/${link.toLowerCase()}`}
              className="text-sm transition-colors"
              style={{ color: 'var(--color-muted)' }}
              onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) =>
                (e.currentTarget.style.color = 'var(--color-foreground)')
              }
              onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) =>
                (e.currentTarget.style.color = 'var(--color-muted)')
              }
            >
              {link}
            </Link>
          ))}
          <a
            href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ133_yypE3yVbKay8QDsmXVGrhtn5z9zoLZPtQNfbALcn0qNTwL7-iMMwu53VSfY911u5kfYIA6"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium px-4 py-2 rounded-full transition-colors"
            style={{ background: 'var(--color-gold)', color: 'var(--color-background)' }}
            onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) =>
              (e.currentTarget.style.background = 'var(--color-gold-light)')
            }
            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) =>
              (e.currentTarget.style.background = 'var(--color-gold)')
            }
          >
            Book a Call →
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-px w-6 transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
            style={{ background: 'var(--color-foreground)' }}
          />
          <span
            className={`block h-px w-6 transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`}
            style={{ background: 'var(--color-foreground)' }}
          />
          <span
            className={`block h-px w-6 transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
            style={{ background: 'var(--color-foreground)' }}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden border-b px-6 py-6 flex flex-col gap-4"
          style={{
            background: 'var(--color-surface)',
            borderColor: 'var(--color-border)',
          }}
        >
          {['Work', 'About', 'Blog'].map(link => (
            <Link
              key={link}
              href={`/${link.toLowerCase()}`}
              className="text-sm"
              style={{ color: 'var(--color-muted)' }}
              onClick={() => setMenuOpen(false)}
            >
              {link}
            </Link>
          ))}
          <a
            href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ133_yypE3yVbKay8QDsmXVGrhtn5z9zoLZPtQNfbALcn0qNTwL7-iMMwu53VSfY911u5kfYIA6"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium px-4 py-2 rounded-full text-center"
            style={{ background: 'var(--color-gold)', color: 'var(--color-background)' }}
            onClick={() => setMenuOpen(false)}
          >
            Book a Call →
          </a>
        </div>
      )}
    </header>
  )
}
