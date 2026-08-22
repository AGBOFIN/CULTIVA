import { cookies } from "next/headers";
import type { User } from "@/types";
import { error, json, readBody, SESSION_COOKIE } from "@/lib/api";
import { get, signSessionToken, verifyPassword } from "@/lib/db";

interface LoginRow {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  passwordHash: string;
  location: string;
  userType: string;
  createdAt: string;
}

export async function POST(request: Request) {
  try {
    const body = (await readBody(request)) as { identifier?: string; password?: string };
    if (!body.identifier?.trim() || !body.password) {
      return error("Identifiants requis.");
    }

    const identifier = body.identifier.trim();
    const user = await get<LoginRow>(
      `SELECT id, full_name, phone, email, password_hash,
              location, user_type, created_at
       FROM users
       WHERE LOWER(email) = LOWER(?) OR REPLACE(phone, ' ', '') = REPLACE(?, ' ', '')`,
      [identifier, identifier]
    );

    if (!user || !verifyPassword(body.password, user.passwordHash)) {
      return error("Identifiants incorrects.", 401);
    }

    const token = await signSessionToken(user.id);
    const store = await cookies();
    store.set(SESSION_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    const publicUser: User = {
      id: user.id,
      fullName: user.fullName,
      phone: user.phone,
      email: user.email,
      location: user.location,
      userType: user.userType as User["userType"],
      createdAt: user.createdAt,
    };
    return json(publicUser);
  } catch (err) {
    return error(err instanceof Error ? err.message : "Erreur lors de la connexion.", 500);
  }
}
