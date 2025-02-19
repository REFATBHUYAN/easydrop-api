import knex from "knex";
import knexConfig from "../../knexfile.js"; // Import knex config

const db = knex(knexConfig.development);

export default db;
