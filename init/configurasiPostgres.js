import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  host: "localhost",
  user: "postgres",
  database: "nutech_tests",
  password: "kawasanzombi1998",
  port: 5432,
});
