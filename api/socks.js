const express = require("express");
const { getAllSocks, createSocks } = require("../db/models/socks");
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

socksRouter.post("/", async (req, res, next) => {
  try {
    const { name, price, size, description, product_img, created_at } =
      req.body;
    const socks = await createSocks({
      name,
      price,
      size,
      description,
      product_img,
      created_at,
    });
    res.send(socks);
  } catch (error) {
    next(error);
  }
});
