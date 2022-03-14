import React from "react";

const UserOrdersCard = ({ filteredProducts }) => {
  return (
    <div id="postCards">
      <h2 className="postCardElements" id="postCardTitle">
        Order Number: {filteredProducts.order_id}
      </h2>
      <hr></hr>
      <div className="postCardElements" id="postCardPrice">
        <b>Price:</b> {filteredProducts.price_paid}
      </div>
      <div className="postCardElements" id="postCardLocation">
        <b>Sock ID:</b>
        {filteredProducts.socks_id}
      </div>
      <div className="postCardElements" id="postCardSeller">
        <b>quantity:</b> {filteredProducts.quantity}
      </div>
    </div>
  );
};

export default UserOrdersCard;
