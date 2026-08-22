import type { Field, FieldInput } from "@/types";
import { error, json, readBody, requireUserId } from "@/lib/api";
import { all, get, run } from "@/lib/db";

const SELECT = `
  SELECT id, user_id, farm_id, name, area, area_unit, location, soil_type,
         current_crop, status, latitude, longitude
  FROM fields
`;

function mapField(row: Record<string, unknown>): Field {
  return {
    id: row.id as string,
    farmId: row.farmId as string,
    name: row.name as string,
    area: row.area as number,
    areaUnit: row.areaUnit as Field["areaUnit"],
    location: (row.location as string | null) ?? undefined,
    soilType: (row.soilType as string | null) ?? undefined,
    currentCrop: (row.currentCrop as string | null) ?? undefined,
    status: row.status as Field["status"],
    coordinates:
      row.latitude !== null && row.longitude !== null
        ? { latitude: row.latitude as number, longitude: row.longitude as number }
        : undefined,
  };
}

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const userId = await requireUserId().catch(() => null);
  if (!userId) return error("Non connecté.", 401);
  const { id } = await params;
  const row = await get(SELECT + " WHERE id = ? AND user_id = ?", [id, userId]);
  if (!row) return error("Parcelle introuvable.", 404);
  return json(mapField(row as Record<string, unknown>));
}

export async function PUT(request: Request, { params }: Params) {
  const userId = await requireUserId().catch(() => null);
  if (!userId) return error("Non connecté.", 401);
  const { id } = await params;
  try {
    const input = (await readBody(request)) as FieldInput;
    if (!input.farmId || !input.name?.trim()) return error("Exploitation et nom requis.");
    if (typeof input.area !== "number" || input.area <= 0) return error("Superficie invalide.");
    if (!await get("SELECT id FROM fields WHERE id = ? AND user_id = ?", [id, userId])) {
      return error("Parcelle introuvable.", 404);
    }

    await run(
      `UPDATE fields SET farm_id = ?, name = ?, area = ?, area_unit = ?, location = ?,
              soil_type = ?, current_crop = ?, status = ?, latitude = ?, longitude = ?
       WHERE id = ? AND user_id = ?`,
      [
        input.farmId,
        input.name.trim(),
        input.area,
        input.areaUnit,
        input.location?.trim() || null,
        input.soilType || null,
        input.currentCrop?.trim() || null,
        input.status,
        input.coordinates?.latitude ?? null,
        input.coordinates?.longitude ?? null,
        id,
        userId,
      ]
    );
    const row = await get(SELECT + " WHERE id = ? AND user_id = ?", [id, userId]);
    return json(mapField(row as Record<string, unknown>));
  } catch (err) {
    return error(err instanceof Error ? err.message : "Erreur lors de la mise à jour.", 500);
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  const userId = await requireUserId().catch(() => null);
  if (!userId) return error("Non connecté.", 401);
  const { id } = await params;
  if (!await get("SELECT id FROM fields WHERE id = ? AND user_id = ?", [id, userId])) {
    return error("Parcelle introuvable.", 404);
  }

  // Cascade : cultures (+ leurs récoltes) et activités de la parcelle.
  const cropIds = (await all<{ id: string }>("SELECT id FROM crops WHERE field_id = ? AND user_id = ?", [id, userId])).map(
    (c) => c.id
  );
  for (const cropId of cropIds) {
    await run("DELETE FROM harvests WHERE crop_id = ? AND user_id = ?", [cropId, userId]);
  }
  await run("DELETE FROM crops WHERE field_id = ? AND user_id = ?", [id, userId]);
  await run("DELETE FROM activities WHERE field_id = ? AND user_id = ?", [id, userId]);
  await run("DELETE FROM fields WHERE id = ? AND user_id = ?", [id, userId]);
  return json({ ok: true });
}
