import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  development: {
    client: "mysql2",
    connection: {
      host: "localhost",
      user: "root",
      password: "rootpassword",
      database: "easydrop",
    },
    migrations: {
      directory: join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: join(__dirname, "src", "db", "seeds"),
    },
    pool: { min: 2, max: 10 }, // Ensures connection pooling
    useNullAsDefault: true,
  },
};
