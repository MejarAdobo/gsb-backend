import { db } from "@db";

import type { StreakRow, GoldStarRow } from "./helper";

import { getParsedData, grantStatus, changeStreak, changeGoldStar } from "./helper";
import { sendHourlyData, sendDailyData } from "./sendData";
import { updateGoldStar, updateStreak } from "./updateData";

// gather hourly data of all stations
export async function gatherHourlyData() {
  // each func has this now since this used to be a global scope but it cost cache issue
  const stations = await db.query.stations.findMany();
  if (stations.length === 0) return;

  // remember that foreach is not nice with async/await so I got Gemini to make me a promise all since Im lazy
  const tasks = stations.map(async (station) => {
    const parsedData = await getParsedData(station.wuId);

    if (parsedData) {
      await sendHourlyData(parsedData, station.id);
    }

    console.log(`Station [${station.name}] has their hourly data sent`);
  });
  await Promise.all(tasks);
}

// gather daily data of all stations
export async function gatherDailyData() {
  const stations = await db.query.stations.findMany();
  if (stations.length === 0) return;

  const tasks = stations.map(async (station) => {
    const parsedData = await getParsedData(station.wuId);

    if (parsedData) {
      const status = await grantStatus(station.id, parsedData.hasGoldStar);
      await sendDailyData(status, station.id);
    }

    console.log(`Station [${station.name}] has their daily data sent`);
  });

  await Promise.all(tasks);
}

// update all station's streak
export async function updateStationsStreak() {
  const stations = await db.query.stations.findMany();
  if (stations.length === 0) return;

  const tasks = stations.map(async (station) => {
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

      console.log(
        `Station [${station.name}] has their streak updated: Current Streak: ${updatedStreak.currentStreak}, Longest Hot Streak: ${updatedStreak.longestHotStreak}, Longest Hot Yearly Streak: ${updatedStreak.longestHotYearlyStreak}, Longest Cold Streak: ${updatedStreak.longestColdStreak}, Longest Cold Yearly Streak: ${updatedStreak.longestColdYearlyStreak}`,
      );
    }
  });

  await Promise.all(tasks);
}

//  update all station's gold star data
export async function updateStationsGoldStar() {
  const stations = await db.query.stations.findMany();
  if (stations.length === 0) return;

  const tasks = stations.map(async (station) => {
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
      console.log(
        `Station [${station.name}] has their gold stars stats updated: Total Gold Stars: ${updatedGoldStar.totalGoldStars}, Total Yearly Gold Stars: ${updatedGoldStar.totalYearlyGoldStars}, Last Day Since Gold Star: ${updatedGoldStar.lastDaySinceGoldStar}`,
      );
    }
  });

  await Promise.all(tasks);
}
