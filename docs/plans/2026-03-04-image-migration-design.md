# Image Migration: Wixstatic → Local Assets

**Date:** 2026-03-04
**Goal:** Remove all dependency on Wix CDN by downloading every image to `public/images/` and updating all source references. Enables cancellation of Wix subscription.

---

## Problem

All portfolio images currently live on `static.wixstatic.com` — Wix's CDN. This creates a hard dependency on the user's Wix subscription. Cancelling Wix breaks every image on the new site.

**22 unique images** are affected across three source files:
- `src/data/caseStudies.ts` — 4 coverImages + 18 section images
- `src/components/AboutTeaser.tsx` — Victor's photo
- `src/app/about/page.tsx` — same photo (duplicate reference)

---

## Approach: Automated Download Script

A one-time Node.js script (`scripts/download-images.mjs`) that:
1. Defines a URL → filename mapping for all 22 unique images
2. Creates `public/images/` directory if absent
3. Downloads each image via `fetch`, streams to disk
4. Skips files that already exist (safe to re-run; won't overwrite user-placed files)

After download, three source files are updated in-place to replace Wixstatic URLs with local `/images/<filename>` paths. Then `next.config.ts` is cleaned up to remove the `static.wixstatic.com` remotePattern entry.

---

## File Naming Map

All images land in `public/images/` with slug-prefixed descriptive names:

### Distribution Networks (4 cover + section images)
| Hash | Filename |
|---|---|
| `9d26ae_e94f60af` | `distribution-networks-hero.png` |
| `9d26ae_2759e668` | `distribution-networks-section-market.png` |
| `9d26ae_ea5f495b` | `distribution-networks-section-discovery.png` |
| `11062b_dff7ae8a` | `distribution-networks-section-needs.jpg` |
| `9d26ae_5f324771` | `distribution-networks-section-principles.png` |
| `9d26ae_7ccf77dc` | `distribution-networks-section-mvp.png` |
| `9d26ae_f5f62589` | `distribution-networks-section-interface.png` |

> Note: The "cross-platform strategy" section reuses the same hash as the hero — both map to `distribution-networks-hero.png`.

### iBwave (1 cover + 6 section images)
| Hash | Filename |
|---|---|
| `9d26ae_63d92a23` | `ibwave-hero.jpg` |
| `9d26ae_be23ce84` | `ibwave-section-problem.jpg` |
| `9d26ae_a668afd7` | `ibwave-section-strategy.jpeg` |
| `9d26ae_5518a43a` | `ibwave-section-result.png` |
| `9d26ae_4b80cd8b` | `ibwave-section-wizard.png` |
| `9d26ae_31214b7d` | `ibwave-section-workspace.png` |
| `9d26ae_1486788310` | `ibwave-section-errors.png` |

### Currency Exchange (1 cover + 3 section images)
| Hash | Filename |
|---|---|
| `9d26ae_af99deeba` | `currency-exchange-hero.png` *(cover + section 1 share hash)* |
| `9d26ae_c597eebd` | `currency-exchange-section-value.png` |
| `9d26ae_494067064` | `currency-exchange-section-chatbot.png` |

### Nokia 7710 (1 cover + 3 section images)
| Hash | Filename |
|---|---|
| `9d26ae_634d005b` | `nokia-hero.png` |
| `9d26ae_2f724723` | `nokia-section-overview.png` |
| `9d26ae_dc661e74` | `nokia-section-hardware.png` |
| `9d26ae_e7916746` | `nokia-section-original.png` |

### About / Profile
| Hash | Filename |
|---|---|
| `9d26ae_1e501f86` | `victor-photo.jpg` |

---

## Source Files Changed

| File | Change |
|---|---|
| `scripts/download-images.mjs` | New — one-time download script (can be deleted after use) |
| `src/data/caseStudies.ts` | All `coverImage` + section `image` fields → `/images/<filename>` |
| `src/components/AboutTeaser.tsx` | `src` attribute → `/images/victor-photo.jpg` |
| `src/app/about/page.tsx` | `src` attribute → `/images/victor-photo.jpg` |
| `next.config.ts` | Remove `static.wixstatic.com` from `remotePatterns` |

---

## Manual Step

The user has a new hero image for Distribution Networks. Place it at:
```
public/images/distribution-networks-hero.jpg
```
The download script skips files that already exist, so placing it before running the script prevents the old Wixstatic version from overwriting it.

---

## Verification

1. `npm run build` passes with 0 errors and all 11 static pages generated
2. Visual check: all 4 case study pages — hero + section images render
3. Visual check: About page — Victor's photo renders
4. No Wixstatic URLs remain in `src/` (grep confirms)
5. Push to GitHub → Vercel auto-deploys
