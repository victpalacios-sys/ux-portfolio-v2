# Portfolio Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build victorpalacios.ca as a dark/gold premium consulting portfolio in Next.js + Tailwind that converts visitors to discovery-call bookings.

**Architecture:** Next.js 15 App Router with TypeScript. Case study content lives in TypeScript data files (no CMS). Framer Motion handles scroll reveal animations. Single-scroll homepage, deep-dive case study pages, about page, blog pages.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS v3, Framer Motion, Google Fonts (Playfair Display + Inter), Vercel deployment.

---

## Reference: Design Tokens

```
Background:   #080808
Surface:      #111111, #1A1A1A
Accent gold:  #C9A84C
Text primary: #F0EDE8
Text muted:   #6B6B6B
Border:       #222222
```

Fonts: `Playfair Display` (headlines), `Inter` (body/UI)

---

## Task 1: Project Scaffold

**Files:**
- Create: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.js`, `next.config.ts`

**Step 1: Initialize Next.js project**

```bash
cd /c/dev/UXPortfolioV2
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-turbopack
```

When prompted, accept all defaults. Answer NO to `Would you like to use Turbopack for next dev?` (stability).

**Step 2: Install additional dependencies**

```bash
npm install framer-motion
npm install -D @types/node
```

**Step 3: Verify the dev server starts**

```bash
npm run dev
```

Open http://localhost:3000 — should show the default Next.js page.

**Step 4: Remove boilerplate**

Delete `src/app/page.tsx` contents and replace with a blank page:

```tsx
export default function Home() {
  return <main>hello</main>
}
```

Delete `src/app/globals.css` contents (we'll replace).

**Step 5: Commit**

```bash
git init
git add .
git commit -m "chore: scaffold Next.js 15 + Tailwind project"
```

---

## Task 2: Design Tokens + Global Styles

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

**Step 1: Configure Tailwind with design tokens**

Replace `tailwind.config.ts` with:

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#080808',
        surface: '#111111',
        'surface-2': '#1A1A1A',
        gold: '#C9A84C',
        'gold-light': '#D4B86A',
        foreground: '#F0EDE8',
        muted: '#6B6B6B',
        border: '#222222',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 6vw, 5.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2rem, 4vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.5rem, 2.5vw, 2.25rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      maxWidth: {
        content: '1200px',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
```

**Step 2: Write global CSS**

Replace `src/app/globals.css` with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');

@layer base {
  * {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
  }

  body {
    @apply bg-background text-foreground font-sans;
  }

  h1, h2, h3 {
    @apply font-serif;
  }

  ::selection {
    background: #C9A84C33;
    color: #F0EDE8;
  }

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: #111111;
  }

  ::-webkit-scrollbar-thumb {
    background: #C9A84C55;
    border-radius: 3px;
  }
}

@layer utilities {
  .label {
    @apply text-xs font-sans font-medium tracking-[0.2em] uppercase text-gold;
  }

  .section-padding {
    @apply px-6 py-20 md:px-10 lg:px-16;
  }

  .container-content {
    @apply max-w-content mx-auto w-full;
  }

  .gold-line {
    @apply border-t border-gold/20;
  }
}
```

**Step 3: Update root layout with fonts + metadata**

Replace `src/app/layout.tsx` with:

```tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Victor Palacios — Senior UX Consultant',
  description: 'Senior UX consultant helping product teams ship software people actually use. 25+ years experience. Book a discovery call.',
  openGraph: {
    title: 'Victor Palacios — Senior UX Consultant',
    description: 'I turn complex systems into simple, human experiences.',
    url: 'https://www.victorpalacios.ca',
    siteName: 'Victor Palacios',
    locale: 'en_CA',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

**Step 4: Verify fonts + colors load**

```bash
npm run dev
```

Check http://localhost:3000. Background should be near-black. Verify no console errors.

**Step 5: Commit**

```bash
git add .
git commit -m "chore: add design tokens, global styles, and font imports"
```

---

## Task 3: Navigation Component

**Files:**
- Create: `src/components/Nav.tsx`
- Modify: `src/app/layout.tsx`

**Step 1: Create Nav component**

Create `src/components/Nav.tsx`:

```tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/95 backdrop-blur-sm border-b border-border' : 'bg-transparent'
      }`}
    >
      <nav className="container-content flex items-center justify-between h-16 px-6 md:px-10 lg:px-16">
        {/* Logo */}
        <Link
          href="/"
          className="font-serif text-lg text-foreground hover:text-gold transition-colors"
        >
          Victor Palacios
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/work" className="text-sm text-muted hover:text-foreground transition-colors">
            Work
          </Link>
          <Link href="/about" className="text-sm text-muted hover:text-foreground transition-colors">
            About
          </Link>
          <Link href="/blog" className="text-sm text-muted hover:text-foreground transition-colors">
            Blog
          </Link>
          <Link
            href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ133_yypE3yVbKay8QDsmXVGrhtn5z9zoLZPtQNfbALcn0qNTwL7-iMMwu53VSfY911u5kfYIA6"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium bg-gold text-background px-4 py-2 rounded-full hover:bg-gold-light transition-colors"
          >
            Book a Call →
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block h-px w-6 bg-foreground transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block h-px w-6 bg-foreground transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-px w-6 bg-foreground transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-surface border-b border-border px-6 py-6 flex flex-col gap-4">
          <Link href="/work" className="text-sm text-muted hover:text-foreground" onClick={() => setMenuOpen(false)}>Work</Link>
          <Link href="/about" className="text-sm text-muted hover:text-foreground" onClick={() => setMenuOpen(false)}>About</Link>
          <Link href="/blog" className="text-sm text-muted hover:text-foreground" onClick={() => setMenuOpen(false)}>Blog</Link>
          <Link
            href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ133_yypE3yVbKay8QDsmXVGrhtn5z9zoLZPtQNfbALcn0qNTwL7-iMMwu53VSfY911u5kfYIA6"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium bg-gold text-background px-4 py-2 rounded-full text-center"
            onClick={() => setMenuOpen(false)}
          >
            Book a Call →
          </Link>
        </div>
      )}
    </header>
  )
}
```

**Step 2: Add Nav to root layout**

Modify `src/app/layout.tsx` — add Nav import and render it:

```tsx
import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'

