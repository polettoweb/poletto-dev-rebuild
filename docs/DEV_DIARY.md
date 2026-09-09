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

## 2026-08-25 — Project kickoff and scaffolding

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

## 2026-09-02 — Page inventory and primitive proposal

**What I worked on:** Reviewed the current poletto.dev homepage and the
Start Here, Blog, Topics, About, Newsletter, Contact, and article routes to
identify the smallest set of repeated interface needs.

**What the agent did:** Mapped the live pages to recurring structures: shared
site header and footer, constrained page content, article previews, topic
labels, newsletter signup, and long-form article typography. It proposed
`PageContainer`, `SiteHeader`, `SiteFooter`, `ArticleCard`, `TopicTag`, and
`NewsletterSignup` as the first implementation slice, with MDX prose styling
handled as an article layout concern rather than a broad typography system.

**What I changed or overrode, and why:** No code primitives were scaffolded
yet. I paused at the component API boundary to get approval on using plain
typed props with `className` extension and no variant or polymorphic-component
library. That keeps the initial system legible and lets real repeated behavior
justify abstraction before adding API complexity.

**Trade-offs / decisions made:** I did not include a generic `Card`, `Stack`,
or all-purpose `Typography` primitive in the first slice. The live site has
article previews and grouped content, but not enough evidence that a generic
framed card or spacing abstraction would improve the code. The newsletter
form is a real repeated behavior, so it deserves a focused primitive rather
than being hidden inside a page section.

**Open questions / next steps:** Confirm the initial component API, then
scaffold the approved primitives and add a focused typecheck/lint check.
Decide later whether article prose, form submission, or visual variants have
earned additional abstractions.

## 2026-09-09 — First component primitives

**What I worked on:** Scaffolded the first reusable components for the live
site's shared layout and editorial content patterns.

**What the agent did:** Added `PageContainer`, `SiteHeader`, and `SiteFooter`
under `components/layout`, plus `ArticleCard`, `TopicTag`, and
`NewsletterSignup` under `components/ui`. It used semantic HTML, Next.js
links, accessible labels, native email validation, and explicit TypeScript
props. It also installed the declared npm dependencies so the repository's
lint command could run locally. TypeScript validation also found and repaired
the scaffold's undefined `LayoutProps` reference in the root layout.

**What I changed or overrode, and why:** Chose plain typed props with an
optional `className` extension point instead of adding a variant library or a
polymorphic `as` API. The current pages have a small number of clear patterns,
so a more flexible API would add concepts before the site has earned them.
The newsletter action is required from the caller rather than hard-coded to a
provider because the form backend is still an open project decision. I also
replaced the undefined scaffold-only `LayoutProps` type with `ReactNode`
children typing because a clean typecheck is a useful baseline for the
component work.

**Trade-offs / decisions made:** Kept `ArticleCard` focused on article
metadata and reading links, rather than making a generic card that would
blur content and layout responsibilities. Kept `TopicTag` as a link rather
than a visual-only badge because topics are navigable on the live site. Used
native form controls instead of introducing a form library before submission
behavior and validation requirements are known.

**Open questions / next steps:** Integrate these primitives into the first
rebuilt route, then use that real composition to decide whether shared
typography, article prose, button variants, or form state deserve separate
abstractions. Add tests after the first meaningful behavior exists, as planned
in the kickoff entry.

## 2026-09-09 — First live-content homepage

**What I worked on:** Replaced the default Next.js starter page with the first
real homepage composition using content from the current poletto.dev.

**What the agent did:** Composed the existing layout and UI primitives into a
homepage with Marco's introduction, the four current topic links, the latest
four article titles and metadata, the newsletter signup, and the shared footer.
It also established the initial color tokens, link treatments, responsive
spacing, and site metadata. Lint, TypeScript validation, and a production
build all passed.

**What I changed or overrode, and why:** Chose to use the live site's actual
copy and article data immediately, stored as typed local arrays in the route.
This makes the page meaningful for visual and accessibility decisions now,
while keeping the data shape easy to move into MDX later. I did not add a
generic hero, section, button, or card abstraction just to make the page look
more systematic; the existing primitives were sufficient for this route.

**Trade-offs / decisions made:** Used the Buttondown embed endpoint as the
newsletter form action because the live site identifies Buttondown as its
provider, while keeping the action configurable on `NewsletterSignup`. The
homepage uses the live article dates and URLs but does not yet fetch remote
content, avoiding a runtime dependency before the MDX content decision is
implemented.

**Open questions / next steps:** Review the first rendered page at desktop and
mobile widths, then decide whether the visual system needs a dedicated
typography/prose layer before building the article route. Add interaction
tests once newsletter submission and navigation behavior are wired to real
routes.

## 2026-09-09 — First article route

**What I worked on:** Built the route for the current featured article,
`/blog/engineering-strategy-is-mostly-saying-no`.

**What the agent did:** Added the article metadata, live title, summary,
publication details, topic links, section headings, article body, newsletter
call to action, and shared site chrome. It added a focused `.prose` style for
long-form reading and verified the route in the browser as well as with lint,
TypeScript, and a production build.

**What I changed or overrode, and why:** Kept this as a concrete static route
instead of introducing dynamic routing or an MDX pipeline immediately. The
route gives us real evidence about article hierarchy, reading width, metadata,
and newsletter placement before we commit to a content architecture. I also
kept prose styling local and small rather than adding a typography framework
that the site has not yet earned.

**Trade-offs / decisions made:** Reused `TopicTag`, `NewsletterSignup`, and
the layout primitives rather than creating article-specific variants. The
article content is intentionally local for now: it proves the page behavior
while preserving the diary's earlier decision to revisit MDX once real content
needs are visible.

**Open questions / next steps:** Check the article route at mobile width and
decide whether the next content milestone should extract this article into
MDX or first build the Blog archive using the same local article data shape.

## 2026-09-09 — Shared content model and Blog archive

**What I worked on:** Used the original `polettoweb/leadingbytes` repository
as the source of truth for published article metadata and built the first Blog
archive in this Next.js rebuild.

**What the agent did:** Reviewed the source repo's Astro content collection,
frontmatter fields, article layout, homepage, and Blog route. It adapted the
published article metadata into a typed `src/content/articles.ts` module,
updated the homepage and featured article to consume that shared data, and
added `/blog` using the existing `ArticleCard` primitive. It validated the
archive in the browser and with lint, TypeScript, and a production build.

**What I changed or overrode, and why:** Reused the original repo's content
concepts (`title`, `description`, `pubDate`, `tags`, and `featured`) but did
not copy Astro components, `getCollection`, or client-side filter scripts.
The rebuild is intentionally Next.js-native, and four published articles are
enough evidence for a shared typed module without committing to an MDX loader
or browser filtering architecture yet.

**Trade-offs / decisions made:** Kept the Blog archive unfiltered for this
slice even though the original site has tag filtering. The archive first
needs to establish the content contract and card behavior; filtering will be
added only if the route and real tag usage justify the interaction and its
test surface.

**Open questions / next steps:** Decide whether to import the original MDX
articles into `src/content` next, or build the Start Here page from the shared
metadata first. The source repo's topic relationships are now available to
inform that decision.

<!--
Next entry template — copy this below the divider for each new session:

## YYYY-MM-DD — <short title>

**What I worked on:**

**What the agent did:**

**What I changed or overrode, and why:**

**Trade-offs / decisions made:**

**Open questions / next steps:**

-->
