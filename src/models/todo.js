import knex from "../db/knex.js"; // Import Knex instance

export const todos = () => knex("todos"); // Function to access the `todos` table