export const metadata: Metadata = {
  title: 'Victor Palacios — Senior UX Consultant',
  description: 'Senior UX consultant helping product teams ship software people actually use. 25+ years experience. Book a discovery call.',
  openGraph: {
    title: 'Victor Palacios — Senior UX Consultant',
    description: 'I turn complex systems into simple, human experiences.',
    url: 'https://www.victorpalacios.ca',
    siteName: 'Victor Palacios',
    locale: 'en_CA',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
      </body>
    </html>
  )
}
```

**Step 3: Verify in browser**

```bash
npm run dev
```

- Nav appears at top, transparent
- Scroll down → nav gets dark background
- Resize to mobile → hamburger appears, tap to open/close

**Step 4: Commit**

```bash
git add src/components/Nav.tsx src/app/layout.tsx
git commit -m "feat: add sticky nav with mobile menu"
```

---

## Task 4: Hero Section

**Files:**
- Create: `src/components/HeroSection.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create HeroSection component**

Create `src/components/HeroSection.tsx`:

```tsx
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center section-padding pt-32 overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#C9A84C 1px, transparent 1px), linear-gradient(90deg, #C9A84C 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container-content relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="label mb-6">Senior UX Consultant</p>

          <h1 className="font-serif text-display-xl text-foreground max-w-4xl mb-8 leading-tight">
            I turn complex systems into{' '}
            <span className="text-gold italic">simple, human</span>{' '}
            experiences
          </h1>

          <p className="text-lg text-muted max-w-xl mb-12 leading-relaxed">
            Helping product teams ship software people actually use —
            from research and strategy to interfaces that work.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a
              href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ133_yypE3yVbKay8QDsmXVGrhtn5z9zoLZPtQNfbALcn0qNTwL7-iMMwu53VSfY911u5kfYIA6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gold text-background font-medium px-7 py-3.5 rounded-full hover:bg-gold-light transition-colors text-sm"
            >
              Book a Discovery Call
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            <Link
              href="#work"
              className="text-sm text-muted hover:text-foreground transition-colors flex items-center gap-2"
            >
              See my work
              <span className="text-gold">↓</span>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  )
}
```

**Step 2: Update homepage**

Replace `src/app/page.tsx`:

```tsx
import HeroSection from '@/components/HeroSection'

export default function Home() {
  return (
    <main>
      <HeroSection />
    </main>
  )
}
```

**Step 3: Verify**

```bash
npm run dev
```

- Full-screen hero with dark background and subtle gold grid
- Serif headline with gold italic "simple, human"
- Gold "Book a Discovery Call" button
- Fade-in animation on load

**Step 4: Commit**

```bash
git add src/components/HeroSection.tsx src/app/page.tsx
git commit -m "feat: add hero section with animation"
```

---

## Task 5: Credibility Bar

