import type { Metadata } from "next";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageContainer } from "@/components/layout/PageContainer";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { getArticleBySlug } from "@/content/articles";
import { NewsletterSignup } from "@/components/ui/NewsletterSignup";
import { TopicTag } from "@/components/ui/TopicTag";
import ArticleContent from "@/content/articles/engineering-strategy-is-mostly-saying-no.mdx";

export const metadata: Metadata = {
  title: "Engineering Strategy Is Mostly Saying No | Marco Poletto",
  description:
    "A strategy that says yes to everything is just a to-do list with ambitions.",
};

const article = getArticleBySlug("engineering-strategy-is-mostly-saying-no");

export default function EngineeringStrategyArticle() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageContainer className="py-16 sm:py-24">
          <article className="mx-auto max-w-3xl">
            <header>
              <p className="eyebrow">
                Article · {article?.date} · {article?.readTime}
              </p>
              <h1 className="mt-5 text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl">
                {article?.title}
              </h1>
              <p className="mt-7 max-w-2xl text-xl leading-8 text-[var(--muted)] sm:text-2xl">
                {article?.excerpt}
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                {article?.tags.map((topic) => (
                  <TopicTag key={topic} href="/topics">
                    {topic}
                  </TopicTag>
                ))}
              </div>
            </header>

            <div className="prose mt-16 max-w-none sm:mt-20">
              <ArticleContent />
            </div>
          </article>
        </PageContainer>

        <section className="border-y border-[var(--line)]">
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
