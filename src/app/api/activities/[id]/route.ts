import type { Activity, ActivityInput } from "@/types";
import { error, json, readBody, requireUserId } from "@/lib/api";
import { get, run } from "@/lib/db";

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

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const userId = await requireUserId().catch(() => null);
  if (!userId) return error("Non connecté.", 401);
  const { id } = await params;
  const row = await get(SELECT + " WHERE id = ? AND user_id = ?", [id, userId]);
  if (!row) return error("Activité introuvable.", 404);
  return json(mapActivity(row as Record<string, unknown>));
}

export async function PUT(request: Request, { params }: Params) {
  const userId = await requireUserId().catch(() => null);
  if (!userId) return error("Non connecté.", 401);
  const { id } = await params;
  try {
    const input = (await readBody(request)) as ActivityInput;
    if (!input.title?.trim() || !input.date) return error("Titre et date requis.");
    if (!await get("SELECT id FROM activities WHERE id = ? AND user_id = ?", [id, userId])) {
      return error("Activité introuvable.", 404);
    }

    await run(
      `UPDATE activities SET title = ?, description = ?, date = ?, field_id = ?, cost = ?, status = ?, type = ?
       WHERE id = ? AND user_id = ?`,
      [
        input.title.trim(),
        input.description?.trim() || null,
        input.date,
        input.fieldId || null,
        input.cost,
        input.status,
        input.type,
        id,
        userId,
      ]
    );
    const row = await get(SELECT + " WHERE id = ? AND user_id = ?", [id, userId]);
    return json(mapActivity(row as Record<string, unknown>));
  } catch (err) {
    return error(err instanceof Error ? err.message : "Erreur lors de la mise à jour.", 500);
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  const userId = await requireUserId().catch(() => null);
  if (!userId) return error("Non connecté.", 401);
  const { id } = await params;
  if (!await get("SELECT id FROM activities WHERE id = ? AND user_id = ?", [id, userId])) {
    return error("Activité introuvable.", 404);
  }
  await run("DELETE FROM activities WHERE id = ? AND user_id = ?", [id, userId]);
  return json({ ok: true });
}
