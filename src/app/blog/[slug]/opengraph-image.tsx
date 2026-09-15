import { ImageResponse } from "next/og";

import { getArticleBySlug, getPublishedArticles } from "@/content/articles";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
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
  const title = article?.title ?? "Marco Poletto";
  const titleSize = title.length > 70 ? 44 : title.length > 40 ? 52 : 64;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          backgroundColor: "#f8f6f0",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 13,
              backgroundColor: "#1f2924",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 33,
              fontWeight: 800,
              color: "#f8f6f0",
            }}
          >
            P
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#1f2924",
            }}
          >
            Marco Poletto
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: titleSize,
            fontWeight: 700,
            lineHeight: 1.15,
            color: "#1f2924",
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#65706a" }}>
          {article ? `${article.readTime} · ${article.date}` : "poletto.dev"}
        </div>
      </div>
    ),
    { ...size },
  );
}
