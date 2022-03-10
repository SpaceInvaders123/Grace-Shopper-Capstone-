import React from "react";
import "../style/SockCard.css";
import Card from "react-bootstrap/Card";

const SockCard = ({ sock }) => {
  return (
    <Card className="containercard">
      <Card.Title>{sock.name}</Card.Title>
      <div className="card-sockprice">${sock.price}</div>
      <Card.Img variant="top" src={sock.product_img} alt={sock.name} />
      <Card.Text>{sock.description}</Card.Text>
    </Card>
  );
};

export default SockCard;
