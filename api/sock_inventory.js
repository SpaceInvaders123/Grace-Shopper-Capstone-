const express = require("express");
const sockInventoryRouter = express.Router();
module.exports = sockInventoryRouter;

sockInventoryRouter.get("/", async (req, res, next) => {
  try {
    res.send({
      message: "Sock_inventory API up and runnning."
    });
  } catch (error) {
    next(error);
  }
});