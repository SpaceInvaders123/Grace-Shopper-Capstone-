import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "../style/SignUp.css";

const SignUp = () => {
  const [text, setText] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");

  function validateForm() {
    return (
      text.length > 0 &&
      password.length > 0 &&
      firstName.length > 0 &&
      email.length > 0
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch(
        `https://grace-shopper-space.herokuapp.com/api/users/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: text,
            password: password,
            first_name: firstName,
            email: email,
          }),
        }
      );
      const data = await response.json();
      localStorage.setItem(`stAuth`, JSON.stringify(data.token));
      // console.log(data.token)
      alert("Sign-Up compleate, Please Login");
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <div className="SignUp">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="registerForm">
          <Form.Label>username</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Form.Label>email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Button
          block
          size="lg"
          type="submit"
          disabled={!validateForm()}
          id="Button"
        >
          Sign Up
        </Button>
      </Form>
    </div>
  );
};

export default SignUp;
