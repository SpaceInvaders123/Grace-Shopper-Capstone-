// grab our db client connection to use with our adapters
const client = require("../client");

module.exports = {
  // add your database adapter fns here
  getAllUsers,
};

async function getAllUsers() {
  /* this adapter should fetch a list of users from your db */
  try {
    const { rows: users } = await client.query(`
      SELECT * FROM users
      `);

    return users;
  } catch (error) {
    throw error;
  }
}
