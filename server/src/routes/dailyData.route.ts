import { dailyDataService } from "@services";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

// id regex
const idRegex = /^[0-9]+$/;

const dailyData = new Hono();

dailyData.get("/", async (c) => {
  try {
    const dailyData = await dailyDataService.getAll();

    // no daily data yet
    if (!dailyData) {
      throw new HTTPException(404, { message: "No daily data found" });
    }

    return c.json({ data: dailyData }, 200);
  } catch (error) {
    if (error instanceof HTTPException) {
      return c.json({ error: error.message });
    } else {
      return c.json({ error: "An unknown error occurred" });
    }
  }
});

dailyData.get("/station/:id", async (c) => {
  try {
    const id = Number(c.req.param("id"));

    // check if id exist
    if (!id) {
      throw new HTTPException(400, { message: "ID is required" });
    }

    // validate id
    if (!idRegex.test(id.toString())) {
      throw new HTTPException(400, { message: "Invalid ID" });
    }

    const dailyData = await dailyDataService.getAllByStation(id);

    // no daily data for this station
    if (!dailyData) {
      throw new HTTPException(404, { message: "No daily data found for station ID" });
    }

    return c.json({ data: dailyData }, 200);
  } catch (error) {
    if (error instanceof HTTPException) {
      return c.json({ error: error.message });
    } else {
      return c.json({ error: "An unknown error occurred" });
    }
  }
});

dailyData.get("/:id", async (c) => {
  try {
    const id = Number(c.req.param("id"));

    // check if id exist
    if (!id) {
      throw new HTTPException(400, { message: "ID is required" });
    }

    // validate id
    if (!idRegex.test(id.toString())) {
      throw new HTTPException(400, { message: "Invalid ID" });
    }

    const dailyData = await dailyDataService.getOne(id);

    // no daily data found
    if (!dailyData) {
      throw new HTTPException(404, { message: `No daily data found for ID: ${id}` });
    }

    return c.json({ data: dailyData }, 200);
  } catch (error) {
    if (error instanceof HTTPException) {
      return c.json({ error: error.message });
    } else {
      return c.json({ error: "An unknown error occurred" });
    }
  }
});

export default dailyData;
