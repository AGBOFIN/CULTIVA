import type { Transaction, TransactionInput } from "@/types";
import { error, json, readBody, requireUserId } from "@/lib/api";
import { get, run } from "@/lib/db";

const SELECT = `
  SELECT id, user_id, type, category, label, amount, date
  FROM transactions
`;

function mapTransaction(row: Record<string, unknown>): Transaction {
  return {
    id: row.id as string,
    type: row.type as Transaction["type"],
    category: row.category as Transaction["category"],
    label: row.label as string,
    amount: row.amount as number,
    date: row.date as string,
  };
}

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const userId = await requireUserId().catch(() => null);
  if (!userId) return error("Non connecté.", 401);
  const { id } = await params;
  const row = await get(SELECT + " WHERE id = ? AND user_id = ?", [id, userId]);
  if (!row) return error("Transaction introuvable.", 404);
  return json(mapTransaction(row as Record<string, unknown>));
}

export async function PUT(request: Request, { params }: Params) {
  const userId = await requireUserId().catch(() => null);
  if (!userId) return error("Non connecté.", 401);
  const { id } = await params;
  try {
    const input = (await readBody(request)) as TransactionInput;
    if (!input.label?.trim() || !input.date) return error("Libellé et date requis.");
    if (typeof input.amount !== "number" || input.amount <= 0) return error("Montant invalide.");
    if (!await get("SELECT id FROM transactions WHERE id = ? AND user_id = ?", [id, userId])) {
      return error("Transaction introuvable.", 404);
    }

    await run(
      "UPDATE transactions SET type = ?, category = ?, label = ?, amount = ?, date = ? WHERE id = ? AND user_id = ?",
      [input.type, input.category, input.label.trim(), input.amount, input.date, id, userId]
    );
    const row = await get(SELECT + " WHERE id = ? AND user_id = ?", [id, userId]);
    return json(mapTransaction(row as Record<string, unknown>));
  } catch (err) {
    return error(err instanceof Error ? err.message : "Erreur lors de la mise à jour.", 500);
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  const userId = await requireUserId().catch(() => null);
  if (!userId) return error("Non connecté.", 401);
  const { id } = await params;
  if (!await get("SELECT id FROM transactions WHERE id = ? AND user_id = ?", [id, userId])) {
    return error("Transaction introuvable.", 404);
  }
  await run("DELETE FROM transactions WHERE id = ? AND user_id = ?", [id, userId]);
  return json({ ok: true });
}
