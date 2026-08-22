import { error, json, requireUserId } from "@/lib/api";
import { get, run } from "@/lib/db";

type Params = { params: Promise<{ id: string }> };

export async function POST(_request: Request, { params }: Params) {
  const userId = await requireUserId().catch(() => null);
  if (!userId) return error("Non connecté.", 401);
  const { id } = await params;
  if (!await get("SELECT id FROM notifications WHERE id = ? AND user_id = ?", [id, userId])) {
    return error("Notification introuvable.", 404);
  }
  await run("UPDATE notifications SET read = 1 WHERE id = ? AND user_id = ?", [id, userId]);
  return json({ ok: true });
}
