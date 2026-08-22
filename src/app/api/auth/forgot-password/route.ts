import { error, json, readBody } from "@/lib/api";
import { get } from "@/lib/db";

export async function POST(request: Request) {
  const body = (await readBody(request)) as { identifier?: string };
  if (!body.identifier?.trim()) {
    return error("Indiquez votre email ou votre téléphone.");
  }
  const identifier = body.identifier.trim();
  const found = await get(
    "SELECT id FROM users WHERE LOWER(email) = LOWER(?) OR REPLACE(phone, ' ', '') = REPLACE(?, ' ', '')",
    [identifier, identifier]
  );
  if (!found) {
    return error("Aucun compte trouvé avec ces identifiants.");
  }
  return json({
    message:
      "Un lien de réinitialisation a été envoyé (démonstration : aucun email n'est réellement envoyé).",
  });
}
