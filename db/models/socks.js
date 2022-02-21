const client = require("../client");

module.exports = {
  createSocks,
  getAllSocks,
  destroySock,
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

async function getAllSocks() {
  try {
    const { rows: socks } = await client.query(`
      SELECT * FROM socks;
      `);

    return socks;
  } catch (error) {
    next(error);
  }
}

async function destroySock(sockId) {
  try {
    const {
      rows: [sock],
    } = await client.query(
      `
      DELETE FROM socks
      WHERE id=$1
      RETURNING *;
      `,
      [sockId]
    );
    return sock;
  } catch (err) {
    throw err;
  }
}