**Files:**
- Create: `src/components/CredibilityBar.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create CredibilityBar**

Create `src/components/CredibilityBar.tsx`:

```tsx
const items = [
  '25+ years UX experience',
  'Nokia',
  'iBwave',
  'Construction tech',
  'Montreal — remote-friendly',
]

export default function CredibilityBar() {
  return (
    <div className="border-y border-border bg-surface/50 py-4 overflow-hidden">
      <div className="container-content px-6 md:px-10 lg:px-16">
        <div className="flex flex-wrap items-center justify-center md:justify-between gap-x-8 gap-y-2">
          {items.map((item, i) => (
            <span key={i} className="flex items-center gap-3 text-xs tracking-wide text-muted">
              {i > 0 && <span className="hidden md:block text-border">·</span>}
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
```

**Step 2: Add to homepage**

Modify `src/app/page.tsx`:

```tsx
import HeroSection from '@/components/HeroSection'
import CredibilityBar from '@/components/CredibilityBar'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <CredibilityBar />
    </main>
  )
}
```

**Step 3: Verify**

Thin bar below hero with credibility signals. Verify text wraps correctly on mobile.

**Step 4: Commit**

```bash
git add src/components/CredibilityBar.tsx src/app/page.tsx
git commit -m "feat: add credibility bar"
```

---

## Task 6: Services Section

**Files:**
- Create: `src/components/ServicesSection.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create ServicesSection**

Create `src/components/ServicesSection.tsx`:

```tsx
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const services = [
  {
    icon: '◎',
    title: 'UX Strategy & Research',
    description:
      'Uncover what your users actually need. I run discovery sprints, user interviews, and competitive analysis to turn ambiguity into a clear product direction.',
  },
  {
    icon: '⬡',
    title: 'Product Design & Systems',
    description:
      'From wireframes to high-fidelity UI and design systems. I design interfaces that scale — with components your team can own and evolve.',
  },
  {
    icon: '△',
    title: 'UX Audits & Team Coaching',
    description:
      'Get an outside perspective on what's broken and why. I audit existing products and coach design teams to level up their process and output.',
  },
]

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="p-8 bg-surface border border-border rounded-2xl hover:border-gold/30 transition-colors group"
    >
      <span className="text-2xl text-gold mb-6 block">{service.icon}</span>
      <h3 className="font-serif text-xl text-foreground mb-3">{service.title}</h3>
      <p className="text-sm text-muted leading-relaxed">{service.description}</p>
    </motion.div>
  )
}

export default function ServicesSection() {
  return (
    <section className="section-padding">
      <div className="container-content">
        <p className="label mb-4">Services</p>
        <h2 className="font-serif text-display-md text-foreground max-w-2xl mb-12">
          What I can do for your team
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

**Step 2: Add to homepage**

```tsx
import HeroSection from '@/components/HeroSection'
import CredibilityBar from '@/components/CredibilityBar'
import ServicesSection from '@/components/ServicesSection'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <CredibilityBar />
      <ServicesSection />
    </main>
  )
}
```

**Step 3: Verify**

Three cards in a row on desktop, stacked on mobile. Cards have hover gold border. Scroll-reveal animation fires once.

**Step 4: Commit**

```bash
git add src/components/ServicesSection.tsx src/app/page.tsx
git commit -m "feat: add services section with scroll reveal"
```

---

## Task 7: Case Study Data + Types

**Files:**
- Create: `src/data/caseStudies.ts`

**Step 1: Create case study data file**

Create `src/data/caseStudies.ts`:

```ts
export interface CaseStudy {
  slug: string
  title: string
  tag: string
  outcome: string
  description: string
  coverImage: string // URL to Wix CDN or placeholder
  year: string
  client: string
  role: string
  tools: string
  sections: {
    heading: string
    body: string
  }[]
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
    outcome: 'Streamlined a critical workflow for 10,000+ wireless network engineers worldwide',
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
    outcome: 'Pioneered touchscreen UX for Nokia\'s first touch-only smartphone in 2004',
    description:
      'One of the earliest touchscreen smartphone UX designs in the industry. Designed the touch interaction model for Nokia\'s 7710 — before the iPhone.',
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
```

**Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

**Step 3: Commit**

```bash
git add src/data/caseStudies.ts
git commit -m "feat: add case study data and types"
```

---

## Task 8: Selected Work Section

**Files:**
- Create: `src/components/WorkSection.tsx`
- Create: `src/components/WorkCard.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create WorkCard**

Create `src/components/WorkCard.tsx`:

```tsx
'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { CaseStudy } from '@/data/caseStudies'

export default function WorkCard({ study, index }: { study: CaseStudy; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/work/${study.slug}`}
        className="group block bg-surface border border-border rounded-2xl overflow-hidden hover:border-gold/30 transition-colors"
      >
        {/* Image */}
        <div className="relative w-full aspect-[16/9] bg-surface-2 overflow-hidden">
          <Image
            src={study.coverImage}
            alt={study.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            unoptimized // Wix CDN images
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="label text-[10px]">{study.tag}</span>
            <span className="text-xs text-muted">{study.year}</span>
          </div>
          <h3 className="font-serif text-xl text-foreground mb-2 group-hover:text-gold transition-colors">
            {study.title}
          </h3>
          <p className="text-sm text-muted leading-relaxed mb-4">{study.outcome}</p>
          <span className="text-xs text-gold flex items-center gap-1.5">
            View case study
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 6h10M5.5 1L11 6l-5.5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>
      </Link>
    </motion.div>
  )
}
```

**Step 2: Create WorkSection**

Create `src/components/WorkSection.tsx`:

```tsx
import Link from 'next/link'
import WorkCard from './WorkCard'
import { featuredCaseStudies } from '@/data/caseStudies'

