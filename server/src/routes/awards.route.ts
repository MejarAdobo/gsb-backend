import { awardsService } from "@services";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

// id regex
const idRegex = /^[0-9]+$/;

const award = new Hono();

award.get("/", async (c) => {
  try {
    const awards = await awardsService.getAll();

    // no awards yet
    if (!awards) {
      throw new HTTPException(404, { message: "No awards found" });
    }

    return c.json({ data: awards }, 200);
  } catch (error) {
    if (error instanceof HTTPException) {
      return c.json({ error: error.message });
    } else {
      return c.json({ error: "An unknown error occurred" });
    }
  }
});

award.get("/station/:id", async (c) => {
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

    const awards = await awardsService.getAllByStation(id);

    // no awards for this station
    if (!awards) {
      throw new HTTPException(404, { message: "No awards found for station ID" });
    }

    return c.json({ data: awards }, 200);
  } catch (error) {
    if (error instanceof HTTPException) {
      return c.json({ error: error.message });
    } else {
      return c.json({ error: "An unknown error occurred" });
    }
  }
});

award.get("/:id", async (c) => {
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

    const award = await awardsService.getOne(id);

    // no award found
    if (!award) {
      throw new HTTPException(404, { message: `No award found for ID: ${id}` });
    }

    return c.json({ data: award }, 200);
  } catch (error) {
    if (error instanceof HTTPException) {
      return c.json({ error: error.message });
    } else {
      return c.json({ error: "An unknown error occurred" });
    }
  }
});

export default award;
