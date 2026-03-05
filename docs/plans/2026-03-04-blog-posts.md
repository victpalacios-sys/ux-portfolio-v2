# Blog Posts Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a real blog index page and SSG post detail pages for 2 existing posts, with all images local.

**Architecture:** TypeScript data file (`src/data/blogPosts.ts`) mirrors `caseStudies.ts`. Blog index replaces the placeholder. New `blog/[slug]/page.tsx` mirrors the case study detail page pattern. Zero new dependencies.

**Tech Stack:** Next.js 16 App Router, TypeScript, next/image, Tailwind v4 CSS vars

---

### Task 1: Download 4 blog images

**Files:**
- Create: `public/images/blog-job-shadowing-hero.png`
- Create: `public/images/blog-job-shadowing-section-persons.png`
- Create: `public/images/blog-job-shadowing-section-discovery.webp`
- Create: `public/images/blog-nokia-ngage-hero.jpg`

**Step 1: Download all 4 in parallel**

```bash
cd /c/dev/UXPortfolioV2 && \
  curl -sL "https://static.wixstatic.com/media/9d26ae_bc39faf07ed04b598356aafa2254b546~mv2.png" -o public/images/blog-job-shadowing-hero.png & \
  curl -sL "https://static.wixstatic.com/media/9d26ae_73c7d8bf3d8348578569349a234efd82~mv2.png" -o public/images/blog-job-shadowing-section-persons.png & \
  curl -sL "https://static.wixstatic.com/media/9d26ae_b45cd71422004bbd87c2ec1728b5ba93~mv2.webp" -o public/images/blog-job-shadowing-section-discovery.webp & \
  curl -sL "https://static.wixstatic.com/media/9d26ae_1870ba1a8ed54d1e80cbeef755fab896~mv2.jpg" -o public/images/blog-nokia-ngage-hero.jpg & \
  wait
```

**Step 2: Verify all 4 files exist and are non-zero**

```bash
ls -lh /c/dev/UXPortfolioV2/public/images/blog-*
```

Expected: 4 files, all > 0 bytes.

**Step 3: Commit**

```bash
cd /c/dev/UXPortfolioV2 && git add public/images/blog-* && git commit -m "feat: add blog post images to public/images/"
```

---

### Task 2: Create `src/data/blogPosts.ts`

**Files:**
- Create: `src/data/blogPosts.ts`

**Step 1: Write the file**

