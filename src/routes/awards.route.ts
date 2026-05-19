import awardsService from "@services/awards.service";
import { Hono } from "hono";

const award = new Hono();

award.get("/", async (c) => {
  try {
    const awards = await awardsService.getAll();
    return c.json({ data: awards }, 200);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 500);
    } else {
      return c.json({ error: "An unknown error occurred" }, 500);
    }
  }
});

award.get("/:stationId", async (c) => {
  try {
    const stationId = Number(c.req.param("stationId"));
    const award = await awardsService.getAllByStation(stationId);
    return c.json({ data: award }, 200);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 500);
    } else {
      return c.json({ error: "An unknown error occurred" }, 500);
    }
  }
});

award.get("/:id", async (c) => {
  try {
    const id = Number(c.req.param("id"));
    const award = await awardsService.getOne(id);
    return c.json({ data: award }, 200);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 500);
    } else {
      return c.json({ error: "An unknown error occurred" }, 500);
    }
  }
});

export default award;
