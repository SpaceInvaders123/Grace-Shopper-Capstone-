import React, { useState, useEffect } from "react";
import SockTile from "./sockCard";

const Products = () => {
  const [socks, setSocks] = useState([]);
  const URL = "http://localhost:4000/api/socks";

  async function fetchSocks(url) {
    const socks = await fetch(url);
    return await socks.json();
  }

  useEffect(() => {
    fetchSocks(URL).then((res) => setSocks([...res]));
  }, []);

  return (
    <div>
      {socks.map((sock) => {
        console.log(sock);
        return <SockTile sock={sock} />;
      })}
    </div>
  );
};

export default Products;
