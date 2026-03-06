# Interface Screens Tabbed Viewer — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the single static screenshot in the "Interface Design" section with a `InterfaceScreens` component — a tabbed viewer that shows 6 named screens (Home, Project, Building, Floor Plan, Reports, Bill of Materials) with a cross-fade transition on tab selection.

**Architecture:** New `InterfaceScreens` client component uses `useState` for the active tab index and Framer Motion `AnimatePresence` for cross-fade transitions. The `chartComponent` discriminator pattern is extended with `'interface-screens'`. The existing floor plan image is renamed to match the naming convention; 5 new images are user-provided assets.

**Tech Stack:** Next.js 16, TypeScript, Framer Motion (`AnimatePresence`, `motion`), `next/image`, CSS custom properties

---

### Task 1: Create `InterfaceScreens.tsx`

**Files:**
- Create: `src/components/charts/InterfaceScreens.tsx`

**Step 1: Write the file with the full component**

Create `src/components/charts/InterfaceScreens.tsx` with exactly this content:

```tsx
'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface Screen {
  label: string
  src: string
  alt: string
}

const screens: Screen[] = [
  {
    label: 'Home',
    src: '/images/distribution-networks-interface-design-home.png',
    alt: 'Home screen — project overview and quick access to recent work',
  },
  {
    label: 'Project',
    src: '/images/distribution-networks-interface-design-project.png',
    alt: 'Project screen — building list and project details',
  },
  {
    label: 'Building',
    src: '/images/distribution-networks-interface-design-building.png',
    alt: 'Building screen — floor list and building configuration',
  },
  {
    label: 'Floor Plan',
    src: '/images/distribution-networks-interface-design-floor.png',
    alt: 'Floor plan canvas — the core design workspace for placing cameras',
  },
  {
    label: 'Reports',
    src: '/images/distribution-networks-interface-design-reports-home.png',
    alt: 'Reports screen — project documentation and export options',
  },
  {
    label: 'Bill of Materials',
    src: '/images/distribution-networks-interface-design-reports-bom.png',
    alt: 'Bill of materials — itemised component list with quantities and costs',
  },
]

export default function InterfaceScreens() {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setActiveIndex((i) => (i - 1 + screens.length) % screens.length)
    } else if (e.key === 'ArrowRight') {
      setActiveIndex((i) => (i + 1) % screens.length)
    }
  }

  return (
    <div
      ref={containerRef}
      className="mt-6"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label="Interface design screens"
    >
      {/* Tab row — horizontally scrollable, no visible scrollbar */}
      <div
        role="tablist"
        aria-label="Interface screens"
        className="flex gap-2 overflow-x-auto pb-1"
        style={{ scrollbarWidth: 'none' } as React.CSSProperties}
      >
        {screens.map((screen, index) => {
          const isActive = index === activeIndex
          return (
            <button
              key={screen.label}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveIndex(index)}
              className="px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors flex-none"
              style={{
                color: isActive ? 'var(--color-gold)' : 'var(--color-muted)',
                background: isActive ? 'var(--color-surface-2)' : 'transparent',
                outline: isActive
                  ? '1px solid var(--color-gold)'
                  : '1px solid transparent',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  const btn = e.currentTarget
                  btn.style.color = 'var(--color-foreground)'
                  btn.style.background = 'var(--color-surface)'
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  const btn = e.currentTarget
                  btn.style.color = 'var(--color-muted)'
                  btn.style.background = 'transparent'
                }
              }}
            >
              {screen.label}
            </button>
          )
        })}
      </div>

      {/* Screen area — 16:9 aspect ratio, cross-fade on tab change */}
      <div
        role="tabpanel"
        aria-label={`${screens[activeIndex].label} screen`}
        className="relative mt-3 w-full aspect-video rounded-xl overflow-hidden"
        style={{ background: 'var(--color-surface-2)' }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <Image
              src={screens[activeIndex].src}
              alt={screens[activeIndex].alt}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
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
git add src/components/charts/InterfaceScreens.tsx
git commit -m "feat: add InterfaceScreens tabbed viewer — 6 screens with AnimatePresence cross-fade"
```

---

### Task 2: Rename floor image + wire component into data and page

**Files:**
- Modify: `src/data/caseStudies.ts`
- Modify: `src/app/work/[slug]/page.tsx`
- Rename: `public/images/distribution-networks-interface-design.png` → `public/images/distribution-networks-interface-design-floor.png`

**Step 1: Rename the existing floor plan image**

```bash
git mv public/images/distribution-networks-interface-design.png \
       public/images/distribution-networks-interface-design-floor.png
```

Using `git mv` ensures git tracks it as a rename (preserves history) rather than a delete + add.

