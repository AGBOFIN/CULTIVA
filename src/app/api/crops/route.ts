import type { Crop, CropInput } from "@/types";
import { error, json, readBody, requireUserId } from "@/lib/api";
import { all, get, run } from "@/lib/db";

const SELECT = `
  SELECT id, user_id, field_id, crop_type, variety, sowing_date,
         expected_harvest_date, area, seed_quantity,
         seed_unit, status
  FROM crops
`;

function mapCrop(row: Record<string, unknown>): Crop {
  return {
    id: row.id as string,
    fieldId: row.fieldId as string,
    cropType: row.cropType as string,
    variety: (row.variety as string | null) ?? undefined,
    sowingDate: row.sowingDate as string,
    expectedHarvestDate: (row.expectedHarvestDate as string | null) ?? undefined,
    area: row.area as number,
    seedQuantity: (row.seedQuantity as number | null) ?? undefined,
    seedUnit: (row.seedUnit as string | null) ?? undefined,
    status: row.status as Crop["status"],
  };
}

export async function GET() {
  const userId = await requireUserId().catch(() => null);
  if (!userId) return error("Non connecté.", 401);
  const rows = await all(SELECT + " WHERE user_id = ? ORDER BY sowing_date DESC", [userId]);
  return json(rows.map(mapCrop));
}

export async function POST(request: Request) {
  const userId = await requireUserId().catch(() => null);
  if (!userId) return error("Non connecté.", 401);
  try {
    const input = (await readBody(request)) as CropInput;
    if (!input.fieldId || !input.cropType?.trim()) return error("Parcelle et culture requises.");
    if (typeof input.area !== "number" || input.area <= 0) return error("Superficie invalide.");
    if (!await get("SELECT id FROM fields WHERE id = ? AND user_id = ?", [input.fieldId, userId])) {
      return error("Parcelle introuvable.", 404);
    }

    const id = `crop-${Date.now()}`;
    await run(
      `INSERT INTO crops (id, user_id, field_id, crop_type, variety, sowing_date, expected_harvest_date, area, seed_quantity, seed_unit, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        userId,
        input.fieldId,
        input.cropType.trim(),
        input.variety?.trim() || null,
        input.sowingDate,
        input.expectedHarvestDate || null,
        input.area,
        input.seedQuantity || null,
        input.seedUnit || null,
        input.status,
      ]
    );
    const row = await get(SELECT + " WHERE id = ? AND user_id = ?", [id, userId]);
    return json(mapCrop(row as Record<string, unknown>), 201);
  } catch (err) {
    return error(err instanceof Error ? err.message : "Erreur lors de la création.", 500);
  }
}
