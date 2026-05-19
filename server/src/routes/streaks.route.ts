import streaksService from "@services/streaks.service";
import { Hono } from "hono";

const streak = new Hono();

streak.get("/", async (c) => {
  try {
    const streaks = await streaksService.getAll();
    return c.json({ data: streaks }, 200);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 500);
    } else {
      return c.json({ error: "An unknown error occurred" }, 500);
    }
  }
});

streak.get("/:stationId", async (c) => {
  try {
    const stationId = Number(c.req.param("stationId"));
    const streak = await streaksService.getAllByStation(stationId);
    return c.json({ data: streak }, 200);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 500);
    } else {
      return c.json({ error: "An unknown error occurred" }, 500);
    }
  }
});

streak.get("/:id", async (c) => {
  try {
    const id = Number(c.req.param("id"));
    const streak = await streaksService.getOne(id);
    return c.json({ data: streak }, 200);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 500);
    } else {
      return c.json({ error: "An unknown error occurred" }, 500);
    }
  }
});

export default streak;
