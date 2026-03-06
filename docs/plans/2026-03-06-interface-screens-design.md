# Interface Screens Tabbed Viewer — Design Document

**Date:** 2026-03-06
**Status:** Approved

## Problem

The "Interface Design" section of the Distribution Networks case study currently shows only one static screenshot. There are 6 distinct screens (Home, Project, Building, Floor Plan, Reports, Bill of Materials) that each tell part of the design story. Showing only one leaves the rest of the work invisible.

## Solution

A new `InterfaceScreens` component — a tabbed viewer with 6 named pills above a full-width 16:9 screen area. Clicking a tab cross-fades to the corresponding screenshot. The tab labels simultaneously showcase each screen and communicate the app's information architecture.

## Screens

| Tab Label | Image Filename |
|-----------|---------------|
| Home | `distribution-networks-interface-design-home.png` |
| Project | `distribution-networks-interface-design-project.png` |
| Building | `distribution-networks-interface-design-building.png` |
| Floor Plan | `distribution-networks-interface-design-floor.png` |
| Reports | `distribution-networks-interface-design-reports-home.png` |
| Bill of Materials | `distribution-networks-interface-design-reports-bom.png` |

> **Image note:** The existing `distribution-networks-interface-design.png` is the Floor Plan screen and must be renamed to `distribution-networks-interface-design-floor.png`. The other 5 are new files to be added to `public/images/`.

## Component: `InterfaceScreens`

**File:** `src/components/charts/InterfaceScreens.tsx`

### Tab Row

- Horizontally scrollable row (`overflow-x: auto`, no visible scrollbar): `scrollbar-hide` or `overflow-x: auto` with `-ms-overflow-style: none; scrollbar-width: none`
- Flex row of 6 pill buttons, `gap-2`, `pb-1` (room for border)
- Each pill: `px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors`

**Active tab:**
- `color: var(--color-gold)`
- `background: var(--color-surface-2)`
- `border-bottom: 2px solid var(--color-gold)` — achieved via `rounded-full` + a bottom border on the pill's text span, or simpler: use an outline/ring instead

**Inactive tab:**
- `color: var(--color-muted)`
- `background: transparent`
- On hover: `color: var(--color-foreground)`, `background: var(--color-surface)`

### Screen Area

- `aspect-video` wrapper (16:9, scales at all widths)
- `rounded-xl overflow-hidden`
- `background: var(--color-surface-2)`
- `next/image` with `fill` + `object-contain` + `sizes="100vw"`
- `mt-3` gap below tabs

### Transition

Framer Motion `AnimatePresence` with `mode="wait"`:
- Exiting screen: `opacity: 1 → 0`, duration `0.15s`
- Entering screen: `opacity: 0 → 1`, duration `0.2s`
- `key={activeIndex}` on the `motion.div` wrapping the `Image` triggers the animation on tab change

### Keyboard Navigation

- `tabIndex={0}` on the outer container
- `onKeyDown`: `ArrowLeft` → `setActive((i - 1 + 6) % 6)`, `ArrowRight` → `setActive((i + 1) % 6)`

### Accessibility

- `role="tablist"` on the tab row
- `role="tab"`, `aria-selected={isActive}` on each pill
- `role="tabpanel"` on the screen area
- `aria-label` on the outer container: `"Interface design screens"`

### State

Single `useState<number>` for the active tab index, initialised to `0` (Home).

## Data Changes

### `src/data/caseStudies.ts`

1. Extend `chartComponent` union: add `'interface-screens'`
2. Interface Design section: remove `image` and `imageAlt`, add `chartComponent: 'interface-screens'`

### `src/app/work/[slug]/page.tsx`

1. Import `InterfaceScreens`
2. Add branch: `section.chartComponent === 'interface-screens'` → `<InterfaceScreens />`

## Image File Changes

```
RENAME: public/images/distribution-networks-interface-design.png
     →  public/images/distribution-networks-interface-design-floor.png

ADD:    public/images/distribution-networks-interface-design-home.png
ADD:    public/images/distribution-networks-interface-design-project.png
ADD:    public/images/distribution-networks-interface-design-building.png
ADD:    public/images/distribution-networks-interface-design-reports-home.png
ADD:    public/images/distribution-networks-interface-design-reports-bom.png
```

## Files Changed

1. `src/components/charts/InterfaceScreens.tsx` — new component
2. `src/data/caseStudies.ts` — union type + section data
3. `src/app/work/[slug]/page.tsx` — import + conditional branch
4. `public/images/distribution-networks-interface-design.png` → renamed to `...-floor.png`
