const client = require("../client");

module.exports = {
  createSocks,
};

async function createSocks({
  name,
  price,
  size,
  description,
  product_img,
  created_at,
}) {
  try {
    const {
      rows: [socks],
    } = await client.query(
      `
        INSERT INTO socks (name, price, size, description, product_img, created_at)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
        `,
      [name, price, size, description, product_img, created_at]
    );
    return socks;
  } catch (error) {
    throw error;
  }
}
