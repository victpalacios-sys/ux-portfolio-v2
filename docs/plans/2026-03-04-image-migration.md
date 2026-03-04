# Image Migration: Wixstatic → Local Assets — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Download all 22 Wixstatic images to `public/images/`, rewrite source references, and remove the Wix CDN dependency entirely.

**Architecture:** Two one-time Node.js scripts — one downloads images, one rewrites source references. Both are hash-aware and idempotent. Deleted after use. Three source files updated.

**Tech Stack:** Node.js ESM (`node --input-type=module` or `.mjs`), native `fetch`, `fs/promises`

---

### Task 1: Place custom Distribution Networks hero (if available)

> Skip this task if you do not yet have a new hero image for Distribution Networks.

**Step 1: Create the images directory**

```bash
mkdir -p C:/dev/UXPortfolioV2/public/images
```

**Step 2: Copy your new hero image**

Save your new Distribution Networks hero image to:
```
C:\dev\UXPortfolioV2\public\images\distribution-networks-hero.jpg
```
(Use `.png` if your file is PNG — just be consistent with the extension you choose.)

The download script in Task 2 skips files that already exist, so placing this file now prevents the old Wixstatic screenshot from overwriting it.

---

### Task 2: Write and run the download script

**Files:**
- Create: `scripts/download-images.mjs`

**Step 1: Create the scripts directory**

```bash
mkdir -p C:/dev/UXPortfolioV2/scripts
```

**Step 2: Write `scripts/download-images.mjs`**

```javascript
// scripts/download-images.mjs
// One-time script: downloads all portfolio images from Wixstatic to public/images/
// Safe to re-run — skips files that already exist.
import { writeFile, mkdir, access } from 'fs/promises'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUTPUT_DIR = join(__dirname, '..', 'public', 'images')

// [wixHash~mv2.ext, localFilename]
// Downloads the original source file (no Wix transforms applied)
const IMAGES = [
  // Distribution Networks
  ['9d26ae_e94f60af3e5b4e9d8a2de5e15bd0fa61~mv2.png', 'distribution-networks-hero.png'],
  ['9d26ae_2759e668472e497fbec71d6013787af8~mv2.png', 'distribution-networks-section-market.png'],
  ['9d26ae_ea5f495b8a44463c9c9b2524ef42317d~mv2.png', 'distribution-networks-section-discovery.png'],
  ['11062b_dff7ae8a67f747b492c835d874c21c17~mv2.jpg', 'distribution-networks-section-needs.jpg'],
  ['9d26ae_5f3247710f9a43908c94c925762e6cdd~mv2.png', 'distribution-networks-section-principles.png'],
  ['9d26ae_7ccf77dc3cc54d84b64a43f31e67c981~mv2.png', 'distribution-networks-section-mvp.png'],
  ['9d26ae_f5f625894b9146169d778176c771cfd8~mv2.png', 'distribution-networks-section-interface.png'],
  // iBwave
  ['9d26ae_63d92a23d9a14b3cbdebc60d93d7d0f2~mv2.jpg', 'ibwave-hero.jpg'],
  ['9d26ae_be23ce84d2ec4719bfd2cf5198edd882~mv2.jpg', 'ibwave-section-problem.jpg'],
  ['9d26ae_a668afd75f894ed686745b01fadd9005~mv2.jpeg', 'ibwave-section-strategy.jpeg'],
  ['9d26ae_5518a43a94224bceb929cc14dd8f67eb~mv2.png', 'ibwave-section-result.png'],
  ['9d26ae_4b80cd8b5d8f48b4bc7ae343ccabfe8e~mv2.png', 'ibwave-section-wizard.png'],
  ['9d26ae_31214b7d89a142068c223582119d3ddd~mv2.png', 'ibwave-section-workspace.png'],
  ['9d26ae_1486788310404474a14fc3009bb8822d~mv2.png', 'ibwave-section-errors.png'],
  // Currency Exchange
  ['9d26ae_af99deeba7af48e0b24c8f62f58ef35b~mv2.png', 'currency-exchange-hero.png'],
  ['9d26ae_c597eebd58784b5abb64ac6e9187925d~mv2.png', 'currency-exchange-section-value.png'],
  ['9d26ae_494067064eef49eab0c489ce2c47648c~mv2.png', 'currency-exchange-section-chatbot.png'],
  // Nokia 7710
  ['9d26ae_634d005b16de428f979d29370d73c462~mv2.png', 'nokia-hero.png'],
  ['9d26ae_2f724723369a41e3afbc986c34583d10~mv2.png', 'nokia-section-overview.png'],
  ['9d26ae_dc661e7463c04e3dbf19b630a3ce1da0~mv2.png', 'nokia-section-hardware.png'],
  ['9d26ae_e79167464d95499ead974e907b928191~mv2.png', 'nokia-section-original.png'],
  // About / Profile
  ['9d26ae_1e501f86745f49179044289b9b7f730d~mv2.jpg', 'victor-photo.jpg'],
]

async function fileExists(path) {
  try { await access(path); return true } catch { return false }
}

async function downloadImage(wixFile, localFilename) {
  const outputPath = join(OUTPUT_DIR, localFilename)
  if (await fileExists(outputPath)) {
    console.log(`⏭  Skipping (exists): ${localFilename}`)
    return 'skipped'
  }
  const url = `https://static.wixstatic.com/media/${wixFile}`
  console.log(`⬇  Downloading: ${localFilename}`)
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
  const buf = Buffer.from(await res.arrayBuffer())
  await writeFile(outputPath, buf)
  console.log(`✓  Saved: ${localFilename} (${(buf.length / 1024).toFixed(1)} KB)`)
  return 'downloaded'
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true })
  console.log(`Downloading up to ${IMAGES.length} images to public/images/\n`)
  let downloaded = 0, skipped = 0, failed = 0
  for (const [wixFile, localFilename] of IMAGES) {
    try {
      const result = await downloadImage(wixFile, localFilename)
      result === 'skipped' ? skipped++ : downloaded++
    } catch (err) {
      console.error(`✗  FAILED: ${localFilename} — ${err.message}`)
      failed++
    }
  }
  console.log(`\nResult: ${downloaded} downloaded, ${skipped} skipped, ${failed} failed`)
  if (failed > 0) process.exit(1)
}

