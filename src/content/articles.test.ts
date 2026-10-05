import { describe, expect, it } from "vitest";

import {
  articles,
  featuredArticle,
  getArticleBySlug,
  latestArticles,
} from "./articles";

describe("article content", () => {
  it("finds articles by slug", () => {
    expect(getArticleBySlug("engineering-strategy-is-mostly-saying-no")?.slug).toBe(
      "engineering-strategy-is-mostly-saying-no",
    );
  });

  it("picks the featured article from the metadata flag", () => {
    expect(featuredArticle.slug).toBe(
      "ive-retrained-my-career-twice-what-i-tell-engineers-worried-about-ai",
    );
    expect(featuredArticle.featured).toBe(true);
    expect(latestArticles).toHaveLength(articles.length - 1);
    expect(latestArticles.some((article) => article.slug === featuredArticle.slug)).toBe(
      false,
    );
  });

  it("keeps verified article bodies distinguishable from unverified ones", () => {
    const verifiedArticles = articles.filter((article) => article.hasContent);

    expect(verifiedArticles).toHaveLength(articles.length);
    expect(
      latestArticles.filter((article) => !article.hasContent),
    ).toHaveLength(0);
  });
});