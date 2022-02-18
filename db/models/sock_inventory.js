const client = require("../client");

module.exports = { createSock_inventory };

async function createSock_inventory({ quantity }) {
  try {
    const {
      rows: [sock_inventory],
    } = await client.query(
      `
      INSERT INTO sock_inventory (quantity)
      VALUES ($1)
      RETURNING *;
      `,
      [quantity]
    );
    return sock_inventory;
  } catch (error) {
    throw error;
  }
}
