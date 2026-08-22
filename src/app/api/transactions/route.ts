import type { Transaction, TransactionInput } from "@/types";
import { error, json, readBody, requireUserId } from "@/lib/api";
import { all, get, run } from "@/lib/db";

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

export async function GET() {
  const userId = await requireUserId().catch(() => null);
  if (!userId) return error("Non connecté.", 401);
  const rows = await all(SELECT + " WHERE user_id = ? ORDER BY date DESC", [userId]);
  return json(rows.map(mapTransaction));
}

export async function POST(request: Request) {
  const userId = await requireUserId().catch(() => null);
  if (!userId) return error("Non connecté.", 401);
  try {
    const input = (await readBody(request)) as TransactionInput;
    if (!input.label?.trim() || !input.date) return error("Libellé et date requis.");
    if (typeof input.amount !== "number" || input.amount <= 0) return error("Montant invalide.");

    const id = `t-${Date.now()}`;
    await run(
      "INSERT INTO transactions (id, user_id, type, category, label, amount, date) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [id, userId, input.type, input.category, input.label.trim(), input.amount, input.date]
    );
    const row = await get(SELECT + " WHERE id = ? AND user_id = ?", [id, userId]);
    return json(mapTransaction(row as Record<string, unknown>), 201);
  } catch (err) {
    return error(err instanceof Error ? err.message : "Erreur lors de la création.", 500);
  }
}
