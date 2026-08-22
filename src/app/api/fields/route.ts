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

export async function GET() {
  const userId = await requireUserId().catch(() => null);
  if (!userId) return error("Non connecté.", 401);
  const rows = await all(SELECT + " WHERE user_id = ? ORDER BY name", [userId]);
  return json(rows.map(mapField));
}

export async function POST(request: Request) {
  const userId = await requireUserId().catch(() => null);
  if (!userId) return error("Non connecté.", 401);
  try {
    const input = (await readBody(request)) as FieldInput;
    if (!input.farmId || !input.name?.trim()) return error("Exploitation et nom requis.");
    if (typeof input.area !== "number" || input.area <= 0) return error("Superficie invalide.");
    const farm = await get("SELECT id FROM farms WHERE id = ? AND user_id = ?", [input.farmId, userId]);
    if (!farm) return error("Exploitation introuvable.", 404);

    const id = `field-${Date.now()}`;
    await run(
      `INSERT INTO fields (id, user_id, farm_id, name, area, area_unit, location, soil_type, current_crop, status, latitude, longitude)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        userId,
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
      ]
    );
    const row = await get(SELECT + " WHERE id = ? AND user_id = ?", [id, userId]);
    return json(mapField(row as Record<string, unknown>), 201);
  } catch (err) {
    return error(err instanceof Error ? err.message : "Erreur lors de la création.", 500);
  }
}
