import dotenv from "dotenv";
dotenv.config();

const { dbConfig } = await import("./db.config.ts");
const { honoConfig } = await import("./hono.config.ts");

export { dbConfig, honoConfig };
