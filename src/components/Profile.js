import React, { useState, useEffect } from "react";
import { Accordion, Card, Form, Button } from "react-bootstrap";
import "../style/Profile.css";

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
  }, [URL]);

  //formating the Me object to just the orders
  const userOrdersMeta = userObject.orders;
  //console.log(userOrdersMeta);
  //desctruting the Me orders to just the prodcuts that were ordered
  const userProducts = [
    ...new Set(userOrdersMeta?.map((item) => item.products)),
  ];
  console.log(userProducts[0]);
  console.log(userProducts[1]);

  // start of API call to patch UserObject
  //formating the URL for the patch call, dirty but it works
  const userId = userObject.id;
  const URL2 = "https://grace-shopper-space.herokuapp.com/api/users/" + userId;
  //console.log(URL2);
  //start of patch API call
  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await fetch(URL2, {
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
            <Accordion.Header id="header1">
              <h5 className="mb-0">Edit Profile Information</h5>
            </Accordion.Header>
            <Accordion.Body>
              <Form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Username</label>
                  <input
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="editUsername"
                    placeholder={userObject.username}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    Please enter your new Username!
                  </small>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">First Name</label>
                  <input
                    className="form-control"
                    aria-describedby="editFirstname"
                    placeholder={userObject.first_name}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    Please enter your new Username!
                  </small>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder={userObject.email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small>
                </div>
                <div className="row justify-content-center">
                  <Button
                    type="submit"
                    className="btn btn-primary"
                    id="submitBtn"
                  >
                    Submit
                  </Button>
                </div>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
        </Card>
        <Card id="profileCard2">
          <Accordion.Item eventKey="1">
            <Accordion.Header id="header2">
              <h5 className="mb-0">Order History</h5>
            </Accordion.Header>
            <Accordion.Body></Accordion.Body>
          </Accordion.Item>
        </Card>
      </Accordion>
    </div>
  );
};

export default Profile;
