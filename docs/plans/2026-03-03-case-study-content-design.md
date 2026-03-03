# Design: Case Study Content & Hero Image Fix
**Date:** 2026-03-03
**Status:** Approved

## Overview

Two coordinated changes:
1. Populate all 4 case studies with content migrated and rewritten from victorpalacios.ca
2. Fix the hero image cropping on case study detail pages

---

## Change 1: Hero Image Fix

### Problem
The current hero uses `aspectRatio: '21/9'` + `object-cover`. Ultra-wide cinema crop destroys
portrait images (Nokia phone, Currency Exchange mockup) and cuts critical UI details from
landscape ones.

### Solution
- Container: `width: 100%`, `height: 600px`, `maxHeight: 70vh`, `position: relative`
- Image: `fill` prop, `object-contain` (no crop, shows full image)
- Background stays `var(--color-surface-2)` — dark letterbox is invisible on the dark theme

**File:** `src/app/work/[slug]/page.tsx` — hero image block only.

---

## Change 2: Data Structure Extension

### Current interface (sections)
```typescript
sections: { heading: string; body: string }[]
```

### Extended interface
```typescript
sections: {
  heading: string
  body: string
  image?: string      // wixstatic.com URL
  imageAlt?: string   // accessibility alt text
}[]
```

**File:** `src/data/caseStudies.ts` — interface + all 4 case study objects.

---

## Change 3: Section Template Update

Update the section renderer in `src/app/work/[slug]/page.tsx` to render an optional image
after the body paragraph when `section.image` is present.

Image treatment:
- Full-width within the `max-w-3xl` content column
- `object-contain` + fixed height (400px) + dark background — same rationale as hero
- `rounded-xl overflow-hidden` for polish
- `mt-6` spacing between body text and image

---

## Change 4: Case Study Content

All content is rewritten for impact and clarity from the source at victorpalacios.ca.

### 4a. Designing Distribution Networks (slug: `distribution-networks`)
Source: victorpalacios.ca/designapp
Tag: Construction Tech | Year: 2024 | Client: Confidential | Role: Lead UX Designer
Tools: Figma, FigJam, Miro

**Outcome (rewritten):** End-to-end UX for a greenfield B2B application targeting a $10B+ market in construction distribution network design.

**Sections:**
1. **The Market Opportunity** — Largest segment = small/simple projects (hotels, apartments, offices). Strategic goal: penetrate this high-volume market first, then build toward complex installations.
   Image: market size diagram (`9d26ae_2759e668472e497fbec71d6013787af8~mv2.png`)

2. **Discovery: Experts & Users** — Interviewed industry experts for the high-level process view, then interviewed experienced and novice users to map the detailed workflow and identify core user goals.
   Image: research/interviews diagram (`9d26ae_ea5f495b8a44463c9c9b2524ef42317d~mv2.png`)

3. **The Hierarchy of Needs** — Three drivers: (1) Time is money — labour is expensive, mistakes found late cost 10×; (2) It's a team sport — smooth collaboration reduces cost; (3) It's a business — high-quality documentation wins future projects.
   Image: camera installation context (`11062b_dff7ae8a67f747b492c835d874c21c17~mv2.jpg`)

4. **Design Principles** — Easy to use. Fast path to success. Progressive advancement from beginner to expert. Company expertise embedded into the tool. Delight through visual quality and features. Fast iteration.
   Image: design principles diagram (`9d26ae_5f3247710f9a43908c94c925762e6cdd~mv2.png`)

5. **Defining the MVP** — Minimum viable value: simulate security camera coverage and generate a bill of materials. Two screens that prove the core value loop before expanding further.
   Image: simulation screen (`9d26ae_7ccf77dc3cc54d84b64a43f31e67c981~mv2.png`)

