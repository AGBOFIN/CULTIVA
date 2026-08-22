import { error, json, requireUserId } from "@/lib/api";
import { run } from "@/lib/db";

export async function POST() {
  const userId = await requireUserId().catch(() => null);
  if (!userId) return error("Non connecté.", 401);
  await run("UPDATE notifications SET read = 1 WHERE user_id = ?", [userId]);
  return json({ ok: true });
}
