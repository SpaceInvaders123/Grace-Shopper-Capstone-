const express = require('express');
const userAddressRouter = express.Router();
module.exports = userAddressRouter;

userAddressRouter.get('/', async (req, res, next) => {
  try {
    res.send({ message: 'User_address API up and running' });
  } catch (err) {
    next(err);
  }
});
