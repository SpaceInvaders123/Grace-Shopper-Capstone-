const { User, UserOrders } = require(".");
const client = require("../client");
module.exports = { getUserOrdersByUserId };

//???
//Unsure how to go about creating a userOrders table
//Only value is Id everything else is a FK reference
async function createUserOrders() {
  try {
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
    const user = await User.getUserById(userId);
    const userOrders = await UserOrders.getUserOrdersByUserId(userId);
    const {
      rows: [userOrder],
    } = await client.query(
      `
    SELECT * FROM users
    JOIN user_orders ON user_orders.user_id = users.id
    JOIN order_details ON order_details.id = user_orders.order_id 
    WHERE users.id = $1;`,
      [user, userOrders, userId]
    );
    return userOrder;
  } catch (err) {
    throw err;
  }
}
