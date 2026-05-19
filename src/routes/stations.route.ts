import stationsService from "@services/stations.service";
import { Hono } from "hono";

const station = new Hono();

station.get("/", async (c) => {
  try {
    const stations = await stationsService.getAll();
    return c.json({ data: stations }, 200);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 500);
    } else {
      return c.json({ error: "An unknown error occurred" }, 500);
    }
  }
});

station.get("/:id", async (c) => {
  try {
    const id = Number(c.req.param("id"));
    const station = await stationsService.getOne(id);
    return c.json({ data: station }, 200);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 500);
    } else {
      return c.json({ error: "An unknown error occurred" }, 500);
    }
  }
});

export default station;
