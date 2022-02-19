const apiRouter = require("express").Router();

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!",
  });
});

apiRouter.get("/health", (req, res, next) => {
  res.send({
    healthy: true,
  });
});

// place your routers here

//SOCKS ROUTER
const socksRouter = require("./socks");
apiRouter.use("/socks", socksRouter);

//USERS ROUTER
const usersRouter = require("./users");
apiRouter.use("/users", usersRouter);

//ADDRESSES ROUTER
const addressesRouter = require("./addresses");
apiRouter.use("/addresses", addressesRouter);

//SOCK_CATEGORY ROUTER
const sockCategoryRouter = require("./sock_category");
apiRouter.use("/sock_category", sockCategoryRouter);

//SOCK_INVENTORY
const sockInventoryRouter = require("./sock_inventory");
apiRouter.use("/sock_inventory", sockInventoryRouter);

module.exports = apiRouter;
