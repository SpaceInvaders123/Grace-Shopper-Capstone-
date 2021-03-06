const express = require("express");
const {
  createOrderItems,
  getAllOrderItems,
  destroyOrderItems,
  updateOrderItems,
} = require("../db/models/order_items");
const orderItemsRouter = express.Router();
module.exports = orderItemsRouter;

orderItemsRouter.get("/", async (req, res, next) => {
  try {
    const orderItems = await getAllOrderItems();
    res.send(orderItems);
  } catch (error) {
    next(error);
  }
});

orderItemsRouter.post("/", async (req, res, next) => {
  //console.log(req.body);
  try {
    const { quantity, price_paid, created_at, order_id, socks_id } = req.body;
    const orderItems = await createOrderItems({
      quantity,
      price_paid,
      created_at,
      order_id,
      socks_id,
    });
    res.send(orderItems);
  } catch (error) {
    next(error);
  }
});

orderItemsRouter.delete("/:orderItemsId", async (req, res, next) => {
  try {
    const destroy_orderItems = await destroyOrderItems(req.params.orderItemsId);
    res.send(destroy_orderItems);
  } catch (error) {
    next(error);
  }
});

orderItemsRouter.patch("/:orderItemsId", async (req, res, next) => {
  try {
    const { quantity, price_paid, created_at } = req.body;
    const orderItems = await updateOrderItems({
      id: req.params.orderItemsId,
      quantity,
      price_paid,
      created_at,
    });
    res.send(orderItems);
  } catch (error) {
    next(error);
  }
});
