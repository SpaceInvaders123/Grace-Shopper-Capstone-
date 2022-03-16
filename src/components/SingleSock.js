import React, { useEffect, useState } from "react";
import "../style/SingleSock.css";
import { Grid, Button, Container, Typography } from "@material-ui/core";

import { useParams } from "react-router-dom";

export default function SingleSock() {
  const { sockId } = useParams();
  const [singleSock, setSingleSock] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(sockId);

    async function fetchSingleSock() {
      const URL = `https://grace-shopper-space.herokuapp.com/api/socks/${sockId}`;
      try {
        const response = await fetch(URL);
        const sock = await response.json();
        console.log(response, sock);

        setSingleSock(sock);
      } catch (error) {
        console.error(error);
      }
    }

    fetchSingleSock();
  }, []);

  const handleQuantity = (param) => {
    if (param === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    }
    if (param === "increase" && quantity < 10) {
      setQuantity(quantity + 1);
    }
  };
  //just to test

  //const { name, price, product_img, size, description } = singleSock;

  const [userObject, setUserObject] = useState([]);

  const URL = `https://grace-shopper-space.herokuapp.com/api/users/me`;
  async function fetchUserObject(URL) {
    const token = localStorage.getItem("stAuth");
    const fixedToken = token.replace(/^"(.*)"$/, "$1");

    const userObject = await fetch(URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + fixedToken,
      },
    });
    return await userObject.json();
  }
  useEffect(() => {
    fetchUserObject(URL).then((res) => setUserObject(res));
  }, [URL]);
  const userOrdersMeta = userObject.orders;
  const userProductOrders = [...new Set(userOrdersMeta?.map((item) => item))];

  let filteredOrders = [];

  async function filterOrders() {
    try {
      for (let i = 0; i < userProductOrders.length; i++) {
        const element = userProductOrders[i];
        if (element.status === "pending") {
          filteredOrders.push(element);
        }
      }
    } catch (error) {
      console.log(error);
    }
    return filteredOrders;
  }
  filterOrders();

  let orderId = [];
  orderId = filteredOrders.map((orderId) => orderId.id);
  const orderIdArray = orderId[0];

  async function addToCart() {
    try {
      const response = await fetch(
        `https://grace-shopper-space.herokuapp.com/api/order_items`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quantity: quantity,
            price_paid: singleSock.price * quantity,
            order_id: orderIdArray,
            socks_id: singleSock.id,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container className="single-sock">
      <Grid container spacing={4}>
        <Grid item xs={12} md={8} className="image-grid">
          <img
            onLoad={() => {
              setLoading(false);
            }}
            src={singleSock.product_img}
            alt={singleSock.product_img}
          />
        </Grid>
        <Grid item xs={12} md={8} className="single-info">
          <Typography variant="h1">{singleSock.name}</Typography>
          <Typography variant="h2">{singleSock.description}</Typography>
          <Typography variant="h3">Price:${singleSock.price}</Typography>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Button
                size="small"
                className="increase-quantity"
                onClick={() => {
                  handleQuantity("increase");
                }}
              >
                +
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography className="quantity" varaint="h3">
                Quantity: {quantity}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                size="small"
                className="decrease-quantity"
                onClick={() => {
                  handleQuantity("decrease");
                }}
              >
                -
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button size="large" className="add-cart" onClick={addToCart}>
                Add To Cart
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {loading && <div className="loader"></div>}
    </Container>
  );
}
