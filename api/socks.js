const express = require("express");
const {
  getAllSocks,
  createSocks,
  destroySock,
  updateSock,
} = require("../db/models/socks");
const socksRouter = express.Router();
module.exports = socksRouter;
const authorizeUser = require("./auth");

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

socksRouter.delete("/:sockId", authorizeUser, async (req, res, next) => {
  try {
    const destroy_sock = await destroySock(req.params.sockId);
    res.send(destroy_sock);
  } catch (error) {
    next(error);
  }
});

socksRouter.patch("/:sockId", [authorizeUser], async (req, res, next) => {
  try {
    const { name, price, size, description, product_img, created_at } =
      req.body;
    const sock = await updateSock({
      id: req.params.sockId,
      name,
      price,
      size,
      description,
      product_img,
      created_at,
    });
    res.send(sock);
  } catch (error) {
    next(error);
  }
});
