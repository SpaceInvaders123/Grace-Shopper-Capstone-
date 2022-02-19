const express = require("express");
const user_addressesRouter = express.Router();
module.exports = user_addressesRouter;

user_addressesRouter.get("/", async (req, res, next) => {
  try {
    res.send({ message: "User_address API up and running" });
  } catch (err) {
    next(err);
  }
});
