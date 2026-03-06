# Hierarchy of Needs — Cards Component Design Document

**Date:** 2026-03-06
**Status:** Approved

## Problem

The "Hierarchy of Needs" section in the Distribution Networks case study currently shows a single generic job-site photo with no graphical breakdown of the three user needs described in the body text. The photo adds no insight — readers can't see the three distinct forces at a glance.

## Solution

Replace the static image with a `HierarchyOfNeedsCards` component: three full-width cards stacked vertically, one per need, each with a dedicated photo and text. Alternating image/text layout creates visual rhythm and conveys the three needs as distinct, prioritised items.

## Three Needs

| # | Title | Description |
|---|-------|-------------|
| 01 | Time is Money | Labour at every stage is expensive and mistakes discovered late cost ten times more to fix. Simulations are essential to get the design right before installation. |
| 02 | Collaboration | These projects involve multiple teams and companies. Smooth information-sharing reduces both cost and conflict throughout the project. |
| 03 | Business Results | Designers need high-quality documentation and visual renders to impress clients and win future projects. |

## Component: `HierarchyOfNeedsCards`

**File:** `src/components/charts/HierarchyOfNeedsCards.tsx`

### Card Layout

Each card is a full-width flex row (`flex-col md:flex-row`):

- **Image side** — 40% width on desktop (`md:w-2/5`), full width on mobile. Fixed height (`300px`). `next/image` with `fill` + `object-cover`. On mobile, image stacks above text.
- **Text side** — 60% width on desktop (`flex-1`), padded `p-6 md:p-8`:
  - Gold serif number (`01`, `02`, `03`) — `text-3xl`, `var(--font-serif)`, `var(--color-gold)`, `mb-2`
  - Need title — `text-xl`, `var(--font-serif)`, `var(--color-foreground)`, `mb-3`
  - Description — `text-sm`, `leading-relaxed`, `var(--color-muted)`

**Card styling:**
- `background: var(--color-surface)`
- `border: 1px solid var(--color-border)`
- `border-radius: 12px` (`rounded-xl`)
- `overflow: hidden`

### Alternating Image Sides

Cards at index 0 and 2 (needs 01 and 03): image on left, text on right.
Card at index 1 (need 02): image on right, text on left.

On mobile, alternation is ignored — image always stacks above text (`order-first`).

```
Desktop:
+------------------------------------------+
|  [IMG 40%]    |  01 — Time is Money      |
|               |  Labour at every stage… |
+------------------------------------------+
|  02 — Collaboration  |  [IMG 40%]        |
|  These projects…     |                   |
+------------------------------------------+
|  [IMG 40%]    |  03 — Business Results   |
|               |  Designers need…        |
+------------------------------------------+

Mobile (all cards):
+------------------------+
|  [IMAGE — full width]  |
|  01 — Title            |
|  Description text      |
+------------------------+
```

### Entrance Animation

`useInView` with `once: true, margin: '-80px'`. Cards stagger in with `opacity: 0 → 1` and `y: 20 → 0` over `0.5s`, delayed `0.15s` per card.

```tsx
initial={{ opacity: 0, y: 20 }}
animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
transition={{ duration: 0.5, delay: index * 0.15, ease: 'easeOut' }}
```

### Image Filenames

User will provide three photos in `public/images/`:

```
distribution-networks-needs-1.jpg   (Time is Money)
distribution-networks-needs-2.jpg   (Collaboration)
distribution-networks-needs-3.jpg   (Business Results)
```

## Data Changes

### `src/data/caseStudies.ts`

1. Extend `chartComponent` union type: add `'hierarchy-of-needs'`
2. On the Hierarchy of Needs section: remove `image` and `imageAlt`, add `chartComponent: 'hierarchy-of-needs'`

### `src/app/work/[slug]/page.tsx`

1. Import `HierarchyOfNeedsCards`
2. Add branch to the `chartComponent` conditional:
   ```tsx
   } : section.chartComponent === 'hierarchy-of-needs' ? (
     <HierarchyOfNeedsCards />
   ) :
   ```

## Files Changed

1. `src/components/charts/HierarchyOfNeedsCards.tsx` — new component
2. `src/data/caseStudies.ts` — union type + section data update
3. `src/app/work/[slug]/page.tsx` — import + conditional branch
