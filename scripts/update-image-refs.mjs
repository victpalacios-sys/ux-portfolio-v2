// scripts/update-image-refs.mjs
// One-time script: replaces all Wixstatic URLs in source files with local /images/ paths.
// Matches by hash — transform parameters in the URL are irrelevant.
import { readFile, writeFile } from 'fs/promises'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

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
