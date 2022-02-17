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
      // drop all tables, in the correct order
      try {
        await client.query(`

      DROP TABLE IF EXISTS users;
      `);
        console.log("-> TABLES DROPPED");
      } catch (error) {
        console.error(error);
        console.error("ERROR DROPPING TABLES <-");
      }
    }

    async function createTables() {
      console.log("---CREATING TABLES---");
      // create all tables, in the correct order

      try {
        await client.query(`
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  first_name TEXT NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(10)
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
