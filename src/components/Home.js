import React, { useState, useEffect } from "react";
import SockCard from "./SockCard";
import "../style/Home.css";

export default function Home() {
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
    <div className="Home">
      <div className="lander">
        <h1>Socks4u</h1>
        <p className="text-muted">The Space-Invaders Present</p>
        <div>
          {socks.map((sock) => {
            return <SockCard sock={sock} key={sock.id} />;
          })}
        </div>
      </div>
    </div>
  );
}
