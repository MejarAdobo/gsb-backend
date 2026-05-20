import AwardsRoute from "./awards.route.ts";
import StationsRoute from "./stations.route.ts";
import DailyDataRoute from "./dailyData.route.ts";
import GoldStarsRoute from "./goldStars.route.ts";
import HourlyDataRoute from "./hourlyData.route.ts";
import StreaksRoute from "./streaks.route.ts";
import { Hono } from "hono";

const api = new Hono();

api.route("/awards", AwardsRoute);
api.route("/stations", StationsRoute);
api.route("/dailyData", DailyDataRoute);
api.route("/goldStars", GoldStarsRoute);
api.route("/hourlyData", HourlyDataRoute);
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
