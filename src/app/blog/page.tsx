import type { Metadata } from "next";

import { PageContainer } from "@/components/layout/PageContainer";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { articles } from "@/content/articles";

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

          <section aria-label="Blog articles" className="mt-16 grid gap-12 md:grid-cols-2">
            {articles.map((article) => (
              <ArticleCard
                key={article.slug}
                href={article.hasContent ? `/blog/${article.slug}` : undefined}
                title={article.title}
                excerpt={article.excerpt}
                date={article.date}
                readTime={article.readTime}
                featured={article.featured}
              />
            ))}
          </section>
        </PageContainer>
      </main>
      <SiteFooter />
    </>
  );
}