**Step 2: Extend the `chartComponent` union type in `src/data/caseStudies.ts`**

Find line 8:
```ts
  chartComponent?: 'market-segments' | 'discovery-filmstrip' | 'design-principles' | 'hierarchy-of-needs'
```

Replace with:
```ts
  chartComponent?: 'market-segments' | 'discovery-filmstrip' | 'design-principles' | 'hierarchy-of-needs' | 'interface-screens'
```

**Step 3: Update the Interface Design section in `src/data/caseStudies.ts`**

Find this block (around lines 72–78):
```ts
      {
        heading: 'Interface Design',
        body: 'After more than 100 iterations using Material Design as the base system, a clear design language emerged. The application assumes expert users: no-nonsense flows, canvas at centre stage, tools at the edges. Icons carry short descriptions to support new users without cluttering the workspace for experienced ones. The four core screens — Home, Project Details, Building View, and the Floorplan canvas — each have a single primary job.',
        image:
          '/images/distribution-networks-interface-design.png',
        imageAlt: 'Floorplan view — the core design canvas',
      },
```

Replace with:
```ts
      {
        heading: 'Interface Design',
        body: 'After more than 100 iterations using Material Design as the base system, a clear design language emerged. The application assumes expert users: no-nonsense flows, canvas at centre stage, tools at the edges. Icons carry short descriptions to support new users without cluttering the workspace for experienced ones. The four core screens — Home, Project Details, Building View, and the Floorplan canvas — each have a single primary job.',
        chartComponent: 'interface-screens',
      },
```

**Step 4: Add the import in `src/app/work/[slug]/page.tsx`**

Find the chart component imports block and add:
```tsx
import InterfaceScreens from '@/components/charts/InterfaceScreens'
```

**Step 5: Add the conditional branch in `src/app/work/[slug]/page.tsx`**

Find the existing conditional chain, which ends with:
```tsx
) : section.chartComponent === 'hierarchy-of-needs' ? (
  <HierarchyOfNeedsCards />
) : section.image ? (
```

Insert a new branch:
```tsx
) : section.chartComponent === 'hierarchy-of-needs' ? (
  <HierarchyOfNeedsCards />
) : section.chartComponent === 'interface-screens' ? (
  <InterfaceScreens />
) : section.image ? (
```

**Step 6: Verify TypeScript**

Run: `npx tsc --noEmit` from `C:\dev\UXPortfolioV2`
Expected: zero errors

**Step 7: Commit**

```bash
git add public/images/distribution-networks-interface-design-floor.png \
        src/data/caseStudies.ts \
        src/app/work/[slug]/page.tsx
git commit -m "feat: wire InterfaceScreens into case study — rename floor image, extend chartComponent union"
```

---

### Task 3: Add remaining 5 interface screen images + build + push

**Files:**
- Add: `public/images/distribution-networks-interface-design-home.png`
- Add: `public/images/distribution-networks-interface-design-project.png`
- Add: `public/images/distribution-networks-interface-design-building.png`
- Add: `public/images/distribution-networks-interface-design-reports-home.png`
- Add: `public/images/distribution-networks-interface-design-reports-bom.png`

> **Note:** These 5 files are user-provided assets. Wait for the user to drop them into `public/images/` before proceeding with this task.

**Step 1: Verify all 6 image files are present**

```bash
ls /c/dev/UXPortfolioV2/public/images/distribution-networks-interface-design-*.png
```

Expected output — all 6 files:
```
distribution-networks-interface-design-building.png
distribution-networks-interface-design-floor.png
distribution-networks-interface-design-home.png
distribution-networks-interface-design-project.png
distribution-networks-interface-design-reports-bom.png
distribution-networks-interface-design-reports-home.png
```

**Step 2: Run production build**

Run: `npx next build` from `C:\dev\UXPortfolioV2`
Expected: `✓ Compiled successfully`, all 13 pages generated

**Step 3: Commit the new images**

```bash
git add public/images/distribution-networks-interface-design-home.png \
        public/images/distribution-networks-interface-design-project.png \
        public/images/distribution-networks-interface-design-building.png \
        public/images/distribution-networks-interface-design-reports-home.png \
        public/images/distribution-networks-interface-design-reports-bom.png
git commit -m "assets: add 5 interface design screen images"
```

**Step 4: Push**

```bash
git push
```

**Step 5: Verify live**

Visit `https://ux-portfolio-v2.vercel.app/work/distribution-networks` → "Interface Design" section:

- Tab row shows: Home / Project / Building / Floor Plan / Reports / Bill of Materials
- Clicking each tab cross-fades to the correct screen at full width (16:9)
- Arrow keys navigate between tabs when the component is focused
- On mobile: tab row scrolls horizontally, screen fills full width
- No console errors
