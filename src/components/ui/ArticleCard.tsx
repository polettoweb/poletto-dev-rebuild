import Link from "next/link";

type ArticleCardProps = {
  href: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  featured?: boolean;
};

export function ArticleCard({
  href,
  title,
  excerpt,
  date,
  readTime,
  featured = false,
}: ArticleCardProps) {
  return (
    <article className="flex flex-col gap-3">
      <p className="text-xs font-semibold uppercase tracking-[0.18em]">
        {featured ? "Featured article" : "Article"} · {readTime}
      </p>
      <h2 className="text-2xl font-semibold tracking-tight">
        <Link href={href}>{title}</Link>
      </h2>
      <p className="max-w-2xl text-pretty">{excerpt}</p>
      <div className="flex items-center gap-3 text-sm">
        <time dateTime={date}>{date}</time>
        <span aria-hidden="true">·</span>
        <Link href={href}>Read article →</Link>
      </div>
    </article>
  );
}
