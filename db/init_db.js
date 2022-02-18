const {
  client,
  user,
  // declare your model imports here
  // for example, User
} = require("./");
const { createSock_category } = require("./models/sock_category");

const { createUser } = require("./models/user");

async function buildTables() {
  try {
    client.connect();
    // drop tables in correct order
    await client.query(`
    DROP TABLE IF EXISTS users, sock_category;
    DROP TYPE IF EXISTS sock_style;
    `);
    // build tables in correct order
    await client.query(`
    CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  first_name TEXT NOT NULL,
  email VARCHAR(255)
);

CREATE TYPE sock_style AS ENUM('no-show', 'quarter', 'knee-high');
CREATE TABLE sock_category (
  id SERIAL PRIMARY KEY,
  style sock_style NOT NULL
);
`);
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    const usersToCreate = [
      {
        username: "albert",
        password: "bertie99",
        first_name: "Alberto",
        email: "albert123@tets.com",
      },
    ];
    const users = await Promise.all(usersToCreate.map(createUser));
    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })
    const sock_categoryToCreate = [{ style: "no-show" }];
    const sock_style = await Promise.all(
      sock_categoryToCreate.map(createSock_category)
    );
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
