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

## Project kickoff and scaffolding

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

## Page inventory and primitive proposal

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

## First component primitives

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

## First live-content homepage

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

## First article route

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

## Shared content model and Blog archive

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

## Start Here reading path

**What I worked on:** Built the `/start-here` route as a curated entry point
for new readers.

**What the agent did:** Added three reading paths, connected them to the
shared article metadata, reused the existing layout and newsletter primitives,
and verified the route in the browser and with lint, TypeScript, and a
production build.

**What I changed or overrode, and why:** Chose to build this route before
importing the original Markdown bodies into MDX. The route tests whether the
metadata model can support editorial relationships and curated navigation;
it does, without requiring a content loader or article-body transformation.
This is useful evidence before choosing the MDX integration details.

**Trade-offs / decisions made:** The first reading path uses the currently
available published metadata in this rebuild rather than reproducing every
historical path from the source repo. That keeps the route honest about what
is navigable today and avoids creating links to pages that do not exist yet.

**Open questions / next steps:** Import the original article Markdown/MDX
content and establish the content loader, or build the Topics route first if
the content relationships are the more valuable next architectural test.

## Topics and explicit article relationships

**What I worked on:** Built the `/topics` route from the shared article
metadata and the topic structure found in the original `leadingbytes` repo.

**What the agent did:** Added a typed topic model, related-article lookup,
four content pillars, route metadata, semantic related-article lists, and the
shared site chrome. It verified the route in the browser and with lint,
TypeScript, and a production build.

**What I changed or overrode, and why:** Rejected broad tag matching after
the first browser check showed misleading relationships: a leadership tag
caused AI and team-culture articles to appear under Scaling Organisations.
Changed the model to explicit `articleSlugs`, matching the source repo's
`postSlugs` approach, because editorial relationships are intentional and
should not be inferred from overlapping tags.

**Trade-offs / decisions made:** Kept topic relationships in a small typed
module rather than adding a CMS-like taxonomy system. Four pillars are
represented now because only four articles are in the rebuilt content model;
additional source articles can be added without changing the page contract.

**Open questions / next steps:** Import the original Markdown/MDX article
bodies and decide how their frontmatter maps to this metadata module. Once
that is in place, replace the temporary static article proof point with the
real content pipeline.

## First MDX content proof

**What I worked on:** Added the Next.js MDX toolchain and moved the featured
article body into a local MDX file.

**What the agent did:** Installed `@next/mdx`, `@mdx-js/loader`, and
`@mdx-js/react`; configured MDX page extensions; added the root MDX component
boundary; created the article body at
`src/content/articles/engineering-strategy-is-mostly-saying-no.mdx`; and
updated the article route to render that component. It verified semantic
rendering in the browser and passed lint, TypeScript, and production build.

**What I changed or overrode, and why:** Kept article metadata in the typed
`articles.ts` module instead of adding frontmatter parsing immediately. The
source repository's collection schema is useful evidence, but the raw GitHub
bulk fetch returned 404 for the requested article paths during this session.
Rather than claim a complete import from partial search excerpts, I used the
already-verified article body as a reversible MDX proof and left the full
source migration for a separately verifiable step.

**Trade-offs / decisions made:** Chose Next's native MDX integration over
copying the original Astro content collection. This keeps the rebuild aligned
with its Next.js architecture while still preserving the option to add
frontmatter validation or a content loader once more article bodies are
available locally.

**Open questions / next steps:** Obtain and verify the remaining source
article bodies, then decide whether frontmatter should become the canonical
metadata source or remain a generated/indexed layer over the typed content
module. Add MDX component overrides only when real article content needs them.

## About page from verified source content

**What I worked on:** Built the `/about` route using the career narrative,
current role, leadership philosophy, experience, and contact details from the
source site and repository.

**What the agent did:** Added page metadata, a semantic long-form article
structure, experience and values lists, mail and social links, and the shared
header/footer. It validated the route with lint, TypeScript, production build,
and a browser accessibility snapshot.

**What I changed or overrode, and why:** Chose a route-local composition
instead of forcing the About page into the article MDX pipeline. About content
is a first-person profile with a different update cadence and no article
metadata; treating it as a blog post would make the content model less honest.
I also stopped short of importing remaining article bodies because the source
search endpoint only exposed excerpts, not complete files.

**Trade-offs / decisions made:** Reused the existing `.prose` treatment for
readability without creating a generic page template. The page has enough
semantic structure to justify a future content extraction, but not enough
repetition yet to justify another abstraction.

**Open questions / next steps:** Build the Newsletter and Contact routes,
then return to the verified MDX migration with a clear source acquisition path
for the remaining articles. Add structured metadata and tests after the core
page surfaces are represented.

## Newsletter page and signup reuse

**What I worked on:** Built the dedicated `/newsletter` route from the source
site's Leading Bytes positioning and issue themes.

**What the agent did:** Added page metadata, the newsletter promise, four issue
themes, the author quote, the Buttondown signup, and an RSS fallback. It reused
the existing `NewsletterSignup` primitive and verified the route with lint,
TypeScript, production build, and a browser accessibility snapshot.

**What I changed or overrode, and why:** Kept the signup primitive unchanged
after testing it on the dedicated page. It already supports the real variation
we have - caller-provided action, heading, and description - so adding form
variants or a submission state now would be abstraction ahead of behavior.

**Trade-offs / decisions made:** Used the source site's issue themes as plain
content data in the route rather than creating a newsletter taxonomy model.
Those themes explain the editorial promise but do not yet drive navigation or
filtering, so a separate model would add maintenance without user value.

**Open questions / next steps:** Build `/contact`, then add structured SEO
metadata and tests around the shared form and content lookup once the core
routes are complete.

## Direct contact page

**What I worked on:** Built the `/contact` route from the source site's
contact content and professional links.

**What the agent did:** Added the contact introduction, direct email address,
LinkedIn call to action, secondary social links, page metadata, and semantic
sections using the shared site chrome. It validated the route with lint,
TypeScript, production build, and a browser accessibility snapshot.

**What I changed or overrode, and why:** Chose direct email and social links
instead of adding a contact form or server action. The source site explicitly
identifies direct contact as the reliable path, and this project has not chosen
a form delivery or spam-protection backend. A form now would create behavior
and operational obligations without evidence that they improve the workflow.

**Trade-offs / decisions made:** Used external links with explicit new-tab
semantics for professional profiles, while keeping email as a normal mailto
link. Kept the route-specific sections local because they represent distinct
contact channels, not a reusable card system yet.

**Open questions / next steps:** Add structured SEO metadata and focused tests
for content lookup and newsletter form semantics. Then return to the remaining
source article bodies and dynamic article routing when complete source files
are available for verification.

## Dynamic article routing and verified content boundary

**What I worked on:** Replaced the one-off featured article route with a
dynamic `/blog/[slug]` route and added structured Article metadata.

**What the agent did:** Added an explicit MDX content registry, static params,
per-article metadata generation, Article JSON-LD, and a proper 404 for slugs
without verified local content. It also updated internal Blog links to use
Next.js `Link` and validated the known route, the missing-content 404, the
archive, lint, TypeScript, and the production build.

**What I changed or overrode, and why:** Refused to create placeholder article
pages from metadata alone. The source repository search still exposed only
partial excerpts for three article bodies, so those entries now render as
non-clickable “Coming soon” metadata instead of sending users to dead links.
This preserves content integrity while leaving the dynamic route ready for
verified MDX files.

**Trade-offs / decisions made:** Added JSON-LD only for articles with actual
rendered content, and kept the content registry explicit rather than using a
filesystem glob that could publish an unreviewed file accidentally. The
archive remains useful as an editorial index without pretending the migration
is complete.

