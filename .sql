CREATE TABLE user_orders (
id SERIAL PRIMARY KEY,
user_id INTEGER REFERENCES users (id),
socks_id INTEGER REFERENCES socks (id),
order_id INTEGER REFERENCES order_details (id),
order_items_id INTEGER REFERENCES order_items (id),
payment_details_id INTEGER REFERENCES payment_details (id)
);

CREATE TABLE user_orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users (id),
    socks_id INTEGER REFERENCES socks (id),
    UNIQUE(user_id, socks_id)
);

-- sample query for getting user's order
-- reminder! the id value is hard-coded, use a placeholder
SELECT * FROM users
JOIN user_orders ON user_orders.user_id = users.id
JOIN order_details ON order_details.id = user_orders.order_id 
WHERE users.id = 1;

-- sample query for getting order items for an order
-- reminder! the id value is hard-coded, use a placeholder
SELECT * FROM order_details
JOIN order_items ON order_items.order_id = order_details.id
WHERE order_details.id = 1;

-- you can now fetch a user, fetch their orders, and then for each order
-- you can fetch the order's items
-- and you can build each of these returned arrays
-- as fields on the objects nested under the user
-- user: { orders: [ { ...status, date, items: [ { ...order_item content, ... }] }] }
-- const user = await User.getUserById(userId)
-- const userOrders = await UserOrders.getUserOrdersByUserId(userId)
-- for each userOrder in the above: const orderItems = await OrderItems.getOrderItemsByOrderId(orderId)
-- for each userOrder, attach the items as userOrder.items = the above orderItems array
-- user.orders = userOrders
