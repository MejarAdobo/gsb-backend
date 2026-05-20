import { db } from "@db";

// get all hourly data
async function getAll() {
  try {
    const hourlyData = await db.query.hourlyData.findMany({
      with: {
        station: true,
      },
    });
    return hourlyData;
  } catch (error) {
    if (error instanceof Error) {
      return `Failed to fetch all hourly data: ${error.message}`;
    } else {
      return `An unknown error occurred: ${error}`;
    }
  }
}

// get all hourly data of a specific station
async function getAllByStation(id: number) {
  try {
    const hourlyData = await db.query.hourlyData.findMany({
      where: {
        stationId: id,
      },
      with: {
        station: true,
      },
    });
    return hourlyData;
  } catch (error) {
    if (error instanceof Error) {
      return `Failed to fetch all hourly data: ${error.message}`;
    } else {
      return `An unknown error occurred: ${error}`;
    }
  }
}

// get one hourly data
async function getOne(id: number) {
  try {
    const hourlyData = await db.query.hourlyData.findMany({
      where: {
        id: id,
      },
      with: {
        station: true,
      },
    });
    return hourlyData;
  } catch (error) {
    if (error instanceof Error) {
      return `Failed to fetch hourly data: ${error.message}`;
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
