const express = require("express");
const usersRouter = express.Router();
const { User } = require("../db/models");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

module.exports = usersRouter;

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await User.getAllUsers();
    res.send({
      users,
    });
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/register", async (req, res, next) => {
  try {
    const { username, password, first_name, email } = req.body;

    if (password.length < 8) {
      throw new Error("Password must be at least 8 characters!");
    }

    const user = await User.createUser({
      username,
      password,
      first_name,
      email,
    });

    res.status(201).send({ user });
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/login", async (req, res, next) => {
  try {
    console.log(JWT_SECRET);
    const { username, password } = req.body;

    const user = await User.getUser({ username, password });

    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET
    );

    res.send({ token });
  } catch (error) {
    next(error);
  }
});

usersRouter.patch("/:id", async (req, res, next) => {
  try {
    const { username, first_name, email } = req.body;
    const updateFields = { username, first_name, email };
    const user = await User.updateUser(req.params.id, updateFields);
    res.status(204).send(user);
  } catch (err) {
    next(err);
  }
});
