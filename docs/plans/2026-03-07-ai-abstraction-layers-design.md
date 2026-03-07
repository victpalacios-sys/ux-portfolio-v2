# AI Abstraction Layers Blog Post — Design Document

**Date:** 2026-03-07
**Status:** Approved

## Purpose

A long-form thought leadership blog post for Victor Palacios' UX portfolio. Argues that current AI tools have a UX design problem: they flatten all human-AI interaction into a single chat interface, skipping 40 years of learned abstraction layers that make complex systems controllable. Targets both UX/product leaders and AI practitioners.

## Article Metadata

- **Slug:** `ai-abstraction-layers`
- **Title:** `AI Skipped the Stack`
- **Tag:** `AI + UX`
- **Date:** `Mar 7, 2026`
- **Read time:** `13 min read`
- **Cover image:** `/images/blog-ai-abstraction-layers-hero.png` (user will provide)
- **Cover image alt:** `Diagram showing the abstraction layer stack from business strategy to data foundation`
- **Featured:** `true`

## Excerpt

"Current AI tools give you a text box and an output. But complex systems have never been controlled through a single interface. The AI industry has a UX problem — it skipped 40 years of abstraction layers that make complex systems controllable by humans."

## Core Thesis

Between "prompt" and "output" there should be 5 distinct layers of abstraction, each with its own visual interface, its own signals (what humans can observe) and levers (what humans can control). Current AI tools have one signal (the generated output) and one lever (the next prompt). The future is multi-layer control.

## Tone and Voice

First-person, opinionated, conversational — consistent with Victor's existing blog posts (Job Shadowing, Nokia N-Gage). No academic hedging. Confident but not arrogant. The authority comes from 25+ years of UX experience watching industries repeatedly solve the same abstraction problem.

## Article Structure

### Opening — The One-Layer Problem (no heading)

Current AI tools: text box in, output out. One layer. No complex system has ever been controlled through a single surface. Airplanes have cockpits. Factories have control rooms. Software engineering developed ER diagrams, architecture diagrams, user stories, business canvases — each one a control surface for a different level of the system. The AI industry skipped all of them. This is a UX design problem.

### h2: The Missing Stack

Core thesis: between prompt and output, 5 abstraction layers are missing. Introduce the "signals and levers" framework — every layer produces outputs, emits signals humans can read, and offers levers humans can pull. Each layer speaks a different language for a different role.

### h2: Layer 5 — Business Strategy

Business model canvas, marketing campaigns, competitive positioning. Signals: customer segments, value prop, revenue streams. Levers: pricing, channel strategy, positioning. What's missing: no AI tool accepts a business canvas as input and constrains the product downstream.

### h2: Layer 4 — System Architecture

System maps (stakeholder maps, value network maps, ecosystem maps), service blueprints. Signals: actors, value flows, touchpoints. Levers: stakeholder priorities, service flows, channel design. What's missing: AI generates code but never shows you the system of actors it's building.

### h2: Layer 3 — Product & Experience

User journeys, user stories, acceptance criteria. Signals: user goals, pain points, success criteria. Levers: journey priorities, story scope, acceptance tests. What's missing: AI guesses user needs from prompts instead of consuming structured UX artifacts.

### h2: Layer 2 — Application Architecture

Data flow diagrams, class/object diagrams, sequence diagrams. Signals: component boundaries, data flows, interactions. Levers: architecture patterns, composition, API contracts. What's missing: AI picks architecture invisibly. No editable architecture diagram that the code follows.

### h2: Layer 1 — Data Foundation

Entity relationship diagrams, database schemas. Signals: entities, relationships, constraints, cardinality. Levers: schema design, normalisation, indexing. What's missing: AI generates schemas you can't see until they fail. ER diagrams should be editable control surfaces.

### h2: The Full Stack in Action

Paint the future: product leader defines business canvas (L5), UX designer maps journeys (L3), architect reviews system diagram (L4), AI fills in implementation. Each layer constrains those below it. Humans control their domain through visual, structured interfaces.

### h2: What This Means Now

Fragments already exist (Figma to code, Prisma schema to API). The gap is integration — no single tool exposes the full stack. The teams that solve this first will build better products faster.

### Suggested Follow-up Threads (end of article)

1. "The ER Diagram as AI Interface"
2. "User Journeys Should Be AI Inputs"
3. "A Business Model Canvas That Generates Products"
4. "What Happens When You Build Without a Blueprint"

## Implementation

### File

Modify: `src/data/blogPosts.ts` — add new blog post entry to the `blogPosts` array

### Image

User will provide: `public/images/blog-ai-abstraction-layers-hero.png`

### Content Format

Use the existing `BlogSection` interface:
- Opening: body-only sections (no heading)
- Layer sections: `level: 'h2'`, `heading`, `body` with `\n\n` for multiple paragraphs
- Follow-up threads: `listItems` array

### Word Count Target

~2,500–3,000 words (13 min read at ~220 wpm)
