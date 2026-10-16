import Link from "next/link";

import { TopicTag } from "./TopicTag";
import type { Article } from "@/content/articles";
import { getPrimaryTopic } from "@/content/topics";
import { formatDate } from "@/lib/dates";

type ArticleProps = {
  article: Article;
};

function articleHref(article: Article) {
  return article.hasContent ? `/blog/${article.slug}` : undefined;
}

function ArticleMeta({ article, showDate = true }: ArticleProps & { showDate?: boolean }) {
  const topic = getPrimaryTopic(article.slug);

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-[var(--muted)]">
      {topic && <TopicTag>{topic.shortTitle}</TopicTag>}
      {showDate && <time dateTime={article.date}>{formatDate(article.date)}</time>}
      {showDate && <span aria-hidden="true">·</span>}
      <span>{article.readTime}</span>
    </div>
  );
}

// Whole-card click target: the title link's ::after stretches over the
// positioned card, so the card stays a single link for screen readers.
function TitleLink({ article }: ArticleProps) {
  const href = articleHref(article);

  return href ? (
    <Link href={href} className="after:absolute after:inset-0">
      {article.title}
    </Link>
  ) : (
    <>{article.title}</>
  );
}

export function FeaturedArticleCard({ article }: ArticleProps) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--tint)] p-8 transition-colors hover:border-[var(--accent)] sm:p-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-[var(--accent)] opacity-30"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full border border-[var(--accent)] opacity-30"
      />
      <p className="eyebrow">Featured</p>
      <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
        <TitleLink article={article} />
      </h2>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-pretty text-[var(--muted)]">
        {article.excerpt}
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <ArticleMeta article={article} />
        <span className="text-sm font-medium text-[var(--accent)] transition-transform group-hover:translate-x-1">
          {article.hasContent ? "Read article →" : "Coming soon"}
        </span>
      </div>
    </article>
  );
}

export function ArticleCard({ article }: ArticleProps) {
  return (
    <article className="group relative flex flex-col gap-4 border-t border-[var(--line)] pt-6">
      <ArticleMeta article={article} />
      <h3 className="text-2xl font-semibold leading-snug tracking-tight transition-colors group-hover:text-[var(--accent)]">
        <TitleLink article={article} />
      </h3>
      <p className="max-w-2xl text-pretty text-[var(--muted)]">{article.excerpt}</p>
      {!article.hasContent && <p className="text-sm text-[var(--muted)]">Coming soon</p>}
    </article>
  );
}

export function ArticleRow({ article }: ArticleProps) {
  return (
    <article className="group relative grid gap-3 border-t border-[var(--line)] py-8 sm:grid-cols-[9rem_1fr] sm:gap-8">
      <time
        dateTime={article.date}
        className="text-sm tabular-nums text-[var(--muted)] sm:pt-1.5"
      >
        {formatDate(article.date)}
      </time>
      <div className="flex flex-col gap-3">
        <h3 className="text-2xl font-semibold leading-snug tracking-tight transition-colors group-hover:text-[var(--accent)]">
          <TitleLink article={article} />
        </h3>
        <p className="max-w-2xl text-pretty text-[var(--muted)]">{article.excerpt}</p>
        <div className="mt-1">
          <ArticleMeta article={article} showDate={false} />
        </div>
        {!article.hasContent && <p className="text-sm text-[var(--muted)]">Coming soon</p>}
      </div>
    </article>
  );
}
