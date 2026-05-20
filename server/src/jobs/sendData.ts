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

export async function sendHourlyData(data: ParsedData, stationId: number) {
  return await db.insert(hourlyData).values({
    stationId: stationId,
    weatherData: data,
    hasGoldStar: data.hasGoldStar,
  });
}

export async function sendDailyData(goldStarStatus: GoldStarStatus, stationId: number) {
  return await db.insert(dailyData).values({
    stationId: stationId,
    goldStarStatus: goldStarStatus,
  });
}
