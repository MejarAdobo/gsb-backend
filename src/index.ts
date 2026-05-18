import { Hono } from "hono";
import { honoConfig } from "@configs/hono.config.ts";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono");
});

export default {
  port: honoConfig.port,
  fetch: app.fetch,
};
