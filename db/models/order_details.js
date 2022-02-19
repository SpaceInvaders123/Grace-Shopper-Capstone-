const client = require("../client");

module.exports = { createOrderDetails };

async function createOrderDetails({ total, created_at }) {
  try {
    const {
      rows: [orderDetails],
    } = await client.query(
      `
        INSERT INTO order_details (total, created_at)
        VALUES ($1, $2)
        RETURNING *;
        `,
      [total, created_at]
    );

    return orderDetails;
  } catch (error) {
    throw error;
  }
}
