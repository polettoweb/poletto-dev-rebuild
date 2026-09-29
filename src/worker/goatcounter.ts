// Translates a beacon from GoatCounter's count.js into a hit for
// GoatCounter's /api/v0/count endpoint.
//
// count.js is served first-party (public/s/site.js) and pointed at /s/e so
// that ad blockers, which block gc.zgo.at, let it through. Proxying the
// beacon as-is would make every visitor look like the Worker's own IP, so the
// visitor's IP, user agent and country are sent to the API explicitly.

export type GoatCounterHit = {
  path: string;
  title?: string;
  event?: boolean;
  ref?: string;
  size?: string;
  query?: string;
  bot?: number;
  user_agent?: string;
  location?: string;
  language?: string;
  ip?: string;
};

export type VisitorInfo = {
  ip: string | null;
  userAgent: string | null;
  acceptLanguage: string | null;
  // request.cf.country: ISO 3166-1 alpha-2, or "XX" (unknown) / "T1" (Tor).
  country: string | undefined;
};

export function buildHit(params: URLSearchParams, visitor: VisitorInfo): GoatCounterHit | null {
  const path = params.get("p");
  if (!path) return null;

  const hit: GoatCounterHit = { path };

  const title = params.get("t");
  if (title) hit.title = title;
  if (params.get("e") === "true") hit.event = true;
  const ref = params.get("r");
  if (ref) hit.ref = ref;
  const size = params.get("s");
  if (size && /^\d+(\.\d+)?$/.test(size)) hit.size = size;
  const query = params.get("q");
  if (query) hit.query = query;
  const bot = Number(params.get("b"));
  if (Number.isInteger(bot) && bot > 0) hit.bot = bot;

  if (visitor.ip) hit.ip = visitor.ip;
  if (visitor.userAgent) hit.user_agent = visitor.userAgent;
  if (visitor.country && /^[A-Z]{2}$/.test(visitor.country) && visitor.country !== "XX") {
    hit.location = visitor.country;
  }
  const language = visitor.acceptLanguage?.split(",")[0]?.split(";")[0]?.trim();
  if (language) hit.language = language;

  return hit;
}
