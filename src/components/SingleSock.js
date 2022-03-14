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
      const URL = `http://grace-shopper-space.herokuapp.com/api/socks/${sockId}`;
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

  const { name, price, product_img, size, description } = singleSock;

  return (
    <Container className="single-sock">
      <Grid container spacing={4}>
        <Grid item xs={12} md={8} className="image-grid">
          <img
            onLoad={() => {
              setLoading(false);
            }}
            // src={sock.src}
            // alt={singleSock.product_img}
          />
        </Grid>
        <Grid item xs={12} md={8} className="single-info">
          <Typography variant="h2">{singleSock.name}</Typography>
          <Typography variant="p">{singleSock.description}</Typography>
          <Typography variant="p3">Price: {singleSock.price}</Typography>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Button
                size="small"
                varaint="contained"
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
                color="secondary"
                varaint="contained"
                className="increase-quantity"
                onClick={() => {
                  handleQuantity("decrease");
                }}
              >
                -
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                size="large"
                className="add-cart"
                onClick={() => {
                  // setCart(newCart);
                  // setIsEmpty(false);
                }}
              ></Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {loading && <div class="loader"></div>}
    </Container>
  );
}
