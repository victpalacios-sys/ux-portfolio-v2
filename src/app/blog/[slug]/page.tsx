import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getBlogPost, blogPosts, type BlogSection } from '@/data/blogPosts'
import FloatingCTA from '@/components/FloatingCTA'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return {}
  return {
    title: `${post.title} — Victor Palacios`,
    description: post.excerpt,
  }
}

function renderSection(section: BlogSection, index: number) {
  const HeadingTag = section.level === 'h2' ? 'h2' : section.level === 'h3' ? 'h3' : null
  const headingClass =
    section.level === 'h2'
      ? 'font-serif text-2xl md:text-3xl mt-12 mb-4 tracking-[-0.01em]'
      : 'font-serif text-xl md:text-2xl mt-8 mb-3'

  return (
    <div key={index} className="mb-6">
      {HeadingTag && section.heading && (
        <HeadingTag className={headingClass} style={{ color: 'var(--color-foreground)' }}>
          {section.heading}
        </HeadingTag>
      )}

      {section.body &&
        section.body.split('\n\n').map((para, i) => (
          <p
            key={i}
            className="leading-relaxed mb-4"
            style={{ color: 'var(--color-muted)' }}
          >
            {para}
          </p>
        ))}

      {section.listItems && (
        <ul className="mb-4 space-y-2">
          {section.listItems.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span
                className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                style={{ background: 'var(--color-gold)' }}
              />
              <span className="leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                {item}
              </span>
            </li>
          ))}
        </ul>
      )}

      {section.image && (
        <div
          className="relative mt-6 rounded-xl overflow-hidden"
          style={{ height: '400px', background: 'var(--color-surface-2)' }}
        >
          <Image
            src={section.image}
            alt={section.imageAlt ?? ''}
            fill
            className="object-contain"
          />
        </div>
      )}
    </div>
  )
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  const currentIndex = blogPosts.findIndex((p) => p.slug === slug)
  const prev = currentIndex > 0 ? blogPosts[currentIndex - 1] : null
  const next = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null

  return (
    <>
      <FloatingCTA />
      <main className="pt-24">
        {/* Header */}
        <div className="px-6 md:px-10 lg:px-16 pt-12 pb-0">
          <div className="max-w-[1200px] mx-auto">
            <Link
              href="/blog"
              className="inline-block text-xs font-sans font-medium tracking-[0.2em] uppercase mb-8 transition-colors"
              style={{ color: 'var(--color-muted)' }}
            >
              ← All Posts
            </Link>
            <p
              className="text-xs font-sans font-medium tracking-[0.2em] uppercase block mb-4"
              style={{ color: 'var(--color-gold)' }}
            >
              {post.tag}
            </p>
            <h1
              className="font-serif text-4xl md:text-5xl lg:text-6xl max-w-3xl mb-6 tracking-[-0.02em]"
              style={{ color: 'var(--color-foreground)' }}
            >
              {post.title}
            </h1>
            <p
              className="text-lg max-w-2xl mb-8 leading-relaxed"
              style={{ color: 'var(--color-muted)' }}
            >
              {post.excerpt}
            </p>
            <p
              className="text-sm mb-12 font-sans"
              style={{ color: 'var(--color-muted)' }}
            >
              {post.date} · {post.readTime}
            </p>
          </div>
        </div>

        {/* Hero image */}
        <div
          className="relative w-full overflow-hidden"
          style={{
            height: '600px',
            maxHeight: '70vh',
            background: 'var(--color-surface-2)',
          }}
        >
          <Image
            src={post.coverImage}
            alt={post.coverImageAlt}
            fill
            className="object-contain"
          />
        </div>

        {/* Body */}
        <div className="px-6 md:px-10 lg:px-16 py-20">
          <div className="max-w-3xl mx-auto">
            {post.sections.map((section, i) => renderSection(section, i))}
          </div>
        </div>

        {/* Post navigation */}
        <div
          className="border-t px-6 md:px-10 lg:px-16 py-12"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <div className="max-w-[1200px] mx-auto flex justify-between items-center">
            {prev ? (
              <Link
                href={`/blog/${prev.slug}`}
                className="flex items-center gap-3 transition-colors"
                style={{ color: 'var(--color-muted)' }}
              >
                <span style={{ color: 'var(--color-gold)' }}>←</span>
                <div>
                  <p
                    className="text-xs font-sans font-medium tracking-[0.2em] uppercase mb-0.5"
                    style={{ color: 'var(--color-gold)' }}
                  >
                    Previous
                  </p>
                  <p className="text-sm font-serif" style={{ color: 'var(--color-foreground)' }}>
                    {prev.title}
                  </p>
                </div>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                href={`/blog/${next.slug}`}
                className="flex items-center gap-3 text-right transition-colors"
                style={{ color: 'var(--color-muted)' }}
              >
                <div>
                  <p
                    className="text-xs font-sans font-medium tracking-[0.2em] uppercase mb-0.5"
                    style={{ color: 'var(--color-gold)' }}
                  >
                    Next
                  </p>
                  <p className="text-sm font-serif" style={{ color: 'var(--color-foreground)' }}>
                    {next.title}
                  </p>
                </div>
                <span style={{ color: 'var(--color-gold)' }}>→</span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </main>
    </>
  )
}
