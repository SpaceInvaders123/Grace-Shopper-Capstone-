// Connect to DB
const { Client } = require("pg");

// change the DB_NAME string to whatever your group decides on
const DB_NAME = "capstone-dev";

const DB_URL =
  process.env.DATABASE_URL || `postgres://localhost:5432/${DB_NAME}`;

const client = new Client({
  connectionString: DB_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : undefined,
});

// database methods

// export
module.exports = {
  client,
};
