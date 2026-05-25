import { streaksService } from "@services";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

// id regex
const idRegex = /^[0-9]+$/;

const streakRouter = new Hono();

streakRouter.get("/", async (c) => {
  try {
    const streaks = await streaksService.getAll();

    // no streaks yet
    if (!streaks) {
      throw new HTTPException(404, { message: "No streaks found" });
    }

    return c.json({ data: streaks }, 200);
  } catch (error) {
    if (error instanceof HTTPException) {
      return c.json({ error: error.message });
    } else {
      return c.json({ error: "An unknown error occurred" });
    }
  }
});

streakRouter.get("/station/:id", async (c) => {
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

    const streaks = await streaksService.getAllByStation(id);

    // no streaks for this station
    if (!streaks) {
      throw new HTTPException(404, { message: "No streaks found for station ID" });
    }

    return c.json({ data: streaks }, 200);
  } catch (error) {
    if (error instanceof HTTPException) {
      return c.json({ error: error.message });
    } else {
      return c.json({ error: "An unknown error occurred" });
    }
  }
});

streakRouter.get("/:id", async (c) => {
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

    const streak = await streaksService.getOne(id);

    // no streak found
    if (!streak) {
      throw new HTTPException(404, { message: `No streak found for ID: ${id}` });
    }

    return c.json({ data: streak }, 200);
  } catch (error) {
    if (error instanceof HTTPException) {
      return c.json({ error: error.message });
    } else {
      return c.json({ error: "An unknown error occurred" });
    }
  }
});

export default streakRouter;
