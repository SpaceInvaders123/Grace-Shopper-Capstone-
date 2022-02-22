const client = require("../client");

module.exports = {
  createSocks,
  getAllSocks,
  destroySock,
  updateSock,
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

async function updateSock({
  id,
  name,
  price,
  size,
  description,
  product_img,
  created_at,
}) {
  try {
    const {
      rows: [sock],
    } = await client.query(
      `
        UPDATE socks
        SET name=$1, price=$2, size=$3, description=$4, product_img=$5, created_at=$6
        WHERE id=$7
        RETURNING *;
        `,
      [name, price, size, description, product_img, created_at, id]
    );
    return sock;
  } catch (err) {
    throw err;
  }
}
