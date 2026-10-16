import { describe, expect, it } from "vitest";

import { getArticlesForTopic, getRelatedArticles, topics } from "./topics";

describe("topic relationships", () => {
  it("uses explicit article relationships rather than broad tag matching", () => {
    const scalingTopic = topics.find(
      (topic) => topic.slug === "scaling-organisations",
    );

    expect(scalingTopic).toBeDefined();
    expect(
      getArticlesForTopic(scalingTopic!).map((article) => article.slug),
    ).toEqual([
      "building-a-team-from-zero-incubate-then-split",
      "engineering-strategy-is-mostly-saying-no",
      "what-changes-when-you-start-managing-managers",
      "scaling-without-breaking-field-notes-on-growth-and-reorgs",
      "engineering-strategy-executives-actually-read",
      "refactoring-the-organization-how-to-pay-down-management-debt",
    ]);
  });
});
describe("getRelatedArticles", () => {
  it("prefers newest same-topic articles and never returns the article itself", () => {
    const slug = "building-a-team-from-zero-incubate-then-split";
    const related = getRelatedArticles(slug);

    expect(related).toHaveLength(2);
    expect(related.map((article) => article.slug)).not.toContain(slug);
    expect(related.map((article) => article.slug)).toEqual([
      "engineering-strategy-is-mostly-saying-no",
      "what-changes-when-you-start-managing-managers",
    ]);
  });

  it("only returns published articles", () => {
    for (const article of getRelatedArticles("leading-in-the-fog", 5)) {
      expect(article.hasContent).toBe(true);
    }
  });
});
