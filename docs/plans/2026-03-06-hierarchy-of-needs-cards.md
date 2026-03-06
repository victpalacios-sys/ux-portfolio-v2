# Hierarchy of Needs Cards — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the static job-site photo in the "Hierarchy of Needs" section with a `HierarchyOfNeedsCards` component — three full-width cards stacked vertically, each showing one user need (Time, Collaboration, Business) with an alternating photo/text layout and a staggered Framer Motion entrance.

**Architecture:** New `HierarchyOfNeedsCards` client component renders a hardcoded array of 3 need objects. The `chartComponent` discriminator in `caseStudies.ts` is extended to `'hierarchy-of-needs'`; the section's `image`/`imageAlt` fields are removed. The `[slug]/page.tsx` conditional gets a new branch. Photos are served from `public/images/distribution-networks-needs-{1,2,3}.jpg` — the user provides these files.

**Tech Stack:** Next.js 16, TypeScript, Framer Motion (`motion`, `useInView`), `next/image`, Tailwind v4 utility classes, CSS custom properties

---

### Task 1: Create `HierarchyOfNeedsCards.tsx`

**Files:**
- Create: `src/components/charts/HierarchyOfNeedsCards.tsx`

**Step 1: Write the file with the full component**

Create `src/components/charts/HierarchyOfNeedsCards.tsx` with exactly this content:

```tsx
'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

const needs = [
  {
    number: '01',
    title: 'Time is Money',
    description:
      'Labour at every stage is expensive and mistakes discovered late cost ten times more to fix. Simulations are essential to get the design right before installation.',
    src: '/images/distribution-networks-needs-1.jpg',
    alt: 'A technician working under time pressure on a job site installation',
  },
  {
    number: '02',
    title: 'Collaboration',
    description:
      'These projects involve multiple teams and companies. Smooth information-sharing reduces both cost and conflict throughout the project.',
    src: '/images/distribution-networks-needs-2.jpg',
    alt: 'Two professionals reviewing project plans together on site',
  },
  {
    number: '03',
    title: 'Business Results',
    description:
      'Designers need high-quality documentation and visual renders to impress clients and win future projects.',
    src: '/images/distribution-networks-needs-3.jpg',
    alt: 'Professional documentation and visual output from a distribution network project',
  },
]

export default function HierarchyOfNeedsCards() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div
      ref={ref}
      className="mt-6 flex flex-col gap-4"
      role="list"
      aria-label="Hierarchy of user needs"
    >
      {needs.map((need, index) => {
        // Odd index (0, 2) → image left; even index (1) → image right
        const imageOnLeft = index % 2 === 0

        return (
          <motion.div
            key={need.number}
            role="listitem"
            className="flex flex-col overflow-hidden rounded-xl"
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: index * 0.15, ease: 'easeOut' }}
          >
            {/* Inner row — column on mobile, row on md+ */}
            <div
              className={`flex flex-col md:flex-row${imageOnLeft ? '' : ' md:flex-row-reverse'}`}
            >
              {/* Image side — 40% on desktop, full width on mobile */}
              <div
                className="relative w-full md:w-2/5 flex-none"
                style={{ minHeight: '280px' }}
              >
                <Image
                  src={need.src}
                  alt={need.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>

              {/* Text side */}
              <div className="flex flex-col justify-center flex-1 p-6 md:p-8">
                {/* Gold serif number */}
                <p
                  className="text-3xl mb-2"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    color: 'var(--color-gold)',
                  }}
                >
                  {need.number}
                </p>

                {/* Need title */}
                <h3
                  className="text-xl mb-3"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    color: 'var(--color-foreground)',
                  }}
                >
                  {need.title}
                </h3>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--color-muted)' }}
                >
                  {need.description}
                </p>
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
```

**Step 2: Verify TypeScript**

Run: `npx tsc --noEmit` from `C:\dev\UXPortfolioV2`
Expected: zero errors

**Step 3: Commit**

```bash
git add src/components/charts/HierarchyOfNeedsCards.tsx
git commit -m "feat: add HierarchyOfNeedsCards component — split cards with alternating photo layout"
```

---

### Task 2: Wire component into the case study data and page

**Files:**
- Modify: `src/data/caseStudies.ts`
- Modify: `src/app/work/[slug]/page.tsx`

**Step 1: Extend the `chartComponent` union type in `caseStudies.ts`**

Find this line (line 8):

```ts
  chartComponent?: 'market-segments' | 'discovery-filmstrip' | 'design-principles'
```

