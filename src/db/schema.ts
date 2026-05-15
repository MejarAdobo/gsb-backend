import { jsonb, integer, boolean, pgTable, varchar, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  password: varchar({ length: 255 }).notNull(),
});

export const stationsTable = pgTable("stations", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  wuId: varchar({ length: 255 }).notNull().unique(),
});

export const goldstarsTable = pgTable("goldstars", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  stationId: integer()
    .notNull()
    .unique()
    .references(() => stationsTable.id),
  totalGoldStars: integer().notNull().default(0),
  totalYearlyGoldStars: integer().notNull().default(0),
});

export const streaksTable = pgTable("streaks", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  stationId: integer()
    .notNull()
    .unique()
    .references(() => stationsTable.id),
  lastDaySinceGoldStar: timestamp(),
  longestHotStreak: integer().notNull().default(0),
  longestHotYearlyStreak: integer().notNull().default(0),
  currentStreak: integer().notNull().default(0),
  longestColdStreak: integer().notNull().default(0),
  longestColdYearlyStreak: integer().notNull().default(0),
});

export const hourlyDataTable = pgTable("hourly_data", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  stationId: integer()
    .notNull()
    .unique()
    .references(() => stationsTable.id),
  recordedAt: timestamp().notNull(),
  weatherData: jsonb().notNull(),
  hasGoldStar: boolean().notNull().default(false),
});

const weatherStatusEnum = pgEnum("weather_status", ["gain", "lose", "maintain", "none"]);

export const dailyDataTable = pgTable("daily_data", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  stationId: integer()
    .notNull()
    .unique()
    .references(() => stationsTable.id),
  recordedAt: timestamp().notNull(),
  weatherStatus: weatherStatusEnum("weather_status").notNull().default("none"),
});
