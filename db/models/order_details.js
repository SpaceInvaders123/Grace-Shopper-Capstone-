const client = require("../client");

module.exports = {
  createOrderDetails,
  getAllOrderDetails,
  destroyOrderDetails
};

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

async function getAllOrderDetails(){
  try {
    const { rows: orderDetails } = await client.query(
    `
      SELECT * FROM order_details;
    `);

    return orderDetails;
  } catch (error) {
    throw(error);
  }
}

async function destroyOrderDetails(orderDetailsId) {
  try {
    const {
      rows: [orderDetails]
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
    throw(error);
  }
}

async function updateOrderDetails({total, created_at}){
  try {
    const {
      rows: [orderDetails],
    } = await client.query(
    `
      UPDATE order_details
      SET total=$1, created_at=$2
      WHERE id=$3
      RETURNING *;
    `,
      [total, created_at, id]
    );
    return orderDetails;
  } catch (error) {
    throw(error);
  }
}