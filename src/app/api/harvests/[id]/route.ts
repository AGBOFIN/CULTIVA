import type { Harvest, HarvestInput } from "@/types";
import { error, json, readBody, requireUserId } from "@/lib/api";
import { get, run } from "@/lib/db";

const SELECT = `
  SELECT id, user_id, crop_id, field_id, date, quantity, unit, quality, price, revenue
  FROM harvests
`;

function mapHarvest(row: Record<string, unknown>): Harvest {
  return {
    id: row.id as string,
    cropId: row.cropId as string,
    fieldId: row.fieldId as string,
    date: row.date as string,
    quantity: row.quantity as number,
    unit: row.unit as string,
    quality: row.quality as Harvest["quality"],
    price: row.price as number,
    revenue: row.revenue as number,
  };
}

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const userId = await requireUserId().catch(() => null);
  if (!userId) return error("Non connecté.", 401);
  const { id } = await params;
  const row = await get(SELECT + " WHERE id = ? AND user_id = ?", [id, userId]);
  if (!row) return error("Récolte introuvable.", 404);
  return json(mapHarvest(row as Record<string, unknown>));
}

export async function PUT(request: Request, { params }: Params) {
  const userId = await requireUserId().catch(() => null);
  if (!userId) return error("Non connecté.", 401);
  const { id } = await params;
  try {
    const input = (await readBody(request)) as HarvestInput;
    if (!input.cropId || !input.fieldId || !input.date) {
      return error("Culture, parcelle et date requises.");
    }
    if (typeof input.quantity !== "number" || input.quantity <= 0) {
      return error("Quantité invalide.");
    }
    if (typeof input.price !== "number" || input.price < 0) {
      return error("Prix invalide.");
    }
    if (!await get("SELECT id FROM harvests WHERE id = ? AND user_id = ?", [id, userId])) {
      return error("Récolte introuvable.", 404);
    }

    const revenue = Math.round(input.quantity * input.price);
    await run(
      `UPDATE harvests SET crop_id = ?, field_id = ?, date = ?, quantity = ?, unit = ?, quality = ?, price = ?, revenue = ?
       WHERE id = ? AND user_id = ?`,
      [input.cropId, input.fieldId, input.date, input.quantity, input.unit, input.quality, input.price, revenue, id, userId]
    );
    const row = await get(SELECT + " WHERE id = ? AND user_id = ?", [id, userId]);
    return json(mapHarvest(row as Record<string, unknown>));
  } catch (err) {
    return error(err instanceof Error ? err.message : "Erreur lors de la mise à jour.", 500);
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  const userId = await requireUserId().catch(() => null);
  if (!userId) return error("Non connecté.", 401);
  const { id } = await params;
  if (!await get("SELECT id FROM harvests WHERE id = ? AND user_id = ?", [id, userId])) {
    return error("Récolte introuvable.", 404);
  }
  await run("DELETE FROM harvests WHERE id = ? AND user_id = ?", [id, userId]);
  return json({ ok: true });
}
