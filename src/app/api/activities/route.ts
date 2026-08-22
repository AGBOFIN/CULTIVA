import type { Activity, ActivityInput } from "@/types";
import { error, json, readBody, requireUserId } from "@/lib/api";
import { all, get, run } from "@/lib/db";

const SELECT = `
  SELECT id, user_id, title, description, date, field_id, crop_id, cost, status, type
  FROM activities
`;

function mapActivity(row: Record<string, unknown>): Activity {
  return {
    id: row.id as string,
    title: row.title as string,
    description: (row.description as string | null) ?? undefined,
    date: row.date as string,
    fieldId: (row.fieldId as string | null) ?? undefined,
    cropId: (row.cropId as string | null) ?? undefined,
    cost: row.cost as number,
    status: row.status as Activity["status"],
    type: row.type as Activity["type"],
  };
}

export async function GET() {
  const userId = await requireUserId().catch(() => null);
  if (!userId) return error("Non connecté.", 401);
  const rows = await all(SELECT + " WHERE user_id = ? ORDER BY date DESC", [userId]);
  return json(rows.map(mapActivity));
}

export async function POST(request: Request) {
  const userId = await requireUserId().catch(() => null);
  if (!userId) return error("Non connecté.", 401);
  try {
    const input = (await readBody(request)) as ActivityInput;
    if (!input.title?.trim() || !input.date) return error("Titre et date requis.");
    if (input.fieldId && !await get("SELECT id FROM fields WHERE id = ? AND user_id = ?", [input.fieldId, userId])) {
      return error("Parcelle introuvable.", 404);
    }

    const id = `act-${Date.now()}`;
    await run(
      `INSERT INTO activities (id, user_id, title, description, date, field_id, crop_id, cost, status, type)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        userId,
        input.title.trim(),
        input.description?.trim() || null,
        input.date,
        input.fieldId || null,
        null,
        input.cost,
        input.status,
        input.type,
      ]
    );
    const row = await get(SELECT + " WHERE id = ? AND user_id = ?", [id, userId]);
    return json(mapActivity(row as Record<string, unknown>), 201);
  } catch (err) {
    return error(err instanceof Error ? err.message : "Erreur lors de la création.", 500);
  }
}