Replace with:

```ts
  chartComponent?: 'market-segments' | 'discovery-filmstrip' | 'design-principles' | 'hierarchy-of-needs'
```

**Step 2: Update the Hierarchy of Needs section in `caseStudies.ts`**

Find this block (around lines 54–59):

```ts
      {
        heading: 'The Hierarchy of Needs',
        body: 'Three forces drive every distribution network designer. Time is money — literally. Labour at every stage is expensive, and mistakes discovered late cost ten times more to fix. Simulations are essential to get the design right before installation. Collaboration matters: these projects involve multiple teams and companies, and smooth information-sharing reduces both cost and conflict. Finally, it is a business: designers need high-quality documentation and visual renders to impress clients and win future projects.',
        image:
          '/images/distribution-networks-section-needs.jpg',
        imageAlt: 'Camera installation context photo illustrating the real-world job site',
      },
```

Replace with:

```ts
      {
        heading: 'The Hierarchy of Needs',
        body: 'Three forces drive every distribution network designer. Time is money — literally. Labour at every stage is expensive, and mistakes discovered late cost ten times more to fix. Simulations are essential to get the design right before installation. Collaboration matters: these projects involve multiple teams and companies, and smooth information-sharing reduces both cost and conflict. Finally, it is a business: designers need high-quality documentation and visual renders to impress clients and win future projects.',
        chartComponent: 'hierarchy-of-needs',
      },
```

**Step 3: Add the import in `src/app/work/[slug]/page.tsx`**

Find the existing chart component imports block (near the top of the file). It currently includes `DiscoveryFilmstrip` and `DesignPrinciplesGrid`. Add `HierarchyOfNeedsCards` to the same block:

```tsx
import HierarchyOfNeedsCards from '@/components/charts/HierarchyOfNeedsCards'
```

**Step 4: Add the conditional branch in `[slug]/page.tsx`**

Find the conditional block that renders chart components. It currently looks like:

```tsx
{section.chartComponent === 'market-segments' ? (
  <MarketSegmentsChart />
) : section.chartComponent === 'discovery-filmstrip' ? (
  <DiscoveryFilmstrip />
) : section.chartComponent === 'design-principles' ? (
  <DesignPrinciplesGrid />
) : section.image ? (
```

Add the new branch before `section.image`:

```tsx
{section.chartComponent === 'market-segments' ? (
  <MarketSegmentsChart />
) : section.chartComponent === 'discovery-filmstrip' ? (
  <DiscoveryFilmstrip />
) : section.chartComponent === 'design-principles' ? (
  <DesignPrinciplesGrid />
) : section.chartComponent === 'hierarchy-of-needs' ? (
  <HierarchyOfNeedsCards />
) : section.image ? (
```

**Step 5: Verify TypeScript**

Run: `npx tsc --noEmit` from `C:\dev\UXPortfolioV2`
Expected: zero errors

**Step 6: Commit**

```bash
git add src/data/caseStudies.ts src/app/work/[slug]/page.tsx
git commit -m "feat: wire HierarchyOfNeedsCards into case study — replace static image"
```

---

### Task 3: Production build + push + verify live

**Files:**
- No changes — verification only

**Step 1: Production build**

Run: `npx next build` from `C:\dev\UXPortfolioV2`
Expected: `✓ Compiled successfully` — all pages build without errors

**Step 2: Push to remote**

```bash
git push
```

**Step 3: Add the three need photos (user action — not Claude's task)**

The component references three images that must exist before the section renders correctly on the live site:

```
public/images/distribution-networks-needs-1.jpg   (Time is Money)
public/images/distribution-networks-needs-2.jpg   (Collaboration)
public/images/distribution-networks-needs-3.jpg   (Business Results)
```

These are provided by the user. Once added, commit and push them separately:

```bash
git add public/images/distribution-networks-needs-1.jpg \
        public/images/distribution-networks-needs-2.jpg \
        public/images/distribution-networks-needs-3.jpg
git commit -m "assets: add hierarchy of needs photos (time, collaboration, business)"
git push
```

**Step 4: Verify live**

Visit `https://ux-portfolio-v2.vercel.app/work/distribution-networks` → "The Hierarchy of Needs" section:

- Three cards render, stacked vertically
- Card 1 (Time is Money): image left, text right
- Card 2 (Collaboration): image right, text left
- Card 3 (Business Results): image left, text right
- Cards stagger in on scroll (fade up)
- On mobile: all images stack above text, cards are full width
- No console errors
