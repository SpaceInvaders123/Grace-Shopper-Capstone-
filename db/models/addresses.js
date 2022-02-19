const client = require("../client");

module.exports = {
  createAddresses,
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
