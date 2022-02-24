const express = require("express");
const {
  getAllOrderDetails,
  createOrderDetails,
  destroyOrderDetails,
  updateOrderDetails,
} = require("../db/models/order_details");
const orderDetailsRouter = express.Router();
module.exports = orderDetailsRouter;

orderDetailsRouter.get("/", async (req, res, next) => {
    try {
        const orderDetails = await getAllOrderDetails();
        res.send(orderDetails);
    } catch (error) {
        next(error);
    }
});

orderDetailsRouter.post("/", async (req, res, next) => {
    try {
        const { total, created_at } = req.body;
        const orderDetails = await createOrderDetails({
            total,
            created_at,
        });
        res.send(orderDetails);
    } catch (error) {
        next(error);
    }
});

orderDetailsRouter.delete("/:orderDetailsId", async (req, res, next) => {
    try {
        const destroy_orderDetails = await destroyOrderDetails();
        res.send(destroy_orderDetails);
    } catch (error) {
        next(error);
    }
});