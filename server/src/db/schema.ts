import {
  jsonb,
  integer,
  boolean,
  pgTable,
  varchar,
  timestamp,
  pgEnum,
  date,
  index,
} from "drizzle-orm/pg-core";

// enums
export const goldStarStatusEnum = pgEnum("gold_star_status", ["gain", "lose", "maintain", "none"]);
export const awardTypeEnum = pgEnum("award_type", [
  "hot_streak",
  "cold_streak",
  "most_gold_star",
  "least_gold_star",
]);

// stations
export const stations = pgTable("stations", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  wuId: varchar({ length: 255 }).notNull().unique(),
  createdAt: date().notNull().defaultNow(),
});

// goldstars
export const goldStars = pgTable(
  "goldstars",
  {
    stationId: integer("stationId")
      .primaryKey()
      .references(() => stations.id, { onDelete: "cascade" }),
    totalGoldStars: integer().notNull().default(0),
    totalYearlyGoldStars: integer().notNull().default(0),
    lastDaySinceGoldStar: date(),
    createdAt: date().notNull().defaultNow(),
  },
  (table) => [index("gold_stars_station_id_idx").on(table.stationId)],
);

// streaks
export const streaks = pgTable(
  "streaks",
  {
    stationId: integer("stationId")
      .primaryKey()
      .references(() => stations.id, { onDelete: "cascade" }),
    currentStreak: integer().notNull().default(0),
    longestHotStreak: integer().notNull().default(0),
    longestHotYearlyStreak: integer().notNull().default(0),
    longestColdStreak: integer().notNull().default(0),
    longestColdYearlyStreak: integer().notNull().default(0),
    createdAt: date().notNull().defaultNow(),
  },
  (table) => [index("streaks_station_id_idx").on(table.stationId)],
);

// hourly data
export const hourlyData = pgTable(
  "hourly_data",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    stationId: integer("stationId").references(() => stations.id, { onDelete: "cascade" }),
    weatherData: jsonb().notNull(),
    hasGoldStar: boolean().notNull().default(false),
    recordedAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("hourly_data_station_id_idx").on(table.stationId)],
);

// daily data
export const dailyData = pgTable(
  "daily_data",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    stationId: integer("stationId").references(() => stations.id, { onDelete: "cascade" }),
    goldStarStatus: goldStarStatusEnum("gold_star_status").notNull().default("none"),
    recordedAt: date({ mode: "date" }).notNull().defaultNow(),
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
    stationId: integer("stationId").references(() => stations.id, { onDelete: "cascade" }),
    createdAt: date().notNull().defaultNow(),
  },
  (table) => [index("awards_station_id_idx").on(table.stationId)],
);
