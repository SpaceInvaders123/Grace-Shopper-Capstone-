const client = require("../client");

module.exports = {
  createSock_category,
};

async function createSock_category({ style }) {
  try {
    const {
      rows: [sock_category],
    } = await client.query(
      `
        INSERT INTO sock_category (style)
        VALUES ($1)
        RETURNING *;
        `,
      [style]
    );
    return sock_category;
  } catch (error) {
    throw error;
  }
}