```typescript
export interface BlogSection {
  level?: 'h2' | 'h3'
  heading?: string
  body?: string          // Use \n\n to separate multiple paragraphs in one section
  listItems?: string[]
  image?: string
  imageAlt?: string
}

export interface BlogPost {
  slug: string
  title: string
  tag: string
  date: string
  readTime: string
  excerpt: string
  coverImage: string
  coverImageAlt: string
  sections: BlogSection[]
  featured: boolean
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'job-shadowing',
    title: 'Job Shadowing',
    tag: 'UX',
    date: 'Sep 23, 2024',
    readTime: '7 min read',
    excerpt:
      'The most effective UX research technique available — and the simplest. A practical guide to Contextual Inquiry, from the master-apprentice relationship to continuous discovery.',
    coverImage: '/images/blog-job-shadowing-hero.png',
    coverImageAlt: 'Job Shadowing',
    featured: true,
    sections: [
      {
        body: 'One thing that most colleagues know me for, is that I advocate for Job Shadowing; I mean this is the one constant thing I insist on doing and teach everyone about.',
      },
      {
        body: 'It all started around the year 2000 when I came across a paper from Karen Holtzblatt about Contextual Inquiry, the official name of this technique. It blew me away! For the longest time I had been searching for the reason why software projects are late and over budget. And most people who study this have the same conclusion: get the requirements right, but most of all, get the right requirements.',
      },
      {
        body: 'Contextual inquiry, or the name that I find the easiest to explain to other people \u201cJob Shadowing\u201d, is so simple, it\u2019s ridiculous. You can summarize it in two concepts:',
      },
      {
        listItems: ['Real work, real people.', 'Master-Apprentice relationship.'],
      },
      {
        body: 'That is all you need to do to get the right requirements.',
      },
      {
        body: 'The first step in the Design Thinking process is Empathize and there are a few techniques to do this, but the most effective, by far, is Job Shadowing.',
      },
      {
        level: 'h2',
        heading: 'Real Work, Real People',
        body: 'You must observe real people doing real work. You need to go where work is being done by the people who actually do the work. This is in contrast to interviewing users in a meeting room or on a video call.',
      },
      {
        body: 'There is a ton of psychological and anthropological reasons for this. To start, we tend to summarize and filter out a lot of information when asked \u201chow do you do your work\u201d because we really cannot remember all the details and because we create a story that rationalizes why we do the things we do. So when asked how do you do your work? or how do you choose between two pairs of jeans we really don\u2019t know how we do it. Only when we observe people and ask questions on the spot then we have a chance to get to the truth. There are some ways to get around cognitive blind spots, like in the example of choosing between two jeans. You can ask \u201ctell me about the last time you bought a pair of jeans\u201d; and this is another rule of thumb \u201ckeep your subject focused on actual work or at least real examples of work; so as soon as people start generalizing you need to interject with \u201cshow me a previous document about what your are talking about\u201d, \u201ctell me about the last time you did X\u201d.',
      },
      {
        body: 'When people are doing actual work, the contextual surroundings help them remember many details and exception that otherwise would go unoticed during an interview. And this is another source of information; their desk or work area. Ask about the postits on the monitor, the piece of paper with a scribbled note, the color pens they carry in ther pocket, what\u2019s in your backpack?, etc. Most people hack their way around their jobs. They create makeshift tools to help with their work. Also pay attention to their interactions with other people; you are looking for flows of information; what piece of information is being transacted at that moment?',
      },
      {
        level: 'h3',
        heading: 'Real People',
        body: 'For some weird reason when User Researchers ask company representatives for a person who can show us how a particular task is done, they choose a manager of the people who actually do the work. Don\u2019t get me wrong, managers know how to do the work, most of them at least, but they haven\u2019t been doing it for a while now. However I usually use this opportunity to understand the high level flow of a task, so this is a useful source of information. Right after that, I always insist on observing people who do the actual work.',
      },
      {
        level: 'h3',
        heading: 'Mass market products',
        body: 'For mass market products this is a bit easier because the customer is the same as the user, and you can go to places where a product is used or where a task is done, and ask questions on the spot.\n\nA while back (2000 - 2012) I used to work for Nokia and Motorola, designing mobile applications mostly around pictures and videos, taking and sharing, music listening, and phone call handling. I also did some work for Nokia on social networks. My go to places where malls, parks and just the street aroud the office. I would wait for a person to take a picture and then I would introduce my self and ask them questions about the picture. What made them take that picture? What do you do with your pictures? How do you share them and to whom?',
      },
      {
        level: 'h3',
        heading: 'New Products or Markets',
        body: 'New products solve existing problems, or needs or desires. So you can go to places where people have these problems, or express these needs or desires, and observe them and ask questions.',
      },
      {
        level: 'h2',
        heading: 'Master - Apprentice Relashionship',
        body: 'How do you get people to tell you the truth? Put them in a position of power by establishing a Master-Apprentice Relashionship. You, the user researcher, are the apprentice, and your research subject is the master. The master is the person who knows how things are done, he or she is the source of truth. The apprentice is there to learn, ask questions, and be inquisitive but in the spirit of learning.',
      },
      {
        body: 'When you are with a person that you want to learn from, you spell your incantation \u201cCould you show me how you do X?\u201d. Magic happens after this incantation. This simple question establishes that your research subject is the master, he or she knows how things are done. Additionally you are saying that you want to learn and understand.',
      },
      {
        body: 'When you spell this incantation in the place of work of your subject, they are in familiar settings with the colleagues they already know and trust. So there is nothing to fear. You, the researcher, are the only person at odds, and with practice you get used to it and even comfortable with it.',
      },
      {
        body: 'Another way of introducing this relashionship is by asking them \u201cyou can think of me as a trainee, and treat me like one\u201d. Sometimes you get to do part of their work and you learn so much; there is nothing like feeling the real pain of your subject.',
      },
      {
        level: 'h3',
        heading: 'Side Note - Usability Testing',
        body: 'Even during usability testing sessions when many users get a real fear of being observed and judged, you can get them to feel at ease by focusing on testing the design, and focus all your questions at the design. The user is always right, when they make a \u201cmistake\u201d, you want to ask what part of the design confused them or lead them on the wrong path; the design is wrong and the user is right. Word.',
      },
      {
        level: 'h2',
        heading: 'Data, Information and Knowledge',
        body: 'So which data are you recording on your notes? The raw data that I pay attention to is \u201cWhat do they say?\u201d and \u201cWhat do they do?\u201d; they are not the same. Many people forget why they do certain things and they do them automatically. Also, they may say the do something but when you observe them they do something else. They are not lying, they just have a story in their minds about what they do and that\u2019s the story they tell you. I know, it\u2019s weird how the mind works.',
      },
      {
        body: 'The next level up that I ask questions about is \u201cwhy?\u201d; why are they doing X? What is their goal. Most people break down work or activities into blocks of work, and each block has a goal, so I ask about these goals. This collection of goals become my guiding light when designing a solution.',
      },
      {
        body: 'At the top of everything is the main goal, what are they trying to accomplish with all of this work? What is the desire or need?',
      },
      {
        body: 'I use all of this knowledge during ideation to think about solutions. In the Design Thinking process you are supposed to ask \u201cHow might we do X?\u201d, where X is one of these user goals you uncovered during user research. But one of the most intersting questions that I like asking is \u201cwhat if you didn\u2019t need to do X?\u201d. I also like asking \u201cwhat are they really trying to do?\u201d. I like the Jobs to be done technique but it kind of boxes you into a limited space of solutions; it pushes you into creating tools to do the same work people are already doing. So I prefer to think \u201cis there a better way of doing this or not doing it at all?\u201d',
      },
      {
        level: 'h3',
        heading: 'Pictures',
        body: 'Take lots of pictures. Picture help you remember what happened doing your sessions with your users. They are an excellent tool to transmit empathy to your team. There is nothing like showing your colleagues actual people doing actual work, using your software or doing the work you want to improve with your product.',
      },
      {
        body: 'Video is great too for very specific situations. When you want to record a very specific problem or case. But you can only do it after your subject is comfortable with you, otherwise they start performing for the camera and your source of truth is gone.',
      },
      {
        body: 'Continuously sharing stories from your user research with your team will create an \u201cInformed Intuition\u201d. All your teammates are continuously making decisions about the product and they will have a better chance of making the right decisions if they know their users at a deep level.',
      },
      {
        level: 'h3',
        heading: 'How many persons?',
        body: 'The magic number is 5. You can get the job done with 3; but this is the dirt minimum. When you do user research you quickly see that after 3 subjects you start seeing a lot of repeated data; even from your second subject 60% of the information is the same. This is another weird thing in society. Most people feel uncomfortable saying that you only need 3-5 people; the closest I have seen in conferences is 8-10. I think people confuse answering questions about what people do and why, with saying that something is statistically significant.',
      },
      {
        image: '/images/blog-job-shadowing-section-persons.png',
        imageAlt: 'Diagram illustrating diminishing returns in user research after 5 participants',
      },
      {
        level: 'h3',
        heading: 'Who do we observe?',
        body: 'What kind of people do you need to work with? In some markets you don\u2019t have much choice so I take what I can get. But in cases where there are plenty to choose from I look for extremes; the beginers and the experts, republicans and democrats, ocassional users and habitual users, the tall and the short, etc. My goal is to get as much variety of information as possible.',
      },
      {
        level: 'h3',
        heading: 'Continuous Discovery',
        body: 'User research is a continuous activity. You need to keep a steady stream of user research sessions; at least twice a week. And you need to keep a roster of users that you can ask them questions, feedback, etc.',
      },
      {
        body: 'Eventhough you need to get feedback from multiple types of people, there is only a small pool who are enthusiatic about helping you. You can easily identify them by looking for people who are already hacking a solution; their pain is so great that they already have something held up with nails and duct tape.',
      },
      {
        body: 'The innovators and visionaries will happily do the work for free. The innovators will even call you when they have new ideas. The pragmatists and conservatives you need to pay them for their time. The skeptics are just not interested.',
      },
      {
        image: '/images/blog-job-shadowing-section-discovery.webp',
        imageAlt: 'Technology adoption curve showing innovators, early adopters, pragmatists, conservatives and skeptics',
      },
      {
        level: 'h2',
        heading: 'Summary',
        listItems: [
          'Real work, real people',
          'Master-apprentice relationship',
          'What do they do?',
          'What do they say?',
          'Why? What are their goals?',
          'Take pictures',
          'Share the stories with your team',
          '3-5 persons',
          'Innovators are already hacking a solution',
          'Continuous discovery',
        ],
      },
    ],
  },
  {
    slug: 'nokia-ngage',
    title: 'Nokia N-Gage Coined by...',
    tag: 'Personal',
    date: 'Apr 13, 2025',
    readTime: '4 min read',
    excerpt:
      'The short answer: me, Victor Palacios. A story about naming one of Nokia\u2019s most distinctive products \u2014 and what happened next.',
    coverImage: '/images/blog-nokia-ngage-hero.jpg',
    coverImageAlt: 'Nokia N-Gage (Image from Wikipedia)',
    featured: true,
    sections: [
      {
        body: 'The short answer: me, Victor Palacios.',
      },
      {
        body: 'This is a story that has been in the back of my brain for many years. A few years ago, after a conversation about Nokia with somebody I met at a social event, I did a Google search about the name N-Gage and went to the Wikipedia entry and read that some director was the originator of the name, and I thought, \u201cof course\u2026\u201d. That reference has been removed sometime since. In some fandom sites they mention that the name has not been accredited to anyone. So I am fixing that today.',
      },
      {
        image: '/images/blog-nokia-ngage-hero.jpg',
        imageAlt: 'Nokia N-Gage (Image from Wikipedia)',
      },
      {
        body: 'I started working at Nokia Vancouver in December 1999 as a software engineer. I am not quite sure but I think I started on my birthday, December 14th, which was kind of weird. I have actually worked for Nokia on two different occasions. The second time was in Montreal in December 2009 as a contractor for a UX Designer position replacing somebody who was on maternity leave, what\u2019s up with those December starting dates? but I digress. Sometime in 2000-2001 I switched jobs from software engineer to UI Designer, which was one of the most interesting and consequential decisions of my life.',
      },
      {
        body: 'Sometime in 2002 when the UI team had grown from 1 person (me) to probably 6 people, while we were working on the next generation phone, later called the 7710, we received an email about this program called Starship which was the phone that later became the N-Gage. They were starting a competition for a marketing name for the program. They gave you the summary about the device and the target market was gamers. They were offering, I think, 250 or 300 dollars (Canadian), to the person who would come up with the winning name. Oddly enough I am not a gamer so I walked to my colleague Scott Davis\u2019 desk, another UI Designer, and asked him something along the lines \u201cWhat makes a game a good game?\u201d and he said, \u201cit has to be engaging, something, something, \u2026\u201d I don\u2019t remember what else he said, but that was what resonated in my head. So I went back to my desk and started writing a bunch of names. One of them was N-Gage.',
      },
      {
        body: 'Words just don\u2019t come up like that. Another part of the story is that at that time we had a volleyball team as part of Nokia\u2019s social activities. Nokia even paid for a coach to help us become reasonable players. And what would you know? We also did a competition for a name. No price money was offered though, just bragging rights I guess. So I came up with the name \u201cNokia Nokouts\u201d. During some games against other teams or on TV I would see some players hitting the ball so hard that I used to think \u201cman! Somebody is going to be knocked out!\u201d. It was scary to be on the receiving end of those players. Anyway, we had t-shirts printed with the name and logo, it was nice.',
      },
      {
        body: 'So I already had the pattern in my head about \u201cNokia sounding word\u201d then \u201csome other interesting word\u201d, like \u201cNokout\u201d. So when it came to the starship program, and with Scott\u2019s prompt, that was one of the first names that came to mind, engage -> Nokia engage -> Nokia N-Gage. But I thought I had to come up with other names; but they were not as satisfying as the first one. I asked Scott, what about Nokia N-Gage? And he said, that\u2019s pretty good, you should submit it. So I did.',
      },
      {
        body: 'A few days passed, some high executives were in town, and they announced they were going to pick a name for the Starship program during that visit to then compete with other names from other office sites, so we waited, while doing our regular work of course.',
      },
      {
        body: 'A couple of hours or so before the winner was announced a friend from marketing came over to my desk and told me, \u201chey\u2019 your name was selected, but one of the top shots is taking it as his own. You know how it is\u2026\u201d. I said something like \u201cyeah, OK, whatever. Thanks for letting me know\u201d. He said something like \u201cHave you ever considered being in Marketing?\u201d and I said \u201cNo, not really\u201d. I think Scott was like \u201cyou should sue them!\u201d. I did nothing. In my head I kind of chucked it to \u201cI have so many ideas pouring out of my ears, this is free\u201d, but that was a cop out to avoid conflict.',
      },
      {
        body: 'Now you know where the N-Gage name came from; with a little help from my friends.',
      },
      {
        level: 'h2',
        heading: 'Postscript',
        body: 'A couple of things about me. I am high in Openness and Agreeableness, in terms of psychological profile that means I am a creative person and avoid conflict. The second part has been a real handicap throughout my life; lots of people have taken advantage of that. Until I came across the big 5 model of personality and understood that this is part of my personality. And most psychologists help you become a little bit more disagreeable. The dark side of being an agreeable person and others taking advantage of it, is that you can become resentful and bitter. That\u2019s why clinical psychologists help you fight for your things and place limits or boundaries. It is a slow process but it does improve your life. It is uncomfortable as hell to enforce those limits though.',
      },
    ],
  },
]

export const featuredBlogPosts = blogPosts.filter((p) => p.featured)

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}
```

