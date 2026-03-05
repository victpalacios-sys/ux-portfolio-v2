# Design Principles Grid Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the static principles PNG in the Distribution Networks case study with an animated 2×3 card grid that reveals each principle on scroll.

**Architecture:** A self-contained `'use client'` component (`DesignPrinciplesGrid.tsx`) using Framer Motion `useInView` for staggered entrance. Follows the identical 3-file integration pattern as `MarketSegmentsChart` and `DiscoveryFilmstrip` — extend the `chartComponent` union in `caseStudies.ts`, swap the section data, import and wire in `work/[slug]/page.tsx`.

**Tech Stack:** Next.js 16 App Router, TypeScript, Tailwind v4, Framer Motion (`motion`, `useInView`, `useRef`)

---

### Task 1: Create `DesignPrinciplesGrid.tsx`

**Files:**
- Create: `src/components/charts/DesignPrinciplesGrid.tsx`

**Step 1: Write the complete file**

Create `src/components/charts/DesignPrinciplesGrid.tsx` with exactly this content:

```tsx
'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const principles = [
  {
    number: '01',
    name: 'Easy to Use',
    description: 'Accessible for beginners without penalising experts.',
  },
  {
    number: '02',
    name: 'Fast Path to Success',
    description: 'From zero to a working design as quickly as possible.',
  },
  {
    number: '03',
    name: 'Progressive Mastery',
    description: 'A clear path from novice to advanced.',
  },
  {
    number: '04',
    name: 'Company Expertise Built In',
    description: 'Best practices encoded in the tool, not left implicit.',
  },
  {
    number: '05',
    name: 'Delight',
    description: 'Visual quality and feature richness both matter.',
  },
  {
    number: '06',
    name: 'Fast Delivery',
    description: 'Ship value quickly and iterate.',
  },
]

export default function DesignPrinciplesGrid() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <div
      ref={ref}
      className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      role="list"
      aria-label="Design principles"
    >
      {principles.map((principle, index) => (
        <motion.div
          key={principle.number}
          role="listitem"
          className="rounded-xl p-6"
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderLeft: '3px solid var(--color-gold)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
        >
          <p
            className="text-3xl mb-3"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-gold)' }}
          >
            {principle.number}
          </p>
          <p
            className="text-lg mb-2"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-foreground)' }}
          >
            {principle.name}
          </p>
          <p
            className="text-sm leading-relaxed"
            style={{ color: 'var(--color-muted)' }}
          >
            {principle.description}
          </p>
        </motion.div>
      ))}
    </div>
  )
}
```

**Step 2: Verify TypeScript**

Run: `npx tsc --noEmit` from `C:\dev\UXPortfolioV2`
Expected: zero errors, zero output

**Step 3: Commit**

```bash
git add src/components/charts/DesignPrinciplesGrid.tsx
git commit -m "feat: add DesignPrinciplesGrid component — staggered card grid with gold left-accent"
```

---

### Task 2: Update `caseStudies.ts` — extend type + swap Design Principles section

**Files:**
- Modify: `src/data/caseStudies.ts`

**Step 1: Extend the `chartComponent` union type**

Find (line ~8 inside the `CaseStudySection` interface):
```typescript
  chartComponent?: 'market-segments' | 'discovery-filmstrip'
```
Replace with:
```typescript
  chartComponent?: 'market-segments' | 'discovery-filmstrip' | 'design-principles'
```

**Step 2: Swap the Design Principles section**

Find (the "Design Principles" section, around lines 60–66):
```typescript
      {
        heading: 'Design Principles',
        body: 'Six principles guided every decision: easy to use — accessible for beginners without penalising experts; fast path to success — from zero to a working design as quickly as possible; progressive mastery — a clear path from novice to advanced; company expertise built in — best practices encoded in the tool, not left implicit; delight — visual quality and feature richness both matter; fast delivery — ship value quickly and iterate.',
        image:
          '/images/distribution-networks-section-principles.png',
        imageAlt: 'Design principles diagram',
      },
```
Replace with:
```typescript
      {
        heading: 'Design Principles',
        body: 'Six principles guided every decision: easy to use — accessible for beginners without penalising experts; fast path to success — from zero to a working design as quickly as possible; progressive mastery — a clear path from novice to advanced; company expertise built in — best practices encoded in the tool, not left implicit; delight — visual quality and feature richness both matter; fast delivery — ship value quickly and iterate.',
        chartComponent: 'design-principles',
      },
```

**Step 3: Verify TypeScript**

Run: `npx tsc --noEmit`
Expected: zero errors

**Step 4: Commit**

```bash
git add src/data/caseStudies.ts
git commit -m "feat: wire Design Principles section to DesignPrinciplesGrid component"
```

---

### Task 3: Wire `work/[slug]/page.tsx` + build check + push

**Files:**
- Modify: `src/app/work/[slug]/page.tsx`

**Step 1: Add import**

Find (lines 6–8):
```tsx
import MarketSegmentsChart from '@/components/charts/MarketSegmentsChart'
import DiscoveryFilmstrip from '@/components/charts/DiscoveryFilmstrip'
import type { Metadata } from 'next'
```
Replace with:
```tsx
import MarketSegmentsChart from '@/components/charts/MarketSegmentsChart'
import DiscoveryFilmstrip from '@/components/charts/DiscoveryFilmstrip'
import DesignPrinciplesGrid from '@/components/charts/DesignPrinciplesGrid'
import type { Metadata } from 'next'
```

**Step 2: Add render branch**

Find (the existing two-branch conditional):
```tsx
                  {section.chartComponent === 'market-segments' ? (
                    <MarketSegmentsChart />
                  ) : section.chartComponent === 'discovery-filmstrip' ? (
                    <DiscoveryFilmstrip />
                  ) : section.image ? (
```
Replace with:
```tsx
                  {section.chartComponent === 'market-segments' ? (
                    <MarketSegmentsChart />
                  ) : section.chartComponent === 'discovery-filmstrip' ? (
                    <DiscoveryFilmstrip />
                  ) : section.chartComponent === 'design-principles' ? (
                    <DesignPrinciplesGrid />
                  ) : section.image ? (
```

**Step 3: Verify TypeScript**

Run: `npx tsc --noEmit`
Expected: zero errors

**Step 4: Commit**

```bash
git add "src/app/work/[slug]/page.tsx"
git commit -m "feat: render DesignPrinciplesGrid in case study page"
```

**Step 5: Production build**

Run: `npx next build` from `C:\dev\UXPortfolioV2`
Expected: `✓ Compiled successfully` — all 13 pages including `/work/distribution-networks`

**Step 6: Push to Vercel**

```bash
git push
```
Expected: Vercel picks up the push and deploys within ~1 minute.

**Step 7: Verify live**

Visit `https://ux-portfolio-v2.vercel.app/work/distribution-networks` and confirm:
- Design Principles section shows 6 gold-accented cards in a 2×3 grid
- Cards animate in one by one when scrolled into view
- Gold left-border accent visible on each card
- Gold serif numbers 01–06 at the top of each card
- No console errors
