import { drizzle } from "drizzle-orm/node-postgres";
import { dbConfig } from "@configs";

const db = drizzle(dbConfig.connectionString!);

export { db };
