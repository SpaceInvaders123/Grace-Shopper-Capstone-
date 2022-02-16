const {
  client,
  // declare your model imports here
  // for example, User
} = require("./");

async function buildTables() {
  try {
    client.connect();
    // drop tables in correct order

    // build tables in correct order

    /* this starts the build tables query i'm not sure
    if createTables and dropTables need to be seperate 
    async fucntions inside of  this buildTables  function 
    or if the are okay as is   */
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
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
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