export default function WorkSection() {
  return (
    <section id="work" className="section-padding border-t border-border">
      <div className="container-content">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="label mb-4">Selected Work</p>
            <h2 className="font-serif text-display-md text-foreground max-w-lg">
              Projects that shaped complex products
            </h2>
          </div>
          <Link
            href="/work"
            className="hidden md:flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
          >
            All projects
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredCaseStudies.map((study, i) => (
            <WorkCard key={study.slug} study={study} index={i} />
          ))}
        </div>

        <div className="mt-8 md:hidden">
          <Link
            href="/work"
            className="text-sm text-muted hover:text-foreground transition-colors flex items-center gap-2"
          >
            All projects →
          </Link>
        </div>
      </div>
    </section>
  )
}
```

**Step 3: Add to homepage**

```tsx
import HeroSection from '@/components/HeroSection'
import CredibilityBar from '@/components/CredibilityBar'
import ServicesSection from '@/components/ServicesSection'
import WorkSection from '@/components/WorkSection'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <CredibilityBar />
      <ServicesSection />
      <WorkSection />
    </main>
  )
}
```

**Step 4: Verify**

2×2 grid of case study cards. Images load from Wix CDN. Hover: image scales, title turns gold, border gets a subtle gold tint. "All projects →" link on desktop top-right.

**Step 5: Commit**

```bash
git add src/components/WorkCard.tsx src/components/WorkSection.tsx src/app/page.tsx
git commit -m "feat: add selected work section with case study cards"
```

---

## Task 9: Process Section

**Files:**
- Create: `src/components/ProcessSection.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create ProcessSection**

Create `src/components/ProcessSection.tsx`:

```tsx
'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const steps = [
  {
    number: '01',
    title: 'Discover',
    description: 'Research, stakeholder interviews, user interviews, competitive analysis. Understand the problem before touching a pixel.',
  },
  {
    number: '02',
    title: 'Define',
    description: 'Synthesis, problem framing, success metrics. Turn research into a sharp problem statement and design brief.',
  },
  {
    number: '03',
    title: 'Design',
    description: 'Wireframes, prototypes, iteration loops with users. From low-fidelity concepts to tested, refined solutions.',
  },
  {
    number: '04',
    title: 'Deliver',
    description: 'Final UI, design system, developer handoff. Staying involved through implementation to ensure fidelity.',
  },
]

export default function ProcessSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="section-padding border-t border-border bg-surface/30">
      <div className="container-content">
        <p className="label mb-4">Process</p>
        <h2 className="font-serif text-display-md text-foreground max-w-lg mb-16">
          How I work
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Connector line (desktop) */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-4 left-[calc(100%-1rem)] w-full h-px bg-border" />
              )}

              <span className="text-4xl font-serif text-gold/20 font-bold block mb-4">{step.number}</span>
              <h3 className="font-serif text-lg text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

**Step 2: Add to homepage**

Add `<ProcessSection />` after `<WorkSection />` in `src/app/page.tsx`.

**Step 3: Verify**

4 steps in a row on desktop. Number in large faded gold. Connector line between steps. Stacked on mobile.

**Step 4: Commit**

```bash
git add src/components/ProcessSection.tsx src/app/page.tsx
git commit -m "feat: add process section"
```

---

## Task 10: About Teaser

**Files:**
- Create: `src/components/AboutTeaser.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create AboutTeaser**

Create `src/components/AboutTeaser.tsx`:

