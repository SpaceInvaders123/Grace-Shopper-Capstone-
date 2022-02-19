const client = require("../client");

module.exports = {
  createUser_Addresses,
};

async function createUser_Addresses({ created_at }) {
  try {
    const {
      rows: [user_address],
    } = await client.query(
      `
    INSERT INTO user_address (created_at)
    VALUES ($1)
    RETURNING *;`,
      [created_at]
    );
    return user_address;
  } catch (err) {
    throw err;
  }
}
