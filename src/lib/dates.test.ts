import { describe, expect, it } from "vitest";

import { formatDate } from "./dates";

describe("formatDate", () => {
  it("renders ISO dates as day, short month, year", () => {
    expect(formatDate("2026-10-16")).toBe("16 Oct 2026");
    expect(formatDate("2026-09-05")).toBe("5 Sep 2026");
  });
});
