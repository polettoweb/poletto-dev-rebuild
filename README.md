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

- **Next.js** (App Router) + **TypeScript**, built as a static export (`output: "export"`) — no server, every route is static or computable at build time
- **Tailwind CSS**
- MDX for content (no CMS layer — see dev diary for reasoning)
- **Testing:** Vitest for content/behavior logic, Playwright for route and interaction smoke tests, both run against the actual static build
- **CI:** GitHub Actions — lint, typecheck, unit tests, build, browser tests on every push and PR to `main`
- **Deployment:** Cloudflare Pages (static assets, no adapter needed)

## Project structure

```
src/
  app/            # Next.js App Router routes
  components/
    ui/           # Small, reusable primitives (ArticleCard, ThemeToggle, ...)
    layout/       # Page shell, nav, footer
  content/        # MDX articles + typed metadata/topic modules
  lib/            # Utilities, helpers
tests/
  e2e/            # Playwright route and interaction tests
docs/
  DEV_DIARY.md    # Running build log — decisions, trade-offs, AI-agent notes
```

## Getting started

```bash
npm install
npm run dev
```

Other scripts: `npm test` (Vitest), `npm run test:e2e` (Playwright, against
a static build served on port 3100), `npm run build` (static export to
`out/`), `npm run start` (serve that export locally).

## Status

Core routes, content pipeline, dark mode, and CI are live. All 22 articles
carried over from the old blog now have verified bodies; the "Coming soon"
content boundary is still in place for any future draft, just currently
unexercised — see the dev diary for the current state and next steps.
