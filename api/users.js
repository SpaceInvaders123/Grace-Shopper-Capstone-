const express = require('express');
const usersRouter = express.Router();
const { User } = require('../db/models');
module.exports = usersRouter;

usersRouter.get('/', async (req, res, next) => {
  try {
    const users = await User.getAllUsers();
    res.send({
      users,
    });
  } catch (error) {
    next(error);
  }
});

usersRouter.post('/register', async (req, res, next) => {
  try {
    const { username, password, first_name, email } = req.body;

    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters!');
    }

    const user = await User.createUser({
      username,
      password,
      first_name,
      email,
    });

    res.send({ user });
  } catch (error) {
    next(error);
  }
});
