import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { contentBySlug, getArticleBySlug, getPublishedArticles } from "@/content/articles";
import { PageContainer } from "@/components/layout/PageContainer";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { NewsletterSignup } from "@/components/ui/NewsletterSignup";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { TopicTag } from "@/components/ui/TopicTag";
import { getRelatedArticles } from "@/content/topics";
import { formatDate } from "@/lib/dates";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getPublishedArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {};
  }

  const canonicalPath = `/blog/${article.slug}/`;

  return {
    title: `${article.title} | Marco Poletto`,
    description: article.excerpt,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: canonicalPath,
      type: "article",
    },
    twitter: {
      // Restated because a page-level twitter object replaces the layout's
      // wholesale, which would otherwise drop the large-image card.
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  const Content = contentBySlug[slug];

  if (!article || !Content) {
    notFound();
  }

  const publishedDate = new Date(article.date).toISOString();

  return (
    <>
      <SiteHeader />
      <main>
        <PageContainer className="py-16 sm:py-24">
          <article className="mx-auto max-w-3xl">
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "Article",
                  headline: article.title,
                  description: article.excerpt,
                  datePublished: publishedDate,
                  author: {
                    "@type": "Person",
                    name: "Marco Poletto",
                    url: "https://poletto.dev/about/",
                  },
                  mainEntityOfPage: `https://poletto.dev/blog/${article.slug}/`,
                }),
              }}
            />
            <header>
              <p className="eyebrow">
                <time dateTime={article.date}>{formatDate(article.date)}</time> · {article.readTime}
              </p>
              <h1 className="mt-5 text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl">
                {article.title}
              </h1>
              <p className="mt-7 max-w-2xl text-xl leading-8 text-(--muted) sm:text-2xl">
                {article.excerpt}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {article.tags.map((topic) => (
                  <TopicTag key={topic} href="/topics">
                    {topic}
                  </TopicTag>
                ))}
              </div>
            </header>

            <div className="prose mt-16 max-w-none sm:mt-20">
              <Content />
            </div>
          </article>
        </PageContainer>

        <section aria-labelledby="read-next-heading" className="border-t border-(--line)">
          <PageContainer className="py-16 sm:py-20">
            <div className="flex items-end justify-between gap-6">
              <h2
                id="read-next-heading"
                className="text-3xl font-semibold tracking-tight sm:text-4xl"
              >
                Read next
              </h2>
              <Link href="/blog" className="link-arrow shrink-0 text-sm">
                All articles →
              </Link>
            </div>
            <div className="mt-10 grid gap-12 md:grid-cols-2">
              {getRelatedArticles(article.slug).map((related) => (
                <ArticleCard key={related.slug} article={related} />
              ))}
            </div>
          </PageContainer>
        </section>

        <section className="border-y border-(--line) bg-(--tint)">
          <PageContainer className="py-20 sm:py-24">
            <NewsletterSignup
              action="https://buttondown.com/api/emails/embed-subscribe/marcopoletto"
              heading="Enjoyed this article?"
              description="Subscribe to Leading Bytes for practical insights on org scaling, delivery operations, and engineering leadership."
            />
          </PageContainer>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}