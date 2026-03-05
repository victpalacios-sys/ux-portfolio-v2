# Market Segments Chart — Design Doc

**Date:** 2026-03-05
**Feature:** Replace static pyramid image in "The Market Opportunity" section of the Designing Distribution Networks case study with an animated horizontal bar chart component.

---

## Problem

The current section uses a static PNG (`distribution-networks-section-market.png`) showing a three-tier pyramid. The pyramid:
- Implies "top = most important" — the opposite of the actual story (the largest segment is at the bottom)
- Has a disconnected legend box positioned outside the chart
- Does not match the dark/gold premium aesthetic of the portfolio
- Cannot be animated or themed

## Solution

Replace the static image with a `MarketSegmentsChart` React component rendered inline in the case study detail page. Horizontal bars make the size ratios immediately obvious and the gold highlight on the UX target row tells the strategic story at a glance.

---

## Data

| Segment           | Market Size | Complexity  | UX Target |
|-------------------|-------------|-------------|-----------|
| Small Projects    | $100B       | Low         | ✅ Yes    |
| Medium Projects   | $33B        | Medium      | No        |
| Complex Projects  | $10B        | High        | No        |

Bar widths are proportional to market size relative to $100B (max):
- Small: 100%
- Medium: 33%
- Complex: 10%

---

## Visual Design

### Layout (per row)
```
[Segment Name    ]  [████████████████████████████]  [$100B]  [◀ UX TARGET]
[Low Complexity  ]
```

- Left column (~140px): segment name (foreground color, sans, font-medium) + complexity label below (muted, text-xs)
- Center: animated bar, full width available
- Right: dollar amount (foreground, font-mono or sans, text-sm) + UX TARGET badge if applicable

### Color Treatment
- **Small Projects (target) bar**: `var(--color-gold)` at full opacity
- **Medium / Complex bars**: gold at 35% opacity (`rgba(201,168,76,0.35)`)
- **UX TARGET row**: subtle gold left border accent (`border-l-2 border-gold`) on the row container
- **UX TARGET badge**: `text-xs font-sans font-medium tracking-[0.15em] uppercase` pill, gold text, gold border, transparent bg

### Animation
- Uses Framer Motion `useInView` with `once: true`, `margin: "-80px"`
- Each bar animates from `width: 0` → `width: <final>` with `duration: 0.8s`, `ease: "easeOut"`
- Stagger: 0.15s delay between rows (row 1 → row 2 → row 3)

### Container
- Matches existing section-image style: `rounded-xl`, `background: var(--color-surface-2)`, `p-6 md:p-8`
- Added `mt-6` top margin (same as image blocks)
- No fixed height — height determined by content

### Axis Label
- Bottom of chart, below all rows
- `← Less Complex · More Accessible`
- `text-xs`, `var(--color-muted)`, left-aligned

---

## Architecture

### New File: `src/components/charts/MarketSegmentsChart.tsx`
- `'use client'` directive (required for Framer Motion `useInView`)
- Self-contained: data hardcoded inside the component (no props needed — this chart is specific to this one case study)
- No new dependencies (Framer Motion already installed)

### Interface Change: `src/data/caseStudies.ts`
Add to `CaseStudySection` interface:
```typescript
chartComponent?: 'market-segments'
```

### Data Change: `src/data/caseStudies.ts`
In the `distribution-networks` case study, "The Market Opportunity" section:
- Remove `image` field
- Remove `imageAlt` field
- Add `chartComponent: 'market-segments'`

### Renderer Change: `src/app/work/[slug]/page.tsx`
After rendering `section.body`, replace the `{section.image && ...}` block with:
```tsx
{section.chartComponent === 'market-segments' ? (
  <MarketSegmentsChart />
) : section.image ? (
  <div className="relative mt-6 rounded-xl overflow-hidden" style={{ height: '400px', background: 'var(--color-surface-2)' }}>
    <Image src={section.image} alt={section.imageAlt ?? section.heading} fill className="object-contain" />
  </div>
) : null}
```

Import `MarketSegmentsChart` at the top of the file.

---

## Files Touched
1. **Create**: `src/components/charts/MarketSegmentsChart.tsx`
2. **Modify**: `src/data/caseStudies.ts` — interface + data
3. **Modify**: `src/app/work/[slug]/page.tsx` — import + renderer

## Files NOT Touched
- `public/images/distribution-networks-section-market.png` — left in place (harmless, not referenced)
- All other case studies — unaffected by interface extension (new field is optional)
- All blog files — unaffected
