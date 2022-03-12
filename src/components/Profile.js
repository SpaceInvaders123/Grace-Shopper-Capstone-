import React, { useState, useEffect } from "react";
import { getAPIHealth } from "../axios-services";
import "../style/API.css";

const Profile = () => {
  const [userObject, setUserObject] = useState([]);

  const URL = "https://grace-shopper-space.herokuapp.com/api/users/me";

  async function fetchUserObject(URL) {
    const token = localStorage.getItem("stAuth");
    const fixedToken = token.replace(/^"(.*)"$/, "$1");

    const userObject = await fetch(URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + fixedToken,
      },
    });
    return await userObject.json();
  }

  useEffect(() => {
    fetchUserObject(URL).then((res) => setUserObject(res));
  }, []);
  console.log(userObject);

  return (
    <div>
      <h1>Hello {userObject.first_name}!</h1>
      <p>API Status:?</p>
    </div>
  );
};

export default Profile;
