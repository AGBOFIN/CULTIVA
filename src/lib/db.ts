/**
 * Couche de persistance.
 *
 * - **Postgres** (driver `pg`) quand `DATABASE_URL` ou `POSTGRES_URL` est défini
 *   (Vercel : base Neon provisionnée via le Marketplace, et local quand
 *   `.env.local` contient les credentials) — les données persistent.
 * - **SQLite** (`node:sqlite`, natif) en fallback local sans variable d'environnement.
 *
 * Le schéma, le seed et les helpers sont partagés ; les requêtes SQL utilisent
 * des placeholders `?` qui sont automatiquement convertis en `$1, $2…` pour
 * Postgres. Seul l'utilisateur démo est seedé si la base est vide.
 */
import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { Pool } from "pg";
import { seedUsers } from "@/data/mock-data";

type DbValue = string | number | null;

/* ------------------------------------------------------------------ */
/* Choix du backend                                                    */
/* ------------------------------------------------------------------ */

const connectionString =
  process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING;

let pool: Pool | null = null;

function pgPool(): Pool | null {
  if (!connectionString) return null;
  if (!pool) {
    pool = new Pool({
      connectionString,
      ssl: connectionString.includes("localhost") ? undefined : { rejectUnauthorized: false },
    });
  }
  return pool;
}

let sqlite: DatabaseSync | null = null;

function sqliteDb(): DatabaseSync | null {
  if (pgPool()) return null;
  if (sqlite) return sqlite;
  const dir = process.env.VERCEL === "1" ? "/tmp" : path.join(process.cwd(), ".data");
  fs.mkdirSync(dir, { recursive: true });
  sqlite = new DatabaseSync(path.join(dir, "cultiva.db"));
  sqlite.exec("PRAGMA foreign_keys = ON;");
  initSchema(sqlite);
  return sqlite;
}

/** Convertit les placeholders SQLite `?` en placeholders Postgres `$1, $2…`. */
function toPgSql(sql: string): string {
  let i = 0;
  return sql.replace(/\?/g, () => `$${++i}`);
}

/** `full_name` → `fullName` (les clés sans underscore sont inchangées). */
function camelizeKey(key: string): string {
  if (!key.includes("_")) return key;
  return key.replace(/_([a-z])/g, (_, c: string) => c.toUpperCase());
}

function camelizeRow(row: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(row)) out[camelizeKey(k)] = v;
  return out;
}

/* ------------------------------------------------------------------ */
/* Initialisation (schéma + migration + seed) — une seule fois         */
/* ------------------------------------------------------------------ */

let readyPromise: Promise<void> | null = null;

async function ensureReady(): Promise<void> {
  if (!readyPromise) {
    readyPromise = (async () => {
      const pg = pgPool();
      if (pg) {
        await initSchemaPg(pg);
        await migratePg(pg);
        await seedIfEmptyPg(pg);
      } else {
        const db = sqliteDb();
        if (db) {
          migrateSqlite(db);
          seedIfEmptySqlite(db);
        }
      }
    })();
  }
  return readyPromise;
}

/* ------------------------------------------------------------------ */
/* Helpers génériques (async)                                          */
/* ------------------------------------------------------------------ */

export async function all<T = Record<string, unknown>>(
  sql: string,
  params: DbValue[] = []
): Promise<T[]> {
  await ensureReady();
  const pg = pgPool();
  if (pg) {
    const { rows } = await pg.query(toPgSql(sql), params);
    return rows.map((r) => camelizeRow(r as Record<string, unknown>)) as T[];
  }
  const db = sqliteDb();
  if (!db) return [];
  return db.prepare(sql).all(...params) as T[];
}

export async function get<T>(
  sql: string,
  params: DbValue[] = []
): Promise<T | undefined> {
  await ensureReady();
  const pg = pgPool();
  if (pg) {
    const { rows } = await pg.query(toPgSql(sql), params);
    return (rows[0] ? camelizeRow(rows[0] as Record<string, unknown>) : undefined) as
      | T
      | undefined;
  }
  const db = sqliteDb();
  if (!db) return undefined;
  return db.prepare(sql).get(...params) as T | undefined;
}

export async function run(sql: string, params: DbValue[] = []): Promise<void> {
  await ensureReady();
  const pg = pgPool();
  if (pg) {
    await pg.query(toPgSql(sql), params);
    return;
  }
  const db = sqliteDb();
  if (!db) return;
  db.prepare(sql).run(...params);
}

/**
 * Compte normalisé — lit la première colonne de l'agrégat
 * (le nom de colonne diffère selon le moteur : `count` vs `COUNT(*)`).
 */
export async function count(sql: string, params: DbValue[] = []): Promise<number> {
  const row = await get<Record<string, unknown>>(sql, params);
  if (!row) return 0;
  return Number(Object.values(row)[0] ?? 0);
}

