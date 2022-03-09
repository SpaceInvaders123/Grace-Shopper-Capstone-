import React from "react";
import "../style/SockCard.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

const SockCard = ({ sock }) => {
  return (
    <Card className="containercard">
      <div className="card-header">
        <h5 className="card-sockname">{sock.name}</h5>
        <div className="card-sockprice">${sock.price}</div>
      </div>
      <img className="card-image" src={sock.product_img} alt={sock.name} />

      <div className="card-sockdescription">{sock.description}</div>
    </Card>
  );
};

export default SockCard;
