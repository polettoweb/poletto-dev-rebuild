import { describe, expect, it } from "vitest";

import { getPublishedArticles } from "./articles";

describe("published content boundary", () => {
  it("returns only articles with verified bodies", () => {
    const publishedArticles = getPublishedArticles();

    expect(publishedArticles.map((article) => article.slug)).toEqual([
      "engineering-strategy-is-mostly-saying-no",
    ]);
  });
});