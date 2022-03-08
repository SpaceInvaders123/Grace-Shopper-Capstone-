const client = require('../client');

module.exports = {
  createCategory,
  getAllCategories,
  destroyCategory,
  updateCategory,
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

async function getAllCategories() {
  try {
    const {
      rows: category,
    } = await client.query(
      `
        SELECT * FROM category;
      `);

    return category;
  } catch (error) {
    next(error);
  }
}

async function destroyCategory(categoryId) {
  try {
    const {
      rows: [category],
    } = await client.query(
      `
        DELETE FROM category
        WHERE id=$1
        RETURNING *;
      `,
      [categoryId]
    );
    return category;
  } catch (err) {
    throw err;
  }
}

async function updateCategory({id, style}) {
  try {
    const {
      rows: [category],
    } = await client.query(
      `
        UPDATE category
        SET style=$1
        WHERE id=$2
        RETURNING *;
      `,
      [style, id]
    );
    return category;
  } catch (err) {
    throw err;
  }
}
