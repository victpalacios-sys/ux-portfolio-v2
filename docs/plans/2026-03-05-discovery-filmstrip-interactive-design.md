# Discovery Filmstrip — Interactive Controls Design Document

**Date:** 2026-03-05
**Status:** Approved

## Problem

The current filmstrip has two issues:
1. No manual control — users cannot go back/forward, only wait for auto-scroll
2. Mobile broken — `width: max-content` inside `overflow: hidden` is constrained by iOS Safari, making `translateX` have nowhere to go

## Solution

Replace the CSS `@keyframes` animation with a Framer Motion `useMotionValue` + `useAnimationFrame` engine. Add Pointer Events drag (desktop + mobile) and prev/next arrow buttons.

## Constants

```typescript
const CARD_WIDTH = 232   // 220px photo + 12px gap
const HALF_WIDTH = photos.length * CARD_WIDTH  // 12 × 232 = 2784px
```

## Animation Engine

- `x = useMotionValue(0)` — single source of truth for strip position
- `useAnimationFrame((_, delta) => { ... })` — auto-increments x each frame:
  - Skip if `isInteracting.current` is true
  - Skip if `prefersReducedMotion` is true (via `useReducedMotion()`)
  - Cap delta at 32ms to prevent big jumps on tab refocus
  - Speed: `delta * 0.03` ≈ 30px/sec
  - Infinite loop: `if (next <= -HALF_WIDTH) next += HALF_WIDTH`

## Drag / Swipe (Pointer Events)

Uses native Pointer Events API (covers mouse + touch, no separate touch handlers needed):

- `onPointerDown`: record `e.clientX` + current `x.get()`, call `setPointerCapture`, set cursor to `grabbing`, set `isInteracting = true`
- `onPointerMove`: `x.set(startX + (e.clientX - startClientX))`
- `onPointerUp` / `onPointerCancel`: release, set cursor to `grab`, set `isInteracting = false`, normalize x:
  ```
  while (current > 0) current -= HALF_WIDTH
  while (current <= -HALF_WIDTH) current += HALF_WIDTH
  x.set(current)
  ```
- Track element: `touch-action: none` (prevents browser hijacking touch for page scroll)

## Prev / Next Buttons

Snap logic uses `Math.round(current / CARD_WIDTH) * CARD_WIDTH` to find the nearest card boundary, then ± `CARD_WIDTH`.

**goToNext** (move strip left, show next photo):
```typescript
const snapped = Math.round(x.get() / CARD_WIDTH) * CARD_WIDTH
const target = snapped - CARD_WIDTH
animate(x, target, { type: 'spring', stiffness: 400, damping: 35,
  onComplete: () => {
    if (x.get() <= -HALF_WIDTH) x.set(x.get() + HALF_WIDTH)
    isInteracting.current = false
  }
})
```

**goToPrev** (move strip right, show previous photo):
```typescript
const snapped = Math.round(x.get() / CARD_WIDTH) * CARD_WIDTH
let target = snapped + CARD_WIDTH
if (target > 0) {
  x.set(x.get() - HALF_WIDTH)  // seamless jump (duplicates = same visuals)
  target -= HALF_WIDTH
}
animate(x, target, { type: 'spring', stiffness: 400, damping: 35,
  onComplete: () => { isInteracting.current = false }
})
```

Both buttons set `isInteracting.current = true` before calling `animate`.

## Button Visual Design

Permanently visible in the **bottom-right corner** of the filmstrip container (`absolute bottom-3 right-3 z-20`):

- Two `40×40px` circular buttons, `flex gap-1`
- Normal state: `var(--color-surface)` bg, `1px solid var(--color-border)` border, `var(--color-muted)` SVG arrow
- Hover state: `1px solid var(--color-gold)` border, `var(--color-gold)` SVG arrow
- Arrow SVGs: left `←` and right `→` (14×14px path)
- `aria-label="Previous photo"` / `aria-label="Next photo"`

## Track Element

```tsx
<motion.div
  ref={trackRef}
  style={{ x, display: 'flex', width: 'max-content', gap: '12px', padding: '16px 12px', cursor: 'grab' }}
  onPointerDown={handlePointerDown}
  onPointerMove={handlePointerMove}
  onPointerUp={handlePointerUp}
  onPointerCancel={handlePointerUp}
>
```

## globals.css Cleanup

Remove the following (no longer needed — JS handles everything):
- `@keyframes filmstrip-scroll { ... }`
- `.filmstrip-track { animation: ... }`
- `.filmstrip-track:hover { animation-play-state: paused }`
- `@media (prefers-reduced-motion: reduce) { .filmstrip-track { ... } }`

## Files Changed

1. `src/components/charts/DiscoveryFilmstrip.tsx` — full rewrite of the component logic
2. `src/app/globals.css` — remove filmstrip CSS block
