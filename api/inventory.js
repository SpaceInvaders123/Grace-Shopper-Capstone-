const express = require('express');
const authorizeUser = require('./auth');
const inventoryRouter = express.Router();
const { Inventory } = require('../db');
module.exports = inventoryRouter;

inventoryRouter.delete('/:inventoryId', async (req, res, next) => {
  try {
    const destroy_inventory = destroy_inventory(req.params.inventoryId);
    res.send(destroy_inventory);
  } catch (error) {
    next(error);
  }
});

// the RESTful implications of hitting /inventory/:id
// is that we're modifying some sort of existing resource
// that will be used independent of other stuff

inventoryRouter.patch(
  '/:inventoryId',
  [authorizeUser],
  async (req, res, next) => {
    try {
      const { quantity } = req.body;
      const inventory = await updateInventory({
        id: req.params.inventoryId,
        quantity,
      });
      res.send(inventory);
    } catch (error) {
      next(error);
    }
  }
);
