const client = require("../client");

module.exports = {
  createAddresses,
  getAllAddresses,
  updateAddresses,
  hardDeleteAddresses,
};

async function createAddresses({ address_line, state, city, zipcode }) {
  try {
    const {
      rows: [addresses],
    } = await client.query(
      `
    INSERT INTO addresses (address_line, state, city, zipcode)
    VALUES ($1, $2, $3, $4)
    RETURNING *;`,
      [address_line, state, city, zipcode]
    );
    return addresses;
  } catch (err) {
    throw err;
  }
}

async function getAllAddresses() {
  try {
    const { rows: addresses } = await client.query(`
    SELECT *
    FROM addresses; `);
    return addresses;
  } catch (err) {
    throw err;
  }
}

async function updateAddresses({ id, address_line, state, city, zipcode }) {
  try {
    const {
      rows: [address],
    } = await client.query(
      `
    UPDATE addresses
    SET address_line=$1, state=$2, city=$3, zipcode=$4
    WHERE id=$5
    RETURNING *;`,
      [address_line, state, city, zipcode, id]
    );
    return address;
  } catch (err) {
    throw err;
  }
}

async function hardDeleteAddresses(addressesId) {
  try {
    const { rows: address } = await client.query(
      `
    DELETE FROM addresses
    WHERE id = $1
    RETURNING *; `,
      [addressesId]
    );
    return address;
  } catch (err) {
    throw err;
  }
}
