# poletto.dev — rebuild

A ground-up rebuild of [poletto.dev](https://poletto.dev), built as a
portfolio piece and case study in AI-augmented frontend engineering.

## Why this project exists

See [`docs/DEV_DIARY.md`](docs/DEV_DIARY.md) for the full running log —
decisions, trade-offs, and where an AI coding agent drafted work versus
where it was redirected or overridden.

Short version: a deliberate rebuild demonstrating senior/staff-level
frontend judgment (architecture, performance, accessibility, testing) and
a real, documented example of leading an AI-augmented development
workflow rather than just claiming familiarity with one.

## Stack

- **Next.js** (App Router) + **TypeScript**
- **Tailwind CSS**
- MDX for content (no CMS layer — see dev diary for reasoning)
- Deployment and CI: TBD, see dev diary open questions

## Project structure

```
src/
  app/            # Next.js App Router routes
  components/
    ui/           # Small, reusable primitives (Button, Card, ...)
    layout/       # Page shell, nav, footer
  content/        # MDX essays / posts
  lib/            # Utilities, helpers
docs/
  DEV_DIARY.md    # Running build log — decisions, trade-offs, AI-agent notes
```

## Getting started

```bash
npm install
npm run dev
```

## Status

Early scaffolding. See the dev diary for current state and next steps.
