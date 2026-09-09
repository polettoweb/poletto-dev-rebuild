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

<!--
Next entry template — copy this below the divider for each new session:

## <short title>

**What I worked on:**

**What the agent did:**

**What I changed or overrode, and why:**

**Trade-offs / decisions made:**

**Open questions / next steps:**

-->
