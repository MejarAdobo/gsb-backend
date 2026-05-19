import goldStarsService from "@services/goldStars.service";
import { Hono } from "hono";

const goldStars = new Hono();

goldStars.get("/", async (c) => {
  try {
    const goldStars = await goldStarsService.getAll();
    return c.json({ data: goldStars }, 200);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 500);
    } else {
      return c.json({ error: "An unknown error occurred" }, 500);
    }
  }
});

goldStars.get("/:stationId", async (c) => {
  try {
    const stationId = Number(c.req.param("stationId"));
    const goldStars = await goldStarsService.getAllByStation(stationId);
    return c.json({ data: goldStars }, 200);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 500);
    } else {
      return c.json({ error: "An unknown error occurred" }, 500);
    }
  }
});

goldStars.get("/:id", async (c) => {
  try {
    const id = Number(c.req.param("id"));
    const goldStars = await goldStarsService.getOne(id);
    return c.json({ data: goldStars }, 200);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 500);
    } else {
      return c.json({ error: "An unknown error occurred" }, 500);
    }
  }
});

export default goldStars;
