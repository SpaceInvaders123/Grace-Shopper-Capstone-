const express = require("express");
const {
  createPaymentDetails,
  getAllPaymentDetails,
  destroyPaymentDetails,
  updatePaymentDetails,
} = require("../db/models/payment_details");
const paymentDetailsRouter = express.Router();
module.exports = paymentDetailsRouter;

paymentDetailsRouter.get("/", async (req, res, next) => {
  try {
    const paymentDetails = await getAllPaymentDetails();
    res.send(paymentDetails);
  } catch (error) {
    next(error);
  }
});

paymentDetailsRouter.post("/", async (req, res, next) => {
  try {
    const { amount, status } = req.body;
    const paymentDetails = await createPaymentDetails({
      amount,
      status,
    });
    res.send(paymentDetails);
  } catch (error) {
    next(error);
  }
});

paymentDetailsRouter.delete("/:paymentDetailsId", async (req, res, next) => {
  try {
    const destroy_paymentDetails = await destroyPaymentDetails(req.params.paymentDetailsId);
    res.send(destroy_paymentDetails);
  } catch (error) {
    next(error);
  }
});

paymentDetailsRouter.patch("/:paymentDetailsId", async (req, res, next) => {
  try {
    const { amount, status } = req.body;
    const paymentDetails = await updatePaymentDetails({
      id: req.params.paymentDetailsId,
      amount,
      status,
    });
    res.send(paymentDetails);
  } catch (error) {
    next(error);
  }
});