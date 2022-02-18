const express = require("express");
const usersRouter = express.Router();
module.exports = usersRouter;

usersRouter.get("/", async (req, res, next) => {
  try {
    res.send({
      healthy: true,
    });
  } catch (error) {
    next(error);
  }
});
