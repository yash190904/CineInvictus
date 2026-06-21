import { createClient } from "@libsql/client";
import path from "node:path";
import fs from "node:fs";

// Storage for booked slots, used so two people can't pick the same
// time. Uses Turso (hosted, persistent — works on serverless hosts
// like Vercel) when TURSO_DATABASE_URL/TURSO_AUTH_TOKEN are set, and
// falls back to a local SQLite file for local dev with zero setup.
const localDbPath = path.join(process.cwd(), "var", "bookings.db");
const url = process.env.TURSO_DATABASE_URL || `file:${localDbPath}`;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!process.env.TURSO_DATABASE_URL) {
  fs.mkdirSync(path.dirname(localDbPath), { recursive: true });
}

const client = createClient(authToken ? { url, authToken } : { url });

let ready: Promise<void> | null = null;

function ensureReady() {
  if (!ready) {
    ready = client
      .execute(
        `CREATE TABLE IF NOT EXISTS bookings (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          date TEXT NOT NULL,
          time TEXT NOT NULL,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          notes TEXT,
          created_at TEXT NOT NULL,
          UNIQUE(date, time)
        )`
      )
      .then(() => undefined);
  }
  return ready;
}

export async function getBookedTimesForDates(
  dates: string[]
): Promise<Map<string, Set<string>>> {
  const result = new Map<string, Set<string>>();
  if (dates.length === 0) return result;

  await ensureReady();
  const placeholders = dates.map(() => "?").join(",");
  const res = await client.execute({
    sql: `SELECT date, time FROM bookings WHERE date IN (${placeholders})`,
    args: dates,
  });

  for (const row of res.rows) {
    const date = row.date as string;
    const time = row.time as string;
    if (!result.has(date)) result.set(date, new Set());
    result.get(date)!.add(time);
  }
  return result;
}

export type CreateBookingInput = {
  date: string;
  time: string;
  name: string;
  email: string;
  notes?: string;
};

export async function createBooking(input: CreateBookingInput) {
  await ensureReady();
  try {
    await client.execute({
      sql: "INSERT INTO bookings (date, time, name, email, notes, created_at) VALUES (?, ?, ?, ?, ?, ?)",
      args: [
        input.date,
        input.time,
        input.name,
        input.email,
        input.notes ?? null,
        new Date().toISOString(),
      ],
    });
    return { ok: true as const };
  } catch (err) {
    const message = err instanceof Error ? err.message : "";
    if (message.includes("UNIQUE")) {
      return { ok: false as const, reason: "taken" as const };
    }
    throw err;
  }
}
