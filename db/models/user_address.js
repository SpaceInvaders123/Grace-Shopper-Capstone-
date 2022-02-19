const client = require("../client");

module.exports = {
  createUserAddress,
  getUserAddress,
  updateUserAddress,
};

async function createUserAddress({ created_at }) {
  try {
    const {
      rows: [user_address],
    } = await client.query(
      `
    INSERT INTO user_address (created_at)
    VALUES ($1)
    RETURNING *;`,
      [created_at]
    );

    return user_address;
  } catch (err) {
    throw err;
  }
}

async function getUserAddress() {
  try {
    const { rows: user_address } = await client.query(`
    SELECT id, created_at
    FROM user_address;
    `);

    return user_address;
  } catch (err) {
    throw err;
  }
}

async function updateUserAddress(userAddressesId, updateFields) {
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
      rows: [user_address],
    } = await client.query(
      `
    UPDATE user_address
    SET ${setString}
    WHERE id = $1
    RETURNING *;`,
      [userAddressesId, ...Object.values(updateFields)]
    );

    return user_address;
  } catch (err) {
    throw err;
  }
}
