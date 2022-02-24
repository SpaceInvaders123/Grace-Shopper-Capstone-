const express = require("express");
const userAddressRouter = express.Router();
module.exports = userAddressRouter;

userAddressRouter.get("/", async (req, res, next) => {
  try {
    res.send({ message: "User_address API up and running" });
  } catch (err) {
    next(err);
  }
});

userAddressRouter.post("/", async (req, res, next) => {
  try {
    const { addresses_id, created_at } = req.body;
    const userAddress = await createUserAddress({
      addresses_id,
      created_at,
    });
    res.send(userAddress);
  } catch (err) {
    next(err);
  }
});
