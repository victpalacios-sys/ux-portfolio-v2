const items = [
  '25+ years UX experience',
  'Nokia',
  'iBwave',
  'FedEx',
  'Corning',
  'General Dynamics',
  'McKesson',
]

export default function CredibilityBar() {
  return (
    <div
      className="border-y py-4 overflow-hidden"
      style={{
        borderColor: 'var(--color-border)',
        background: 'color-mix(in srgb, var(--color-surface) 50%, transparent)',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="flex flex-wrap items-center justify-center md:justify-between gap-x-8 gap-y-2">
          {items.map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-3 text-xs tracking-wide font-sans"
              style={{ color: 'var(--color-muted)' }}
            >
              {i > 0 && (
                <span
                  className="hidden md:block"
                  style={{ color: 'var(--color-border)' }}
                  aria-hidden="true"
                >
                  ·
                </span>
              )}
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
