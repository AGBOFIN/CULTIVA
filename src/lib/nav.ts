/**
 * Déconnecte l'utilisateur (si connecté) puis navigue vers la page cible.
 * Utilisé par la navbar et le footer pour les liens Connexion / Inscription.
 */
export async function logoutAndNavigate(path: string) {
  try {
    await fetch("/api/auth/logout", { method: "POST" });
  } catch {
    // Ignorer l'erreur — on navigue de toute façon.
  }
  window.location.href = path;
}
