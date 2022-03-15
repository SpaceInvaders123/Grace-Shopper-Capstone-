const client = require("../client");

module.exports = {
  createOrderDetails,
  getAllOrderDetails,
  destroyOrderDetails,
  updateOrderDetails,
  getOrderDetailsByOrderId,
};

async function createOrderDetails({ status, created_at }) {
  try {
    const {
      rows: [orderDetails],
    } = await client.query(
      `
        INSERT INTO order_details (status, created_at)
        VALUES ($1, $2)
        RETURNING *;
      `,
      [status, created_at]
    );

    return orderDetails;
  } catch (error) {
    throw error;
  }
}

async function getAllOrderDetails() {
  try {
    const { rows: orderDetails } = await client.query(
      `
      SELECT * FROM order_details;
    `
    );

    return orderDetails;
  } catch (error) {
    throw error;
  }
}

// this gets us products
async function getOrderDetailsByOrderId(orderId) {
  try {
    const {
      rows: [orderDetails],
    } = await client.query(
      `
    SELECT order_details.*, json_agg(order_items.*) AS order_items FROM order_details
    JOIN order_items ON order_items.order_id = order_details.id
    WHERE order_details.id = $1
    GROUP BY order_details.id, order_items.order_id;`,
      [orderId]
    );

    return orderDetails;
  } catch (err) {
    throw err;
  }
}

async function destroyOrderDetails(orderDetailsId) {
  try {
    const {
      rows: [orderDetails],
    } = await client.query(
      `
      DELETE FROM order_details
      WHERE id=$1
      RETURNING *;
    `,
      [orderDetailsId]
    );
    return orderDetails;
  } catch (error) {
    throw error;
  }
}

async function updateOrderDetails({ id, status, created_at }) {
  try {
    const {
      rows: [orderDetails],
    } = await client.query(
      `
      UPDATE order_details
      SET status=$1, created_at=$2
      WHERE id=$3
      RETURNING *;
    `,
      [status, created_at, id]
    );
    return orderDetails;
  } catch (error) {
    throw error;
  }
}
