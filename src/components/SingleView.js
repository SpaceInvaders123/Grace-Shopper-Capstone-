import React, { useState, useEffect } from "react";

const singleSock = ({ sock }) => {
  const [sock, setSock] = useState([]);
  const URL = `http://localhost:4000/api/socks/1`;
  async function fetchSingleSock(URL) {
    const sock = await fetch(URL);
    return await sock.json();
  }
  useEffect(() => {
    fetchSingleSock(URL).then((res) => setSock([...res]));
  }, []);
  return (
    <div className="single-view">
      <div className="single-header">
        <h5 className="card-sockname">{sock.name}</h5>
        <div className="card-sockprice">${sock.price}</div>
      </div>
      <img className="card-image" src={sock.product_img} alt={sock.name} />

      <div className="card-sockdescription">{sock.description}</div>
    </div>
  );
};
export default singleSock;
