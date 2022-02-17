const {
  client,
  // declare your model imports here
  // for example, User
} = require("./client");

const { createUser } = require("./models/user.js");

async function buildTables() {
  try {
    client.connect();

    async function dropTables() {
      console.log("---DROPPING TABLES---");

      try {
        await client.query(`

      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS admins;
      DROP TABLE IF EXISTS addresses;
      DROP TABLE IF EXISTS user_address;
      DROP TABLE IF EXISTS sock_category;
      DROP TABLE IF EXISTS sock_inventory;
      DROP TABLE IF EXISTS socks;
      DROP TABLE IF EXISTS order_details;
      DROP TABLE IF EXISTS order_items;
      DROP TABLE IF EXISTS payment_details;
      `);
        console.log("-> TABLES DROPPED");
      } catch (error) {
        console.error(error);
        console.error("ERROR DROPPING TABLES <-");
      }
    }

    async function createTables() {
      console.log("---CREATING TABLES---");

      try {
        await client.query(`
CREATE TABLE USERS (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  first_name TEXT NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(10)
);
    `);
        await client.query(`
CREATE TABLE admins (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users (id)
);
    `);
        await client.query(`
CREATE TABLE addresses (
  id SERIAL PRIMARY KEY,
  address_line VARCHAR(255) NOT NULL, 
  state VARCHAR(2) NOT NULL, 
  city VARCHAR(255) NOT NULL, 
  zipcode VARCHAR(5) NOT NULL
);
    `);
        await client.query(`
CREATE TABLE user_address (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users (id),
  address_id INTEGER REFERENCES addresses (id),
  created_at DATE DEFAULT now()
);
    `);
        await client.query(`
CREATE TABLE sock_category (
  id SERIAL PRIMARY KEY,
  style sock_style NOT NULL
);
    `);
        await client.query(`
CREATE TABLE sock_inventory (
  id SERIAL PRIMARY KEY,
  quantity INTEGER DEFAULT 0
);
    `);
        await client.query(`
CREATE TABLE socks (
  id SERIAL PRIMARY KEY,
  category_id INTEGER REFERENCES sock_category (id),
  inventory_id INTEGER REFERENCES sock_inventory (id),
  name VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL, -- EVERYTHING IS A PENNY :)
  size VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  product_img TEXT, -- maybe think about TEXT as URL                              
  created_at DATE DEFAULT now()
);
    `);
        await client.query(`
CREATE TABLE order_details (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users (id),
  total INTEGER, -- pin this for later :)
  created_at DATE DEFAULT now()
);
    `);
        await client.query(`
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES order_details (id),
  product_id INTEGER REFERENCES socks (id),
  quantity INTEGER NOT NULL,
  created_at DATE DEFAULT now()
);
    `);
        await client.query(`
CREATE TABLE payment_details (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES order_details (id),
  amount INTEGER, -- THIS I LIKE :)
  status payment_status NOT NULL 
);
    `);
        console.log("-> TABLES CREATED");
      } catch (error) {
        console.error("ERROR CREATING TABLES <-");
      }
    }
    await dropTables();
    await createTables();
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data by leveraging your
    async function createInitialUsers() {
      console.log("---CREATING USERS---");
      try {
        const createdUsers = [
          {
            username: "William",
            password: "Andrew",
            first_name: "Hayden",
            email: "Erika@spaceinvaders.com",
            phone: "4055555555",
          },
        ];

        const users = await Promise.all(createdUsers.map(createUser));

        console.log("-> USERS CREATED:");
        console.log(users);
        console.log("---ALL USERS CREATED---");
      } catch (error) {
        console.error("ERROR CREATING USERS <-");
      }
    }
    await createInitialUsers();
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
