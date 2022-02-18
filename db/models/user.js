// grab our db client connection to use with our adapters
const client = require("../client");
const bcrypt = require("bcrypt");

module.exports = {
  // add your database adapter fns here
  getAllUsers,
  createUser,
};

async function createUser({ username, password, first_name, email }) {
  try {
    const SALT_COUNT = 10;
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

    const {
      rows: [user],
    } = await client.query(
      `
        INSERT INTO users (username, password, first_name, email)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `,
      [username, password, first_name, email]
    );

    delete user.password;
    return user;
  } catch (err) {
    throw err;
  }
}

async function getAllUsers() {
  /* this adapter should fetch a list of users from your db */
}
