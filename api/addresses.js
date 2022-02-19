const express = require("express");
const addressesRouter = express.Router();
module.exports = addressesRouter;

addressesRouter.get("/", async (req, res, next) => {
  try {
    res.send({ message: "Addresses API up and running" });
  } catch (err) {
    next(err);
  }
});
