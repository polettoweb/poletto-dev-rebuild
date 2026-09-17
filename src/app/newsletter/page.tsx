import type { Metadata } from "next";

import { PageContainer } from "@/components/layout/PageContainer";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { NewsletterSignup } from "@/components/ui/NewsletterSignup";

export const metadata: Metadata = {
  title: "Leading Bytes Newsletter | Marco Poletto",
  description:
    "Practical writing on scaling engineering organisations, delivery operations, and the human side of leadership.",
  alternates: {
    canonical: "/newsletter/",
  },
  openGraph: {
    title: "Leading Bytes Newsletter | Marco Poletto",
    description:
      "Practical writing on scaling engineering organisations, delivery operations, and the human side of leadership.",
    url: "/newsletter/",
  },
  twitter: {
    title: "Leading Bytes Newsletter | Marco Poletto",
    description:
      "Practical writing on scaling engineering organisations, delivery operations, and the human side of leadership.",
  },
};

const issueThemes = [
  {
    title: "Scaling engineering organisations",
    description:
      "Paying down management debt, designing teams for high autonomy, and navigating org growth.",
  },
  {
    title: "Delivery predictability without morale loss",
    description:
      "Pragmatic metrics, release management, and blameless post-mortem operational excellence.",
  },
  {
    title: "The human side of leadership",
    description:
      "Psychological safety, leading through executive fog, and growing engineers into managers.",
  },
  {
    title: "AI & modern change management",
    description:
      "Pragmatic adoption of AI tools while preserving engineering craft and team motivation.",
  },
];

export default function NewsletterPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageContainer className="py-16 sm:py-24">
          <header className="max-w-3xl">
            <p className="eyebrow">Leading Bytes newsletter</p>
            <h1 className="mt-5 text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl">
              Field notes on scaling teams, delivery systems, and org culture.
            </h1>
            <p className="mt-7 text-xl leading-8 text-[var(--muted)] sm:text-2xl">
              I publish a thoughtful dispatch every 2-3 weeks: real lessons and
              frameworks from scaling high-growth engineering organisations,
              without the corporate buzzwords.
            </p>
          </header>

          <section className="mt-16 max-w-3xl" aria-labelledby="themes-heading">
            <h2 id="themes-heading" className="text-3xl font-semibold tracking-tight">
              What you&apos;ll find in each issue
            </h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2">
              {issueThemes.map((theme) => (
                <li key={theme.title} className="border-t border-[var(--line)] pt-5">
                  <h3 className="text-lg font-semibold">{theme.title}</h3>
                  <p className="mt-2 text-[var(--muted)]">{theme.description}</p>
                </li>
              ))}
            </ul>
          </section>

          <blockquote className="mt-16 max-w-3xl border-l-2 border-[var(--foreground)] pl-6 text-2xl leading-9 sm:text-3xl">
            &ldquo;I write to share the frameworks, hard lessons, and systems that
            actually survive contact with reality in fast-scaling tech companies.&rdquo;
            <footer className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
              Marco Poletto
            </footer>
          </blockquote>
        </PageContainer>

        <section className="border-y border-[var(--line)]">
          <PageContainer className="py-20 sm:py-24">
            <NewsletterSignup
              action="https://buttondown.com/api/emails/embed-subscribe/marcopoletto"
              heading="Subscribe to the newsletter"
              description="Get full-length articles and leadership insights delivered when they ship. No spam. Unsubscribe anytime."
            />
          </PageContainer>
        </section>

        <PageContainer className="py-12">
          <p className="text-sm text-[var(--muted)]">
            Prefer a feed reader? <a href="/rss.xml" className="link-arrow">Follow the RSS feed →</a>
          </p>
        </PageContainer>
      </main>
      <SiteFooter />
    </>
  );
}
