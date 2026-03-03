# Victor Palacios Portfolio Redesign — Design Document

**Date:** 2026-03-03
**Goal:** Redesign victorpalacios.ca to generate consulting deals for a senior UX designer
**Stack:** Next.js + Tailwind CSS
**Hosted:** Vercel (recommended)

---

## Design Decisions

### Target Audience
Mixed — startups through enterprise, no single vertical. Site must signal seniority and strategic thinking across contexts.

### Primary CTA
**Book a discovery call** — this is the conversion goal. Every section should guide visitors toward this action.

### Visual Language

| Token | Value |
|---|---|
| Background | `#080808` |
| Surface | `#111111`, `#1A1A1A` |
| Accent (gold) | `#C9A84C` |
| Text primary | `#F0EDE8` |
| Text muted | `#6B6B6B` |
| Border | `#222222` |
| Headline font | Playfair Display (Google Fonts) |
| Body/UI font | Inter (Google Fonts) |
| Motion | Subtle fade-in-up on scroll reveal (Framer Motion or CSS) |

---

## Site Structure

```
/                   Homepage (single-scroll)
/about              About page
/work               All case studies (grid)
/work/[slug]        Case study detail page
/blog               Blog index (existing posts migrated)
/blog/[slug]        Blog post
```

---

## Homepage Sections (in order)

### 1. Navigation
- Logo: "Victor Palacios" wordmark, minimal weight
- Links: Work · About · Blog
- CTA: `Book a Call →` (gold pill button, always visible)
- Mobile: hamburger

### 2. Hero
- Headline (Playfair Display, large): *"I turn complex systems into simple, human experiences"*
- Subheadline (Inter): *"Senior UX consultant helping product teams ship software people actually use."*
- CTAs: `Book a Discovery Call` (primary gold button) + `See My Work ↓` (text link)
- Background: subtle grid or noise texture on dark

### 3. Credibility Bar
- Horizontal strip, muted text
- Signals: `25+ years UX · Nokia · iBwave · Montreal, remote-friendly`
- Thin gold top/bottom borders

### 4. What I Do (Services)
- Section label: "SERVICES" (all-caps, gold, tracked)
- 3 cards in a row:
  1. UX Strategy & Research
  2. Product Design & Systems
  3. UX Audits & Team Coaching
- Each card: icon, title, 2-sentence description

### 5. Selected Work
- Section label: "SELECTED WORK"
- 4 case study cards (2×2 grid on desktop, stacked on mobile)
- Each card: project image, title, industry tag, one-sentence outcome, `View Case Study →`
- Featured projects:
  1. Designing Distribution Networks (Construction tech)
  2. iBwave — Importing Floorplans (Enterprise B2B)
  3. Currency Exchange for Travellers (Consumer)
  4. Nokia 7710 (Historic, major brand)

### 6. How I Work
- Section label: "PROCESS"
- 4 numbered steps in a horizontal row:
  1. Discover — Research, interviews, competitive analysis
  2. Define — Synthesis, problem framing, success metrics
  3. Design — Wireframes, prototypes, iteration
  4. Deliver — Final design, handoff, implementation support

### 7. About Teaser
- Photo (left) + text (right)
- 2–3 sentence intro: senior designer, 25+ years, complex domains
- `Read More About Me →` link

### 8. Footer CTA + Footer
- Large headline: *"Ready to bring clarity to your product?"*
- `Book a Discovery Call` button (gold)
- Email: victpalacios@gmail.com
- LinkedIn link
- Copyright line

---

## Case Study Pages (`/work/[slug]`)

Consistent template:

1. **Header** — Project name (serif), industry tag, one-sentence outcome
2. **Hero image** — Full-width project screenshot
3. **Context strip** — Client · Role · Timeline · Tools (4-column grid)
4. **Body sections** — Problem → Research → Key Insights → Design Process → Solution → Outcome
5. **Navigation** — `← Previous` / `Next →` + floating "Book a Call" button

Slugs:
- `distribution-networks`
- `ibwave-floorplans`
- `currency-exchange`
- `nokia-7710`

---

## About Page (`/about`)

1. Photo + 2-sentence punchy intro (who you are + design philosophy)
2. Career arc: 3–4 milestone bullets (Nokia 2000 → iBwave → independent consultant)
3. Personal section (brief — interests, Montreal, outdoor lifestyle)
4. CTA: "Let's work together" + Book a Call button

---

## Blog (`/blog`, `/blog/[slug]`)

- Migrate existing Wix blog posts
- Simple list/grid index
- Individual post pages with minimal styling

---

## Component List

- `<Nav>` — sticky, transparent→solid on scroll
- `<HeroSection>`
- `<CredibilityBar>`
- `<ServicesSection>`
- `<WorkGrid>` + `<WorkCard>`
- `<ProcessSection>`
- `<AboutTeaser>`
- `<FooterCTA>`
- `<Footer>`
- `<CaseStudyHero>`
- `<CaseStudyContext>`
- `<CaseStudyBody>` (MDX or structured data)
- `<ProjectNav>`
- `<FloatingCTA>`

---

## Content Strategy

**Framing:** All case studies must be reframed around business outcomes, not design artifacts. Example:
- ❌ "I designed the onboarding flow"
- ✅ "Reduced time-to-first-value by redesigning the onboarding flow for 10,000+ users"

**Voice:** Confident, direct, no hedging. Consultant tone, not job-seeker tone.

---

## Deployment

- Vercel (free tier, custom domain: victorpalacios.ca)
- Domain: update DNS from Wix to Vercel after launch
