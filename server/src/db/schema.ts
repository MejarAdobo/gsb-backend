import {
  jsonb,
  integer,
  boolean,
  pgTable,
  varchar,
  timestamp,
  pgEnum,
  index,
} from "drizzle-orm/pg-core";

// enums
export const weatherStatusEnum = pgEnum("weather_status", ["gain", "lose", "maintain", "none"]);
export const awardTypeEnum = pgEnum("award_type", [
  "hot_streak",
  "cold_streak",
  "most_gold_star",
  "least_gold_star",
]);

// users
export const users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  password: varchar({ length: 255 }).notNull(),
  createdAt: timestamp().notNull().defaultNow(),
});

// stations
export const stations = pgTable("stations", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  wuId: varchar({ length: 255 }).notNull().unique(),
  createdAt: timestamp().notNull().defaultNow(),
});

// goldstars
export const goldStars = pgTable(
  "goldstars",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    stationId: integer("stationId"),
    totalGoldStars: integer().notNull().default(0),
    totalYearlyGoldStars: integer().notNull().default(0),
    createdAt: timestamp().notNull().defaultNow(),
  },
  (table) => [index("gold_stars_station_id_idx").on(table.stationId)],
);

// streaks
export const streaks = pgTable(
  "streaks",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    stationId: integer("stationId"),
    lastDaySinceGoldStar: timestamp(),
    longestHotStreak: integer().notNull().default(0),
    longestHotYearlyStreak: integer().notNull().default(0),
    currentStreak: integer().notNull().default(0),
    longestColdStreak: integer().notNull().default(0),
    longestColdYearlyStreak: integer().notNull().default(0),
    createdAt: timestamp().notNull().defaultNow(),
  },
  (table) => [index("streaks_station_id_idx").on(table.stationId)],
);

// hourly data
export const hourlyData = pgTable(
  "hourly_data",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    stationId: integer("stationId"),
    recordedAt: timestamp().notNull(),
    weatherData: jsonb().notNull(),
    hasGoldStar: boolean().notNull().default(false),
  },
  (table) => [index("hourly_data_station_id_idx").on(table.stationId)],
);

// daily data
export const dailyData = pgTable(
  "daily_data",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    stationId: integer("stationId"),
    recordedAt: timestamp().notNull(),
    weatherStatus: weatherStatusEnum("weather_status").notNull().default("none"),
  },
  (table) => [index("daily_data_station_id_idx").on(table.stationId)],
);

// award
export const awards = pgTable(
  "awards",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    title: varchar().notNull(),
    year: integer().notNull(),
    awardType: awardTypeEnum("award_type").notNull(),
    stationId: integer("stationId"),
    createdAt: timestamp().notNull().defaultNow(),
  },
  (table) => [index("awards_station_id_idx").on(table.stationId)],
);
