import fs from "node:fs";
import path from "node:path";

/** Charge les variables de `.env.local` (équivalent minimal de dotenv). */
export function loadEnv(): void {
  const file = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, "utf8").split("\n")) {
    const m = line.match(/^([A-Z_]+)="?([^"]*)"?$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}

/** Supprime un compte de test directement en base (nettoyage après test). */
export async function deleteUserByEmail(email: string): Promise<void> {
  loadEnv();
  const { Pool } = await import("pg");
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL || process.env.POSTGRES_URL,
    ssl: { rejectUnauthorized: false },
  });
  try {
    await pool.query("DELETE FROM users WHERE email = $1", [email]);
  } finally {
    await pool.end();
  }
}

/** Génère un email de test unique. */
export function testEmail(prefix = "e2e"): string {
  return `${prefix}-${Date.now()}@test.cultiva.africa`;
}
