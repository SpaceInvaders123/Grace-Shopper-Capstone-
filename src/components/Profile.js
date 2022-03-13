import React, { useState, useEffect } from "react";
import { Accordion, Card, Form } from "react-bootstrap";
import "../style/Profile.css";

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
      <h1 id="title">Hello {userObject.first_name}</h1>
      <Accordion>
        <Card id="profileCard1">
          <Accordion.Item eventKey="0">
            <Accordion.Header id="header1" class="headers">
              <h5 class="mb-0">Edit Profile Information</h5>
            </Accordion.Header>
            <Accordion.Body>
              <Form>
                <div class="form-group">
                  <label for="exampleInputEmail1">Username</label>
                  <input
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="editUsername"
                    placeholder={userObject.username}
                  />
                  <small id="emailHelp" class="form-text text-muted">
                    Please enter your new Username!
                  </small>
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder={userObject.email}
                  />
                  <small id="emailHelp" class="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small>
                </div>
                <div class="form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="exampleCheck1"
                  />
                  <label class="form-check-label" for="exampleCheck1">
                    Check me out
                  </label>
                </div>
                <button type="submit" class="btn btn-primary">
                  Submit
                </button>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
        </Card>
        <Card id="profileCard2">
          <Accordion.Item eventKey="1">
            <Accordion.Header id="header2" class="headers">
              <h5 class="mb-0">Order History</h5>
            </Accordion.Header>
            <Accordion.Body>Text HERE</Accordion.Body>
          </Accordion.Item>
        </Card>
      </Accordion>
    </div>
  );
};

export default Profile;
