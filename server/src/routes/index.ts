import { Hono } from "hono";

import AwardsRoute from "./awards.route.ts";
import DailyDataRoute from "./dailyData.route.ts";
import GoldStarsRoute from "./goldStars.route.ts";
import HourlyDataRoute from "./hourlyData.route.ts";
import StationsRoute from "./stations.route.ts";
import StreaksRoute from "./streaks.route.ts";

const api = new Hono();

// routes
api.route("/awards", AwardsRoute);
api.route("/stations", StationsRoute);
api.route("/dailydata", DailyDataRoute);
api.route("/goldstars", GoldStarsRoute);
api.route("/hourlydata", HourlyDataRoute);
api.route("/streaks", StreaksRoute);

//  error handler
api.onError((err, c) => {
  return c.json(
    {
      apiError: true,
      message: err.message,
    },
    500,
  );
});

api.get("/error", () => {
  throw new Error("API error");
});

export { api };
