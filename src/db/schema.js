import {
  pgTable, serial, text, integer,
  timestamp, boolean, pgEnum
} from "drizzle-orm/pg-core";

// ── Enum for session status ──────────────────────────────
export const sessionStatusEnum = pgEnum("session_status", ["active", "ended"]);

// ── game_catalog ─────────────────────────────────────────
// Master list of games. Managed via Studio → Games tab.
// slug is used in all URLs: /valorant/wl etc.
export const gameCatalog = pgTable("game_catalog", {
  id:        serial("id").primaryKey(),
  name:      text("name").notNull().unique(),   // "Valorant"
  slug:      text("slug").notNull().unique(),   // "valorant"
  createdAt: timestamp("created_at").defaultNow(),
});

// ── peak_ranks ───────────────────────────────────────────
// One row per game. Set manually in Studio → Peak Ranks tab.
export const peakRanks = pgTable("peak_ranks", {
  id:         serial("id").primaryKey(),
  gameSlug:   text("game_slug").notNull().unique().references(() => gameCatalog.slug),
  rank:       text("rank").notNull().default(""),
  subheading: text("subheading").notNull().default(""),
  updatedAt:  timestamp("updated_at").defaultNow(),
});

// ── sessions ─────────────────────────────────────────────
// One row per streaming session.
// Only one row per game_slug can have status = 'active' at a time.
// wins/losses here are for THIS session only.
// Landing page totals are computed by summing all sessions.
export const sessions = pgTable("sessions", {
  id:        serial("id").primaryKey(),
  gameSlug:  text("game_slug").notNull().references(() => gameCatalog.slug),
  wins:      integer("wins").notNull().default(0),
  losses:    integer("losses").notNull().default(0),
  status:    sessionStatusEnum("status").notNull().default("active"),
  startedAt: timestamp("started_at").defaultNow(),
  endedAt:   timestamp("ended_at"),
});

// ── site_settings ────────────────────────────────────────
// Single row (id = 1). Holds the global live toggle.
export const siteSettings = pgTable("site_settings", {
  id:          serial("id").primaryKey(),
  isLive:      boolean("is_live").notNull().default(false),
  liveMessage: text("live_message").notNull().default("Zeneta is live right now!"),
  updatedAt:   timestamp("updated_at").defaultNow(),
});

// ── users ────────────────────────────────────────────────
// Only you. Created once via seed script.
export const users = pgTable("users", {
  id:        serial("id").primaryKey(),
  email:     text("email").notNull().unique(),
  password:  text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
