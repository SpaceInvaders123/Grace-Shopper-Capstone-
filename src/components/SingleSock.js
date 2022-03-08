import React, { useEffect, useState } from "react";
import "../style/SockCard.css";

export default function SingleSock({ sock }) {
  const [socks, setSocks] = useState([]);
  const URL = `http://localhost:4000/api/socks/1`;
  async function fetchSingleSock(URL) {
    const socks = await fetch(URL);
    return await socks.json();
  }
  useEffect(() => {
    fetchSingleSock(URL).then((res) => setSocks([...res]));
  }, []);
  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-sockname">{socks.name}</h5>
        <div className="card-sockprice">${sock.price}</div>
      </div>
      <img className="card-image" src={sock.product_img} alt={sock.name} />

      <div className="card-sockdescription">{sock.description}</div>
    </div>
  );
}
