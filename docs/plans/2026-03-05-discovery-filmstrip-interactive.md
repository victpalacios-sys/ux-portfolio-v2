# Discovery Filmstrip Interactive Controls — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the broken CSS-only filmstrip with a Framer Motion engine that auto-scrolls, supports mouse drag and touch swipe on mobile, and adds prev/next arrow buttons.

**Architecture:** `useMotionValue(0)` drives the strip's x position. `useAnimationFrame` ticks it forward automatically when the user is not interacting. Pointer Events (onPointerDown/Move/Up) handle drag on both desktop and mobile. Prev/next buttons use Framer Motion's standalone `animate()` to spring-snap to the nearest card boundary. The CSS `@keyframes` block in globals.css is deleted — the JS layer replaces it entirely.

**Tech Stack:** Next.js 16, TypeScript, Framer Motion (`useMotionValue`, `useAnimationFrame`, `useReducedMotion`, `animate`, `motion`), Pointer Events API

---

### Task 1: Rewrite `DiscoveryFilmstrip.tsx`

**Files:**
- Modify: `src/components/charts/DiscoveryFilmstrip.tsx` (full replacement)

**Step 1: Replace the entire file with the new implementation**

Write `src/components/charts/DiscoveryFilmstrip.tsx` with exactly this content:

```tsx
'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useAnimationFrame, useReducedMotion, animate } from 'framer-motion'
import Image from 'next/image'

const CARD_WIDTH = 232 // 220px photo + 12px gap

const photos = [
  {
    src: '/images/distribution-networks-discovery-1.jpg',
    caption: 'Searching for risers at the top of the building',
    rotation: -2.5,
  },
  {
    src: '/images/distribution-networks-discovery-2.jpg',
    caption: 'Existing floor plans on the walls reveal clues',
    rotation: 1.5,
  },
  {
    src: '/images/distribution-networks-discovery-3.jpg',
    caption: 'Fire dept. plans fill the gaps',
    rotation: -1.5,
  },
  {
    src: '/images/distribution-networks-discovery-4.jpg',
    caption: 'Navigating complex mechanical rooms to find answers',
    rotation: 2.5,
  },
  {
    src: '/images/distribution-networks-discovery-5.jpg',
    caption: 'Locating water pump infrastructure',
    rotation: -2.0,
  },
  {
    src: '/images/distribution-networks-discovery-6.jpg',
    caption: "Building manager's computer holds clues",
    rotation: 1.8,
  },
  {
    src: '/images/distribution-networks-discovery-7.jpg',
    caption: 'Tracking down the pull box — 30 min search',
    rotation: -1.2,
  },
  {
    src: '/images/distribution-networks-discovery-8.jpg',
    caption: 'Checking garbage chutes, drop ceilings & closets',
    rotation: 2.2,
  },
  {
    src: '/images/distribution-networks-discovery-9.jpg',
    caption: 'Documenting each distribution cabinet (5 min per floor)',
    rotation: -1.8,
  },
  {
    src: '/images/distribution-networks-discovery-10.jpg',
    caption: 'Noting screw types & conduits for the installation crew',
    rotation: 1.2,
  },
  {
    src: '/images/distribution-networks-discovery-11.jpg',
    caption: 'Tablet rotates 180° in lanyard holder — unexpected friction',
    rotation: -2.2,
  },
  {
    src: '/images/distribution-networks-discovery-12.jpg',
    caption: 'Autocorrect mangles technical terms — more lost time',
    rotation: 1.5,
  },
]

const HALF_WIDTH = photos.length * CARD_WIDTH // 12 × 232 = 2784

// Duplicate for seamless infinite loop
const filmStrip = [...photos, ...photos]

export default function DiscoveryFilmstrip() {
  const prefersReducedMotion = useReducedMotion()
  const x = useMotionValue(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const isInteracting = useRef(false)
  const pointerStart = useRef({ clientX: 0, startX: 0 })

  // Auto-scroll: ~30px/sec, skipped when user is interacting or prefers reduced motion
  useAnimationFrame((_, delta) => {
    if (isInteracting.current || prefersReducedMotion) return
    const clamped = Math.min(delta, 32) // cap at ~2 frames to avoid jump on tab refocus
    let next = x.get() - clamped * 0.03
    if (next <= -HALF_WIDTH) next += HALF_WIDTH
    x.set(next)
  })

  // Pointer Events — covers mouse drag (desktop) and touch swipe (mobile)
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isInteracting.current = true
    pointerStart.current = { clientX: e.clientX, startX: x.get() }
    e.currentTarget.setPointerCapture(e.pointerId)
    if (trackRef.current) trackRef.current.style.cursor = 'grabbing'
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isInteracting.current) return
    const dx = e.clientX - pointerStart.current.clientX
    x.set(pointerStart.current.startX + dx)
  }

  const handlePointerUp = () => {
    isInteracting.current = false
    if (trackRef.current) trackRef.current.style.cursor = 'grab'
    // Normalise x back into [-HALF_WIDTH, 0) range
    let current = x.get()
    while (current > 0) current -= HALF_WIDTH
    while (current <= -HALF_WIDTH) current += HALF_WIDTH
    x.set(current)
  }

  // Prev button: spring-snap one card to the right
  const goToPrev = () => {
    isInteracting.current = true
    const current = x.get()
    const snapped = Math.round(current / CARD_WIDTH) * CARD_WIDTH
    let target = snapped + CARD_WIDTH
    // If target would be positive, jump x by -HALF_WIDTH first (seamless — duplicates are identical)
    if (target > 0) {
      x.set(x.get() - HALF_WIDTH)
      target -= HALF_WIDTH
    }
    animate(x, target, {
      type: 'spring',
      stiffness: 400,
      damping: 35,
      onComplete: () => {
        isInteracting.current = false
      },
    })
  }

  // Next button: spring-snap one card to the left
  const goToNext = () => {
    isInteracting.current = true
    const current = x.get()
    const snapped = Math.round(current / CARD_WIDTH) * CARD_WIDTH
    const target = snapped - CARD_WIDTH
    animate(x, target, {
      type: 'spring',
      stiffness: 400,
      damping: 35,
      onComplete: () => {
        // Normalise if we've passed the loop boundary
        const final = x.get()
        if (final <= -HALF_WIDTH) x.set(final + HALF_WIDTH)
        isInteracting.current = false
      },
    })
  }

  return (
    <div
      className="mt-6"
      role="img"
      aria-label="Field research photos from distribution network discovery sessions"
    >
      {/* Outer container — clips the track, holds gradient fades + buttons */}
      <div
        className="relative overflow-hidden rounded-xl"
        style={{ background: 'var(--color-surface-2)' }}
      >
        {/* Left gradient fade */}
        <div
          className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, var(--color-surface-2), transparent)' }}
          aria-hidden="true"
        />

        {/* Right gradient fade */}
        <div
          className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, var(--color-surface-2), transparent)' }}
          aria-hidden="true"
        />

        {/* Scrolling track */}
        <motion.div
          ref={trackRef}
          style={{
            x,
            display: 'flex',
            width: 'max-content',
            gap: '12px',
            padding: '16px 12px',
            cursor: 'grab',
            touchAction: 'none',
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {filmStrip.map((photo, index) => {
            const isDuplicate = index >= photos.length
            return (
              <div
                key={`filmstrip-${index}`}
                className="relative flex-none rounded-lg overflow-hidden"
                style={{ width: '220px', height: '270px' }}
                aria-hidden={isDuplicate || undefined}
              >
                {/* Photo */}
                <Image
                  src={photo.src}
                  alt={isDuplicate ? '' : photo.caption}
                  fill
                  className="object-cover"
                  sizes="220px"
                />

                {/* Post-it overlay — originals only */}
                {!isDuplicate && (
                  <div
                    className="absolute bottom-3 left-3 text-xs leading-snug px-2 py-1.5"
                    style={{
                      background: '#FFF7CC',
                      color: '#1a1a1a',
                      maxWidth: '130px',
                      transform: `rotate(${photo.rotation}deg)`,
                      boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                      borderRadius: '2px',
                    }}
                    aria-hidden="true"
                  >
                    {/* Pin dot */}
                    <div
                      className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
                      style={{ background: 'var(--color-gold)' }}
                      aria-hidden="true"
                    />
                    {photo.caption}
                  </div>
                )}
              </div>
            )
          })}
        </motion.div>

        {/* Prev / Next controls */}
        <div className="absolute bottom-3 right-3 z-20 flex gap-1">
          <button
            onClick={goToPrev}
            aria-label="Previous photo"
            className="flex items-center justify-center rounded-full transition-colors"
            style={{
              width: '40px',
              height: '40px',
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-muted)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--color-gold)'
              e.currentTarget.style.color = 'var(--color-gold)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--color-border)'
              e.currentTarget.style.color = 'var(--color-muted)'
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M9 1L3 7l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            aria-label="Next photo"
            className="flex items-center justify-center rounded-full transition-colors"
            style={{
              width: '40px',
              height: '40px',
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-muted)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--color-gold)'
              e.currentTarget.style.color = 'var(--color-gold)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--color-border)'
              e.currentTarget.style.color = 'var(--color-muted)'
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M5 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
```

