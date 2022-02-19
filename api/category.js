const express = require('express');
const categoryRouter = express.Router();
module.exports = categoryRouter;

categoryRouter.get('/', async (req, res, next) => {
  try {
    res.send({
      message: 'Sock_category API up and runnning.',
    });
  } catch (error) {
    next(error);
  }
});
