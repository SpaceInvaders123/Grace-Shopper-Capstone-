const client = require('../client');

module.exports = {
  createInventory,
};

async function createInventory(quantity) {
  try {
    const {
      rows: [inventory],
    } = await client.query(
      `
      INSERT INTO inventory (quantity)
      VALUES ($1)
      RETURNING *;
      `,
      [quantity]
    );
    return inventory;
  } catch (error) {
    throw error;
  }
}
