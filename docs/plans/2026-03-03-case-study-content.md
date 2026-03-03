# Case Study Content & Hero Image Fix — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Populate all 4 case studies with rich content from victorpalacios.ca (rewritten for impact), add inline section images, and fix the hero image crop.

**Architecture:** Two files only. `caseStudies.ts` gets an extended interface and fully populated data. The case study page (`[slug]/page.tsx`) gets a fixed hero container and a section image renderer. No new files, no new dependencies.

**Tech Stack:** Next.js 16 App Router, TypeScript, next/image, Tailwind v4, wixstatic.com CDN (already in remotePatterns).

---

### Task 1: Fix hero image + add section image renderer

**Files:**
- Modify: `src/app/work/[slug]/page.tsx`

The hero currently uses `aspectRatio: '21/9'` + `object-cover`. Portrait images (Nokia, Currency) are heavily cropped. Fix: fixed-height container + `object-contain`.

The section renderer only renders heading + body paragraph. Add conditional image block after body.

**Step 1: Replace the hero image block**

Find this block (around line 97–108):

```tsx
{/* Hero image */}
<div
  className="relative w-full overflow-hidden"
  style={{ aspectRatio: '21/9', background: 'var(--color-surface-2)' }}
>
  <Image
    src={study.coverImage}
    alt={study.title}
    fill
    className="object-cover"
  />
</div>
```

Replace with:

```tsx
{/* Hero image */}
<div
  className="relative w-full overflow-hidden"
  style={{
    height: '600px',
    maxHeight: '70vh',
    background: 'var(--color-surface-2)',
  }}
>
  <Image
    src={study.coverImage}
    alt={study.title}
    fill
    className="object-contain"
  />
</div>
```

**Step 2: Update the section renderer to show optional images**

Find this block (around line 113–129):

```tsx
{study.sections.map((section) => (
  <div key={section.heading} className="mb-12">
    <h2
      className="font-serif text-2xl mb-4"
      style={{ color: 'var(--color-foreground)' }}
    >
      {section.heading}
    </h2>
    <p
      className="leading-relaxed"
      style={{ color: 'var(--color-muted)' }}
    >
      {section.body}
    </p>
  </div>
))}
```

Replace with:

```tsx
{study.sections.map((section) => (
  <div key={section.heading} className="mb-12">
    <h2
      className="font-serif text-2xl mb-4"
      style={{ color: 'var(--color-foreground)' }}
    >
      {section.heading}
    </h2>
    <p
      className="leading-relaxed"
      style={{ color: 'var(--color-muted)' }}
    >
      {section.body}
    </p>
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
  </div>
))}
```

**Step 3: Verify TypeScript compiles**

```bash
cd /c/dev/UXPortfolioV2 && npx tsc --noEmit
```

