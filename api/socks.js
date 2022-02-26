const express = require('express');
const { Sock } = require('../db');
const socksRouter = express.Router();
module.exports = socksRouter;
const authorizeUser = require('./auth');

socksRouter.get('/', async (req, res, next) => {
  try {
    const socks = await Sock.getAllSocks();
    res.send(socks);
  } catch (error) {
    next(error);
  }
});

socksRouter.post('/', async (req, res, next) => {
  try {
    const {
      name,
      price,
      size,
      description,
      product_img,
      created_at,
      quantity,
    } = req.body;
    const socks = await Sock.createSocks({
      name,
      price,
      size,
      description,
      product_img,
      created_at,
      quantity,
    });
    res.send(socks);
  } catch (error) {
    next(error);
  }
});

socksRouter.get('/:sockId', async (req, res, next) => {
  try {
    const sock = await Sock.getSockById(req.params.sockId);
    res.send(sock);
  } catch (err) {
    next(err);
  }
});

socksRouter.delete('/:sockId', authorizeUser, async (req, res, next) => {
  try {
    const destroy_sock = await Sock.destroySock(req.params.sockId);
    res.send(destroy_sock);
  } catch (error) {
    next(error);
  }
});

socksRouter.patch('/:sockId', authorizeUser, async (req, res, next) => {
  try {
    const { name, price, size, description, product_img, created_at } =
      req.body;
    const sock = await Sock.updateSock({
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

// this is a little more descriptive
// from a RESTful standpoint, we're saying
// update a particular sock's inventory by it's inventoryId
// which really means, target the inventoryRecord
// for this sock by its sockId
socksRouter.patch('/:sockId/inventory/:inventoryId', async (req, res, next) => {
  try {
    // lets use the quantity that's being forwarded via req.body
    // and we'll use the req.params object to grab the instances
    // of existing db objects that we need (ie these are rows)
    const { sockId, inventoryId } = req.params;
    const { quantity } = req.body;

    const updatedSock = await Sock.updateSock({
      id: sockId,
      inventory_id: inventoryId,
      quantity,
    });

    // i think 204 is successful modification but check me on this :)
    res.status(204).send(updatedSock);
  } catch (err) {
    next(err);
  }
});
