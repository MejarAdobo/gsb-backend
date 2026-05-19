import { db } from "@db";

// get all daily data
async function getAll() {
  try {
    const dailyData = await db.query.dailyData.findMany({
      with: {
        station: true,
      },
    });
    return dailyData;
  } catch (error) {
    if (error instanceof Error) {
      return `Failed to fetch all daily data: ${error.message}`;
    } else {
      return `An unknown error occurred: ${error}`;
    }
  }
}

// get all daily data of a specific station
async function getAllByStation(id: number) {
  try {
    const dailyData = await db.query.dailyData.findMany({
      where: {
        stationId: id,
      },
      with: {
        station: true,
      },
    });
    return dailyData;
  } catch (error) {
    if (error instanceof Error) {
      return `Failed to fetch all daily data: ${error.message}`;
    } else {
      return `An unknown error occurred: ${error}`;
    }
  }
}

// get one daily data
async function getOne(id: number) {
  try {
    const dailyData = await db.query.dailyData.findMany({
      where: {
        id: id,
      },
      with: {
        station: true,
      },
    });
    return dailyData;
  } catch (error) {
    if (error instanceof Error) {
      return `Failed to fetch daily data: ${error.message}`;
    } else {
      return `An unknown error occurred: ${error}`;
    }
  }
}

export default {
  getAll,
  getAllByStation,
  getOne,
};
