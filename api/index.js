const apiRouter = require('express').Router();

apiRouter.get('/', (req, res, next) => {
  res.send({
    message: 'API is under construction!',
  });
});

apiRouter.get('/health', (req, res, next) => {
  res.send({
    healthy: true,
  });
});

// place your routers here

//SOCKS ROUTER
const socksRouter = require('./socks');
apiRouter.use('/socks', socksRouter);

//USERS ROUTER
const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

//ADDRESSES ROUTER
const addressesRouter = require('./addresses');
apiRouter.use('/addresses', addressesRouter);

//USER_ADDRESS ROUTER
const userAddressRouter = require('./user_address');
apiRouter.use('/user_address', userAddressRouter);

//category ROUTER
const categoryRouter = require('./category');
apiRouter.use('/category', categoryRouter);

//inventory
const inventoryRouter = require('./inventory');
apiRouter.use('/inventory', inventoryRouter);

module.exports = apiRouter;
