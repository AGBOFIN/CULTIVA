import type { AppNotification } from "@/types";
import { error, json, requireUserId } from "@/lib/api";
import { all } from "@/lib/db";

function mapNotification(row: Record<string, unknown>): AppNotification {
  return {
    id: row.id as string,
    type: row.type as AppNotification["type"],
    title: row.title as string,
    message: row.message as string,
    date: row.date as string,
    read: (row.read as number) === 1,
  };
}

export async function GET() {
  const userId = await requireUserId().catch(() => null);
  if (!userId) return error("Non connecté.", 401);
  const rows = await all(
    `SELECT id, type, title, message, date, read
     FROM notifications WHERE user_id = ? ORDER BY date DESC`,
    [userId]
  );
  return json(rows.map(mapNotification));
}
