import { expect, test } from "@playwright/test";

const MODULES: Array<{ path: string; heading: RegExp; expects?: RegExp[] }> = [
  { path: "/farms", heading: /Exploitations/, expects: [/Ferme de Koffi/] },
  { path: "/fields", heading: /Parcelles/, expects: [/Parcelle A/] },
  { path: "/crops", heading: /Cultures/, expects: [/Maïs/] },
  { path: "/activities", heading: /Activités/, expects: [/Semis du riz/] },
  { path: "/calendar", heading: /Calendrier/ },
  { path: "/harvests", heading: /Récoltes/, expects: [/kg/] },
  { path: "/finances", heading: /Finances/ },
  { path: "/weather", heading: /Météo/ },
  { path: "/notifications", heading: /Notifications/ },
  { path: "/profile", heading: /Mon profil/, expects: [/Koffi Mensah/] },
];

test.describe("Modules de l'application (compte démo)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
    await page.locator("#identifier").fill("demo@cultiva.africa");
    await page.locator("#password").fill("demo1234");
    await page.getByRole("button", { name: "Se connecter" }).click();
    await expect(page).toHaveURL(/\/dashboard$/);
  });

  for (const mod of MODULES) {
    test(`module ${mod.path} charge sans erreur`, async ({ page }) => {
      await page.goto(mod.path);

      await expect(page.getByRole("heading", { name: mod.heading }).first()).toBeVisible();
      // Aucune bannière d'erreur de chargement
      await expect(page.getByText("Impossible de charger", { exact: false })).toHaveCount(0);

      for (const text of mod.expects ?? []) {
        await expect(page.getByText(text).first()).toBeVisible();
      }
    });
  }

  test("le dashboard affiche les indicateurs clés", async ({ page }) => {
    await page.goto("/dashboard");

    await expect(page.getByRole("heading", { name: /Bonjour, Koffi/ })).toBeVisible();
    await expect(page.getByText("Exploitations")).toBeVisible();
    await expect(page.getByText("Parcelles")).toBeVisible();
    await expect(page.getByText("Cultures en cours")).toBeVisible();
  });
});