**Open questions / next steps:** Obtain and verify the remaining article
bodies, then add them to the MDX registry one at a time. After the content
surface is stable, add focused tests for article lookup, 404 behavior, and
newsletter form semantics.

## RSS route for verified articles

**What I worked on:** Implemented the `/rss.xml` route already linked from the
site footer and Newsletter page.

**What the agent did:** Added a Next.js route that emits RSS 2.0 XML with
article titles, descriptions, canonical links, GUIDs, and publication dates.
It added XML escaping and verified the generated response in the browser,
alongside lint, TypeScript, and the production build.

**What I changed or overrode, and why:** Filtered the feed to articles with
verified local content instead of syndicating every metadata entry. Three
articles are still marked Coming soon in the archive because their complete
bodies have not been verified locally; publishing them to RSS would make the
content boundary inconsistent across the site.

**Trade-offs / decisions made:** Kept the feed implementation dependency-free
and route-local rather than adding an RSS package for one feed with a small
schema. XML escaping is explicit and testable, and a package can be justified
later if categories, enclosures, or Atom support are added.

**Open questions / next steps:** Add the remaining verified article bodies to
the MDX registry, then expand the RSS feed automatically as each article moves
out of Coming soon. Add focused tests once the test-runner sequencing decision
is made.

## Sitemap for the public route surface

**What I worked on:** Added a native Next.js sitemap for the rebuilt public
pages and verified article routes.

**What the agent did:** Added `src/app/sitemap.ts` using Next's
`MetadataRoute.Sitemap`, included the homepage, core content pages, contact,
newsletter, and topics routes, and generated the verified article URL from the
shared content model. It validated lint, TypeScript, production build, and the
rendered `/sitemap.xml` response.

**What I changed or overrode, and why:** Applied the same content-integrity
boundary as RSS: article URLs enter the sitemap only when their bodies are
verified and locally renderable. Metadata-only entries remain out of search
discovery until their content migration is complete.

**Trade-offs / decisions made:** Used Next's built-in sitemap convention
instead of hand-writing XML or adding an SEO package. The route list is small,
the framework owns the serialization, and the source stays easy to inspect.

**Open questions / next steps:** Decide on the test runner now that the main
routes, content lookup, RSS, and sitemap exist. Then add focused tests for
content availability, 404 behavior, and feed/discovery boundaries.

## Vitest as the first test layer

**What I worked on:** Added the first automated test runner and tests for the
content model.

**What the agent did:** Installed Vitest, added the `npm test` script and a
minimal configuration, and wrote tests covering article lookup, verified
content availability, latest-article derivation, and explicit topic
relationships. The suite passed with 2 test files and 3 tests.

**What I changed or overrode, and why:** Chose Vitest before Playwright or
React Testing Library because the first meaningful behavior is pure content
selection and relationship logic. The project has no client-side interactive
components that justify a browser or component test layer yet. The newest
Vitest release conflicted with the repository's Node 20 typings, so I chose
Vitest 2.1.9 rather than forcing peer resolution or broadening unrelated
scaffold dependencies.

**Trade-offs / decisions made:** Kept the initial suite narrow and behavior-
focused instead of testing implementation details or snapshotting rendered
pages. Playwright remains a later route and accessibility milestone; React
Testing Library remains deferred until client-side behavior exists.

**Open questions / next steps:** Add tests for RSS and sitemap inclusion
boundaries, then add Playwright for a small set of critical navigation and
form journeys once the content surface is stable. Review the npm audit output
separately rather than mixing dependency remediation into test setup.

## Test the publishing boundary

**What I worked on:** Hardened the verified-content rule shared by the RSS
feed and sitemap.

**What the agent did:** Extracted `getPublishedArticles()` into the shared
article module, updated RSS and sitemap generation to use it, and added a
Vitest test proving that only articles with verified local bodies enter
published discovery surfaces. The suite now passes 3 files and 4 tests.

**What I changed or overrode, and why:** Chose to test the content boundary as
a pure function rather than testing serialized XML and sitemap output first.
The important decision is which articles are publishable; keeping that rule
centralized prevents RSS and SEO discovery from drifting as migration work
continues.

**Trade-offs / decisions made:** Left route serialization thin and did not add
an integration-test harness yet. The current risk is content status logic,
which Vitest covers quickly; browser-level feed and sitemap checks remain a
later Playwright or route-integration slice.

**Open questions / next steps:** Add verified MDX bodies one at a time and
extend the same tests as each article becomes publishable. Choose the smallest
browser-test slice after the remaining content route decisions settle.

## First Playwright route smoke tests

**What I worked on:** Added the first browser-level test layer for the rebuilt
site.

**What the agent did:** Installed `@playwright/test` and Chromium, added an
isolated Playwright configuration, and wrote three smoke tests covering
homepage-to-Blog navigation, verified article rendering with JSON-LD, and the
404 contract for an article whose body is not yet migrated. All three passed
against the production server.

**What I changed or overrode, and why:** Started with route contracts rather
than visual snapshots or exhaustive page coverage. The highest-risk browser
behavior is currently whether navigation, verified content, and honest 404s
work together; pixel-level tests would add maintenance before the visual
system is stable. The dev-server lock also blocked the first harness attempt,
so I changed Playwright to launch `next start` on port 3100 against the
validated production build instead of fighting the existing dev process.

**Trade-offs / decisions made:** Kept the suite Chromium-only and used
accessible roles and text rather than CSS selectors. Mobile and cross-browser
coverage can be added when the route surface or interaction complexity makes
that risk worth its cost.

**Open questions / next steps:** Add tests for the newsletter form and RSS /
sitemap responses, then migrate the remaining verified article bodies and
expand route coverage as content becomes available.

## Expand browser contracts

**What I worked on:** Extended the Playwright suite beyond route reachability
to cover the site's conversion and discovery surfaces.

**What the agent did:** Added browser checks for the newsletter form's
accessible email field and Buttondown action, RSS content type and verified
article filtering, and sitemap inclusion/exclusion behavior. The suite now
passes 6 browser tests.

**What I changed or overrode, and why:** Chose response and accessible-role
assertions over snapshots or CSS-level checks. These tests protect the public
contracts that matter to readers, subscribers, and search/feed consumers while
avoiding brittle coupling to the current visual implementation.

**Trade-offs / decisions made:** Kept the suite Chromium-only and reused the
production-server harness. The six tests are broad enough to cover the current
route boundary without turning every page detail into an end-to-end test.

**Open questions / next steps:** Migrate additional verified article bodies,
then add mobile browser coverage if the responsive routes develop distinct
behavior rather than merely different layout.

## CI for the proven validation path

**What I worked on:** Added the first GitHub Actions workflow for pull-request
and main-branch validation.

**What the agent did:** Added `.github/workflows/ci.yml` with Node 20, npm
cache support, least-privilege repository read access, dependency installation,
lint, TypeScript, Vitest, production build, Chromium installation, and
Playwright execution. The corresponding local commands all pass.

**What I changed or overrode, and why:** Chose one sequential validation job
instead of splitting checks into multiple jobs. The current project is small,
and keeping the order visible makes the dependency between build and
production-server browser tests easy to understand. I also kept CI on Node 20
to match the existing `@types/node` baseline rather than upgrading the runtime
as part of an unrelated workflow change.

**Trade-offs / decisions made:** Playwright runs after the production build and
installs only Chromium in CI. That keeps the first pipeline reproducible and
focused; broader browser matrices can be justified later by actual responsive
or browser-specific behavior.

**Open questions / next steps:** Migrate more verified article bodies and
consider splitting CI jobs only when runtime or ownership makes parallelism
valuable. Add a deployment workflow only after the hosting target is decided.