main().catch(err => { console.error(err); process.exit(1) })
```

**Step 3: Run the download script**

```bash
cd C:/dev/UXPortfolioV2 && node scripts/download-images.mjs
```

Expected output: 22 lines of `⬇ Downloading:` / `⏭ Skipping:` / `✓ Saved:`, ending with `Result: N downloaded, N skipped, 0 failed`

**Step 4: Verify files exist**

```bash
ls C:/dev/UXPortfolioV2/public/images/
```

Expected: 22 files (or 21 + your custom hero if you placed it in Task 1 and the extension differs from `.png`).

---

### Task 3: Write and run the source-update script

**Files:**
- Create: `scripts/update-image-refs.mjs`
- Modify: `src/data/caseStudies.ts`
- Modify: `src/components/AboutTeaser.tsx`
- Modify: `src/app/about/page.tsx`

**Step 1: Write `scripts/update-image-refs.mjs`**

```javascript
// scripts/update-image-refs.mjs
// One-time script: replaces all Wixstatic URLs in source files with local /images/ paths.
// Matches by hash — transform parameters in the URL are irrelevant.
import { readFile, writeFile } from 'fs/promises'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

// Maps Wixstatic hash → local path served from public/
// If you saved the Distribution Networks hero with a different extension, update that entry.
const HASH_TO_LOCAL = {
  '9d26ae_e94f60af3e5b4e9d8a2de5e15bd0fa61': '/images/distribution-networks-hero.png',
  '9d26ae_2759e668472e497fbec71d6013787af8': '/images/distribution-networks-section-market.png',
  '9d26ae_ea5f495b8a44463c9c9b2524ef42317d': '/images/distribution-networks-section-discovery.png',
  '11062b_dff7ae8a67f747b492c835d874c21c17': '/images/distribution-networks-section-needs.jpg',
  '9d26ae_5f3247710f9a43908c94c925762e6cdd': '/images/distribution-networks-section-principles.png',
  '9d26ae_7ccf77dc3cc54d84b64a43f31e67c981': '/images/distribution-networks-section-mvp.png',
  '9d26ae_f5f625894b9146169d778176c771cfd8': '/images/distribution-networks-section-interface.png',
  '9d26ae_63d92a23d9a14b3cbdebc60d93d7d0f2': '/images/ibwave-hero.jpg',
  '9d26ae_be23ce84d2ec4719bfd2cf5198edd882': '/images/ibwave-section-problem.jpg',
  '9d26ae_a668afd75f894ed686745b01fadd9005': '/images/ibwave-section-strategy.jpeg',
  '9d26ae_5518a43a94224bceb929cc14dd8f67eb': '/images/ibwave-section-result.png',
  '9d26ae_4b80cd8b5d8f48b4bc7ae343ccabfe8e': '/images/ibwave-section-wizard.png',
  '9d26ae_31214b7d89a142068c223582119d3ddd': '/images/ibwave-section-workspace.png',
  '9d26ae_1486788310404474a14fc3009bb8822d': '/images/ibwave-section-errors.png',
  '9d26ae_af99deeba7af48e0b24c8f62f58ef35b': '/images/currency-exchange-hero.png',
  '9d26ae_c597eebd58784b5abb64ac6e9187925d': '/images/currency-exchange-section-value.png',
  '9d26ae_494067064eef49eab0c489ce2c47648c': '/images/currency-exchange-section-chatbot.png',
  '9d26ae_634d005b16de428f979d29370d73c462': '/images/nokia-hero.png',
  '9d26ae_2f724723369a41e3afbc986c34583d10': '/images/nokia-section-overview.png',
  '9d26ae_dc661e7463c04e3dbf19b630a3ce1da0': '/images/nokia-section-hardware.png',
  '9d26ae_e79167464d95499ead974e907b928191': '/images/nokia-section-original.png',
  '9d26ae_1e501f86745f49179044289b9b7f730d': '/images/victor-photo.jpg',
}

