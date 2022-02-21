const express = require("express");
const { getAllSocks } = require("../db/models/socks");
const socksRouter = express.Router();
module.exports = socksRouter;

socksRouter.get("/", async (req, res, next) => {
  try {
    const socks = await getAllSocks();
    res.send(socks);
  } catch (error) {
    next(error);
  }
});