```tsx
'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function AboutTeaser() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="section-padding border-t border-border">
      <div className="container-content">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-surface-2 max-w-sm mx-auto md:mx-0"
          >
            <Image
              src="https://static.wixstatic.com/media/9d26ae_1e501f86745f49179044289b9b7f730d~mv2.jpg/v1/crop/x_76,y_0,w_348,h_544/fill/w_417,h_653,al_c,lg_1,q_80,enc_avif,quality_auto/Victor%20Selfie_edited.jpg"
              alt="Victor Palacios"
              fill
              className="object-cover"
              unoptimized
            />
            {/* Subtle gold overlay on edges */}
            <div className="absolute inset-0 ring-1 ring-gold/10 rounded-2xl" />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="label mb-6">About</p>
            <h2 className="font-serif text-display-md text-foreground mb-6">
              25 years of making software make sense
            </h2>
            <p className="text-muted leading-relaxed mb-4">
              I've been practicing UX since 2000, when I joined Nokia and made a pivotal shift from engineering into design.
              Since then I've worked across mobile hardware, enterprise B2B software, construction tech, fintech, and more.
            </p>
            <p className="text-muted leading-relaxed mb-8">
              I'm based in Montreal, work remotely with teams worldwide, and believe that the best design work happens when
              you understand the domain deeply before designing anything.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm text-gold hover:text-gold-light transition-colors"
            >
              Read more about me
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

**Step 2: Add to homepage**

Add `<AboutTeaser />` after `<ProcessSection />` in `src/app/page.tsx`.

**Step 3: Verify**

Two-column layout: photo left, text right. Animates in from sides. Responsive (stacked on mobile).

**Step 4: Commit**

```bash
git add src/components/AboutTeaser.tsx src/app/page.tsx
git commit -m "feat: add about teaser section"
```

---

## Task 11: Footer CTA + Footer

**Files:**
- Create: `src/components/FooterCTA.tsx`
- Create: `src/components/Footer.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/layout.tsx`

**Step 1: Create FooterCTA**

Create `src/components/FooterCTA.tsx`:

```tsx
'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function FooterCTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="section-padding border-t border-border relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gold/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container-content relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="label mb-6">Let's Work Together</p>
          <h2 className="font-serif text-display-lg text-foreground max-w-3xl mx-auto mb-8">
            Ready to bring clarity to your product?
          </h2>
          <p className="text-muted max-w-lg mx-auto mb-10 leading-relaxed">
            Whether you need a research sprint, a full product redesign, or a design partner
            for your team — let's start with a 30-minute conversation.
          </p>
          <a
            href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ133_yypE3yVbKay8QDsmXVGrhtn5z9zoLZPtQNfbALcn0qNTwL7-iMMwu53VSfY911u5kfYIA6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gold text-background font-medium px-8 py-4 rounded-full hover:bg-gold-light transition-colors text-sm"
          >
            Book a Discovery Call
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
```

**Step 2: Create Footer**

Create `src/components/Footer.tsx`:

```tsx
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface/50 py-10 px-6 md:px-10 lg:px-16">
      <div className="container-content flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <Link href="/" className="font-serif text-foreground hover:text-gold transition-colors">
            Victor Palacios
          </Link>
          <p className="text-xs text-muted mt-1">Senior UX Consultant · Montreal</p>
        </div>

        <div className="flex items-center gap-6 text-xs text-muted">
          <Link href="/work" className="hover:text-foreground transition-colors">Work</Link>
          <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
          <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
          <a href="mailto:victpalacios@gmail.com" className="hover:text-foreground transition-colors">
            victpalacios@gmail.com
          </a>
          <a
            href="https://www.linkedin.com/in/victorpalacios/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            LinkedIn
          </a>
        </div>

        <p className="text-xs text-muted">
          © {new Date().getFullYear()} Victor Palacios
        </p>
      </div>
    </footer>
  )
}
```

**Step 3: Add FooterCTA to homepage, Footer to layout**

In `src/app/page.tsx` add `<FooterCTA />` as the last section (before closing `</main>`).

In `src/app/layout.tsx` add Footer after `{children}`:

```tsx
import Footer from '@/components/Footer'
// ...
<body>
  <Nav />
  {children}
  <Footer />
