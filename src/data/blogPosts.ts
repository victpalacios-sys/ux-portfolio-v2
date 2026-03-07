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
        body: 'Contextual inquiry, or the name that I find the easiest to explain to other people “Job Shadowing”, is so simple, it’s ridiculous. You can summarize it in two concepts:',
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
        body: 'There is a ton of psychological and anthropological reasons for this. To start, we tend to summarize and filter out a lot of information when asked “how do you do your work” because we really cannot remember all the details and because we create a story that rationalizes why we do the things we do. So when asked how do you do your work? or how do you choose between two pairs of jeans we really don’t know how we do it. Only when we observe people and ask questions on the spot then we have a chance to get to the truth. There are some ways to get around cognitive blind spots, like in the example of choosing between two jeans. You can ask “tell me about the last time you bought a pair of jeans”; and this is another rule of thumb “keep your subject focused on actual work or at least real examples of work; so as soon as people start generalizing you need to interject with “show me a previous document about what your are talking about”, “tell me about the last time you did X”.',
      },
      {
        body: 'When people are doing actual work, the contextual surroundings help them remember many details and exception that otherwise would go unoticed during an interview. And this is another source of information; their desk or work area. Ask about the postits on the monitor, the piece of paper with a scribbled note, the color pens they carry in ther pocket, what’s in your backpack?, etc. Most people hack their way around their jobs. They create makeshift tools to help with their work. Also pay attention to their interactions with other people; you are looking for flows of information; what piece of information is being transacted at that moment?',
      },
      {
        level: 'h3',
        heading: 'Real People',
        body: 'For some weird reason when User Researchers ask company representatives for a person who can show us how a particular task is done, they choose a manager of the people who actually do the work. Don’t get me wrong, managers know how to do the work, most of them at least, but they haven’t been doing it for a while now. However I usually use this opportunity to understand the high level flow of a task, so this is a useful source of information. Right after that, I always insist on observing people who do the actual work.',
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
        body: 'When you are with a person that you want to learn from, you spell your incantation “Could you show me how you do X?”. Magic happens after this incantation. This simple question establishes that your research subject is the master, he or she knows how things are done. Additionally you are saying that you want to learn and understand.',
      },
      {
        body: 'When you spell this incantation in the place of work of your subject, they are in familiar settings with the colleagues they already know and trust. So there is nothing to fear. You, the researcher, are the only person at odds, and with practice you get used to it and even comfortable with it.',
      },
      {
        body: 'Another way of introducing this relashionship is by asking them “you can think of me as a trainee, and treat me like one”. Sometimes you get to do part of their work and you learn so much; there is nothing like feeling the real pain of your subject.',
      },
      {
        level: 'h3',
        heading: 'Side Note - Usability Testing',
        body: 'Even during usability testing sessions when many users get a real fear of being observed and judged, you can get them to feel at ease by focusing on testing the design, and focus all your questions at the design. The user is always right, when they make a “mistake”, you want to ask what part of the design confused them or lead them on the wrong path; the design is wrong and the user is right. Word.',
      },
      {
        level: 'h2',
        heading: 'Data, Information and Knowledge',
        body: 'So which data are you recording on your notes? The raw data that I pay attention to is “What do they say?” and “What do they do?”; they are not the same. Many people forget why they do certain things and they do them automatically. Also, they may say the do something but when you observe them they do something else. They are not lying, they just have a story in their minds about what they do and that’s the story they tell you. I know, it’s weird how the mind works.',
      },
      {
        body: 'The next level up that I ask questions about is “why?”; why are they doing X? What is their goal. Most people break down work or activities into blocks of work, and each block has a goal, so I ask about these goals. This collection of goals become my guiding light when designing a solution.',
      },
      {
        body: 'At the top of everything is the main goal, what are they trying to accomplish with all of this work? What is the desire or need?',
      },
      {
        body: 'I use all of this knowledge during ideation to think about solutions. In the Design Thinking process you are supposed to ask “How might we do X?”, where X is one of these user goals you uncovered during user research. But one of the most intersting questions that I like asking is “what if you didn’t need to do X?”. I also like asking “what are they really trying to do?”. I like the Jobs to be done technique but it kind of boxes you into a limited space of solutions; it pushes you into creating tools to do the same work people are already doing. So I prefer to think “is there a better way of doing this or not doing it at all?”',
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
        body: 'Continuously sharing stories from your user research with your team will create an “Informed Intuition”. All your teammates are continuously making decisions about the product and they will have a better chance of making the right decisions if they know their users at a deep level.',
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
        body: 'What kind of people do you need to work with? In some markets you don’t have much choice so I take what I can get. But in cases where there are plenty to choose from I look for extremes; the beginers and the experts, republicans and democrats, ocassional users and habitual users, the tall and the short, etc. My goal is to get as much variety of information as possible.',
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
      'The short answer: me, Victor Palacios. A story about naming one of Nokia’s most distinctive products — and what happened next.',
    coverImage: '/images/blog-nokia-ngage-hero.jpg',
    coverImageAlt: 'Nokia N-Gage (Image from Wikipedia)',
    featured: true,
    sections: [
      {
        body: 'The short answer: me, Victor Palacios.',
      },
      {
        body: 'This is a story that has been in the back of my brain for many years. A few years ago, after a conversation about Nokia with somebody I met at a social event, I did a Google search about the name N-Gage and went to the Wikipedia entry and read that some director was the originator of the name, and I thought, “of course…”. That reference has been removed sometime since. In some fandom sites they mention that the name has not been accredited to anyone. So I am fixing that today.',
      },
      {
        image: '/images/blog-nokia-ngage-hero.jpg',
        imageAlt: 'Nokia N-Gage (Image from Wikipedia)',
      },
      {
        body: 'I started working at Nokia Vancouver in December 1999 as a software engineer. I am not quite sure but I think I started on my birthday, December 14th, which was kind of weird. I have actually worked for Nokia on two different occasions. The second time was in Montreal in December 2009 as a contractor for a UX Designer position replacing somebody who was on maternity leave, what’s up with those December starting dates? but I digress. Sometime in 2000-2001 I switched jobs from software engineer to UI Designer, which was one of the most interesting and consequential decisions of my life.',
      },
      {
        body: 'Sometime in 2002 when the UI team had grown from 1 person (me) to probably 6 people, while we were working on the next generation phone, later called the 7710, we received an email about this program called Starship which was the phone that later became the N-Gage. They were starting a competition for a marketing name for the program. They gave you the summary about the device and the target market was gamers. They were offering, I think, 250 or 300 dollars (Canadian), to the person who would come up with the winning name. Oddly enough I am not a gamer so I walked to my colleague Scott Davis’ desk, another UI Designer, and asked him something along the lines “What makes a game a good game?” and he said, “it has to be engaging, something, something, …” I don’t remember what else he said, but that was what resonated in my head. So I went back to my desk and started writing a bunch of names. One of them was N-Gage.',
      },
      {
        body: 'Words just don’t come up like that. Another part of the story is that at that time we had a volleyball team as part of Nokia’s social activities. Nokia even paid for a coach to help us become reasonable players. And what would you know? We also did a competition for a name. No price money was offered though, just bragging rights I guess. So I came up with the name “Nokia Nokouts”. During some games against other teams or on TV I would see some players hitting the ball so hard that I used to think “man! Somebody is going to be knocked out!”. It was scary to be on the receiving end of those players. Anyway, we had t-shirts printed with the name and logo, it was nice.',
      },
      {
        body: 'So I already had the pattern in my head about “Nokia sounding word” then “some other interesting word”, like “Nokout”. So when it came to the starship program, and with Scott’s prompt, that was one of the first names that came to mind, engage -> Nokia engage -> Nokia N-Gage. But I thought I had to come up with other names; but they were not as satisfying as the first one. I asked Scott, what about Nokia N-Gage? And he said, that’s pretty good, you should submit it. So I did.',
      },
      {
        body: 'A few days passed, some high executives were in town, and they announced they were going to pick a name for the Starship program during that visit to then compete with other names from other office sites, so we waited, while doing our regular work of course.',
      },
      {
        body: 'A couple of hours or so before the winner was announced a friend from marketing came over to my desk and told me, “hey’ your name was selected, but one of the top shots is taking it as his own. You know how it is…”. I said something like “yeah, OK, whatever. Thanks for letting me know”. He said something like “Have you ever considered being in Marketing?” and I said “No, not really”. I think Scott was like “you should sue them!”. I did nothing. In my head I kind of chucked it to “I have so many ideas pouring out of my ears, this is free”, but that was a cop out to avoid conflict.',
      },
      {
        body: 'Now you know where the N-Gage name came from; with a little help from my friends.',
      },
      {
        level: 'h2',
        heading: 'Postscript',
        body: 'A couple of things about me. I am high in Openness and Agreeableness, in terms of psychological profile that means I am a creative person and avoid conflict. The second part has been a real handicap throughout my life; lots of people have taken advantage of that. Until I came across the big 5 model of personality and understood that this is part of my personality. And most psychologists help you become a little bit more disagreeable. The dark side of being an agreeable person and others taking advantage of it, is that you can become resentful and bitter. That’s why clinical psychologists help you fight for your things and place limits or boundaries. It is a slow process but it does improve your life. It is uncomfortable as hell to enforce those limits though.',
      },
    ],
  },
  {
    slug: 'ai-abstraction-layers',
    title: 'AI Skipped the Stack',
    tag: 'AI + UX',
    date: 'Mar 7, 2026',
    readTime: '13 min read',
    excerpt:
      'Current AI tools give you a text box and an output. But complex systems have never been controlled through a single interface. The AI industry has a UX problem — it skipped 40 years of abstraction layers that make complex systems controllable by humans.',
    coverImage: '/images/blog-ai-abstraction-layers-hero.png',
    coverImageAlt: 'Diagram showing the abstraction layer stack from business strategy to data foundation',
    featured: true,
    sections: [
      {
        body: 'The first thing every AI coding tool gives you is a text box. Type what you want, press enter, get code. It works — sometimes brilliantly. But something fundamental is missing.',
      },
      {
        body: 'Think about how we actually build complex systems. An airplane cockpit has hundreds of instruments, each one showing a different signal and giving the pilot a different lever to pull. A factory has a control room with screens for temperature, pressure, throughput, quality. Software engineering developed its own control surfaces over 40 years: entity relationship diagrams, architecture diagrams, user journeys, business model canvases. Each one gives a different person a different view into the system and a different set of controls.\n\nCurrent AI tools flattened all of that into a chat window.\n\nThis is not a technology problem. This is a UX design problem. And after 25 years of designing interfaces for complex systems, I think I can see what is missing.',
      },
      {
        level: 'h2',
        heading: 'The Missing Stack',
        body: 'Between your prompt and the AI\u2019s output, there should be at least five distinct layers of abstraction. Each layer has its own visual language, its own practitioners, and \u2014 most importantly \u2014 its own signals and levers.\n\nSignals are what you can observe: an entity relationship diagram shows you the data entities, their attributes, and how they relate. A user journey shows you the steps a person takes, where they struggle, and where they succeed. A business model canvas shows you who you are serving and how you make money.\n\nLevers are what you can control: you can move a box on an ER diagram and the database changes. You can reprioritise a user journey and the product backlog reorders. You can change a revenue stream on the canvas and the business model shifts.\n\nCurrent AI tools give you exactly one signal \u2014 the generated output \u2014 and one lever \u2014 the next prompt. That is like flying a plane with one dial and one button.',
      },
      {
        level: 'h2',
        heading: 'Layer 5 \u2014 Business Strategy',
        body: 'At the highest level of abstraction sits the business itself. The tools here are business model canvases, marketing campaigns, competitive positioning maps. The signals tell you who your customers are, what value you deliver, and how money flows. The levers let you change pricing, reposition against competitors, or target a different segment.\n\nNo AI tool today accepts a business model canvas as an input. You cannot draw your nine-block canvas, feed it to an AI, and say \u201Cbuild the product that serves this model.\u201D Instead, you describe your business in a paragraph of prose, hope the AI infers the right constraints, and discover the misalignment three weeks into development.\n\nThe canvas is not just a planning artifact. It is a communication interface \u2014 between founders and investors, between product and engineering, and it should be between humans and AI.',
      },
      {
        level: 'h2',
        heading: 'Layer 4 \u2014 System Architecture',
        body: 'One level down from strategy sits the system of actors: stakeholders, users, partners, regulators, data sources, third-party services. The tools here are stakeholder maps, value network maps, ecosystem maps, and service blueprints.\n\nThese diagrams answer questions that AI tools never ask: who are all the actors in this system? How does value flow between them? Where are the touchpoints between the service and its users? What are the backstage processes that support each frontstage interaction?\n\nWhen you ask an AI to build a product, it generates code. What it never shows you is the system it is building \u2014 the web of relationships between humans, services, and data that the code is meant to serve. You cannot see it. You cannot steer it. You only discover the AI\u2019s implicit system model when something breaks.\n\nA visual system map should be a first-class interface. You should be able to add an actor, draw a relationship, and have the AI adjust the architecture downstream.',
      },
      {
        level: 'h2',
        heading: 'Layer 3 \u2014 Product & Experience',
        body: 'The middle of the stack is where UX lives. User journeys, user stories, acceptance criteria, personas. These are the tools that connect human needs to product features.\n\nA user journey is a sequence of steps a person takes to accomplish a goal. Each step has a context, an action, a thought, and an emotion. Each step can succeed or fail. A well-designed journey reveals the moments that matter \u2014 where frustration peaks, where delight is possible, where the product can differentiate.\n\nCurrent AI tools skip this entirely. You type \u201Cbuild me a task management app\u201D and the AI generates screens. But it never built a journey. It never identified the critical moment where a user almost abandons the flow. It never asked what success looks like from the user\u2019s perspective.\n\nUser stories and acceptance criteria are even more precise: \u201CAs a project manager, I want to reassign overdue tasks so that no work is blocked.\u201D These are structured, testable, and unambiguous. They are the perfect input for AI \u2014 far better than a paragraph of prose. Yet no AI tool surfaces a story map as an editable control layer.',
      },
      {
        level: 'h2',
        heading: 'Layer 2 \u2014 Application Architecture',
        body: 'This is the layer most developers think about first: data flow diagrams, class and object diagrams, sequence diagrams, component diagrams. The signals here are component boundaries, data flows, interaction patterns, and API contracts. The levers are architecture patterns, composition strategies, and technology choices.\n\nWhen a developer asks AI to build a feature, the AI makes architecture decisions invisibly. It picks a pattern, chooses where to put business logic, and decides how components will communicate \u2014 all without showing the human what it chose or why.\n\nImagine instead: the AI generates an architecture diagram. You see the components, the data flows, the dependencies. You disagree with a decision \u2014 maybe the AI put business logic in the frontend and you want it in the backend. You drag the box to where it belongs. The AI regenerates the code to match your diagram.\n\nThis is how architects already work with junior developers. They draw the diagram, explain the pattern, and the junior builds to the blueprint. AI should work the same way \u2014 except the diagram should be bidirectional. Human edits the diagram, AI updates the code. AI generates code, the diagram updates to reflect reality.',
      },
      {
        level: 'h2',
        heading: 'Layer 1 \u2014 Data Foundation',
        body: 'At the bottom of the stack sits the data model. Entity relationship diagrams, database schemas, data dictionaries. The signals are entities, attributes, relationships, constraints, and cardinality. The levers are schema design decisions: normalisation, denormalisation, indexing strategies, relationship types.\n\nThe ER diagram is one of the most powerful communication tools in software engineering. In one glance, you see what data the system stores, how it relates, and what rules constrain it. Non-technical stakeholders can review it. Architects can critique it. Database administrators can optimise it.\n\nWhen AI generates a database schema, you see a migration file. Lines of SQL or ORM code. You have to read the code to understand the data model \u2014 and by the time you discover the AI chose the wrong relationship type between two entities, you have already built three features on top of that assumption.\n\nAn ER diagram should be the first thing AI produces and the first thing a human reviews. Change a relationship from one-to-many to many-to-many on the diagram, and the AI should regenerate the schema, the models, the API endpoints, and the queries that depend on it.',
      },
      {
        level: 'h2',
        heading: 'The Full Stack in Action',
        body: 'Now imagine all five layers working together.\n\nA product leader opens the business model canvas and defines the customer segments, value propositions, and revenue streams. The AI generates a system map showing the actors and value flows that serve this model. A UX designer reviews the system map, draws user journeys for each key actor, and writes user stories with acceptance criteria. An architect reviews the automatically generated architecture diagram, adjusts component boundaries and data flows. A data engineer reviews the ER diagram, tunes the relationships and constraints.\n\nAt every layer, a human controls the abstraction that matches their expertise. At every layer, the AI fills in the details below. Each layer constrains the layers beneath it \u2014 the business model constrains the system architecture, the user journeys constrain the product features, the architecture constrains the code, and the data model constrains everything.\n\nThis is not one person doing everything. This is a team of specialists, each with their own control surface, collaborating through shared abstraction layers \u2014 with AI as the engine that connects all the layers and generates the implementation.',
      },
      {
        level: 'h2',
        heading: 'What This Means Now',
        body: 'Fragments of this vision already exist. Figma-to-code tools translate visual designs into frontend components. Prisma schemas generate type-safe database clients. Infrastructure-as-code tools like Terraform let you define architecture declaratively and generate cloud resources. These are proof that the pattern works.\n\nThe gap is integration. No single AI tool exposes the full stack from business strategy to database schema as a set of interconnected, editable control surfaces. The current approach \u2014 chat-based prompting \u2014 will hit a ceiling. For simple features, a prompt is enough. For complex systems, you need the full cockpit.\n\nThe teams and tools that figure this out first will have an enormous advantage. Not because the AI is smarter, but because the humans are more in control. And that is, after all, a UX problem.',
      },
      {
        level: 'h2',
        heading: 'Where to Go from Here',
        body: 'This article is the first in a series exploring each abstraction layer in depth. Future posts will examine:',
      },
      {
        listItems: [
          'The ER Diagram as AI Interface \u2014 how visual database design could steer AI code generation',
          'User Journeys Should Be AI Inputs \u2014 structured UX artifacts as prompt replacements',
          'A Business Model Canvas That Generates Products \u2014 the highest abstraction layer as an AI control surface',
          'What Happens When You Build Without a Blueprint \u2014 a case study of missing abstraction layers in practice',
        ],
      },
    ],
  },
]

export const featuredBlogPosts = blogPosts.filter((p) => p.featured)

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}
