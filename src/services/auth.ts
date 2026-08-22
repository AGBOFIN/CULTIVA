/**
 * Service d'authentification — API réelle.
 *
 * Les signatures asynchrones sont identiques à l'ancienne version (mock
 * localStorage) : les pages n'ont pas à changer. La session est un cookie
 * httpOnly géré par le serveur ; les mots de passe sont hashés (scrypt).
 */
import { apiFetch } from "@/lib/client";
import type { ProfileInput, RegisterInput, User } from "@/types";

export async function register(input: RegisterInput): Promise<User> {
  return apiFetch<User>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function login(identifier: string, password: string): Promise<User> {
  return apiFetch<User>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ identifier, password }),
  });
}

export async function logout(): Promise<void> {
  await apiFetch<{ ok: boolean }>("/api/auth/logout", { method: "POST" });
}

/** Retourne l'utilisateur connecté (ou null) depuis la session du cookie. */
export async function getSession(): Promise<User | null> {
  try {
    return await apiFetch<User>("/api/auth/me");
  } catch {
    return null;
  }
}

export async function requestPasswordReset(identifier: string): Promise<string> {
  const result = await apiFetch<{ message: string }>("/api/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ identifier }),
  });
  return result.message;
}

export async function updateProfile(input: ProfileInput): Promise<User> {
  // L'identité vient de la session serveur (cookie).
  return apiFetch<User>("/api/auth/profile", {
    method: "PATCH",
    body: JSON.stringify(input),
  });
}
