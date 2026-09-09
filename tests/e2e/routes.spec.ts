import { expect, test } from "@playwright/test";

test("homepage leads readers to the Blog archive", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Building teams that stay human as they scale." }),
  ).toBeVisible();
  const identityJsonLd = await page
    .locator('script[type="application/ld+json"]')
    .first()
    .textContent();
  expect(identityJsonLd).toContain("Marco Poletto");
  await page.getByRole("link", { name: "View all →" }).click();

  await expect(page).toHaveURL(/\/blog$/);
  await expect(
    page.getByRole("heading", {
      name: "Articles on engineering leadership, management, and sustainable teams.",
    }),
  ).toBeVisible();
});

test("verified article routes render content and structured metadata", async ({ page }) => {
  await page.goto("/blog/engineering-strategy-is-mostly-saying-no");

  await expect(
    page.getByRole("heading", { name: "Engineering Strategy Is Mostly Saying No" }),
  ).toBeVisible();
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(2);
  await expect(page.getByRole("heading", { name: "The payoff" })).toBeVisible();
});

test("unverified article routes return a real 404", async ({ page }) => {
  const response = await page.goto("/blog/what-changes-when-you-start-managing-managers");

  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "404" })).toBeVisible();
});

test("newsletter signup exposes an accessible Buttondown form", async ({ page }) => {
  await page.goto("/newsletter");

  const form = page.locator("form");
  await expect(form).toHaveAttribute(
    "action",
    "https://buttondown.com/api/emails/embed-subscribe/marcopoletto",
  );
  await expect(page.getByRole("textbox", { name: "Email address" })).toHaveAttribute(
    "type",
    "email",
  );
  await expect(page.getByRole("button", { name: "Subscribe" })).toBeVisible();
});

test("RSS contains only verified article content", async ({ request }) => {
  const response = await request.get("/rss.xml");
  const body = await response.text();

  expect(response.ok()).toBe(true);
  expect(response.headers()["content-type"]).toContain("application/rss+xml");
  expect(body).toContain("Engineering Strategy Is Mostly Saying No");
  expect(body).not.toContain("What Changes When You Start Managing Managers");
});

test("theme toggle overrides the OS theme and persists across navigation", async ({ page }) => {
  await page.goto("/");

  const toggle = page.getByRole("button", { name: "Switch to dark mode" });
  await expect(toggle).toBeVisible();
  await expect(page.locator("html")).not.toHaveAttribute("data-theme", "dark");

  await toggle.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.getByRole("button", { name: "Switch to light mode" })).toBeVisible();

  await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Blog" }).click();
  await expect(page).toHaveURL(/\/blog$/);
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

test("sitemap contains public pages and verified article URLs", async ({ request }) => {
  const response = await request.get("/sitemap.xml");
  const body = await response.text();

  expect(response.ok()).toBe(true);
  expect(body).toContain("https://poletto.dev/blog");
  expect(body).toContain(
    "https://poletto.dev/blog/engineering-strategy-is-mostly-saying-no",
  );
  expect(body).not.toContain(
    "https://poletto.dev/blog/what-changes-when-you-start-managing-managers",
  );
});