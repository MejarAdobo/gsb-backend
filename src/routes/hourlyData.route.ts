import hourlyDataService from "@services/hourlyData.service";
import { Hono } from "hono";

const hourlyData = new Hono();

hourlyData.get("/", async (c) => {
  try {
    const hourlyData = await hourlyDataService.getAll();
    return c.json({ data: hourlyData }, 200);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 500);
    } else {
      return c.json({ error: "An unknown error occurred" }, 500);
    }
  }
});

hourlyData.get("/:stationId", async (c) => {
  try {
    const stationId = Number(c.req.param("stationId"));
    const hourlyData = await hourlyDataService.getAllByStation(stationId);
    return c.json({ data: hourlyData }, 200);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 500);
    } else {
      return c.json({ error: "An unknown error occurred" }, 500);
    }
  }
});

hourlyData.get("/:id", async (c) => {
  try {
    const id = Number(c.req.param("id"));
    const hourlyData = await hourlyDataService.getOne(id);
    return c.json({ data: hourlyData }, 200);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 500);
    } else {
      return c.json({ error: "An unknown error occurred" }, 500);
    }
  }
});

export default hourlyData;
