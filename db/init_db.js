const {
  client,
  user,
  // declare your model imports here
  // for example, User
} = require("./");

async function dropTables() {
  await client.query(`
  DROP TABLE IF EXISTS users;
  `);
}

async function createTables() {
  await client.query(`
   CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        first_name TEXT NOT NULL,
        email  VARCHAR(255),
        phone INTEGER,
    );
  `);
}

async function buildTables() {
  try {
    client.connect();
    // drop tables in correct order
    await dropTables();
    // build tables in correct order
    await createTables();
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    const user1 = await user.createUser({
      username: "albert",
      password: "bertie99",
      first_name: "Alberto",
      email: "albert123@tets.com",
      phone: 1124977,
    });
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
