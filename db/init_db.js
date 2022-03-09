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
const { UserOrders } = require("./models");

async function buildTables() {
  try {
    client.connect();
    // drop tables in correct order
    await client.query(`
    DROP TABLE IF EXISTS 
      user_address, 
      order_details,
      category, 
      inventory, 
      socks, 
      addresses, 
      users; 
    
    DROP TYPE IF EXISTS sock_style, payment_status, order_status;
    `);

    // build tables in correct order
    await client.query(`
      CREATE TYPE sock_style AS ENUM('no-show', 'quarter', 'knee-high');
      CREATE TYPE payment_status AS ENUM('pending', 'settled', 'failed');
      CREATE TYPE order_status AS ENUM('pending', 'settled');

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
        user_id INTEGER REFERENCES users (id),
        addresses_id INTEGER REFERENCES addresses (id),
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
          category_id INTEGER REFERENCES category (id),
          inventory_id INTEGER REFERENCES inventory (id),
          name VARCHAR(255) NOT NULL,
          price INTEGER NOT NULL, 
          size VARCHAR(50) NOT NULL,
          description TEXT NOT NULL,
          product_img TEXT,                      
          created_at DATE DEFAULT now()
      );

      CREATE TABLE order_details (
        id SERIAL PRIMARY KEY, 
        status order_status NOT NULL,
        created_at DATE DEFAULT now()
      );

      CREATE TABLE order_items (
        id SERIAL PRIMARY KEY,
        order_id INTEGER REFERENCES order_details (id),
        socks_id INTEGER REFERENCES socks (id),
        quantity INTEGER NOT NULL,
        price_paid INTEGER NOT NULL,
        created_at DATE DEFAULT now()
      );

      CREATE TABLE user_orders (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users (id),
        order_id INTEGER REFERENCES order_details (id),
        UNIQUE(user_id, order_id)
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
    name: "Amazing Sock",
    category_id: 1,
    inventory_id: 1,
    price: 50,
    size: "Large",
    description:
      "A a garment for the foot and lower part of the leg, typically knitted from wool, cotton, or nylon ",
    product_img:
      "https://media.happysocks.com/catalog/product/m/a/magentoimage_ezwo81il49pzpswo.png?width=960&format=pjpg&quality=60&auto=webp&bg-color=fafafa",
    quantity: 100,
  },
  {
    name: "Incredible Sock",
    category_id: 1,
    inventory_id: 2,
    price: 75,
    size: "Medium",
    description: "im a sock yo",
    product_img:
      "https://media.happysocks.com/catalog/product/m/a/magentoimage_9bbctreia9g5zlss.png?width=960&format=pjpg&quality=60&auto=webp&bg-color=fafafa",
    quantity: 80,
  },
  {
    name: "Smiley Sock",
    category_id: 1,
    inventory_id: 3,
    price: 25,
    size: "Medium",
    description:
      "Smiling is a chain reaction! This contagious design guarantees to put anyone who looks at you in a good mood.",
    product_img:
      "https://media.happysocks.com/catalog/product/m/a/magentoimage_izzfy7u3urz9lr3v.png?width=320&format=pjpg&quality=70&auto=webp&bg-color=fafafa",
    quantity: 80,
  },
  {
    name: "Vintage 2020 Crew Socks",
    category_id: 1,
    inventory_id: 4,
    price: 35,
    size: "Medium",
    description:
      "The best way to start your day is putting your best foot forward",
    product_img:
      "https://www.stance.com/dw/image/v2/BBBN_PRD/on/demandware.static/-/Sites-masterCatalog_Stance/default/dw74213ad7/prod_images/A556A20VIN_NAT_ALT_02.jpg?sw=625&sh=1000&sm=fit",
    quantity: 80,
  },
  {
    name: "Green Logo Tennis Socks",
    category_id: 1,
    inventory_id: 5,
    price: 125,
    size: "Medium",
    description:
      "Smiling is a chain reaction! This contagious design guarantees to put anyone who looks at you in a good mood.",
    product_img:
      "https://img.ssensemedia.com/images/b_white,g_center,f_auto,q_auto:best/202342F076165_1/balenciaga-green-logo-tennis-socks.jpg",
    quantity: 80,
  },
  {
    name: "Pringles Sour Cream Crew's",
    category_id: 1,
    inventory_id: 6,
    price: 99,
    size: "Medium",
    description:
      "Pringles Sour Cream Socks are the perfect gift for that socks lover in your life.",
    product_img:
      "https://cdn.shopify.com/s/files/1/0023/0191/9345/products/785614787201_5314064c-fa38-4fff-8444-b21cb26e842d_499x499.jpg?v=1645169983",
    quantity: 80,
  },
  {
    name: "Off-White Socks",
    category_id: 1,
    inventory_id: 7,
    price: 999,
    size: "Medium",
    description: "Diagonal Mid Length Socks",
    product_img:
      "https://image.s5a.com/is/image/saks/0400014622182_WHITEBLACK_486x648.jpg",
    quantity: 80,
  },
  {
    name: "Hike Light Cushion Margarita Ankle Socks",
    category_id: 1,
    inventory_id: 8,
    price: 29,
    size: "Medium",
    description:
      "Bring the natural performance features of responsibly sourced ZQ-certified Merino wool with you on every hike.",
    product_img:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSIaQW6GZWksFISyGV-FCr2RwlJ7ouHD5e4fxAbHVIuFEbto2IPSnmT5fHhzohWR9e7KHbr6r_l7-zERLuL_xw9YEvUXsEDTe0iuhiGk_58kD5Uoj49MbN55Q&usqp=CAE",
    quantity: 80,
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
  // this first order will be id 1 due to SERIAL PRIMARY KEY
  {
    status: "pending",
    created_at: new Date().toISOString(),
  },
  {
    status: "settled",
    created_at: new Date().toISOString(),
  },
];

const orderItemsToCreate = [
  {
    orderId: 1,
    socksId: 1,
    quantity: 10,
    price_paid: 200,
    created_at: null,
  },
  {
    orderId: 1,
    socksId: 2,
    quantity: 10,
    price_paid: 200,
    created_at: null,
  },
  {
    orderId: 2,
    socksId: 1,
    quantity: 5,
    price_paid: 300,
    created_at: null,
  },
];
const userOrdersToCreate = [
  /* associate two orders with albert's id which is 1 */
  {
    userId: 1,
    orderId: 1,
  },
  {
    userId: 1,
    orderId: 2,
  },
];

const paymentDetailsToCreate = [
  {
    amount: 10,
    status: "pending",
  },
];

const user_addressToCreate = [{ created_at: null }];

const categoryToCreate = [{ style: "no-show" }];

async function populateInitialData() {
  // create useful starting data by leveraging your
  // Model.method() adapters to seed your db, for example:
  // const user1 = await User.createUser({ ...user info goes here... })
  try {
    console.log("populating initial data!");
    const users = await Promise.all(usersToCreate.map(User.createUser));

    // these records are 1:1 with an existing sock
    // so we should create them and then associate to a particular sock
    // which means we have to create these records first
    const category = await Promise.all(
      categoryToCreate.map(Category.createCategory)
    );

    const socks = await Promise.all(socksToCreate.map(Sock.createSocks));

    const addresses = await Promise.all(
      addressesToCreate.map(Address.createAddresses)
    );
    const user_address = await Promise.all(
      user_addressToCreate.map(UserAddress.createUserAddress)
    );

    const orderDetails = await Promise.all(
      orderDetailsToCreate.map(OrderDetails.createOrderDetails)
    );
    const orderItems = await Promise.all(
      orderItemsToCreate.map(OrderItems.createOrderItems)
    );
    const user_orders = await Promise.all(
      userOrdersToCreate.map(UserOrders.createUserOrders)
    );

    const paymentDetails = await Promise.all(
      paymentDetailsToCreate.map(PaymentDetails.createPaymentDetails)
    );

    [
      users,
      socks,
      addresses,
      user_address,
      category,
      orderDetails,
      orderItems,
      user_orders,
      paymentDetails,
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
