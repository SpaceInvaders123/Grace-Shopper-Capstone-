const express = require("express");
const socksRouter = express.Router();
module.exports = socksRouter;

socksRouter.get("/", async (req, res, next) => {
  try {
    res.send({
      message: "Socks API up and runnning."
    });
  } catch (error) {
    next(error);
  }
});