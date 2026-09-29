import { buildHit } from "./goatcounter";

// Minimal local types so this file typechecks with the app's DOM lib,
// without pulling in @cloudflare/workers-types.
type Env = {
  ASSETS: { fetch(request: Request): Promise<Response> };
  GOATCOUNTER_TOKEN?: string;
};
type ExecutionContext = { waitUntil(promise: Promise<unknown>): void };
type CfRequest = Request & { cf?: { country?: string } };

const GOATCOUNTER_SITE = "https://polettoweb.goatcounter.com";
const BEACON_PATH = "/s/e";

// 1x1 transparent GIF, for count.js's <img> fallback when sendBeacon fails.
const PIXEL = Uint8Array.from(
  atob("R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"),
  (c) => c.charCodeAt(0),
);

async function recordHit(request: CfRequest, env: Env) {
  const url = new URL(request.url);

  if (!env.GOATCOUNTER_TOKEN) {
    // No API token configured: forward the beacon unchanged so pageviews are
    // still counted. Unique visitors and locations will be unreliable, since
    // GoatCounter sees the Worker rather than the visitor.
    await fetch(`${GOATCOUNTER_SITE}/count${url.search}`, {
      headers: {
        "User-Agent": request.headers.get("User-Agent") ?? "",
        "X-Forwarded-For": request.headers.get("CF-Connecting-IP") ?? "",
      },
    });
    return;
  }

  const hit = buildHit(url.searchParams, {
    ip: request.headers.get("CF-Connecting-IP"),
    userAgent: request.headers.get("User-Agent"),
    acceptLanguage: request.headers.get("Accept-Language"),
    country: request.cf?.country,
  });
  if (!hit) return;

  const response = await fetch(`${GOATCOUNTER_SITE}/api/v0/count`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.GOATCOUNTER_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ hits: [hit] }),
  });
  if (!response.ok) {
    console.error(`GoatCounter API ${response.status}: ${await response.text()}`);
  }
}

const worker = {
  async fetch(request: CfRequest, env: Env, ctx: ExecutionContext): Promise<Response> {
    const { pathname } = new URL(request.url);

    if (pathname === BEACON_PATH && (request.method === "GET" || request.method === "POST")) {
      ctx.waitUntil(recordHit(request, env).catch((error) => console.error(error)));
      return new Response(PIXEL, {
        headers: { "Content-Type": "image/gif", "Cache-Control": "no-store" },
      });
    }

    return env.ASSETS.fetch(request);
  },
};

export default worker;