## Site identity metadata and SEO contracts

**What I worked on:** Added root-level canonical metadata and structured site
identity information.

**What the agent did:** Added `metadataBase`, canonical URLs, RSS discovery,
Open Graph defaults, Twitter summary metadata, and JSON-LD for Marco as a
Person and the site as a WebSite. It expanded the Playwright suite to verify
the identity graph and retained the article-specific graph.

**What I changed or overrode, and why:** Used the source repo's Person/site
identity as the basis, but kept the implementation in the Next root layout
instead of copying Astro head components. During browser validation, the first
JSON-LD assertion incorrectly used visible-text matching on a script element;
I changed it to inspect `textContent`, preserving a meaningful contract rather
than weakening the assertion.

**Trade-offs / decisions made:** Added only stable identity and discovery
metadata now. Social preview images, organization schema, and richer article
schema can wait until the visual assets and content migration are settled.

**Open questions / next steps:** Migrate additional verified MDX articles and
decide whether their metadata should move from the typed module into
frontmatter. Add preview images when there is a deliberate visual identity to
encode.

## Single source of truth for the content boundary

**What I worked on:** Reviewed whether another article body could be
verified and migrated, then closed a structural gap in how the site decides
which articles are publishable.

**What the agent did:** Attempted to re-verify the three remaining article
bodies against the source `polettoweb/leadingbytes` repository. Both a raw
GitHub tree fetch and a direct repo page fetch returned 404, consistent with
earlier sessions' partial-excerpt results — the repository is not reachable
for a complete, verifiable fetch right now. Rather than migrate from partial
excerpts, the agent audited the existing content boundary instead and found
that `Article.hasContent` (hand-set per entry in `articles.ts`) and
`contentBySlug` (hand-maintained in the `/blog/[slug]` route) were two
independent, manually-synchronized sources of truth for the same fact:
whether an article's body is verified and renderable. Nothing enforced that
they agreed. It restructured `articles.ts` so `contentBySlug` is the single
registry of verified MDX bodies and `hasContent` is now derived from
membership in that map, updated the dynamic route to consume the shared
registry instead of duplicating it, and added a Vitest test asserting the
two can never diverge.

**What I changed or overrode, and why:** Moving the MDX import into
`articles.ts` broke Vitest, which had no MDX transform configured — content
tests import `articles.ts`, and now transitively the `.mdx` file. Rather
than move the registry back out (which would restore the drift risk this
change exists to close), I added `@mdx-js/rollup` to Vitest via
`vitest.config.mts`. That import is ESM-only and failed to load from a
`.ts` config under CommonJS resolution, so I renamed the config to
`vitest.config.mts` — a standard, scoped fix that doesn't touch
`package.json`'s module type or any other tool's config. Also added
`test-results/` and `playwright-report/` to `.gitignore`; Playwright had
started writing run artifacts into the working tree that were never meant
to be tracked.

