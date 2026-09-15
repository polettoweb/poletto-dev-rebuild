import { describe, expect, it } from "vitest";

import { articles, contentBySlug, getPublishedArticles } from "./articles";

describe("published content boundary", () => {
  it("returns only articles with verified bodies", () => {
    const publishedArticles = getPublishedArticles();

    expect(publishedArticles.map((article) => article.slug)).toEqual(
      articles.filter((article) => article.hasContent).map((article) => article.slug),
    );
    expect(publishedArticles).toHaveLength(articles.length);
  });

  it("derives hasContent from the same registry that renders the article", () => {
    for (const article of articles) {
      const isRenderable = Object.hasOwn(contentBySlug, article.slug);
      expect(article.hasContent).toBe(isRenderable);
    }
  });
});