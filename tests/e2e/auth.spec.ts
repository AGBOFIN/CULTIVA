import { expect, test } from "@playwright/test";
import { deleteUserByEmail, testEmail } from "./helpers";

test.describe("Authentification", () => {
  test("inscription complète → dashboard, puis le compte est nettoyé", async ({ page }) => {
    const email = testEmail();
    const phone = `+228 ${(Date.now() % 100_000_000).toString().padStart(8, "0")}`;
    const password = "e2e-password";

    try {
      await page.goto("/register");
      await page.locator("#fullName").fill("Testeur E2E");
      await page.locator("#phone").fill(phone);
      await page.locator("#email").fill(email);
      await page.locator("#password").fill(password);
      await page.locator("#confirmPassword").fill(password);
      await page.locator("#location").fill("Lomé, Togo");
      await page.getByRole("button", { name: "Créer mon compte" }).click();

      // Redirigé vers le dashboard avec le nom affiché
      await expect(page).toHaveURL(/\/dashboard$/);
      await expect(page.getByRole("heading", { name: /Bonjour, Testeur/ })).toBeVisible();

      // La navigation contient les 11 modules et aucune section admin
      await expect(page.locator("nav a", { hasText: "Exploitations" })).toBeVisible();
      await expect(page.locator("nav a", { hasText: "Administration" })).toHaveCount(0);
    } finally {
      // Nettoyage du compte de test, même en cas d'échec
      await deleteUserByEmail(email);
    }
  });

  test("connexion avec le compte de démonstration", async ({ page }) => {
    await page.goto("/login");
    await page.locator("#identifier").fill("demo@cultiva.africa");
    await page.locator("#password").fill("demo1234");
    await page.getByRole("button", { name: "Se connecter" }).click();

    await expect(page).toHaveURL(/\/dashboard$/);
    await expect(page.getByRole("heading", { name: /Bonjour, Koffi/ })).toBeVisible();
  });

  test("mauvais mot de passe → message d'erreur", async ({ page }) => {
    await page.goto("/login");
    await page.locator("#identifier").fill("demo@cultiva.africa");
    await page.locator("#password").fill("mauvais-mot-de-passe");
    await page.getByRole("button", { name: "Se connecter" }).click();

    await expect(page.getByText("Identifiants incorrects.")).toBeVisible();
  });

  test("déconnexion depuis la sidebar", async ({ page }) => {
    // Se connecter
    await page.goto("/login");
    await page.locator("#identifier").fill("demo@cultiva.africa");
    await page.locator("#password").fill("demo1234");
    await page.getByRole("button", { name: "Se connecter" }).click();
    await expect(page).toHaveURL(/\/dashboard$/);

    // Se déconnecter
    await page.getByRole("button", { name: "Se déconnecter" }).click();
    await expect(page).toHaveURL(/\/login$/);
  });
});
