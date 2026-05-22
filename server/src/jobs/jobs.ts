import { sendHourlyData, sendDailyData } from "./sendData";
import { updateGoldStar, updateStreak } from "./updateData";
import { db } from "@db";
import { getParsedData, grantStatus } from "./helper";

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
