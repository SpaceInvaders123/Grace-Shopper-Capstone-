const { client } = require("../client");
const bcrypt = require("bcrypt");

async function createUser({ username, password, first_name, email, phone }) {
  const hashPassword = await bcrypt.hash(password, 10);
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      INSERT INTO USERS (username, password, first_name, email, phone)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
      `,
      [username, hashPassword, first_name, email, phone]
    );

    delete user.password;
    return user;
  } catch (err) {
    console.error("ERROR INSERTING USERS <-");
  }
}

module.exports = {
  // add your database adapter fns here
  // getAllUsers,
  createUser,
};
