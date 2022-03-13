import React, { useState, useEffect } from "react";
import { Accordion, Card, Form, Button } from "react-bootstrap";
import "../style/Profile.css";
import { useParams } from "react-router-dom";

const Profile = () => {
  const [userObject, setUserObject] = useState([]);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [username, setUserName] = useState("");

  //API call to fetch the me object in the first place
  const URL = `https://grace-shopper-space.herokuapp.com/api/users/me`;
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
  //useeffect for the me call above
  useEffect(() => {
    fetchUserObject(URL).then((res) => setUserObject(res));
  }, []);
  console.log(userObject);

  //API call to patch UserObject
  //const { userId } = useParams();
  const userId = userObject.id;

  const URL2 = "https://grace-shopper-space.herokuapp.com/api/users/" + userId;
  console.log(URL2);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch(URL2, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          first_name: firstName,
          email: email,
        }),
      });
      alert("Profile edited, thank you!");
    } catch (e) {
      alert(e.message);
    }
  }

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
              <Form onSubmit={handleSubmit}>
                <div class="form-group">
                  <label for="exampleInputEmail1">Username</label>
                  <input
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="editUsername"
                    placeholder={userObject.username}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  <small id="emailHelp" class="form-text text-muted">
                    Please enter your new Username!
                  </small>
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail1">First Name</label>
                  <input
                    class="form-control"
                    aria-describedby="editFirstname"
                    placeholder={userObject.first_name}
                    onChange={(e) => setFirstName(e.target.value)}
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
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <small id="emailHelp" class="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small>
                </div>
                <Button type="submit" class="btn btn-primary">
                  Submit
                </Button>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
        </Card>
        <Card id="profileCard2">
          <Accordion.Item eventKey="1">
            <Accordion.Header id="header2" class="headers">
              <h5 class="mb-0">Order History</h5>
            </Accordion.Header>
            <Accordion.Body></Accordion.Body>
          </Accordion.Item>
        </Card>
      </Accordion>
    </div>
  );
};

export default Profile;