</body>
```

**Step 4: Verify**

Full homepage visible end-to-end: Hero → Credibility → Services → Work → Process → About → CTA → Footer.

**Step 5: Commit**

```bash
git add src/components/FooterCTA.tsx src/components/Footer.tsx src/app/page.tsx src/app/layout.tsx
git commit -m "feat: add footer CTA and footer — homepage complete"
```

---

## Task 12: Case Study Detail Page

**Files:**
- Create: `src/app/work/[slug]/page.tsx`
- Create: `src/components/CaseStudyHero.tsx`
- Create: `src/components/FloatingCTA.tsx`

**Step 1: Create FloatingCTA**

Create `src/components/FloatingCTA.tsx`:

```tsx
'use client'

import { useEffect, useState } from 'react'

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <a
      href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ133_yypE3yVbKay8QDsmXVGrhtn5z9zoLZPtQNfbALcn0qNTwL7-iMMwu53VSfY911u5kfYIA6"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-gold text-background text-sm font-medium px-5 py-3 rounded-full shadow-lg hover:bg-gold-light transition-all animate-fade-up"
    >
      Book a Call →
    </a>
  )
}
```

**Step 2: Create case study page**

Create `src/app/work/[slug]/page.tsx`:

```tsx
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getCaseStudy, caseStudies } from '@/data/caseStudies'
import FloatingCTA from '@/components/FloatingCTA'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const study = getCaseStudy(slug)
  if (!study) return {}
  return {
    title: `${study.title} — Victor Palacios`,
    description: study.outcome,
  }
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const study = getCaseStudy(slug)
  if (!study) notFound()

  const allStudies = caseStudies
  const currentIndex = allStudies.findIndex((c) => c.slug === slug)
  const prev = currentIndex > 0 ? allStudies[currentIndex - 1] : null
  const next = currentIndex < allStudies.length - 1 ? allStudies[currentIndex + 1] : null

  return (
    <>
      <FloatingCTA />
      <main className="pt-24">
        {/* Header */}
        <div className="section-padding pb-0">
          <div className="container-content">
            <Link href="/work" className="label text-muted hover:text-gold transition-colors mb-8 inline-block">
              ← All Work
            </Link>
            <span className="label block mb-4">{study.tag}</span>
            <h1 className="font-serif text-display-lg text-foreground max-w-3xl mb-6">
              {study.title}
            </h1>
            <p className="text-lg text-muted max-w-2xl mb-12 leading-relaxed">
              {study.outcome}
            </p>

            {/* Context strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-border pt-8 mb-12">
              {[
                { label: 'Client', value: study.client },
                { label: 'Role', value: study.role },
                { label: 'Year', value: study.year },
                { label: 'Tools', value: study.tools },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="label text-[10px] mb-1">{label}</p>
                  <p className="text-sm text-foreground">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hero image */}
        <div className="relative w-full aspect-[21/9] bg-surface-2 overflow-hidden">
          <Image
            src={study.coverImage}
            alt={study.title}
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        {/* Body */}
        <div className="section-padding">
          <div className="container-content max-w-3xl">
            {study.sections.length > 0 ? (
              study.sections.map((section) => (
                <div key={section.heading} className="mb-12">
                  <h2 className="font-serif text-2xl text-foreground mb-4">{section.heading}</h2>
                  <p className="text-muted leading-relaxed">{section.body}</p>
                </div>
              ))
            ) : (
              <p className="text-muted italic">
                Full case study available upon request — book a discovery call to discuss this project in detail.
              </p>
            )}
          </div>
        </div>

        {/* Project navigation */}
        <div className="border-t border-border section-padding">
          <div className="container-content flex justify-between items-center">
            {prev ? (
              <Link href={`/work/${prev.slug}`} className="group flex items-center gap-3 text-muted hover:text-foreground transition-colors">
                <span className="text-gold">←</span>
                <div>
                  <p className="label text-[10px] mb-0.5">Previous</p>
                  <p className="text-sm font-serif">{prev.title}</p>
                </div>
              </Link>
            ) : <div />}
            {next ? (
              <Link href={`/work/${next.slug}`} className="group flex items-center gap-3 text-right text-muted hover:text-foreground transition-colors">
                <div>
                  <p className="label text-[10px] mb-0.5">Next</p>
                  <p className="text-sm font-serif">{next.title}</p>
                </div>
                <span className="text-gold">→</span>
              </Link>
            ) : <div />}
          </div>
        </div>
      </main>
    </>
  )
}
```

**Step 3: Verify**

Navigate to http://localhost:3000/work/distribution-networks

- Heading, tag, outcome, context strip (Client/Role/Year/Tools)
- Full-width hero image
- "Full case study available upon request" placeholder body
- Prev/Next navigation
- Floating "Book a Call" button appears after scrolling 400px

**Step 4: Commit**

```bash
git add src/app/work/[slug]/page.tsx src/components/FloatingCTA.tsx
git commit -m "feat: add case study detail pages with floating CTA"
```

---

## Task 13: All Work Page

**Files:**
- Create: `src/app/work/page.tsx`

**Step 1: Create all-work page**

Create `src/app/work/page.tsx`:

```tsx
import WorkCard from '@/components/WorkCard'
import { caseStudies } from '@/data/caseStudies'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Work — Victor Palacios',
  description: 'UX case studies across enterprise software, consumer apps, mobile hardware, and construction tech.',
}

