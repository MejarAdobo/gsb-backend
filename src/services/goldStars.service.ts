import { db } from "@db";

// get all gold stars data
async function getAll() {
  try {
    const goldStars = await db.query.goldStars.findMany({
      with: {
        station: true,
      },
    });
    return goldStars;
  } catch (error) {
    if (error instanceof Error) {
      return `Failed to fetch all gold stars data: ${error.message}`;
    } else {
      return `An unknown error occurred: ${error}`;
    }
  }
}

// get all gold stars data of a specific station
async function getAllByStation(id: number) {
  try {
    const goldStars = await db.query.goldStars.findMany({
      where: {
        stationId: id,
      },
      with: {
        station: true,
      },
    });
    return goldStars;
  } catch (error) {
    if (error instanceof Error) {
      return `Failed to fetch all gold stars data: ${error.message}`;
    } else {
      return `An unknown error occurred: ${error}`;
    }
  }
}

// get one gold stars data
async function getOne(id: number) {
  try {
    const goldStars = await db.query.goldStars.findMany({
      where: {
        id: id,
      },
      with: {
        station: true,
      },
    });
    return goldStars;
  } catch (error) {
    if (error instanceof Error) {
      return `Failed to fetch gold stars data: ${error.message}`;
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
