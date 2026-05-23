import { sendHourlyData, sendDailyData } from "./sendData";
import { updateGoldStar, updateStreak } from "./updateData";
import { db } from "@db";
import { getParsedData, grantStatus, changeStreak, changeGoldStar } from "./helper";
import type { StreakRow, GoldStarRow } from "./helper";

// get all stations
const stations = await db.query.stations.findMany();

// gather hourly data of all stations
export async function gatherHourlyData() {
  stations.forEach(async (station) => {
    const parsedData = await getParsedData(station.wuId);

    if (parsedData) {
      await sendHourlyData(parsedData, station.id);
    }
  });
}

// gather daily data of all stations
export async function gatherDailyData() {
  stations.forEach(async (station) => {
    const parsedData = await getParsedData(station.wuId);

    if (parsedData) {
      const status = await grantStatus(station.id, parsedData.hasGoldStar);
      await sendDailyData(status, station.id);
    }
  });
}

// update all station's streak
export async function updateStationsStreak() {
  stations.forEach(async (station) => {
    // get the station's streak row
    // @ts-expect-error:
    const stationStreak: StreakRow = await db.query.streaks.findFirst({
      where: {
        stationId: station.id,
      },
    });

    const parsedData = await getParsedData(station.wuId);

    if (parsedData) {
      const updatedStreak = changeStreak(parsedData.hasGoldStar, stationStreak);
      await updateStreak(
        station.id,
        updatedStreak.currentStreak,
        updatedStreak.longestHotStreak,
        updatedStreak.longestHotYearlyStreak,
        updatedStreak.longestColdStreak,
        updatedStreak.longestColdYearlyStreak,
      );
    }
  });
}

//  update all station's gold star data
export async function updateStationsGoldStar() {
  stations.forEach(async (station) => {
    // @ts-expect-error:
    const stationGoldStar: GoldStarRow = await db.query.goldStars.findFirst({
      where: {
        stationId: station.id,
      },
    });

    // get the station's status

    const parsedData = await getParsedData(station.wuId);

    if (parsedData) {
      const updatedGoldStar = await changeGoldStar(parsedData.hasGoldStar, stationGoldStar, station.id);
      await updateGoldStar(
        station.id,
        updatedGoldStar.totalGoldStars,
        updatedGoldStar.totalYearlyGoldStars,
        updatedGoldStar.lastDaySinceGoldStar,
      );
    }
  });
}
