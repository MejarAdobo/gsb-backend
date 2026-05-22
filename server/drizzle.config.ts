import { defineConfig } from "drizzle-kit";
import { dbConfig } from "@configs";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: ".drizzle",
  dbCredentials: {
    url: dbConfig.connectionString,
  },
  schemaFilter: ["public"],
});
