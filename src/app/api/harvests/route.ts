import type { Harvest, HarvestInput } from "@/types";
import { error, json, readBody, requireUserId } from "@/lib/api";
import { all, get, run } from "@/lib/db";

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

export async function GET() {
  const userId = await requireUserId().catch(() => null);
  if (!userId) return error("Non connecté.", 401);
  const rows = await all(SELECT + " WHERE user_id = ? ORDER BY date DESC", [userId]);
  return json(rows.map(mapHarvest));
}

export async function POST(request: Request) {
  const userId = await requireUserId().catch(() => null);
  if (!userId) return error("Non connecté.", 401);
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

    const id = `harv-${Date.now()}`;
    const revenue = Math.round(input.quantity * input.price);
    await run(
      `INSERT INTO harvests (id, user_id, crop_id, field_id, date, quantity, unit, quality, price, revenue)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, userId, input.cropId, input.fieldId, input.date, input.quantity, input.unit, input.quality, input.price, revenue]
    );
    const row = await get(SELECT + " WHERE id = ? AND user_id = ?", [id, userId]);
    return json(mapHarvest(row as Record<string, unknown>), 201);
  } catch (err) {
    return error(err instanceof Error ? err.message : "Erreur lors de la création.", 500);
  }
}
