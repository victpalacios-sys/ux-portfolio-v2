# Blog Posts — Design Document

**Date:** 2026-03-04
**Goal:** Replace the blog placeholder with a real post index and individual post detail pages for 2 existing posts, copied verbatim from victorpalacios.ca.

---

## Architecture

Pattern mirrors the existing case studies implementation exactly:

- `src/data/blogPosts.ts` — TypeScript data (BlogPost interface + 2 posts)
- `src/app/blog/page.tsx` — Updated index page: card grid with cover image, title, date, read time, excerpt
- `src/app/blog/[slug]/page.tsx` — New detail page: SSG via `generateStaticParams`

Zero new dependencies.

---

## Data Interface

```typescript
interface BlogSection {
  level?: 'h2' | 'h3'      // omit for plain paragraph
  heading?: string
  body?: string
  listItems?: string[]      // renders as <ul>
  image?: string            // local /images/ path
  imageAlt?: string
}

interface BlogPost {
  slug: string
  title: string
  tag: string               // "UX" or "Personal"
  date: string              // "Sep 23, 2024"
  readTime: string          // "7 min read"
  excerpt: string           // 1–2 sentence card teaser (written for index)
  coverImage: string        // "/images/blog-<slug>-hero.jpg"
  coverImageAlt: string
  sections: BlogSection[]
  featured: boolean
}
```

---

## Posts

### Post 1 — Job Shadowing
- **Slug:** `job-shadowing`
- **Title:** "Job Shadowing"
- **Tag:** UX
- **Date:** Sep 23, 2024
- **Read time:** 7 min read
- **Cover image:** `blog-job-shadowing-hero.png`
- **Sections:** verbatim from original — h2/h3 headings, paragraphs, bullet lists, 2 inline images
- **Inline images:**
  - After "How many persons?" → `blog-job-shadowing-section-persons.png`
  - In "Continuous Discovery" → `blog-job-shadowing-section-discovery.webp`

### Post 2 — Nokia N-Gage Coined by...
- **Slug:** `nokia-ngage`
- **Title:** "Nokia N-Gage Coined by..."
- **Tag:** Personal
- **Date:** Apr 13, 2025
- **Read time:** 4 min read
- **Cover image:** `blog-nokia-ngage-hero.jpg`
- **Sections:** verbatim from original — narrative paragraphs + Postscript section

---

## Images to Download

All 4 images downloaded from Wixstatic originals to `public/images/`:

| Wix filename | Local filename |
|---|---|
| `9d26ae_bc39faf07ed04b598356aafa2254b546~mv2.png` | `blog-job-shadowing-hero.png` |
| `9d26ae_73c7d8bf3d8348578569349a234efd82~mv2.png` | `blog-job-shadowing-section-persons.png` |
| `9d26ae_b45cd71422004bbd87c2ec1728b5ba93~mv2.webp` | `blog-job-shadowing-section-discovery.webp` |
| `9d26ae_1870ba1a8ed54d1e80cbeef755fab896~mv2.jpg` | `blog-nokia-ngage-hero.jpg` |

---

## Blog Index Page (`/blog`)

Replaces the existing placeholder. Layout:

- Gold tag "Blog" + serif "Writing" heading
- Responsive card grid (1 col mobile, 2 col desktop)
- Each card:
  - Cover image (fixed height, object-cover, rounded-xl)
  - Gold tag pill (UX / Personal)
  - Post title (serif)
  - Date · Read time (muted)
  - 2-line excerpt
  - Hover: subtle gold border transition
- Cards link to `/blog/[slug]`

---

## Blog Post Detail Page (`/blog/[slug]`)

Mirrors case study detail layout:

- `← All Posts` back link
- Gold tag + serif title
- Meta: Date · Read time
- Cover image: `600px / 70vh` container + `object-contain` (same as case studies)
- Body renderer maps `BlogSection[]`:
  - `level: 'h2'` → `<h2>` serif, large
  - `level: 'h3'` → `<h3>` serif, medium
  - `body` → `<p>` with `leading-relaxed`
  - `listItems` → `<ul>` with gold bullet dots
  - `image` → `400px` height container + `object-contain`, dark bg (same as case study section images)
- SSG via `generateStaticParams(['job-shadowing', 'nokia-ngage'])`
- Metadata: title + description per post

---

## Routes Added

```
/blog                    ○ static
/blog/job-shadowing      ● SSG
/blog/nokia-ngage        ● SSG
```

---

## Files Changed

| File | Action |
|---|---|
| `src/data/blogPosts.ts` | Create |
| `src/app/blog/page.tsx` | Replace placeholder |
| `src/app/blog/[slug]/page.tsx` | Create |
| `public/images/blog-*.{png,jpg,webp}` | 4 new images |
