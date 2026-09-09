import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageContainer } from "@/components/layout/PageContainer";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { NewsletterSignup } from "@/components/ui/NewsletterSignup";
import { TopicTag } from "@/components/ui/TopicTag";

const topics = [
  { href: "/topics", label: "Scaling organisations" },
  { href: "/topics", label: "Delivery & metrics" },
  { href: "/topics", label: "Team culture" },
  { href: "/topics", label: "AI & change" },
];

const articles = [
  {
    href: "/blog/engineering-strategy-is-mostly-saying-no/",
    title: "Engineering Strategy Is Mostly Saying No",
    excerpt:
      "A strategy that says yes to everything is just a to-do list with ambitions. The core skill of a senior engineering leader isn't picking what to build - it's deciding, out loud, what you won't.",
    date: "2026-08-25",
    readTime: "6 min read",
    featured: true,
  },
  {
    href: "/blog/what-changes-when-you-start-managing-managers/",
    title: "What Changes When You Start Managing Managers",
    excerpt:
      "The skills that made you a great engineering manager quietly become liabilities the day you start leading other managers.",
    date: "2026-08-22",
    readTime: "7 min read",
  },
  {
    href: "/blog/ai-is-breaking-the-junior-engineer-pipeline/",
    title: "AI Is Quietly Breaking the Junior-Engineer Pipeline",
    excerpt:
      "Teams are hiring fewer juniors because AI does the grunt work now. But that grunt work was the apprenticeship.",
    date: "2026-08-18",
    readTime: "5 min read",
  },
  {
    href: "/blog/signs-you-promoted-the-wrong-person-into-management/",
    title: "The Signs You Promoted the Wrong Person Into Management",
    excerpt:
      "A struggling manager rarely announces it - the team does, quietly, months before it hits a dashboard.",
    date: "2026-07-29",
    readTime: "5 min read",
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageContainer className="py-20 sm:py-28">
          <div className="max-w-3xl">
            <p className="eyebrow">Engineering leadership, in practice</p>
            <h1 className="mt-5 max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl">
              Building teams that stay human as they scale.
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-8 text-[var(--muted)] sm:text-2xl">
              I&apos;m Marco Poletto, an engineering leader writing about org
              design, delivery, and the human side of technology.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-sm font-medium">
              <a href="/start-here" className="link-arrow">
                Start here →
              </a>
              <a href="/about" className="link-arrow">
                More about Marco →
              </a>
            </div>
          </div>
        </PageContainer>

        <section className="border-y border-[var(--line)] bg-[var(--accent)]">
          <PageContainer className="py-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="eyebrow">Topics</p>
              <div className="flex flex-wrap gap-x-5 gap-y-3">
                {topics.map((topic) => (
                  <TopicTag key={topic.label} href={topic.href}>
                    {topic.label}
                  </TopicTag>
                ))}
              </div>
            </div>
          </PageContainer>
        </section>

        <PageContainer className="py-20 sm:py-28">
          <div className="flex items-end justify-between gap-6 border-b border-[var(--line)] pb-5">
            <div>
              <p className="eyebrow">Latest thinking</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Articles for leaders building with people in mind.
              </h2>
            </div>
            <a href="/blog" className="link-arrow hidden shrink-0 text-sm sm:block">
              View all →
            </a>
          </div>
          <div className="mt-10 grid gap-12 md:grid-cols-2">
            {articles.map((article) => (
              <ArticleCard key={article.href} {...article} />
            ))}
          </div>
          <a href="/blog" className="link-arrow mt-10 inline-block text-sm sm:hidden">
            View all articles →
          </a>
        </PageContainer>

        <section className="border-y border-[var(--line)]">
          <PageContainer className="py-20 sm:py-24">
            <NewsletterSignup
              action="https://buttondown.com/api/emails/embed-subscribe/marcopoletto"
              description="Join other engineering leaders getting practical, field-tested reflections on org scaling, delivery, and team culture every 2-3 weeks."
            />
          </PageContainer>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
