const {
  client,
  User,
  Sock,
  Address,
  UserAddress,
  Category,
  Inventory,
  OrderDetails,
  OrderItems,
  PaymentDetails,
  // declare your model imports here
  // for example, User
} = require("./");

async function buildTables() {
  try {
    client.connect();
    // drop tables in correct order
    await client.query(`
    DROP TABLE IF EXISTS users, addresses, user_address, category, inventory, socks, order_details;
    DROP TYPE IF EXISTS sock_style;
    DROP TYPE IF EXISTS payment_status;
    `);
    // build tables in correct order
    await client.query(`
      CREATE TYPE sock_style AS ENUM('no-show', 'quarter', 'knee-high');
      CREATE TYPE payment_status AS ENUM('pending', 'settled', 'failed');

      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        first_name TEXT NOT NULL,
        email VARCHAR(255),
        deleted_at DATE DEFAULT NULL
      );

      CREATE TABLE addresses (
        id SERIAL PRIMARY KEY,
        address_line VARCHAR(255) NOT NULL,
        state VARCHAR(2) NOT NULL,
        city VARCHAR(255) NOT NULL,
        zipcode VARCHAR(5) NOT NULL
      );

      CREATE TABLE user_address (
        id SERIAL PRIMARY KEY,
        "user_id" INTEGER REFERENCES users (id),
        "addresses_id" INTEGER REFERENCES addresses (id),
        created_at DATE DEFAULT now()
      );

      CREATE TABLE category (
        id SERIAL PRIMARY KEY,
        style sock_style NOT NULL
      );
      
      CREATE TABLE inventory (
          id SERIAL PRIMARY KEY,
          quantity INTEGER DEFAULT 0
      );
      
      CREATE TABLE socks (
          id SERIAL PRIMARY KEY,
          "category_id" INTEGER REFERENCES category (id),
          "inventory_id" INTEGER REFERENCES inventory (id),
          name VARCHAR(255) NOT NULL,
          price INTEGER NOT NULL, 
          size VARCHAR(50) NOT NULL,
          description TEXT NOT NULL,
          product_img TEXT,                      
          created_at DATE DEFAULT now()
      );

      CREATE TABLE order_details (
        id SERIAL PRIMARY KEY, 
        "user_id" INTEGER REFERENCES users (id),
        total INTEGER,
        created_at DATE DEFAULT now()
      );

      CREATE TABLE order_items (
        id SERIAL PRIMARY KEY,
        order_id INTEGER REFERENCES order_details (id),
        product_id INTEGER REFERENCES socks (id),
        quantity INTEGER NOT NULL,
        created_at DATE DEFAULT now()
      );

      CREATE TABLE payment_details (
        id SERIAL PRIMARY KEY,
        order_id INTEGER REFERENCES order_details (id),
        amount INTEGER,
        status payment_status NOT NULL 
      );
    `);
  } catch (error) {
    throw error;
  }
}

// store constants outside of the function
const usersToCreate = [
  {
    username: "albert",
    password: "bertie99",
    first_name: "Alberto",
    email: "albert123@tets.com",
  },
];

const socksToCreate = [
  {
    name: "Example Sock",
    category_id: 1,
    inventory_id: 1,
    price: 500,
    size: "Large",
    description:
      "A a garment for the foot and lower part of the leg, typically knitted from wool, cotton, or nylon ",
    product_img: "sockPictureURL.com",
  },
];

const addressesToCreate = [
  {
    address_line: "42 Wallaby Way",
    state: "TX",
    city: "Burleson",
    zipcode: "76028",
  },
];

const orderDetailsToCreate = [
  {
    total: 500,
    created_at: null,
  },
];

const orderItemsToCreate = [
  {
    quantity: 10,
    created_at: null,
  },
];

const paymentDetailsToCreate = [
  {
    amount: 10,
    payment_status: "pending",
  },
];

const user_addressToCreate = [{ created_at: null }];

const categoryToCreate = [{ style: "no-show" }];

const inventoryToCreate = [
  {
    quantity: 100,
  },
];

async function populateInitialData() {
  // create useful starting data by leveraging your
  // Model.method() adapters to seed your db, for example:
  // const user1 = await User.createUser({ ...user info goes here... })
  try {
    console.log("populating initial data!");
    const users = await Promise.all(usersToCreate.map(User.createUser));
    const socks = await Promise.all(socksToCreate.map(Sock.createSocks));
    const addresses = await Promise.all(
      addressesToCreate.map(Address.createAddresses)
    );
    const user_address = await Promise.all(
      user_addressToCreate.map(UserAddress.createUserAddress)
    );
    const category = await Promise.all(
      categoryToCreate.map(Category.createCategory)
    );
    const inventory = await Promise.all(
      inventoryToCreate.map(Inventory.createInventory)
    );
    const orderDetails = await Promise.all(
      orderDetailsToCreate.map(OrderDetails.createOrderDetails)
    );
    const orderItems = await Promise.all(
      orderItemsToCreate.map(OrderItems.createOrderItems)
    );
    const orderDetails = await Promise.all(
      orderDetailsToCreate.map(OrderDetails.createOrderDetails)
    );
    const paymentDetails = await Promise.all(
      paymentDetailsToCreate.map(PaymentDetails.createPaymentDetails)
    );
    [
      (users,
      socks,
      addresses,
      user_address,
      category,
      inventory,
      orderDetails,
      orderItems,
      paymentDetails),
    ].forEach((instance) => {
      console.dir(instance, { depth: null });
    });

    console.log("finished populating initial data!");
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
