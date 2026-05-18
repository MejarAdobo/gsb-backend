import { jsonb, integer, boolean, pgTable, varchar, timestamp, pgEnum } from "drizzle-orm/pg-core";

// enums
export const weatherStatusEnum = pgEnum("weather_status", ["gain", "lose", "maintain", "none"]);
export const awardTypeEnum = pgEnum("award_type", ["hot_streak", "cold_streak", "most_gold_star", "least_gold_star"]);

// users
export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  password: varchar({ length: 255 }).notNull(),
  createdAt: timestamp().notNull().defaultNow(),
});

// stations
export const stationsTable = pgTable("stations", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  wuId: varchar({ length: 255 }).notNull().unique(),
  createdAt: timestamp().notNull().defaultNow(),
});

// goldstars
export const goldstarsTable = pgTable("goldstars", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  stationId: integer()
    .notNull()
    .unique()
    .references(() => stationsTable.id),
  totalGoldStars: integer().notNull().default(0),
  totalYearlyGoldStars: integer().notNull().default(0),
  createdAt: timestamp().notNull().defaultNow(),
});

// streaks
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
  createdAt: timestamp().notNull().defaultNow(),
});

// hourly data
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

// daily data
export const dailyDataTable = pgTable("daily_data", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  stationId: integer()
    .notNull()
    .unique()
    .references(() => stationsTable.id),
  recordedAt: timestamp().notNull(),
  weatherStatus: weatherStatusEnum("weather_status").notNull().default("none"),
});

// award
export const awardsTable = pgTable("awards", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar().notNull(),
  year: integer().notNull(),
  awardType: awardTypeEnum("award_type").notNull(),
  stationId: integer()
    .notNull()
    .references(() => stationsTable.id),
  createdAt: timestamp().notNull().defaultNow(),
});
