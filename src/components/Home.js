import React, { useState, useEffect } from "react";
import SockCard from "./SockCard";
import "../style/Home.css";
import Row from "react-bootstrap/Row";

export default function Home() {
  const [socks, setSocks] = useState([]);
  const URL = "http://grace-shopper-space.herokuapp.com/api/socks";
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
        <p className="text-muted">The Space-Invaders Present</p>
        <img src={require("../style/socks4you.png")} alt="logo" height="100" />
        <br />
        <br />
        <div>
          <Row xs={1} md={3} className="g-4">
            {socks.map((sock) => {
              return <SockCard sock={sock} key={sock.id} />;
            })}{" "}
          </Row>
        </div>
      </div>
    </div>
  );
}
