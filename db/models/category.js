const client = require('../client');

module.exports = {
  createCategory,
};

async function createCategory({ style }) {
  try {
    const {
      rows: [category],
    } = await client.query(
      `
        INSERT INTO category (style)
        VALUES ($1)
        RETURNING *;
        `,
      [style]
    );
    return category;
  } catch (error) {
    throw error;
  }
}