/** Somme normalisée (idem, `sum` vs `SUM(amount)` vs `total`). */
export async function sum(sql: string, params: DbValue[] = []): Promise<number> {
  const row = await get<Record<string, unknown>>(sql, params);
  if (!row) return 0;
  return Number(Object.values(row)[0] ?? 0);
}

/* ------------------------------------------------------------------ */
/* Schéma                                                              */
/* ------------------------------------------------------------------ */

const SCHEMA = `
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    location TEXT NOT NULL,
    user_type TEXT NOT NULL,
    avatar_url TEXT,
    farm_type TEXT,
    farm_info TEXT,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS sessions (
    token TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS farms (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    area DOUBLE PRECISION NOT NULL,
    area_unit TEXT NOT NULL,
    type TEXT NOT NULL,
    description TEXT,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS fields (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    farm_id TEXT NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    area DOUBLE PRECISION NOT NULL,
    area_unit TEXT NOT NULL,
    location TEXT,
    soil_type TEXT,
    current_crop TEXT,
    status TEXT NOT NULL,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION
  );

  CREATE TABLE IF NOT EXISTS crops (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    field_id TEXT NOT NULL REFERENCES fields(id) ON DELETE CASCADE,
    crop_type TEXT NOT NULL,
    variety TEXT,
    sowing_date TEXT NOT NULL,
    expected_harvest_date TEXT,
    area DOUBLE PRECISION NOT NULL,
    seed_quantity DOUBLE PRECISION,
    seed_unit TEXT,
    status TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS activities (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    date TEXT NOT NULL,
    field_id TEXT REFERENCES fields(id) ON DELETE CASCADE,
    crop_id TEXT,
    cost DOUBLE PRECISION NOT NULL,
    status TEXT NOT NULL,
    type TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS harvests (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    crop_id TEXT NOT NULL REFERENCES crops(id) ON DELETE CASCADE,
    field_id TEXT NOT NULL REFERENCES fields(id) ON DELETE CASCADE,
    date TEXT NOT NULL,
    quantity DOUBLE PRECISION NOT NULL,
    unit TEXT NOT NULL,
    quality TEXT NOT NULL,
    price DOUBLE PRECISION NOT NULL,
    revenue DOUBLE PRECISION NOT NULL
  );

  CREATE TABLE IF NOT EXISTS transactions (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    category TEXT NOT NULL,
    label TEXT NOT NULL,
    amount DOUBLE PRECISION NOT NULL,
    date TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS notifications (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    date TEXT NOT NULL,
    read INTEGER NOT NULL DEFAULT 0
  );
`;

function initSchema(db: DatabaseSync): void {
  db.exec(SCHEMA);
}

async function initSchemaPg(pg: Pool): Promise<void> {
  await pg.query(SCHEMA);
}

/* ------------------------------------------------------------------ */
/* Migration : ajouter user_id aux tables existantes                   */
/* ------------------------------------------------------------------ */

const MIGRATION_COLUMNS: { table: string; column: string }[] = [
  { table: "farms", column: "user_id" },
  { table: "fields", column: "user_id" },
  { table: "crops", column: "user_id" },
  { table: "activities", column: "user_id" },
  { table: "harvests", column: "user_id" },
  { table: "transactions", column: "user_id" },
  { table: "notifications", column: "user_id" },
];

/** Vérifie si une colonne existe dans une table. */
function columnExistsSqlite(db: DatabaseSync, table: string, column: string): boolean {
  const rows = db.prepare(`PRAGMA table_info(${table})`).all() as { name: string }[];
  return rows.some((r) => r.name === column);
}

