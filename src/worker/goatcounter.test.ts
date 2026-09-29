import { describe, expect, it } from "vitest";

import { buildHit, type VisitorInfo } from "./goatcounter";

const visitor: VisitorInfo = {
  ip: "203.0.113.7",
  userAgent: "Mozilla/5.0",
  acceptLanguage: "nl-NL,nl;q=0.9,en;q=0.8",
  country: "NL",
};

describe("GoatCounter beacon translation", () => {
  it("maps count.js parameters and visitor details onto an API hit", () => {
    const params = new URLSearchParams({
      p: "/blog/some-post/",
      t: "Some Post | Marco Poletto",
      r: "https://www.linkedin.com/",
      s: "1920",
      q: "?utm_source=linkedin",
      b: "0",
      rnd: "abcde",
    });

    expect(buildHit(params, visitor)).toEqual({
      path: "/blog/some-post/",
      title: "Some Post | Marco Poletto",
      ref: "https://www.linkedin.com/",
      size: "1920",
      query: "?utm_source=linkedin",
      ip: "203.0.113.7",
      user_agent: "Mozilla/5.0",
      location: "NL",
      language: "nl-NL",
    });
  });

  it("ignores beacons without a path", () => {
    expect(buildHit(new URLSearchParams({ t: "No path" }), visitor)).toBeNull();
  });

  it("passes through bot hints and events", () => {
    const hit = buildHit(new URLSearchParams({ p: "click", e: "true", b: "153" }), visitor);
    expect(hit).toMatchObject({ event: true, bot: 153 });
  });

  it("drops unknown or Tor countries so GoatCounter falls back to the IP", () => {
    expect(buildHit(new URLSearchParams({ p: "/" }), { ...visitor, country: "XX" })?.location).toBeUndefined();
    expect(buildHit(new URLSearchParams({ p: "/" }), { ...visitor, country: "T1" })?.location).toBeUndefined();
  });
});
