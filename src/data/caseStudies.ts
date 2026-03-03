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
      'https://static.wixstatic.com/media/9d26ae_e94f60af3e5b4e9d8a2de5e15bd0fa61~mv2.png/v1/fill/w_722,h_407,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/9d26ae_e94f60af3e5b4e9d8a2de5e15bd0fa61~mv2.png',
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
  {
    slug: 'ibwave-floorplans',
    title: 'Importing Floorplans in iBwave',
    tag: 'Enterprise B2B',
    outcome: 'Streamlined a critical workflow for wireless network engineers worldwide',
    description:
      'iBwave Design is the industry standard for indoor wireless network design. I redesigned the BIM file import workflow to reduce friction for engineers working at scale.',
    coverImage:
      'https://static.wixstatic.com/media/9d26ae_63d92a23d9a14b3cbdebc60d93d7d0f2~mv2.jpg/v1/fill/w_480,h_433,q_90,enc_avif,quality_auto/9d26ae_63d92a23d9a14b3cbdebc60d93d7d0f2~mv2.jpg',
    year: '2018',
    client: 'iBwave Solutions',
    role: 'Senior UX Designer',
    tools: 'Axure, Sketch',
    sections: [],
    featured: true,
  },
  {
    slug: 'currency-exchange',
    title: 'Currency Exchange for Travellers',
    tag: 'Consumer Finance',
    outcome: 'Designed a frictionless mobile experience for first-time currency exchange users',
    description:
      'A mobile-first currency exchange app for travellers who need to exchange money quickly without confusion. Focused on reducing cognitive load at the point of conversion.',
    coverImage:
      'https://static.wixstatic.com/media/9d26ae_af99deeba7af48e0b24c8f62f58ef35b~mv2.png/v1/fit/w_480,h_480,q_90,enc_avif,quality_auto/9d26ae_af99deeba7af48e0b24c8f62f58ef35b~mv2.png',
    year: '2020',
    client: 'Fintech startup',
    role: 'UX Designer',
    tools: 'Figma, Maze',
    sections: [],
    featured: true,
  },
  {
    slug: 'nokia-7710',
    title: 'Nokia 7710',
    tag: 'Mobile Hardware',
    outcome: "Pioneered touchscreen UX for Nokia's first touch-only smartphone in 2004",
    description:
      "One of the earliest touchscreen smartphone UX designs in the industry. Designed the touch interaction model for Nokia's 7710 — before the iPhone.",
    coverImage:
      'https://static.wixstatic.com/media/9d26ae_634d005b16de428f979d29370d73c462~mv2.png/v1/fit/w_480,h_271,q_90,enc_avif,quality_auto/9d26ae_634d005b16de428f979d29370d73c462~mv2.png',
    year: '2004',
    client: 'Nokia',
    role: 'UX Designer',
    tools: 'Early prototyping tools',
    sections: [],
    featured: true,
  },
]

export const featuredCaseStudies = caseStudies.filter((c) => c.featured)

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug)
}
