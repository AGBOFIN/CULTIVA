import { cookies } from "next/headers";
import type { RegisterInput, User } from "@/types";
import { error, json, readBody, SESSION_COOKIE } from "@/lib/api";
import { get, hashPassword, run, signSessionToken } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const input = (await readBody(request)) as Partial<RegisterInput>;
    if (!input.fullName?.trim() || !input.phone?.trim() || !input.email?.trim() || !input.password) {
      return error("Tous les champs sont requis.");
    }
    if (input.password.length < 6) {
      return error("Le mot de passe doit contenir au moins 6 caractères.");
    }

    const email = input.email.trim().toLowerCase();
    const phone = input.phone.replace(/\s+/g, "");

    if (await get("SELECT id FROM users WHERE email = ?", [email])) {
      return error("Un compte existe déjà avec cet email.");
    }
    if (await get("SELECT id FROM users WHERE REPLACE(phone, ' ', '') = ?", [phone])) {
      return error("Un compte existe déjà avec ce numéro de téléphone.");
    }

    const id = `user-${Date.now()}`;
    const createdAt = new Date().toISOString();
    await run(
      `INSERT INTO users (id, full_name, phone, email, password_hash, location, user_type, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        input.fullName.trim(),
        input.phone.trim(),
        email,
        hashPassword(input.password),
        input.location?.trim() ?? "",
        "farmer",
        createdAt,
      ]
    );

    const token = await signSessionToken(id);
    const store = await cookies();
    store.set(SESSION_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    const user: User = {
      id,
      fullName: input.fullName.trim(),
      phone: input.phone.trim(),
      email,
      location: input.location?.trim() ?? "",
      userType: "farmer",
      createdAt,
    };
    return json(user, 201);
  } catch (err) {
    return error(err instanceof Error ? err.message : "Erreur lors de l'inscription.", 500);
  }
}
