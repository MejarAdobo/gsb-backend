import { db } from "@db";

// get all awards
async function getAll() {
  try {
    const awards = await db.query.awards.findMany({
      with: {
        station: true,
      },
    });
    return awards;
  } catch (error) {
    if (error instanceof Error) {
      return `Failed to fetch all awards: ${error.message}`;
    } else {
      return `An unknown error occurred: ${error}`;
    }
  }
}

// get all awards of a specific station
async function getAllByStation(id: number) {
  try {
    const awards = await db.query.awards.findMany({
      where: {
        stationId: id,
      },
      with: {
        station: true,
      },
    });
    return awards;
  } catch (error) {
    if (error instanceof Error) {
      return `Failed to fetch all awards: ${error.message}`;
    } else {
      return `An unknown error occurred: ${error}`;
    }
  }
}

// get one awards
async function getOne(id: number) {
  try {
    const awards = await db.query.awards.findMany({
      where: {
        id: id,
      },
      with: {
        station: true,
      },
    });
    return awards;
  } catch (error) {
    if (error instanceof Error) {
      return `Failed to fetch award: ${error.message}`;
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
