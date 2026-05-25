import { dbConfig } from "@configs";
import { drizzle } from "drizzle-orm/node-postgres";

import { relations } from "./relations";

const db = drizzle(dbConfig.connectionString!, { relations });

export { db };
