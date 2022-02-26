const client = require("../client");

module.exports = { 
  createOrderItems,
  getAllOrderItems,
  destroyOrderItems,
  updateOrderItems,
};

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

async function getAllOrderItems(){
  try {
    const { rows: orderItems } = await client.query(`
      SELECT * FROM order_items;
    `);

    return orderItems;
  } catch (error) {
    throw error;
  }
}

async function destroyOrderItems(orderItemsId){
  try {
    const { rows: orderItems } = await client.query(`
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

async function updateOrderItems({ quantity, created_at }) {
  try {
    const {rows: orderItems} = await client.query(`
      UPDATE order_items
      SET quantity=$1, created_at=$2
      WHERE id=$3
      RETURNING *;
    `,
      [quantity, created_at, id]
    );
    return orderItems;
  } catch (error) {
    throw error;
  }
}