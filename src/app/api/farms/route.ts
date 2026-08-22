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

export async function GET() {
  const userId = await requireUserId().catch(() => null);
  if (!userId) return error("Non connecté.", 401);
  const rows = await all(SELECT + " WHERE user_id = ? ORDER BY created_at DESC", [userId]);
  return json(rows.map(mapFarm));
}

export async function POST(request: Request) {
  const userId = await requireUserId().catch(() => null);
  if (!userId) return error("Non connecté.", 401);
  try {
    const input = (await readBody(request)) as FarmInput;
    if (!input.name?.trim() || !input.location?.trim() || !input.type?.trim()) {
      return error("Nom, localisation et type sont requis.");
    }
    if (typeof input.area !== "number" || input.area <= 0) {
      return error("Superficie invalide.");
    }

    const id = `farm-${Date.now()}`;
    await run(
      `INSERT INTO farms (id, user_id, name, location, area, area_unit, type, description, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        userId,
        input.name.trim(),
        input.location.trim(),
        input.area,
        input.areaUnit,
        input.type.trim(),
        input.description?.trim() || null,
        new Date().toISOString(),
      ]
    );
    const row = await get(SELECT + " WHERE id = ? AND user_id = ?", [id, userId]);
    return json(mapFarm(row as Record<string, unknown>), 201);
  } catch (err) {
    return error(err instanceof Error ? err.message : "Erreur lors de la création.", 500);
  }
}