export default function WorkPage() {
  return (
    <main className="pt-28 section-padding">
      <div className="container-content">
        <p className="label mb-4">Work</p>
        <h1 className="font-serif text-display-lg text-foreground max-w-2xl mb-4">
          All Projects
        </h1>
        <p className="text-muted mb-16 max-w-lg leading-relaxed">
          25 years of UX work across industries. Every project begins with a problem that matters.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {caseStudies.map((study, i) => (
            <WorkCard key={study.slug} study={study} index={i} />
          ))}
        </div>
      </div>
    </main>
  )
}
```

**Step 2: Verify**

Navigate to http://localhost:3000/work — grid of all case studies.

**Step 3: Commit**

```bash
git add src/app/work/page.tsx
git commit -m "feat: add all work page"
```

---

## Task 14: About Page

**Files:**
- Create: `src/app/about/page.tsx`

**Step 1: Create about page**

Create `src/app/about/page.tsx`:

```tsx
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — Victor Palacios',
  description: 'Senior UX consultant with 25+ years experience. Based in Montreal.',
}

const milestones = [
  { year: '2000', event: 'Joined Nokia — pivoted from electronics engineering into UX design' },
  { year: '2004', event: 'Shipped Nokia 7710: one of the first touchscreen smartphone UX designs in the industry' },
  { year: '2010s', event: 'Senior UX Designer at iBwave — enterprise B2B software for wireless network engineers' },
  { year: '2020+', event: 'Independent UX consultant — startups, scaleups, and innovation teams' },
]