6. **Interface Design** — After 100+ iterations using Material Design as base system. Productivity posture: assumes expert users, no-nonsense flows, supports iterative design. Canvas is centre stage; tools live at the edges. Home, Project Details, Building View, and the Floorplan canvas.
   Image: floorplan view (`9d26ae_e94f60af3e5b4e9d8a2de5e15bd0fa61~mv2.png`)

7. **Cross-Platform Strategy** — Desktop: non-modal side panels for speed. Tablet: app bar + main tools retained. Mobile: modal panels, two-step precision placement (target → tap) to eliminate drag errors.
   Image: quick path to success flow (`9d26ae_f5f625894b9146169d778176c771cfd8~mv2.png`)

---

### 4b. Importing Floorplans in iBwave (slug: `ibwave-floorplans`)
Source: victorpalacios.ca/portfolio-collections/my-portfolio/bim-file-import-for-ibwave-design
Tag: Enterprise B2B | Year: 2022 | Client: iBwave Solutions | Role: Senior UX Designer
Tools: Figma, Axure, Sketch

**Outcome (rewritten):** Reduced building model import from 6–12 hours of manual tracing to under 3 minutes — enabling the team to import the entire Burj Khalifa in 10 minutes as a proof of concept.

**Sections:**
1. **The Problem: Days Lost to Manual Tracing** — Creating the building model was the critical first step in every wireless network design. Engineers traced floor plans element-by-element from JPG files: every wall, door, and window. Medium buildings: 6–12 hours. Large buildings (stadiums, towers): 1–2 weeks. Before touching a single antenna.
   Image: problem screenshot (`9d26ae_be23ce84d2ec4719bfd2cf5198edd882~mv2.jpg`)

2. **Technical Strategy: Finding Semantic CAD** — Customer files were 2D PDFs — no automation possible. Research uncovered Autodesk's Forge platform: APIs that read modern 3D CAD formats like Revit, which carry semantic data identifying every element and its material. Full automation became possible. It took months of presentations, wireframes, and internal advocacy to secure the investment.
   Image: technical research diagram (`9d26ae_a668afd75f894ed686745b01fadd9005~mv2.jpeg`)

3. **Result: 3 Minutes, Any Building on Earth** — The alpha release reduced import time to under 3 minutes. As a proof of scale, the team imported the complete wall, door, window, and floor structure of the Burj Khalifa in under 10 minutes.
   Image: Autodesk Forge implementation (`9d26ae_5518a43a94224bceb929cc14dd8f67eb~mv2.png`)

4. **The Import Wizard** — A four-step wizard guides the engineer: (1) Select the BIM file; (2) Choose building floors; (3) Select layers (walls, doors, windows, stairs); (4) Import into iBwave Design. The application automatically selects all relevant views and layers — the engineer only intervenes for exceptions.
   Image: wireframes and UI flow (`9d26ae_4b80cd8b5d8f48b4bc7ae343ccabfe8e~mv2.png`)

5. **Three-Panel Workspace** — The import screen divides into a Wizard/Browser, a 2D Viewer, and a 3D Viewer — giving engineers spatial context while making selections. Material mapping happens automatically: BIM materials (concrete, glass, wood) are matched to iBwave simulation materials without manual intervention.
   Image: screen sections (`9d26ae_31214b7d89a142068c223582119d3ddd~mv2.png`)

6. **Graceful Error Handling** — When automatic material mapping fails, an error icon surfaces the specific conflict. One click opens a targeted dialog — the engineer selects the correct iBwave material for that BIM type and moves on. The system does the work; the human handles the edge cases.
   Image: error case (`9d26ae_1486788310404474a14fc3009bb8822d~mv2.png`)

---

### 4c. Currency Exchange for Travellers (slug: `currency-exchange`)
Source: victorpalacios.ca/portfolio-collections/my-portfolio/currency-exchange-for-travellers
Tag: Consumer Finance | Year: 2020 | Client: Fintech startup | Role: UX Designer
Tools: Figma, Maze

**Outcome (rewritten):** Designed a frictionless mobile-first currency exchange experience that eliminates the hidden 8–12% cost of traditional FX and reduces the anxiety of managing foreign cash.

