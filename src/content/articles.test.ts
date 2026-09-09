import { describe, expect, it } from "vitest";

import {
  articles,
  featuredArticle,
  getArticleBySlug,
  latestArticles,
} from "./articles";

describe("article content", () => {
  it("finds articles by slug", () => {
    expect(getArticleBySlug("engineering-strategy-is-mostly-saying-no")).toEqual(
      featuredArticle,
    );
  });

  it("keeps only verified article bodies in the published content views", () => {
    const verifiedArticles = articles.filter((article) => article.hasContent);

    expect(verifiedArticles).toHaveLength(1);
    expect(latestArticles).toHaveLength(3);
    expect(latestArticles.every((article) => !article.hasContent)).toBe(true);
  });
});