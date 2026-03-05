'use client'

import Image from 'next/image'

const photos = [
  {
    src: '/images/distribution-networks-discovery-1.jpg',
    caption: 'Searching for risers at the top of the building',
    rotation: -2.5,
  },
  {
    src: '/images/distribution-networks-discovery-2.jpg',
    caption: 'Existing floor plans on the walls reveal clues',
    rotation: 1.5,
  },
  {
    src: '/images/distribution-networks-discovery-3.jpg',
    caption: 'Fire dept. plans fill the gaps',
    rotation: -1.5,
  },
  {
    src: '/images/distribution-networks-discovery-4.jpg',
    caption: 'Navigating complex mechanical rooms to find answers',
    rotation: 2.5,
  },
  {
    src: '/images/distribution-networks-discovery-5.jpg',
    caption: 'Locating water pump infrastructure',
    rotation: -2.0,
  },
  {
    src: '/images/distribution-networks-discovery-6.jpg',
    caption: "Building manager's computer holds clues",
    rotation: 1.8,
  },
  {
    src: '/images/distribution-networks-discovery-7.jpg',
    caption: 'Tracking down the pull box — 30 min search',
    rotation: -1.2,
  },
  {
    src: '/images/distribution-networks-discovery-8.jpg',
    caption: 'Checking garbage chutes, drop ceilings & closets',
    rotation: 2.2,
  },
  {
    src: '/images/distribution-networks-discovery-9.jpg',
    caption: 'Documenting each distribution cabinet (5 min per floor)',
    rotation: -1.8,
  },
  {
    src: '/images/distribution-networks-discovery-10.jpg',
    caption: 'Noting screw types & conduits for the installation crew',
    rotation: 1.2,
  },
  {
    src: '/images/distribution-networks-discovery-11.jpg',
    caption: 'Tablet rotates 180° in lanyard holder — unexpected friction',
    rotation: -2.2,
  },
  {
    src: '/images/distribution-networks-discovery-12.jpg',
    caption: 'Autocorrect mangles technical terms — more lost time',
    rotation: 1.5,
  },
]

// Duplicate for seamless CSS loop (translateX(-50%) snaps back to start)
const filmStrip = [...photos, ...photos]

export default function DiscoveryFilmstrip() {
  return (
    <div
      className="mt-6"
      role="img"
      aria-label="Field research photos from distribution network discovery sessions"
    >
      {/* Outer container — clips the scrolling track, shows gradient fades */}
      <div
        className="relative overflow-hidden rounded-xl"
        style={{ background: 'var(--color-surface-2)' }}
      >
        {/* Left gradient fade */}
        <div
          className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, var(--color-surface-2), transparent)',
          }}
          aria-hidden="true"
        />

        {/* Right gradient fade */}
        <div
          className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to left, var(--color-surface-2), transparent)',
          }}
          aria-hidden="true"
        />

        {/* Scrolling track */}
        <div
          className="filmstrip-track flex gap-3 py-4 px-3"
          style={{ width: 'max-content' }}
        >
          {filmStrip.map((photo, index) => {
            const isDuplicate = index >= photos.length
            return (
              <div
                key={`filmstrip-${index}`}
                className="relative flex-none rounded-lg overflow-hidden"
                style={{ width: '220px', height: '270px' }}
                aria-hidden={isDuplicate || undefined}
              >
                {/* Photo */}
                <Image
                  src={photo.src}
                  alt={isDuplicate ? '' : photo.caption}
                  fill
                  className="object-cover"
                  sizes="220px"
                />

                {/* Post-it overlay — only on originals, not duplicates */}
                {!isDuplicate && (
                  <div
                    className="absolute bottom-3 left-3 text-xs leading-snug px-2 py-1.5"
                    style={{
                      background: '#FFF7CC',
                      color: '#1a1a1a',
                      maxWidth: '130px',
                      transform: `rotate(${photo.rotation}deg)`,
                      boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                      borderRadius: '2px',
                    }}
                    aria-hidden="true"
                  >
                    {/* Pin dot */}
                    <div
                      className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
                      style={{ background: 'var(--color-gold)' }}
                      aria-hidden="true"
                    />
                    {photo.caption}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
