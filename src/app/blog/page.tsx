import Image from 'next/image'
import Link from 'next/link'
import { blogPosts } from '@/data/blogPosts'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog — Victor Palacios',
  description: 'Thoughts on UX, product design, and working with complex systems.',
}

export default function BlogPage() {
  return (
    <main className="pt-28 px-6 md:px-10 lg:px-16 py-20">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <p
          className="text-xs font-sans font-medium tracking-[0.2em] uppercase mb-4"
          style={{ color: 'var(--color-gold)' }}
        >
          Blog
        </p>
        <h1
          className="font-serif text-5xl mb-16 tracking-[-0.02em]"
          style={{ color: 'var(--color-foreground)' }}
        >
          Writing
        </h1>

        {/* Post grid */}
        {blogPosts.length === 0 ? (
          <p style={{ color: 'var(--color-muted)' }}>No posts yet. Check back soon.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                <article
                  className="rounded-2xl overflow-hidden border transition-colors h-full flex flex-col"
                  style={{
                    background: 'var(--color-surface)',
                    borderColor: 'var(--color-border)',
                  }}
                >
                  {/* Cover image */}
                  <div
                    className="relative w-full overflow-hidden flex-shrink-0"
                    style={{ height: '220px', background: 'var(--color-surface-2)' }}
                  >
                    <Image
                      src={post.coverImage}
                      alt={post.coverImageAlt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <p
                      className="text-xs font-sans font-medium tracking-[0.2em] uppercase mb-3"
                      style={{ color: 'var(--color-gold)' }}
                    >
                      {post.tag}
                    </p>
                    <h2
                      className="font-serif text-xl mb-2 leading-snug tracking-[-0.01em] transition-colors group-hover:text-[var(--color-gold)]"
                      style={{ color: 'var(--color-foreground)' }}
                    >
                      {post.title}
                    </h2>
                    <p
                      className="text-xs font-sans mb-3"
                      style={{ color: 'var(--color-muted)' }}
                    >
                      {post.date} · {post.readTime}
                    </p>
                    <p
                      className="text-sm leading-relaxed line-clamp-3 flex-1"
                      style={{ color: 'var(--color-muted)' }}
                    >
                      {post.excerpt}
                    </p>
                    <p
                      aria-hidden="true"
                      className="mt-4 text-xs font-sans font-medium tracking-[0.15em] uppercase transition-colors"
                      style={{ color: 'var(--color-gold)' }}
                    >
                      Read →
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
