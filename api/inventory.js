const express = require("express");
const authorizeUser = require("./auth");
const inventoryRouter = express.Router();
module.exports = inventoryRouter;

inventoryRouter.get("/", async (req, res, next) => {
  try {
    res.send({
      message: "Sock_inventory API up and runnning.",
    });
  } catch (error) {
    next(error);
  }
});

inventoryRouter.post("/", async (req, res, next) => {
  try {
    const { style, size } = req.body;
    const inventory = await createInventory({
      inventoryId: req.inventory.id,
      style,
      size,
    });
    res.send(inventory);
  } catch (error) {
    next(error);
  }
});

inventoryRouter.delete("/:inventoryId", async (req, res, next) => {
  // inventoryRouter.delete("/", async (req, res, next) => {
  try {
    const destroy_inventory = destroy_inventory(req.params.inventoryId);
    res.send(destroy_inventory);
  } catch (error) {
    next(error);
  }
});

inventoryRouter.patch(
  "/:inventoryId",
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