function migrateSqlite(db: DatabaseSync): void {
  for (const { table, column } of MIGRATION_COLUMNS) {
    if (!columnExistsSqlite(db, table, column)) {
      db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} TEXT`);
      // Mettre à jour les anciennes lignes (seed démo) avec un user_id fictif
      // pour éviter les erreurs NOT NULL.
      db.exec(
        `UPDATE ${table} SET ${column} = 'user-demo' WHERE ${column} IS NULL`
      );
    }
  }
  // Index pour les requêtes filtrées par user_id
  for (const { table } of MIGRATION_COLUMNS) {
    db.exec(`CREATE INDEX IF NOT EXISTS idx_${table}_user_id ON ${table}(user_id)`);
  }
}

async function migratePg(pg: Pool): Promise<void> {
  for (const { table, column } of MIGRATION_COLUMNS) {
    const { rows } = await pg.query(
      `SELECT column_name FROM information_schema.columns
       WHERE table_name = $1 AND column_name = $2`,
      [table, column]
    );
    if (rows.length === 0) {
      await pg.query(`ALTER TABLE ${table} ADD COLUMN ${column} TEXT`);
      // Mettre à jour les anciennes lignes (seed démo) avec un user_id fictif
      await pg.query(`UPDATE ${table} SET ${column} = 'user-demo' WHERE ${column} IS NULL`);
    }
  }
  // Index pour les requêtes filtrées par user_id
  for (const { table } of MIGRATION_COLUMNS) {
    await pg.query(`CREATE INDEX IF NOT EXISTS idx_${table}_user_id ON ${table}(user_id)`);
  }
}

/* ------------------------------------------------------------------ */
/* Seed : uniquement l'utilisateur démo si la base est vide            */
/* ------------------------------------------------------------------ */

const INSERT_USER = `INSERT INTO users (id, full_name, phone, email, password_hash, location, user_type, avatar_url, farm_type, farm_info, created_at)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

function seedIfEmptySqlite(db: DatabaseSync): void {
  const row = db.prepare("SELECT COUNT(*) AS count FROM users").get() as { count: number };
  if (row.count > 0) return;

  for (const user of seedUsers) {
    db.prepare(INSERT_USER).run(
      user.id,
      user.fullName,
      user.phone,
      user.email,
      hashPassword(user.password),
      user.location,
      user.userType,
      user.avatarUrl ?? null,
      user.farmType ?? null,
      user.farmInfo ?? null,
      user.createdAt
    );
  }
}

async function seedIfEmptyPg(pg: Pool): Promise<void> {
  const { rows } = await pg.query("SELECT COUNT(*) AS count FROM users");
  if (Number((rows[0] as { count: string | number }).count ?? 0) > 0) return;

  for (const user of seedUsers) {
    await pg.query(toPgSql(INSERT_USER), [
      user.id, user.fullName, user.phone, user.email, hashPassword(user.password),
      user.location, user.userType, user.avatarUrl ?? null, user.farmType ?? null,
      user.farmInfo ?? null, user.createdAt,
    ]);
  }
}

/* ------------------------------------------------------------------ */
/* Mots de passe (scrypt natif — aucune dépendance)                    */
/* ------------------------------------------------------------------ */

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const candidate = scryptSync(password, salt, 64);
  const expected = Buffer.from(hash, "hex");
  return candidate.length === expected.length && timingSafeEqual(candidate, expected);
}

/* ------------------------------------------------------------------ */
/* Sessions                                                            */
/* ------------------------------------------------------------------ */

/**
 * Clé HMAC pour signer les cookies de session.
 *
 * Quand `CULTIVA_SESSION_SECRET` est défini (recommandé en production), la
 * session est un cookie **signé** (stateless) qui survit aux redémarrages.
 * Sans secret, on retombe sur la table `sessions` en base.
 */
function sessionSecret(): string | null {
  const secret = process.env.CULTIVA_SESSION_SECRET;
  if (secret && secret.length >= 16) return secret;
  return null;
}

/** Session signée (stateless) — utilisée quand un secret est défini. */
export async function signSessionToken(userId: string): Promise<string> {
  const secret = sessionSecret();
  if (!secret) {
    return createDbSession(userId);
  }
  const payload = Buffer.from(JSON.stringify({ userId, iat: Date.now() })).toString("base64url");
  const signature = createHmac("sha256", secret).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

/**
 * Valide un token de session : d'abord signé (stateless), sinon table DB.
 * Retourne l'id utilisateur ou undefined.
 */
export async function verifySessionToken(token: string): Promise<{ id: string } | undefined> {
  const secret = sessionSecret();
  if (secret) {
    const [payload, signature] = token.split(".");
    if (!payload || !signature) return undefined;
    const expected = createHmac("sha256", secret).update(payload).digest("base64url");
    const provided = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expected);
    if (
      provided.length !== expectedBuffer.length ||
      !timingSafeEqual(provided, expectedBuffer)
    ) {
      return undefined;
    }
    try {
      const data = JSON.parse(Buffer.from(payload, "base64url").toString()) as {
        userId: string;
        iat: number;
      };
      // Expire after 30 days (matching the cookie maxAge).
      const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;
      if (!data.userId || !data.iat || Date.now() - data.iat > MAX_AGE_MS) {
        return undefined;
      }
      return { id: data.userId };
    } catch {
      return undefined;
    }
  }
  const row = await get<{ userId: string }>(
    "SELECT user_id FROM sessions WHERE token = ?",
    [token]
  );
  return row?.userId ? { id: row.userId } : undefined;
}

async function createDbSession(userId: string): Promise<string> {
  const token = randomBytes(32).toString("hex");
  await run("INSERT INTO sessions (token, user_id, created_at) VALUES (?, ?, ?)", [
    token,
    userId,
    new Date().toISOString(),
  ]);
  return token;
}

export async function deleteSession(token: string): Promise<void> {
  await run("DELETE FROM sessions WHERE token = ?", [token]);
}
