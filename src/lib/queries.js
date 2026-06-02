import { eq, sql, and } from "drizzle-orm";
import { db } from "@/db";
import { gameCatalog, peakRanks, sessions, siteSettings } from "@/db/schema";

// ── slug util ────────────────────────────────────────────
export function toSlug(name) {
  return name.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

// ════════════════════════════════════════════════════════
// GAME CATALOG
// ════════════════════════════════════════════════════════

export async function getAllGames() {
  return db.select().from(gameCatalog).orderBy(gameCatalog.name);
}

export async function getGameBySlug(slug) {
  const rows = await db.select().from(gameCatalog).where(eq(gameCatalog.slug, slug));
  return rows[0] ?? null;
}

export async function createGame(name) {
  const slug = toSlug(name);
  const rows = await db.insert(gameCatalog).values({ name, slug }).returning();
  return rows[0];
}

export async function deleteGame(slug) {
  await db.delete(gameCatalog).where(eq(gameCatalog.slug, slug));
}

// ════════════════════════════════════════════════════════
// PEAK RANKS
// ════════════════════════════════════════════════════════

export async function getAllPeakRanks() {
  return db.select().from(peakRanks);
}

export async function getPeakRankBySlug(gameSlug) {
  const rows = await db.select().from(peakRanks).where(eq(peakRanks.gameSlug, gameSlug));
  return rows[0] ?? null;
}

export async function upsertPeakRank(gameSlug, rank, subheading) {
  // Insert or update
  const rows = await db
    .insert(peakRanks)
    .values({ gameSlug, rank, subheading, updatedAt: new Date() })
    .onConflictDoUpdate({
      target: peakRanks.gameSlug,
      set: { rank, subheading, updatedAt: new Date() },
    })
    .returning();
  return rows[0];
}

// ════════════════════════════════════════════════════════
// SESSIONS
// ════════════════════════════════════════════════════════

export async function getAllSessions() {
  // Join with game catalog to get game name
  return db
    .select({
      id:        sessions.id,
      gameSlug:  sessions.gameSlug,
      gameName:  gameCatalog.name,
      wins:      sessions.wins,
      losses:    sessions.losses,
      status:    sessions.status,
      startedAt: sessions.startedAt,
      endedAt:   sessions.endedAt,
    })
    .from(sessions)
    .leftJoin(gameCatalog, eq(sessions.gameSlug, gameCatalog.slug))
    .orderBy(sql`${sessions.startedAt} desc`);
}

export async function getActiveSessionBySlug(gameSlug) {
  const rows = await db
    .select()
    .from(sessions)
    .where(and(eq(sessions.gameSlug, gameSlug), eq(sessions.status, "active")));
  return rows[0] ?? null;
}

export async function createSession(gameSlug) {
  // Enforce one active session per game
  const existing = await getActiveSessionBySlug(gameSlug);
  if (existing) throw new Error("An active session already exists for this game.");

  const rows = await db
    .insert(sessions)
    .values({ gameSlug, wins: 0, losses: 0, status: "active" })
    .returning();
  return rows[0];
}

export async function updateSession(id, { wins, losses }) {
  const rows = await db
    .update(sessions)
    .set({ wins: Number(wins), losses: Number(losses) })
    .where(eq(sessions.id, id))
    .returning();
  return rows[0];
}

export async function endSession(id) {
  const rows = await db
    .update(sessions)
    .set({ status: "ended", endedAt: new Date() })
    .where(eq(sessions.id, id))
    .returning();
  return rows[0];
}

export async function deleteSession(id) {
  await db.delete(sessions).where(eq(sessions.id, id));
}

// ── Totals for landing page — sum ALL sessions per game ──
export async function getGameTotals() {
  // Returns one row per game with summed wins/losses + peak rank
  const result = await db.execute(sql`
    SELECT
      gc.slug,
      gc.name,
      COALESCE(SUM(s.wins), 0)::int   AS total_wins,
      COALESCE(SUM(s.losses), 0)::int AS total_losses,
      pr.rank,
      pr.subheading AS peak_subheading
    FROM game_catalog gc
    LEFT JOIN sessions s ON s.game_slug = gc.slug
    LEFT JOIN peak_ranks pr ON pr.game_slug = gc.slug
    GROUP BY gc.slug, gc.name, pr.rank, pr.subheading
    ORDER BY gc.name
  `);
  return result.rows ?? result;
}

// ── Data for overlay — active session only ───────────────
export async function getOverlayData(gameSlug) {
  const result = await db.execute(sql`
    SELECT
      gc.name  AS game,
      s.wins,
      s.losses,
      pr.rank,
      pr.subheading
    FROM game_catalog gc
    LEFT JOIN sessions s
      ON s.game_slug = gc.slug AND s.status = 'active'
    LEFT JOIN peak_ranks pr
      ON pr.game_slug = gc.slug
    WHERE gc.slug = ${gameSlug}
    LIMIT 1
  `);
  const rows = result.rows ?? result;
  return rows[0] ?? null;
}

// ════════════════════════════════════════════════════════
// SITE SETTINGS
// ════════════════════════════════════════════════════════

export async function getSettings() {
  const rows = await db.select().from(siteSettings).where(eq(siteSettings.id, 1));
  return rows[0] ?? { isLive: false, liveMessage: "Zeneta is live right now!" };
}

export async function updateSettings({ isLive, liveMessage }) {
  const rows = await db
    .update(siteSettings)
    .set({ isLive, liveMessage, updatedAt: new Date() })
    .where(eq(siteSettings.id, 1))
    .returning();
  return rows[0];
}
