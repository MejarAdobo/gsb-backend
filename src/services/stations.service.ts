import { db } from "@db";

// get all stations
async function getAll() {
  try {
    const stations = await db.query.stations.findMany({
      with: {
        hourlyData: true,
        dailyData: true,
        awards: true,
      },
    });
    return stations;
  } catch (error) {
    if (error instanceof Error) {
      return `Failed to fetch all stations: ${error.message}`;
    } else {
      return `An unknown error occurred: ${error}`;
    }
  }
}

// get one station
async function getOne(id: number) {
  try {
    const station = await db.query.stations.findMany({
      where: {
        id: id,
      },
      with: {
        hourlyData: true,
        dailyData: true,
        awards: true,
      },
    });
    return station;
  } catch (error) {
    if (error instanceof Error) {
      return `Failed to fetch station: ${error.message}`;
    } else {
      return `An unknown error occurred: ${error}`;
    }
  }
}

export default {
  getAll,
  getOne,
};
