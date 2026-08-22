/**
 * Helpers pour les route handlers de l'API.
 */
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { User } from "@/types";
import { get, verifySessionToken } from "./db";

export const SESSION_COOKIE = "cultiva_session";

/** Réponse JSON standard. */
export function json<T>(data: T, status = 200): NextResponse {
  return NextResponse.json(data, { status });
}

export function error(message: string, status = 400): NextResponse {
  return NextResponse.json({ error: message }, { status });
}

/** Lit le corps JSON de la requête (avec garde d'erreur). */
export async function readBody<T>(request: Request): Promise<T> {
  try {
    return (await request.json()) as T;
  } catch {
    throw new Error("Corps de requête invalide.");
  }
}

/**
 * Récupère l'id de l'utilisateur connecté depuis le cookie de session.
 * Retourne `null` si non connecté.
 */
export async function getUserId(): Promise<string | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const session = await verifySessionToken(token);
  return session?.id ?? null;
}

/**
 * Récupère l'id de l'utilisateur connecté — lève une 401 si absent.
 * Utiliser dans tous les routes API pour le scoping par utilisateur.
 */
export async function requireUserId(): Promise<string> {
  const userId = await getUserId();
  if (!userId) throw new Error("NON_AUTH");
  return userId;
}

/**
 * Retourne l'utilisateur connecté depuis le cookie de session,
 * ou `null` si la session est absente/invalide.
 */
export async function getSessionUserPublic(): Promise<User | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const session = await verifySessionToken(token);
  if (!session) return null;
  const user = await get<UserRow>(
    `SELECT id, full_name, phone, email, location, user_type,
            avatar_url, farm_type, farm_info, created_at
     FROM users WHERE id = ?`,
    [session.id]
  );
  if (!user) return null;
  return {
    id: user.id,
    fullName: user.fullName,
    phone: user.phone,
    email: user.email,
    location: user.location,
    userType: user.userType as User["userType"],
    avatarUrl: user.avatarUrl ?? undefined,
    farmType: user.farmType ?? undefined,
    farmInfo: user.farmInfo ?? undefined,
    createdAt: user.createdAt,
  };
}

export interface UserRow {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  location: string;
  userType: string;
  avatarUrl?: string | null;
  farmType?: string | null;
  farmInfo?: string | null;
  createdAt: string;
}
