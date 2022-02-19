module.exports = {
  User: require("./users"),
  Sock: require("./socks"),
  Address: require("./addresses"),
  UserAddress: require("./user_address"),
  Category: require("./category"),
  Inventory: require("./inventory"),
  OrderDetails: require("./order_details"),
  OrderItems: require("./order_items"),
  // add each model to your exports object here
  // so that you can use them in your express server api routers
  // for example, create a users.js file for a User model
  // and User: require('./user') here
};

// then, in your API, you'll require the appropriate model
// and use its database connectors
// ie User.getUserById(), where user.js had a module.exports
// that looked like this: module.exports = { getUserById, ... }
