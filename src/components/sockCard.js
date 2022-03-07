import React from "react";
import "./SockCard.css";

const SockCard = ({ sock }) => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-group">
          <h5 className="card-sockname">{sock.name}</h5>
          <div className="card-sockprice">${sock.price}</div>
        </div>
      </div>
      <img className="card-image" src={sock.name} alt={sock.name} />

      <div className="card-sockdescription">{sock.description}</div>
    </div>
  );
};

export default SockCard;
