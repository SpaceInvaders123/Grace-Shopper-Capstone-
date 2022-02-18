const {
  client,
  user,
  // declare your model imports here
  // for example, User
} = require("./");
const { createSock_Inventory } = require("./models/socks_Inventory");

const { createUser } = require("./models/user");

async function buildTables() {
  try {
    client.connect();
    // drop tables in correct order
    await client.query(`
    DROP TABLE IF EXISTS users, sock_inventory;
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
    CREATE TABLE sock_inventory (
  id SERIAL PRIMARY KEY,
  quantity INTEGER DEFAULT 0
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
    const sock_inventoryToCreate = [
      {
        quantity: 100,
      },
    ];
    const sock_inventory = await Promise.all(
      sock_inventoryToCreate.map(createSock_Inventory)
    );
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
