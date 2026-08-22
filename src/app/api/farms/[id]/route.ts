import type { Farm, FarmInput } from "@/types";
import { error, json, readBody, requireUserId } from "@/lib/api";
import { all, get, run } from "@/lib/db";

const SELECT = `
  SELECT id, user_id, name, location, area, area_unit, type, description, created_at
  FROM farms
`;

function mapFarm(row: Record<string, unknown>): Farm {
  return {
    id: row.id as string,
    name: row.name as string,
    location: row.location as string,
    area: row.area as number,
    areaUnit: row.areaUnit as Farm["areaUnit"],
    type: row.type as string,
    description: (row.description as string | null) ?? undefined,
    createdAt: row.createdAt as string,
  };
}

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const userId = await requireUserId().catch(() => null);
  if (!userId) return error("Non connecté.", 401);
  const { id } = await params;
  const row = await get(SELECT + " WHERE id = ? AND user_id = ?", [id, userId]);
  if (!row) return error("Exploitation introuvable.", 404);
  return json(mapFarm(row as Record<string, unknown>));
}

export async function PUT(request: Request, { params }: Params) {
  const userId = await requireUserId().catch(() => null);
  if (!userId) return error("Non connecté.", 401);
  const { id } = await params;
  try {
    const input = (await readBody(request)) as FarmInput;
    if (!input.name?.trim() || !input.location?.trim() || !input.type?.trim()) {
      return error("Nom, localisation et type sont requis.");
    }
    if (typeof input.area !== "number" || input.area <= 0) {
      return error("Superficie invalide.");
    }
    const existing = await get("SELECT id FROM farms WHERE id = ? AND user_id = ?", [id, userId]);
    if (!existing) return error("Exploitation introuvable.", 404);

    await run(
      `UPDATE farms SET name = ?, location = ?, area = ?, area_unit = ?, type = ?, description = ?
       WHERE id = ? AND user_id = ?`,
      [
        input.name.trim(),
        input.location.trim(),
        input.area,
        input.areaUnit,
        input.type.trim(),
        input.description?.trim() || null,
        id,
        userId,
      ]
    );
    const row = await get(SELECT + " WHERE id = ? AND user_id = ?", [id, userId]);
    return json(mapFarm(row as Record<string, unknown>));
  } catch (err) {
    return error(err instanceof Error ? err.message : "Erreur lors de la mise à jour.", 500);
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  const userId = await requireUserId().catch(() => null);
  if (!userId) return error("Non connecté.", 401);
  const { id } = await params;
  const existing = await get("SELECT id FROM farms WHERE id = ? AND user_id = ?", [id, userId]);
  if (!existing) return error("Exploitation introuvable.", 404);

  // Suppression en cascade : parcelles → cultures/récoltes + activités.
  const fieldIds = (await all<{ id: string }>("SELECT id FROM fields WHERE farm_id = ? AND user_id = ?", [id, userId])).map(
    (f) => f.id
  );
  for (const fieldId of fieldIds) {
    const cropIds = (await all<{ id: string }>("SELECT id FROM crops WHERE field_id = ? AND user_id = ?", [fieldId, userId])).map(
      (c) => c.id
    );
    for (const cropId of cropIds) {
      await run("DELETE FROM harvests WHERE crop_id = ? AND user_id = ?", [cropId, userId]);
    }
    await run("DELETE FROM crops WHERE field_id = ? AND user_id = ?", [fieldId, userId]);
    await run("DELETE FROM activities WHERE field_id = ? AND user_id = ?", [fieldId, userId]);
  }
  await run("DELETE FROM fields WHERE farm_id = ? AND user_id = ?", [id, userId]);
  await run("DELETE FROM farms WHERE id = ? AND user_id = ?", [id, userId]);
  return json({ ok: true });
}
