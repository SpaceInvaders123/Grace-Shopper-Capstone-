import React from "react";

const UserOrdersCard = ({ cartArray }) => {
  return (
    <div id="postCards">
      <h2 className="postCardElements" id="postCardTitle">
        Order Id: {cartArray.order_id}
      </h2>
      <hr></hr>
      <div className="postCardElements" id="postCardPrice">
        <b>Purchased Product Id: </b> {cartArray.socks_id}
      </div>
      <div className="postCardElements" id="postCardSeller">
        <b>quantity: </b>
        {cartArray.quantity}
      </div>
      <div className="postCardElements" id="postCardSeller">
        <b>Price: </b>
        {cartArray.price_paid}
      </div>
    </div>
  );
};

export default UserOrdersCard;
