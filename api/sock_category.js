const express = require("express");
const sockCategoryRouter = express.Router();
module.exports = sockCategoryRouter;

sockCategoryRouter.get("/", async (req, res, next) => {
  try {
    res.send({
      message: "Sock_category API up and runnning."
    });
  } catch (error) {
    next(error);
  }
});