**Step 2: TypeScript check**

```bash
cd /c/dev/UXPortfolioV2 && npx tsc --noEmit 2>&1
```

Expected: no output.

**Step 3: Commit**

```bash
cd /c/dev/UXPortfolioV2 && git add src/data/blogPosts.ts && git commit -m "feat: add blogPosts data — Job Shadowing + Nokia N-Gage"
```

---

### Task 3: Create `src/app/blog/[slug]/page.tsx`

**Files:**
- Create: `src/app/blog/[slug]/page.tsx`

**Step 1: Create the directory**

```bash
mkdir -p /c/dev/UXPortfolioV2/src/app/blog/\[slug\]
```

**Step 2: Write the file**

```tsx
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
```

**Step 3: TypeScript check**

```bash
cd /c/dev/UXPortfolioV2 && npx tsc --noEmit 2>&1
```

Expected: no output.

**Step 4: Commit**

```bash
cd /c/dev/UXPortfolioV2 && git add src/app/blog/ && git commit -m "feat: add blog post detail page /blog/[slug]"
```

---

### Task 4: Replace `src/app/blog/page.tsx`

**Files:**
- Modify: `src/app/blog/page.tsx`

**Step 1: Overwrite the file**

```tsx
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
      </div>
    </main>
  )
}
```

