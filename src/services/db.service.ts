import { drizzle } from "drizzle-orm/node-postgres";
import { dbConfig } from "@configs/db.config";

const db = drizzle(dbConfig.connectionString!);

export { db };
