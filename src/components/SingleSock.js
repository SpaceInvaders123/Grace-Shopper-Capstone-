import React, { useEffect, useState } from "react";
import "../style/SockCard.css";
import SockCard from "./SockCard";
import { useParams } from "react-router-dom";

export default function SingleSock() {
  const { sockId } = useParams();

  const [singleSock, setSingleSock] = useState([]);
  const URL = `http://grace-shopper-space.herokuapp.com/api/socks/${sockId}`;
  async function fetchSingleSock(URL) {
    const response = await fetch(URL);
    return await response.json();
  }
  useEffect(() => {
    fetchSingleSock(URL).then((sock) => setSingleSock(sock));
  });
  return (
    <div className="Home">
      <div className="lander">
        <h1>Socks4u</h1>
        <p className="text-muted">The Space-Invaders Present</p>
        <div>
          <SockCard sock={singleSock} key={singleSock.id} />
        </div>
      </div>
    </div>
  );
}
