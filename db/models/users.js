// grab our db client connection to use with our adapters
const client = require("../client");
const bcrypt = require("bcrypt");

module.exports = {
  // add your database adapter fns here
  getAllUsers,
  createUser,
  updateUser,
  softDeleteUser,
  hardDeleteUser,
  getUserByUserName,
  getUser,
};

async function createUser({ username, password, first_name, email }) {
  try {
    const SALT_COUNT = 10;
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

    const {
      rows: [user],
    } = await client.query(
      `
        INSERT INTO users (username, password, first_name, email)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `,
      [username, hashedPassword, first_name, email]
    );

    delete user.password;
    return user;
  } catch (err) {
    throw err;
  }
}

async function getAllUsers() {
  try {
    const { rows: users } = await client.query(`
    SELECT id, username, first_name, email, deleted_at FROM users
    WHERE deleted_at IS NULL;    
  `);

    return users;
  } catch (err) {
    throw err;
  }
}

async function updateUser(userId, updateFields) {
  try {
    console.log(Object.keys(updateFields).length);

    // this removes any undefined fields from our API req.body
    for (const key in updateFields) {
      if (updateFields[key] === undefined) {
        delete updateFields[key];
      }
    }

    console.log(Object.keys(updateFields).length);

    const setString = Object.keys(updateFields)
      .map((key, idx) => `${key} = $${idx + 2}`)
      .join(", ");

    console.log(setString);

    const {
      rows: [user],
    } = await client.query(
      `
      UPDATE users
      SET ${setString}
      WHERE id = $1
      RETURNING *;
    `,
      [userId, ...Object.values(updateFields)]
    );

    return user;
  } catch (err) {
    throw err;
  }
}

async function softDeleteUser(userId) {
  try {
    const now = new Date();
    const user = await updateUser(userId, { deleted_at: now.toISOString() });
    return user;
  } catch (err) {
    throw err;
  }
}

// test fn only! hard delete user
// also for GDPR compliance :)
async function hardDeleteUser(userId) {
  try {
    await client.query(
      `
      DELETE FROM users
      WHERE id = $1;
    
    `,
      [userId]
    );

    return {
      ok: true,
      message: `user with id ${userId} was successfully deleted!`,
    };
  } catch (err) {
    throw err;
  }
}

async function getUserByUserName(username) {
  console.log("inside getUserByUserName", username);
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT * from users
      WHERE username =$1
      `,
      [username]
    );
    return user;
  } catch (err) {
    throw err;
  }
}

async function getUser({ username, password }) {
  try {
    const user = await getUserByUserName(username);
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (isPasswordMatch) {
      delete user.password;
      return user;
    }
  } catch (err) {
    throw err;
  }
}