**Step 2: TypeScript check**

```bash
cd /c/dev/UXPortfolioV2 && npx tsc --noEmit 2>&1
```

Expected: no output.

**Step 3: Commit**

```bash
cd /c/dev/UXPortfolioV2 && git add src/app/blog/page.tsx && git commit -m "feat: replace blog placeholder with post card grid"
```

---

### Task 5: Build verification + push

**Step 1: Production build**

```bash
cd /c/dev/UXPortfolioV2 && npm run build 2>&1
```

Expected output includes:
```
✓ Generating static pages (13/13)
```
Routes added:
```
○ /blog
● /blog/job-shadowing
● /blog/nokia-ngage
```

**Step 2: Start dev server for visual check**

```bash
rm -f /c/dev/UXPortfolioV2/.next/dev/lock
cd /c/dev/UXPortfolioV2 && node node_modules/next/dist/bin/next dev --port 3000 > /tmp/next-dev.log 2>&1 &
sleep 8 && curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/blog
```

Expected: `200`

**Step 3: Visually verify these URLs in browser**
- `http://localhost:3000/blog` — card grid with 2 posts, cover images, gold tags
- `http://localhost:3000/blog/job-shadowing` — full post with h2/h3 headers, inline images
- `http://localhost:3000/blog/nokia-ngage` — full post with inline image, Postscript section

**Step 4: Update MEMORY.md**

In `C:\Users\vpala\.claude\projects\C--dev-UXPortfolioV2\memory\MEMORY.md`, update the Known Limitations section:

Change:
```
- Blog page is a placeholder with LinkedIn link
```
To:
```
- Blog: 2 posts live (/blog/job-shadowing, /blog/nokia-ngage) — add new posts to src/data/blogPosts.ts
```

**Step 5: Push**

```bash
cd /c/dev/UXPortfolioV2 && git push origin main
```

Expected: Vercel auto-deploys with 3 new blog routes.
