import { ImageResponse } from "next/og";

import { getArticleBySlug, getPublishedArticles } from "@/content/articles";
import { getPrimaryTopic } from "@/content/topics";
import { loadOgFonts, OgCard, ogSize } from "@/lib/og";

export const dynamic = "force-static";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return getPublishedArticles().map((article) => ({ slug: article.slug }));
}

type ImageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Image({ params }: ImageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  const topic = article && getPrimaryTopic(article.slug);

  return new ImageResponse(
    (
      <OgCard
        eyebrow={topic ? `${topic.shortTitle} · ${article.readTime}` : "Engineering leadership"}
        title={article?.title ?? "Marco Poletto"}
        footnote="poletto.dev/blog"
      />
    ),
    { ...size, fonts: await loadOgFonts() },
  );
}
