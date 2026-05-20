import { Hono } from "hono";
import { honoConfig } from "@configs";
import { rateLimiter } from "hono-rate-limiter";
import { api } from "@routes";

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

// api routes
app.route("/", api);

export default {
  port: honoConfig.port,
  fetch: app.fetch,
};
