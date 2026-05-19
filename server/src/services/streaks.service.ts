import { db } from "@db";

// get all streaks
async function getAll() {
  try {
    const streaks = await db.query.streaks.findMany({
      with: {
        station: true,
      },
    });
    return streaks;
  } catch (error) {
    if (error instanceof Error) {
      return `Failed to fetch all streaks: ${error.message}`;
    } else {
      return `An unknown error occurred: ${error}`;
    }
  }
}

// get all streaks of a specific station
async function getAllByStation(id: number) {
  try {
    const streaks = await db.query.streaks.findMany({
      where: {
        stationId: id,
      },
      with: {
        station: true,
      },
    });
    return streaks;
  } catch (error) {
    if (error instanceof Error) {
      return `Failed to fetch all streaks: ${error.message}`;
    } else {
      return `An unknown error occurred: ${error}`;
    }
  }
}

// get one streak
async function getOne(id: number) {
  try {
    const streak = await db.query.streaks.findMany({
      where: {
        id: id,
      },
      with: {
        station: true,
      },
    });
    return streak;
  } catch (error) {
    if (error instanceof Error) {
      return `Failed to fetch streak: ${error.message}`;
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
