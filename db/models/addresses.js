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
    SELECT id, address_line, state, city, zipcode
    FROM addresses; `);
    return addresses;
  } catch (err) {
    throw err;
  }
}

async function updateAddresses(addressesId, updateFields) {
  try {
    console.log(Object.keys(updateFields).length);

    //removes any undefined fields from our API req.body
    for (const key in updateFields) {
      if (updateFields[key] === undefined) {
        delete updateFields[key];
      }
    }

    const setString = Object.keys(updateFields)
      .map((key, idx) => `${key} = $${idx + 2}`)
      .join(", ");

    console.log(setString);

    const {
      rows: [address],
    } = await client.query(
      `
    UPDATE addresses
    SET ${setString}
    WHERE id = $1
    RETURNING *;`,
      [addressesId, ...Object.values(updateFields)]
    );

    return address;
  } catch (err) {
    throw err;
  }
}

async function hardDeleteAddresses(addressesId) {
  try {
    await client.query(
      `
    DELETE FROM addresses
    WHERE id = $1; `,
      [addressesId]
    );
    return {
      ok: true,
      message: `address with id ${addressesId} was successfully deleted!`,
    };
  } catch (err) {
    throw err;
  }
}