**Trade-offs / decisions made:** Did not migrate a third article body — the
source repo isn't verifiably reachable right now, and the workflow rule
against fabricating content from partial excerpts still applies. Chose to
spend this session hardening the existing content boundary instead, which
was the recommended fallback and also directly reduces the risk of the
eventual migration work (one less place for a new article to be entered
inconsistently). Kept the fix structural (derive, don't duplicate) rather
than adding a test that merely checks the two lists match — a test can be
forgotten or skipped; a single registry can't drift by construction.

**Open questions / next steps:** Find a verifiable, complete source for the
remaining three article bodies (the repo fetch failing outright, rather than
returning partial excerpts, is new information worth following up on
directly with the source rather than retrying the same fetch). Once a body
is verified, adding it is now a one-line addition to `contentBySlug` with no
separate `hasContent` bookkeeping. Mobile Playwright coverage remains
deliberately deferred: `SiteHeader` has no distinct mobile interaction (no
menu toggle), so at present it would only be testing layout, which the
project's own criterion for adding that coverage says not to do yet.

## Static export, ready for Cloudflare Pages

**What I worked on:** Resolved the last open architecture question
(hosting/deploy target) and made the app deployable. Also stepped back to
reprioritize: with the engineering scaffolding solid, the next-highest-value
work for the actual goal (a portfolio that gets a Sr/Staff/Lead frontend IC
role) is getting a live URL, then real article content, then the case-study
write-up, then a device/accessibility pass — in that order, because nothing
else is checkable by a hiring manager until it's live.

**What the agent did:** Confirmed Cloudflare's current Next.js adapter
(`@opennextjs/cloudflare`) supports Next 16, but checked the app's actual
route surface first: every route is either fully static or a Route Handler
computed from local content with no per-request data (`rss.xml`,
`sitemap.xml`). That doesn't need a Workers runtime at all, so the agent set
`output: "export"` in `next.config.ts` instead of adding a Cloudflare-specific
adapter dependency. Both route handlers needed `export const dynamic =
"force-static"` to satisfy static export's requirements. Rebuilt and
inspected `out/` directly (404.html, per-route .html files, rss.xml,
sitemap.xml all present and correct).

**What I changed or overrode, and why:** `next start` doesn't run against a
static export build, so the Playwright `webServer` had to switch to serving
`out/` directly. I chose the `serve` package over reintroducing a Next server
because it matches how Cloudflare Pages actually serves the site — same
static files, same 404 semantics — instead of testing a server mode we're
no longer deploying. That surfaced a real gap: the RSS route's explicit
`Content-Type: application/rss+xml` header only existed in server code,
which static export drops — a static host serves file-extension-based
content types unless told otherwise. Added `public/_headers` (Cloudflare
Pages' header convention) and `public/serve.json` (local `serve` config) so
both the production host and the local test server apply the same header.
Also updated `start` from `next start` (would now error) to `serve out`, so
local production preview matches what actually deploys.

**Trade-offs / decisions made:** Chose static export over an SSR adapter
even though the adapter works, because the app doesn't use anything that
needs a server — adding Workers runtime for a site with zero server-only
behavior would be exactly the kind of ahead-of-need abstraction this project
keeps rejecting. This also keeps the deploy host swappable (Vercel, Netlify,
GitHub Pages would all work identically) if Cloudflare turns out not to fit.
Accepted a small duplication between `_headers` and `serve.json` — two
different tools' config formats for the same one-line fact — rather than
building a generator for two lines of config.

**Open questions / next steps:** Deployment itself needs the user's Cloudflare
account — I can't create the Pages project or set DNS. Cloudflare Pages
dashboard settings once the repo is connected: build command `npm run build`,
output directory `out`. After that's live: migrate the remaining verified
article bodies (source repo fetch is still failing outright, see prior entry),
then write the case-study post the whole diary exists to support.

## Design pass: sepia dark mode

**What I worked on:** A design review of the existing visual system, then
added dark-mode support with a manual toggle.

**What the agent did:** Audited the 5-token light palette in `globals.css`
by computing actual WCAG contrast ratios rather than eyeballing hex values —
found `--foreground`/`--muted` against `--background` both clear AA, but
`--line` (used as the border color throughout) sat at 1.41:1, well under the
3:1 minimum for meaningful non-text UI contrast. Retuned `--line` to a
darker sage (`#899080`, 3.05:1) as part of the same pass, since a "design
pass" should include the palette that already shipped, not just the new one.
Added a dark theme — warm sepia (`#211a14` background, `#ead9bf` text)
rather than a desaturated black, to stay consistent with the light theme's
paper-like warmth — verified the same way (12.4:1 fg/bg, 6.1:1 muted/bg,
3.1:1 line/bg). Implemented via a `data-theme` attribute: unset follows
`prefers-color-scheme`, explicit `light`/`dark` (from a new header toggle,
persisted to `localStorage`) always wins. A `next/script` `beforeInteractive`
script applies any stored preference before first paint to avoid a flash of
the wrong theme. Rendered both states with Playwright and read the
screenshots directly rather than describing the change from the CSS alone.

**What I changed or overrode, and why:** The toggle's first implementation
read `matchMedia`/`localStorage` in a `useEffect` and called `setState`
directly — the project's stricter React-Compiler-era lint rule
(`react-hooks/set-state-in-effect`) correctly rejected this as the "effect
that should be a subscription" anti-pattern. Rewrote it with
`useSyncExternalStore`, which is the intended hook for syncing component
state with an external system (browser APIs here), and ended up with less
code and no effect at all. Used plain Unicode glyphs (☼/☾) for the toggle
icon instead of an icon library, matching the site's existing no-icon-set,
typographic aesthetic.

**Trade-offs / decisions made:** Kept the toggle two-state (explicit
light/dark) rather than a three-state light/dark/system cycle — simpler
mental model for a reader, and "system" is still the default for anyone who
never touches it. Added `suppressHydrationWarning` only on `<html>`, scoped
to the one attribute the init script mutates before hydration, rather than
disabling hydration warnings more broadly.

**Open questions / next steps:** Visual/contrast check was done at the
component level (homepage, article, hover states); a full page-by-page pass
across `/topics`, `/start-here`, `/contact` would catch anything the shared
primitives don't cover. The next priorities from the last entry are
unchanged: get Cloudflare Pages connected, then the remaining article
bodies, then the case-study post.

## Public-repo readiness: contact email and commit history

**What I worked on:** A pre-publish check before making the repo public and
pushing it to GitHub for the first time.

**What the agent did:** Audited the working tree and git history for
secrets before answering "is this safe to make public" — no `.env` files,
no keys/tokens in source or CI, no credentials ever committed. That check
did surface something real: `git log` showed the project's very first
commit was authored with the personal address behind this account, not a
public-facing one, and every commit since used a different personal Gmail
address as the git author email — neither was the domain email meant to be
the public identity here. Replaced the public-facing contact address
(`polettoweb@gmail.com`, used on the About and Contact pages) with
`marco@poletto.dev` in both places, removed the `YYYY-MM-DD` prefix from
every dev-diary entry heading and the entry template per request, then
rewrote every commit's author and committer email to `marco@poletto.dev`
with `git filter-branch --env-filter` before the first push, since history
rewrites are only free of consequence before anyone else has a copy of the
branch.

**What I changed or overrode, and why:** Did not change local git config
(`user.email`) — that's an explicit standing rule regardless of the
request, separate from rewriting the commits themselves. Future commits
will keep using whatever the local git config is set to; the user updates
that themselves if they want it to match going forward.

**Trade-offs / decisions made:** Rewrote history rather than adding a
`.mailmap` (which only relabels author identity in `git log` output, not in
what's actually stored in each commit object and served to anyone who
clones or views the commit) because this repo had no remote yet — a history
rewrite has no cost when nothing has been shared. That window closes the
moment this is pushed; any future correction after this point would need a
force-push and coordination instead of a clean rewrite.

**Open questions / next steps:** Next: push this rewritten history to the
(currently empty) public remote at `github.com/polettoweb/poletto-dev-rebuild`
as the first public commit history. Cloudflare Pages, remaining article
bodies, and the case-study post remain the open priorities after that.

## The case-study post finally gets written

**What I worked on:** The article this whole diary exists to support -
"The Agent Wrote the Code. Leading It Was the Job." Migrated it into the
site as the first genuinely new (not source-migrated) article, and made it
the featured piece.

**What the agent did:** Drafted the article from this diary's own entries -
not a generic "AI pair programming" take, but six concrete moments already
on record: refusing to fabricate the three still-unverified article bodies,
the `hasContent`/`contentBySlug` drift bug and the structural fix, the
JSON-LD assertion that was quietly checking the wrong thing, computing
actual contrast ratios instead of eyeballing the dark theme, choosing static
export over a working-but-unnecessary Cloudflare Workers adapter, and
declining to touch git config even when asked directly. Added the MDX file,
wired it into the same `contentBySlug` registry the last few sessions'
content-boundary work exists to keep honest, marked it `featured`, and
added it to the "AI & the future of engineering work" topic. Screenshotted
the rendered result in the browser rather than trusting the markdown.

**What I changed or overrode, and why:** Making the new piece `featured`
un-featured the original article by construction (`featuredArticle` picks
the first `featured: true` entry) - intentional, not a side effect. This
piece is the direct evidence for the site's actual thesis, so it belongs in
the lead slot, not the archive.

**Trade-offs / decisions made:** Did not add the new article to any
`/start-here` reading path. Those paths are hand-curated by topic, and
forcing this piece into "strategy," "scaling," or "team culture" would have
been a worse fit than leaving it discoverable through the homepage, the
Blog archive, and its own topic pillar. Updated the three tests that
hardcoded article counts (`toHaveLength(1)`, `toHaveLength(3)`, an exact
`getArticleBySlug` equality against the old featured article) rather than
loosen them - they were asserting real facts about the content boundary,
just facts that were about to become stale, not facts that were wrong to
assert in the first place.

**Open questions / next steps:** Noticed but didn't fix: `.prose` in
`globals.css` styles `h2` but not `h3`, so both articles' "Your next step"
closing line renders with no heading emphasis at all. Small, pre-existing,
affects both articles equally - worth a follow-up pass, not urgent enough
to scope-creep into this session. Cloudflare Pages and the remaining three
article bodies are still the open items after that.

## CI on Node 20 finally caught up with reality

**What I worked on:** A GitHub Actions warning surfaced by an actual CI run
- Node 20 is deprecated as the actions runtime, forcing `actions/checkout@v4`
and `actions/setup-node@v4` onto Node 24 anyway - plus the README still
saying "Deployment and CI: TBD" from before either existed.

**What the agent did:** Confirmed Node 20 is now fully outside its support
window (Node 24 is Active LTS, Node 22 is Maintenance) rather than assuming
the warning was cosmetic. Bumped both actions to `@v5` (their Node
24-runtime major) and the workflow's own `node-version` to 24, then bumped
`@types/node` to match so the type layer isn't checking against a runtime
the project no longer targets. Rewrote the README's Stack, Project
structure, Getting started, and Status sections, which had drifted well
past "TBD" - they still described placeholder `Button`/`Card` components
and "early scaffolding" long after CI, dark mode, and a real content
pipeline shipped.

**What I changed or overrode, and why:** The original Node 20 pin (see the
CI entry, several sessions back) existed because the newest Vitest release
conflicted with Node 20's typings. That constraint no longer applies once
the runtime moves to 24, but upgrading Vitest itself is a separate,
breaking change (`npm audit` flags it - moderate/high/critical advisories,
all in Vite/Vitest's dev-server and UI code, not anything exposed by this
static-export production build) - left it alone rather than bundling an
unplanned major bump into a CI-runtime fix. Worth its own pass.

**Trade-offs / decisions made:** Wrote the README's Status section in terms
of the content boundary mechanism ("articles with a verified body publish")
rather than a specific count, after catching myself about to write "one
article has a verified body" the same day a second one shipped - a stale
number is exactly the kind of thing that goes unnoticed until someone reads
the README next to the live site.

**Open questions / next steps:** The Vitest/Vite dev-tooling vulnerabilities
from `npm audit` are still open - worth a dedicated session to upgrade to
Vitest 5 and confirm the MDX transform and config still work, not folded
into unrelated work. Cloudflare Pages connection and the remaining article
bodies are still the standing priorities.

## Matching the live site's actual URL shape before cutover

**What I worked on:** Whether this rebuild keeps the same URLs as the live
poletto.dev, ahead of the domain cutover - the kind of check that's cheap
now and expensive after Google has indexed the wrong URLs.

**What the agent did:** Didn't answer from the diary's memory of what was
"ported over" - fetched the live site directly and diffed its actual URL
structure against this rebuild's. Top-level routes and all four article
slugs matched exactly. One real gap: every live URL is canonical with a
trailing slash (`/about/`, `/blog/slug/`), confirmed with a raw `curl -I`
showing a 307 from the non-slash form - and this rebuild's static export
was generating the opposite shape (`about.html`, no redirect at all,
because there's no server to issue one). Fixed it structurally rather than
noting it: set `trailingSlash: true`, which changes the export to
directory-plus-`index.html` output matching the live shape exactly, and
updated every hand-built URL that doesn't go through Next's `Link` (the
sitemap, the RSS feed, two JSON-LD `url`/`mainEntityOfPage` fields, and two
plain `<a href>` tags on the homepage that don't get Next's automatic
trailing-slash handling the way `Link` does) to match.

**What I changed or overrode, and why:** The `curl -I` check also showed
`Server: cloudflare` on the current live site, and the user separately
confirmed Namecheap is already pointed at Cloudflare's nameservers -
correcting my own earlier answer about the domain cutover, which had
hedged on "if DNS is elsewhere, you'd need to migrate nameservers." It
isn't elsewhere. The custom-domain step should be closer to zero-friction
than I'd first described.

**Trade-offs / decisions made:** Fixed the two plain `<a href>` tags on the
homepage by adding the trailing slash directly rather than converting them
to `Link`. Matching the URL shape didn't require touching why they're plain
anchors in the first place - not worth a speculative claim here about a
choice the diary doesn't actually record a reason for.

**Open questions / next steps:** Standing items unchanged: Cloudflare Pages
connection (now confirmed lower-friction than earlier assumed), the
remaining three article bodies, and the deferred Vitest 5 upgrade.

## The Cloudflare project defaulted to the wrong build path

**What I worked on:** The first real Cloudflare deploy attempt, which
failed - `npx opennextjs-cloudflare build` erroring on a missing
`.next/standalone/.next/server/pages-manifest.json`.

**What the agent did:** Traced it from the actual build log rather than
guessing: the Cloudflare project is a **Workers** project (not classic
Pages - the giveaway was a "Deploy command: npx wrangler deploy" field, not
a framework-preset dropdown), and Wrangler's auto-config silently defaults
an undeclared Next.js repo to the OpenNext/Workers adapter, which needs a
full server build. This repo's `output: "export"` never produces that
server build, hence the `ENOENT`. Confirmed the fix by reproducing it
locally instead of pushing and hoping: added `wrangler.jsonc` declaring an
assets-only Worker pointing at `./out`, ran `wrangler deploy --dry-run`
(read the 114 built files, no OpenNext banner, no error), then `wrangler
dev` against it directly and re-ran the exact checks that matter -
homepage 200, `/rss.xml` still carrying the `application/rss+xml` header
from `_headers`, and an unverified article slug still returning a real 404
with the styled 404 page, not Workers Static Assets' default empty-body
404.

**What I changed or overrode, and why:** Set `assets.not_found_handling`
to `"404-page"` explicitly rather than leaving it at its default (`"none"`,
a null-body 404). The status code alone would have satisfied the existing
Playwright assertion; the page content wouldn't have, and silently serving
an empty body instead of the actual 404 page would have been a real
regression nobody would notice from a green test.

**Trade-offs / decisions made:** Installed `wrangler` as a devDependency
instead of relying only on Cloudflare's build-time `npx wrangler` fetch, so
`wrangler dev`/`--dry-run` are available locally to verify a Cloudflare
config change before pushing it - the same reasoning as testing the static
export against a real static server rather than trusting `next build`'s
output description.

**Open questions / next steps:** Waiting on the user to retrigger the
Cloudflare deployment with this config in place. If the project's linked
Worker name doesn't exactly match `poletto-dev-rebuild`, `wrangler deploy`
may target a different/new Worker instead of the one already connected to
this git integration - worth confirming the deployed URL actually updates
before treating this as resolved.

## Live

**What I worked on:** Nothing to build - just closing the loop on the
standing "get Cloudflare Pages connected" item that's been in every recent
entry's next-steps.

**What happened:** The `wrangler.jsonc` static-assets fix deployed clean,
and the user pointed the Worker's custom domain at `poletto.dev`. DNS is
propagating (up to ~24h on this setup, per the earlier Namecheap-custom-DNS
check). The rebuild has a real, live URL for the first time.

**Open questions / next steps:** Once DNS has actually flipped, worth
confirming end to end rather than assuming the local `wrangler dev` checks
generalize: the real trailing-slash redirect behavior on the actual domain,
the RSS content-type header over the real path, and that the old site
isn't still being served from a cached edge somewhere. Standing items otherwise unchanged: the remaining three article bodies
(still blocked on finding a verifiable source - see the earlier "Single
source of truth" entry) and the deferred Vitest 5 upgrade from `npm audit`.

## The source repository wasn't gone, it was private

**What I worked on:** The three remaining unverified article bodies,
revisited after the user confirmed the live site's DNS check independently
and asked to pick this up next.

**What the agent did:** Previous sessions' raw GitHub fetches (tree API,
repo page) had been returning 404 against `polettoweb/leadingbytes` and
that was read as the repo being unreachable. It wasn't unreachable, it was
private - `gh api`, authenticated, resolved it immediately and listed the
full `src/content/blog/` tree, including all three missing slugs. The user
then pointed out a local clone already existed at `~/leadingbytes`; a
`diff` against the `gh api`-fetched copies confirmed both sources agreed
byte-for-byte, so the local clone was used directly. Read the one existing
migrated article's source-to-site diff
(`engineering-strategy-is-mostly-saying-no`) to reverse-engineer the actual
migration convention before writing anything: frontmatter stripped (title
/ date / tags now live in `articles.ts`), internal links to other
leadingbytes posts that don't exist on this site dropped along with their
sentences rather than de-linked in place, em dashes rendered as spaced
hyphens, and the whole piece condensed to roughly 40-45% of source length
while keeping section headers, the closing "Your next step" beat, and the
density of bolded/italicized emphasis. Applied the same treatment to the
three remaining pieces, wired them into `contentBySlug` and the metadata
array in `articles.ts`, and updated the two tests that had the old
2-verified-articles count hardcoded rather than derived.

**What I changed or overrode, and why:** Asked the user up front whether to
match the existing condensed editorial treatment, do a lighter literal
migration, or hand the raw content off for them to edit - condensing
without checking would have meant silently rewriting the user's own prose
under their byline. They picked the condensed match. Confirmed via `next
build` and a grep of the built HTML/RSS/sitemap output, not just green
tests, that all five articles render, feed, and index correctly - the same
"verify the receipt, not the claim" standard the case-study article on this
site describes.

**Trade-offs / decisions made:** Left
`the-agent-wrote-the-code-leading-it-was-the-job.mdx` untouched even though
it narrates the now-resolved "three articles stuck as Coming soon" episode
in the present-reading tense - it's phrased as a retrospective of the
build ("sat as Coming soon for the entire build"), which stays accurate as
history rather than a live status claim, so editing it would have been
revising the user's own past narrative rather than fixing a stale fact.
Did update the README's Status line, which *was* a live claim and had gone
stale the moment the fifth article shipped.

**Open questions / next steps:** The content boundary mechanism
(`hasContent`, the dynamic route's real 404, the "Coming soon" card state)
is now fully unexercised with all five articles verified - worth keeping
in mind that it's currently untested by real data if a sixth article is
ever added mid-draft. The deferred Vitest 5 upgrade from `npm audit` is the
last standing item.

## The other seventeen

**What I worked on:** The user pointed out that `articles.ts` only ever
had 5 entries - the other 17 posts on the old leadingbytes blog had no
footprint in this rebuild at all, not even an unverified stub. Asked to
bring all of them over.

**What the agent did:** Read all 17 source files in full before writing
anything. They split cleanly into two groups: about ten matched the sharp,
opinionated voice of the articles already on this site closely enough to
condense using the same treatment as before, while the rest were visibly
from a different era or template - generic "Introduction"/"Conclusion"
listicles, footnote-citation apparatus with no rendering support in this
site's plain `@next/mdx` config, ASCII-art diagrams, task-list checkboxes,
ten years of "As an engineering manager, you have many responsibilities"
filler. Rewrote those more heavily rather than lightly condensing them,
to bring them up to the same bar rather than visibly clash with it -
stripped the footnotes to inline mentions, converted the ASCII diagram to
prose, flattened checklists to bullet lists, and added a closing "Your
next step" to every piece that lacked the site's now-consistent CTA
convention. Also discovered, mid-read, that three of the 17 were marked
`draft: true` on the source and filtered out of the old site's own build -
never actually published. Flagged this before writing anything for them,
rather than assuming; the user chose to include all three anyway.

Cross-referenced every `/blog/...` link across all 21 leadingbytes source
articles before writing: with this batch landing, every internal link in
the corpus now has a real target on this site, where earlier sessions had
been forced to drop them because the target didn't exist yet. Went back
and restored the dropped links in the four already-published articles
(`what-changes-when-you-start-managing-managers`,
`ai-is-breaking-the-junior-engineer-pipeline`,
`signs-you-promoted-the-wrong-person-into-management`,
`engineering-strategy-is-mostly-saying-no`) rather than leaving them
one-directionally linked from only the new pieces.

**What I changed or overrode, and why:** Two of the three Playwright tests
and one assertion had been written against "an unverified article exists"
as their negative case (`what-changes-when-you-start-managing-managers`
returns 404, is absent from RSS/sitemap) - true when they were written,
false the moment this session made every article verified. Rewrote the
404 test against a slug that will never exist rather than a real article,
so it stops being coupled to which articles happen to be in a draft state
today. Dropped the negative RSS/sitemap assertions rather than replacing
them with a tautological check against a fake title - a passing assertion
that isn't actually exercising anything is worse than no assertion, because
it looks like coverage. The real "only verified articles render" guarantee
is still covered at the right layer, by the `articles.test.ts` /
`publishing.test.ts` unit tests that check `hasContent` derivation
directly, independent of which slugs currently happen to be verified.

**Trade-offs / decisions made:** Did not touch `topics.ts` or the
`start-here` curated reading path. Both are hand-picked editorial lists,
not registries that auto-include every article, and "port the content"
didn't imply "rewrite the site's curation" - surfaced this as an open
question rather than silently leaving 17 articles absent from both, or
silently assigning them to topics on my own judgment.

**Open questions / next steps:** `topics.ts` and `start-here/page.tsx`
are still curated around the original 5 articles; worth a deliberate pass
if the user wants the other 17 folded into that information architecture.
The content boundary mechanism is now exercised by 22 real articles
instead of 5, but still has zero real unverified examples to test against
if a future draft article is added mid-write. Standing item unchanged:
the deferred Vitest 5 upgrade from `npm audit`.

## Replacing the default Next.js favicon

**What I worked on:** The user pointed out the site was still serving
Next.js's default favicon (the generic scaffolding icon), which read as
unfinished next to everything else that had shipped.

**What the agent did:** Checked the actual palette in `globals.css` rather
than picking arbitrary brand colours - the site already has a considered
warm-sepia identity (`--foreground: #1f2924` ink / `--background: #f8f6f0`
paper in light mode, inverted warm tones in dark) that a new mark needed to
sit inside rather than compete with. Drafted two monogram concepts - a
single "P" and an "MP" - and, before writing any of it into the codebase,
rendered both through the *actual* failure mode that matters for a favicon:
16x16px, the real size a browser tab renders at. "MP" collapsed into an
unreadable smear at that size; "P" stayed crisp. Showed both renders and
asked the user to pick a direction rather than assuming - they chose the
single "P," used consistently for both the favicon and an in-page mark.

Built the favicon set properly rather than dropping in one PNG: `icon.svg`
as the primary vector source, `icon.png` (512) and `apple-icon.png` (180)
rasterised from it via `sharp` (already resolvable in `node_modules`,
pulled in transitively - no new dependency needed there), and a real
multi-resolution `favicon.ico` (16/32/48) built with `png-to-ico`, since
browsers still request `/favicon.ico` directly regardless of the `<link>`
tags Next generates from the file-based icon convention. Confirmed via the
actual build output - not just that the files existed, but that
`out/favicon.ico` reported as a genuine 3-image ICO container and that
`out/index.html`'s `<head>` carried all four correctly-sized `<link>` tags.

Also built a small `Logo` component for the header, reusing the same mark
but with `fill="var(--foreground)"` / `var(--background)` instead of fixed
hex values, so it inverts automatically with the site's existing dark-mode
mechanism instead of needing its own theme logic. Verified this actually
worked - not just that the CSS should cascade correctly - by spinning up
the static build under `serve`, driving it with a throwaway Playwright
script, and screenshotting the header in both themes. First attempt showed
the badge colours flipping but the page background not yet transitioned;
the CSS `transition: background-color 200ms ease` on `body` meant the
screenshot taken immediately after toggling `data-theme` was mid-transition.
Added a short wait rather than assuming the first render was correct.

**What I changed or overrode, and why:** Kept the favicon's colours fixed
(dark ink badge, cream "P") rather than theme-aware, unlike the header
logo - a favicon lives in browser chrome, not the page, so it never sees
the site's dark-mode toggle at all; making it "theme-aware" would have
meant guessing at OS-level dark mode via a `prefers-color-scheme` media
query embedded in the SVG, which has inconsistent browser support for
favicons specifically and wasn't worth the fragility for an asset that
already reads fine as a fixed dark badge against either light or dark tab
chrome.

**Trade-offs / decisions made:** Didn't touch the OG image or any other
brand surface - the ask was specifically the favicon (and, once a mark
existed, the natural companion header logo), not a full brand refresh.

**Open questions / next steps:** Nothing new blocking. Standing items
unchanged: `topics.ts`/`start-here` curation for the 17 newly-migrated
articles, and the deferred Vitest 5 upgrade.

## Folding the 17 into topics and start-here

**What I worked on:** The standing item from the last two sessions -
`topics.ts` and `start-here/page.tsx` were still curated around the
original 5 articles, so most of what's actually live was invisible from
both discovery surfaces.

**What the agent did:** While reading `start-here/page.tsx` to plan the
curation, noticed its article links used a plain `<a href={...}>` instead
of `next/link`, with no trailing slash - the exact bug class an earlier
session had already found and fixed on the homepage's two stray anchors,
just missed here because this page didn't exist yet at the time. Grepped
every hand-built `/blog/` URL across the codebase rather than trusting
that one file was the only offender, and found the same bug on
`topics/page.tsx` too. Confirmed both were live breakage, not theoretical:
built the site and checked the actual output HTML - both pages emitted
`href="/blog/slug"` with no trailing slash, which 404s against the
Workers static-assets deploy (exact-path serving, no redirect middleware
the way `next dev` provides). Fixed both by switching to `Link`, matching
the pattern `ArticleCard` already used correctly.

For the curation itself, read all 22 articles' tags and actual content
rather than mechanically sorting by the `tags` array, and found a cluster
that didn't fit any of the 4 existing topics: pieces about the reader's
own career trajectory (the Netherlands IC/management piece, the reading
list, the two weaker legacy drafts, the leap-into-management piece) as
opposed to the existing topics' focus on leading *other people*. Added a
fifth topic, "Career & Growth," rather than force-fitting those into
"People & Team Culture." Cross-checked the result: every one of the 22
articles appears in at least one topic's `articleSlugs` (grepped the built
`/topics/` output for exactly 22 unique article hrefs), several
deliberately in two, matching how the original 4 topics already let an
article belong to more than one theme.

Kept `start-here` deliberately un-exhaustive rather than mirroring the
full topic list - it's framed as "a fast way in," and stuffing all 22
entries into it would undercut the thing that makes it different from
`/blog` or `/topics`. Added two new paths ("Leading through the AI shift,"
"Your own career, not just your team's") and extended the three existing
ones with 2-3 curated additions each, capping every path at three
articles.

Also caught that `topics/page.tsx`'s intro paragraph hardcoded "Four
themes shape the work..." - stale the moment a fifth topic existed.
Rewrote it to name the themes rather than count them, the same fix
pattern used on the README's status line two sessions ago, for the same
reason: a stale count is invisible until someone reads the copy next to
the actual page.

Screenshotted both pages against the real static build (not `next dev`)
to check the denser topic sections - particularly "People & Team Culture"
at 9 articles - didn't visually break under the added volume before
calling it done.

**What I changed or overrode, and why:** Nothing beyond the two `<a>` to
`Link` conversions and the stale copy - both were bugs surfaced while
doing the requested task, not scope creep, and both were live breakage on
the production site.

**Trade-offs / decisions made:** Left several articles in two topics
(`how-i-grow-an-engineer-into-a-manager` and
`what-i-look-for-when-hiring-and-growing-engineering-managers` both sit in
"People & Team Culture" and "Career & Growth") rather than forcing a
single home for pieces that genuinely span both the leader's practice and
the individual's career arc.

**Open questions / next steps:** Standing item unchanged: the deferred
Vitest 5 upgrade from `npm audit`. Nothing else currently blocking.

## Closing out the Vitest 5 upgrade

**What I worked on:** The last standing item from `npm audit`, deferred
across several sessions rather than bundled into unrelated fixes.

**What the agent did:** Ran `npm audit` fresh rather than trusting the
old finding was still accurate - it had grown to 8 vulnerabilities, only
some of which were actually the Vitest/Vite/esbuild chain. A `sharp`
vulnerability nested under `miniflare`/`wrangler` was unrelated and fixed
cleanly with a plain `npm audit fix` first, isolating the real Vitest
upgrade to just the pieces that needed a major bump. Bumping the
`vitest` version in `package.json` and running `npm install` hit an
ERESOLVE conflict - npm reported a peer conflict against `vite@8.3.0`
that didn't actually exist anywhere in `node_modules` yet, which pointed
at a stale incremental-resolution problem rather than a genuine
dependency clash (confirmed by checking `npm ls vite`: only one real
`vite@5.4.21` was installed, nothing conflicting). Rather than reaching
for `--legacy-peer-deps` to paper over a resolution npm itself flagged as
suspect, deleted `node_modules` and `package-lock.json` and did a full
clean install so npm solved the whole tree fresh against the new
`vitest@^5.0.1` requirement.

Confirmed the specific thing this upgrade had been deferred over -
whether the MDX transform in `vitest.config.mts` still works under
Vitest 5's new Vite version - by actually running the suite rather than
assuming a clean install implies a working one: `articles.test.ts` and
`publishing.test.ts` both import `articles.ts`, which transitively pulls
in `.mdx` files through the `@mdx-js/rollup` plugin, and both passed.
Followed with the full regression sweep this project always runs before
calling a dependency change done - lint, `next build`, and the Playwright
suite - rather than treating passing unit tests as sufficient signal for
a build-tool upgrade.

**What I changed or overrode, and why:** Nothing beyond the dependency
bump itself.

**Trade-offs / decisions made:** Chose a full clean reinstall over trying
to hand-resolve the ERESOLVE conflict, since this is a dev-only tooling
change with no production runtime dependencies affected - the blast
radius of "get this wrong" was low, and a clean install is the more
legible fix to hand back to future-me than a partially-patched lockfile.

**Open questions / next steps:** `npm audit` now reports 0 vulnerabilities.
No standing items left from recent sessions.

## Adding a real social preview image

**What I worked on:** No standing item this time - asked directly what to
do next, and recommended (over an accessibility/perf audit) a proper
Open Graph image, since sharing any article right now falls back to
whatever LinkedIn/Slack/Twitter default to with no `og:image` at all.

**What the agent did:** Built two `next/og` `ImageResponse` routes rather
than one static image: `src/app/opengraph-image.tsx` as the site-wide
default, and `src/app/blog/[slug]/opengraph-image.tsx` so every article
gets its own image carrying its actual title, read time, and date -
matching `generateStaticParams` against the same `getPublishedArticles()`
the page route already uses, so the two stay in lockstep by construction
rather than by convention. Reused the same "P" badge mark and warm-paper
palette from the favicon/logo session rather than inventing new brand
colours. Titles vary a lot in length across 22 articles (from ~25 to over
90 characters), so added a simple length-based font-size step rather than
picking one size and hoping - checked it against both a short title and
the single longest one in the set (the Netherlands piece) to confirm
neither looked cramped nor wasted the canvas.

Hit a static-export-specific build error first
(`export const dynamic = "force-static"` required on image routes under
`output: "export"`) and fixed it directly rather than searching for a
workaround. After a clean build, noticed the generated files were named
literally `opengraph-image` with no extension, and - having just spent a
session on Cloudflare deploy specifics - didn't assume that was harmless.
Checked with `wrangler dev` (not `next dev`, not the `serve`-based e2e
harness) and confirmed the real Workers static-assets runtime served them
with no `Content-Type` header at all, which is exactly the class of thing
that silently breaks social-card rendering on strict crawlers (Twitter/X
in particular). Added `_headers` rules for both the root and per-article
image paths, forcing `image/png`, matching the project's existing pattern
for the RSS feed's content-type. Re-verified with `wrangler dev` again
rather than trusting the fix on the first attempt - confirmed `Content-Type:
image/png` on both the default and a per-article image before moving on.

While verifying, discovered the project's Playwright e2e suite (which
runs against `serve`, not `wrangler dev`) can't actually exercise this
class of bug at all - `serve` doesn't read `public/_headers`, and its
built-in mime-type table happens to get `.xml` right by coincidence of
extension, which had been silently making the existing RSS content-type
e2e test look like it was testing the Cloudflare-specific header
behaviour when it wasn't. Didn't bolt a misleading test onto that harness
for the new image routes - flagging the gap here instead of pretending to
close it with a test that wouldn't actually catch a regression.

Also upgraded `twitter.card` in the root layout from `"summary"` to
`"summary_large_image"` - the small-thumbnail card type doesn't show the
image prominently, which would have made the whole image undercut itself
on the one platform most likely to actually render it.

**What I changed or overrode, and why:** Nothing beyond what the task
needed.

**Trade-offs / decisions made:** Used Satori's default bundled font
rather than loading Geist's font files into the `ImageResponse` call -
matching the exact site typeface in the OG image would have meant
fetching or bundling raw font binaries (Next's font loader doesn't expose
them in a form `ImageResponse` can consume directly), and the default
sans renders cleanly enough that the added fragility (a build-time font
fetch, or a new binary asset to maintain) wasn't worth it for an asset
most people see for a second in a link preview, not read closely.

**Open questions / next steps:** The Playwright e2e suite has no coverage
for Cloudflare-specific `_headers` behaviour (RSS's existing "content-type"
test was inadvertently not testing what it looked like it was testing,
and neither would a naive test for the new image routes) - worth a
dedicated session if this class of bug becomes a recurring problem,
switching that suite to run against `wrangler dev` instead of `serve`.
Not blocking today. Nothing else outstanding.

## An accessibility/performance audit that found a real SEO bug instead

**What I worked on:** The audit recommended two sessions ago and deferred
in favour of content/discovery work - verifying the README's accessibility
and performance claims with real tooling instead of assuming they held.

**What the agent did:** Tried the `cloudflare:web-perf` skill first, which
needs a `chrome-devtools` MCP server this session doesn't have configured.
Rather than stop and wait on a config change, fell back to the Lighthouse
CLI directly - pointed `CHROME_PATH` at the Chromium binary Playwright had
already cached locally, so no new install was needed. Audited the live
production site (not a local dev server) on both the homepage and a
representative article page, since MDX-rendered prose is a meaningfully
different DOM shape than the homepage's card grid.

Performance, accessibility, and best-practices all came back 100/100 on
both pages - genuinely excellent, and said so rather than manufacturing
findings to justify the session. SEO was 100 on the homepage but 92 on
the article page. Didn't stop at the score: pulled the specific failing
audit (`canonical`), then checked the actual served HTML with `curl`
rather than trusting Lighthouse's summary. Found something worse than the
one page it flagged: the article page's `<link rel="canonical">` pointed
at `https://poletto.dev/` - the homepage - not itself. Checked the other
six non-home routes (`/about/`, `/contact/`, `/blog/`, etc.) the same way
and found every single one had the identical bug: the root layout sets a
blanket `alternates: { canonical: "/" }` that every child page silently
inherits unless it overrides `alternates` itself, and none of the seven
page-level metadata exports did. Lighthouse only samples one URL per run,
so it had no way to reveal this was site-wide - that took checking the
actual pattern in the codebase, not just the one flagged page.

Fixed all seven - the six static pages plus the dynamic `blog/[slug]`
route, which now builds its canonical from the article's own slug. Verified
against the full 22-article build output with a loop comparing each
page's actual canonical against its expected URL, not just a couple of
spot checks, since the bug's root cause (metadata inheritance) meant every
article was equally exposed. Added a Playwright test asserting a sample of
routes declare their own canonical rather than the homepage's, since this
is exactly the kind of bug that's invisible in a single-file diff (each
page's metadata block looks completely fine in isolation) and would
silently recur the next time someone adds a page and forgets the
`alternates` field.

**What I changed or overrode, and why:** Nothing beyond the canonical fix
and its regression test - the audit's other findings (a few KiB of legacy
JS, unused JS, cache headers) were true but negligible on a page already
loading in well under a second, so left them alone rather than chasing
near-zero-impact changes for their own sake.

**Trade-offs / decisions made:** Used the Lighthouse CLI against the
Playwright-cached Chromium instead of asking the user to configure the
`chrome-devtools` MCP server - got an equivalent result (Core Web Vitals,
accessibility, SEO scoring) without a round-trip on tooling setup for a
one-off audit.

**Open questions / next steps:** Nothing new outstanding. The Playwright
`serve`-vs-`wrangler dev` coverage gap from last session still stands as
a known, non-blocking gap.

## The first genuinely new article, and a second metadata bug it uncovered

**What I worked on:** The user's first request for original content rather
than migrated content - a piece on remote/hybrid team bonding, prompted
by asking what to work on next and them suggesting "a new article."

**What the agent did:** Didn't draft this the way the 17 migrated articles
were handled. Those were condensing the user's own pre-existing writing;
this had no source at all, and the site's established voice writes in
first person with specific claimed experience ("I've made this mistake,"
"one of my previous teams"). Fabricating that under the user's byline
would have directly contradicted the standing you-must-not-invent-things
principle the site's own case-study article describes as a value, not a
nice-to-have. Asked for the topic and the real experience behind it before
writing anything, got back three concrete, specific practices (a pixel-art
virtual office tool, a Google Maps location-guessing game, quarterly
in-person activities), and drafted the piece around exactly those rather
than padding with invented ones. Posted the full draft in conversation for
approval before touching the codebase - this piece needed sign-off in a
way the migrated ones didn't, since there was no source to defer to for
"is this accurate."

The user asked to dig up the actual name of the pixel-art tool they
couldn't remember. Rather than guess and assert it, searched, found Gather
was overwhelmingly the dominant match for "pixel-art retro virtual office,
walk up to someone to start a call," and brought that back as a proposal
with sources - not a fact - for the user to confirm before it went in
under their name. They confirmed it.

Wired the finished piece in following the same registry pattern as every
other article (import, `contentBySlug` entry, dated metadata slotted in by
actual chronological position, not appended to the end), and added it to
the one existing topic it genuinely fits rather than leaving it undiscoverable
from `/topics` - continuing the "every article belongs somewhere" standard
set two sessions ago rather than treating that as one-time cleanup work.

While checking the built output for the new article - specifically the
JSON-LD and og:image tags, standard verification at this point - noticed
`og:title` and `og:description` were still the generic site-wide values
even though `og:image` was correctly per-article. Checked whether this was
specific to the new page or systemic, the same way the canonical bug was
checked two sessions ago: grepped an existing, previously-published
article's built HTML rather than assuming. It was systemic and predates
this session entirely - every one of the (now 23) article pages, plus all
six static pages, had been serving the homepage's generic Open Graph
title, description, and url since the OG image feature shipped, because
adding the per-route `opengraph-image.tsx` file only wired the image; it
never touched the `openGraph`/`twitter` metadata objects, which every page
was silently inheriting unchanged from the root layout. Fixed all seven
page-level metadata exports (six static pages plus the dynamic
`blog/[slug]` route) the same way the canonical fix worked: each page now
sets its own `openGraph.title`/`description`/`url` and `twitter.title`/
`description`, relying on Next's documented shallow-merge behaviour for
those two objects to keep inheriting `type`/`siteName`/`card` from the
root rather than needing to repeat them. Also set `openGraph.type:
"article"` on the blog route specifically, since that's the correct,
standard Open Graph type for content pages and the site had been using
the generic `"website"` type for every article. Verified against the full
built output for all 23 articles with a loop, not a couple of spot checks,
given the root cause was structural and every article was equally
exposed. Added a Playwright regression test alongside the canonical one,
for the same reason: this bug is invisible in any single page's diff.

**What I changed or overrode, and why:** Nothing beyond the article itself
and the metadata fix it led to discovering.

**Trade-offs / decisions made:** Removed em dashes from the article on
request even though earlier condensed-migration articles also use them
sparingly in a couple of spots reviewers might notice as inconsistent -
this piece is originally-authored rather than adapted, so it's reasonable
for the user to hold it to a stricter version of the site's own style
preference than pieces adapted from an external source.

**Open questions / next steps:** Nothing new outstanding. The Playwright
`serve`-vs-`wrangler dev` coverage gap remains a known, non-blocking item.

<!--
Next entry template — copy this below the divider for each new session:

## <short title>

**What I worked on:**

**What the agent did:**

**What I changed or overrode, and why:**

**Trade-offs / decisions made:**

**Open questions / next steps:**

-->
