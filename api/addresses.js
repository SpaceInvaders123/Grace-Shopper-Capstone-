const express = require("express");
const addressesRouter = express.Router();
const { Address } = require("../db/models");
module.exports = addressesRouter;
//Route works now I resolved the issue
addressesRouter.get("/", async (req, res, next) => {
  try {
    const addresses = await Address.getAllAddresses();
    res.send({ addresses });
  } catch (err) {
    next(err);
  }
});
