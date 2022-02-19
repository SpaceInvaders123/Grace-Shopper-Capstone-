const express = require('express');
const inventoryRouter = express.Router();
module.exports = inventoryRouter;

inventoryRouter.get('/', async (req, res, next) => {
  try {
    res.send({
      message: 'Sock_inventory API up and runnning.',
    });
  } catch (error) {
    next(error);
  }
});
