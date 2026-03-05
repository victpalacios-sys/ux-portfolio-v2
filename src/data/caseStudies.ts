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
  sections: { heading: string; body: string; image?: string; imageAlt?: string }[]
  featured: boolean
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'distribution-networks',
    title: 'Designing Distribution Networks',
    tag: 'Construction Tech',
    outcome:
      'End-to-end UX for a greenfield B2B design tool targeting a $10B+ market in construction distribution network design.',
    description:
      'A completely new application for the construction industry — from expert discovery and user research through to a full cross-platform interface for designing complex distribution networks.',
    coverImage:
      '/images/distribution-networks-hero-v2.png',
    year: '2024',
    client: 'Confidential',
    role: 'Lead UX Designer',
    tools: 'Figma, FigJam, Miro',
    featured: true,
    sections: [
      {
        heading: 'The Market Opportunity',
        body: "The construction industry's distribution network design market exceeds $10B. The largest and most accessible segment is small, simple projects: cookie-cutter buildings like apartment complexes, hotels, and offices. The primary strategic objective was to penetrate this high-volume segment first — winning on speed and simplicity — while building the foundation to expand into medium and complex installations over time.",
        image:
          '/images/distribution-networks-section-market.png',
        imageAlt: 'Market size diagram showing small, medium, and complex project segments',
      },
      {
        heading: 'Discovery: Experts & Users',
        body: 'Research began with expert interviews to map the high-level industry process — who does what, when, and how projects flow from concept to installation. From there, I interviewed both highly experienced designers and complete beginners to understand the detailed workflow at the task level and identify the core goals driving each user type. Internal workshops synthesised findings and aligned the team around a shared problem framing.',
        image:
          '/images/distribution-networks-section-discovery.png',
        imageAlt: 'Research and interviews synthesis diagram',
      },
      {
        heading: 'The Hierarchy of Needs',
        body: 'Three forces drive every distribution network designer. Time is money — literally. Labour at every stage is expensive, and mistakes discovered late cost ten times more to fix. Simulations are essential to get the design right before installation. Collaboration matters: these projects involve multiple teams and companies, and smooth information-sharing reduces both cost and conflict. Finally, it is a business: designers need high-quality documentation and visual renders to impress clients and win future projects.',
        image:
          '/images/distribution-networks-section-needs.jpg',
        imageAlt: 'Camera installation context photo illustrating the real-world job site',
      },
      {
        heading: 'Design Principles',
        body: 'Six principles guided every decision: easy to use — accessible for beginners without penalising experts; fast path to success — from zero to a working design as quickly as possible; progressive mastery — a clear path from novice to advanced; company expertise built in — best practices encoded in the tool, not left implicit; delight — visual quality and feature richness both matter; fast delivery — ship value quickly and iterate.',
        image:
          '/images/distribution-networks-section-principles.png',
        imageAlt: 'Design principles diagram',
      },
      {
        heading: 'Defining the MVP',
        body: 'The minimum viable product answers one question: what is the smallest useful thing a designer will pay for? For this market, that answer was two capabilities: simulate camera coverage and generate a bill of materials. These two screens prove the core value loop — a designer can input a floor plan, place cameras, immediately verify coverage requirements are met, and know what the installation will cost.',
        image:
          '/images/distribution-networks-section-mvp.png',
        imageAlt: 'Camera coverage simulation screen — the MVP',
      },
      {
        heading: 'Interface Design',
        body: 'After more than 100 iterations using Material Design as the base system, a clear design language emerged. The application assumes expert users: no-nonsense flows, canvas at centre stage, tools at the edges. Icons carry short descriptions to support new users without cluttering the workspace for experienced ones. The four core screens — Home, Project Details, Building View, and the Floorplan canvas — each have a single primary job.',
        image:
          '/images/distribution-networks-hero-v2.png',
        imageAlt: 'Floorplan view — the core design canvas',
      },
      {
        heading: 'Cross-Platform Strategy',
        body: 'Desktop: side panels are non-modal, staying open while the designer moves between tools and canvas. Tablet: the app bar and main tools are retained; panels adapt. Mobile: panels become modal to maximise canvas space. Precision placement on touch uses a two-step flow — pan to position the crosshair target, then tap to insert — eliminating the drag errors that plague direct-placement interactions on small screens.',
        image:
          '/images/distribution-networks-section-interface.png',
        imageAlt: 'Quick path to success flow showing guided new-user experience',
      },
    ],
  },
  {
    slug: 'ibwave-floorplans',
    title: 'Importing Floorplans in iBwave',
    tag: 'Enterprise B2B',
    outcome:
      'Reduced building model import from 6–12 hours of manual tracing to under 3 minutes — and proved scale by importing the entire Burj Khalifa structure in 10 minutes.',
    description:
      "iBwave Design is the global standard for indoor wireless network design. I redesigned the BIM file import workflow — discovering Autodesk's Forge API and driving months of internal advocacy — to eliminate the most time-consuming step in every project.",
    coverImage:
      '/images/ibwave-hero.jpg',
    year: '2022',
    client: 'iBwave Solutions',
    role: 'Senior UX Designer',
    tools: 'Figma, Axure, Sketch',
    featured: true,
    sections: [
      {
        heading: 'The Problem: Days Lost to Manual Tracing',
        body: "Every wireless network design began the same way: an engineer importing a floor plan image and manually tracing every structural element — walls, doors, windows, columns — one by one. iBwave's simulation engine needed to know where every barrier was and what material it was made of, and the only way to get that data was human labour. A medium-sized office building took 6–12 hours. A stadium or hospital: one to two weeks. This was the unavoidable first step before a single antenna could be placed.",
        image:
          '/images/ibwave-section-problem.jpg',
        imageAlt: 'Manual floor plan tracing workflow — the problem state',
      },
      {
        heading: 'Technical Strategy: Finding Semantic CAD',
        body: "Customer files were 2D PDFs — structural outlines with no embedded semantic data. Automation was impossible from that starting point. Research led to Autodesk's Forge platform: APIs for reading modern 3D BIM formats like Revit, which carry rich semantic information. Every element is identified (wall, door, window) and every material is tagged. Full automation became technically feasible. The business case was harder. It took months of prototyping, presentations, and internal advocacy to secure the investment to build it.",
        image:
          '/images/ibwave-section-strategy.jpeg',
        imageAlt: 'Technical research diagram showing the Autodesk Forge discovery process',
      },
      {
        heading: 'Result: 3 Minutes, Any Building on Earth',
        body: "The alpha release reduced building model import from hours to under three minutes for a typical office or hotel. The team needed a memorable proof of scale. We imported the complete structure of the Burj Khalifa — all walls, doors, windows, and floors — in under ten minutes. The feature shipped to iBwave's global user base of wireless network engineers.",
        image:
          '/images/ibwave-section-result.png',
        imageAlt: 'Autodesk Forge implementation — the solution in action',
      },
      {
        heading: 'The Import Wizard',
        body: 'The import flow is a four-step wizard: select the BIM file; choose the building floors; select the structural layers (walls, doors, windows, stairs, floors); confirm the import into iBwave Design. The application automatically selects all relevant views and layers — the engineer only needs to intervene for exceptions. What took days now takes a few minutes of confirmation.',
        image:
          '/images/ibwave-section-wizard.png',
        imageAlt: 'Four-step import wizard wireframes',
      },
      {
        heading: 'Three-Panel Workspace',
        body: 'The import screen divides into three coordinated panels: the Wizard/Browser for step-by-step guidance, a 2D Viewer showing the floor plan, and a 3D Viewer showing the volumetric model. Engineers can visually confirm their selections in real space before committing. Material mapping happens automatically — BIM materials (concrete, glass, wood) are matched to iBwave simulation materials without manual input.',
        image:
          '/images/ibwave-section-workspace.png',
        imageAlt: 'Three-panel workspace: wizard, 2D viewer, 3D viewer',
      },
      {
        heading: 'Graceful Error Handling',
        body: 'When automatic material mapping encounters an unknown or ambiguous BIM material, an error icon surfaces on the specific item. One click opens a targeted dialog where the engineer selects the correct iBwave material for that type. The system handles the routine cases; the human handles the edge cases. The happy path stays frictionless; the engineer is never abandoned when something unexpected occurs.',
        image:
          '/images/ibwave-section-errors.png',
        imageAlt: 'Error state dialog for manual material mapping exception',
      },
    ],
  },
  {
    slug: 'currency-exchange',
    title: 'Currency Exchange for Travellers',
    tag: 'Consumer Finance',
    outcome:
      'Designed a frictionless mobile-first currency exchange experience that eliminates the hidden 8–12% cost of traditional FX and reduces the anxiety of managing foreign cash.',
    description:
      'A mobile-first currency exchange app for travellers who need to exchange money quickly without confusion. Focused on reducing cognitive load at the point of conversion.',
    coverImage:
      '/images/currency-exchange-hero.png',
    year: '2020',
    client: 'Fintech startup',
    role: 'UX Designer',
    tools: 'Figma, Maze',
    featured: true,
    sections: [
      {
        heading: 'The Hidden Tax on Travel',
        body: 'Traditional currency exchange extracts 8–12% through a combination of opaque exchange rate markups, inconvenient airport kiosks, fee-laden credit card transactions, and leftover cash that is hard to sell back at a fair rate. The pain is distributed across the entire travel journey — planning, departure, destination, and return — making it easy to underestimate how much is being lost.',
        image:
          '/images/currency-exchange-hero.png',
        imageAlt: 'Problem overview: the hidden costs of traditional currency exchange',
      },
      {
        heading: 'The Value Proposition',
        body: 'Fair, transparent rates using minimal margins on wholesale exchange rates. Flexible delivery options: home, destination, or airport pickup. Easy sell-back of leftover currency at the same fair rate. This is not just cheaper — it removes the timing stress of wondering when to exchange and reduces the psychological overhead of handling unfamiliar foreign cash in an unfamiliar place.',
        image:
          '/images/currency-exchange-section-value.png',
        imageAlt: 'Value proposition diagram: fair rates, flexible delivery, easy sell-back',
      },
      {
        heading: 'The Design Challenge',
        body: 'Three tensions shaped the design: building trust for sensitive money transactions inside a mobile app; simplifying genuinely complex decisions about rates, timing, and amounts; and integrating multiple distinct touchpoints — mobile ordering, delivery tracking, and sell-back — without the experience feeling like a financial dashboard. The goal was confidence, not complexity.',
      },
      {
        heading: 'Core Solution: Conversational Commerce',
        body: 'An AI-powered chatbot lets customers either follow structured prompts or state their needs directly — \"I need €500 by Friday\" — without having to navigate menus or understand exchange rate mechanics first. A traditional form flow is also available for users who prefer explicit control over every variable. The chatbot handles ambiguity and reduces cognitive load; the form provides certainty for those who want it.',
        image:
          '/images/currency-exchange-section-chatbot.png',
        imageAlt: 'Wireframes showing conversational chatbot and form-based ordering flows',
      },
    ],
  },
  {
    slug: 'nokia-7710',
    title: 'Nokia 7710',
    tag: 'Mobile Hardware',
    outcome:
      "Designed the touch interaction model and core UI for Nokia's first touch-only smartphone — three years before the iPhone redefined the category.",
    description:
      "One of the earliest touchscreen smartphone UX designs in the industry. Designed the touch interaction model for Nokia's 7710 — before the iPhone.",
    coverImage:
      '/images/nokia-hero.png',
    year: '2004',
    client: 'Nokia',
    role: 'UX Designer',
    tools: 'Early prototyping tools, Nokia internal design system',
    featured: true,
    sections: [
      {
        heading: 'The First Wave of Smartphones',
        body: 'The Nokia 7710 launched in 2004 alongside the Palm Treo as part of the first generation of devices that would eventually define the smartphone era. My primary contributions were UI design for call handling, camera, media browser, and settings — alongside active participation in usability studies and the cross-team design of the Series 90 UI Style, Nokia\'s shared interaction framework for the platform.',
        image:
          '/images/nokia-section-overview.png',
        imageAlt: 'Nokia 7710 project overview showing UI screens and device design',
      },
      {
        heading: 'Hardware UX: Where Software Meets Physical Design',
        body: "I contributed to the physical design decisions: button placement, button sizing, overall device dimensions, and stylus design. The device shipped with a half-VGA touchscreen, an Opera web browser, Bluetooth, Wi-Fi, GPS, GSM, and a full media suite — ambitious specifications for 2004. A multi-function Voice key compressed three distinct interactions into a single physical control: short press to record a voice memo, long press to voice-dial, and during a call to switch to speakerphone.",
        image:
          '/images/nokia-section-hardware.png',
        imageAlt: 'Final Nokia 7710 industrial design — the shipped device',
      },
      {
        heading: 'The Road Not Taken',
        body: "The original industrial design was a bold statement — wide, flat, and deliberately unlike anything else on the market. It didn't survive public reception; critics drew comparisons to the N-Gage \"side-talking\" controversy, and the design was revised before launch. I still find the original more interesting than what shipped. The dynamics of mass taste versus design courage remain one of the most fascinating and unresolved tensions in the field.",
        image:
          '/images/nokia-section-original.png',
        imageAlt: 'Original Nokia 7710 industrial design concept — the road not taken',
      },
    ],
  },
]

export const featuredCaseStudies = caseStudies.filter((c) => c.featured)

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug)
}