// Matches any full Wixstatic URL (any transform variant) and extracts the hash
const WIX_URL_RE = /https:\/\/static\.wixstatic\.com\/media\/([^~"'\s]+)~mv2\.[a-z]+[^"'\s]*/g

function replaceWixUrls(content) {
  let count = 0
  const updated = content.replace(WIX_URL_RE, (match, hash) => {
    const local = HASH_TO_LOCAL[hash]
    if (local) { count++; return local }
    console.warn(`  ⚠  Unknown hash (left unchanged): ${hash}`)
    return match
  })
  return { updated, count }
}

const FILES = [
  'src/data/caseStudies.ts',
  'src/components/AboutTeaser.tsx',
  'src/app/about/page.tsx',
]

async function main() {
  let totalReplaced = 0
  for (const relPath of FILES) {
    const filePath = join(ROOT, relPath)
    const original = await readFile(filePath, 'utf8')
    const { updated, count } = replaceWixUrls(original)
    if (count === 0) {
      console.log(`⏭  No changes: ${relPath}`)
      continue
    }
    await writeFile(filePath, updated, 'utf8')
    console.log(`✓  Updated ${count} URL(s): ${relPath}`)
    totalReplaced += count
  }
  console.log(`\nTotal replacements: ${totalReplaced}`)
  console.log('Verify: grep -r wixstatic src/   (should return nothing)')
}

main().catch(err => { console.error(err); process.exit(1) })
```

**Step 2: Run the update script**

```bash
cd C:/dev/UXPortfolioV2 && node scripts/update-image-refs.mjs
```

Expected output:
```
✓  Updated 23 URL(s): src/data/caseStudies.ts
✓  Updated 1 URL(s): src/components/AboutTeaser.tsx
✓  Updated 1 URL(s): src/app/about/page.tsx

Total replacements: 25
```

**Step 3: Confirm no Wixstatic URLs remain in src/**

```bash
cd C:/dev/UXPortfolioV2 && grep -r "wixstatic" src/
```

Expected: no output (empty result = success).

**Step 4: Commit scripts + updated source files**

```bash
cd C:/dev/UXPortfolioV2 && git add scripts/ src/data/caseStudies.ts src/components/AboutTeaser.tsx src/app/about/page.tsx && git commit -m "feat: migrate all images from Wixstatic to local public/images/"
```

---

### Task 4: Clean up next.config.ts

**Files:**
- Modify: `next.config.ts`

**Step 1: Remove the wixstatic remotePattern**

Replace the entire `next.config.ts` with:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

export default nextConfig;
```

> Explanation: Local images in `public/images/` need no `remotePatterns` config. The `images` block can be removed entirely.

**Step 2: Commit**

```bash
cd C:/dev/UXPortfolioV2 && git add next.config.ts && git commit -m "chore: remove wixstatic remotePattern from next.config.ts"
```

---

### Task 5: Verify build + visual check

**Step 1: Run TypeScript check**

```bash
cd C:/dev/UXPortfolioV2 && npx tsc --noEmit 2>&1
```

Expected: no output (0 errors).

**Step 2: Run production build**

```bash
cd C:/dev/UXPortfolioV2 && npm run build 2>&1
```

Expected: `✓ Generating static pages (11/11)` with no errors. All 4 case study routes listed under `● /work/[slug]`.

**Step 3: Start dev server and visually verify**

```bash
cd C:/dev/UXPortfolioV2 && node node_modules/next/dist/bin/next dev --port 3000
```

Check these pages in the browser:
- `http://localhost:3000/work/distribution-networks` — hero image + all 7 section images
- `http://localhost:3000/work/ibwave-floorplans` — hero + 6 section images
- `http://localhost:3000/work/currency-exchange` — hero + 3 section images
- `http://localhost:3000/work/nokia-7710` — hero + 3 section images
- `http://localhost:3000/about` — Victor's photo

**Step 4: Delete the one-time scripts**

```bash
cd C:/dev/UXPortfolioV2 && rm scripts/download-images.mjs scripts/update-image-refs.mjs && git add scripts/ && git commit -m "chore: remove one-time image migration scripts"
```

> The `scripts/` directory can also be deleted if empty.

---

### Task 6: Push to GitHub

**Step 1: Push all commits**

```bash
cd C:/dev/UXPortfolioV2 && git push origin main
```

Expected: Vercel auto-deploys. All images served from your own repo — zero Wix dependency.
