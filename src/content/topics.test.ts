import { describe, expect, it } from "vitest";

import { getArticlesForTopic, topics } from "./topics";

describe("topic relationships", () => {
  it("uses explicit article relationships rather than broad tag matching", () => {
    const scalingTopic = topics.find(
      (topic) => topic.slug === "scaling-organisations",
    );

    expect(scalingTopic).toBeDefined();
    expect(getArticlesForTopic(scalingTopic!)).toHaveLength(2);
    expect(
      getArticlesForTopic(scalingTopic!).map((article) => article.slug),
    ).toEqual([
      "engineering-strategy-is-mostly-saying-no",
      "what-changes-when-you-start-managing-managers",
    ]);
  });
});