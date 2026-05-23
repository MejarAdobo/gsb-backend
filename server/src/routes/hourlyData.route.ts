import { hourlyDataService } from "@services";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

// id regex
const idRegex = /^[0-9]+$/;

const hourlyDataRouter = new Hono();

hourlyDataRouter.get("/", async (c) => {
  try {
    const hourlyData = await hourlyDataService.getAll();

    // no hourly data yet
    if (!hourlyData) {
      throw new HTTPException(404, { message: "No hourly data found" });
    }

    return c.json({ data: hourlyData }, 200);
  } catch (error) {
    if (error instanceof HTTPException) {
      return c.json({ error: error.message });
    } else {
      return c.json({ error: "An unknown error occurred" });
    }
  }
});

hourlyDataRouter.get("/station/:id", async (c) => {
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

    const hourlyData = await hourlyDataService.getAllByStation(id);

    // no hourly data for this station
    if (!hourlyData) {
      throw new HTTPException(404, { message: "No hourly data found for station ID" });
    }

    return c.json({ data: hourlyData }, 200);
  } catch (error) {
    if (error instanceof HTTPException) {
      return c.json({ error: error.message });
    } else {
      return c.json({ error: "An unknown error occurred" });
    }
  }
});

hourlyDataRouter.get("/:id", async (c) => {
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

    const hourlyData = await hourlyDataService.getOne(id);

    // no hourly data found
    if (!hourlyData) {
      throw new HTTPException(404, { message: `No hourly data found for ID: ${id}` });
    }

    return c.json({ data: hourlyData }, 200);
  } catch (error) {
    if (error instanceof HTTPException) {
      return c.json({ error: error.message });
    } else {
      return c.json({ error: "An unknown error occurred" });
    }
  }
});

export default hourlyDataRouter;
