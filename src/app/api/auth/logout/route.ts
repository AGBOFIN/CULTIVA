import { cookies } from "next/headers";
import { json, SESSION_COOKIE } from "@/lib/api";

export async function POST() {
  const store = await cookies();
  // Session signée (stateless) : il suffit d'effacer le cookie.
  // Session en base : la ligne sera orpheline, sans conséquence.
  store.set(SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return json({ ok: true });
}
