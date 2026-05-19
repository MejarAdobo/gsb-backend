import dailyDataService from "@services/dailyData.service";
import { Hono } from "hono";

const dailyData = new Hono();

dailyData.get("/", async (c) => {
  try {
    const dailyData = await dailyDataService.getAll();
    return c.json({ data: dailyData }, 200);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 500);
    } else {
      return c.json({ error: "An unknown error occurred" }, 500);
    }
  }
});

dailyData.get("/:stationId", async (c) => {
  try {
    const stationId = Number(c.req.param("stationId"));
    const dailyData = await dailyDataService.getAllByStation(stationId);
    return c.json({ data: dailyData }, 200);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 500);
    } else {
      return c.json({ error: "An unknown error occurred" }, 500);
    }
  }
});

dailyData.get("/:id", async (c) => {
  try {
    const id = Number(c.req.param("id"));
    const dailyData = await dailyDataService.getOne(id);
    return c.json({ data: dailyData }, 200);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 500);
    } else {
      return c.json({ error: "An unknown error occurred" }, 500);
    }
  }
});

export default dailyData;
