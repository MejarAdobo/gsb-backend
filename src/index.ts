import { honoConfig } from "@configs";
import {
  gatherHourlyData,
  gatherDailyData,
  updateStationsStreak,
  updateStationsGoldStar,
  deleteOldHourlyData,
} from "@jobs";
import { api } from "@routes";
import { Hono } from "hono";
import { rateLimiter } from "hono-rate-limiter";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";

// scheduled jobs
Bun.cron("@hourly", gatherHourlyData);
Bun.cron("@midnight", deleteOldHourlyData);
Bun.cron("50 23 * * * ", gatherDailyData);
Bun.cron("55 23 * * * ", updateStationsStreak);
Bun.cron("55 23 * * * ", updateStationsGoldStar);

const app = new Hono();

// render health checks
app.get("/healthz", (c) => {
  return c.text(":)", 200);
});

// rate-limiter middleware
app.use(
  rateLimiter({
    windowMs: 30 * 60 * 1000, // 30 mins
    limit: 50,
    keyGenerator: (c) => c.req.header("x-forwarded-for") ?? "",
    message: { error: "Too many requests", retryAfter: "30 minutes" },
    statusCode: 429,
    skipFailedRequests: true,
  }),
);

// cors middleware
app.use("/api/*", cors({ allowMethods: ["GET"] }));

// pretty json middleware
app.use(prettyJSON());

// api routes
app.route("/api", api);

// not found
app.notFound((c) => {
  return c.json(
    {
      error: "Not Found",
      path: c.req.path,
      method: c.req.method,
    },
    404,
  );
});

export default {
  port: honoConfig.port || process.env.PORT || 3000,
  hostname: "0.0.0.0",
  fetch: app.fetch,
};
