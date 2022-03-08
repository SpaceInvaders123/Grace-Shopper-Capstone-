const express = require('express');
const {
  getAllCategories,
  createCategory,
  destroyCategory,
  updateCategory,
} = require("../db/models/category");
const categoryRouter = express.Router();
module.exports = categoryRouter;

categoryRouter.get('/', async (req, res, next) => {
  try {
    const category = await getAllCategories();
    res.send(category);
  } catch (error) {
    next(error);
  }
});

categoryRouter.post("/", async (req, res, next) => {
  try {
    const { style } = req.body;
    const category = await createCategory({
      style
    });
    res.send(category);
  } catch (error) {
    next(error);
  }
});

categoryRouter.delete("/:categoryId", async (req, res, next) => {
  try {
    const destroy_category = await destroyCategory(req.params.categoryId);
    res.send(destroy_category);
  } catch (error) {
    next(error);
  }
});

categoryRouter.patch("/:categoryId", async (req, res, next) => {
  try {
    const {style} = req.body;
    const category = await updateCategory({
      id: req.params.categoryId,
      style,
    });
    res.send(category);
  } catch (error) {
    next(error);
  }
});