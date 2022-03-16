import React, { useState, useEffect } from "react";
import { Accordion, Card, Form, Button } from "react-bootstrap";
import CartCard from "./CartCard";

const Cart = () => {
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
  //useeffect for the me call above
  useEffect(() => {
    fetchUserObject(URL).then((res) => setUserObject(res));
  }, [URL]);
  //these are both arrays but I can map over the first one without error so...?
  const userOrdersMeta = userObject.orders;
  const userProductOrders = [...new Set(userOrdersMeta?.map((item) => item))];

  let filteredOrders = [];
  //filtering for status="settled" and pushing to above array
  function filterOrders() {
    for (let i = 0; i < userProductOrders.length; i++) {
      const element = userProductOrders[i];
      if (element.status === "pending") {
        filteredOrders.push(element);
      }
    }
  }
  filterOrders();

  let orderItems = [];
  orderItems = filteredOrders.map((cartObj) => cartObj.order_items);
  const cartArray = orderItems[0];

  return (
    <div>
      <h1 id="title">Hello {userObject.first_name}</h1>
      <Accordion>
        <Card id="profileCard2">
          <Accordion.Item eventKey="1">
            <Accordion.Header id="header2">
              <h5 className="mb-0"> View Cart</h5>
            </Accordion.Header>
            <Accordion.Body>
              <div>
                {cartArray?.map((cartArray) => {
                  return <CartCard cartArray={cartArray} />;
                })}
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Card>
      </Accordion>
    </div>
  );
};

export default Cart;
