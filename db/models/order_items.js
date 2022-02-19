const client = require("../client");

module.exports = { createOrderItems };

async function createOrderItems({ quantity, created_at }) {
  try {
    const {
      rows: [orderItems],
    } = await client.query(
        `
        INSERT INTO order_items (quantity, created_at)
        VALUES ($1, $2)
        RETURNING *;
        `,
      [quantity, created_at]
    );

    return orderItems;
  } catch (error) {
    throw error;
  }
}