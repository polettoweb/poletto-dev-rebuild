# Dev Diary — Rebuilding poletto.dev

This is a running log of rebuilding poletto.dev: the decisions made, the
trade-offs weighed, where an AI coding agent drafted work and where I
redirected or overrode it, and what I learned along the way.

The point of keeping this log isn't just personal record-keeping — it's the
raw material for the case-study post this project is meant to produce:
*"I rebuilt this site with an AI coding agent — here's what I directed,
overrode, and learned about leading AI-augmented development."*

Write an entry every session, even a short one. Future-you (and anyone
reading the case study) needs the *why*, not just the *what* — git history
already has the what.

## How to use this file

Each entry should answer, briefly:

- **What I worked on** — the task or decision in scope.
- **What the agent did** — what it drafted, suggested, or automated.
- **What I changed or overrode, and why** — this is the most valuable line
  in every entry. It's the evidence of judgment, not just output.
- **Trade-offs / decisions made** — anything with a "why not X instead"
  worth remembering.
- **Open questions / next steps** — what's still unresolved.

Keep entries honest. A diary that only records wins isn't useful as a case
study — the moments where the agent got something wrong, or where a
"quick fix" turned out to be the wrong call, are the most interesting part
for anyone (recruiter, hiring manager, future me) trying to understand how
I actually work.

---

## 2026-09-09 — Project kickoff and scaffolding

**What I worked on:** Set up the project skeleton — decided on stack,
scaffolded the app, defined the folder structure and the plan for the
rebuild.

**Context / why this project exists:** Rebuilding poletto.dev as a
portfolio piece to support a deliberate move toward Senior/Staff/Lead
frontend IC roles (stepping back from an Engineering Manager job search
that wasn't matching what I actually wanted right now — more time with
family, less commute stress, work I'm strong at). Goals for the finished
site:

- Demonstrate senior-level frontend judgment: architecture, performance,
  accessibility, testing — not just "a nice-looking blog."
- Demonstrate AI-augmented engineering leadership in practice, not just as
  a claim on a CV — this diary and the eventual write-up are the evidence.
- Ship it incrementally against the live site without breaking existing
  links, SEO, or the newsletter signup.

**Stack decisions:**

- **Next.js (App Router) + TypeScript** — current default expectation at
  senior+ level; server components are relevant experience to show.
- **Tailwind CSS** — fast to work with, plays well with a small component
  system, easy to keep design-token-driven.
- **Deliberately no heavy CMS layer for now.** The site is mostly essays
  and a newsletter signup, not a large content operation — an abstraction
  I don't need yet is scope I don't need to defend in an interview. MDX for
  content is the more honest choice; revisit only if it becomes limiting.

**What the agent did:** Scaffolded the Next.js + TypeScript + Tailwind
project (`create-next-app`), set up the base folder structure
(`components/ui`, `components/layout`, `lib`, `content`, `docs`).

**What I changed or overrode:** Removed the default agent-instruction
files the scaffold tool generates (`AGENTS.md`, `CLAUDE.md`) — didn't want
tool-specific scaffolding cluttering the repo root before there's an actual
architecture decision to document there.

**Trade-offs / decisions made:**

- Skipping Storybook for now rather than adding it day one — will introduce
  it once there are enough real components to justify documenting them,
  not as a starting ceremony.
- No test runner wired up yet — deliberately sequenced after the first
  real components exist, so tests are written against real behaviour
  rather than scaffolded boilerplate.

**Open questions / next steps:**

- [ ] Decide on content source: MDX files in-repo vs. a lightweight headless
      CMS. Leaning MDX — revisit if editing friction becomes a real problem.
- [ ] Design the component system starting point: what's the smallest set
      of primitives (Button, Card, Layout shell, Typography) that covers
      the existing site's real pages?
- [ ] Set up CI (GitHub Actions): lint + typecheck + build on PR, before
      any deploy pipeline exists.
- [ ] Decide on hosting/deploy target (Vercel vs. Azure Static Web Apps) —
      Azure has the side benefit of doubling as cloud-fundamentals practice.
- [ ] Plan the incremental cutover strategy from the live poletto.dev so
      there's no downtime or broken links during migration.

---

<!--
Next entry template — copy this below the divider for each new session:

## YYYY-MM-DD — <short title>

**What I worked on:**

**What the agent did:**

**What I changed or overrode, and why:**

**Trade-offs / decisions made:**

**Open questions / next steps:**

-->
