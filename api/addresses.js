const express = require("express");
const addressesRouter = express.Router();
const {
  getAllAddresses,
  createAddresses,
  updateAddresses,
  hardDeleteAddresses,
} = require("../db/models/addresses");
const authorizeUser = require("./auth");
module.exports = addressesRouter;
//Route works now. I resolved the issue
addressesRouter.get("/", async (req, res, next) => {
  try {
    const addresses = await getAllAddresses();
    res.send(addresses);
  } catch (err) {
    next(err);
  }
});
//Posts our newly created addresses
addressesRouter.post("/", async (req, res, next) => {
  try {
    const { address_line, state, city, zipcode } = req.body;
    const addresses = await createAddresses({
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
  "/:addressesId",
  [authorizeUser],
  async (req, res, next) => {
    try {
      const { address_line, state, city, zipcode } = req.body;
      const addresses = await updateAddresses({
        id: req.params.addressesId,
        address_line,
        state,
        city,
        zipcode,
      });
      res.send(addresses);
    } catch (err) {
      next(err);
    }
  }
);

addressesRouter.delete(
  "/:addressesId",
  authorizeUser,
  async (req, res, next) => {
    try {
      const destroyAddress = await hardDeleteAddresses(req.params.addressesId);
      res.send(destroyAddress);
    } catch (err) {
      next(err);
    }
  }
);
