import { goldStarsService } from "@services";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

// id regex
const idRegex = /^[0-9]+$/;

const goldStars = new Hono();

goldStars.get("/", async (c) => {
  try {
    const goldStars = await goldStarsService.getAll();

    // no gold stars yet
    if (!goldStars) {
      throw new HTTPException(404, { message: "No gold stars found" });
    }

    return c.json({ data: goldStars }, 200);
  } catch (error) {
    if (error instanceof HTTPException) {
      return c.json({ error: error.message });
    } else {
      return c.json({ error: "An unknown error occurred" });
    }
  }
});

goldStars.get("/station/:id", async (c) => {
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

    const goldStars = await goldStarsService.getAllByStation(id);

    // no gold stars for this station
    if (!goldStars) {
      throw new HTTPException(404, { message: "No gold stars found for station ID" });
    }

    return c.json({ data: goldStars }, 200);
  } catch (error) {
    if (error instanceof HTTPException) {
      return c.json({ error: error.message });
    } else {
      return c.json({ error: "An unknown error occurred" });
    }
  }
});

goldStars.get("/:id", async (c) => {
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

    const goldStar = await goldStarsService.getOne(id);

    // no gold star found
    if (!goldStar) {
      throw new HTTPException(404, { message: `No gold star found for ID: ${id}` });
    }

    return c.json({ data: goldStar }, 200);
  } catch (error) {
    if (error instanceof HTTPException) {
      return c.json({ error: error.message });
    } else {
      return c.json({ error: "An unknown error occurred" });
    }
  }
});

export default goldStars;
