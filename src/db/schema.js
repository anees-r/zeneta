import { pgTable, serial, text, integer, timestamp, boolean, pgEnum } from "drizzle-orm/pg-core";

export const sessionStatusEnum = pgEnum("session_status", ["active", "ended"]);

export const gameCatalog = pgTable("game_catalog", {
  id:        serial("id").primaryKey(),
  name:      text("name").notNull().unique(),
  slug:      text("slug").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const peakRanks = pgTable("peak_ranks", {
  id:         serial("id").primaryKey(),
  gameSlug:   text("game_slug").notNull().unique().references(() => gameCatalog.slug),
  rank:       text("rank").notNull().default(""),
  subheading: text("subheading").notNull().default(""),
  updatedAt:  timestamp("updated_at").defaultNow(),
});

// rank + subheading here = what the overlay /[game]/rank shows for THIS session
export const sessions = pgTable("sessions", {
  id:         serial("id").primaryKey(),
  gameSlug:   text("game_slug").notNull().references(() => gameCatalog.slug),
  wins:       integer("wins").notNull().default(0),
  losses:     integer("losses").notNull().default(0),
  rank:       text("rank").notNull().default(""),
  subheading: text("subheading").notNull().default(""),
  status:     sessionStatusEnum("status").notNull().default("active"),
  startedAt:  timestamp("started_at").defaultNow(),
  endedAt:    timestamp("ended_at"),
});

export const siteSettings = pgTable("site_settings", {
  id:          serial("id").primaryKey(),
  isLive:      boolean("is_live").notNull().default(false),
  liveMessage: text("live_message").notNull().default("Zeneta is live right now!"),
  updatedAt:   timestamp("updated_at").defaultNow(),
});

export const users = pgTable("users", {
  id:        serial("id").primaryKey(),
  email:     text("email").notNull().unique(),
  password:  text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
