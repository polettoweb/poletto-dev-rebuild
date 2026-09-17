import type { Metadata } from "next";
import Link from "next/link";

import { PageContainer } from "@/components/layout/PageContainer";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { getArticlesForTopic, topics } from "@/content/topics";

export const metadata: Metadata = {
  title: "Topics | Marco Poletto",
  description:
    "The themes behind writing on scaling engineering organisations, delivery, team culture, and leading through change.",
  alternates: {
    canonical: "/topics/",
  },
  openGraph: {
    title: "Topics | Marco Poletto",
    description:
      "The themes behind writing on scaling engineering organisations, delivery, team culture, and leading through change.",
    url: "/topics/",
  },
  twitter: {
    title: "Topics | Marco Poletto",
    description:
      "The themes behind writing on scaling engineering organisations, delivery, team culture, and leading through change.",
  },
};

export default function TopicsPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageContainer className="py-16 sm:py-24">
          <header className="max-w-3xl">
            <p className="eyebrow">Content pillars & topics</p>
            <h1 className="mt-5 text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl">
              The themes behind the writing.
            </h1>
            <p className="mt-7 text-xl leading-8 text-[var(--muted)] sm:text-2xl">
              The themes that keep showing up: scaling organisations, making
              delivery predictable, keeping teams healthy while everything
              around them changes, leading through the AI shift, and
              navigating your own career alongside your team&apos;s.
            </p>
          </header>

          <div className="mt-16 flex flex-col gap-14">
            {topics.map((topic) => {
              const relatedArticles = getArticlesForTopic(topic);

              return (
                <section key={topic.slug} className="border-t border-[var(--line)] pt-8">
                  <h2 className="text-3xl font-semibold tracking-tight">{topic.title}</h2>
                  <p className="mt-3 max-w-2xl text-lg leading-8 text-[var(--muted)]">
                    {topic.description}
                  </p>
                  <div className="mt-7 border-t border-[var(--line)] pt-6">
                    <h3 className="eyebrow">Related articles</h3>
                    {relatedArticles.length > 0 ? (
                      <ul className="mt-4 flex flex-col gap-4">
                        {relatedArticles.map((article) => (
                          <li key={article.slug}>
                            {article.hasContent ? (
                              <Link
                                href={`/blog/${article.slug}`}
                                className="text-lg font-semibold underline underline-offset-4"
                              >
                                {article.title}
                              </Link>
                            ) : (
                              <span className="text-lg font-semibold">{article.title}</span>
                            )}
                            <span className="ml-3 text-sm text-[var(--muted)]">
                              {article.date}
                            </span>
                            {!article.hasContent && (
                              <span className="ml-3 text-sm text-[var(--muted)]">Coming soon</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-4 text-[var(--muted)]">
                        More articles in this category are on the way.
                      </p>
                    )}
                  </div>
                </section>
              );
            })}
          </div>
        </PageContainer>
      </main>
      <SiteFooter />
    </>
  );
}
