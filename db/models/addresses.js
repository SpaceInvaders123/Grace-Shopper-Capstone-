const client = require("../client");

module.exports = {
  createAddresses,
  getAllAddresses,
};

async function createAddresses({ adress_line, state, city, zipcode }) {
  try {
    const {
      rows: [adresses],
    } = await client.query(
      `
    INSERT INTO addresses (adress_line, state, city, zipcode)
    VALUES ($1, $2, $3, $4)
    RETURNING *;`,
      [adress_line, state, city, zipcode]
    );
    return adresses;
  } catch (err) {
    throw err;
  }
}

async function getAllAddresses() {
  try {
    const { rows: addresses } = await client.query(`
    SELECT id, address_line, state, city, zipcode
    FROM addresses; `);
    return addresses;
  } catch (err) {
    throw err;
  }
}
