import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — Victor Palacios',
  description: 'Senior UX consultant with 25+ years experience. Based in Montreal.',
}

const milestones = [
  {
    year: '2000',
    event: 'Joined Nokia — pivoted from electronics engineering into UX design',
  },
  {
    year: '2004',
    event:
      "Shipped Nokia 7710: one of the first touchscreen smartphone UX designs in the industry",
  },
  {
    year: '2010s',
    event:
      'Senior UX Designer at iBwave — enterprise B2B software for wireless network engineers',
  },
  {
    year: '2020+',
    event: 'Independent UX consultant — startups, scaleups, and innovation teams',
  },
]

export default function AboutPage() {
  return (
    <main className="pt-28 px-6 md:px-10 lg:px-16 py-20">
      <div className="max-w-4xl mx-auto">
        <p
          className="text-xs font-sans font-medium tracking-[0.2em] uppercase mb-4"
          style={{ color: 'var(--color-gold)' }}
        >
          About
        </p>

        {/* Hero */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start mb-20">
          <div>
            <h1
              className="font-serif text-5xl md:text-6xl mb-6 tracking-[-0.02em]"
              style={{ color: 'var(--color-foreground)' }}
            >
              Victor Palacios
            </h1>
            <p
              className="text-lg leading-relaxed mb-4"
              style={{ color: 'var(--color-muted)' }}
            >
              I&apos;ve been making software easier to use since 2000. My background in Electronics
              Engineering means I can hold my own with engineers — which makes collaboration faster
              and the output better.
            </p>
            <p
              className="leading-relaxed mb-8"
              style={{ color: 'var(--color-muted)' }}
            >
              I believe great design is invisible. When it works, users don&apos;t think about the
              interface — they just accomplish their goals. That&apos;s the standard I hold myself to.
            </p>
            <a
              href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ133_yypE3yVbKay8QDsmXVGrhtn5z9zoLZPtQNfbALcn0qNTwL7-iMMwu53VSfY911u5kfYIA6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-sans font-medium px-6 py-3 rounded-full text-sm"
              style={{ background: 'var(--color-gold)', color: 'var(--color-background)' }}
            >
              Book a Discovery Call →
            </a>
          </div>

          <div
            className="relative rounded-2xl overflow-hidden max-w-xs mx-auto md:mx-0"
            style={{ aspectRatio: '3/4', background: 'var(--color-surface-2)' }}
          >
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
        <div
          className="border-t pt-16 mb-16"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <p
            className="text-xs font-sans font-medium tracking-[0.2em] uppercase mb-8"
            style={{ color: 'var(--color-gold)' }}
          >
            Career Arc
          </p>
          <div className="space-y-8">
            {milestones.map((m) => (
              <div key={m.year} className="flex gap-8">
                <span
                  className="text-sm font-mono w-16 shrink-0 pt-0.5"
                  style={{ color: 'var(--color-gold)' }}
                >
                  {m.year}
                </span>
                <p className="leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                  {m.event}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Personal */}
        <div
          className="border-t pt-16"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <p
            className="text-xs font-sans font-medium tracking-[0.2em] uppercase mb-6"
            style={{ color: 'var(--color-gold)' }}
          >
            The person behind the work
          </p>
          <p
            className="leading-relaxed max-w-2xl mb-4"
            style={{ color: 'var(--color-muted)' }}
          >
            Born in Mexico City. Raised in Baja California. Studied Electronics Engineering and
            Computer Science at Universidad Autónoma Metropolitana. Moved to Vancouver in 1998 for
            the internet boom, now based in Montreal.
          </p>
          <p
            className="leading-relaxed max-w-2xl"
            style={{ color: 'var(--color-muted)' }}
          >
            I cycle everywhere in summer, walk daily in winter, attend jazz and pop concerts, and
            read obsessively across design, physics, psychology, history, and entrepreneurship. I
            thrive in hackathons — intense collaboration with smart people working on real problems.
          </p>
        </div>
      </div>
    </main>
  )
}
