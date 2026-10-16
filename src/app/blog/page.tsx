import type { Metadata } from "next";

import { PageContainer } from "@/components/layout/PageContainer";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ArticleRow, FeaturedArticleCard } from "@/components/ui/ArticleCard";
import { articles, featuredArticle, type Article } from "@/content/articles";

export const metadata: Metadata = {
  title: "Blog | Marco Poletto",
  description:
    "Articles on engineering leadership, management, and sustainable teams.",
  alternates: {
    canonical: "/blog/",
  },
  openGraph: {
    title: "Blog | Marco Poletto",
    description:
      "Articles on engineering leadership, management, and sustainable teams.",
    url: "/blog/",
  },
  twitter: {
    title: "Blog | Marco Poletto",
    description:
      "Articles on engineering leadership, management, and sustainable teams.",
  },
};

// Newest first, grouped by year, with the featured article pulled out into
// its own hero so it isn't listed twice.
function articlesByYear(): [string, Article[]][] {
  const groups = new Map<string, Article[]>();
  const sorted = articles
    .filter((article) => article.slug !== featuredArticle.slug)
    .toSorted((a, b) => b.date.localeCompare(a.date));

  for (const article of sorted) {
    const year = article.date.slice(0, 4);
    groups.set(year, [...(groups.get(year) ?? []), article]);
  }

  return [...groups];
}

export default function BlogPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageContainer className="py-16 sm:py-24">
          <header className="max-w-3xl">
            <p className="eyebrow">The journal</p>
            <h1 className="mt-5 text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl">
              Articles on engineering leadership, management, and sustainable teams.
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-8 text-[var(--muted)]">
              A curated archive of writing on scaling engineering organisations,
              delivery, career transitions, and the human side of software engineering.
            </p>
          </header>

          <div className="mt-16">
            <FeaturedArticleCard article={featuredArticle} />
          </div>

          <div aria-label="Blog articles" role="region" className="mt-20 flex flex-col gap-16">
            {articlesByYear().map(([year, yearArticles]) => (
              <section key={year} aria-labelledby={`year-${year}`}>
                <div className="flex items-baseline justify-between gap-4 pb-4">
                  <h2
                    id={`year-${year}`}
                    className="text-4xl font-semibold tracking-tight text-[var(--muted)] sm:text-5xl"
                  >
                    {year}
                  </h2>
                  <p className="text-sm text-[var(--muted)]">
                    {yearArticles.length} {yearArticles.length === 1 ? "article" : "articles"}
                  </p>
                </div>
                {yearArticles.map((article) => (
                  <ArticleRow key={article.slug} article={article} />
                ))}
              </section>
            ))}
          </div>
        </PageContainer>
      </main>
      <SiteFooter />
    </>
  );
}