import React from "react";
import "../style/SockCard.css";

const SockCard = ({ sock }) => {
  return (
    <div className="containercard">
      <div className="card">
        <div className="card-header">
          <h5 className="card-sockname">{sock.name}</h5>
          <div className="card-sockprice">${sock.price}</div>
        </div>
        <img className="card-image" src={sock.product_img} alt={sock.name} />

        <div className="card-sockdescription">{sock.description}</div>
      </div>
    </div>
  );
};

export default SockCard;
