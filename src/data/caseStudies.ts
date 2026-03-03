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
  sections: { heading: string; body: string }[]
  featured: boolean
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'distribution-networks',
    title: 'Designing Distribution Networks',
    tag: 'Construction Tech',
    outcome: 'End-to-end UX for a greenfield B2B application targeting a $10B+ market',
    description:
      'A completely new application for the construction industry — from discovery and user research through to a full interface for designing complex distribution networks.',
    coverImage:
      'https://static.wixstatic.com/media/9d26ae_e94f60af3e5b4e9d8a2de5e15bd0fa61~mv2.png/v1/fill/w_722,h_407,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/9d26ae_e94f60af3e5b4e9d8a2de5e15bd0fa61~mv2.png',
    year: '2024',
    client: 'Confidential',
    role: 'Lead UX Designer',
    tools: 'Figma, FigJam, Miro',
    sections: [],
    featured: true,
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
