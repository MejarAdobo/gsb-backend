import { Hono } from "hono";
import { honoConfig } from "@configs";
import { rateLimiter } from "hono-rate-limiter";

const app = new Hono();

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

app.get("/", (c) => {
  return c.text("Hello Hono");
});

export default {
  port: honoConfig.port,
  fetch: app.fetch,
};
