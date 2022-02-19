const express = require("express");
const socksRouter = express.Router();
module.exports = socksRouter;

socksRouter.get("/", async (req, res, next) => {
  try {
    res.send({
      message: "Socks API up and runnning.",
    });
  } catch (error) {
    next(error);
  }
});

socksRouter.post("/", async (req, res, next) => {
  try {
    res.send({
      message: "under construction",
    });
  } catch (error) {
    next(error);
  }
});

socksRouter.patch("/", async (req, res, next) => {
  try {
    res.send({
      message: "under construction",
    });
  } catch (error) {
    next(error);
  }
});

socksRouter.delete("/", async (req, res, next) => {
  try {
    res.send({
      message: "under construction",
    });
  } catch (error) {
    next(error);
  }
});
