# Market Segments Chart Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the static pyramid PNG in the "Market Opportunity" section of the Distribution Networks case study with an animated horizontal bar chart React component.

**Architecture:** New `MarketSegmentsChart` client component using Framer Motion `useInView` for scroll-triggered bar animation. `CaseStudySection` type gains an optional `chartComponent` discriminator. The case study detail page renderer checks for `chartComponent` before falling back to the existing image block.

**Tech Stack:** Next.js 16 App Router, TypeScript, Tailwind v4 CSS vars, Framer Motion (already installed)

---

### Task 1: Create `src/components/charts/MarketSegmentsChart.tsx`

**Files:**
- Create: `src/components/charts/MarketSegmentsChart.tsx`

**Step 1: Create the directory**

```bash
mkdir -p /c/dev/UXPortfolioV2/src/components/charts
```

**Step 2: Write the file**

```tsx
'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const segments = [
  {
    name: 'Small Projects',
    complexity: 'Low Complexity',
    value: '$100B',
    widthPct: 100,
    isTarget: true,
  },
  {
    name: 'Medium Projects',
    complexity: 'Mid Complexity',
    value: '$33B',
    widthPct: 33,
    isTarget: false,
  },
  {
    name: 'Complex Projects',
    complexity: 'High Complexity',
    value: '$10B',
    widthPct: 10,
    isTarget: false,
  },
]

export default function MarketSegmentsChart() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div
      ref={ref}
      className="mt-6 rounded-xl p-6 md:p-8"
      style={{ background: 'var(--color-surface-2)' }}
    >
      <div className="flex flex-col gap-6">
        {segments.map((seg, i) => (
          <div
            key={seg.name}
            className="flex items-start gap-4 pl-3 border-l-2"
            style={{
              borderColor: seg.isTarget ? 'var(--color-gold)' : 'transparent',
            }}
          >
            {/* Label column */}
            <div className="w-36 flex-shrink-0 pt-1">
              <p
                className="text-sm font-sans font-medium leading-tight"
                style={{ color: 'var(--color-foreground)' }}
              >
                {seg.name}
              </p>
              <p
                className="text-xs font-sans mt-0.5"
                style={{ color: 'var(--color-muted)' }}
              >
                {seg.complexity}
              </p>
            </div>

            {/* Bar + value */}
            <div className="flex-1 flex items-center gap-3 pt-2">
              <div
                className="flex-1 h-5 rounded-full overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.06)' }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: seg.isTarget
                      ? 'var(--color-gold)'
                      : 'rgba(201,168,76,0.35)',
                  }}
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${seg.widthPct}%` } : { width: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: i * 0.15 }}
                />
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <span
                  className="text-sm font-sans tabular-nums"
                  style={{
                    color: 'var(--color-foreground)',
                    minWidth: '3.5rem',
                    textAlign: 'right',
                  }}
                >
                  {seg.value}
                </span>
                {seg.isTarget && (
                  <span
                    className="text-xs font-sans font-medium tracking-[0.12em] uppercase px-2 py-0.5 rounded-full border"
                    style={{
                      color: 'var(--color-gold)',
                      borderColor: 'var(--color-gold)',
                    }}
                  >
                    UX Target
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Axis label */}
      <p
        className="mt-6 text-xs font-sans"
        style={{ color: 'var(--color-muted)' }}
      >
        ← Less Complex · More Accessible
      </p>
    </div>
  )
}
```

**Step 3: TypeScript check**

```bash
cd /c/dev/UXPortfolioV2 && npx tsc --noEmit 2>&1
```

Expected: no output (no errors).

**Step 4: Commit**

```bash
cd /c/dev/UXPortfolioV2 && git add src/components/charts/MarketSegmentsChart.tsx && git commit -m "feat: add MarketSegmentsChart animated horizontal bar chart"
```

---

### Task 2: Update `src/data/caseStudies.ts` — interface + data

**Files:**
- Modify: `src/data/caseStudies.ts`

**Step 1: Extract the inline section type and add `chartComponent`**

Find line 12:
```typescript
  sections: { heading: string; body: string; image?: string; imageAlt?: string }[]
```

Replace with a named interface before the `CaseStudy` export, and update `sections` to use it:

```typescript
export interface CaseStudySection {
  heading: string
  body: string
  image?: string
  imageAlt?: string
  chartComponent?: 'market-segments'
}

export interface CaseStudy {
  slug: string
  title: string
  tag: string
  outcome: string
  description: string
  coverImage: string
  year: string
  client: string
  role: string
  tools: string
  sections: CaseStudySection[]
  featured: boolean
}
```

**Step 2: Update the "Market Opportunity" section in distribution-networks**

Find (inside the distribution-networks case study sections array):
```typescript
      {
        heading: 'The Market Opportunity',
        body: "The construction industry's distribution network design market exceeds $10B. The largest and most accessible segment is small, simple projects: cookie-cutter buildings like apartment complexes, hotels, and offices. The primary strategic objective was to penetrate this high-volume segment first — winning on speed and simplicity — while building the foundation to expand into medium and complex installations over time.",
        image:
          '/images/distribution-networks-section-market.png',
        imageAlt: 'Market size diagram showing small, medium, and complex project segments',
      },
```

Replace with:
```typescript
      {
        heading: 'The Market Opportunity',
        body: "The construction industry's distribution network design market exceeds $10B. The largest and most accessible segment is small, simple projects: cookie-cutter buildings like apartment complexes, hotels, and offices. The primary strategic objective was to penetrate this high-volume segment first — winning on speed and simplicity — while building the foundation to expand into medium and complex installations over time.",
        chartComponent: 'market-segments',
      },
```

**Step 3: TypeScript check**

```bash
cd /c/dev/UXPortfolioV2 && npx tsc --noEmit 2>&1
```

Expected: no output.

**Step 4: Commit**

```bash
cd /c/dev/UXPortfolioV2 && git add src/data/caseStudies.ts && git commit -m "feat: add chartComponent field to CaseStudySection; wire market-segments to distribution-networks"
```

---

### Task 3: Update `src/app/work/[slug]/page.tsx` + build verify + push

**Files:**
- Modify: `src/app/work/[slug]/page.tsx`

**Step 1: Add import for MarketSegmentsChart**

At the top of `src/app/work/[slug]/page.tsx`, after the existing imports, add:

```typescript
import MarketSegmentsChart from '@/components/charts/MarketSegmentsChart'
```

**Step 2: Replace the image-only render block with the chart-or-image conditional**

Find:
```tsx
                  {section.image && (
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
                  )}
```

Replace with:
```tsx
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
```

**Step 3: TypeScript check**

```bash
cd /c/dev/UXPortfolioV2 && npx tsc --noEmit 2>&1
```

Expected: no output.

**Step 4: Production build**

```bash
cd /c/dev/UXPortfolioV2 && npm run build 2>&1
```

Expected:
- `✓ Generating static pages (13/13)`
- Zero errors
- `/work/distribution-networks` listed in the output

**Step 5: Commit**

```bash
cd /c/dev/UXPortfolioV2 && git add "src/app/work/[slug]/page.tsx" && git commit -m "feat: render MarketSegmentsChart in case study detail page"
```

**Step 6: Push**

```bash
cd /c/dev/UXPortfolioV2 && git push origin main
```

Expected: Vercel auto-deploys. Verify at `https://ux-portfolio-v2.vercel.app/work/distribution-networks` — "The Market Opportunity" section shows the animated bar chart, not an image.
