const { getOrderDetailsByOrderId } = require("./order_details");
const client = require("../client");
module.exports = { getUserOrdersByUserId, createUserOrders };

//???
//Unsure how to go about creating a userOrders table
//Only value is Id everything else is a FK reference
async function createUserOrders({ userId, orderId }) {
  try {
    console.log(userId, orderId);
    const {
      rows: [userOrder],
    } = await client.query(
      `
      INSERT INTO user_orders (user_id, order_id)
       VALUES ($1, $2)
       RETURNING *;`,
      [userId, orderId]
    );
    return userOrder;
  } catch (err) {
    throw err;
  }
}

//Incredibly confused on how this adapter should function
//And what all should be inside
//Not sure if this is even right
//don't get how we can supply userId as a param to all these functions
//Need order_details as well

async function getUserOrdersByUserId(userId) {
  try {
    const { rows: userOrders } = await client.query(
      `
    SELECT * FROM user_orders
    WHERE user_id = $1;`,
      [userId]
    );

    const orders = [];

    for (let i = 0; i < userOrders.length; i++) {
      // how do we get products associated with this order?
      // easy :) we do an n + 1 query on the userOrders[i]

      const userOrder = userOrders[i];

      // this needs to be implemented in the OrderDetails adapter
      const orderDetails = await getOrderDetailsByOrderId(userOrder.order_id);

      console.log({ orderDetails });

      orders.push(orderDetails);
    }

    /* 
      {
        orderId: 1,
        status: 'pending'
        date: ...timestamp
        products: [ {  ...order detail record, quantity, pricepaid } ]
      }
    */

    return orders;
  } catch (err) {
    throw err;
  }
}
