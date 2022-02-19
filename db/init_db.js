const {
  client,
  user,
  // declare your model imports here
  // for example, User
} = require("./");
const { createSock_category } = require("./models/sock_category");
const { createSock_inventory } = require("./models/sock_inventory");
const { createSocks } = require("./models/socks");
const { createUser } = require("./models/user");
const { createAddresses } = require("./models/addresses");

async function buildTables() {
  try {
    client.connect();
    // drop tables in correct order
    await client.query(`
    DROP TABLE IF EXISTS users, addresses, sock_category, sock_inventory, socks;
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

      CREATE TABLE addresses (
        id SERIAL PRIMARY KEY,
        adress_line VARCHAR(255) NOT NULL,
        state VARCHAR(2) NOT NULL,
        city VARCHAR(255) NOT NULL,
        zipcode VARCHAR(5) NOT NULL
      );

      CREATE TABLE user_address (
        id SERIAL PRIMARY KEY,
        "user_id" INTEGER REFERENCES users (id),
        "adresses_id" INTEGER REFERENCES adresses (id),
        created_at DATE DEFAULT now()
      );

      CREATE TYPE sock_style AS ENUM('no-show', 'quarter', 'knee-high');
      CREATE TABLE sock_category (
        id SERIAL PRIMARY KEY,
        style sock_style NOT NULL
      );
      CREATE TABLE sock_inventory (
          id SERIAL PRIMARY KEY,
          quantity INTEGER DEFAULT 0
      );
      CREATE TABLE socks (
          id SERIAL PRIMARY KEY,
          "category_id" INTEGER REFERENCES sock_category (id),
          "inventory_id" INTEGER REFERENCES sock_inventory (id),
          name VARCHAR(255) NOT NULL,
          price INTEGER NOT NULL, 
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
  // create useful starting data by leveraging your
  // Model.method() adapters to seed your db, for example:
  // const user1 = await User.createUser({ ...user info goes here... })
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

    const socksToCreate = [
      {
        name: "Example Sock",
        category_id: 1,
        inventory_id: 1,
        price: 500,
        size: "Large",
        description:
          "A a garment for the foot and lower part of the leg, typically knitted from wool, cotton, or nylon ",
        product_img: "sockPictureURL.com",
      },
    ];
    const socks = await Promise.all(socksToCreate.map(createSocks));

    const addressesToCreate = [
      {
        adress_line: "42 Wallaby Way",
        state: "TX",
        city: "Burleson",
        zipcode: "76028",
      },
    ];
    const addresses = await Promise.all(addressesToCreate.map(createAddresses));

    const sock_categoryToCreate = [{ style: "no-show" }];
    const sock_style = await Promise.all(
      sock_categoryToCreate.map(createSock_category)
    );
    const sock_inventoryToCreate = [
      {
        quantity: 100,
      },
    ];
    const sock_inventory = await Promise.all(
      sock_inventoryToCreate.map(createSock_inventory)
    );
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