**Step 2: Verify TypeScript**

Run: `npx tsc --noEmit` from `C:\dev\UXPortfolioV2`
Expected: zero errors

**Step 3: Commit**

```bash
git add src/components/charts/DiscoveryFilmstrip.tsx
git commit -m "feat: replace CSS filmstrip with Framer Motion engine — drag, swipe, prev/next controls"
```

---

### Task 2: Clean up `globals.css` + build + push

**Files:**
- Modify: `src/app/globals.css`

**Step 1: Remove the filmstrip CSS block**

Find and delete this entire block from `src/app/globals.css` (lines 19–34):

```css
/* DiscoveryFilmstrip — infinite horizontal scroll animation */
@keyframes filmstrip-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
.filmstrip-track {
  animation: filmstrip-scroll 50s linear infinite;
}
.filmstrip-track:hover {
  animation-play-state: paused;
}
@media (prefers-reduced-motion: reduce) {
  .filmstrip-track {
    animation-play-state: paused;
  }
}
```

After deletion, the file should go straight from the closing `}` of `@theme { ... }` to `@layer base {` (with one blank line between):

```css
  --max-width-content: 1200px;
}

@layer base {
```

**Step 2: Verify TypeScript**

Run: `npx tsc --noEmit`
Expected: zero errors

**Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "refactor: remove filmstrip CSS — animation now handled by Framer Motion"
```

**Step 4: Production build**

Run: `npx next build` from `C:\dev\UXPortfolioV2`
Expected: `✓ Compiled successfully` — all 13 pages

**Step 5: Push**

```bash
git push
```

**Step 6: Verify live**

Visit `https://ux-portfolio-v2.vercel.app/work/distribution-networks` → Discovery section:
- Strip auto-scrolls smoothly at ~30px/sec
- Mouse drag (desktop) pauses auto-scroll, moves strip, resumes on release
- Touch swipe (mobile) moves strip
- ← and → buttons in bottom-right spring-snap one card at a time
- Buttons turn gold on hover
- No console errors