**Sections:**
1. **The Hidden Tax on Travel** — Traditional currency exchange extracts 8–12% through opaque markups, inconvenient kiosks, fee-laden credit cards, and hard-to-resell leftover cash. The pain is spread across the entire travel journey — planning, departure, destination, return.
   Image: problem visual (`9d26ae_af99deeba7af48e0b24c8f62f58ef35b~mv2.png`)

2. **The Value Proposition** — Fair, transparent rates (minimal margin on wholesale). Flexible delivery: home, destination, or airport pickup. Easy sell-back of leftover currency. This isn't just cheaper — it removes the timing stress and the psychological overhead of handling foreign cash.
   Image: value diagram (`9d26ae_c597eebd58784b5abb64ac6e9187925d~mv2.png`)

3. **The Design Challenge** — Build trust for sensitive money transactions inside a mobile app. Simplify complex decisions (which rate? when? how much?). Integrate multiple touchpoints: mobile ordering, delivery tracking, sell-back. All without making it feel like a financial dashboard.

4. **Core Solution: Conversational Commerce** — An AI-powered chatbot lets customers either follow structured prompts or state their needs directly ("I need €500 by Friday"). A traditional form flow is also available for users who prefer explicit control. The chatbot handles ambiguity; the form provides certainty.
   Image: wireframes (`9d26ae_494067064eef49eab0c489ce2c47648c~mv2.png`)

---

### 4d. Nokia 7710 (slug: `nokia-7710`)
Source: victorpalacios.ca/portfolio-collections/my-portfolio/nokia-7710
Tag: Mobile Hardware | Year: 2004 | Client: Nokia | Role: UX Designer
Tools: Early prototyping tools, Nokia internal design system

**Outcome (rewritten):** Designed the touch interaction model and core UI for Nokia's first touch-only smartphone — three years before the iPhone redefined the category.

**Sections:**
1. **The First Wave of Smartphones** — The Nokia 7710 launched in 2004 alongside the Palm Treo (2002) as part of the first generation of devices that would eventually define the smartphone era. My primary contributions: UI design for call handling, camera, media browser, and settings — plus active participation in usability studies and the cross-team design of the Series 90 UI Style.
   Image: project overview (`9d26ae_2f724723369a41e3afbc986c34583d10~mv2.png`)

2. **Hardware UX: Where Software Meets Physical Design** — I contributed to the physical design: button placement and size, overall device dimensions, and stylus design. The device shipped with a half-VGA touchscreen, an Opera web browser, Bluetooth, Wi-Fi, GPS, GSM, and a full media suite — ambitious for 2004. A multi-function Voice key (short press: record; long press: voice dial; during call: speakerphone) compressed complexity into a single control.
   Image: final industrial design (`9d26ae_dc661e7463c04e3dbf19b630a3ce1da0~mv2.png`)

3. **The Road Not Taken** — The original industrial design was a bold statement — wide, flat, and deliberately different from anything on the market. It didn't survive public reception (critics invoked the N-Gage "side-talking" controversy). I still find it more interesting than what shipped. The dynamics of mass taste versus design courage remain one of the most fascinating problems in the field.
   Image: first industrial design (`9d26ae_e79167464d95499ead974e907b928191~mv2.png`)

---

## Image URL Pattern

All images use the wixstatic base URL. For `next/image`, use the full-quality URL:
```
https://static.wixstatic.com/media/{hash}~mv2.{ext}/v1/fit/w_1200,h_900,q_90,enc_avif,quality_auto/{hash}~mv2.{ext}
```

The `remotePatterns` for `static.wixstatic.com` is already configured in `next.config.ts`.

---

## Files Changed

| File | Change |
|------|--------|
| `src/data/caseStudies.ts` | Extend interface; populate all 4 studies |
| `src/app/work/[slug]/page.tsx` | Hero image fix; section image rendering |

No new files. No new dependencies.
