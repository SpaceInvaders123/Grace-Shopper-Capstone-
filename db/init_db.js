const {
  client,
  user,
  // declare your model imports here
  // for example, User
} = require("./");

const { createUser } = require("./models/user");

async function buildTables() {
  try {
    client.connect();
    // drop tables in correct order
    await client.query(`
    DROP TABLE IF EXISTS users, socks;
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
    CREATE TABLE socks (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL, -- EVERYTHING IS A PENNY :)
  size VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  product_img TEXT,                      
  created_at DATE DEFAULT now()
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
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
