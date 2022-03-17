import React from "react";

const CartCard = ({ cartArray }) => {
  return (
    <div id="postCards">
      <h2 className="postCardElements" id="postCardTitle">
        Order Item: {cartArray.id}
      </h2>
      <hr></hr>
      <div className="postCardElements" id="postCardPrice">
        <b>Sock Id: </b>
        {cartArray.socks_id}
      </div>
      <div className="postCardElements" id="postCardSeller">
        <b>quantity: </b> {cartArray.quantity}
      </div>
      <div className="postCardElements" id="postCardSeller">
        <b>Price: </b>
        {cartArray.price_paid}
      </div>
    </div>
  );
};

export default CartCard;

/*  const itemsArray = filteredOrders.order_items;
  console.log(itemsArray);
  const price_paid = itemsArray.map((x) => x.price_paid);
  console.log(price_paid);
  const socks_id = itemsArray.map((x) => x.socks_id);
  console.log(socks_id);
  const quantity = itemsArray.map((x) => x.quantity);
  console.log(quantity);
 */
