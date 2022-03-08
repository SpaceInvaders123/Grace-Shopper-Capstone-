const client = require("../client");

module.exports = {
  createOrderItems,
  getAllOrderItems,
  destroyOrderItems,
  updateOrderItems,
};

async function createOrderItems({
  orderId,
  socksId,
  quantity,
  price_paid,
  created_at,
}) {
  try {
    const {
      rows: [orderItems],
    } = await client.query(
      `
        INSERT INTO order_items (order_id, socks_id, quantity, price_paid, created_at)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
        `,
      [orderId, socksId, quantity, price_paid, created_at]
    );

    return orderItems;
  } catch (error) {
    throw error;
  }
}

async function getAllOrderItems() {
  try {
    const { rows: orderItems } = await client.query(`
      SELECT * FROM order_items;
    `);

    return orderItems;
  } catch (error) {
    throw error;
  }
}

async function destroyOrderItems(orderItemsId) {
  try {
    const { rows: orderItems } = await client.query(
      `
      DELETE FROM order_items
      WHERE id=$1
      RETURNING *;
    `,
      [orderItemsId]
    );
    return orderItems;
  } catch (error) {
    throw error;
  }
}

async function updateOrderItems({ id, quantity, price_paid, created_at }) {
  try {
    const { rows: orderItems } = await client.query(
      `
      UPDATE order_items
      SET quantity=$1, price_paid=$2, created_at=$3
      WHERE id=$4
      RETURNING *;
    `,
      [quantity, price_paid, created_at, id]
    );
    return orderItems;
  } catch (error) {
    throw error;
  }
}
