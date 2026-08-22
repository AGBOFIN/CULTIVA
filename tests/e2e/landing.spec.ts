import { expect, test } from "@playwright/test";

test.describe("Landing page", () => {
  test("affiche les sections principales", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { name: /Gérez votre exploitation/ })).toBeVisible();
    await expect(page.locator("#features")).toBeVisible();
    await expect(page.locator("#how-it-works")).toBeVisible();
    await expect(page.locator("#testimonials")).toBeVisible();
    await expect(page.locator("#faq")).toBeVisible();
    await expect(page.locator("#contact")).toBeVisible();
  });

  test("le CTA « Commencer » mène à l'inscription", async ({ page }) => {
    await page.goto("/");

    // Navbar desktop (large viewport)
    await page.getByRole("link", { name: "Commencer" }).first().click();
    await expect(page).toHaveURL(/\/register$/);
  });

  test("le footer ne contient aucun lien mort « # »", async ({ page }) => {
    await page.goto("/");

    const deadLinks = await page.locator("footer a[href='#']").count();
    expect(deadLinks).toBe(0);

    // Les liens de l'app sont présents
    await expect(page.locator("footer a[href='/login']").first()).toBeVisible();
    await expect(page.locator("footer a[href='/register']").first()).toBeVisible();
  });
});
