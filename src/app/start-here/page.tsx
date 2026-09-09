import type { Metadata } from "next";

import { PageContainer } from "@/components/layout/PageContainer";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { NewsletterSignup } from "@/components/ui/NewsletterSignup";
import { getArticleBySlug } from "@/content/articles";

export const metadata: Metadata = {
  title: "Start Here | Marco Poletto",
  description:
    "A curated reading path through writing on scaling engineering organisations and leading people through change.",
};

const paths = [
  {
    title: "Start with the big idea",
    blurb:
      "A practical argument for treating strategy as a discipline of deliberate trade-offs.",
    slugs: ["engineering-strategy-is-mostly-saying-no"],
  },
  {
    title: "Scaling and leading through change",
    blurb:
      "The identity shifts and organisational choices that arrive as your scope grows.",
    slugs: [
      "what-changes-when-you-start-managing-managers",
      "ai-is-breaking-the-junior-engineer-pipeline",
    ],
  },
  {
    title: "People and team culture",
    blurb: "The human signals behind healthy teams and sustainable leadership.",
    slugs: ["signs-you-promoted-the-wrong-person-into-management"],
  },
];

export default function StartHerePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageContainer className="py-16 sm:py-24">
          <header className="max-w-3xl">
            <p className="eyebrow">Start here</p>
            <h1 className="mt-5 text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl">
              A fast way into the ideas behind the writing.
            </h1>
            <p className="mt-7 text-xl leading-8 text-[var(--muted)] sm:text-2xl">
              I&apos;m Marco Poletto. I lead engineering across three product
              domains and org-wide delivery operations at Rentman, and I write
              about scaling engineering organisations without losing the people
              inside them.
            </p>
          </header>

          <div className="mt-16 flex flex-col gap-14">
            {paths.map((path) => (
              <section key={path.title} className="border-t border-[var(--line)] pt-8">
                <h2 className="text-3xl font-semibold tracking-tight">{path.title}</h2>
                <p className="mt-3 max-w-2xl text-[var(--muted)]">{path.blurb}</p>
                <ul className="mt-7 flex max-w-3xl flex-col gap-6">
                  {path.slugs.map((slug) => {
                    const article = getArticleBySlug(slug);

                    if (!article) {
                      return null;
                    }

                    return (
                      <li key={article.slug} className="border-l-2 border-[var(--line)] pl-5">
                        <a
                          href={`/blog/${article.slug}`}
                          className="text-xl font-semibold tracking-tight underline underline-offset-4"
                        >
                          {article.title}
                        </a>
                        <p className="mt-2 text-sm uppercase tracking-[0.12em] text-[var(--muted)]">
                          {article.readTime} · {article.date}
                        </p>
                        <p className="mt-2 max-w-2xl text-[var(--muted)]">{article.excerpt}</p>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </div>
        </PageContainer>

        <section className="border-y border-[var(--line)]">
          <PageContainer className="py-20 sm:py-24">
            <NewsletterSignup
              action="https://buttondown.com/api/emails/embed-subscribe/marcopoletto"
              heading="Keep in touch"
              description="New articles land every few weeks. Follow along for practical notes on scaling teams, delivery, and culture."
            />
          </PageContainer>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
