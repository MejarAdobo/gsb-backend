import { honoConfig } from "@configs";
import { api } from "@routes";
import { Hono } from "hono";
import { rateLimiter } from "hono-rate-limiter";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";

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
  port: honoConfig.port,
  fetch: app.fetch,
};
