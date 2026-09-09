import { expect, test } from "@playwright/test";

test("homepage leads readers to the Blog archive", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Building teams that stay human as they scale." }),
  ).toBeVisible();
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
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1);
  await expect(page.getByRole("heading", { name: "The payoff" })).toBeVisible();
});

test("unverified article routes return a real 404", async ({ page }) => {
  const response = await page.goto("/blog/what-changes-when-you-start-managing-managers");

  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "404" })).toBeVisible();
});