import type { ProfileInput, User } from "@/types";
import { error, getSessionUserPublic, json, readBody, SESSION_COOKIE } from "@/lib/api";
import { cookies } from "next/headers";
import { get, run, verifySessionToken } from "@/lib/db";

export async function PATCH(request: Request) {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  const session = token ? await verifySessionToken(token) : undefined;
  if (!session) return error("Non connecté.", 401);

  const input = (await readBody(request)) as Partial<ProfileInput>;
  if (!input.fullName?.trim() || !input.phone?.trim() || !input.email?.trim()) {
    return error("Nom, téléphone et email sont requis.");
  }

  const email = input.email.trim().toLowerCase();
  const duplicate = await get<{ id: string }>(
    "SELECT id FROM users WHERE email = ? AND id != ?",
    [email, session.id]
  );
  if (duplicate) return error("Cet email est déjà utilisé par un autre compte.");

  await run(
    `UPDATE users SET full_name = ?, phone = ?, email = ?, location = ?,
            avatar_url = ?, farm_type = ?, farm_info = ?
     WHERE id = ?`,
    [
      input.fullName.trim(),
      input.phone.trim(),
      email,
      input.location?.trim() ?? "",
      input.avatarUrl?.trim() || null,
      input.farmType?.trim() || null,
      input.farmInfo?.trim() || null,
      session.id,
    ]
  );

  const user = await getSessionUserPublic();
  if (!user) return error("Utilisateur introuvable.", 404);
  return json(user satisfies User);
}
