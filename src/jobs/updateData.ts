import { db } from "@db";
import { streaks, goldStars } from "@db/schema";
import { eq } from "drizzle-orm";

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
  lastDaySinceGoldStar: Date | null,
) {
  return await db
    .update(goldStars)
    .set({
      totalGoldStars: totalGoldStars,
      totalYearlyGoldStars: totalYearlyGoldStars,
      lastDaySinceGoldStar: lastDaySinceGoldStar?.toISOString() ?? null,
    })
    .where(eq(goldStars.stationId, stationId));
}
