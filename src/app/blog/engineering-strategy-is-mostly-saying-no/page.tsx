import type { Metadata } from "next";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageContainer } from "@/components/layout/PageContainer";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { getArticleBySlug } from "@/content/articles";
import { NewsletterSignup } from "@/components/ui/NewsletterSignup";
import { TopicTag } from "@/components/ui/TopicTag";

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
              <p>
                Show me an engineering strategy and I can usually tell in thirty
                seconds whether it&apos;s real. I don&apos;t look at what&apos;s on it. I look
                at what&apos;s been deliberately left off.
              </p>
              <p>
                Because a strategy that says yes to everything isn&apos;t a strategy.
                It&apos;s a to-do list with ambitions. Real strategy is subtraction.
                It lives in the no&apos;s.
              </p>

              <h2>A strategy with no “not now” isn&apos;t a strategy</h2>
              <p>
                Open your roadmap and look for the section that says what you are
                deliberately not doing this quarter, and why. Not the icebox where
                good ideas go to be quietly forgotten - an explicit, defended list
                of good things you are choosing not to pursue.
              </p>
              <p>
                If it isn&apos;t there, you don&apos;t have a strategy. You have a backlog
                wearing a strategy&apos;s clothes. When everything is a priority,
                nothing is.
              </p>

              <h2>Saying no is a senior skill because the things you say no to are good</h2>
              <p>
                Junior prioritisation is easy: you cut the bad ideas. Anyone can
                say no to a bad idea. The senior, genuinely hard version is saying
                no to good ideas because you can&apos;t do them well right now without
                starving the two things that matter more.
              </p>

              <h2>The hardest no points upward</h2>
              <p>
                Saying no to your own team is uncomfortable. Saying no to the
                business is where most engineering leaders fold. “Yes, we can do
                X - and here&apos;s what we&apos;d stop or delay to make room, and here&apos;s
                what that costs” reframes the conversation as a shared trade.
              </p>

              <h2>How to say no well</h2>
              <ul>
                <li>Say no to the thing, yes to the goal.</li>
                <li>Make the trade visible.</li>
                <li>Say it fast and clearly.</li>
                <li>Write the anti-roadmap.</li>
                <li>Defend the no once it&apos;s made.</li>
              </ul>

              <h2>The payoff</h2>
              <p>
                A team that hears a clear, well-reasoned no learns to trust your
                yes. When every request gets waved through, a yes means nothing.
                Focus is permission to do a few things excellently instead of many
                things adequately.
              </p>
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