Expected: no errors (the `section.image` field doesn't exist yet on the type — it will after Task 2, so you may see one TS error here; that is expected and will be fixed next).

**Step 4: Commit**

```bash
cd /c/dev/UXPortfolioV2 && git add src/app/work/[slug]/page.tsx && git commit -m "fix: hero object-contain + section image renderer"
```

---

### Task 2: Extend CaseStudy interface

**Files:**
- Modify: `src/data/caseStudies.ts` (lines 1–14, the interface only)

**Step 1: Update the `sections` type in the interface**

Find:
```typescript
  sections: { heading: string; body: string }[]
```

Replace with:
```typescript
  sections: { heading: string; body: string; image?: string; imageAlt?: string }[]
```

**Step 2: Verify TypeScript compiles clean**

```bash
cd /c/dev/UXPortfolioV2 && npx tsc --noEmit
```

Expected: 0 errors.

**Step 3: Commit**

```bash
cd /c/dev/UXPortfolioV2 && git add src/data/caseStudies.ts && git commit -m "feat: extend CaseStudy sections with optional image fields"
```

---

### Task 3: Populate Distribution Networks

**Files:**
- Modify: `src/data/caseStudies.ts` — `distribution-networks` entry only

**Step 1: Replace the `distribution-networks` object**

Find the current entry (slug: `'distribution-networks'`). Replace the entire object with:

```typescript
  {
    slug: 'distribution-networks',
    title: 'Designing Distribution Networks',
    tag: 'Construction Tech',
    outcome:
      'End-to-end UX for a greenfield B2B design tool targeting a $10B+ market in construction distribution network design.',
    description:
      'A completely new application for the construction industry — from expert discovery and user research through to a full cross-platform interface for designing complex distribution networks.',
    coverImage:
      'https://static.wixstatic.com/media/9d26ae_e94f60af3e5b4e9d8a2de5e15bd0fa61~mv2.png/v1/fill/w_722,h_407,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/9d26ae_e94f60af3e5b4e9d8a2de5e15bd0fa61~mv2.png',
    year: '2024',
    client: 'Confidential',
    role: 'Lead UX Designer',
    tools: 'Figma, FigJam, Miro',
    featured: true,
    sections: [
      {
        heading: 'The Market Opportunity',
        body: 'The construction industry\'s distribution network design market exceeds $10B. The largest and most accessible segment is small, simple projects: cookie-cutter buildings like apartment complexes, hotels, and offices. The primary strategic objective was to penetrate this high-volume segment first — winning on speed and simplicity — while building the foundation to expand into medium and complex installations over time.',
        image:
          'https://static.wixstatic.com/media/9d26ae_2759e668472e497fbec71d6013787af8~mv2.png/v1/fit/w_1200,h_900,q_90,enc_avif,quality_auto/9d26ae_2759e668472e497fbec71d6013787af8~mv2.png',
        imageAlt: 'Market size diagram showing small, medium, and complex project segments',
      },
      {
        heading: 'Discovery: Experts & Users',
        body: 'Research began with expert interviews to map the high-level industry process — who does what, when, and how projects flow from concept to installation. From there, I interviewed both highly experienced designers and complete beginners to understand the detailed workflow at the task level and identify the core goals driving each user type. Internal workshops synthesised findings and aligned the team around a shared problem framing.',
        image:
          'https://static.wixstatic.com/media/9d26ae_ea5f495b8a44463c9c9b2524ef42317d~mv2.png/v1/fit/w_1200,h_900,q_90,enc_avif,quality_auto/9d26ae_ea5f495b8a44463c9c9b2524ef42317d~mv2.png',
        imageAlt: 'Research and interviews synthesis diagram',
      },
      {
        heading: 'The Hierarchy of Needs',
        body: 'Three forces drive every distribution network designer. Time is money — literally. Labour at every stage is expensive, and mistakes discovered late cost ten times more to fix. Simulations are essential to get the design right before installation. Collaboration matters: these projects involve multiple teams and companies, and smooth information-sharing reduces both cost and conflict. Finally, it is a business: designers need high-quality documentation and visual renders to impress clients and win future projects.',
        image:
          'https://static.wixstatic.com/media/11062b_dff7ae8a67f747b492c835d874c21c17~mv2.jpg/v1/fit/w_1200,h_900,q_90,enc_avif,quality_auto/11062b_dff7ae8a67f747b492c835d874c21c17~mv2.jpg',
        imageAlt: 'Camera installation context photo illustrating the real-world job site',
      },
      {
        heading: 'Design Principles',
        body: 'Six principles guided every decision: easy to use — accessible for beginners without penalising experts; fast path to success — from zero to a working design as quickly as possible; progressive mastery — a clear path from novice to advanced; company expertise built in — best practices encoded in the tool, not left implicit; delight — visual quality and feature richness both matter; fast delivery — ship value quickly and iterate.',
        image:
          'https://static.wixstatic.com/media/9d26ae_5f3247710f9a43908c94c925762e6cdd~mv2.png/v1/fit/w_1200,h_900,q_90,enc_avif,quality_auto/9d26ae_5f3247710f9a43908c94c925762e6cdd~mv2.png',
        imageAlt: 'Design principles diagram',
      },
      {
        heading: 'Defining the MVP',
        body: 'The minimum viable product answers one question: what is the smallest useful thing a designer will pay for? For this market, that answer was two capabilities: simulate camera coverage and generate a bill of materials. These two screens prove the core value loop — a designer can input a floor plan, place cameras, immediately verify coverage requirements are met, and know what the installation will cost.',
        image:
          'https://static.wixstatic.com/media/9d26ae_7ccf77dc3cc54d84b64a43f31e67c981~mv2.png/v1/fit/w_1200,h_900,q_90,enc_avif,quality_auto/9d26ae_7ccf77dc3cc54d84b64a43f31e67c981~mv2.png',
        imageAlt: 'Camera coverage simulation screen — the MVP',
      },
      {
        heading: 'Interface Design',
        body: 'After more than 100 iterations using Material Design as the base system, a clear design language emerged. The application assumes expert users: no-nonsense flows, canvas at centre stage, tools at the edges. Icons carry short descriptions to support new users without cluttering the workspace for experienced ones. The four core screens — Home, Project Details, Building View, and the Floorplan canvas — each have a single primary job.',
        image:
          'https://static.wixstatic.com/media/9d26ae_e94f60af3e5b4e9d8a2de5e15bd0fa61~mv2.png/v1/fit/w_1200,h_900,q_90,enc_avif,quality_auto/9d26ae_e94f60af3e5b4e9d8a2de5e15bd0fa61~mv2.png',
        imageAlt: 'Floorplan view — the core design canvas',
      },
      {
        heading: 'Cross-Platform Strategy',
        body: 'Desktop: side panels are non-modal, staying open while the designer moves between tools and canvas. Tablet: the app bar and main tools are retained; panels adapt. Mobile: panels become modal to maximise canvas space. Precision placement on touch uses a two-step flow — pan to position the crosshair target, then tap to insert — eliminating the drag errors that plague direct-placement interactions on small screens.',
        image:
          'https://static.wixstatic.com/media/9d26ae_f5f625894b9146169d778176c771cfd8~mv2.png/v1/fit/w_1200,h_900,q_90,enc_avif,quality_auto/9d26ae_f5f625894b9146169d778176c771cfd8~mv2.png',
        imageAlt: 'Quick path to success flow showing guided new-user experience',
      },
    ],
  },
```

**Step 2: Verify TypeScript**

```bash
cd /c/dev/UXPortfolioV2 && npx tsc --noEmit
```

Expected: 0 errors.

**Step 3: Commit**

```bash
cd /c/dev/UXPortfolioV2 && git add src/data/caseStudies.ts && git commit -m "content: populate Distribution Networks case study"
```

---

### Task 4: Populate iBwave case study

**Files:**
- Modify: `src/data/caseStudies.ts` — `ibwave-floorplans` entry only

**Step 1: Replace the `ibwave-floorplans` object**

Find the entry with `slug: 'ibwave-floorplans'`. Replace entirely with:

```typescript
  {
    slug: 'ibwave-floorplans',
    title: 'Importing Floorplans in iBwave',
    tag: 'Enterprise B2B',
    outcome:
      'Reduced building model import from 6–12 hours of manual tracing to under 3 minutes — and proved scale by importing the entire Burj Khalifa structure in 10 minutes.',
    description:
      'iBwave Design is the global standard for indoor wireless network design. I redesigned the BIM file import workflow — discovering Autodesk\'s Forge API and driving months of internal advocacy — to eliminate the most time-consuming step in every project.',
    coverImage:
      'https://static.wixstatic.com/media/9d26ae_63d92a23d9a14b3cbdebc60d93d7d0f2~mv2.jpg/v1/fill/w_480,h_433,q_90,enc_avif,quality_auto/9d26ae_63d92a23d9a14b3cbdebc60d93d7d0f2~mv2.jpg',
    year: '2022',
    client: 'iBwave Solutions',
    role: 'Senior UX Designer',
    tools: 'Figma, Axure, Sketch',
    featured: true,
    sections: [
      {
        heading: 'The Problem: Days Lost to Manual Tracing',
        body: 'Every wireless network design began the same way: an engineer importing a floor plan image and manually tracing every structural element — walls, doors, windows, columns — one by one. iBwave\'s simulation engine needed to know where every barrier was and what material it was made of, and the only way to get that data was human labour. A medium-sized office building took 6–12 hours. A stadium or hospital: one to two weeks. This was the unavoidable first step before a single antenna could be placed.',
        image:
          'https://static.wixstatic.com/media/9d26ae_be23ce84d2ec4719bfd2cf5198edd882~mv2.jpg/v1/fit/w_1200,h_900,q_90,enc_avif,quality_auto/9d26ae_be23ce84d2ec4719bfd2cf5198edd882~mv2.jpg',
        imageAlt: 'Manual floor plan tracing workflow — the problem state',
      },
      {
        heading: 'Technical Strategy: Finding Semantic CAD',
        body: 'Customer files were 2D PDFs — structural outlines with no embedded semantic data. Automation was impossible from that starting point. Research led to Autodesk\'s Forge platform: APIs for reading modern 3D BIM formats like Revit, which carry rich semantic information. Every element is identified (wall, door, window) and every material is tagged. Full automation became technically feasible. The business case was harder. It took months of prototyping, presentations, and internal advocacy to secure the investment to build it.',
        image:
          'https://static.wixstatic.com/media/9d26ae_a668afd75f894ed686745b01fadd9005~mv2.jpeg/v1/fit/w_1200,h_900,q_90,enc_avif,quality_auto/9d26ae_a668afd75f894ed686745b01fadd9005~mv2.jpeg',
        imageAlt: 'Technical research diagram showing the Autodesk Forge discovery process',
      },
      {
        heading: 'Result: 3 Minutes, Any Building on Earth',
        body: 'The alpha release reduced building model import from hours to under three minutes for a typical office or hotel. The team needed a memorable proof of scale. We imported the complete structure of the Burj Khalifa — all walls, doors, windows, and floors — in under ten minutes. The feature shipped to iBwave\'s global user base of wireless network engineers.',
        image:
          'https://static.wixstatic.com/media/9d26ae_5518a43a94224bceb929cc14dd8f67eb~mv2.png/v1/fit/w_1200,h_900,q_90,enc_avif,quality_auto/9d26ae_5518a43a94224bceb929cc14dd8f67eb~mv2.png',
        imageAlt: 'Autodesk Forge implementation — the solution in action',
      },
      {
        heading: 'The Import Wizard',
        body: 'The import flow is a four-step wizard: select the BIM file; choose the building floors; select the structural layers (walls, doors, windows, stairs, floors); confirm the import into iBwave Design. The application automatically selects all relevant views and layers — the engineer only needs to intervene for exceptions. What took days now takes a few minutes of confirmation.',
        image:
          'https://static.wixstatic.com/media/9d26ae_4b80cd8b5d8f48b4bc7ae343ccabfe8e~mv2.png/v1/fit/w_1200,h_900,q_90,enc_avif,quality_auto/9d26ae_4b80cd8b5d8f48b4bc7ae343ccabfe8e~mv2.png',
        imageAlt: 'Four-step import wizard wireframes',
      },
      {
        heading: 'Three-Panel Workspace',
        body: 'The import screen divides into three coordinated panels: the Wizard/Browser for step-by-step guidance, a 2D Viewer showing the floor plan, and a 3D Viewer showing the volumetric model. Engineers can visually confirm their selections in real space before committing. Material mapping happens automatically — BIM materials (concrete, glass, wood) are matched to iBwave simulation materials without manual input.',
        image:
          'https://static.wixstatic.com/media/9d26ae_31214b7d89a142068c223582119d3ddd~mv2.png/v1/fit/w_1200,h_900,q_90,enc_avif,quality_auto/9d26ae_31214b7d89a142068c223582119d3ddd~mv2.png',
        imageAlt: 'Three-panel workspace: wizard, 2D viewer, 3D viewer',
      },
      {
        heading: 'Graceful Error Handling',
        body: 'When automatic material mapping encounters an unknown or ambiguous BIM material, an error icon surfaces on the specific item. One click opens a targeted dialog where the engineer selects the correct iBwave material for that type. The system handles the routine cases; the human handles the edge cases. The happy path stays frictionless; the engineer is never abandoned when something unexpected occurs.',
        image:
          'https://static.wixstatic.com/media/9d26ae_1486788310404474a14fc3009bb8822d~mv2.png/v1/fit/w_1200,h_900,q_90,enc_avif,quality_auto/9d26ae_1486788310404474a14fc3009bb8822d~mv2.png',
        imageAlt: 'Error state dialog for manual material mapping exception',
      },
    ],
  },
```

**Step 2: Verify TypeScript**

```bash
cd /c/dev/UXPortfolioV2 && npx tsc --noEmit
```

Expected: 0 errors.

**Step 3: Commit**

```bash
cd /c/dev/UXPortfolioV2 && git add src/data/caseStudies.ts && git commit -m "content: populate iBwave BIM import case study"
```

---

### Task 5: Populate Currency Exchange case study

**Files:**
- Modify: `src/data/caseStudies.ts` — `currency-exchange` entry only

**Step 1: Replace the `currency-exchange` object**

Find the entry with `slug: 'currency-exchange'`. Replace entirely with:

```typescript
  {
    slug: 'currency-exchange',
    title: 'Currency Exchange for Travellers',
    tag: 'Consumer Finance',
    outcome:
      'Designed a frictionless mobile-first currency exchange experience that eliminates the hidden 8–12% cost of traditional FX — using an AI chatbot to reduce the cognitive load of money decisions.',
    description:
      'A fintech startup offering fair-rate currency exchange with flexible delivery. I designed the end-to-end mobile experience: from problem framing and value proposition through to a conversational UI that makes complex financial decisions feel simple.',
    coverImage:
      'https://static.wixstatic.com/media/9d26ae_af99deeba7af48e0b24c8f62f58ef35b~mv2.png/v1/fit/w_480,h_480,q_90,enc_avif,quality_auto/9d26ae_af99deeba7af48e0b24c8f62f58ef35b~mv2.png',
    year: '2020',
    client: 'Fintech startup',
    role: 'UX Designer',
    tools: 'Figma, Maze',
    featured: true,
    sections: [
      {
        heading: 'The Hidden Tax on Travel',
        body: 'Travellers paying for foreign currency face an invisible 8–12% surcharge baked into exchange rates at airport kiosks, hotel desks, and bank counters — often without realising it. Credit card foreign transaction fees add another layer. The experience is stressful: rates change daily, timing is unclear, and leftover cash from the trip is difficult to sell back at a fair price. The problem is not just cost — it is friction and anxiety distributed across the entire travel journey.',
        image:
          'https://static.wixstatic.com/media/9d26ae_af99deeba7af48e0b24c8f62f58ef35b~mv2.png/v1/fit/w_1200,h_900,q_90,enc_avif,quality_auto/9d26ae_af99deeba7af48e0b24c8f62f58ef35b~mv2.png',
        imageAlt: 'Problem visualisation — the pain points of traditional currency exchange',
      },
      {
        heading: 'The Value Proposition',
        body: 'The service offers wholesale-proximate exchange rates with a transparent, minimal margin — no hidden fees. Delivery is flexible: order currency to your home before departure, pick it up at your destination, or collect it at the airport. Leftover currency can be sold back easily. The combination of fair pricing, convenience, and reversibility removes both the financial and psychological burden of managing foreign cash.',
        image:
          'https://static.wixstatic.com/media/9d26ae_c597eebd58784b5abb64ac6e9187925d~mv2.png/v1/fit/w_1200,h_900,q_90,enc_avif,quality_auto/9d26ae_c597eebd58784b5abb64ac6e9187925d~mv2.png',
        imageAlt: 'Value proposition diagram — fair rates, flexible delivery, easy sell-back',
      },
      {
        heading: 'The Design Challenge',
        body: 'Money is high-stakes. A currency exchange product must build trust quickly, simplify decisions that feel complex (which rate? how much? when?), and make the user feel in control at every step. The design needed to work across multiple touchpoints — mobile ordering, delivery tracking, sell-back — and serve two distinct users: travellers who want it handled as simply as possible, and careful planners who want full explicit control.',
      },
      {
        heading: 'Core Solution: Conversational Commerce',
        body: 'An AI-powered chatbot sits at the centre of the experience. Users can either follow structured prompts ("How much EUR do you need?") or state their need directly ("I need €500 delivered to my hotel in Paris by Thursday"). A traditional form flow is also available for users who prefer explicit, step-by-step control. The chatbot handles ambiguity and reduces cognitive load for most users; the form provides certainty for those who need it.',
        image:
          'https://static.wixstatic.com/media/9d26ae_494067064eef49eab0c489ce2c47648c~mv2.png/v1/fit/w_1200,h_900,q_90,enc_avif,quality_auto/9d26ae_494067064eef49eab0c489ce2c47648c~mv2.png',
        imageAlt: 'Wireframes: home screen, chatbot interface, and traditional order form',
      },
    ],
  },
```

**Step 2: Verify TypeScript**

```bash
cd /c/dev/UXPortfolioV2 && npx tsc --noEmit
```

Expected: 0 errors.

**Step 3: Commit**

```bash
cd /c/dev/UXPortfolioV2 && git add src/data/caseStudies.ts && git commit -m "content: populate Currency Exchange case study"
```

---

### Task 6: Populate Nokia case study

**Files:**
- Modify: `src/data/caseStudies.ts` — `nokia-7710` entry only

**Step 1: Replace the `nokia-7710` object**

Find the entry with `slug: 'nokia-7710'`. Replace entirely with:

```typescript
  {
    slug: 'nokia-7710',
    title: 'Nokia 7710',
    tag: 'Mobile Hardware',
    outcome:
      "Designed the touch interaction model and core UI for Nokia's first touch-only smartphone — three years before the iPhone redefined the category.",
    description:
      "One of the earliest touchscreen smartphone UX designs in the industry. I designed the UI for call handling, camera, media browser, and settings — and contributed to the physical industrial design — on the Nokia 7710, launched in 2004.",
    coverImage:
      'https://static.wixstatic.com/media/9d26ae_634d005b16de428f979d29370d73c462~mv2.png/v1/fit/w_480,h_271,q_90,enc_avif,quality_auto/9d26ae_634d005b16de428f979d29370d73c462~mv2.png',
    year: '2004',
    client: 'Nokia',
    role: 'UX Designer',
    tools: 'Nokia internal tools, early prototyping methods',
    featured: true,
    sections: [
      {
        heading: 'The First Wave of Smartphones',
        body: "The Nokia 7710 launched in 2004 — three years before the iPhone — as part of the first generation of touch-only smartphones, alongside the Palm Treo (2002). The project included an extensive study of the Palm OS UI style (Nokia had planned a Palm partnership) and deep technical grounding in Bluetooth, GSM, CDMA, and RF spectrum. My primary contributions: UI design for call handling, camera, media browser, and device settings — plus active participation in usability testing and the cross-functional design of the Series 90 UI Style shared across Nokia's touchscreen device family.",
        image:
          'https://static.wixstatic.com/media/9d26ae_2f724723369a41e3afbc986c34583d10~mv2.png/v1/fit/w_1200,h_900,q_90,enc_avif,quality_auto/9d26ae_2f724723369a41e3afbc986c34583d10~mv2.png',
        imageAlt: 'Nokia 7710 project overview showing the device and UI contributions',
      },
      {
        heading: 'Hardware UX: Where Software Meets Physical Design',
        body: "I contributed to the physical form factor: button placement and sizing, overall device dimensions, and the stylus design. The device shipped with a half-VGA touchscreen and a full application suite — camera, camcorder, media player, contacts, calendar, text messaging, and the Opera browser — alongside Bluetooth, Wi-Fi, GPS, and GSM. A single Voice key handled three functions: short press for voice recording, long press for voice dialling, in-call press to toggle speakerphone. Working across a multi-site international team on this project provided formative lessons in navigating cultural differences in design decision-making.",
        image:
          'https://static.wixstatic.com/media/9d26ae_dc661e7463c04e3dbf19b630a3ce1da0~mv2.png/v1/fit/w_1200,h_900,q_90,enc_avif,quality_auto/9d26ae_dc661e7463c04e3dbf19b630a3ce1da0~mv2.png',
        imageAlt: 'Final Nokia 7710 industrial design — the shipped device',
      },
      {
        heading: 'The Road Not Taken',
        body: "The original industrial design was bold — wide, flat, and deliberately unlike anything on the market. It didn't survive public testing; critics made the same 'side-talking' comparisons that had plagued the N-Gage. The safer design shipped. The broader question — why does mass taste so consistently punish genuine formal innovation while rewarding incremental refinement — remains one of the most fascinating and unresolved tensions in the field.",
        image:
          'https://static.wixstatic.com/media/9d26ae_e79167464d95499ead974e907b928191~mv2.png/v1/fit/w_1200,h_900,q_90,enc_avif,quality_auto/9d26ae_e79167464d95499ead974e907b928191~mv2.png',
        imageAlt: 'First Nokia 7710 industrial design — the bold original concept',
      },
    ],
  },
```

**Step 2: Verify TypeScript**

```bash
cd /c/dev/UXPortfolioV2 && npx tsc --noEmit
```

Expected: 0 errors.

**Step 3: Commit**

```bash
cd /c/dev/UXPortfolioV2 && git add src/data/caseStudies.ts && git commit -m "content: populate Nokia 7710 case study"
```

---

### Task 7: Full build verification + visual check

**Step 1: Run full production build**

```bash
cd /c/dev/UXPortfolioV2 && npm run build
```

Expected: ✓ Compiled successfully, 0 errors, all 9 routes static.

**Step 2: Start the dev server if not running**

```bash
cd /c/dev/UXPortfolioV2 && npm run dev -- --port 3001 &
```

Wait ~15s, then verify `curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/` returns `200`.

**Step 3: Visual check — hero image**

Navigate to `http://localhost:3001/work/nokia-7710`. The hero image should show the full Nokia phone without cropping. Also check `http://localhost:3001/work/currency-exchange` — the mobile mockup should be fully visible.

**Step 4: Visual check — section content + images**

On any case study page, scroll through sections. Each section should show: heading, body text, then the image below (where applicable) in a rounded container with no cropping.

**Step 5: Push to GitHub**

```bash
cd /c/dev/UXPortfolioV2 && git push origin main
```