export default function AboutPage() {
  return (
    <main className="pt-28 section-padding">
      <div className="container-content max-w-4xl">
        <p className="label mb-4">About</p>

        {/* Hero */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start mb-20">
          <div>
            <h1 className="font-serif text-display-lg text-foreground mb-6">
              Victor Palacios
            </h1>
            <p className="text-lg text-muted leading-relaxed mb-4">
              I've been making software easier to use since 2000. My background in Electronics Engineering means I can
              hold my own with engineers — which makes collaboration faster and the output better.
            </p>
            <p className="text-muted leading-relaxed mb-8">
              I believe great design is invisible. When it works, users don't think about the interface — they just
              accomplish their goals. That's the standard I hold myself to.
            </p>
            <a
              href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ133_yypE3yVbKay8QDsmXVGrhtn5z9zoLZPtQNfbALcn0qNTwL7-iMMwu53VSfY911u5kfYIA6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gold text-background font-medium px-6 py-3 rounded-full hover:bg-gold-light transition-colors text-sm"
            >
              Book a Discovery Call →
            </a>
          </div>

          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-surface-2 max-w-xs mx-auto md:mx-0">
            <Image
              src="https://static.wixstatic.com/media/9d26ae_1e501f86745f49179044289b9b7f730d~mv2.jpg/v1/crop/x_76,y_0,w_348,h_544/fill/w_417,h_653,al_c,lg_1,q_80,enc_avif,quality_auto/Victor%20Selfie_edited.jpg"
              alt="Victor Palacios"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>

        {/* Career milestones */}
        <div className="border-t border-border pt-16 mb-16">
          <p className="label mb-8">Career Arc</p>
          <div className="space-y-8">
            {milestones.map((m) => (
              <div key={m.year} className="flex gap-8">
                <span className="text-sm text-gold font-mono w-16 shrink-0 pt-0.5">{m.year}</span>
                <p className="text-muted leading-relaxed">{m.event}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Personal */}
        <div className="border-t border-border pt-16">
          <p className="label mb-6">The person behind the work</p>
          <p className="text-muted leading-relaxed max-w-2xl mb-4">
            Born in Mexico City. Raised in Baja California. Studied Electronics Engineering and Computer Science at
            Universidad Autónoma Metropolitana. Moved to Vancouver in 1998 for the internet boom, now based in Montreal.
          </p>
          <p className="text-muted leading-relaxed max-w-2xl">
            I cycle everywhere in summer, walk daily in winter, attend jazz and pop concerts, and read obsessively
            across design, physics, psychology, history, and entrepreneurship. I thrive in hackathons — intense
            collaboration with smart people working on real problems.
          </p>
        </div>
      </div>
    </main>
  )
}
```

**Step 2: Verify**

Navigate to http://localhost:3000/about — photo, bio, career milestones, personal section, CTA button.

**Step 3: Commit**

```bash
git add src/app/about/page.tsx
git commit -m "feat: add about page"
```

---

## Task 15: Blog Pages (Minimal)

**Files:**
- Create: `src/app/blog/page.tsx`

**Step 1: Create blog index (placeholder)**

Create `src/app/blog/page.tsx`:

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog — Victor Palacios',
  description: 'Thoughts on UX, product design, and working with complex systems.',
}

export default function BlogPage() {
  return (
    <main className="pt-28 section-padding">
      <div className="container-content max-w-3xl">
        <p className="label mb-4">Blog</p>
        <h1 className="font-serif text-display-lg text-foreground mb-6">
          Writing
        </h1>
        <p className="text-muted leading-relaxed">
          Blog posts coming soon. In the meantime,{' '}
          <a
            href="https://www.linkedin.com/in/victorpalacios/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:text-gold-light transition-colors"
          >
            follow me on LinkedIn
          </a>{' '}
          for shorter-form thoughts on UX and product design.
        </p>
      </div>
    </main>
  )
}
```

**Step 2: Verify**

Navigate to http://localhost:3000/blog — clean placeholder page.

**Step 3: Commit**

```bash
git add src/app/blog/page.tsx
git commit -m "feat: add blog placeholder page"
```

---

## Task 16: 404 Page

**Files:**
- Create: `src/app/not-found.tsx`

**Step 1: Create 404 page**

Create `src/app/not-found.tsx`:

```tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center section-padding">
      <div className="container-content text-center">
        <p className="label mb-6">404</p>
        <h1 className="font-serif text-display-lg text-foreground mb-4">Page not found</h1>
        <p className="text-muted mb-8">This page doesn't exist — let's get you back on track.</p>
        <Link href="/" className="text-gold hover:text-gold-light transition-colors text-sm">
          ← Back to home
        </Link>
      </div>
    </main>
  )
}
```

**Step 2: Verify**

Navigate to http://localhost:3000/anything-fake — 404 page renders with dark theme.

**Step 3: Commit**

```bash
git add src/app/not-found.tsx
git commit -m "feat: add 404 page"
```

---

## Task 17: Build Verification + Lint

**Step 1: Run ESLint**

```bash
npm run lint
```

Fix any errors (warnings OK).

**Step 2: Run production build**

```bash
npm run build
```

Expected: all pages compile without errors. Check for any TypeScript errors or missing `alt` tags.

**Step 3: Run production server locally**

```bash
npm start
```

Navigate through all pages at http://localhost:3000 and verify:
- [ ] Homepage scrolls through all sections
- [ ] All 4 case study pages load
- [ ] /work loads
- [ ] /about loads
- [ ] /blog loads
- [ ] /nonexistent returns 404
- [ ] Nav "Book a Call" button opens Google Calendar
- [ ] Mobile menu works
- [ ] Floating CTA appears on scroll in case study pages

**Step 4: Commit if any fixes made**

```bash
git add .
git commit -m "fix: resolve build warnings and lint errors"
```

---

## Task 18: Vercel Deployment

**Step 1: Push to GitHub**

```bash
git remote add origin https://github.com/YOUR_USERNAME/ux-portfolio-v2.git
git push -u origin main
```

(Create the GitHub repo first at github.com/new)

**Step 2: Deploy to Vercel**

- Go to vercel.com → New Project → Import Git repository
- Select the repo
- Framework: Next.js (auto-detected)
- No env vars needed
- Click Deploy

**Step 3: Verify deployment**

- Visit the Vercel URL (e.g. `ux-portfolio-v2.vercel.app`)
- Check all pages work on the live URL

**Step 4: Connect custom domain**

In Vercel dashboard:
- Settings → Domains → Add `victorpalacios.ca` and `www.victorpalacios.ca`
- Vercel provides DNS records — update Wix DNS to point to Vercel
- Wait for SSL propagation (5–30 min)

---

## Summary

Total tasks: 18
Key commits: ~18 atomic commits
Pages: `/`, `/work`, `/work/[slug]` (×4), `/about`, `/blog`, `404`
Components: Nav, HeroSection, CredibilityBar, ServicesSection, WorkCard, WorkSection, ProcessSection, AboutTeaser, FooterCTA, Footer, FloatingCTA
