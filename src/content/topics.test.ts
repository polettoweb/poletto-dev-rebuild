import { describe, expect, it } from "vitest";

import { getArticlesForTopic, topics } from "./topics";

describe("topic relationships", () => {
  it("uses explicit article relationships rather than broad tag matching", () => {
    const scalingTopic = topics.find(
      (topic) => topic.slug === "scaling-organisations",
    );

    expect(scalingTopic).toBeDefined();
    expect(
      getArticlesForTopic(scalingTopic!).map((article) => article.slug),
    ).toEqual([
      "engineering-strategy-is-mostly-saying-no",
      "what-changes-when-you-start-managing-managers",
      "scaling-without-breaking-field-notes-on-growth-and-reorgs",
      "engineering-strategy-executives-actually-read",
      "refactoring-the-organization-how-to-pay-down-management-debt",
    ]);
  });
});