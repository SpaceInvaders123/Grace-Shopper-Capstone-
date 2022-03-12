import React from "react";
import "../style/SockCard.css";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

// function formatPrice(price) {
//   return (price / 100).toFixed(2);
// }

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

const SockCard = ({ sock }) => {
  return (
    <Link to={`/socks/${sock.id}`}>
      <Card className="containercard">
        <Card.Title>{sock.name}</Card.Title>
        <div className="card-sockprice">{formatter.format(sock.price)}</div>
        <Card.Img variant="top" src={sock.product_img} alt={sock.name} />
        <Card.Text>{sock.size}</Card.Text>
        <Card.Text>{sock.description}</Card.Text>
      </Card>
    </Link>
  );
};

export default SockCard;
