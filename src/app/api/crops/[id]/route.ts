import type { Crop, CropInput } from "@/types";
import { error, json, readBody, requireUserId } from "@/lib/api";
import { get, run } from "@/lib/db";

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

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const userId = await requireUserId().catch(() => null);
  if (!userId) return error("Non connecté.", 401);
  const { id } = await params;
  const row = await get(SELECT + " WHERE id = ? AND user_id = ?", [id, userId]);
  if (!row) return error("Culture introuvable.", 404);
  return json(mapCrop(row as Record<string, unknown>));
}

export async function PUT(request: Request, { params }: Params) {
  const userId = await requireUserId().catch(() => null);
  if (!userId) return error("Non connecté.", 401);
  const { id } = await params;
  try {
    const input = (await readBody(request)) as CropInput;
    if (!input.fieldId || !input.cropType?.trim()) return error("Parcelle et culture requises.");
    if (typeof input.area !== "number" || input.area <= 0) return error("Superficie invalide.");
    if (!await get("SELECT id FROM crops WHERE id = ? AND user_id = ?", [id, userId])) {
      return error("Culture introuvable.", 404);
    }

    await run(
      `UPDATE crops SET field_id = ?, crop_type = ?, variety = ?, sowing_date = ?,
              expected_harvest_date = ?, area = ?, seed_quantity = ?, seed_unit = ?, status = ?
       WHERE id = ? AND user_id = ?`,
      [
        input.fieldId,
        input.cropType.trim(),
        input.variety?.trim() || null,
        input.sowingDate,
        input.expectedHarvestDate || null,
        input.area,
        input.seedQuantity || null,
        input.seedUnit || null,
        input.status,
        id,
        userId,
      ]
    );
    const row = await get(SELECT + " WHERE id = ? AND user_id = ?", [id, userId]);
    return json(mapCrop(row as Record<string, unknown>));
  } catch (err) {
    return error(err instanceof Error ? err.message : "Erreur lors de la mise à jour.", 500);
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  const userId = await requireUserId().catch(() => null);
  if (!userId) return error("Non connecté.", 401);
  const { id } = await params;
  if (!await get("SELECT id FROM crops WHERE id = ? AND user_id = ?", [id, userId])) {
    return error("Culture introuvable.", 404);
  }
  // Cascade : les récoltes de la culture sont supprimées.
  await run("DELETE FROM harvests WHERE crop_id = ? AND user_id = ?", [id, userId]);
  await run("DELETE FROM crops WHERE id = ? AND user_id = ?", [id, userId]);
  return json({ ok: true });
}
