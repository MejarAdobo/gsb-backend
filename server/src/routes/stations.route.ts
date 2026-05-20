import { stationsService } from "@services";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

// id regex
const idRegex = /^[0-9]+$/;

const station = new Hono();

station.get("/", async (c) => {
  try {
    const stations = await stationsService.getAll();

    // no stations yet
    if (!stations) {
      throw new HTTPException(404, { message: "No stations found" });
    }

    return c.json({ data: stations }, 200);
  } catch (error) {
    if (error instanceof HTTPException) {
      return c.json({ error: error.message });
    } else {
      return c.json({ error: "An unknown error occurred" });
    }
  }
});

station.get("/:id", async (c) => {
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

    const station = await stationsService.getOne(id);

    // no station found
    if (!station) {
      throw new HTTPException(404, { message: `No station found for ID: ${id}` });
    }

    return c.json({ data: station }, 200);
  } catch (error) {
    if (error instanceof HTTPException) {
      return c.json({ error: error.message });
    } else {
      return c.json({ error: "An unknown error occurred" });
    }
  }
});

export default station;
