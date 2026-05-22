import { eq } from "drizzle-orm";
import { hourlyData, dailyData, streaks, goldStars } from "@db/schema";
import { db } from "@db";

type ParsedData = {
  temp: string;
  wind: string;
  gust: string;
  windDir: string;
  dew: string;
  precipRate: string;
  precipAccum: string;
  pressure: string;
  humidity: string;
  hasGoldStar: boolean;
};

type GoldStarStatus = "gain" | "lose" | "maintain" | "none";

// send hourly data into the database
export async function sendHourlyData(data: ParsedData, stationId: number) {
  return await db.insert(hourlyData).values({
    stationId: stationId,
    weatherData: data,
    hasGoldStar: data.hasGoldStar,
  });
}

// send daily data into the database
export async function sendDailyData(goldStarStatus: GoldStarStatus, stationId: number) {
  return await db.insert(dailyData).values({
    stationId: stationId,
    goldStarStatus: goldStarStatus,
  });
}

// update a station streak
export async function updateStreak(
  stationId: number,
  currentStreak: number,
  longestHotStreak: number,
  longestHotYearlyStreak: number,
  longestColdStreak: number,
  longestColdYearlyStreak: number,
) {
  return await db
    .update(streaks)
    .set({
      currentStreak: currentStreak,
      longestHotStreak: longestHotStreak,
      longestHotYearlyStreak: longestHotYearlyStreak,
      longestColdStreak: longestColdStreak,
      longestColdYearlyStreak: longestColdYearlyStreak,
    })
    .where(eq(streaks.stationId, stationId));
}

// update a station gold stars stat
export async function updateGoldStar(
  stationId: number,
  totalGoldStars: number,
  totalYearlyGoldStars: number,
  lastDaySinceGoldStar: Date,
) {
  return await db
    .update(goldStars)
    .set({
      totalGoldStars: totalGoldStars,
      totalYearlyGoldStars: totalYearlyGoldStars,
      lastDaySinceGoldStar: lastDaySinceGoldStar.toISOString(),
    })
    .where(eq(goldStars.stationId, stationId));
}
