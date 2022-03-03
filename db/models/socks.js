const client = require("../client");
const { createInventory, updateInventory } = require("./inventory");

module.exports = {
  createSocks,
  getAllSocks,
  destroySock,
  updateSock,
  getSockById,
};

async function createSocks({
  name,
  price,
  size,
  description,
  product_img,
  created_at,
  category_id,
  quantity, // this field is used to generate the inventory record FIRST
}) {
  try {
    // we're doing this first, so that we can associate the inventory_id
    // that each new sock record requires
    const inventoryRecord = await createInventory({ quantity });

    const {
      rows: [socks],
    } = await client.query(
      `
        INSERT INTO socks (
          name, 
          price, 
          size, 
          description, 
          product_img, 
          created_at, 
          category_id,
          inventory_id
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;
        `,
      [
        name,
        price,
        size,
        description,
        product_img,
        created_at,
        category_id,
        inventoryRecord.id,
      ]
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

async function getSockById(sockId) {
  try {
    const query = `
    SELECT 
    -- first, select everything from the sock record
    socks.id,
    socks.name,
    socks.price,
    socks.size,
    socks.description,
    socks.product_img,
    socks.created_at,
    -- next, build a new object from the category info
    json_build_object(
      'id', category.id,
      'style', category.style
    )
    AS category,
    -- finally, build a new object from the inventory info
    json_build_object(
      'id', inventory.id,
      'quantity', inventory.quantity
    )
    AS inventory
    FROM socks
    JOIN category ON socks.category_id=category.id
    JOIN inventory ON socks.inventory_id=inventory.id
    WHERE socks.id=$1
    GROUP BY socks.id, category.id, inventory.id;
  ;`;

    const {
      rows: [sock],
    } = await client.query(query, [sockId]);

    return sock;
  } catch (err) {
    throw err;
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

// the reason that we're going to go with id and updateFields as separate values
// is that we need to iterate the update fields and remove undefined values
// and, we also need to apply this change to ONLY the sock we're targeting
async function updateSock(sockId, updateFields) {
  // updateFields could consist solely of (category_id) for example
  // so we need a way of making sure that we only update fields that are actually defined
  for (const field in updateFields) {
    if (updateFields[field] === undefined) {
      // this will remove any undefined field from my list of fields
      // that i'm receiving from the API layer
      delete updateFields[field];
    }
  }

  try {
    // first we need to modify the inventory record
    // and we don't even need to check if it exists
    // because by definition we've already created an inventory record
    // every time we add a new sock to our db
    const {
      quantity,
      inventory_id: inventoryId,
      category_id: categoryId,
    } = updateFields;

    if (!isNaN(+quantity)) {
      await updateInventory(inventoryId, categoryId, quantity);
      delete updateFields.quantity;
    }

    // we're doing a plus 2 offset in our placeholder indices
    // to account for position 1, which will go to our sockId
    const setString = Object.keys(updateFields)
      .map((key, idx) => `${key} = $${idx + 2}`)
      .join(",");

    console.log({ setString });

    // this isn't great, since i'm making multiple trips
    // but, it's not a huge penalty for now...
    // first, update the sock record
    await client.query(
      `
        UPDATE socks
        SET ${setString}
        WHERE id=$1
        RETURNING *;
        `,
      [sockId, ...Object.values(updateFields)]
    );

    // second, grab the sock record via the getSockById adapter
    // this will give us access to the JOIN fields like category, inventory
    const sock = await getSockById(sockId);
    return sock;
  } catch (err) {
    throw err;
  }
}
