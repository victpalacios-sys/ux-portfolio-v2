'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface Screen {
  label: string
  src: string
  alt: string
}

const screens: Screen[] = [
  {
    label: 'Home',
    src: '/images/distribution-networks-interface-design-home.png',
    alt: 'Home screen — project overview and quick access to recent work',
  },
  {
    label: 'Project',
    src: '/images/distribution-networks-interface-design-project.png',
    alt: 'Project screen — building list and project details',
  },
  {
    label: 'Building',
    src: '/images/distribution-networks-interface-design-building.png',
    alt: 'Building screen — floor list and building configuration',
  },
  {
    label: 'Floor Plan',
    src: '/images/distribution-networks-interface-design-floor.png',
    alt: 'Floor plan canvas — the core design workspace for placing cameras',
  },
  {
    label: 'Reports',
    src: '/images/distribution-networks-interface-design-reports-home.png',
    alt: 'Reports screen — project documentation and export options',
  },
  {
    label: 'Bill of Materials',
    src: '/images/distribution-networks-interface-design-reports-bom.png',
    alt: 'Bill of materials — itemised component list with quantities and costs',
  },
]

export default function InterfaceScreens() {
  const [activeIndex, setActiveIndex] = useState(3) // Floor Plan is the centrepiece screen

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setActiveIndex((i) => (i - 1 + screens.length) % screens.length)
    } else if (e.key === 'ArrowRight') {
      setActiveIndex((i) => (i + 1) % screens.length)
    }
  }

  return (
    <div className="mt-6">
      {/* Tab row — horizontally scrollable, no visible scrollbar */}
      <div
        role="tablist"
        aria-label="Interface screens"
        onKeyDown={handleKeyDown}
        tabIndex={0}
        className="flex gap-2 overflow-x-auto py-1 px-px"
        style={{ scrollbarWidth: 'none' } as React.CSSProperties}
      >
        {screens.map((screen, index) => {
          const isActive = index === activeIndex
          return (
            <button
              key={screen.label}
              id={`interface-screens-tab-${index}`}
              role="tab"
              aria-selected={isActive}
              aria-controls="interface-screens-panel"
              onClick={() => setActiveIndex(index)}
              className="px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors flex-none"
              style={{
                color: isActive ? 'var(--color-gold)' : 'var(--color-muted)',
                background: isActive ? 'var(--color-surface-2)' : 'transparent',
                outline: isActive
                  ? '1px solid var(--color-gold)'
                  : '1px solid transparent',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  const btn = e.currentTarget
                  btn.style.color = 'var(--color-foreground)'
                  btn.style.background = 'var(--color-surface)'
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  const btn = e.currentTarget
                  btn.style.color = 'var(--color-muted)'
                  btn.style.background = 'transparent'
                }
              }}
            >
              {screen.label}
            </button>
          )
        })}
      </div>

      {/* Screen area — 16:9 aspect ratio, cross-fade on tab change */}
      <div
        id="interface-screens-panel"
        role="tabpanel"
        aria-label={`${screens[activeIndex].label} screen`}
        className="relative mt-3 w-full aspect-video rounded-xl overflow-hidden"
        style={{ background: 'var(--color-surface-2)' }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <Image
              src={screens[activeIndex].src}
              alt={screens[activeIndex].alt}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 75vw"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
