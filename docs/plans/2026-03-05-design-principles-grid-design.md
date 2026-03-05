# Design Principles Grid — Design Document

**Date:** 2026-03-05
**Status:** Approved

## Goal

Replace the static affinity-map PNG in the "Design Principles" section of the Distribution Networks case study with an animated 2×3 card grid that presents the 6 final design principles in a bold, legible, premium format.

## Design Decisions

- **Goal:** Show the 6 final principles (clean outcome presentation, not the research process)
- **Weight:** Bold cards with generous spacing — principles read as a design manifesto
- **Animation:** Staggered entrance on scroll (Framer Motion `useInView`)
- **Card style:** Gold left-accent cards (Option A)

## Component

**File:** `src/components/charts/DesignPrinciplesGrid.tsx`
- `'use client'` (Framer Motion)
- Self-contained, no props, data hardcoded

## Data

```typescript
const principles = [
  { number: '01', name: 'Easy to Use',                 description: 'Accessible for beginners without penalising experts.' },
  { number: '02', name: 'Fast Path to Success',        description: 'From zero to a working design as quickly as possible.' },
  { number: '03', name: 'Progressive Mastery',         description: 'A clear path from novice to advanced.' },
  { number: '04', name: 'Company Expertise Built In',  description: 'Best practices encoded in the tool, not left implicit.' },
  { number: '05', name: 'Delight',                     description: 'Visual quality and feature richness both matter.' },
  { number: '06', name: 'Fast Delivery',               description: 'Ship value quickly and iterate.' },
]
```

## Visual Specs

### Grid Layout
- `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`, `gap-4`, `mt-6`

### Card
- Background: `var(--color-surface)` (`#111111`)
- Border: `1px solid var(--color-border)` on top/right/bottom; `3px solid var(--color-gold)` on left
- Border-radius: `rounded-xl`
- Padding: `p-6`

### Card Interior (top to bottom)
1. **Number** — `"01"`–`"06"`, `font-family: var(--font-serif)`, `text-3xl`, `var(--color-gold)`, `mb-3`
2. **Principle name** — `var(--font-serif)`, `text-lg`, `var(--color-foreground)`, `mb-2`
3. **Description** — `var(--font-sans)`, `text-sm`, `var(--color-muted)`, `leading-relaxed`

## Animation

- `useRef<HTMLDivElement>(null)` on the outer grid `<div>`
- `useInView(ref, { once: true, margin: '-100px' })`
- Each card is a `motion.div`:
  - `initial={{ opacity: 0, y: 20 }}`
  - `animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}`
  - `transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}`

## Integration (3-file pattern)

### `src/data/caseStudies.ts`
1. Extend union: `chartComponent?: 'market-segments' | 'discovery-filmstrip' | 'design-principles'`
2. Swap Design Principles section — remove `image`/`imageAlt`, add `chartComponent: 'design-principles'`

### `src/app/work/[slug]/page.tsx`
1. Add `import DesignPrinciplesGrid from '@/components/charts/DesignPrinciplesGrid'`
2. Add `=== 'design-principles'` branch to the render conditional (between `discovery-filmstrip` and `section.image` branches)

## Accessibility
- Outer container: `role="list"`, `aria-label="Design principles"`
- Each card: `role="listitem"`
- No images — pure text content, fully accessible without special handling
