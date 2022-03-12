import React, { useEffect, useState } from "react";

const items = [
  {
    name: "Amazing Sock",
    category_inventory_id: 1,
    inventory_id: 1,
    price: 50,
    size: "Large",
    description:
      "A a garment for the foot and lower part of the leg, typically knitted from wool, cotton, or nylon ",
    product_img:
      "https://media.happysocks.com/catalog/product/m/a/magentoimage_ezwo81il49pzpswo.png?winventory_idth=960&format=pjpg&quatity=60&auto=webp&bg-color=fafafa",
    quantity: 100,
  },
  {
    name: "Incredible Sock",
    category_inventory_id: 1,
    inventory_id: 2,
    price: 75,
    size: "Medium",
    description: "im a sock yo",
    product_img:
      "https://media.happysocks.com/catalog/product/m/a/magentoimage_9bbctreia9g5zlss.png?winventory_idth=960&format=pjpg&quatity=60&auto=webp&bg-color=fafafa",
    quantity: 80,
  },
  {
    name: "Smiley Sock",
    category_inventory_id: 1,
    inventory_id: 3,
    price: 25,
    size: "Medium",
    description:
      "Smiling is a chain reaction! This contagious design guarantees to put anyone who looks at you in a good mood.",
    product_img:
      "https://media.happysocks.com/catalog/product/m/a/magentoimage_izzfy7u3urz9lr3v.png?winventory_idth=320&format=pjpg&quatity=70&auto=webp&bg-color=fafafa",
    quantity: 80,
  },
  {
    name: "Vintage 2020 Crew Socks",
    category_inventory_id: 1,
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
    category_inventory_id: 1,
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
    category_inventory_id: 1,
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
    category_inventory_id: 1,
    inventory_id: 7,
    price: 999,
    size: "Medium",
    description: "Diagonal Minventory_id Length Socks",
    product_img:
      "https://image.s5a.com/is/image/saks/0400014622182_WHITEBLACK_486x648.jpg",
    quantity: 80,
  },
  {
    name: "Hike Light Cushion Margarita Ankle Socks",
    category_inventory_id: 1,
    inventory_id: 8,
    price: 29,
    size: "Medium",
    description:
      "Bring the natural performance features of responsibly sourced ZQ-certified Merino wool with you on every hike.",
    product_img:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSIaQW6GZWksFISyGV-FCr2RwlJ7ouHD5e4fxAbHVIuFEbto2IPSnmT5fHhzohWR9e7KHbr6r_l7-zERLuL_xw9YEvUXsEDTe0iuhiGk_58kD5Uoj49MbN55Q&usqp=CAE",
    quantity: 80,
  },
]

export const Store = () => {
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    total();
  }, [cart]);

  const total = () => {
    let totalVal = 0;

    for (let i = 0; i < cart.length; i++) {
      totalVal = totalVal + cart[i].price * cart[i].quantity;
    }

    let newTotalPrice = totalVal;
    setTotalPrice(newTotalPrice);
    setCartTotal(totalVal);
  };

  const decToCart = (item) => {
    let newItem = cart.find((product) => product.inventory_id === item.inventory_id);
    if (newItem.quantity > 1) {
      setCart(
        cart.map((product) =>
          product.inventory_id === item.inventory_id
            ? { ...newItem, quantity: newItem.quantity - 1 }
            : product
        )
      );
    }
  };

  const addToCart = (item) => {
    let newItem = cart.find((product) => product.inventory_id === item.inventory_id);
    let newCart;

    if (newItem) {
      newCart = cart.map((product) =>
        product.inventory_id === item.inventory_id
          ? { ...newItem, quantity: newItem.quantity + 1 }
          : product
      );
    } else {
      newCart = [...cart, { ...item, quantity: 1 }];
    }

    setCart(newCart);
    setIsEmpty(false);
  };

  const removeFromCart = (item) => {
    let hardCopy = [...cart];

    hardCopy = hardCopy.filter((cartItem) => cartItem.inventory_id !== item.inventory_id);

    if (hardCopy.length === 0) {
      setIsEmpty(true);
    }

    setCart(hardCopy);
  };

  const listItems = items.map((product) => (
    <div className="card cart-card" key={product.inventory_id}>
      <img className="card-img-top cart-img" src={product.image} alt="" />
      <div className="card-body">
        <h5 className="card-title App-card-title">{product.name}</h5> <br />
        <span className="card-text">
          {product.price.toLocaleString("vi-VN")} ${" "}
        </span>
      </div>
      <button className="btn btn-primary" onClick={() => addToCart(product)}>
        {" "}
        Add To Cart
      </button>
    </div>
  ));

  return (
    <div>
      <h2 className="title">STORE</h2>
      <div className="App-list">{listItems}</div>
      <hr />
      <h2 className="title">CART</h2>
      <div>
        {!isEmpty ? (
          cart.map((item) => (
            <div key={item.inventory_id} className="card-cart">
              <img className="card-img-top" src={item.image} alt="" />
              <div className="card-body">
                <h5 className="card-title ">{item.name}</h5> <br />
                <span className="card-text">
                  <div className="App-price-info">
                    <button
                      className="btn btn-info"
                      onClick={() => addToCart(item)}
                    >
                      +
                    </button>{" "}
                    {item.quantity}{" "}
                    <button
                      className="btn btn-info"
                      onClick={() => decToCart(item)}
                    >
                      -
                    </button>{" "}
                  </div>{" "}
                  <br /> {item.price.toLocaleString("vi-VN")} ${" "}
                </span>
              </div>
              <button
                className="btn btn-danger"
                onClick={() => removeFromCart(item)}
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <h2 className="title">YOUR CART IS EMPTY</h2>
        )}
      </div>

      <hr />

      <div className="App-price">
        <div>CurentTotal: {cartTotal.toLocaleString("vi-VN")} $</div>
        <span>Total: {totalPrice.toLocaleString("vi-VN")} $</span>
      </div>
    </div>
  );
};