const express = require("express");
const addressesRouter = express.Router();
const { Address } = require("../db/models");
const authorizeUser = require("./auth");
module.exports = addressesRouter;
//Route works now. I resolved the issue
addressesRouter.get("/", async (req, res, next) => {
  try {
    const addresses = await Address.getAllAddresses();
    res.send({ addresses });
  } catch (err) {
    next(err);
  }
});
//Posts our newly created addresses
addressesRouter.post("/", async (req, res, next) => {
  try {
    const { address_line, state, city, zipcode } = req.body;
    const addresses = await Address.createAddresses({
      address_line,
      state,
      city,
      zipcode,
    });
    res.send(addresses);
  } catch (err) {
    next(err);
  }
});

addressesRouter.patch(
  "/:addressId",
  [authorizeUser],
  async (req, res, next) => {
    try {
      const { address_line, state, city, zipcode } = req.body;
      const address = await Address.updateAddresses({
        id: req.params.addressId,
        address_line,
        state,
        city,
        zipcode,
      });
      res.send(address);
    } catch (err) {
      next(err);
    }
  }
);

addressesRouter.delete("/:addressId", authorizeUser, async (req, res, next) => {
  try {
    const destroyAddress = await Address.hardDeleteAddresses(
      req.params.addressId
    );
    res.send(destroyAddress);
  } catch (err) {
    next(err);
  }
});
